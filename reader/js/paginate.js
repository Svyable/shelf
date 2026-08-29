/**
 * Derive pages from Markdown blocks. Canonical position is chapter + source offset.
 *
 * Pagination deliberately measures real rendered HTML. Text blocks may be split
 * to use the remaining page area, but inline markup is preserved with DOM Range
 * cloning instead of flattening the block to textContent.
 */

const SPLITTABLE_TAGS = new Set(['P', 'BLOCKQUOTE', 'LI']);
const MIN_EDGE_WORDS = 3;

function fits(measureEl, html) {
  measureEl.innerHTML = html;
  return measureEl.scrollHeight <= measureEl.clientHeight + 1;
}

function joinHtml(parts) {
  return parts.map((p) => p.html).join('');
}

function textBoundaries(text) {
  const ends = [];
  const re = /\S+(?:\s+|$)/g;
  let match;
  while ((match = re.exec(text))) ends.push(re.lastIndex);
  if (!ends.length && text.length) ends.push(text.length);
  if (ends.length && ends[ends.length - 1] < text.length) ends[ends.length - 1] = text.length;
  return ends;
}

export function balancedBreakIndex(best, cursor, total, minEdgeWords = MIN_EDGE_WORDS) {
  if (best <= cursor || best >= total) return best;
  const used = best - cursor;
  const remaining = total - best;

  // A tiny fragment at the bottom of a page is worse than moving the paragraph.
  if (used < minEdgeWords) return cursor;

  // Avoid leaving one or two words alone at the top of the continuation page.
  if (remaining > 0 && remaining < minEdgeWords && used > minEdgeWords) {
    return Math.max(cursor + minEdgeWords, total - minEdgeWords);
  }
  return best;
}

function textPoint(root, absoluteOffset) {
  const showText = globalThis.NodeFilter?.SHOW_TEXT || 4;
  const walker = document.createTreeWalker(root, showText);
  let remaining = Math.max(0, absoluteOffset);
  let node = walker.nextNode();
  let last = null;

  while (node) {
    last = node;
    const length = node.nodeValue?.length || 0;
    if (remaining <= length) return { node, offset: remaining };
    remaining -= length;
    node = walker.nextNode();
  }

  if (last) return { node: last, offset: last.nodeValue?.length || 0 };
  return { node: root, offset: root.childNodes.length };
}

function cloneTextRange(root, start, end) {
  const total = root.textContent?.length || 0;
  const lo = Math.max(0, Math.min(total, start));
  const hi = Math.max(lo, Math.min(total, end));
  const range = document.createRange();
  range.selectNodeContents(root);

  if (lo > 0) {
    const point = textPoint(root, lo);
    range.setStart(point.node, point.offset);
  }
  if (hi < total) {
    const point = textPoint(root, hi);
    range.setEnd(point.node, point.offset);
  }

  const shell = root.cloneNode(false);
  shell.appendChild(range.cloneContents());
  return shell.textContent?.trim() ? shell.outerHTML : '';
}

function splitTextBlock(block, measureEl, prefixHtml = '') {
  const wrap = document.createElement('div');
  wrap.innerHTML = block.html;
  const el = wrap.firstElementChild;
  if (!el || !el.textContent || !SPLITTABLE_TAGS.has(el.tagName)) return [block];

  const text = el.textContent;
  const boundaries = textBoundaries(text);
  const wordCount = boundaries.length;
  if (wordCount < MIN_EDGE_WORDS + 1) return [block];

  const starts = [0, ...boundaries.slice(0, -1)];
  const parts = [];
  let cursor = 0;
  let prefix = prefixHtml;
  const raw = block.raw;
  const textLen = Math.max(text.length, 1);

  while (cursor < wordCount) {
    let lo = cursor + 1;
    let hi = wordCount;
    let best = cursor;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const html = cloneTextRange(el, starts[cursor], boundaries[mid - 1]);
      if (html && fits(measureEl, `${prefix}${html}`)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    // No useful room remains on the current page. Let the caller flush and
    // retry the intact block on a fresh page instead of creating a widow.
    if (best === cursor && prefix) return [block];
    if (best === cursor) best = cursor + 1;

    if (prefix) {
      const balanced = balancedBreakIndex(best, cursor, wordCount);
      if (balanced === cursor) return [block];
      if (balanced < best) {
        const candidate = cloneTextRange(el, starts[cursor], boundaries[balanced - 1]);
        if (candidate && fits(measureEl, `${prefix}${candidate}`)) best = balanced;
      }
    } else {
      const balanced = balancedBreakIndex(best, cursor, wordCount);
      if (balanced > cursor && balanced < best) best = balanced;
    }

    const startChar = starts[cursor];
    const endChar = boundaries[best - 1];
    const html = cloneTextRange(el, startChar, endChar);
    if (!html) break;

    const ratio0 = startChar / textLen;
    const ratio1 = endChar / textLen;
    const start = block.start + Math.floor((block.end - block.start) * ratio0);
    const end = block.start + Math.floor((block.end - block.start) * ratio1);
    parts.push({
      html,
      start,
      end: Math.max(end, start + 1),
      raw,
    });

    cursor = best;
    prefix = '';
  }

  return parts.length ? parts : [block];
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
  return /^\s*<h[1-4]\b/i.test(piece.html || '');
}

function isAtomic(piece) {
  return /^\s*<(?:pre|table|figure|img|video|audio|iframe|hr)\b/i.test(piece.html || '');
}

export function paginateBlocks(chapterId, blocks, measureEl) {
  const pages = [];
  let current = [];

  const overflow = () => current.length > 0 && !fits(measureEl, joinHtml(current));

  const flush = () => {
    if (!current.length) return;

    // Never strand a heading as the final item on a page. Move it forward so
    // the next page opens with the heading and the prose it introduces.
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
        const bits = isAtomic(piece) ? [piece] : splitTextBlock(piece, measureEl);
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

    // Use the remaining page area for prose while preserving inline emphasis,
    // links, citations and notes. Headings and complex media stay atomic.
    if (!isHeading(piece) && !isAtomic(piece)) {
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
