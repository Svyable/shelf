/**
 * Canonical source-position helpers shared by paged and continuous reading.
 *
 * Source offsets are Markdown character offsets. They survive pagination,
 * responsive reflow, and reading-mode changes, unlike viewport/page numbers.
 */

export function clamp01(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export function interpolateSourceOffset(start, end, ratio = 0.5) {
  const lo = Math.max(0, Number(start) || 0);
  const hi = Math.max(lo, Number(end) || lo);
  if (hi <= lo) return lo;
  return Math.round(lo + (hi - lo) * clamp01(ratio));
}

function openingTagEnd(source) {
  const start = source.search(/\S/);
  if (start < 0 || source[start] !== '<' || !/[A-Za-z]/.test(source[start + 1] || '')) return -1;
  let quote = '';
  for (let i = start + 2; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === '>') return i + 1;
  }
  return -1;
}

export function withSourceRange(html, start, end) {
  const source = String(html || '');
  const lo = Math.max(0, Number(start) || 0);
  const hi = Math.max(lo, Number(end) || lo);
  const endIndex = openingTagEnd(source);
  if (endIndex < 0) return source;

  const opening = source.slice(0, endIndex);
  const match = opening.match(/^(\s*<[A-Za-z][A-Za-z0-9:-]*)([\s\S]*)$/);
  if (!match) return source;
  const cleaned = match[2]
    .replace(/\sdata-source-start=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\sdata-source-end=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  const stamped = `${match[1]} data-source-start="${lo}" data-source-end="${hi}"${cleaned}`;
  return stamped + source.slice(endIndex);
}

export function sourceAnchorFromRects(fragments, probeY) {
  const rows = (fragments || [])
    .map((fragment) => {
      const start = Math.max(0, Number(fragment.start) || 0);
      const end = Math.max(start, Number(fragment.end) || start);
      const top = Number(fragment.top);
      const bottom = Number(fragment.bottom);
      if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom < top) return null;
      return { start, end, top, bottom };
    })
    .filter(Boolean);
  if (!rows.length) return null;

  const y = Number.isFinite(Number(probeY)) ? Number(probeY) : rows[0].top;
  let best = rows.find((row) => y >= row.top && y <= row.bottom) || null;
  if (!best) {
    best = rows.reduce((winner, row) => {
      const distance = y < row.top ? row.top - y : y - row.bottom;
      const winnerDistance = y < winner.top ? winner.top - y : y - winner.bottom;
      return distance < winnerDistance ? row : winner;
    }, rows[0]);
  }

  const height = Math.max(1, best.bottom - best.top);
  const ratio = clamp01((y - best.top) / height);
  return {
    ...best,
    ratio,
    offset: interpolateSourceOffset(best.start, best.end, ratio),
  };
}

export function scrollTopForSourceAnchor({
  blockTop,
  blockHeight,
  sourceStart,
  sourceEnd,
  sourceOffset,
  probeDistance,
  maxScroll,
}) {
  const start = Math.max(0, Number(sourceStart) || 0);
  const end = Math.max(start, Number(sourceEnd) || start);
  const offset = Math.max(start, Math.min(end, Number(sourceOffset) || start));
  const ratio = end > start ? (offset - start) / (end - start) : 0;
  const top = Math.max(0, Number(blockTop) || 0);
  const height = Math.max(0, Number(blockHeight) || 0);
  const probe = Math.max(0, Number(probeDistance) || 0);
  const limit = Number.isFinite(Number(maxScroll)) ? Math.max(0, Number(maxScroll)) : Infinity;
  return Math.max(0, Math.min(limit, top + height * ratio - probe));
}
