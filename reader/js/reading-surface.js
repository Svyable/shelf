import { stabilizeViewport, textEntryTarget } from './viewport-stability.js';
import { installImmersiveChrome } from './immersive-chrome.js';
import { installFontReadiness } from './font-readiness-runtime.js';

const DEFAULT_VIEWPORT = Object.freeze({ width: 1280, height: 800 });
const ANNOUNCE_SCROLL_IDLE_MS = 620;

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

function cleanStatusPart(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function formatReadingStatus({
  mode = 'paged',
  chapter = '',
  currentPage = '',
  totalPages = '',
  percent = '',
} = {}) {
  const parts = [mode === 'scroll' ? 'Continuous reading' : 'Pages'];
  const chapterText = cleanStatusPart(chapter);
  if (chapterText && chapterText !== '—') parts.push(chapterText);

  if (mode === 'scroll') {
    const progress = cleanStatusPart(percent);
    if (/^\d{1,3}%$/.test(progress)) parts.push(`${progress} through book`);
  } else {
    const page = cleanStatusPart(currentPage);
    const total = cleanStatusPart(totalPages);
    if (page) {
      const plural = /[–-]/.test(page);
      parts.push(`${plural ? 'Pages' : 'Page'} ${page}${total ? ` of ${total}` : ''}`);
    }
  }

  return `${parts.join('. ')}.`;
}

export function readingFocusTarget({
  stage = 'read',
  mode = 'paged',
  leftActive = false,
  rightActive = false,
  scrollVisible = false,
} = {}) {
  if (stage !== 'read') return 'bookStage';
  if (mode === 'scroll' && scrollVisible) return 'scrollReader';
  if (leftActive) return 'pageLeft';
  if (rightActive) return 'pageRight';
  return 'pagesWrapper';
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
  const total = cleanStatusPart(document.getElementById('totalPages')?.textContent);
  if (wrapper) {
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-roledescription', 'book pages');
    wrapper.setAttribute('aria-label', 'Paged reading view');
    wrapper.tabIndex = -1;
  }

  for (const id of ['pageLeft', 'pageRight']) {
    const page = document.getElementById(id);
    if (!page) continue;
    const active = page.classList.contains('active');
    page.setAttribute('role', 'article');
    page.setAttribute('aria-roledescription', 'page');
    page.setAttribute('aria-hidden', String(!active));
    page.tabIndex = -1;
    const number = cleanStatusPart(page.querySelector('.page-num')?.textContent);
    const chapter = cleanStatusPart(page.querySelector('.page-running')?.textContent);
    if (number) {
      page.setAttribute(
        'aria-label',
        `${chapter && chapter !== '—' ? `${chapter}, ` : ''}page ${number}${total ? ` of ${total}` : ''}`
      );
    } else {
      page.removeAttribute('aria-label');
    }
  }
}

function ensureReadingLiveRegion() {
  let live = document.getElementById('readerLive');
  if (live) return live;
  live = document.createElement('p');
  live.id = 'readerLive';
  live.className = 'sr-only';
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  (document.querySelector('.app') || document.body).appendChild(live);
  return live;
}

function readingStatusSnapshot() {
  const mode = root().dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
  return {
    mode,
    chapter: document.getElementById('currentChapter')?.textContent,
    currentPage: document.getElementById('currentPage')?.textContent,
    totalPages: document.getElementById('totalPages')?.textContent,
    percent: document.getElementById('progressPercent')?.textContent,
  };
}

function readingFocusSnapshot() {
  const left = document.getElementById('pageLeft');
  const right = document.getElementById('pageRight');
  const scrollReader = document.getElementById('scrollReader');
  return {
    stage: document.body.dataset.stage || '',
    mode: root().dataset.readerMode === 'scroll' ? 'scroll' : 'paged',
    leftActive: !!left?.classList.contains('active'),
    rightActive: !!right?.classList.contains('active'),
    scrollVisible: !!scrollReader && !scrollReader.hidden,
  };
}

function focusCurrentReadingSurface({ preventScroll = true } = {}) {
  const id = readingFocusTarget(readingFocusSnapshot());
  const target = document.getElementById(id);
  if (!target) return false;
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  try {
    target.focus({ preventScroll });
  } catch {
    target.focus();
  }
  return document.activeElement === target;
}

function syncModeSemantics() {
  const scroll = root().dataset.readerMode === 'scroll';
  const reading = document.body.dataset.stage === 'read';
  const pages = document.getElementById('pagesWrapper');
  const nav = document.getElementById('pageNav');
  const scrollReader = document.getElementById('scrollReader');

  if (pages) pages.setAttribute('aria-hidden', String(!reading || scroll));
  if (nav) nav.setAttribute('aria-hidden', String(!reading || scroll));
  if (scrollReader) scrollReader.tabIndex = -1;
  if (scrollReader && reading && scroll && !scrollReader.hidden) {
    scrollReader.removeAttribute('aria-hidden');
  } else if (scrollReader) {
    scrollReader.setAttribute('aria-hidden', 'true');
  }
}

function createReadingAnnouncer() {
  const live = ensureReadingLiveRegion();
  let timer = 0;
  let lastMessage = '';

  const announce = ({ settled = false } = {}) => {
    clearTimeout(timer);
    if (document.body.dataset.stage !== 'read') return;
    const snapshot = readingStatusSnapshot();
    const delay = snapshot.mode === 'scroll' && settled ? ANNOUNCE_SCROLL_IDLE_MS : 36;
    timer = window.setTimeout(() => {
      if (document.body.dataset.stage !== 'read') return;
      const message = formatReadingStatus(readingStatusSnapshot());
      if (!message || message === lastMessage) return;
      lastMessage = message;
      live.textContent = message;
    }, delay);
  };

  return { announce };
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

function installReadingFocusNavigation() {
  const skip = document.querySelector('.skip-link');
  skip?.addEventListener('click', (event) => {
    event.preventDefault();
    afterFrames(1, () => focusCurrentReadingSurface({ preventScroll: false }));
  });

  let pendingOverlayLanding = false;
  let pendingModeLanding = false;
  const landingOverlays = ['tocOverlay', 'searchOverlay']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const settings = document.getElementById('settingsPanel');

  document.addEventListener('click', (event) => {
    const action = event.target?.closest?.('button, a, [role="button"]');
    if (!action) return;
    const overlay = action.closest?.('#tocOverlay, #searchOverlay');
    if (!overlay) return;
    const closeAction = action.matches('#tocClose, #searchClose, [data-dialog-close]');
    if (!closeAction) pendingOverlayLanding = true;
  }, true);

  const maybeLand = () => {
    if (document.body.dataset.stage !== 'read') return;
    const navigationOpen = landingOverlays.some((overlay) => overlay.classList.contains('active'));
    const settingsOpen = settings?.classList.contains('active');
    if (pendingOverlayLanding && !navigationOpen) {
      pendingOverlayLanding = false;
      afterFrames(2, () => focusCurrentReadingSurface());
      return;
    }
    if (pendingModeLanding && !settingsOpen) {
      pendingModeLanding = false;
      afterFrames(2, () => focusCurrentReadingSurface());
    }
  };

  landingOverlays.forEach((overlay) => {
    new MutationObserver(maybeLand).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  });
  if (settings) {
    new MutationObserver(maybeLand).observe(settings, { attributes: true, attributeFilter: ['class'] });
  }

  return {
    modeChanged() {
      if (document.body.dataset.stage !== 'read') return;
      if (settings?.classList.contains('active')) {
        pendingModeLanding = true;
        return;
      }
      afterFrames(2, () => focusCurrentReadingSurface());
    },
  };
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
  const announcer = createReadingAnnouncer();
  const focusNavigation = installReadingFocusNavigation();
  let autoCollapseKey = '';
  let stableViewport = viewportSnapshot();

  const legacyLive = document.getElementById('pageLive');
  if (legacyLive) legacyLive.setAttribute('aria-live', 'off');

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
    syncModeSemantics();
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
      syncModeSemantics();
      if (el.dataset.readerMode !== 'scroll') announcer.announce();
      window.setTimeout(() => maybeAutoCollapseSpread(stableViewport), 0);
    });
    if (wrapper) observer.observe(wrapper, { attributes: true, attributeFilter: ['class'] });
    if (right) observer.observe(right, { attributes: true, attributeFilter: ['class'] });
    if (current) observer.observe(current, { childList: true, subtree: true, characterData: true });
  }

  const locationNodes = [
    document.getElementById('currentChapter'),
    document.getElementById('progressPercent'),
  ].filter(Boolean);
  if (locationNodes.length) {
    const locationObserver = new MutationObserver(() => {
      if (el.dataset.readerMode === 'scroll') announcer.announce({ settled: true });
    });
    locationNodes.forEach((node) => {
      locationObserver.observe(node, { childList: true, subtree: true, characterData: true });
    });
  }

  const modeObserver = new MutationObserver(() => {
    syncModeSemantics();
    syncPageSemantics();
    announcer.announce();
    focusNavigation.modeChanged();
  });
  modeObserver.observe(el, { attributes: true, attributeFilter: ['data-reader-mode'] });

  const stageObserver = new MutationObserver(() => {
    syncModeSemantics();
    if (document.body.dataset.stage !== 'read') {
      document.body.classList.remove('reader-chrome-hidden');
      document.body.classList.remove('reader-chrome-visible');
      delete document.body.dataset.readerChrome;
      return;
    }
    announcer.announce();
    window.setTimeout(() => maybeAutoCollapseSpread(stableViewport), 0);
  });
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
}
