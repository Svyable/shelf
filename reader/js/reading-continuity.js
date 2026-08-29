import { parseRoute, readHash } from './router.js';
import { loadProgress, saveProgress } from './storage.js';
import {
  sourceAnchorFromRects,
  scrollTopForSourceAnchor,
} from './reading-position.js';

const REFLOW_CLICK = [
  '#viewModeBtn',
  '#fontDecrease',
  '#fontIncrease',
  '[data-font]',
  '[data-leading]',
  '[data-reader-mode-value]',
  '[data-reader-font-value]',
  '[data-reader-weight-value]',
  '[data-reader-measure-value]',
  '[data-reader-align-value]',
  '[data-reader-paragraph-value]',
  '[data-reader-indent-value]',
  '[data-reader-hyphens-value]',
  '[data-reader-preset]',
  '#readerReset',
].join(',');

const REFLOW_INPUT = '#readerFontSize, #readerLeading, #readerTracking';
const state = {
  installed: false,
  pending: null,
  restoreTimer: 0,
  scrollReader: null,
  scrollRaf: 0,
  pageObserver: null,
  rootObserver: null,
  stageObserver: null,
  scrollBindObserver: null,
  restoring: false,
};

function pagedRead() {
  return document.body.dataset.stage === 'read'
    && document.documentElement.dataset.readerMode !== 'scroll';
}

function scrollRead() {
  return document.body.dataset.stage === 'read'
    && document.documentElement.dataset.readerMode === 'scroll';
}

function probeDistance(height) {
  return Math.min(Math.max(0, height) * 0.3, 220);
}

function sourceRange(element) {
  if (!element) return null;
  const start = Number(element.dataset.sourceStart);
  const end = Number(element.dataset.sourceEnd);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  return { start, end };
}

function pagedAnchor() {
  if (!pagedRead()) return null;
  const route = parseRoute();
  if (route.view !== 'read' || !route.slug || !route.chapter) return null;
  const inner = document.querySelector('#pageLeft.active .page-inner, #pageLeft .page-inner');
  if (!inner) return null;

  const rect = inner.getBoundingClientRect();
  const probeY = rect.top + probeDistance(rect.height);
  const fragments = [...inner.children]
    .map((element) => {
      const range = sourceRange(element);
      if (!range) return null;
      const box = element.getBoundingClientRect();
      return { ...range, top: box.top, bottom: box.bottom };
    })
    .filter(Boolean);
  const anchor = sourceAnchorFromRects(fragments, probeY);
  if (!anchor) return null;
  return {
    slug: route.slug,
    chapter: route.chapter,
    offset: anchor.offset,
    start: anchor.start,
    end: anchor.end,
    mode: 'paged',
  };
}

function blockRange(block) {
  if (!block) return null;
  const marked = block.firstElementChild;
  const exact = sourceRange(marked);
  if (exact) return exact;
  const start = Number(block.dataset.offset);
  if (!Number.isFinite(start)) return null;
  const next = block.nextElementSibling?.classList?.contains('scroll-block')
    ? Number(block.nextElementSibling.dataset.offset)
    : NaN;
  const fallbackEnd = start + Math.max(1, block.textContent?.length || 1);
  return { start, end: Number.isFinite(next) && next >= start ? next : fallbackEnd };
}

function nearestScrollBlock(reader, y) {
  const rect = reader.getBoundingClientRect();
  const x = rect.left + rect.width * 0.5;
  const hit = document.elementFromPoint(x, y);
  const direct = hit?.closest?.('.scroll-block');
  if (direct && reader.contains(direct)) return direct;

  let best = null;
  let bestDistance = Infinity;
  for (const block of reader.querySelectorAll('.scroll-block')) {
    const box = block.getBoundingClientRect();
    const distance = y < box.top ? box.top - y : y > box.bottom ? y - box.bottom : 0;
    if (distance < bestDistance) {
      best = block;
      bestDistance = distance;
      if (distance === 0) break;
    }
  }
  return best;
}

function scrollAnchor() {
  if (!scrollRead()) return null;
  const reader = document.getElementById('scrollReader');
  const route = parseRoute();
  if (!reader || reader.hidden || route.view !== 'read' || !route.slug) return null;
  const rect = reader.getBoundingClientRect();
  const y = rect.top + probeDistance(reader.clientHeight);
  const block = nearestScrollBlock(reader, y);
  const range = blockRange(block);
  if (!block || !range) return null;
  const box = block.getBoundingClientRect();
  const anchor = sourceAnchorFromRects([{ ...range, top: box.top, bottom: box.bottom }], y);
  if (!anchor) return null;
  return {
    slug: route.slug,
    chapter: block.dataset.chapter || route.chapter,
    offset: anchor.offset,
    start: range.start,
    end: range.end,
    mode: 'scroll',
  };
}

