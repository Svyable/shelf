import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { addNote, applyNotes, loadNotes, selectionSourceAnchor } from './notes.js';
import { parseRoute, readHash } from './router.js';
import {
  SELECTION_SNAPSHOT_TTL,
  normalizeSelectionSnapshot,
  selectionAnchorTargetIndex,
  selectionSnapshotUsable,
} from './selection-memory.js';
import {
  clearSelectionMarker,
  installSelectionMarkerStyles,
  paintSelectionMarker,
} from './selection-marker.js';

let remembered = null;
let fallbackPending = null;
let resumeArmed = false;
let resumeTimer = 0;
let resumeExpiryTimer = 0;
const chapterCache = new Map();

installSelectionMarkerStyles();

function readerMode() {
  return document.documentElement.dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
}

function activeReadingRoot() {
  return readerMode() === 'scroll'
    ? document.querySelector('#scrollReader:not([hidden])')
    : document.querySelector('#pagesWrapper');
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
  const anchor = selectionSourceAnchor(selection);
  const offset = anchor?.start ?? (Number(scroll?.dataset.offset) || Number(route.offset) || 0);
  return normalizeSelectionSnapshot({
    text,
    slug: route.slug,
    chapter: scroll?.dataset.chapter || (readerMode() === 'scroll' ? route.chapter : '') || '',
    mode: readerMode(),
    anchor,
    offset,
    node,
  });
}

function setResumedActions(active) {
  const pop = document.getElementById('selPop');
  if (pop) pop.toggleAttribute('data-selection-resumed', active);
  const card = document.getElementById('selCard');
  const report = document.getElementById('selReport');
  if (active) {
    if (card) card.hidden = true;
    if (report) report.hidden = true;
  } else if (readerMode() === 'paged') {
    if (card) card.hidden = false;
    if (report) report.hidden = false;
  }
}

function rememberLiveSelection() {
  const next = liveSelection();
  if (next) {
    remembered = next;
    resumeArmed = !!next.anchor;
    clearTimeout(resumeExpiryTimer);
    clearSelectionMarker();
    setResumedActions(false);
  }
  return next;
}

