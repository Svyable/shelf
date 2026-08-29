const MIN_KEYBOARD_OCCLUSION = 120;
const MIN_KEYBOARD_OCCLUSION_RATIO = 0.18;
const MAX_KEYBOARD_WIDTH_DRIFT_RATIO = 0.04;

function finite(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
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

  const previousWidth = finite(previous.width);
  const previousHeight = finite(previous.height);
  const nextWidth = finite(next.width);
  const nextHeight = finite(next.height);
  const widthDrift = Math.abs(nextWidth - previousWidth);
  const widthTolerance = Math.max(8, previousWidth * MAX_KEYBOARD_WIDTH_DRIFT_RATIO);
  const heightLoss = previousHeight - nextHeight;
  const heightThreshold = Math.max(
    MIN_KEYBOARD_OCCLUSION,
    previousHeight * MIN_KEYBOARD_OCCLUSION_RATIO
  );

  const transientKeyboard = !!editing
    && previousWidth > 0
    && previousHeight > 0
    && nextWidth > 0
    && nextHeight > 0
    && widthDrift <= widthTolerance
    && heightLoss >= heightThreshold;

  return {
    snapshot: transientKeyboard ? previous : next,
    transientKeyboard,
  };
}