function currentAnchor() {
  return scrollRead() ? scrollAnchor() : pagedAnchor();
}

function routeUrl(anchor) {
  const q = new URLSearchParams();
  q.set('b', anchor.slug);
  q.set('c', anchor.chapter);
  if (anchor.offset) q.set('o', String(anchor.offset));
  return `${window.location.pathname}?${q.toString()}${readHash(anchor.slug, anchor.chapter, anchor.offset)}`;
}

function emitPosition(anchor) {
  window.dispatchEvent(new CustomEvent('bookself:reading-position', {
    detail: {
      slug: anchor.slug,
      chapter: anchor.chapter,
      offset: anchor.offset,
      mode: anchor.mode,
    },
  }));
}

function replaceCanonical(anchor, { notify = false } = {}) {
  if (!anchor?.slug || !anchor.chapter) return;
  const url = routeUrl(anchor);
  const here = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (url !== here) history.replaceState(null, '', url);

  try {
    const previous = loadProgress(anchor.slug) || {};
    saveProgress(anchor.slug, {
      ...previous,
      chapter: anchor.chapter,
      offset: anchor.offset,
    });
  } catch {
    // Canonical routing still works when storage is unavailable.
  }

  emitPosition(anchor);
  if (notify) window.dispatchEvent(new HashChangeEvent('hashchange'));
}

function canonicalizePaged() {
  if (state.restoring || state.pending || !pagedRead()) return;
  const anchor = pagedAnchor();
  if (anchor) replaceCanonical(anchor);
}

function canonicalizeScroll() {
  if (state.restoring || !scrollRead()) return;
  const anchor = scrollAnchor();
  if (anchor) replaceCanonical(anchor);
}

function restorePendingPaged() {
  if (!state.pending || !pagedRead()) return;
  const anchor = state.pending;
  state.pending = null;
  clearTimeout(state.restoreTimer);
  state.restoring = true;
  replaceCanonical({ ...anchor, mode: 'paged' }, { notify: true });
  window.setTimeout(() => {
    state.restoring = false;
    canonicalizePaged();
  }, 0);
}

function schedulePendingFallback() {
  clearTimeout(state.restoreTimer);
  state.restoreTimer = window.setTimeout(() => {
    if (!state.pending) return;
    if (scrollRead()) {
      const anchor = state.pending;
      alignScrollLater(anchor);
      return;
    }
    restorePendingPaged();
  }, 360);
}

function captureForReflow() {
  if (document.body.dataset.stage !== 'read') return;
  const anchor = currentAnchor();
  if (!anchor) return;
  state.pending = anchor;
  // Make the semantic anchor canonical before any layout/mode mutation. The
  // next renderer can then consume the same source position.
  replaceCanonical(anchor);
  schedulePendingFallback();
}

function relativeTop(element, ancestor) {
  let top = 0;
  let node = element;
  while (node && node !== ancestor) {
    top += node.offsetTop || 0;
    node = node.offsetParent;
  }
  return top;
}

function blockForAnchor(reader, anchor) {
  const sameChapter = [...reader.querySelectorAll('.scroll-block')]
    .filter((block) => block.dataset.chapter === anchor.chapter);
  if (!sameChapter.length) return null;
  let best = sameChapter[0];
  for (const block of sameChapter) {
    const range = blockRange(block);
    if (!range) continue;
    if (anchor.offset >= range.start) best = block;
    if (anchor.offset >= range.start && anchor.offset <= range.end) return block;
    if (range.start > anchor.offset) break;
  }
  return best;
}

function alignScroll(anchor) {
  if (!scrollRead() || !anchor?.chapter) return false;
  const reader = document.getElementById('scrollReader');
  if (!reader || reader.hidden) return false;
  const block = blockForAnchor(reader, anchor);
  const range = blockRange(block);
  if (!block || !range) return false;

  const current = scrollAnchor();
  const tolerance = Math.max(6, Math.round((range.end - range.start) * 0.04));
  if (current?.chapter === anchor.chapter && Math.abs(current.offset - anchor.offset) <= tolerance) {
    state.pending = null;
    clearTimeout(state.restoreTimer);
    return true;
  }

  const top = relativeTop(block, reader);
  const maxScroll = Math.max(0, reader.scrollHeight - reader.clientHeight);
  const target = scrollTopForSourceAnchor({
    blockTop: top,
    blockHeight: block.offsetHeight,
    sourceStart: range.start,
    sourceEnd: range.end,
    sourceOffset: anchor.offset,
    probeDistance: probeDistance(reader.clientHeight),
    maxScroll,
  });
  reader.scrollTo({ top: target, behavior: 'auto' });
  state.pending = null;
  clearTimeout(state.restoreTimer);
  window.setTimeout(canonicalizeScroll, 34);
  return true;
}

