import {
  MEDIA_ZOOM_STEP,
  formatMediaZoom,
  mediaKeyboardAction,
  panMediaView,
  pinchMediaView,
  resetMediaView,
  toggleMediaZoomAt,
  zoomMediaView,
} from './media-viewer.js';

import('./cover-runtime.js').catch((error) => console.warn('Cover presentation could not be loaded', error));
import('./formats.js').catch((error) => console.warn('Publication format enhancements could not be loaded', error));
import('./content-scroll-regions.js').catch((error) => console.warn('Content scroll regions could not be loaded', error));

const MEDIA_CSS = 'css/media.css?v=r2';
const loadedSources = new Set();
let repaginateTimer = null;
let lightbox = null;
let lastTrigger = null;
let view = resetMediaView();
let drag = null;
let pinch = null;
const activePointers = new Map();

function installStyles() {
  if (document.querySelector(`link[href="${MEDIA_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MEDIA_CSS;
  document.head.appendChild(link);
}

function readerImage(target) {
  return target instanceof HTMLImageElement && !!target.closest('.page-inner, .scroll-document, #pageMeasureInner');
}

function scheduleRepaginate(img) {
  const src = img.currentSrc || img.src;
  if (!src || loadedSources.has(src)) return;
  loadedSources.add(src);
  clearTimeout(repaginateTimer);
  repaginateTimer = window.setTimeout(() => window.dispatchEvent(new Event('resize')), 80);
}

function geometry() {
  const viewport = lightbox?.querySelector('.reader-media-lightbox-viewport');
  const img = lightbox?.querySelector('img');
  return {
    baseWidth: img?.offsetWidth || 0,
    baseHeight: img?.offsetHeight || 0,
    viewportWidth: viewport?.clientWidth || 0,
    viewportHeight: viewport?.clientHeight || 0,
  };
}

function viewportPoint(clientX, clientY) {
  const viewport = lightbox?.querySelector('.reader-media-lightbox-viewport');
  const rect = viewport?.getBoundingClientRect();
  return {
    x: Number(clientX || 0) - (rect?.left || 0),
    y: Number(clientY || 0) - (rect?.top || 0),
  };
}

function renderView(announce = false) {
  if (!lightbox) return;
  const img = lightbox.querySelector('img');
  const status = lightbox.querySelector('.reader-media-lightbox-status');
  const zoomOut = lightbox.querySelector('[data-media-action="out"]');
  const zoomIn = lightbox.querySelector('[data-media-action="in"]');
  if (!img || !status) return;
  img.style.transform = `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`;
  const label = formatMediaZoom(view.scale);
  status.textContent = label;
  status.setAttribute('aria-label', `Image zoom ${label}`);
  if (zoomOut) zoomOut.disabled = view.scale <= 1;
  if (zoomIn) zoomIn.disabled = view.scale >= 4;
  lightbox.classList.toggle('is-zoomed', view.scale > 1);
  if (announce) status.setAttribute('aria-live', 'polite');
}

function changeZoom(delta) {
  view = zoomMediaView(view, delta, geometry());
  renderView(true);
}

function resetZoom() {
  view = resetMediaView();
  renderView(true);
}

function pointerPair() {
  const points = [...activePointers.values()];
  if (points.length < 2) return null;
  const a = points[0];
  const b = points[1];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return {
    distance: Math.max(1, Math.hypot(dx, dy)),
    center: viewportPoint((a.x + b.x) / 2, (a.y + b.y) / 2),
  };
}

function beginPinch(viewport) {
  const pair = pointerPair();
  if (!pair) return false;
  pinch = {
    view: { ...view },
    distance: pair.distance,
    center: pair.center,
  };
  drag = null;
  viewport?.classList.add('is-dragging');
  return true;
}

function updatePinch() {
  const pair = pointerPair();
  if (!pinch || !pair) return false;
  view = pinchMediaView(
    pinch.view,
    pinch.distance,
    pair.distance,
    pinch.center,
    pair.center,
    geometry()
  );
  renderView();
  return true;
}

function finishPointer(viewport, pointerId) {
  activePointers.delete(pointerId);
  if (pinch && activePointers.size < 2) pinch = null;
  if (drag?.id === pointerId) drag = null;
  if (!pinch && !drag) viewport?.classList.remove('is-dragging');
}

function ensureLightbox() {
  if (lightbox) return lightbox;
  const overlay = document.createElement('div');
  overlay.className = 'reader-media-lightbox';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'readerMediaTitle');
  overlay.innerHTML = `
    <div class="reader-media-lightbox-card">
      <h2 class="sr-only" id="readerMediaTitle">Figure viewer</h2>
      <div class="reader-media-lightbox-toolbar" role="toolbar" aria-label="Figure zoom controls">
        <button type="button" data-media-action="out" aria-label="Zoom out">−</button>
        <button type="button" data-media-action="reset" class="reader-media-lightbox-status" aria-label="Reset image zoom to 100 percent">100%</button>
        <button type="button" data-media-action="in" aria-label="Zoom in">+</button>
        <button type="button" data-media-action="close" aria-label="Close expanded image">×</button>
      </div>
      <div class="reader-media-lightbox-viewport" tabindex="0" role="region" aria-label="Expanded figure. Pinch or double-tap to zoom. Drag to pan. Keyboard: plus and minus zoom, arrow keys pan, Shift plus arrows pan farther, zero resets.">
        <img alt="" draggable="false">
      </div>
      <p class="reader-media-lightbox-caption"></p>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (event) => {
    const action = event.target.closest?.('[data-media-action]')?.dataset.mediaAction;
    if (action === 'in') changeZoom(MEDIA_ZOOM_STEP);
    else if (action === 'out') changeZoom(-MEDIA_ZOOM_STEP);
    else if (action === 'reset') resetZoom();
    else if (action === 'close' || event.target === overlay) closeLightbox();
  });
  const viewport = overlay.querySelector('.reader-media-lightbox-viewport');
  viewport?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      viewport.setPointerCapture?.(event.pointerId);
      if (activePointers.size >= 2) beginPinch(viewport);
      else if (view.scale > 1) {
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
        viewport.classList.add('is-dragging');
      }
      event.preventDefault();
      return;
    }
    if (view.scale <= 1 || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    viewport.setPointerCapture?.(event.pointerId);
    viewport.classList.add('is-dragging');
    event.preventDefault();
  });
  viewport?.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' && activePointers.has(event.pointerId)) {
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pinch && updatePinch()) {
        event.preventDefault();
        return;
      }
    }
    if (!drag || drag.id !== event.pointerId) return;
    view = panMediaView(view, event.clientX - drag.x, event.clientY - drag.y, geometry());
    drag.x = event.clientX;
    drag.y = event.clientY;
    renderView();
    event.preventDefault();
  });
  viewport?.addEventListener('pointerup', (event) => finishPointer(viewport, event.pointerId));
  viewport?.addEventListener('pointercancel', (event) => finishPointer(viewport, event.pointerId));
  viewport?.addEventListener('lostpointercapture', (event) => finishPointer(viewport, event.pointerId));
  viewport?.addEventListener('dblclick', (event) => {
    view = toggleMediaZoomAt(view, viewportPoint(event.clientX, event.clientY), geometry());
    renderView(true);
    event.preventDefault();
  });
  lightbox = overlay;
  return overlay;
}

