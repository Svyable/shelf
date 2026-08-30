import './selection-actions.js';
import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute } from './router.js';
import { addNote, applyNotes, loadNotes, selectionSourceAnchor } from './notes.js';

let pending = null;
const chapterCache = new Map();

function selectionContext() {
  const selection = window.getSelection?.();
  const text = selection?.toString().trim();
  const anchor = selectionSourceAnchor(selection);
  if (!text || !anchor || !selection?.rangeCount) return null;
  const range = selection.getRangeAt(0);
  const node = range.startContainer.nodeType === Node.ELEMENT_NODE
    ? range.startContainer
    : range.startContainer.parentElement;
  return { text, anchor, node };
}

async function chapterMap(slug) {
  if (chapterCache.has(slug)) return chapterCache.get(slug);
  const promise = fetchText(`books/${slug}/README.md`)
    .then((markdown) => parseBookReadme(markdown, slug).contents || [])
    .catch(() => []);
  chapterCache.set(slug, promise);
  return promise;
}

async function resolveChapter(context, route) {
  const scroll = context.node?.closest?.('.scroll-block[data-chapter], .scroll-chapter[data-chapter]');
  if (scroll?.dataset.chapter) return scroll.dataset.chapter;

  const surface = context.node?.closest?.('.page-surface');
  const running = surface?.querySelector?.('.page-running')?.textContent?.trim();
  if (running && route.slug) {
    const contents = await chapterMap(route.slug);
    const exact = contents.find((chapter) => chapter.title === running);
    if (exact?.id) return exact.id;
  }
  return route.chapter || '';
}

function refreshHighlights(slug, chapter, originNode) {
  const notes = loadNotes(slug);
  const pagedRoot = originNode?.closest?.('.page-inner');
  if (pagedRoot) applyNotes(pagedRoot, notes, chapter);
  document.querySelectorAll(`.scroll-chapter[data-chapter="${CSS.escape(chapter)}"]`)
    .forEach((root) => applyNotes(root, notes, chapter));
}

async function beginNote(event) {
  const target = event.target.closest?.('#selNote');
  if (!target) return;
  const context = selectionContext();
  const route = parseRoute();
  if (!context || !route.slug) return;

  event.preventDefault();
  event.stopPropagation();
  const chapter = await resolveChapter(context, route);
  if (!chapter) return;
  pending = { slug: route.slug, chapter, ...context };

  const quote = document.getElementById('noteQuote');
  const body = document.getElementById('noteBody');
  const pop = document.getElementById('selPop');
  if (pop) pop.hidden = true;
  if (quote) quote.textContent = pending.text;
  if (body) body.value = '';
  document.getElementById('noteDialog')?.classList.add('active');
  body?.focus();
}

function savePending(event) {
  const target = event.target.closest?.('#noteSave');
  if (!target || !pending) return;
  event.preventDefault();
  event.stopPropagation();

  const body = document.getElementById('noteBody')?.value.trim() || '';
  addNote(pending.slug, {
    chapter: pending.chapter,
    offset: pending.anchor.start,
    quote: pending.text,
    body,
    anchor: pending.anchor,
  });
  document.getElementById('noteDialog')?.classList.remove('active');
  refreshHighlights(pending.slug, pending.chapter, pending.node);
  pending = null;
  window.dispatchEvent(new Event('resize'));

  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = 'Note saved';
    toast.hidden = false;
    window.setTimeout(() => {
      if (toast.textContent === 'Note saved') toast.hidden = true;
    }, 1800);
  }
}

document.addEventListener('click', (event) => {
  if (event.target.closest?.('#selNote')) beginNote(event);
  else if (event.target.closest?.('#noteSave')) savePending(event);
  else if (event.target.closest?.('#noteCancel')) pending = null;
}, true);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') pending = null;
}, true);
