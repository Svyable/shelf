/**
 * Derive pages from Markdown blocks. Canonical position is chapter + source offset.
 */

function fits(measureEl, html) {
  measureEl.innerHTML = html;
  return measureEl.scrollHeight <= measureEl.clientHeight + 1;
}

function joinHtml(parts) {
  return parts.map((p) => p.html).join('');
}

function splitTextBlock(block, measureEl, prefixHtml = '') {
  const wrap = document.createElement('div');
  wrap.innerHTML = block.html;
  const el = wrap.firstElementChild;
  if (!el || !el.textContent || !['P', 'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'LI'].includes(el.tagName)) {
    return [block];
  }
  const tag = el.tagName.toLowerCase();
  const open = `<${tag}>`;
  const close = `</${tag}>`;
  const words = el.textContent.split(/(\s+)/).filter((w) => w.length);
  if (words.length < 4) return [block];

  const parts = [];
  let cursor = 0;
  let prefix = prefixHtml;
  const raw = block.raw;
  const textLen = words.join('').length || 1;

  while (cursor < words.length) {
    let lo = cursor + 1;
    let hi = words.length;
    let best = cursor;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const slice = words.slice(cursor, mid).join('');
      const html = `${open}${escapeHtml(slice)}${close}`;
      if (fits(measureEl, `${prefix}${html}`)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    // If the existing page has no usable room for even the first word, leave
    // the block intact so the caller can flush and retry it on a fresh page.
    if (best === cursor && prefix) return [block];
    if (best === cursor) best = cursor + 1;

    const slice = words.slice(cursor, best).join('');
    const ratio0 = words.slice(0, cursor).join('').length / textLen;
    const ratio1 = words.slice(0, best).join('').length / textLen;
    const start = block.start + Math.floor((block.end - block.start) * ratio0);
    const end = block.start + Math.floor((block.end - block.start) * ratio1);
    parts.push({
      html: `${open}${escapeHtml(slice)}${close}`,
      start,
      end: Math.max(end, start + 1),
      raw: raw,
    });
    cursor = best;
    prefix = '';
  }
  return parts;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function makePage(chapterId, parts) {
  return {
    chapter: chapterId,
    start: parts[0].start,
    end: parts[parts.length - 1].end,
    html: joinHtml(parts),
  };
}

function isHeading(piece) {
  return /^\s*<h[1-3]\b/i.test(piece.html || '');
}

export function paginateBlocks(chapterId, blocks, measureEl) {
  const pages = [];
  let current = [];

  const overflow = () => current.length > 0 && !fits(measureEl, joinHtml(current));

  const flush = () => {
    if (!current.length) return;
    if (current.length > 1 && isHeading(current[current.length - 1])) {
      const heading = current.pop();
      pages.push(makePage(chapterId, current));
      current = [heading];
      return;
    }
    pages.push(makePage(chapterId, current));
    current = [];
  };

  const accept = (piece) => {
    if (current.length === 0) {
      current = [piece];
      if (overflow()) {
        current = [];
        const bits = splitTextBlock(piece, measureEl);
        if (bits.length === 1) {
          pages.push(makePage(chapterId, bits));
          return;
        }
        for (const bit of bits) accept(bit);
      }
      return;
    }

    current.push(piece);
    if (!overflow()) return;
    current.pop();

    // Paragraphs, list items, and blockquotes should use whatever room is left
    // on the current page instead of moving wholesale to a mostly empty page.
    // Headings remain atomic so they do not get split away from the prose they
    // introduce.
    if (!isHeading(piece)) {
      const bits = splitTextBlock(piece, measureEl, joinHtml(current));
      if (bits.length > 1) {
        current.push(bits[0]);
        flush();
        for (const bit of bits.slice(1)) accept(bit);
        return;
      }
    }

    flush();
    accept(piece);
  };

  for (const block of blocks) accept(block);
  flush();
  if (pages.length === 0) {
    pages.push({ chapter: chapterId, start: 0, end: 0, html: '<p></p>' });
  }
  return pages;
}

export function pageIndexForOffset(pages, chapterId, offset) {
  const inChapter = pages
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.chapter === chapterId);
  if (!inChapter.length) return 0;
  const hit = inChapter.find(({ p }) => offset >= p.start && offset < p.end);
  if (hit) return hit.i;
  const last = inChapter[inChapter.length - 1];
  if (offset >= last.p.end) return last.i;
  return inChapter[0].i;
}
