export const FONT_SETTLEMENT = Object.freeze({
  widthEpsilon: 0.5,
  heightEpsilon: 0.5,
  timeoutMs: 3200,
  debounceMs: 80,
});

export function normalizeMetricSignature(value = {}) {
  return {
    width: Number.isFinite(Number(value.width)) ? Number(value.width) : 0,
    height: Number.isFinite(Number(value.height)) ? Number(value.height) : 0,
  };
}

export function metricDelta(before, after) {
  const a = normalizeMetricSignature(before);
  const b = normalizeMetricSignature(after);
  return {
    width: Math.abs(b.width - a.width),
    height: Math.abs(b.height - a.height),
  };
}

export function metricsChanged(before, after, policy = FONT_SETTLEMENT) {
  const delta = metricDelta(before, after);
  return delta.width >= policy.widthEpsilon || delta.height >= policy.heightEpsilon;
}

export function shouldRefreshReader({ stage, mode, before, after, active = true } = {}) {
  if (!active || stage !== 'read') return false;
  if (mode !== 'paged' && mode !== 'scroll') return false;
  return metricsChanged(before, after);
}

export function fontLoadSpec({ family, weight = 400, size = 18 } = {}) {
  const cleanFamily = String(family || '').trim();
  if (!cleanFamily) return '';
  const cleanWeight = Number.isFinite(Number(weight)) ? Math.round(Number(weight)) : 400;
  const cleanSize = Math.max(14, Math.min(32, Math.round(Number(size) || 18)));
  return `${cleanWeight} ${cleanSize}px ${cleanFamily}`;
}
