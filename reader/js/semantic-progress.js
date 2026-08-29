import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute } from './router.js';
import { sourceAnchorFromRects } from './reading-position.js';
import { buildProgressMap, progressAt } from './progress-position.js';

const cache = new Map();
let scheduled = false;

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

function paint(result) {
  const pct = result.percent;
  const bar = document.getElementById('progressBarFill');
  const text = document.getElementById('progressPercent');
  const circle = document.getElementById('statsCircle');
  const stats = document.getElementById('statsPercent');

  if (bar) {
    if (bar.style.width !== `${pct}%`) bar.style.width = `${pct}%`;
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Book progress');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', String(pct));
  }
  if (text && text.textContent !== `${pct}%`) text.textContent = `${pct}%`;
  if (stats && stats.textContent !== `${pct}%`) stats.textContent = `${pct}%`;
  if (circle) circle.style.setProperty('--pct', String(pct));
}

async function sync() {
  scheduled = false;
  if (document.body.dataset.stage !== 'read') return;
  const route = parseRoute();
  if (route.view !== 'read' || !route.slug || !route.chapter || route.chapter === 'back-cover') return;
  try {
    const map = await progressMap(route.slug);
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
  ['hashchange', 'popstate', 'resize', 'orientationchange'].forEach((type) => {
    window.addEventListener(type, schedule, { passive: true });
  });
  document.addEventListener('scroll', schedule, { capture: true, passive: true });

  const progress = document.getElementById('progressPercent');
  if (progress) new MutationObserver(schedule).observe(progress, { childList: true, characterData: true, subtree: true });

  const stageObserver = new MutationObserver(schedule);
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  schedule();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
