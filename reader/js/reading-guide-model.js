export const GUIDE_MODES = Object.freeze(['off', 'line', 'band']);

export function normalizeGuideMode(value) {
  return GUIDE_MODES.includes(value) ? value : 'off';
}

export function guideHeight(mode, lineHeightPx = 24) {
  const line = Math.max(16, Number(lineHeightPx) || 24);
  if (mode === 'line') return Math.round(line * 1.35);
  if (mode === 'band') return Math.round(line * 3.2);
  return 0;
}

export function clampGuideY(y, viewportHeight, height) {
  const vh = Math.max(0, Number(viewportHeight) || 0);
  const h = Math.max(0, Number(height) || 0);
  if (!vh || !h) return 0;
  const half = Math.min(h / 2, vh / 2);
  return Math.min(Math.max(Number(y) || vh / 2, half), vh - half);
}

export function nextGuideY(currentY, direction, viewportHeight, height) {
  const h = Math.max(16, Number(height) || 24);
  const step = Math.max(18, Math.round(h * 0.72));
  return clampGuideY((Number(currentY) || viewportHeight / 2) + Math.sign(direction || 1) * step, viewportHeight, h);
}

export function guideVisible({ mode, stage, overlaysOpen = false, documentVisible = true } = {}) {
  return normalizeGuideMode(mode) !== 'off'
    && stage === 'read'
    && !overlaysOpen
    && documentVisible;
}

export function shouldTrackPointer(pointerType) {
  return pointerType === 'mouse' || pointerType === 'pen' || pointerType === 'touch';
}

export function guideState({ mode, y, viewportHeight, lineHeightPx, stage, overlaysOpen, documentVisible } = {}) {
  const normalized = normalizeGuideMode(mode);
  const height = guideHeight(normalized, lineHeightPx);
  return Object.freeze({
    mode: normalized,
    height,
    y: clampGuideY(y, viewportHeight, height),
    visible: guideVisible({ mode: normalized, stage, overlaysOpen, documentVisible }),
  });
}