function openLightbox(img) {
  const overlay = ensureLightbox();
  const expanded = overlay.querySelector('img');
  const caption = overlay.querySelector('.reader-media-lightbox-caption');
  if (!expanded || !caption) return;
  lastTrigger = img;
  view = resetMediaView();
  drag = null;
  pinch = null;
  activePointers.clear();
  expanded.src = img.currentSrc || img.src;
  expanded.alt = img.alt || '';
  caption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || img.alt || '';
  caption.hidden = !caption.textContent;
  overlay.hidden = false;
  expanded.onload = () => { view = resetMediaView(); renderView(); };
  renderView();
  overlay.querySelector('.reader-media-lightbox-viewport')?.focus({ preventScroll: true });
}

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  drag = null;
  pinch = null;
  activePointers.clear();
  const viewport = lightbox.querySelector('.reader-media-lightbox-viewport');
  viewport?.classList.remove('is-dragging');
  const expanded = lightbox.querySelector('img');
  if (expanded) expanded.removeAttribute('src');
  view = resetMediaView();
  lastTrigger?.focus?.({ preventScroll: true });
  lastTrigger = null;
}

function prepareImage(img) {
  if (!readerImage(img)) return;
  img.decoding = 'async';
  img.draggable = false;
  if (!img.closest('#pageMeasureInner')) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', img.alt ? `Inspect image: ${img.alt}` : 'Inspect image');
  }
  if (img.complete && img.naturalWidth) scheduleRepaginate(img);
}

function scan(root = document) {
  root.querySelectorAll?.('.page-inner img, .scroll-document img, #pageMeasureInner img').forEach(prepareImage);
}

installStyles();
scan();
new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
  if (!(node instanceof Element)) return;
  if (node.matches?.('img')) prepareImage(node);
  scan(node);
}))).observe(document.body, { childList: true, subtree: true });

document.addEventListener('load', (event) => {
  if (!readerImage(event.target)) return;
  prepareImage(event.target);
  scheduleRepaginate(event.target);
}, true);

document.addEventListener('click', (event) => {
  const img = event.target.closest?.('.page-inner img, .scroll-document img');
  if (!img) return;
  event.preventDefault(); event.stopPropagation(); openLightbox(img);
}, true);

document.addEventListener('keydown', (event) => {
  if (lightbox && !lightbox.hidden) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeLightbox(); return; }
    const action = mediaKeyboardAction(event.key, event);
    if (action) {
      event.preventDefault(); event.stopPropagation();
      if (action.type === 'zoom') changeZoom(action.delta);
      else if (action.type === 'reset') resetZoom();
      else if (action.type === 'pan' && view.scale > 1) { view = panMediaView(view, action.dx, action.dy, geometry()); renderView(); }
      return;
    }
    if (event.key === 'Tab') {
      const focusable = [...lightbox.querySelectorAll('button:not([disabled]), [tabindex="0"]')];
      const index = focusable.indexOf(document.activeElement);
      if (focusable.length && ((event.shiftKey && index === 0) || (!event.shiftKey && index === focusable.length - 1))) {
        event.preventDefault();
        focusable[event.shiftKey ? focusable.length - 1 : 0].focus();
      }
    }
    return;
  }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches?.('.page-inner img, .scroll-document img')) {
    event.preventDefault(); event.stopPropagation(); openLightbox(event.target);
  }
}, true);