function alignScrollLater(anchor, attempts = 12) {
  if (!anchor || !scrollRead()) return;
  if (alignScroll(anchor)) return;
  if (attempts <= 0) {
    state.pending = null;
    return;
  }
  window.setTimeout(() => alignScrollLater(anchor, attempts - 1), 42);
}

function routeAnchor() {
  const route = parseRoute();
  if (route.view !== 'read' || !route.slug || !route.chapter) return null;
  return {
    slug: route.slug,
    chapter: route.chapter,
    offset: Math.max(0, Number(route.offset) || 0),
    mode: document.documentElement.dataset.readerMode === 'scroll' ? 'scroll' : 'paged',
  };
}

function onRouteChange() {
  if (!scrollRead()) return;
  const anchor = routeAnchor();
  if (!anchor) return;
  // Continuous mode historically jumped only to the beginning of the source
  // block. Re-map the exact source offset within that block after it exists.
  window.setTimeout(() => alignScrollLater(anchor), 0);
}

function onScroll() {
  if (state.scrollRaf) return;
  state.scrollRaf = requestAnimationFrame(() => {
    state.scrollRaf = requestAnimationFrame(() => {
      state.scrollRaf = 0;
      canonicalizeScroll();
    });
  });
}

function bindScrollReader() {
  const reader = document.getElementById('scrollReader');
  if (!reader || reader === state.scrollReader) return !!reader;
  if (state.scrollReader) state.scrollReader.removeEventListener('scroll', onScroll);
  state.scrollReader = reader;
  reader.addEventListener('scroll', onScroll, { passive: true });
  return true;
}

function installScrollBindingObserver() {
  if (bindScrollReader()) return;
  const stage = document.getElementById('bookStage') || document.body;
  state.scrollBindObserver = new MutationObserver(() => {
    if (!bindScrollReader()) return;
    state.scrollBindObserver?.disconnect();
    state.scrollBindObserver = null;
  });
  state.scrollBindObserver.observe(stage, { childList: true, subtree: true });
}

function onPageMutation() {
  if (state.pending && pagedRead()) {
    restorePendingPaged();
    return;
  }
  canonicalizePaged();
}

function installPageObserver() {
  const inner = document.querySelector('#pageLeft .page-inner');
  if (!inner) return;
  state.pageObserver = new MutationObserver(onPageMutation);
  state.pageObserver.observe(inner, { childList: true });
}

function syncMode() {
  bindScrollReader();
  if (scrollRead()) {
    const anchor = state.pending || routeAnchor();
    if (anchor) {
      replaceCanonical({ ...anchor, mode: 'scroll' });
      alignScrollLater(anchor);
    }
    return;
  }
  if (state.pending && pagedRead()) {
    // Scroll -> Pages: restore from the last intra-block source offset rather
    // than the block beginning written by the legacy scroll synchronizer.
    replaceCanonical({ ...state.pending, mode: 'paged' });
    window.setTimeout(restorePendingPaged, 0);
  }
}

function installStateObservers() {
  state.rootObserver = new MutationObserver(syncMode);
  state.rootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reader-mode'],
  });
  state.stageObserver = new MutationObserver(() => {
    if (document.body.dataset.stage !== 'read') {
      state.pending = null;
      clearTimeout(state.restoreTimer);
    } else if (scrollRead()) {
      bindScrollReader();
      onRouteChange();
    } else {
      canonicalizePaged();
    }
  });
  state.stageObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-stage'],
  });
}

function reflowClick(event) {
  if (event.target.closest?.(REFLOW_CLICK)) captureForReflow();
}

function reflowInput(event) {
  if (event.target.matches?.(REFLOW_INPUT)) captureForReflow();
}

export function installReadingContinuity() {
  if (state.installed || typeof document === 'undefined') return;
  state.installed = true;
  document.documentElement.dataset.readingContinuity = 'source-anchor';

  installPageObserver();
  installScrollBindingObserver();
  installStateObservers();

  document.addEventListener('click', reflowClick, true);
  document.addEventListener('input', reflowInput, true);
  window.addEventListener('resize', captureForReflow, true);
  window.addEventListener('orientationchange', captureForReflow, true);
  window.visualViewport?.addEventListener('resize', captureForReflow, true);
  window.addEventListener('hashchange', onRouteChange);

  if (scrollRead()) onRouteChange();
  else canonicalizePaged();
}
