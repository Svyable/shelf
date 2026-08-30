function finite(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function chapterIntrinsicEstimate({
  blockCount = 0,
  fontSize = 18,
  lineHeight = 1.55,
  viewportHeight = 800,
} = {}) {
  const blocks = Math.max(1, Math.round(finite(blockCount, 1)));
  const size = Math.max(12, Math.min(40, finite(fontSize, 18)));
  const leading = Math.max(1.2, Math.min(2.2, finite(lineHeight, 1.55)));
  const viewport = Math.max(320, finite(viewportHeight, 800));
  const perBlock = size * leading * 3.6;
  const estimated = Math.round(blocks * perBlock + size * 8);
  return Math.max(Math.round(viewport * 1.15), Math.min(Math.round(viewport * 28), estimated));
}

export function shouldRefreshIntrinsic(previous, measured, {
  minDelta = 96,
  ratio = 0.12,
} = {}) {
  const before = Math.max(0, finite(previous, 0));
  const after = Math.max(0, finite(measured, 0));
  if (!after) return false;
  if (!before) return true;
  const delta = Math.abs(after - before);
  return delta >= Math.max(minDelta, before * ratio);
}

export function intrinsicSizeCss(value) {
  return `${Math.max(1, Math.round(finite(value, 1)))}px`;
}
