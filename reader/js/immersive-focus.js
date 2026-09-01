import {
  IMMERSIVE_IDLE_MS,
  focusChromeState,
  selectionHasText,
  shouldConsumeRevealPointer,
} from './immersive-focus-model.js';

const OVERLAY_IDS = [
  'tocOverlay', 'progressPanel', 'settingsPanel', 'searchOverlay', 'noteDialog', 'helpOverlay',
];

function install(root = document) {
  const body = root.body;
  const chrome = root.getElementById?.('readerChrome');
  const nav = root.getElementById?.('pageNav');
  const progress = root.querySelector?.('.progress-bar-container');
  if (!body || !chrome || !nav || body.dataset.immersiveFocus === 'installed') return;
  body.dataset.immersiveFocus = 'installed';

  const style = root.createElement('style');
  style.dataset.immersiveFocus = 'true';
  style.textContent = `
    body.focus-mode[data-stage="read"] #readerChrome,
    body.focus-mode[data-stage="read"] #pageNav,
    body.focus-mode[data-stage="read"] .progress-bar-container {
      transition: opacity 180ms ease-out, transform 220ms cubic-bezier(.2,.75,.25,1);
    }
    body[data-reader-chrome-hidden] #readerChrome {
      opacity: 0;
      transform: translateY(calc(-100% - env(safe-area-inset-top)));
      pointer-events: none;
    }
    body[data-reader-chrome-hidden] #pageNav {
      opacity: 0;
      transform: translateY(calc(100% + env(safe-area-inset-bottom)));
      pointer-events: none;
    }
    body[data-reader-chrome-hidden] .progress-bar-container { opacity: .18; }
    body[data-reader-chrome-hidden] #readingNavigator { opacity: .12; pointer-events: none; }
    @media (prefers-reduced-motion: reduce) {
      body.focus-mode[data-stage="read"] #readerChrome,
      body.focus-mode[data-stage="read"] #pageNav,
      body.focus-mode[data-stage="read"] .progress-bar-container { transition: none; }
    }
    @media (forced-colors: active) {
      body[data-reader-chrome-hidden] .progress-bar-container { opacity: 1; }
    }
  `;
  root.head?.appendChild(style);

  let lastIntent = performance.now();
  let coarse = matchMedia('(pointer: coarse)').matches;
  let timer = 0;
  let hidden = false;

  const overlayOpen = () => OVERLAY_IDS.some((id) => root.getElementById(id)?.classList.contains('active'));
  const focusInChrome = () => !!root.activeElement?.closest?.('#readerChrome, #pageNav, #readingNavigator');
  const selectionActive = () => selectionHasText(root.getSelection?.() || window.getSelection?.());

  const reveal = () => {
    lastIntent = performance.now();
    if (hidden) {
      hidden = false;
      body.removeAttribute('data-reader-chrome-hidden');
    }
    schedule();
  };

  const evaluate = () => {
    clearTimeout(timer);
    const now = performance.now();
    const state = focusChromeState({
      focusMode: body.classList.contains('focus-mode'),
      stage: body.dataset.stage,
      overlayOpen: overlayOpen(),
      selectionActive: selectionActive(),
      focusInChrome: focusInChrome(),
      idleMs: now - lastIntent,
      pointer: coarse ? 'coarse' : 'fine',
    });
    hidden = state.hidden;
    body.toggleAttribute('data-reader-chrome-hidden', hidden);
    if (!state.eligible || state.protectedInteraction) return;
    const remaining = Math.max(40, state.delay - (now - lastIntent));
    timer = window.setTimeout(evaluate, remaining);
  };

  const schedule = () => {
    clearTimeout(timer);
    timer = window.setTimeout(evaluate, 40);
  };

  root.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    coarse = false;
    reveal();
  }, { passive: true });

  root.addEventListener('pointerdown', (event) => {
    coarse = event.pointerType === 'touch' || coarse;
    if (shouldConsumeRevealPointer({ hidden, pointerType: event.pointerType })) {
      event.preventDefault();
      event.stopImmediatePropagation();
      reveal();
      return;
    }
    reveal();
  }, true);

  root.addEventListener('keydown', reveal, true);
  root.addEventListener('focusin', reveal, true);
  root.addEventListener('selectionchange', () => {
    if (selectionActive()) reveal();
    else schedule();
  });

  const observer = new MutationObserver(() => {
    if (!body.classList.contains('focus-mode') || body.dataset.stage !== 'read' || overlayOpen()) reveal();
    else schedule();
  });
  observer.observe(body, { attributes: true, attributeFilter: ['class', 'data-stage'] });
  OVERLAY_IDS.forEach((id) => {
    const el = root.getElementById(id);
    if (el) observer.observe(el, { attributes: true, attributeFilter: ['class'] });
  });

  window.addEventListener('blur', () => {
    body.removeAttribute('data-reader-chrome-hidden');
    hidden = false;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      body.removeAttribute('data-reader-chrome-hidden');
      hidden = false;
    } else {
      reveal();
    }
  });

  lastIntent = performance.now();
  timer = window.setTimeout(evaluate, coarse ? IMMERSIVE_IDLE_MS.coarse : IMMERSIVE_IDLE_MS.fine);
}

if (typeof document !== 'undefined') install(document);

export { install as installImmersiveFocus };
