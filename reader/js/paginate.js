/**
 * Derive pages from Markdown blocks. Canonical position is chapter + source offset.
 *
 * Pagination deliberately measures real rendered HTML. Prose preserves inline
 * markup with DOM Range cloning; lists and tables fragment at semantic item/row
 * boundaries so technical content does not become an oversized page brick.
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

function parsedElement(html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap.firstElementChild;
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

function blockPart(block, html, ratio0, ratio1) {
  const span = block.end - block.start;
  const start = block.start + Math.floor(span * ratio0);
  const end = block.start + Math.floor(span * ratio1);
  return {
    html,
    start,
    end: Math.max(end, start + 1),
    raw: block.raw,
  };
}

function splitTextBlock(block, measureEl, prefixHtml = '') {
  const el = parsedElement(block.html);
  if (!el || !el.textContent || !SPLITTABLE_TAGS.has(el.tagName)) return [block];

  const text = el.textContent;
  const boundaries = textBoundaries(text);
  const wordCount = boundaries.length;
  if (wordCount < MIN_EDGE_WORDS + 1) return [block];

  const starts = [0, ...boundaries.slice(0, -1)];
  const parts = [];
  let cursor = 0;
  let prefix = prefixHtml;
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

    parts.push(blockPart(block, html, startChar / textLen, endChar / textLen));
    cursor = best;
    prefix = '';
  }

  return parts.length ? parts : [block];
}

function cumulativeWeights(nodes) {
  const cumulative = [0];
  for (const node of nodes) {
    const weight = Math.max(1, node.textContent?.trim().length || 0);
    cumulative.push(cumulative[cumulative.length - 1] + weight);
  }
  return cumulative;
}

function splitListBlock(block, measureEl, prefixHtml = '') {
  const list = parsedElement(block.html);
  if (!list || !['UL', 'OL'].includes(list.tagName)) return null;
  const items = [...list.children].filter((child) => child.tagName === 'LI');
  if (items.length < 2) return [block];

  const cumulative = cumulativeWeights(items);
  const totalWeight = Math.max(1, cumulative[cumulative.length - 1]);
  const orderedBase = Number.parseInt(list.getAttribute('start') || '1', 10) || 1;

  const htmlFor = (start, end) => {
    const shell = list.cloneNode(false);
    if (list.tagName === 'OL' && start > 0) shell.setAttribute('start', String(orderedBase + start));
    for (const item of items.slice(start, end)) shell.appendChild(item.cloneNode(true));
    return shell.outerHTML;
  };

  const parts = [];
  let cursor = 0;
  let prefix = prefixHtml;

  while (cursor < items.length) {
    let lo = cursor + 1;
    let hi = items.length;
    let best = cursor;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const html = htmlFor(cursor, mid);
      if (fits(measureEl, `${prefix}${html}`)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    if (best === cursor && prefix) return [block];
    if (best === cursor) best = cursor + 1;

    const html = htmlFor(cursor, best);
    parts.push(blockPart(
      block,
      html,
      cumulative[cursor] / totalWeight,
      cumulative[best] / totalWeight
    ));
    cursor = best;
    prefix = '';
  }

  return parts.length ? parts : [block];
}

function splitTableBlock(block, measureEl, prefixHtml = '') {
  const table = parsedElement(block.html);
  if (!table || table.tagName !== 'TABLE') return null;

  const body = table.tBodies?.[0];
  const rows = body ? [...body.rows] : [];
  if (rows.length < 2) return [block];

  const caption = table.caption;
  const colgroups = [...table.children].filter((child) => child.tagName === 'COLGROUP');
  const head = table.tHead;
  const foot = table.tFoot;
  const cumulative = cumulativeWeights(rows);
  const totalWeight = Math.max(1, cumulative[cumulative.length - 1]);

  const htmlFor = (start, end) => {
    const shell = table.cloneNode(false);
    if (caption && start === 0) shell.appendChild(caption.cloneNode(true));
    for (const group of colgroups) shell.appendChild(group.cloneNode(true));
    if (head) shell.appendChild(head.cloneNode(true));
    const nextBody = document.createElement('tbody');
    for (const row of rows.slice(start, end)) nextBody.appendChild(row.cloneNode(true));
    shell.appendChild(nextBody);
    if (foot && end === rows.length) shell.appendChild(foot.cloneNode(true));
    return shell.outerHTML;
  };

  const parts = [];
  let cursor = 0;
  let prefix = prefixHtml;

  while (cursor < rows.length) {
    let lo = cursor + 1;
    let hi = rows.length;
    let best = cursor;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const html = htmlFor(cursor, mid);
      if (fits(measureEl, `${prefix}${html}`)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    if (best === cursor && prefix) return [block];
    if (best === cursor) best = cursor + 1;

    const html = htmlFor(cursor, best);
    parts.push(blockPart(
      block,
      html,
      cumulative[cursor] / totalWeight,
      cumulative[best] / totalWeight
    ));
    cursor = best;
    prefix = '';
  }

  return parts.length ? parts : [block];
}

function splitBlock(block, measureEl, prefixHtml = '') {
  const listParts = splitListBlock(block, measureEl, prefixHtml);
  if (listParts) return listParts;
  const tableParts = splitTableBlock(block, measureEl, prefixHtml);
  if (tableParts) return tableParts;
  return splitTextBlock(block, measureEl, prefixHtml);
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
  return /^\s*<(?:pre|figure|img|video|audio|iframe|hr)\b/i.test(piece.html || '');
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
        const bits = isAtomic(piece) ? [piece] : splitBlock(piece, measureEl);
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

    // Use remaining page area for semantic text/list/table fragments while
    // headings and complex media stay atomic.
    if (!isHeading(piece) && !isAtomic(piece)) {
      const bits = splitBlock(piece, measureEl, joinHtml(current));
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
