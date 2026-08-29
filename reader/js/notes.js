const key = (slug) => {
  const prefix = (typeof window !== 'undefined' && window.__IMPRINT?.storagePrefix) || 'obb';
  return `${prefix}:${slug}:notes`;
};

export function loadNotes(slug) {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) || '[]');
  } catch {
    return [];
  }
}

export function saveNotes(slug, notes) {
  localStorage.setItem(key(slug), JSON.stringify(notes));
}

export function addNote(slug, note) {
  const notes = loadNotes(slug);
  notes.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
    ...note,
  });
  saveNotes(slug, notes);
  return notes;
}

export function removeNote(slug, id) {
  const notes = loadNotes(slug).filter((n) => n.id !== id);
  saveNotes(slug, notes);
  return notes;
}

export function notesMarkdown(book, notes) {
  const lines = [`# Notes — ${book.title}`, ''];
  for (const n of notes) {
    const ch = book.contents.find((c) => c.id === n.chapter);
    lines.push(`## ${ch ? ch.title : n.chapter}`);
    if (n.quote) lines.push(`> ${n.quote}`, '');
    if (n.body) lines.push(n.body, '');
  }
  return lines.join('\n');
}

export function sourceOffsetForTextPosition(sourceStart, sourceEnd, textLength, textOffset) {
  const start = Math.max(0, Number(sourceStart) || 0);
  const end = Math.max(start, Number(sourceEnd) || start);
  const length = Math.max(0, Number(textLength) || 0);
  const offset = Math.max(0, Math.min(length, Number(textOffset) || 0));
  if (!length || end <= start) return start;
  return Math.round(start + (end - start) * (offset / length));
}

export function textPositionForSourceOffset(sourceStart, sourceEnd, textLength, sourceOffset) {
  const start = Math.max(0, Number(sourceStart) || 0);
  const end = Math.max(start, Number(sourceEnd) || start);
  const length = Math.max(0, Number(textLength) || 0);
  const offset = Math.max(start, Math.min(end, Number(sourceOffset) || start));
  if (!length || end <= start) return 0;
  return Math.round(length * ((offset - start) / (end - start)));
}

export function normalizeSourceAnchor(anchor) {
  if (!anchor || !Number.isFinite(Number(anchor.start)) || !Number.isFinite(Number(anchor.end))) {
    return null;
  }
  const start = Math.max(0, Math.round(Number(anchor.start)));
  const end = Math.max(start, Math.round(Number(anchor.end)));
  return { version: 1, start, end };
}

export function anchorSegmentsForRanges(ranges, anchor) {
  const normalized = normalizeSourceAnchor(anchor);
  if (!normalized) return [];
  return (ranges || [])
    .map((range, index) => {
      const start = Math.max(0, Number(range.start) || 0);
      const end = Math.max(start, Number(range.end) || start);
      const overlapStart = Math.max(start, normalized.start);
      const overlapEnd = Math.min(end, normalized.end);
      if (overlapEnd <= overlapStart && !(normalized.start === normalized.end && normalized.start >= start && normalized.start <= end)) {
        return null;
      }
      return {
        index,
        sourceStart: overlapStart,
        sourceEnd: Math.max(overlapStart, overlapEnd),
      };
    })
    .filter(Boolean);
}

function sourceElement(node) {
  const el = node?.nodeType === 1 ? node : node?.parentElement;
  return el?.closest?.('[data-source-start][data-source-end]') || null;
}

function textOffsetWithin(root, node, offset) {
  if (!root || !node || typeof document === 'undefined') return 0;
  try {
    const range = document.createRange();
    range.selectNodeContents(root);
    range.setEnd(node, offset);
    return range.toString().length;
  } catch {
    return 0;
  }
}

function sourceOffsetForDomPoint(node, offset) {
  const el = sourceElement(node);
  if (!el) return null;
  const start = Number(el.dataset.sourceStart);
  const end = Number(el.dataset.sourceEnd);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  const textLength = el.textContent?.length || 0;
  const textOffset = textOffsetWithin(el, node, offset);
  return sourceOffsetForTextPosition(start, end, textLength, textOffset);
}

