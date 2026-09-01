export const PREVIEW_SELECTION_MAX = 1200;

export function normalizePreviewBookmark(input = {}) {
  const chapter = String(input.chapter || '').trim();
  const offset = Math.max(0, Math.round(Number(input.offset) || 0));
  if (!chapter) return null;
  return { chapter, offset };
}

export function bookmarkMatches(bookmark, target) {
  const a = normalizePreviewBookmark(bookmark);
  const b = normalizePreviewBookmark(target);
  return !!a && !!b && a.chapter === b.chapter && a.offset === b.offset;
}

export function togglePreviewBookmark(bookmarks = [], target) {
  const normalized = normalizePreviewBookmark(target);
  const list = Array.isArray(bookmarks) ? bookmarks.slice() : [];
  if (!normalized) return { bookmarks: list, active: false, changed: false };
  const index = list.findIndex((bookmark) => bookmarkMatches(bookmark, normalized));
  if (index >= 0) {
    list.splice(index, 1);
    return { bookmarks: list, active: false, changed: true };
  }
  list.push(normalized);
  return { bookmarks: list, active: true, changed: true };
}

export function previewVisibleOffset(entries = [], focusY = 0, fallback = 0) {
  const valid = entries
    .map((entry) => ({
      start: Math.max(0, Math.round(Number(entry?.start) || 0)),
      top: Number(entry?.top),
      bottom: Number(entry?.bottom),
    }))
    .filter((entry) => Number.isFinite(entry.top) && Number.isFinite(entry.bottom));
  if (!valid.length) return Math.max(0, Math.round(Number(fallback) || 0));
  const containing = valid.find((entry) => entry.top <= focusY && entry.bottom >= focusY);
  if (containing) return containing.start;
  const visible = valid.filter((entry) => entry.bottom > 0);
  if (visible.length) {
    visible.sort((a, b) => Math.abs(a.top - focusY) - Math.abs(b.top - focusY));
    return visible[0].start;
  }
  return valid[0].start;
}

export function normalizePreviewSelection(text, anchor) {
  const quote = String(text || '').replace(/\s+/g, ' ').trim().slice(0, PREVIEW_SELECTION_MAX);
  const start = Math.max(0, Math.round(Number(anchor?.start) || 0));
  const end = Math.max(start, Math.round(Number(anchor?.end) || start));
  if (!quote || end <= start) return null;
  return { quote, anchor: { version: 1, start, end }, offset: start };
}

export function previewInteractionState({ stage, hasPreview, routeMatches, selection } = {}) {
  const active = !!hasPreview
    && routeMatches !== false
    && stage !== 'cover'
    && stage !== 'end';
  return {
    active,
    canBookmark: active,
    canAnnotate: active && !!selection,
  };
}
