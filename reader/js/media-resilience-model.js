const MEDIA_KINDS = new Set(['image', 'video', 'audio', 'embed']);

export function mediaKind(tagName = '') {
  const tag = String(tagName).toLowerCase();
  if (tag === 'img') return 'image';
  if (tag === 'video') return 'video';
  if (tag === 'audio') return 'audio';
  if (tag === 'iframe') return 'embed';
  return null;
}

export function intrinsicAspect(width, height) {
  const w = Number(width);
  const h = Number(height);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
  return w / h;
}

export function normalizedAspect(value) {
  const ratio = Number(value);
  if (!Number.isFinite(ratio) || ratio <= 0) return null;
  return Math.min(8, Math.max(0.125, ratio));
}

export function mediaViewportPolicy({ width = 0, height = 0, mode = 'paged', shortLandscape = false } = {}) {
  const w = Math.max(240, Number(width) || 0);
  const h = Math.max(240, Number(height) || 0);
  const continuous = mode === 'scroll';
  const heightFraction = shortLandscape ? 0.66 : continuous ? 0.76 : 0.72;
  return {
    maxInline: Math.max(220, Math.floor(w - 32)),
    maxBlock: Math.max(180, Math.floor(h * heightFraction)),
    heightFraction,
  };
}

export function mediaLayoutChange({
  kind,
  previousAspect = null,
  nextAspect = null,
  previousWidth = 0,
  previousHeight = 0,
  nextWidth = 0,
  nextHeight = 0,
  tolerance = 0.015,
} = {}) {
  if (!MEDIA_KINDS.has(kind)) return false;
  const before = normalizedAspect(previousAspect) || intrinsicAspect(previousWidth, previousHeight);
  const after = normalizedAspect(nextAspect) || intrinsicAspect(nextWidth, nextHeight);
  if (!after) return false;
  if (!before) return true;
  return Math.abs(after - before) / before > Math.max(0, Number(tolerance) || 0);
}

export function mediaRefreshPlan({ stage = 'read', mode = 'paged', changed = false, hidden = false } = {}) {
  if (stage !== 'read' || hidden || !changed) return { refresh: false, reason: 'inactive' };
  return {
    refresh: true,
    reason: mode === 'scroll' ? 'continuous-metrics' : 'pagination',
  };
}

export function mediaInspectorIntent({ kind, key = '', ctrl = false, meta = false, alt = false } = {}) {
  if (kind !== 'image' || ctrl || meta || alt) return 'none';
  return key === 'Enter' ? 'open' : 'none';
}
