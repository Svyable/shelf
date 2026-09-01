import {
  intrinsicAspect,
  mediaInspectorIntent,
  mediaKind,
  mediaLayoutChange,
  mediaRefreshPlan,
  mediaViewportPolicy,
} from './media-resilience-model.js';

const MEDIA_SELECTOR = '.page-inner img, .page-inner video, .page-inner audio, .page-inner iframe, .scroll-document img, .scroll-document video, .scroll-document audio, .scroll-document iframe';
const STYLE_HREF = 'css/media-resilience.css?v=r1';
const REFRESH_DEBOUNCE_MS = 96;
let refreshTimer = 0;
let activeInspector = null;

function root() {
  return document.documentElement;
}

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function viewportPolicy() {
  const width = window.visualViewport?.width || window.innerWidth || 1280;
  const height = window.visualViewport?.height || window.innerHeight || 800;
  return mediaViewportPolicy({
    width,
    height,
    mode: root().dataset.readerMode === 'scroll' ? 'scroll' : 'paged',
    shortLandscape: root().dataset.readerOrientation === 'landscape' && height < 520,
  });
}

function applyViewportPolicy() {
  const policy = viewportPolicy();
  root().style.setProperty('--reader-media-max-inline', `${policy.maxInline}px`);
  root().style.setProperty('--reader-media-max-block', `${policy.maxBlock}px`);
}

function scheduleRefresh(kind, changed) {
  const plan = mediaRefreshPlan({
    stage: document.body?.dataset.stage || '',
    mode: root().dataset.readerMode === 'scroll' ? 'scroll' : 'paged',
    changed,
    hidden: document.hidden,
  });
  if (!plan.refresh) return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    refreshTimer = 0;
    window.dispatchEvent(new CustomEvent('reader:media-layout-settled', {
      detail: { kind, reason: plan.reason },
    }));
    // Existing Pages and Continuous reflow guards already preserve canonical
    // source position across resize-driven geometry refreshes.
    window.dispatchEvent(new Event('resize'));
  }, REFRESH_DEBOUNCE_MS);
}

function currentIntrinsic(element, kind) {
  if (kind === 'image') {
    return {
      width: element.naturalWidth || Number(element.getAttribute('width')) || 0,
      height: element.naturalHeight || Number(element.getAttribute('height')) || 0,
    };
  }
  if (kind === 'video') {
    return {
      width: element.videoWidth || Number(element.getAttribute('width')) || 0,
      height: element.videoHeight || Number(element.getAttribute('height')) || 0,
    };
  }
  return {
    width: Number(element.getAttribute('width')) || 0,
    height: Number(element.getAttribute('height')) || 0,
  };
}

function settleIntrinsic(element, kind, { initial = false } = {}) {
  const previousAspect = Number(element.dataset.readerMediaAspect) || null;
  const previousWidth = Number(element.dataset.readerMediaWidth) || 0;
  const previousHeight = Number(element.dataset.readerMediaHeight) || 0;
  const next = currentIntrinsic(element, kind);
  const aspect = intrinsicAspect(next.width, next.height);
  if (aspect) {
    element.dataset.readerMediaAspect = String(aspect);
    element.dataset.readerMediaWidth = String(next.width);
    element.dataset.readerMediaHeight = String(next.height);
    element.style.setProperty('--reader-media-aspect', String(aspect));
  }
  const changed = mediaLayoutChange({
    kind,
    previousAspect,
    nextAspect: aspect,
    previousWidth,
    previousHeight,
    nextWidth: next.width,
    nextHeight: next.height,
  });
  element.dataset.readerMediaSettled = 'true';
  if (!initial) scheduleRefresh(kind, changed);
}

function imageCaption(image) {
  const figureCaption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
  return figureCaption || image.getAttribute('alt')?.trim() || 'Publication image';
}

function closeInspector({ restoreFocus = true } = {}) {
  if (!activeInspector) return;
  const { dialog, origin } = activeInspector;
  activeInspector = null;
  delete root().dataset.mediaInspectorOpen;
  dialog.remove();
  if (restoreFocus && origin?.isConnected) {
    try {
      origin.focus({ preventScroll: true });
    } catch {
      origin.focus();
    }
  }
}

