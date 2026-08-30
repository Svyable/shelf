const OVERLAY_SELECTOR = '#tocOverlay.active, #progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active';
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, label, mark, [contenteditable="true"], .sel-pop';
const SURFACE_SELECTOR = '#pagesWrapper, .scroll-reader';
const AUTO_HIDE_MS = 3200;

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

function focusMode() {
  return body()?.classList.contains('focus-mode') || false;
}

function coarsePointer() {
  return root()?.dataset.readerPointer === 'coarse'
    || !!window.matchMedia?.('(pointer: coarse)').matches;
}

function phone() {
  return root()?.dataset.readerDevice === 'phone';
}

function overlayOpen() {
  return !!document.querySelector(OVERLAY_SELECTOR);
}

function chromeFocused() {
  const active = document.activeElement;
  return !!active?.closest?.('.app-header, .page-nav');
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

export function installImmersiveChrome() {
  const pageSurface = document.getElementById('pagesWrapper');
  if (!pageSurface || root().dataset.immersiveChromeEnhanced === 'true') return;
  root().dataset.immersiveChromeEnhanced = 'true';

  let timer = 0;
  let manualImmersive = false;
  let lastFocusMode = focusMode();
  let lastStage = body().dataset.stage || '';

  const clearTimer = () => {
    window.clearTimeout(timer);
    timer = 0;
  };

  const setHidden = (hidden) => {
    body().classList.toggle('reader-chrome-hidden', hidden);
    body().classList.toggle('reader-chrome-visible', !hidden);
    body().dataset.readerChrome = hidden ? 'hidden' : 'visible';
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

  const leaveImmersive = () => {
    manualImmersive = false;
    clearTimer();
    setHidden(false);
  };

  const sync = () => {
    syncFocusButton();
    lastFocusMode = focusMode();
    lastStage = body().dataset.stage || '';
    if (lastStage !== 'read') {
      leaveImmersive();
      return;
    }
    if (overlayOpen() || chromeFocused()) {
      reveal({ autoHide: false });
      return;
    }
    if (lastFocusMode) {
      scheduleHide(500);
      return;
    }
    if (!manualImmersive) setHidden(false);
  };

  document.addEventListener('click', (event) => {
    if (body().dataset.stage !== 'read') return;
    const surface = event.target.closest?.(SURFACE_SELECTOR);
    if (!surface) return;
    if (!coarsePointer()) return;
    if (event.target.closest?.(INTERACTIVE_SELECTOR)) return;
    if (selectionActive() || overlayOpen()) return;

    const rect = surface.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (!centerChromeIntent(x, rect.width)) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (!focusMode() && phone()) manualImmersive = true;
    if (!focusMode() && !manualImmersive) return;

    if (body().classList.contains('reader-chrome-hidden')) reveal();
    else hide();
  }, true);

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
    if (event.target.closest?.('.app-header, .page-nav')) reveal({ autoHide: false });
  });

  document.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (!chromeFocused()) scheduleHide();
    }, 0);
  });

  const observer = new MutationObserver((records) => {
    const mode = focusMode();
    const stage = body().dataset.stage || '';
    const overlayChanged = records.some((record) => record.target !== body());
    const meaningfulBodyChange = mode !== lastFocusMode || stage !== lastStage;
    if (!overlayChanged && !meaningfulBodyChange) return;
    sync();
  });
  observer.observe(body(), { attributes: true, attributeFilter: ['class', 'data-stage'] });
  for (const id of ['tocOverlay', 'progressPanel', 'settingsPanel', 'searchOverlay', 'noteDialog', 'helpOverlay']) {
    const overlay = document.getElementById(id);
    if (overlay) observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }

  syncFocusButton();
  setHidden(false);
  sync();
}
