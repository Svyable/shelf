import './scroll-reflow-anchor.js';
import './immersive-focus.js';
import { parseRoute } from './router.js';
import {
  keyboardViewportTransition,
  lifecycleResumePlan,
  readingLifecycleSnapshot,
  textEntryTarget,
} from './viewport-stability.js';

import('./global-reader-controls.js').catch((error) => {
  console.warn('Global Reader controls could not be loaded', error);
});

function snapshot(vv = globalThis.visualViewport) {
  if (!vv) return null;
  return {
    width: Number(vv.width) || 0,
    height: Number(vv.height) || 0,
    offsetTop: Number(vv.offsetTop) || 0,
    offsetLeft: Number(vv.offsetLeft) || 0,
    scale: Number(vv.scale) || 1,
  };
}

export function createViewportKeyboardGuard({
  visualViewport = globalThis.visualViewport,
  document = globalThis.document,
} = {}) {
  let stable = snapshot(visualViewport);
  let keyboardActive = false;
  let editing = textEntryTarget(document?.activeElement);
  let suppressed = 0;

  const evaluate = () => {
    const next = snapshot(visualViewport);
    const result = keyboardViewportTransition(stable, next, { editing, keyboardActive });
    stable = result.snapshot;
    keyboardActive = result.keyboardActive;
    if (result.suppress) suppressed += 1;
    return result;
  };

  const onFocusIn = (event) => {
    editing = textEntryTarget(event.target);
  };
  const onFocusOut = () => {
    queueMicrotask(() => {
      editing = textEntryTarget(document?.activeElement);
    });
  };
  const onResize = (event) => {
    const result = evaluate();
    if (!result.suppress) return;
    event.stopImmediatePropagation();
  };

  document?.addEventListener('focusin', onFocusIn, true);
  document?.addEventListener('focusout', onFocusOut, true);
  visualViewport?.addEventListener('resize', onResize, true);

  return Object.freeze({
    evaluate,
    state() {
      return { stable, keyboardActive, editing, suppressed };
    },
    destroy() {
      document?.removeEventListener('focusin', onFocusIn, true);
      document?.removeEventListener('focusout', onFocusOut, true);
      visualViewport?.removeEventListener('resize', onResize, true);
    },
  });
}

function readerMode(document) {
  return document?.documentElement?.dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
}

function overlaysOpen(document) {
  return !!document?.querySelector?.(
    '.toc-overlay.active, .stats-overlay.active, .search-overlay.active, .settings-panel.active, .note-dialog.active, .help-overlay.active'
  );
}

export function createReaderLifecycleGuard({
  window = globalThis.window,
  document = globalThis.document,
  visualViewport = globalThis.visualViewport,
  now = () => Date.now(),
} = {}) {
  let suspended = null;
  let resumeCount = 0;
  let rafA = 0;
  let rafB = 0;

  const capture = () => {
    suspended = readingLifecycleSnapshot({
      route: parseRoute(),
      stage: document?.body?.dataset.stage || '',
      mode: readerMode(document),
      viewport: snapshot(visualViewport),
      at: now(),
    });
    return suspended;
  };

  const settle = (plan) => {
    if (!plan.resume) return plan;
    resumeCount += 1;
    window?.dispatchEvent?.(new CustomEvent('bookself:reader-resume', { detail: plan }));
    if (plan.repaginate) window?.dispatchEvent?.(new Event('resize'));
    if (plan.resyncRoute && !overlaysOpen(document)) {
      window?.dispatchEvent?.(new HashChangeEvent('hashchange'));
    }
    return plan;
  };

  const resume = ({ persisted = false } = {}) => {
    const current = readingLifecycleSnapshot({
      route: parseRoute(),
      stage: document?.body?.dataset.stage || '',
      mode: readerMode(document),
      viewport: snapshot(visualViewport),
      at: now(),
    });
    const plan = lifecycleResumePlan(suspended, current, {
      persisted,
      now: now(),
      viewport: snapshot(visualViewport),
    });
    if (!plan.resume) return plan;
    cancelAnimationFrame(rafA);
    cancelAnimationFrame(rafB);
    rafA = requestAnimationFrame(() => {
      rafB = requestAnimationFrame(() => settle(plan));
    });
    return plan;
  };

  const onPageHide = () => capture();
  const onPageShow = (event) => resume({ persisted: !!event.persisted });
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') capture();
    else if (document.visibilityState === 'visible') resume();
  };
  const onFreeze = () => capture();
  const onResume = () => resume();

  window?.addEventListener?.('pagehide', onPageHide, true);
  window?.addEventListener?.('pageshow', onPageShow, true);
  document?.addEventListener?.('visibilitychange', onVisibility, true);
  document?.addEventListener?.('freeze', onFreeze, true);
  document?.addEventListener?.('resume', onResume, true);

  return Object.freeze({
    capture,
    resume,
    state() { return { suspended, resumeCount }; },
    destroy() {
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
      window?.removeEventListener?.('pagehide', onPageHide, true);
      window?.removeEventListener?.('pageshow', onPageShow, true);
      document?.removeEventListener?.('visibilitychange', onVisibility, true);
      document?.removeEventListener?.('freeze', onFreeze, true);
      document?.removeEventListener?.('resume', onResume, true);
    },
  });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (window.visualViewport) {
    window.__bookselfViewportKeyboardGuard?.destroy?.();
    window.__bookselfViewportKeyboardGuard = createViewportKeyboardGuard({
      visualViewport: window.visualViewport,
      document,
    });
  }
  window.__bookselfReaderLifecycleGuard?.destroy?.();
  window.__bookselfReaderLifecycleGuard = createReaderLifecycleGuard({
    window,
    document,
    visualViewport: window.visualViewport,
  });
}
