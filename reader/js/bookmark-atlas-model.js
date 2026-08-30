function cleanText(value, limit = 500) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, limit);
}

function nonNegativeOffset(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
}

export function normalizeBookmark(raw = {}) {
  const chapter = cleanText(raw.chapter, 500);
  if (!chapter) return null;
  return { chapter, offset: nonNegativeOffset(raw.offset) };
}

export function normalizeBookmarks(raw = []) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const out = [];
  for (const item of raw) {
    const bookmark = normalizeBookmark(item);
    if (!bookmark) continue;
    const key = bookmarkKey(bookmark);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(bookmark);
  }
  return out;
}

export function bookmarkKey(bookmark) {
  const normalized = normalizeBookmark(bookmark);
  return normalized ? `${normalized.chapter}\u001f${normalized.offset}` : '';
}

export function hasBookmark(bookmarks, point) {
  const key = bookmarkKey(point);
  return !!key && normalizeBookmarks(bookmarks).some((bookmark) => bookmarkKey(bookmark) === key);
}

export function toggleBookmark(bookmarks, point) {
  const normalized = normalizeBookmarks(bookmarks);
  const next = normalizeBookmark(point);
  if (!next) return { bookmarks: normalized, added: false, changed: false };
  const key = bookmarkKey(next);
  const index = normalized.findIndex((bookmark) => bookmarkKey(bookmark) === key);
  if (index >= 0) {
    normalized.splice(index, 1);
    return { bookmarks: normalized, added: false, changed: true };
  }
  normalized.push(next);
  return { bookmarks: normalized, added: true, changed: true };
}

export function sortBookmarks(bookmarks = [], chapterOrder = []) {
  const order = new Map(chapterOrder.map((chapter, index) => [String(chapter), index]));
  return normalizeBookmarks(bookmarks).sort((a, b) => {
    const ai = order.has(a.chapter) ? order.get(a.chapter) : Number.MAX_SAFE_INTEGER;
    const bi = order.has(b.chapter) ? order.get(b.chapter) : Number.MAX_SAFE_INTEGER;
    return ai - bi || a.chapter.localeCompare(b.chapter) || a.offset - b.offset;
  });
}

function stripMarkdown(value) {
  return String(value || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function bookmarkExcerpt(markdown, offset, { radius = 150, maxLength = 220 } = {}) {
  const source = String(markdown || '');
  if (!source) return '';
  const center = Math.min(source.length, nonNegativeOffset(offset));
  let start = Math.max(0, center - Math.max(40, radius));
  let end = Math.min(source.length, center + Math.max(80, radius));
  const priorBreak = source.lastIndexOf('\n\n', center);
  const nextBreak = source.indexOf('\n\n', center);
  if (priorBreak >= 0 && center - priorBreak <= radius) start = priorBreak + 2;
  if (nextBreak >= 0 && nextBreak - center <= radius) end = nextBreak;
  let text = stripMarkdown(source.slice(start, end));
  if (!text) text = stripMarkdown(source.slice(Math.max(0, center - radius), end));
  if (text.length > maxLength) text = `${text.slice(0, Math.max(1, maxLength - 1)).trimEnd()}…`;
  const prefix = start > 0 ? '…' : '';
  const suffix = end < source.length && !text.endsWith('…') ? '…' : '';
  return `${prefix}${text}${suffix}`;
}

export function filterBookmarkEntries(entries = [], query = '') {
  const needle = cleanText(query, 300).toLocaleLowerCase();
  if (!needle) return entries.slice();
  return entries.filter((entry) => [entry.chapterTitle, entry.excerpt, entry.chapter]
    .some((value) => String(value || '').toLocaleLowerCase().includes(needle)));
}

export function adjacentBookmark(bookmarks = [], current, chapterOrder = [], direction = 1) {
  const sorted = sortBookmarks(bookmarks, chapterOrder);
  if (!sorted.length) return null;
  const currentKey = bookmarkKey(current);
  const exact = sorted.findIndex((bookmark) => bookmarkKey(bookmark) === currentKey);
  if (exact >= 0) {
    const step = direction < 0 ? -1 : 1;
    return sorted[(exact + step + sorted.length) % sorted.length];
  }

  const order = new Map(chapterOrder.map((chapter, index) => [String(chapter), index]));
  const currentChapter = String(current?.chapter || '');
  const currentIndex = order.has(currentChapter) ? order.get(currentChapter) : Number.MAX_SAFE_INTEGER;
  const currentOffset = nonNegativeOffset(current?.offset);
  const after = sorted.findIndex((bookmark) => {
    const chapterIndex = order.has(bookmark.chapter) ? order.get(bookmark.chapter) : Number.MAX_SAFE_INTEGER;
    return chapterIndex > currentIndex || (chapterIndex === currentIndex && bookmark.offset > currentOffset);
  });
  if (direction < 0) {
    const previousIndex = after < 0 ? sorted.length - 1 : after - 1;
    return sorted[(previousIndex + sorted.length) % sorted.length];
  }
  return sorted[after < 0 ? 0 : after];
}

export function bookmarkPositionLabel(index, total) {
  const count = Math.max(0, Math.round(Number(total) || 0));
  if (!count) return 'No bookmarks';
  const position = Math.min(count, Math.max(1, Math.round(Number(index) || 0) + 1));
  return `Bookmark ${position} of ${count}`;
}
