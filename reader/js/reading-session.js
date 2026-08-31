import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute } from './router.js';
import { loadStats, saveStats } from './storage.js';
import {
  DEFAULT_READING_WPM,
  activeSecondsFromStats,
  advanceReadingClock,
  buildReadingWordMap,
  estimateReadingMinutes,
  formatReadingDuration,
  readingEligible,
  readingWordPosition,
} from './reading-session-model.js';

const TICK_MS = 15000;
const wordMaps = new Map();
let installed = false;
let currentSlug = '';
let latestAnchor = null;
let lastActivityAt = Date.now();
let pendingMs = 0;
let clockState = { lastAt: Date.now(), eligible: false };
let reconcileTimer = 0;
let estimateToken = 0;
let lastEstimateKey = '';

function overlaysOpen() {
  return !!document.querySelector(
    'dialog[open], .toc-overlay.active, .stats-overlay.active, .search-overlay.active, [role="dialog"][aria-modal="true"]:not([hidden])'
  );
}

function sample(now = Date.now()) {
  return {
    now,
    stage: document.body.dataset.stage || '',
    visible: !document.hidden,
    overlayOpen: overlaysOpen(),
    lastActivityAt,
  };
}

function ensureRemainingStat() {
  let value = document.getElementById('timeRemaining');
  if (value) return value;
  const spent = document.getElementById('timeSpent');
  const details = spent?.closest('.stats-details');
  if (!details) return null;

  const item = document.createElement('div');
  item.className = 'stat-item';
  value = document.createElement('span');
  value.className = 'stat-value';
  value.id = 'timeRemaining';
  value.textContent = '—';
  const label = document.createElement('span');
  label.className = 'stat-label';
  label.textContent = 'Est. left';
  item.append(value, label);
  details.appendChild(item);
  return value;
}

function renderActiveTime(slug = currentSlug) {
  if (!slug) return;
  const stats = loadStats(slug);
  const seconds = activeSecondsFromStats(stats);
  const spent = document.getElementById('timeSpent');
  if (spent) {
    spent.textContent = formatReadingDuration(seconds);
    spent.title = 'Active reading time';
  }
}

function seedActiveTime(slug) {
  if (!slug) return;
  const stats = loadStats(slug);
  if (!Number.isFinite(Number(stats.activeSeconds))) {
    stats.activeSeconds = activeSecondsFromStats(stats);
    saveStats(slug, stats);
  }
  renderActiveTime(slug);
}

function recordActiveMs(slug, milliseconds) {
  if (!slug || milliseconds <= 0) return;
  pendingMs += milliseconds;
  const wholeSeconds = Math.floor(pendingMs / 1000);
  if (wholeSeconds <= 0) return;
  pendingMs -= wholeSeconds * 1000;

  const stats = loadStats(slug);
  stats.activeSeconds = activeSecondsFromStats(stats) + wholeSeconds;
  stats.minutes = Math.floor(stats.activeSeconds / 60);
  saveStats(slug, stats);
  renderActiveTime(slug);
}

function flushClock(now = Date.now()) {
  const advanced = advanceReadingClock(clockState, sample(now));
  clockState = advanced.state;
  if (currentSlug) recordActiveMs(currentSlug, advanced.accruedMs);
}

function resetClock(now = Date.now()) {
  clockState = {
    lastAt: now,
    eligible: readingEligible(sample(now)),
  };
}

function routeAnchor() {
  const route = parseRoute();
  if (route.view !== 'read' || !route.slug || !route.chapter || route.chapter === 'back-cover') return null;
  return {
    slug: route.slug,
    chapter: route.chapter,
    offset: Number(route.offset) || 0,
  };
}

function refreshContext() {
  const now = Date.now();
  flushClock(now);
  const anchor = routeAnchor();
  const nextSlug = document.body.dataset.stage === 'read' ? anchor?.slug || '' : '';

  if (nextSlug !== currentSlug) {
    currentSlug = nextSlug;
    pendingMs = 0;
    latestAnchor = anchor;
    lastActivityAt = now;
    if (currentSlug) seedActiveTime(currentSlug);
  } else if (anchor) {
    latestAnchor = { ...latestAnchor, ...anchor };
  }
  resetClock(now);
  if (latestAnchor) updateEstimate(latestAnchor);
}

function scheduleReconcile() {
  if (reconcileTimer) return;
  reconcileTimer = window.setTimeout(() => {
    reconcileTimer = 0;
    const now = Date.now();
    flushClock(now);
    resetClock(now);
  }, 0);
}

