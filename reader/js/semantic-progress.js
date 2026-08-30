import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute, readHash, go } from './router.js';
import { sourceAnchorFromRects } from './reading-position.js';
import { buildProgressMap, progressAt, positionAtProgress } from './progress-position.js';

const cache = new Map();
const SEEK_STEP = 1;
const SEEK_PAGE_STEP = 10;
let scheduled = false;
let seekControl = null;
let seekLabel = null;
let seekMap = null;
let seekSlug = '';
let lastResult = null;
let seeking = false;

async function progressMap(slug) {
  if (!slug) return null;
  if (cache.has(slug)) return cache.get(slug);
  const loading = (async () => {
    const readme = await fetchText(`books/${slug}/README.md`);
    const meta = parseBookReadme(readme, slug);
    const chapters = await Promise.all(meta.contents.map(async (chapter) => ({
      ...chapter,
      markdown: await fetchText(`books/${slug}/${chapter.file}`).catch(() => ''),
    })));
    return buildProgressMap(chapters);
  })();
  cache.set(slug, loading);
  return loading;
}

function visualAnchor(route) {
  const scroll = document.documentElement.dataset.readerMode === 'scroll';
  const host = scroll
    ? document.getElementById('scrollReader')
    : document.querySelector('#pagesWrapper .page-surface.active');
  if (!host || host.hidden) return { chapter: route.chapter, offset: route.offset || 0 };

  const hostRect = host.getBoundingClientRect();
  const probeY = hostRect.top + Math.min(hostRect.height * 0.3, 220);
  const fragments = [...host.querySelectorAll('[data-source-start][data-source-end]')]
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        element,
        start: element.dataset.sourceStart,
        end: element.dataset.sourceEnd,
        top: rect.top,
        bottom: rect.bottom,
      };
    })
    .filter((fragment) => fragment.bottom >= hostRect.top && fragment.top <= hostRect.bottom);
  const anchor = sourceAnchorFromRects(fragments, probeY);
  if (!anchor) return { chapter: route.chapter, offset: route.offset || 0 };

  const fragment = fragments.find((item) => (
    Number(item.start) === anchor.start && Number(item.end) === anchor.end
  ));
  const chapter = scroll
    ? fragment?.element.closest('[data-chapter]')?.dataset.chapter || route.chapter
    : route.chapter;
  return { chapter, offset: anchor.offset };
}

function clampPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function percentLabel(value) {
  const rounded = Math.round(clampPercent(value) * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
}

function seekText(value, target) {
  const pct = percentLabel(value);
  const title = String(target?.title || '').trim();
  return title ? `${pct} · ${title}` : pct;
}

function seekContainer() {
  return document.querySelector('.progress-bar-container');
}

function setSeeking(active) {
  seeking = !!active;
  seekContainer()?.classList.toggle('is-seeking', seeking);
}

function previewSeek(value, { paintBar = true } = {}) {
  if (!seekControl || !seekMap) return null;
  const pct = clampPercent(value);
  const target = positionAtProgress(seekMap, pct / 100);
  const container = seekContainer();
  const bar = document.getElementById('progressBarFill');
  const text = seekText(pct, target);

  seekControl.value = String(pct);
  seekControl.setAttribute('aria-valuetext', text);
  if (seekLabel) seekLabel.textContent = text;
  container?.style.setProperty('--reader-seek-position', `${pct}%`);
  if (paintBar && bar) bar.style.width = `${pct}%`;
  return target;
}

function restoreSeekPreview() {
  if (!lastResult || !seekControl) return;
  previewSeek(lastResult.book * 100, { paintBar: false });
  const bar = document.getElementById('progressBarFill');
  if (bar) bar.style.width = `${lastResult.percent}%`;
}

function syncSeekAvailability() {
  if (!seekControl) return;
  const active = document.body.dataset.stage === 'read';
  seekControl.disabled = !active;
  seekControl.tabIndex = active ? 0 : -1;
  if (!active) setSeeking(false);
}

function commitSeek(value = seekControl?.value) {
  if (!seekControl || !seekMap || document.body.dataset.stage !== 'read') {
    setSeeking(false);
    restoreSeekPreview();
    return;
  }

  const route = parseRoute();
  if (route.view !== 'read' || !route.slug || route.slug !== seekSlug) {
    setSeeking(false);
    restoreSeekPreview();
    schedule();
    return;
  }

  const target = positionAtProgress(seekMap, clampPercent(value) / 100);
  setSeeking(false);
  if (!target.chapterId) {
    restoreSeekPreview();
    return;
  }

  if (route.chapter === target.chapterId && Number(route.offset || 0) === target.offset) {
    schedule();
    return;
  }
  go(readHash(route.slug, target.chapterId, target.offset));
}

function cancelSeek() {
  setSeeking(false);
  restoreSeekPreview();
}

function onSeekKeyDown(event) {
  if (!seekControl || seekControl.disabled) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    cancelSeek();
    seekControl.blur();
    return;
  }

  const current = clampPercent(seekControl.value);
  let next = null;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = current - SEEK_STEP;
  else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = current + SEEK_STEP;
  else if (event.key === 'PageUp') next = current - SEEK_PAGE_STEP;
  else if (event.key === 'PageDown') next = current + SEEK_PAGE_STEP;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = 100;
  if (next == null) return;

  event.preventDefault();
  event.stopPropagation();
  setSeeking(true);
  previewSeek(next);
  commitSeek(next);
}

