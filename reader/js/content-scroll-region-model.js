const DEFAULT_OVERFLOW_EPSILON = 3;

function finite(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function scrollRegionMetrics(
  { scrollWidth = 0, clientWidth = 0, scrollLeft = 0 } = {},
  epsilon = DEFAULT_OVERFLOW_EPSILON
) {
  const width = Math.max(0, finite(clientWidth));
  const content = Math.max(width, finite(scrollWidth));
  const max = Math.max(0, content - width);
  const tolerance = Math.max(0, finite(epsilon, DEFAULT_OVERFLOW_EPSILON));
  const left = Math.max(0, Math.min(max, finite(scrollLeft)));
  const scrollable = max > tolerance;
  return {
    scrollable,
    maxScrollLeft: max,
    canScrollLeft: scrollable && left > tolerance,
    canScrollRight: scrollable && left < max - tolerance,
  };
}

export function horizontalKeyboardAction(key, event = {}, clientWidth = 0) {
  if (event.altKey || event.ctrlKey || event.metaKey) return null;
  const width = Math.max(1, finite(clientWidth, 1));
  const step = Math.max(56, Math.round(width * (event.shiftKey ? 0.9 : 0.62)));

  if (key === 'ArrowLeft') return { type: 'delta', dx: -step };
  if (key === 'ArrowRight') return { type: 'delta', dx: step };
  if (key === 'Home') return { type: 'edge', edge: 'start' };
  if (key === 'End') return { type: 'edge', edge: 'end' };
  return null;
}

export function describedByTokens(value, token, enabled = true) {
  const id = String(token || '').trim();
  const tokens = String(value || '').trim().split(/\s+/).filter(Boolean);
  const next = tokens.filter((item) => item !== id);
  if (enabled && id) next.push(id);
  return [...new Set(next)].join(' ');
}
