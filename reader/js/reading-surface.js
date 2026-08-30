import { stabilizeViewport, textEntryTarget } from './viewport-stability.js';
import { installImmersiveChrome } from './immersive-chrome.js';
import { installFontReadiness } from './font-readiness-runtime.js';

const DEFAULT_VIEWPORT = Object.freeze({ width: 1280, height: 800 });

function finiteDimension(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function classifyViewport(width, height, { coarse = false } = {}) {
  const w = finiteDimension(width, DEFAULT_VIEWPORT.width);
  const h = finiteDimension(height, DEFAULT_VIEWPORT.height);
  const short = Math.min(w, h);
  const orientation = w >= h ? 'landscape' : 'portrait';

  let device = 'desktop';
  if (w < 720 || short < 480) device = 'phone';
  else if (w < 1180 || coarse) device = 'tablet';

  const spreadRecommended = (
    w >= 1120
    && h >= 620
    && (orientation === 'landscape' || (!coarse && w >= 1280))
  );

  return {
    width: w,
    height: h,
    short,
    orientation,
    device,
    coarse: !!coarse,
    spreadRecommended,
  };
}

export function viewportSnapshot(win = window) {
  const vv = win.visualViewport;
  const width = vv?.width || win.innerWidth || DEFAULT_VIEWPORT.width;
  const height = vv?.height || win.innerHeight || DEFAULT_VIEWPORT.height;
  const coarse = !!win.matchMedia?.('(pointer: coarse)').matches;
  return classifyViewport(width, height, { coarse });
}

function root() {
  return document.documentElement;
}

function setViewportCss(snapshot) {
  const el = root();
  el.dataset.readerDevice = snapshot.device;
  el.dataset.readerOrientation = snapshot.orientation;
  el.dataset.readerPointer = snapshot.coarse ? 'coarse' : 'fine';
  el.dataset.readerSpreadRecommended = String(snapshot.spreadRecommended);
  el.style.setProperty('--reader-viewport-width', `${snapshot.width}px`);
  el.style.setProperty('--reader-viewport-height', `${snapshot.height}px`);
}

function syncSpreadState() {
  const right = document.getElementById('pageRight');
  const wrapper = document.getElementById('pagesWrapper');
  if (!wrapper) return;
  const spread = !!right?.classList.contains('active');
  wrapper.dataset.readerSpread = spread ? 'spread' : 'single';
}

function syncPageSemantics() {
  const wrapper = document.getElementById('pagesWrapper');
  if (wrapper) {
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-roledescription', 'book pages');
  }

  for (const id of ['pageLeft', 'pageRight']) {
    const page = document.getElementById(id);
    if (!page) continue;
    page.setAttribute('role', 'article');
    page.setAttribute('aria-roledescription', 'page');
    const number = page.querySelector('.page-num')?.textContent?.trim();
    if (number) page.setAttribute('aria-label', `Page ${number}`);
    else page.removeAttribute('aria-label');
  }
}

function afterFrames(count, callback) {
  const step = () => {
    if (count <= 0) {
      callback();
      return;
    }
    count -= 1;
    requestAnimationFrame(step);
  };
  step();
}

function createRepaginator() {
  let timer = 0;
  let lastAt = 0;
  return function requestRepaginate(delay = 36) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      const now = performance.now();
      if (now - lastAt < 80) return;
      lastAt = now;
      window.dispatchEvent(new Event('resize'));
    }, delay);
  };
}

function watchAdaptiveStyles(requestRepaginate) {
  let observer = null;

  const attach = (link) => {
    if (!link || link.dataset.readerSurfaceObserved === 'true') return false;
    link.dataset.readerSurfaceObserved = 'true';
    const ready = () => afterFrames(2, () => requestRepaginate(0));
    link.addEventListener('load', ready, { once: true });
    if (link.sheet) ready();
    return true;
  };

  const existing = document.querySelector('link[data-reader-navigation]');
  if (attach(existing)) return;

  observer = new MutationObserver(() => {
    const link = document.querySelector('link[data-reader-navigation]');
    if (!attach(link)) return;
    observer?.disconnect();
    observer = null;
  });
  observer.observe(document.head, { childList: true });
}