function openImageInspector(image) {
  if (!(image instanceof HTMLImageElement) || (!image.currentSrc && !image.src)) return false;
  closeInspector({ restoreFocus: false });

  const dialog = document.createElement('div');
  dialog.className = 'reader-media-inspector';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'readerMediaInspectorTitle');

  const backdrop = document.createElement('button');
  backdrop.type = 'button';
  backdrop.className = 'reader-media-inspector-backdrop';
  backdrop.tabIndex = -1;
  backdrop.setAttribute('aria-label', 'Close expanded image');

  const panel = document.createElement('section');
  panel.className = 'reader-media-inspector-panel';

  const header = document.createElement('header');
  header.className = 'reader-media-inspector-header';
  const title = document.createElement('h2');
  title.id = 'readerMediaInspectorTitle';
  title.textContent = imageCaption(image);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'reader-media-inspector-close';
  close.textContent = 'Close';
  header.append(title, close);

  const stage = document.createElement('div');
  stage.className = 'reader-media-inspector-stage';
  stage.tabIndex = 0;
  const expanded = image.cloneNode(false);
  expanded.removeAttribute('id');
  expanded.removeAttribute('tabindex');
  expanded.removeAttribute('aria-keyshortcuts');
  expanded.removeAttribute('title');
  expanded.loading = 'eager';
  expanded.decoding = 'async';
  stage.appendChild(expanded);

  panel.append(header, stage);
  dialog.append(backdrop, panel);
  document.body.appendChild(dialog);
  root().dataset.mediaInspectorOpen = 'true';
  activeInspector = { dialog, origin: image, stage };

  close.addEventListener('click', () => closeInspector());
  backdrop.addEventListener('click', () => closeInspector());
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeInspector();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [close, stage];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  requestAnimationFrame(() => stage.focus({ preventScroll: true }));
  return true;
}

function prepareMedia(element) {
  if (!(element instanceof HTMLElement) || element.closest('#pageMeasure, #pageMeasureInner')) return;
  if (element.dataset.readerMediaReady === 'true') return;
  const kind = mediaKind(element.tagName);
  if (!kind) return;
  element.dataset.readerMediaReady = 'true';
  element.dataset.readerMediaKind = kind;

  if (kind === 'image') {
    element.decoding = 'async';
    if (!element.hasAttribute('loading')) element.loading = 'lazy';
    if (!element.closest('a, button')) {
      element.tabIndex = 0;
      element.setAttribute('aria-keyshortcuts', 'Enter');
      if (!element.hasAttribute('title')) element.title = 'Press Enter or double-click to expand image';
    }
    element.addEventListener('load', () => settleIntrinsic(element, kind), { passive: true });
    element.addEventListener('error', () => {
      element.dataset.readerMediaFailed = 'true';
    }, { passive: true });
    if (element.complete && element.naturalWidth) settleIntrinsic(element, kind, { initial: true });
    return;
  }

  if (kind === 'video') {
    element.setAttribute('playsinline', '');
    element.addEventListener('loadedmetadata', () => settleIntrinsic(element, kind), { passive: true });
    if (element.readyState >= 1) settleIntrinsic(element, kind, { initial: true });
    return;
  }

  // Native media and embeds own pointer gestures. This marker is available to
  // generic interactive-target checks without inventing a routing contract.
  element.dataset.readerInteractive = 'true';
}

function scan(rootNode = document) {
  if (rootNode instanceof Element && rootNode.matches(MEDIA_SELECTOR)) prepareMedia(rootNode);
  rootNode.querySelectorAll?.(MEDIA_SELECTOR).forEach(prepareMedia);
}

function onKeydown(event) {
  const element = event.target?.closest?.(MEDIA_SELECTOR);
  if (!element) return;
  const intent = mediaInspectorIntent({
    kind: mediaKind(element.tagName),
    key: event.key,
    ctrl: event.ctrlKey,
    meta: event.metaKey,
    alt: event.altKey,
  });
  if (intent !== 'open') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  openImageInspector(element);
}

function onDoubleClick(event) {
  const image = event.target?.closest?.('.page-inner img, .scroll-document img');
  if (!image || image.closest('a, button')) return;
  event.preventDefault();
  event.stopPropagation();
  openImageInspector(image);
}

export function installMediaResilience() {
  if (root().dataset.mediaResilienceInstalled === 'true') return;
  root().dataset.mediaResilienceInstalled = 'true';
  installStyles();
  applyViewportPolicy();
  scan();

  document.addEventListener('keydown', onKeydown, true);
  document.addEventListener('dblclick', onDoubleClick, true);
  window.addEventListener('hashchange', () => closeInspector({ restoreFocus: false }));
  window.addEventListener('popstate', () => closeInspector({ restoreFocus: false }));
  window.addEventListener('resize', applyViewportPolicy, { passive: true });

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof Element) scan(node);
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
}

if (typeof document !== 'undefined') installMediaResilience();
