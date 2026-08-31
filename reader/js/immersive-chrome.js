const OVERLAY_SELECTOR = '#tocOverlay.active, #progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active';
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, label, mark, [contenteditable="true"], .sel-pop';
const SURFACE_SELECTOR = '#pagesWrapper, .scroll-reader';
const AUTO_HIDE_MS = 3200;
const ROUTE_HIDE_MS = 850;
const ROUTE_SCROLL_SETTLE_MS = 240;
const SCROLL_HIDE_PX = 96;
const SCROLL_REVEAL_PX = 52;
const SCROLL_TOP_PX = 28;

function body() {
  return document.body;
}

function root() {
  return document.documentElement;
}

export function centerChromeIntent(x, width, { interactive = false, selection = false } = {}) {
  const w = Number(width) || 0;
  if (!w || interactive || selection) return false;
  const ratio = Number(x) / w;
  return ratio >= 0.34 && ratio <= 0.66;
}

export function canHideReaderChrome({
  stage = 'read',
  focusMode = false,
  manualImmersive = false,
  overlayOpen = false,
  chromeFocused = false,
} = {}) {
  return stage === 'read'
    && (focusMode || manualImmersive)
    && !overlayOpen
    && !chromeFocused;
}

export function manualImmersiveAllowed({ coarse = false, device = '' } = {}) {
  return !!coarse && (device === 'phone' || device === 'tablet');
}