export function installReadingSurface() {
  const el = root();
  if (el.dataset.readingSurfaceEnhanced === 'true') return;
  el.dataset.readingSurfaceEnhanced = 'true';

  const requestRepaginate = createRepaginator();
  let autoCollapseKey = '';
  let stableViewport = viewportSnapshot();

  const maybeAutoCollapseSpread = (snapshot = stableViewport) => {
    if (el.dataset.readerMode === 'scroll') return;
    if (snapshot.spreadRecommended) {
      autoCollapseKey = '';
      return;
    }
    if (document.body.dataset.stage !== 'read') return;

    const key = `${snapshot.device}:${snapshot.orientation}:${Math.round(snapshot.width / 80)}`;
    if (autoCollapseKey === key) return;

    const right = document.getElementById('pageRight');
    const toggle = document.getElementById('viewModeBtn');
    const spreadVisible = !!right?.classList.contains('active');
    if (!spreadVisible) {
      autoCollapseKey = key;
      return;
    }

    const toggleMeansSingle = /single/i.test(toggle?.textContent || '');
    if (!toggle || toggle.hidden || !toggleMeansSingle) return;

    autoCollapseKey = key;
    queueMicrotask(() => toggle.click());
  };

  const syncViewport = (snapshot = stableViewport, { allowAutoCollapse = true } = {}) => {
    setViewportCss(snapshot);
    syncSpreadState();
    syncPageSemantics();
    if (allowAutoCollapse) window.setTimeout(() => maybeAutoCollapseSpread(snapshot), 0);
  };

  const onViewport = (event) => {
    const raw = viewportSnapshot();
    const decision = stabilizeViewport(stableViewport, raw, {
      editing: textEntryTarget(document.activeElement),
    });

    if (decision.transientKeyboard) {
      el.dataset.readerViewportOccluded = 'keyboard';
      syncViewport(stableViewport, { allowAutoCollapse: false });
      event?.stopImmediatePropagation?.();
      return;
    }

    delete el.dataset.readerViewportOccluded;
    stableViewport = decision.snapshot || raw;
    syncViewport(stableViewport);
  };

  syncViewport();
  watchAdaptiveStyles(requestRepaginate);
  installImmersiveChrome();
  installFontReadiness({
    onReady: () => afterFrames(2, () => requestRepaginate(0)),
  });

  const coarseQuery = window.matchMedia?.('(pointer: coarse)');
  coarseQuery?.addEventListener?.('change', onViewport);
  window.addEventListener('orientationchange', onViewport, { capture: true, passive: true });
  window.visualViewport?.addEventListener('resize', onViewport, { capture: true, passive: true });
  window.addEventListener('resize', onViewport, { capture: true, passive: true });

  const wrapper = document.getElementById('pagesWrapper');
  const right = document.getElementById('pageRight');
  const current = document.getElementById('currentPage');
  if (wrapper || right || current) {
    const observer = new MutationObserver(() => {
      syncSpreadState();
      syncPageSemantics();
      window.setTimeout(() => maybeAutoCollapseSpread(stableViewport), 0);
    });
    if (wrapper) observer.observe(wrapper, { attributes: true, attributeFilter: ['class'] });
    if (right) observer.observe(right, { attributes: true, attributeFilter: ['class'] });
    if (current) observer.observe(current, { childList: true, subtree: true, characterData: true });
  }

  const stageObserver = new MutationObserver(() => {
    if (document.body.dataset.stage !== 'read') {
      document.body.classList.remove('reader-chrome-hidden');
      document.body.classList.remove('reader-chrome-visible');
      delete document.body.dataset.readerChrome;
      return;
    }
    window.setTimeout(() => maybeAutoCollapseSpread(stableViewport), 0);
  });
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
}
