export const PREVIEW_MAX_PARAGRAPHS = 7;
export const PREVIEW_MAX_CHARS = 2200;
export const PREVIEW_INITIAL_BLOCKS = 24;
export const PREVIEW_APPEND_BLOCKS = 20;

export function normalizeReadRoute(route) {
  if (!route || route.view !== 'read' || !route.slug) return null;
  return Object.freeze({
    slug: String(route.slug),
    chapter: route.chapter ? String(route.chapter) : '',
    offset: Math.max(0, Number(route.offset) || 0),
  });
}

export function samePreviewRoute(a, b) {
  return !!a && !!b
    && a.slug === b.slug
    && a.chapter === b.chapter
    && a.offset === b.offset;
}

export function shouldBridgeRouteTransition({ previous, next, stage = 'library' } = {}) {
  return stage !== 'read' && !!next && !samePreviewRoute(previous, next);
}

export function selectPreviewChapter(contents, requestedId) {
  const chapters = Array.isArray(contents) ? contents.filter((item) => item?.id && item?.file) : [];
  if (!chapters.length) return null;
  return chapters.find((item) => item.id === requestedId) || chapters[0];
}

export function previewBlockIndex(blocks, offset = 0) {
  const rows = Array.isArray(blocks) ? blocks : [];
  if (!rows.length) return -1;
  const target = Math.max(0, Number(offset) || 0);
  const containing = rows.findIndex((block) => {
    const start = Number(block?.start);
    const end = Number(block?.end);
    return Number.isFinite(start) && Number.isFinite(end) && start <= target && target < end;
  });
  if (containing >= 0) return containing;
  const following = rows.findIndex((block) => Number(block?.start) >= target);
  return following >= 0 ? following : rows.length - 1;
}

export function previewBlockWindow(blocks, offset = 0, { limit = PREVIEW_INITIAL_BLOCKS } = {}) {
  const rows = Array.isArray(blocks) ? blocks : [];
  const startIndex = previewBlockIndex(rows, offset);
  if (startIndex < 0) {
    return Object.freeze({ blocks: Object.freeze([]), startIndex: -1, nextIndex: 0, complete: true });
  }
  const size = Math.max(1, Math.floor(Number(limit) || PREVIEW_INITIAL_BLOCKS));
  const nextIndex = Math.min(rows.length, startIndex + size);
  return Object.freeze({
    blocks: Object.freeze(rows.slice(startIndex, nextIndex)),
    startIndex,
    nextIndex,
    complete: nextIndex >= rows.length,
  });
}

export function appendPreviewBlockWindow(blocks, nextIndex = 0, { limit = PREVIEW_APPEND_BLOCKS } = {}) {
  const rows = Array.isArray(blocks) ? blocks : [];
  const startIndex = Math.min(rows.length, Math.max(0, Math.floor(Number(nextIndex) || 0)));
  const size = Math.max(1, Math.floor(Number(limit) || PREVIEW_APPEND_BLOCKS));
  const endIndex = Math.min(rows.length, startIndex + size);
  return Object.freeze({
    blocks: Object.freeze(rows.slice(startIndex, endIndex)),
    startIndex,
    nextIndex: endIndex,
    complete: endIndex >= rows.length,
  });
}

export function previewAnchorOffset(entries, focusY = 0, fallback = 0) {
  const rows = (Array.isArray(entries) ? entries : [])
    .map((entry) => ({
      start: Number(entry?.start),
      top: Number(entry?.top),
      bottom: Number(entry?.bottom),
    }))
    .filter((entry) => Number.isFinite(entry.start) && Number.isFinite(entry.top) && Number.isFinite(entry.bottom));
  if (!rows.length) return Math.max(0, Number(fallback) || 0);
  const focus = Number.isFinite(Number(focusY)) ? Number(focusY) : 0;
  const crossing = rows.find((entry) => entry.top <= focus && entry.bottom > focus);
  if (crossing) return Math.max(0, crossing.start);
  const next = rows.find((entry) => entry.bottom > focus);
  if (next) return Math.max(0, next.start);
  return Math.max(0, rows[rows.length - 1].start);
}

export function handoffPreviewOffset({ initialOffset = 0, visibleOffset, routeMatches = true } = {}) {
  const initial = Math.max(0, Number(initialOffset) || 0);
  if (!routeMatches) return initial;
  const visible = Number(visibleOffset);
  return Number.isFinite(visible) && visible >= 0 ? Math.floor(visible) : initial;
}

export function projectPreviewParagraphs(markdown, offset = 0, {
  maxParagraphs = PREVIEW_MAX_PARAGRAPHS,
  maxChars = PREVIEW_MAX_CHARS,
} = {}) {
  const source = String(markdown || '');
  const start = Math.min(Math.max(0, Number(offset) || 0), source.length);
  const tail = source.slice(start);
  const cleaned = tail
    .replace(/^```[\s\S]*?^```\s*$/gm, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^[ \t]*>[ \t]?/gm, '')
    .replace(/^[ \t]*(?:[-*+] |\d+[.)] )/gm, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => label || target)
    .replace(/\[\^([^\]]+)\]/g, '')
    .replace(/\[@[^\]|]+\|([^\]]+)\]/g, '$1')
    .replace(/[*_~`]+/g, '')
    .replace(/<[^>]+>/g, '');

  const paragraphs = cleaned
    .split(/\n\s*\n+/)
    .map((part) => part.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const result = [];
  let used = 0;
  for (const paragraph of paragraphs) {
    if (result.length >= Math.max(1, maxParagraphs)) break;
    const remaining = Math.max(0, maxChars - used);
    if (!remaining) break;
    const text = paragraph.length > remaining ? `${paragraph.slice(0, Math.max(0, remaining - 1)).trimEnd()}…` : paragraph;
    if (text) result.push(text);
    used += text.length;
    if (used >= maxChars) break;
  }
  return Object.freeze(result);
}

export function shouldShowPreview({
  route,
  canonicalReady = false,
  stage = 'library',
  allowCoverStage = false,
} = {}) {
  const coverAllowed = stage !== 'cover' || allowCoverStage;
  return !!normalizeReadRoute(route) && !canonicalReady && coverAllowed && stage !== 'end';
}

export function previewCompletionState({
  stage,
  hasPagedContent,
  hasContinuousContent,
  keepCoverStage = false,
} = {}) {
  if (stage === 'cover') return keepCoverStage ? 'keep' : 'dismiss';
  if (stage === 'end') return 'dismiss';
  if (stage === 'read' && (hasPagedContent || hasContinuousContent)) return 'dismiss';
  return 'keep';
}
