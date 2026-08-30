const MIN_KEYBOARD_OCCLUSION = 120;
const MIN_KEYBOARD_OCCLUSION_RATIO = 0.18;
const MAX_KEYBOARD_WIDTH_DRIFT_RATIO = 0.04;
const KEYBOARD_RESTORE_TOLERANCE = 24;

function finite(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function geometry(previous, next) {
  const previousWidth = finite(previous?.width);
  const previousHeight = finite(previous?.height);
  const nextWidth = finite(next?.width);
  const nextHeight = finite(next?.height);
  const widthDrift = Math.abs(nextWidth - previousWidth);
  const widthTolerance = Math.max(8, previousWidth * MAX_KEYBOARD_WIDTH_DRIFT_RATIO);
  const heightLoss = previousHeight - nextHeight;
  const heightThreshold = Math.max(
    MIN_KEYBOARD_OCCLUSION,
    previousHeight * MIN_KEYBOARD_OCCLUSION_RATIO
  );
  return {
    previousWidth,
    previousHeight,
    nextWidth,
    nextHeight,
    widthStable: previousWidth > 0 && nextWidth > 0 && widthDrift <= widthTolerance,
    heightLoss,
    heightThreshold,
  };
}

export function textEntryTarget(target) {
  if (!target) return false;
  if (target.isContentEditable) return true;
  const tag = String(target.tagName || '').toLowerCase();
  if (tag === 'textarea') return true;
  if (tag !== 'input') return false;
  const type = String(target.type || 'text').toLowerCase();
  return ![
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit',
  ].includes(type);
}

export function stabilizeViewport(previous, next, { editing = false } = {}) {
  if (!next) {
    return { snapshot: previous || null, transientKeyboard: false };
  }
  if (!previous) {
    return { snapshot: next, transientKeyboard: false };
  }

  const g = geometry(previous, next);
  const transientKeyboard = !!editing
    && g.previousHeight > 0
    && g.nextHeight > 0
    && g.widthStable
    && g.heightLoss >= g.heightThreshold;

  return {
    snapshot: transientKeyboard ? previous : next,
    transientKeyboard,
  };
}

/**
 * Track the complete soft-keyboard viewport lifecycle. A keyboard opening is a
 * transient occlusion, not new page geometry. Its matching restoration is also
 * suppressible because the Reader never adopted the occluded size. Genuine
 * rotations/resizes always win through width drift or insufficient occlusion.
 */
export function keyboardViewportTransition(
  stable,
  next,
  { editing = false, keyboardActive = false } = {}
) {
  if (!next) {
    return { snapshot: stable || null, keyboardActive: false, suppress: false, phase: 'none' };
  }
  if (!stable) {
    return { snapshot: next, keyboardActive: false, suppress: false, phase: 'baseline' };
  }

  const g = geometry(stable, next);
  const opening = !!editing
    && g.previousHeight > 0
    && g.nextHeight > 0
    && g.widthStable
    && g.heightLoss >= g.heightThreshold;
  if (opening) {
    return { snapshot: stable, keyboardActive: true, suppress: true, phase: 'opening' };
  }

  const restored = !!keyboardActive
    && g.widthStable
    && Math.abs(g.nextHeight - g.previousHeight) <= KEYBOARD_RESTORE_TOLERANCE;
  if (restored) {
    return { snapshot: stable, keyboardActive: false, suppress: true, phase: 'restored' };
  }

  return { snapshot: next, keyboardActive: false, suppress: false, phase: 'layout' };
}
