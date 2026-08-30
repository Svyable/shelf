import { foldSearchText } from './search.js';

const MARK_CLASS = 'search-landing-mark';
const TARGET_TTL = 8000;
const CLEAR_DELAY = 7000;
let pendingTarget = null;
let clearTimer = null;
let observer = null;

function compactVisibleText(text) {
  const source = String(text || '');
  let textOut = '';
  const sourceMap = [];
  let pendingSpace = false;
  let pendingOffset = 0;

  for (let index = 0; index < source.length; index += 1) {
    const ch = source[index];
    if (/\s/.test(ch)) {
      if (textOut && !textOut.endsWith(' ')) {
        pendingSpace = true;
        pendingOffset = index;
      }
      continue;
    }
    if (pendingSpace) {
      textOut += ' ';
      sourceMap.push(pendingOffset);
      pendingSpace = false;
    }
    textOut += ch;
    sourceMap.push(index);
  }
  return { text: textOut.trim(), sourceMap: sourceMap.slice(0, textOut.trimEnd().length) };
}

function normalizedNeedle(query) {
  return foldSearchText(String(query || '').trim().replace(/\s+/g, ' ')).folded;
}

export function searchTargetFromHref(href, query = '') {
  if (!href) return null;
  let hash = '';
  try {
    hash = new URL(href, 'https://bookself.invalid/').hash;
  } catch {
    return null;
  }
  const match = hash.match(/^#\/b\/([^/]+)\/([^/]+)\/(\d+)$/);
  if (!match) return null;
  const offset = Number(match[3]);
  if (!Number.isFinite(offset)) return null;
  return {
    hash,
    slug: decodeURIComponent(match[1]),
    chapter: decodeURIComponent(match[2]),
    offset,
    query: String(query || '').trim(),
  };
}

export function visibleMatchRange(text, query, sourceRatio = 0) {
  const compact = compactVisibleText(text);
  const folded = foldSearchText(compact.text, compact.sourceMap);
  const needle = normalizedNeedle(query);
  if (needle.length < 2 || !folded.folded.length) return null;

  const ratio = Math.max(0, Math.min(1, Number(sourceRatio) || 0));
  const sourceLength = Math.max(1, String(text || '').length);
  const candidates = [];
  let from = 0;
  while (from <= folded.folded.length - needle.length) {
    const index = folded.folded.indexOf(needle, from);
    if (index < 0) break;
    const last = Math.min(index + needle.length - 1, folded.sourceMap.length - 1);
    const start = folded.sourceMap[index];
    const end = (folded.sourceMap[last] ?? start) + 1;
    const midpointRatio = ((start + end) / 2) / sourceLength;
    candidates.push({ start, end, distance: Math.abs(midpointRatio - ratio) });
    from = index + Math.max(needle.length, 1);
  }
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.distance - b.distance || a.start - b.start);
  return { start: candidates[0].start, end: candidates[0].end };
}

export function blockContainsOffset(start, end, offset) {
  const lo = Math.max(0, Number(start) || 0);
  const hi = Math.max(lo, Number(end) || lo);
  const point = Math.max(0, Number(offset) || 0);
  return point >= lo && point < hi;
}

function visibleSourceBlocks() {
  return [...document.querySelectorAll('[data-source-start][data-source-end]')]
    .filter((element) => element.getClientRects().length > 0);
}

function sourceBlockForTarget(target) {
  const candidates = visibleSourceBlocks().filter((element) => blockContainsOffset(
    element.dataset.sourceStart,
    element.dataset.sourceEnd,
    target.offset
  ));
  if (!candidates.length) return null;
  return candidates.reduce((best, element) => {
    const bestSpan = Number(best.dataset.sourceEnd) - Number(best.dataset.sourceStart);
    const span = Number(element.dataset.sourceEnd) - Number(element.dataset.sourceStart);
    return span < bestSpan ? element : best;
  }, candidates[0]);
}

function textNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest(`.${MARK_CLASS}, script, style`)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const rows = [];
  let cursor = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const start = cursor;
    const end = start + node.nodeValue.length;
    rows.push({ node, start, end });
    cursor = end;
  }
  return rows;
}

