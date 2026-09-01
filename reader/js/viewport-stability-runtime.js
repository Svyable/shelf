import './scroll-reflow-anchor.js';
import './immersive-focus.js';
import { keyboardViewportTransition, textEntryTarget } from './viewport-stability.js';

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

if (typeof window !== 'undefined' && typeof document !== 'undefined' && window.visualViewport) {
  window.__bookselfViewportKeyboardGuard?.destroy?.();
  window.__bookselfViewportKeyboardGuard = createViewportKeyboardGuard({
    visualViewport: window.visualViewport,
    document,
  });
}
