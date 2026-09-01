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

export function scrollRegionEdge(metrics = {}) {
  if (!metrics.scrollable) return 'none';
  if (!metrics.canScrollLeft && !metrics.canScrollRight) return 'both';
  if (!metrics.canScrollLeft) return 'start';
  if (!metrics.canScrollRight) return 'end';
  return 'middle';
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

export function horizontalKeyboardDecision(
  key,
  event = {},
  clientWidth = 0,
  metrics = {},
  { allowArrowHandoff = false } = {}
) {
  const action = horizontalKeyboardAction(key, event, clientWidth);
  if (!action) return { action: null, consume: false, handoff: false };

  if (allowArrowHandoff && action.type === 'delta') {
    const towardStart = action.dx < 0;
    const canMove = towardStart ? !!metrics.canScrollLeft : !!metrics.canScrollRight;
    if (!canMove) {
      return {
        action: null,
        consume: false,
        handoff: true,
        direction: towardStart ? 'previous' : 'next',
      };
    }
  }

  return { action, consume: true, handoff: false };
}

export function overflowEdgeAnnouncement({ kind = 'content', edge = 'middle', paged = false } = {}) {
  const label = kind === 'table' ? 'table' : kind === 'code' ? 'code block' : 'content';
  if (edge === 'start') {
    return paged
      ? `Start of scrollable ${label}. Left Arrow again turns the previous page.`
      : `Start of scrollable ${label}.`;
  }
  if (edge === 'end') {
    return paged
      ? `End of scrollable ${label}. Right Arrow again turns the next page.`
      : `End of scrollable ${label}.`;
  }
  if (edge === 'both') return `Scrollable ${label} fits at both horizontal edges.`;
  return '';
}

export function describedByTokens(value, token, enabled = true) {
  const id = String(token || '').trim();
  const tokens = String(value || '').trim().split(/\s+/).filter(Boolean);
  const next = tokens.filter((item) => item !== id);
  if (enabled && id) next.push(id);
  return [...new Set(next)].join(' ');
}