function ensureSeekControl() {
  if (seekControl) return;
  const container = seekContainer();
  if (!container) return;

  container.dataset.readerSeekable = 'true';
  seekControl = document.createElement('input');
  seekControl.type = 'range';
  seekControl.className = 'progress-seek';
  seekControl.min = '0';
  seekControl.max = '100';
  seekControl.step = '0.1';
  seekControl.value = '0';
  seekControl.autocomplete = 'off';
  seekControl.setAttribute('aria-label', 'Seek through book');

  seekLabel = document.createElement('output');
  seekLabel.className = 'progress-seek-label';
  seekLabel.setAttribute('aria-hidden', 'true');
  seekLabel.textContent = '0%';

  container.append(seekControl, seekLabel);
  seekControl.addEventListener('pointerdown', () => {
    if (seekControl.disabled) return;
    setSeeking(true);
    previewSeek(seekControl.value);
  });
  seekControl.addEventListener('input', () => {
    setSeeking(true);
    previewSeek(seekControl.value);
  });
  seekControl.addEventListener('change', () => commitSeek());
  seekControl.addEventListener('pointercancel', cancelSeek);
  seekControl.addEventListener('keydown', onSeekKeyDown);
  seekControl.addEventListener('focus', () => previewSeek(seekControl.value, { paintBar: false }));
  seekControl.addEventListener('blur', () => {
    if (seeking) cancelSeek();
    seekContainer()?.classList.remove('is-seeking');
  });
  syncSeekAvailability();
}

function paint(result) {
  const pct = result.percent;
  const bar = document.getElementById('progressBarFill');
  const text = document.getElementById('progressPercent');
  const circle = document.getElementById('statsCircle');
  const stats = document.getElementById('statsPercent');

  lastResult = result;
  if (bar) {
    if (!seeking && bar.style.width !== `${pct}%`) bar.style.width = `${pct}%`;
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Book progress');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', String(pct));
  }
  if (text && text.textContent !== `${pct}%`) text.textContent = `${pct}%`;
  if (stats && stats.textContent !== `${pct}%`) stats.textContent = `${pct}%`;
  if (circle) circle.style.setProperty('--pct', String(pct));
  if (seekControl && !seeking) previewSeek(result.book * 100, { paintBar: false });
}

async function sync() {
  scheduled = false;
  syncSeekAvailability();
  if (document.body.dataset.stage !== 'read') return;
  const route = parseRoute();
  if (route.view !== 'read' || !route.slug || !route.chapter || route.chapter === 'back-cover') return;
  try {
    const map = await progressMap(route.slug);
    seekMap = map;
    seekSlug = route.slug;
    const anchor = visualAnchor(route);
    paint(progressAt(map, anchor.chapter, anchor.offset));
  } catch (error) {
    console.warn('Semantic reading progress could not be updated', error);
  }
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => requestAnimationFrame(sync));
}

function install() {
  ensureSeekControl();
  ['hashchange', 'popstate', 'resize', 'orientationchange'].forEach((type) => {
    window.addEventListener(type, schedule, { passive: true });
  });
  document.addEventListener('scroll', schedule, { capture: true, passive: true });

  const progress = document.getElementById('progressPercent');
  if (progress) new MutationObserver(schedule).observe(progress, { childList: true, characterData: true, subtree: true });

  const stageObserver = new MutationObserver(() => {
    syncSeekAvailability();
    schedule();
  });
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  schedule();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
