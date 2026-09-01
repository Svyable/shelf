import {
  describedByTokens,
  horizontalKeyboardDecision,
  overflowEdgeAnnouncement,
  scrollRegionEdge,
  scrollRegionMetrics,
} from './content-scroll-region-model.js';

const REGION_SELECTOR = '.page-inner pre, .page-inner table, .scroll-document pre, .scroll-document table';
const HELP_ID = 'readerHorizontalScrollHelp';
const STATUS_ID = 'readerHorizontalScrollStatus';
const STYLE_HREF = 'css/content-scroll-regions.css?v=r1';
const watched = new WeakSet();
const announcedEdges = new WeakMap();
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
  help.textContent = 'Scrollable content. Use Left and Right Arrow to pan horizontally; Home and End move to the edges. In Pages, pressing an Arrow again at that edge continues reading on the adjacent page.';
  document.body.appendChild(help);
  return help;
}

function ensureStatus() {
  let status = document.getElementById(STATUS_ID);
  if (status) return status;
  status = document.createElement('p');
  status.id = STATUS_ID;
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  document.body.appendChild(status);
  return status;
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

function regionKind(element) {
  return element?.tagName?.toLowerCase() === 'table' ? 'table' : 'code';
}

function pagedReading() {
  return document.body.dataset.stage === 'read'
    && document.documentElement.dataset.readerMode !== 'scroll';
}

function announceEdge(element, edge, { force = false } = {}) {
  if (!element || document.activeElement !== element) return;
  if (!force && announcedEdges.get(element) === edge) return;
  announcedEdges.set(element, edge);
  const message = overflowEdgeAnnouncement({ kind: regionKind(element), edge, paged: pagedReading() });
  if (!message) return;
  const status = ensureStatus();
  status.textContent = '';
  requestAnimationFrame(() => {
    if (document.activeElement === element) status.textContent = message;
  });
}

function reflect(element, { announce = true } = {}) {
  if (!element?.isConnected || isMeasurementRegion(element)) return;
  const metrics = metricsFor(element);
  const edge = scrollRegionEdge(metrics);
  element.classList.toggle('reader-scroll-region', metrics.scrollable);
  element.classList.toggle('can-scroll-left', metrics.canScrollLeft);
  element.classList.toggle('can-scroll-right', metrics.canScrollRight);
  element.dataset.readerScrollRegion = metrics.scrollable ? 'true' : 'false';
  element.dataset.readerScrollEdge = edge;

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
  if (announce) announceEdge(element, edge);
}

function stopReaderGesture(event) {
  const region = event.currentTarget;
  if (!(region instanceof Element) || region.dataset.readerScrollRegion !== 'true') return;
  event.stopPropagation();
}

function onFocus(event) {
  const region = event.currentTarget;
  if (!(region instanceof HTMLElement) || region.dataset.readerScrollRegion !== 'true') return;
  reflect(region, { announce: false });
  announceEdge(region, region.dataset.readerScrollEdge || 'middle', { force: true });
}

function clearKeyboardHandoff(region) {
  queueMicrotask(() => {
    if (region?.isConnected) delete region.dataset.readerKeyboardHandoff;
  });
}

function onKeydown(event) {
  const region = event.currentTarget;
  if (!(region instanceof HTMLElement) || region.dataset.readerScrollRegion !== 'true') return;
  const metrics = metricsFor(region);
  const decision = horizontalKeyboardDecision(event.key, event, region.clientWidth, metrics, {
    allowArrowHandoff: pagedReading(),
  });
  if (!decision.consume) {
    if (decision.handoff) {
      region.dataset.readerKeyboardHandoff = decision.direction;
      announceEdge(region, scrollRegionEdge(metrics), { force: true });
      clearKeyboardHandoff(region);
    }
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const action = decision.action;
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
    element.addEventListener('focus', onFocus);
    element.addEventListener('scroll', () => reflect(element), { passive: true });
    resizeObserver?.observe(element);
  }
  reflect(element, { announce: false });
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
ensureStatus();
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
