export const READING_TRAIL_STATE_KEY = 'bookselfReadingReturn';

function finiteOffset(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
}

export function normalizeReadingPoint(route = {}) {
  if (route.view !== 'read') return null;
  const slug = String(route.slug || '').trim();
  const chapter = String(route.chapter || '').trim();
  if (!slug || !chapter || chapter === 'back-cover') return null;
  return { slug, chapter, offset: finiteOffset(route.offset) };
}

export function sameReadingPoint(a, b) {
  if (!a || !b) return false;
  return a.slug === b.slug && a.chapter === b.chapter && a.offset === b.offset;
}

export function shouldRecordReadingReturn(fromRoute, toRoute, { replace = false } = {}) {
  if (replace) return false;
  const from = normalizeReadingPoint(fromRoute);
  const to = normalizeReadingPoint(toRoute);
  if (!from || !to) return false;
  if (from.slug !== to.slug) return false;
  return !sameReadingPoint(from, to);
}

export function navigationHistoryState(currentState, fromRoute, toRoute, { replace = false } = {}) {
  const next = currentState && typeof currentState === 'object' ? { ...currentState } : {};
  if (replace) return next;

  delete next[READING_TRAIL_STATE_KEY];
  if (shouldRecordReadingReturn(fromRoute, toRoute, { replace })) {
    next[READING_TRAIL_STATE_KEY] = normalizeReadingPoint(fromRoute);
  }
  return next;
}

export function readingReturnPoint(state, currentRoute) {
  const current = normalizeReadingPoint(currentRoute);
  if (!current || !state || typeof state !== 'object') return null;
  const point = normalizeReadingPoint({ view: 'read', ...state[READING_TRAIL_STATE_KEY] });
  if (!point || point.slug !== current.slug || sameReadingPoint(point, current)) return null;
  return point;
}

export function readingReturnLabel(point) {
  return point ? 'Return to previous reading spot' : '';
}
