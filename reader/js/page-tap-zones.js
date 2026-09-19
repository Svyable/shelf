const COARSE_PREV_MAX = 0.20;
const COARSE_NEXT_MIN = 0.72;

function finite(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function pageTapIntent(x, width, { coarse = false } = {}) {
  const w = finite(width);
  const position = finite(x);
  if (w <= 0 || position < 0 || position > w) return 'pass';

  if (coarse) {
    const ratio = position / w;
    if (ratio <= COARSE_PREV_MAX) return 'prev';
    if (ratio >= COARSE_NEXT_MIN) return 'next';
    return 'pass';
  }

  const edge = Math.min(132, Math.max(62, w * 0.14));
  if (position <= edge) return 'prev';
  if (position >= w - edge) return 'next';
  return 'pass';
}

export function coarseTapZones(width) {
  const w = Math.max(0, finite(width));
  return Object.freeze({
    previousEnd: w * COARSE_PREV_MAX,
    nextStart: w * COARSE_NEXT_MIN,
  });
}
