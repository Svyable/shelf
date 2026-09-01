export const IMMERSIVE_IDLE_MS = Object.freeze({ fine: 2600, coarse: 4200 });

export function focusChromeState({
  focusMode = false,
  stage = '',
  overlayOpen = false,
  selectionActive = false,
  focusInChrome = false,
  idleMs = 0,
  pointer = 'fine',
} = {}) {
  const eligible = !!focusMode && stage === 'read';
  const delay = pointer === 'coarse' ? IMMERSIVE_IDLE_MS.coarse : IMMERSIVE_IDLE_MS.fine;
  const protectedInteraction = !!overlayOpen || !!selectionActive || !!focusInChrome;
  return Object.freeze({
    eligible,
    hidden: eligible && !protectedInteraction && Number(idleMs) >= delay,
    delay,
    protectedInteraction,
  });
}

export function shouldConsumeRevealPointer({ hidden = false, pointerType = '' } = {}) {
  return !!hidden && pointerType === 'touch';
}

export function selectionHasText(selection) {
  return !!String(selection?.toString?.() || '').trim();
}
