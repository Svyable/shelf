import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { addNote, applyNotes, loadNotes, selectionSourceAnchor } from './notes.js';
import { parseRoute } from './router.js';
import { normalizeSelectionSnapshot, selectionSnapshotUsable } from './selection-memory.js';

let remembered = null;
let fallbackPending = null;
const chapterCache = new Map();

function readerMode() {
  return document.documentElement.dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
}

function liveSelection() {
  const selection = window.getSelection?.();
  const text = selection?.toString().trim();
  if (!text || !selection?.rangeCount || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  const node = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? range.startContainer
    : range.startContainer.parentElement;
  const readingNode = node?.closest?.('.page-surface, .scroll-block');
  const route = parseRoute();
  if (!readingNode || !route.slug) return null;
  const scroll = readingNode.closest?.('.scroll-block');
  const offset = Number(scroll?.dataset.offset) || Number(route.offset) || 0;
  return normalizeSelectionSnapshot({
    text,
    slug: route.slug,
    mode: readerMode(),
    anchor: selectionSourceAnchor(selection),
    offset,
    node,
  });
}

function rememberLiveSelection() {
  const next = liveSelection();
  if (next) remembered = next;
  return next;
}

function usableRemembered() {
  const route = parseRoute();
  return selectionSnapshotUsable(remembered, {
    slug: route.slug,
    mode: readerMode(),
  }) ? remembered : null;
}

async function contentsFor(slug) {
  if (chapterCache.has(slug)) return chapterCache.get(slug);
  const pending = fetchText(`books/${slug}/README.md`)
    .then((markdown) => parseBookReadme(markdown, slug).contents || [])
    .catch(() => []);
  chapterCache.set(slug, pending);
  return pending;
}

async function chapterFor(snapshot) {
  const scroll = snapshot.node?.closest?.('.scroll-block[data-chapter], .scroll-chapter[data-chapter]');
  if (scroll?.dataset.chapter) return scroll.dataset.chapter;

  const surface = snapshot.node?.closest?.('.page-surface');
  const running = surface?.querySelector?.('.page-running')?.textContent?.trim();
  if (running) {
    const contents = await contentsFor(snapshot.slug);
    const exact = contents.find((chapter) => chapter.title === running);
    if (exact?.id) return exact.id;
  }
  return parseRoute().chapter || '';
}

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.setTimeout(() => {
    if (el.textContent === message) el.hidden = true;
  }, 1800);
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied');
  } catch {
    toast('Could not copy');
  }
}

function refreshNote(chapter, slug) {
  const notes = loadNotes(slug);
  document.querySelectorAll('.page-inner').forEach((root) => applyNotes(root, notes, chapter));
  document.querySelectorAll(`.scroll-chapter[data-chapter="${CSS.escape(chapter)}"]`)
    .forEach((root) => applyNotes(root, notes, chapter));
  window.dispatchEvent(new Event('resize'));
}

function fallbackSelection() {
  if (liveSelection()) return null;
  return usableRemembered();
}

document.addEventListener('selectionchange', rememberLiveSelection);
document.addEventListener('mouseup', rememberLiveSelection);
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest?.('#selPop')) rememberLiveSelection();
}, true);

document.addEventListener('click', (event) => {
  const target = event.target.closest?.('#selCopy, #selShare, #selNote');
  if (!target) return;
  const snapshot = fallbackSelection();
  if (!snapshot) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  document.getElementById('selPop')?.setAttribute('hidden', '');

  if (target.id === 'selCopy') {
    copy(snapshot.text);
    return;
  }
  if (target.id === 'selShare') {
    copy(`“${snapshot.text}”\n${window.location.href}`);
    return;
  }

  void chapterFor(snapshot).then((chapter) => {
    if (!chapter) return;
    fallbackPending = { ...snapshot, chapter };
    const quote = document.getElementById('noteQuote');
    const body = document.getElementById('noteBody');
    if (quote) quote.textContent = snapshot.text;
    if (body) body.value = '';
    document.getElementById('noteDialog')?.classList.add('active');
    body?.focus();
  });
}, true);

document.addEventListener('click', (event) => {
  const save = event.target.closest?.('#noteSave');
  const cancel = event.target.closest?.('#noteCancel');
  if (cancel && fallbackPending) {
    fallbackPending = null;
    return;
  }
  if (!save || !fallbackPending) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  const pending = fallbackPending;
  fallbackPending = null;
  addNote(pending.slug, {
    chapter: pending.chapter,
    offset: pending.offset,
    quote: pending.text,
    body: document.getElementById('noteBody')?.value.trim() || '',
    anchor: pending.anchor,
  });
  document.getElementById('noteDialog')?.classList.remove('active');
  refreshNote(pending.chapter, pending.slug);
  toast('Note saved');
}, true);
