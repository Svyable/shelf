export const MIN_MEDIA_SCALE = 1;
export const MAX_MEDIA_SCALE = 4;
export const MEDIA_ZOOM_STEP = 0.5;
export const MEDIA_PAN_STEP = 72;
export const MEDIA_PAN_LARGE_STEP = 220;

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
export function clampMediaScale(value) { return clamp(finite(value, MIN_MEDIA_SCALE), MIN_MEDIA_SCALE, MAX_MEDIA_SCALE); }
export function mediaPanBounds({ scale = 1, baseWidth = 0, baseHeight = 0, viewportWidth = 0, viewportHeight = 0 } = {}) {
  const safeScale = clampMediaScale(scale);
  return {
    x: Math.max(0, ((Math.max(0, finite(baseWidth)) * safeScale) - Math.max(0, finite(viewportWidth))) / 2),
    y: Math.max(0, ((Math.max(0, finite(baseHeight)) * safeScale) - Math.max(0, finite(viewportHeight))) / 2),
  };
}
export function constrainMediaView(view = {}, geometry = {}) {
  const scale = clampMediaScale(view.scale);
  const bounds = mediaPanBounds({ ...geometry, scale });
  return { scale, x: clamp(finite(view.x), -bounds.x, bounds.x), y: clamp(finite(view.y), -bounds.y, bounds.y) };
}
export function zoomMediaView(view = {}, delta = 0, geometry = {}) {
  const current = constrainMediaView(view, geometry);
  const scale = clampMediaScale(current.scale + finite(delta));
  if (scale === MIN_MEDIA_SCALE) return { scale, x: 0, y: 0 };
  return constrainMediaView({ ...current, scale }, geometry);
}

/**
 * Zoom around a viewport-local focal point so the detail under a finger remains
 * visually anchored instead of drifting toward the image centre.
 */
export function zoomMediaViewAt(view = {}, scale = MIN_MEDIA_SCALE, focal = {}, geometry = {}) {
  const current = constrainMediaView(view, geometry);
  const nextScale = clampMediaScale(scale);
  if (nextScale === MIN_MEDIA_SCALE) return { scale: MIN_MEDIA_SCALE, x: 0, y: 0 };
  const viewportWidth = Math.max(0, finite(geometry.viewportWidth));
  const viewportHeight = Math.max(0, finite(geometry.viewportHeight));
  const fx = finite(focal.x, viewportWidth / 2);
  const fy = finite(focal.y, viewportHeight / 2);
  const cx = viewportWidth / 2;
  const cy = viewportHeight / 2;
  const ratio = nextScale / Math.max(MIN_MEDIA_SCALE, current.scale);
  const x = (fx - cx) - ((fx - cx - current.x) * ratio);
  const y = (fy - cy) - ((fy - cy - current.y) * ratio);
  return constrainMediaView({ scale: nextScale, x, y }, geometry);
}

/**
 * Resolve a two-finger pinch from its starting view and centres. The distance
 * ratio controls zoom; centre movement simultaneously pans. This keeps a pinch
 * continuous even when the fingers translate while changing distance.
 */
export function pinchMediaView(
  startView = {},
  startDistance = 0,
  currentDistance = 0,
  startCenter = {},
  currentCenter = {},
  geometry = {}
) {
  const start = constrainMediaView(startView, geometry);
  const distance0 = Math.max(1, finite(startDistance, 1));
  const distance1 = Math.max(1, finite(currentDistance, distance0));
  const scale = clampMediaScale(start.scale * (distance1 / distance0));
  if (scale === MIN_MEDIA_SCALE) return { scale: MIN_MEDIA_SCALE, x: 0, y: 0 };

  const viewportWidth = Math.max(0, finite(geometry.viewportWidth));
  const viewportHeight = Math.max(0, finite(geometry.viewportHeight));
  const startX = finite(startCenter.x, viewportWidth / 2);
  const startY = finite(startCenter.y, viewportHeight / 2);
  const currentX = finite(currentCenter.x, startX);
  const currentY = finite(currentCenter.y, startY);
  const cx = viewportWidth / 2;
  const cy = viewportHeight / 2;
  const ratio = scale / Math.max(MIN_MEDIA_SCALE, start.scale);
  const x = (currentX - cx) - ((startX - cx - start.x) * ratio);
  const y = (currentY - cy) - ((startY - cy - start.y) * ratio);
  return constrainMediaView({ scale, x, y }, geometry);
}

export function toggleMediaZoomAt(view = {}, focal = {}, geometry = {}, expandedScale = 2) {
  const current = constrainMediaView(view, geometry);
  if (current.scale > MIN_MEDIA_SCALE) return resetMediaView();
  return zoomMediaViewAt(current, expandedScale, focal, geometry);
}

export function panMediaView(view = {}, dx = 0, dy = 0, geometry = {}) {
  return constrainMediaView({ ...view, x: finite(view.x) + finite(dx), y: finite(view.y) + finite(dy) }, geometry);
}
export function resetMediaView() { return { scale: MIN_MEDIA_SCALE, x: 0, y: 0 }; }
export function formatMediaZoom(scale = 1) { return `${Math.round(clampMediaScale(scale) * 100)}%`; }
export function mediaKeyboardAction(key, { shiftKey = false } = {}) {
  const pan = shiftKey ? MEDIA_PAN_LARGE_STEP : MEDIA_PAN_STEP;
  switch (key) {
    case '+': case '=': return { type: 'zoom', delta: MEDIA_ZOOM_STEP };
    case '-': case '_': return { type: 'zoom', delta: -MEDIA_ZOOM_STEP };
    case '0': return { type: 'reset' };
    case 'ArrowLeft': return { type: 'pan', dx: pan, dy: 0 };
    case 'ArrowRight': return { type: 'pan', dx: -pan, dy: 0 };
    case 'ArrowUp': return { type: 'pan', dx: 0, dy: pan };
    case 'ArrowDown': return { type: 'pan', dx: 0, dy: -pan };
    default: return null;
  }
}
