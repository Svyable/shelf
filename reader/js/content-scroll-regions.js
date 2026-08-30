import {
  describedByTokens,
  horizontalKeyboardAction,
  scrollRegionMetrics,
} from './content-scroll-region-model.js';

const REGION_SELECTOR = '.page-inner pre, .page-inner table, .scroll-document pre, .scroll-document table';
const HELP_ID = 'readerHorizontalScrollHelp';
const STYLE_HREF = 'css/content-scroll-regions.css?v=r1';
const watched = new WeakSet();
let resizeObserver = null;
let refreshRaf = 0;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function ensureHelp() {
  let help = document.getElementById(HELP_ID);
  if (help) return help;
  help = document.createElement('p');
  help.id = HELP_ID;
  help.className = 'sr-only';
  help.textContent = 'Scrollable content. Use Left and Right Arrow to pan horizontally; Home and End move to the edges.';
  document.body.appendChild(help);
  return help;
}

function isMeasurementRegion(element) {
  return !!element.closest('#pageMeasure, #pageMeasureInner');
}

function setDescribedBy(element, enabled) {
  const next = describedByTokens(element.getAttribute('aria-describedby'), HELP_ID, enabled);
  if (next) element.setAttribute('aria-describedby', next);
  else element.removeAttribute('aria-describedby');
}

function metricsFor(element) {
  return scrollRegionMetrics({
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
    scrollLeft: element.scrollLeft,
  });
}

function reflect(element) {
  if (!element?.isConnected || isMeasurementRegion(element)) return;
  const metrics = metricsFor(element);
  element.classList.toggle('reader-scroll-region', metrics.scrollable);
  element.classList.toggle('can-scroll-left', metrics.canScrollLeft);
  element.classList.toggle('can-scroll-right', metrics.canScrollRight);
  element.dataset.readerScrollRegion = metrics.scrollable ? 'true' : 'false';

  if (metrics.scrollable) {
    if (!element.hasAttribute('tabindex')) {
      element.tabIndex = 0;
      element.dataset.readerAddedTabindex = 'true';
    }
    setDescribedBy(element, true);
  } else {
    if (element.dataset.readerAddedTabindex === 'true') {
      element.removeAttribute('tabindex');
      delete element.dataset.readerAddedTabindex;
    }
    setDescribedBy(element, false);
  }
}

function stopReaderGesture(event) {
  const region = event.currentTarget;
  if (!(region instanceof Element) || region.dataset.readerScrollRegion !== 'true') return;
  event.stopPropagation();
}

function onKeydown(event) {
  const region = event.currentTarget;
  if (!(region instanceof HTMLElement) || region.dataset.readerScrollRegion !== 'true') return;
  const action = horizontalKeyboardAction(event.key, event, region.clientWidth);
  if (!action) return;

  event.preventDefault();
  event.stopPropagation();
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  if (action.type === 'delta') {
    region.scrollBy({ left: action.dx, behavior });
  } else {
    region.scrollTo({
      left: action.edge === 'end' ? Math.max(0, region.scrollWidth - region.clientWidth) : 0,
      behavior,
    });
  }
}

function prepare(element) {
  if (!(element instanceof HTMLElement) || isMeasurementRegion(element)) return;
  if (!watched.has(element)) {
    watched.add(element);
    element.addEventListener('click', stopReaderGesture);
    element.addEventListener('touchstart', stopReaderGesture, { passive: true });
    element.addEventListener('touchend', stopReaderGesture, { passive: true });
    element.addEventListener('keydown', onKeydown);
    element.addEventListener('scroll', () => reflect(element), { passive: true });
    resizeObserver?.observe(element);
  }
  reflect(element);
}

function scan(root = document) {
  if (root instanceof Element && root.matches(REGION_SELECTOR)) prepare(root);
  root.querySelectorAll?.(REGION_SELECTOR).forEach(prepare);
}

function scheduleScan() {
  if (refreshRaf) cancelAnimationFrame(refreshRaf);
  refreshRaf = requestAnimationFrame(() => {
    refreshRaf = 0;
    scan();
  });
}

installStyles();
ensureHelp();
if ('ResizeObserver' in window) {
  resizeObserver = new ResizeObserver((entries) => entries.forEach(({ target }) => reflect(target)));
}
scan();

new MutationObserver((records) => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node instanceof Element) scan(node);
    }
  }
}).observe(document.body, { childList: true, subtree: true });

window.addEventListener('resize', scheduleScan, { passive: true });
window.addEventListener('orientationchange', scheduleScan, { passive: true });
window.visualViewport?.addEventListener('resize', scheduleScan, { passive: true });
document.fonts?.ready?.then(scheduleScan).catch(() => {});