function markActivity() {
  lastActivityAt = Date.now();
  scheduleReconcile();
}

function readingWordMap(slug) {
  if (!slug) return Promise.resolve(null);
  if (wordMaps.has(slug)) return wordMaps.get(slug);

  const loading = (async () => {
    const readme = await fetchText(`books/${slug}/README.md`);
    const meta = parseBookReadme(readme, slug);
    const chapters = await Promise.all(meta.contents.map(async (chapter) => ({
      ...chapter,
      markdown: await fetchText(`books/${slug}/${chapter.file}`).catch(() => ''),
    })));
    return buildReadingWordMap(chapters);
  })().catch((error) => {
    wordMaps.delete(slug);
    throw error;
  });
  wordMaps.set(slug, loading);
  return loading;
}

function compactRemaining(minutes) {
  if (minutes <= 0) return 'Done';
  return `~${formatReadingDuration(minutes * 60)}`;
}

function paintEstimate(position, minutes) {
  const value = ensureRemainingStat();
  const header = document.getElementById('readingTime');
  const compact = compactRemaining(minutes);
  const words = Math.max(0, position?.wordsRemaining || 0);
  const detail = minutes > 0
    ? `Estimated ${compact.slice(1)} remaining at ${DEFAULT_READING_WPM} words per minute (${words.toLocaleString()} words)`
    : 'At the end of the book';

  if (value && value.textContent !== compact) value.textContent = compact;
  if (value) value.title = detail;
  if (header) {
    header.dataset.readerTimeManaged = 'true';
    const text = minutes > 0 ? `${compact} left` : 'Done';
    if (header.textContent !== text) header.textContent = text;
    header.title = detail;
    header.setAttribute('aria-label', detail);
  }
}

async function updateEstimate(anchor = latestAnchor) {
  if (!anchor?.slug || !anchor.chapter || document.body.dataset.stage !== 'read') return;
  const key = `${anchor.slug}:${anchor.chapter}:${Math.max(0, Number(anchor.offset) || 0)}`;
  if (key === lastEstimateKey) return;
  const token = ++estimateToken;
  try {
    const map = await readingWordMap(anchor.slug);
    if (token !== estimateToken || currentSlug !== anchor.slug || !map) return;
    const position = readingWordPosition(map, anchor.chapter, anchor.offset);
    const minutes = estimateReadingMinutes(position.wordsRemaining);
    lastEstimateKey = key;
    paintEstimate(position, minutes);
  } catch (error) {
    console.warn('Reading time remaining could not be estimated', error);
  }
}

function onProgress(event) {
  const detail = event.detail || {};
  if (!detail.slug || !detail.chapter) return;
  latestAnchor = {
    slug: detail.slug,
    chapter: detail.chapter,
    offset: Number(detail.offset) || 0,
  };
  if (detail.slug !== currentSlug) refreshContext();
  else updateEstimate(latestAnchor);
}

function syncEstimateFromRoute() {
  const anchor = routeAnchor();
  if (!anchor) return;
  latestAnchor = anchor;
  if (anchor.slug === currentSlug) updateEstimate(anchor);
}

export function installReadingSession() {
  if (installed) return;
  installed = true;
  ensureRemainingStat();
  refreshContext();

  document.addEventListener('bookself:reading-progress', onProgress);
  document.addEventListener('pointerdown', markActivity, { capture: true, passive: true });
  document.addEventListener('keydown', markActivity, { capture: true });
  document.addEventListener('scroll', markActivity, { capture: true, passive: true });
  document.addEventListener('selectionchange', markActivity, { passive: true });

  window.addEventListener('hashchange', refreshContext, { passive: true });
  window.addEventListener('popstate', refreshContext, { passive: true });
  window.addEventListener('pageshow', refreshContext, { passive: true });
  window.addEventListener('pagehide', () => flushClock(Date.now()), { passive: true });
  document.addEventListener('visibilitychange', () => {
    const now = Date.now();
    flushClock(now);
    if (!document.hidden) lastActivityAt = now;
    resetClock(now);
  });

  const progress = document.getElementById('progressPercent');
  if (progress) {
    new MutationObserver(syncEstimateFromRoute).observe(progress, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  const stageObserver = new MutationObserver(refreshContext);
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });

  window.setInterval(() => flushClock(Date.now()), TICK_MS);
}