export function readerScrollPosition({ mode = 'paged', documentY = 0, readerY = 0 } = {}) {
  const raw = mode === 'scroll' ? readerY : documentY;
  const value = Number(raw);
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function scrollChromeIntent({
  deltaY = 0,
  accumulated = 0,
  hidden = false,
  nearStart = false,
  hideThreshold = SCROLL_HIDE_PX,
  revealThreshold = SCROLL_REVEAL_PX,
} = {}) {
  if (nearStart) return { action: hidden ? 'reveal' : 'none', accumulated: 0 };

  const delta = Number(deltaY) || 0;
  if (!delta) return { action: 'none', accumulated: Number(accumulated) || 0 };
  const previous = Number(accumulated) || 0;
  const sameDirection = !previous || Math.sign(previous) === Math.sign(delta);
  const next = sameDirection ? previous + delta : delta;
  const hideAt = Math.max(1, Number(hideThreshold) || SCROLL_HIDE_PX);
  const revealAt = Math.max(1, Number(revealThreshold) || SCROLL_REVEAL_PX);

  if (!hidden && next >= hideAt) return { action: 'hide', accumulated: 0 };
  if (hidden && next <= -revealAt) return { action: 'reveal', accumulated: 0 };
  return { action: 'none', accumulated: next };
}

function focusMode() {
  return body()?.classList.contains('focus-mode') || false;
}

function coarsePointer() {
  return root()?.dataset.readerPointer === 'coarse'
    || !!window.matchMedia?.('(pointer: coarse)').matches;
}

function device() {
  return root()?.dataset.readerDevice || '';
}

function scrollMode() {
  return root()?.dataset.readerMode === 'scroll';
}

function overlayOpen() {
  return !!document.querySelector(OVERLAY_SELECTOR);
}

function chromeFocused() {
  const active = document.activeElement;
  return !!active?.closest?.('.app-header, .page-nav, .progress-bar-container');
}

function selectionActive() {
  return !!window.getSelection?.().toString().trim();
}

function syncFocusButton() {
  const button = document.getElementById('focusBtn');
  if (!button) return;
  const active = focusMode();
  button.setAttribute('aria-pressed', String(active));
  button.textContent = active ? 'Exit focus mode' : 'Focus mode';
}

function currentState(manualImmersive = false) {
  return {
    stage: body()?.dataset.stage || '',
    focusMode: focusMode(),
    manualImmersive,
    overlayOpen: overlayOpen(),
    chromeFocused: chromeFocused(),
  };
}

function documentScrollY() {
  return window.scrollY
    || document.scrollingElement?.scrollTop
    || document.documentElement.scrollTop
    || 0;
}

function readerScrollY(eventTarget = null) {
  const target = eventTarget?.id === 'scrollReader'
    ? eventTarget
    : document.getElementById('scrollReader');
  return target?.scrollTop || 0;
}

function currentScrollY(eventTarget = null) {
  return readerScrollPosition({
    mode: scrollMode() ? 'scroll' : 'paged',
    documentY: documentScrollY(),
    readerY: readerScrollY(eventTarget),
  });
}

function setChromeInert(hidden) {
  for (const el of document.querySelectorAll('.app-header, .page-nav')) {
    if ('inert' in el) el.inert = hidden;
  }
}

export function installImmersiveChrome() {
  const pageSurface = document.getElementById('pagesWrapper');
  if (!pageSurface || root().dataset.immersiveChromeEnhanced === 'true') return;
  root().dataset.immersiveChromeEnhanced = 'true';

  let timer = 0;
  let manualImmersive = false;
  let lastFocusMode = focusMode();
  let lastStage = body().dataset.stage || '';
  let lastReaderMode = root().dataset.readerMode || 'paged';
  let lastScrollY = currentScrollY();
  let scrollAccumulated = 0;
  let suppressScrollUntil = 0;

  const clearTimer = () => {
    window.clearTimeout(timer);
    timer = 0;
  };

  const syncContract = () => {
    body().dataset.readerImmersive = focusMode()
      ? 'focus'
      : manualImmersive
        ? 'manual'
        : 'off';
  };

  const setHidden = (hidden) => {
    body().classList.toggle('reader-chrome-hidden', hidden);
    body().classList.toggle('reader-chrome-visible', !hidden);
    body().dataset.readerChrome = hidden ? 'hidden' : 'visible';
    setChromeInert(hidden);
    syncContract();
  };

  const hide = () => {
    clearTimer();
    if (!canHideReaderChrome(currentState(manualImmersive))) return;
    setHidden(true);
  };

  const scheduleHide = (delay = AUTO_HIDE_MS) => {
    clearTimer();
    if (!canHideReaderChrome(currentState(manualImmersive))) return;
    timer = window.setTimeout(hide, delay);
  };

  const reveal = ({ autoHide = true } = {}) => {
    setHidden(false);
    clearTimer();
    if (autoHide) scheduleHide();
  };

  const resetScrollIntent = (eventTarget = null) => {
    lastScrollY = currentScrollY(eventTarget);
    scrollAccumulated = 0;
  };

  const settleProgrammaticScroll = () => {
    suppressScrollUntil = performance.now() + ROUTE_SCROLL_SETTLE_MS;
    resetScrollIntent();
  };

  const leaveImmersive = () => {
    manualImmersive = false;
    clearTimer();
    resetScrollIntent();
    setHidden(false);
  };

  const sync = ({ readerModeChanged = false } = {}) => {
    syncFocusButton();
    lastFocusMode = focusMode();
    lastStage = body().dataset.stage || '';
    lastReaderMode = root().dataset.readerMode || 'paged';
    syncContract();
    resetScrollIntent();
    if (readerModeChanged) settleProgrammaticScroll();
    if (lastStage !== 'read') {
      leaveImmersive();
      return;
    }
    if (overlayOpen() || chromeFocused()) {
      reveal({ autoHide: false });
      return;
    }
    if (lastFocusMode) {
      reveal();
      scheduleHide(readerModeChanged ? ROUTE_HIDE_MS : 500);
      return;
    }
    if (!manualImmersive) setHidden(false);
  };

  document.addEventListener('click', (event) => {
    if (body().dataset.stage !== 'read') return;
    const surface = event.target.closest?.(SURFACE_SELECTOR);
    if (!surface || !coarsePointer()) return;
    if (event.target.closest?.(INTERACTIVE_SELECTOR)) return;
    if (selectionActive() || overlayOpen()) return;

    const rect = surface.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (!centerChromeIntent(x, rect.width)) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (!focusMode() && manualImmersiveAllowed({ coarse: true, device: device() })) {
      manualImmersive = true;
      syncContract();
    }
    if (!focusMode() && !manualImmersive) return;

    if (body().classList.contains('reader-chrome-hidden')) reveal();
    else hide();
  }, true);

  document.addEventListener('scroll', (event) => {
    const current = currentScrollY(event.target);
    const deltaY = current - lastScrollY;
    lastScrollY = current;

    if (performance.now() < suppressScrollUntil) {
      scrollAccumulated = 0;
      return;
    }

    if (
      body().dataset.stage !== 'read'
      || !scrollMode()
      || !coarsePointer()
      || (!focusMode() && !manualImmersive)
      || overlayOpen()
      || chromeFocused()
      || selectionActive()
    ) {
      scrollAccumulated = 0;
      return;
    }

    const result = scrollChromeIntent({
      deltaY,
      accumulated: scrollAccumulated,
      hidden: body().classList.contains('reader-chrome-hidden'),
      nearStart: current <= SCROLL_TOP_PX,
    });
    scrollAccumulated = result.accumulated;
    if (result.action === 'hide') hide();
    else if (result.action === 'reveal') reveal();
  }, { capture: true, passive: true });

  document.addEventListener('pointermove', (event) => {
    if (body().dataset.stage !== 'read' || coarsePointer()) return;
    if (!focusMode()) return;

    const height = window.visualViewport?.height || window.innerHeight || 0;
    const nearEdge = event.clientY <= 58 || (height && event.clientY >= height - 72);
    if (nearEdge) {
      reveal();
      return;
    }
    if (!event.target.closest?.('.app-header, .page-nav')) scheduleHide();
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (body().dataset.stage !== 'read') return;
    if (event.key === 'Escape' && body().classList.contains('reader-chrome-hidden')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      reveal();
      return;
    }
    if (event.key === 'Tab' && body().classList.contains('reader-chrome-hidden')) {
      reveal({ autoHide: false });
    }
  }, true);

  document.addEventListener('focusin', (event) => {
    if (event.target.closest?.('.app-header, .page-nav, .progress-bar-container')) {
      reveal({ autoHide: false });
    }
  });

  document.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (!chromeFocused()) scheduleHide();
    }, 0);
  });

  const routeChanged = () => {
    settleProgrammaticScroll();
    if (body().dataset.stage === 'read' && (focusMode() || manualImmersive)) {
      reveal();
      scheduleHide(ROUTE_HIDE_MS);
    }
  };
  window.addEventListener('hashchange', routeChanged, { passive: true });
  window.addEventListener('popstate', routeChanged, { passive: true });

  const observer = new MutationObserver((records) => {
    const mode = focusMode();
    const stage = body().dataset.stage || '';
    const readerMode = root().dataset.readerMode || 'paged';
    const overlayChanged = records.some((record) => record.target !== body() && record.target !== root());
    const readerModeChanged = readerMode !== lastReaderMode;
    const meaningfulBodyChange = mode !== lastFocusMode || stage !== lastStage;
    if (!overlayChanged && !meaningfulBodyChange && !readerModeChanged) return;
    sync({ readerModeChanged });
  });
  observer.observe(body(), { attributes: true, attributeFilter: ['class', 'data-stage'] });
  observer.observe(root(), { attributes: true, attributeFilter: ['data-reader-mode'] });
  for (const id of ['tocOverlay', 'progressPanel', 'settingsPanel', 'searchOverlay', 'noteDialog', 'helpOverlay']) {
    const overlay = document.getElementById(id);
    if (overlay) observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }

  syncFocusButton();
  setHidden(false);
  sync();
}