function usableRemembered({ allowModeChange = false } = {}) {
  const route = parseRoute();
  return selectionSnapshotUsable(remembered, {
    slug: route.slug,
    mode: readerMode(),
    allowModeChange,
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
  if (snapshot.chapter) return snapshot.chapter;
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

function selectionUrl(snapshot, chapter) {
  const hash = readHash(snapshot.slug, chapter, snapshot.anchor?.start ?? snapshot.offset ?? 0);
  return `${window.location.href.split('#')[0]}${hash}`;
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

function actionableSelection() {
  return liveSelection() || usableRemembered({ allowModeChange: true });
}

function sourceTarget(snapshot) {
  if (!snapshot?.anchor) return null;
  const root = activeReadingRoot();
  if (!root) return null;

  const candidates = [...root.querySelectorAll('[data-source-start][data-source-end]')]
    .filter((element) => element.getClientRects().length > 0)
    .map((element) => ({
      element,
      start: Number(element.dataset.sourceStart),
      end: Number(element.dataset.sourceEnd),
    }))
    .filter((entry) => Number.isFinite(entry.start) && Number.isFinite(entry.end));
  const index = selectionAnchorTargetIndex(snapshot.anchor, candidates);
  return index >= 0 ? candidates[index].element : null;
}

function positionResumedActions(target) {
  const pop = document.getElementById('selPop');
  if (!pop || !target) return false;
  const rect = target.getBoundingClientRect();
  if (!rect.width && !rect.height) return false;
  pop.hidden = false;
  setResumedActions(true);

  const vv = window.visualViewport;
  const leftOff = vv ? vv.offsetLeft : 0;
  const topOff = vv ? vv.offsetTop : 0;
  const vw = vv ? vv.width : window.innerWidth;
  const vh = vv ? vv.height : window.innerHeight;
  const popW = Math.min(pop.offsetWidth || 180, Math.max(0, vw - 16));
  const popH = pop.offsetHeight || 38;
  const left = Math.min(
    Math.max(8 + leftOff, rect.left + leftOff),
    leftOff + vw - popW - 8
  );
  const above = rect.top + topOff - popH - 8;
  const below = rect.bottom + topOff + 8;
  const top = above >= topOff + 8
    ? above
    : Math.min(below, topOff + vh - popH - 8);
  pop.style.left = `${left}px`;
  pop.style.top = `${Math.max(topOff + 8, top)}px`;
  return true;
}

function armResumeExpiry(snapshot) {
  clearTimeout(resumeExpiryTimer);
  const elapsed = Date.now() - Number(snapshot?.createdAt || 0);
  const remaining = Math.max(0, SELECTION_SNAPSHOT_TTL - elapsed);
  if (!remaining) {
    disarmResume();
    return false;
  }
  resumeExpiryTimer = window.setTimeout(disarmResume, remaining + 1);
  return true;
}

function resumeSelectionActions() {
  clearTimeout(resumeTimer);
  if (!resumeArmed || document.body.dataset.stage !== 'read') {
    clearSelectionMarker();
    return false;
  }
  if (document.querySelector('.toc-overlay.active, .stats-overlay.active, .search-overlay.active')) {
    clearSelectionMarker();
    return false;
  }
  const snapshot = usableRemembered({ allowModeChange: true });
  if (!snapshot?.anchor) {
    clearSelectionMarker();
    return false;
  }
  const root = activeReadingRoot();
  const marker = paintSelectionMarker(snapshot.anchor, root);
  const target = marker.target || sourceTarget(snapshot);
  if (positionResumedActions(target) && armResumeExpiry(snapshot)) return true;
  clearSelectionMarker();
  return false;
}

function scheduleResume(delay = 220) {
  clearTimeout(resumeTimer);
  resumeTimer = window.setTimeout(() => {
    if (resumeSelectionActions()) return;
    resumeTimer = window.setTimeout(resumeSelectionActions, 240);
  }, delay);
}

function disarmResume() {
  resumeArmed = false;
  clearTimeout(resumeTimer);
  clearTimeout(resumeExpiryTimer);
  clearSelectionMarker();
  setResumedActions(false);
}

document.addEventListener('selectionchange', rememberLiveSelection);
document.addEventListener('mouseup', rememberLiveSelection);
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest?.('#selPop, #settingsBtn, #settingsPanel')) {
    rememberLiveSelection();
    return;
  }
  if (resumeArmed && event.target.closest?.('.page-surface, .scroll-document')) disarmResume();
}, true);

const modeObserver = new MutationObserver(() => {
  if (resumeArmed) scheduleResume(260);
});
modeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-reader-mode'],
});
window.addEventListener('resize', () => {
  if (resumeArmed) scheduleResume(260);
}, true);
window.addEventListener('orientationchange', () => {
  if (resumeArmed) scheduleResume(320);
}, true);
document.addEventListener('scroll', () => {
  if (resumeArmed && document.documentElement.dataset.selectionResumeMarker === 'true') scheduleResume(36);
}, true);
document.addEventListener('click', (event) => {
  if (resumeArmed && event.target.closest?.('#settingsClose')) scheduleResume(80);
}, true);
document.addEventListener('keydown', (event) => {
  if (!resumeArmed || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.closest?.('#selPop, input, textarea, select, [contenteditable="true"]')) return;
  if (['Tab', 'Shift'].includes(event.key)) return;
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
    disarmResume();
  }
}, true);

document.addEventListener('click', (event) => {
  const target = event.target.closest?.('#selCopy, #selShare, #selNote');
  if (!target) return;
  const snapshot = actionableSelection();
  if (!snapshot) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  document.getElementById('selPop')?.setAttribute('hidden', '');
  disarmResume();

  if (target.id === 'selCopy') {
    copy(snapshot.text);
    return;
  }
  if (target.id === 'selShare') {
    void chapterFor(snapshot).then((chapter) => {
      if (!chapter) return;
      copy(`“${snapshot.text}”\n${selectionUrl(snapshot, chapter)}`);
    });
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
    offset: pending.anchor?.start ?? pending.offset,
    quote: pending.text,
    body: document.getElementById('noteBody')?.value.trim() || '',
    anchor: pending.anchor,
  });
  document.getElementById('noteDialog')?.classList.remove('active');
  refreshNote(pending.chapter, pending.slug);
  toast('Note saved');
}, true);