function wrapRange(root, range) {
  const rows = textNodes(root);
  const affected = rows.filter((row) => row.end > range.start && row.start < range.end).reverse();
  const marks = [];
  for (const row of affected) {
    const localStart = Math.max(0, range.start - row.start);
    const localEnd = Math.min(row.node.nodeValue.length, range.end - row.start);
    if (localEnd <= localStart) continue;
    const selected = localEnd < row.node.nodeValue.length ? row.node.splitText(localEnd) : null;
    const target = localStart > 0 ? row.node.splitText(localStart) : row.node;
    const mark = document.createElement('mark');
    mark.className = MARK_CLASS;
    mark.setAttribute('data-search-landing', 'true');
    target.parentNode?.insertBefore(mark, target);
    mark.appendChild(target);
    marks.push(mark);
    void selected;
  }
  return marks.reverse();
}

function clearLanding({ announce = false } = {}) {
  clearTimeout(clearTimer);
  clearTimer = null;
  document.querySelectorAll(`.${MARK_CLASS}`).forEach((mark) => {
    const parent = mark.parentNode;
    mark.replaceWith(...mark.childNodes);
    parent?.normalize();
  });
  document.documentElement.removeAttribute('data-search-landing');
  if (announce) announceLanding('Search highlight cleared');
}

function ensureAnnouncer() {
  let live = document.getElementById('searchLandingLive');
  if (live) return live;
  live = document.createElement('p');
  live.id = 'searchLandingLive';
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  document.body.appendChild(live);
  return live;
}

function announceLanding(message) {
  const live = ensureAnnouncer();
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = message; });
}

function paintLanding() {
  if (!pendingTarget || pendingTarget.expiresAt < Date.now()) {
    pendingTarget = null;
    return false;
  }
  if (window.location.hash !== pendingTarget.hash) return false;
  const block = sourceBlockForTarget(pendingTarget);
  if (!block) return false;

  clearLanding();
  const start = Number(block.dataset.sourceStart) || 0;
  const end = Math.max(start + 1, Number(block.dataset.sourceEnd) || start + 1);
  const ratio = Math.max(0, Math.min(1, (pendingTarget.offset - start) / (end - start)));
  const range = visibleMatchRange(block.textContent || '', pendingTarget.query, ratio);
  if (!range) return false;
  const marks = wrapRange(block, range);
  if (!marks.length) return false;

  document.documentElement.dataset.searchLanding = 'true';
  const readable = marks.map((mark) => mark.textContent).join('').replace(/\s+/g, ' ').trim();
  announceLanding(readable ? `Search result: ${readable}` : 'Search result highlighted');
  clearTimer = window.setTimeout(() => clearLanding(), CLEAR_DELAY);
  pendingTarget = null;
  return true;
}

function scheduleLanding() {
  requestAnimationFrame(() => {
    if (paintLanding()) return;
    window.setTimeout(paintLanding, 40);
    window.setTimeout(paintLanding, 160);
    window.setTimeout(paintLanding, 420);
  });
}

function installSearchLanding() {
  const hits = document.getElementById('searchHits');
  const input = document.getElementById('bookSearch');
  const stage = document.getElementById('bookStage');
  if (!hits || !input || !stage || document.documentElement.dataset.searchLandingReady === 'true') return;
  document.documentElement.dataset.searchLandingReady = 'true';

  hits.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const target = searchTargetFromHref(link.href, input.value);
    if (!target || target.query.length < 2) return;
    pendingTarget = { ...target, expiresAt: Date.now() + TARGET_TTL };
    scheduleLanding();
  }, true);

  window.addEventListener('hashchange', () => {
    if (pendingTarget && window.location.hash === pendingTarget.hash) scheduleLanding();
    else if (document.querySelector(`.${MARK_CLASS}`)) clearLanding();
  });

  observer = new MutationObserver(() => {
    if (pendingTarget && window.location.hash === pendingTarget.hash) scheduleLanding();
  });
  observer.observe(stage, { childList: true, subtree: true });

  const clearOnReadingIntent = (event) => {
    if (!document.querySelector(`.${MARK_CLASS}`)) return;
    if (event.target.closest?.('#searchOverlay, .search-landing-mark')) return;
    clearLanding();
  };
  document.addEventListener('pointerdown', clearOnReadingIntent, true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' || event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta') return;
    clearOnReadingIntent(event);
  }, true);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installSearchLanding, { once: true });
  } else {
    installSearchLanding();
  }
}
