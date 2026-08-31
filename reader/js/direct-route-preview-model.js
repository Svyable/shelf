export const PREVIEW_MAX_PARAGRAPHS = 7;
export const PREVIEW_MAX_CHARS = 2200;

export function normalizeReadRoute(route) {
  if (!route || route.view !== 'read' || !route.slug) return null;
  return Object.freeze({
    slug: String(route.slug),
    chapter: route.chapter ? String(route.chapter) : '',
    offset: Math.max(0, Number(route.offset) || 0),
  });
}

export function selectPreviewChapter(contents, requestedId) {
  const chapters = Array.isArray(contents) ? contents.filter((item) => item?.id && item?.file) : [];
  if (!chapters.length) return null;
  return chapters.find((item) => item.id === requestedId) || chapters[0];
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

export function shouldShowPreview({ route, canonicalReady = false, stage = 'library' } = {}) {
  return !!normalizeReadRoute(route) && !canonicalReady && stage !== 'cover' && stage !== 'end';
}

export function previewCompletionState({ stage, hasPagedContent, hasContinuousContent } = {}) {
  if (stage === 'library' || stage === 'cover' || stage === 'end') return 'dismiss';
  if (stage === 'read' && (hasPagedContent || hasContinuousContent)) return 'dismiss';
  return 'keep';
}
