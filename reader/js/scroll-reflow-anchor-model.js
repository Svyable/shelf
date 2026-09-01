export function clampScroll(value, maxScroll) {
  return Math.max(0, Math.min(Number(value) || 0, Math.max(0, Number(maxScroll) || 0)));
}

export function anchorIndex(tops = [], scrollTop = 0, clientHeight = 0) {
  if (!tops.length) return -1;
  const probe = (Number(scrollTop) || 0) + Math.min((Number(clientHeight) || 0) * 0.3, 220);
  let lo = 0;
  let hi = tops.length - 1;
  let index = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if ((Number(tops[mid]) || 0) <= probe) {
      index = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return index;
}

export function captureAnchor({ blocks = [], tops = [], scrollTop = 0, clientHeight = 0, identity = '' } = {}) {
  const index = anchorIndex(tops, scrollTop, clientHeight);
  const block = blocks[index];
  if (!block) return null;
  return Object.freeze({
    identity: String(identity || ''),
    chapter: String(block.chapter || ''),
    offset: Number(block.offset ?? block.start) || 0,
    viewportOffset: (Number(tops[index]) || 0) - (Number(scrollTop) || 0),
  });
}

export function restoreAnchor(anchor, { blocks = [], tops = [], maxScroll = 0, identity = '' } = {}) {
  if (!anchor || String(identity || '') !== String(anchor.identity || '')) return null;
  const index = blocks.findIndex((block) =>
    String(block.chapter || '') === anchor.chapter
    && (Number(block.offset ?? block.start) || 0) === anchor.offset
  );
  if (index < 0 || index >= tops.length) return null;
  return clampScroll((Number(tops[index]) || 0) - anchor.viewportOffset, maxScroll);
}