export function selectionSourceAnchor(selection = globalThis.window?.getSelection?.()) {
  if (!selection?.rangeCount || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  const start = sourceOffsetForDomPoint(range.startContainer, range.startOffset);
  const end = sourceOffsetForDomPoint(range.endContainer, range.endOffset);
  if (start == null || end == null) return null;
  return normalizeSourceAnchor({ start: Math.min(start, end), end: Math.max(start, end) });
}

function textNodes(root) {
  if (!root || typeof document === 'undefined') return [];
  const showText = globalThis.NodeFilter?.SHOW_TEXT || 4;
  const walker = document.createTreeWalker(root, showText);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.nodeValue) continue;
    if (node.parentElement?.closest('script, style')) continue;
    nodes.push(node);
  }
  return nodes;
}

function wrapTextOffsets(root, start, end, note) {
  const nodes = textNodes(root);
  let cursor = 0;
  let wrapped = false;
  for (const node of nodes) {
    const length = node.nodeValue?.length || 0;
    const nodeStart = cursor;
    const nodeEnd = cursor + length;
    cursor = nodeEnd;
    const lo = Math.max(start, nodeStart);
    const hi = Math.min(end, nodeEnd);
    if (hi <= lo) continue;
    if (node.parentElement?.closest('mark.note-mark')) continue;
    try {
      const range = document.createRange();
      range.setStart(node, lo - nodeStart);
      range.setEnd(node, hi - nodeStart);
      const mark = document.createElement('mark');
      mark.className = 'note-mark';
      mark.dataset.noteId = note.id;
      mark.title = note.body || 'Highlight';
      range.surroundContents(mark);
      wrapped = true;
    } catch {
      // Keep applying the rest of the anchor if one DOM fragment cannot wrap.
    }
  }
  return wrapped;
}

function clearAppliedNotes(root) {
  root?.querySelectorAll?.('mark.note-mark[data-note-id]').forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent || ''));
  });
  root?.normalize?.();
}

function wrapSourceAnchor(root, note) {
  const anchor = normalizeSourceAnchor(note.anchor);
  if (!anchor) return false;
  const elements = [...root.querySelectorAll('[data-source-start][data-source-end]')];
  const ranges = elements.map((el) => ({
    start: Number(el.dataset.sourceStart) || 0,
    end: Number(el.dataset.sourceEnd) || Number(el.dataset.sourceStart) || 0,
  }));
  const segments = anchorSegmentsForRanges(ranges, anchor);
  let wrapped = false;
  for (const segment of segments) {
    const el = elements[segment.index];
    if (!el) continue;
    const sourceStart = ranges[segment.index].start;
    const sourceEnd = ranges[segment.index].end;
    const textLength = el.textContent?.length || 0;
    const start = textPositionForSourceOffset(sourceStart, sourceEnd, textLength, segment.sourceStart);
    const end = textPositionForSourceOffset(sourceStart, sourceEnd, textLength, segment.sourceEnd);
    wrapped = wrapTextOffsets(el, start, Math.max(start + 1, end), note) || wrapped;
  }
  return wrapped;
}

function wrapQuote(root, note) {
  const quote = String(note.quote || '').trim();
  if (!quote) return false;
  const nodes = textNodes(root).filter((node) => !node.parentElement?.closest('mark.note-mark'));
  const text = nodes.map((node) => node.nodeValue || '').join('');
  const needles = [quote];
  if (quote.length > 48) needles.push(quote.slice(0, 48));
  for (const needle of needles) {
    const index = text.indexOf(needle);
    if (index < 0) continue;
    return wrapTextOffsets(root, index, index + needle.length, note);
  }
  return false;
}

export function applyNotes(container, notes, chapter) {
  if (!container) return;
  clearAppliedNotes(container);
  if (!notes?.length) return;
  const relevant = notes.filter((n) => n.chapter === chapter && n.quote);
  for (const note of relevant) {
    if (!wrapSourceAnchor(container, note)) wrapQuote(container, note);
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  import('./annotations.js').catch(() => {});
}
