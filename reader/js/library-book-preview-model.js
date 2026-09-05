function text(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function publicationLabel(meta = {}) {
  return text(meta.formatLabel) || 'Book';
}

function contentCountLabel(meta = {}) {
  const count = Array.isArray(meta.contents) ? meta.contents.length : 0;
  if (!count) return '';
  const format = text(meta.format).toLowerCase();
  let singular = 'chapter';
  if (format === 'paper' || format === 'report') singular = 'section';
  else if (['magazine', 'newspaper', 'journal', 'newsletter'].includes(format)) singular = 'item';
  else if (format === 'comic') singular = 'part';
  const plural = count === 1 ? singular : `${singular}s`;
  return `${count} ${plural}`;
}

export function shouldShowLibraryQuickLook(meta = {}) {
  const format = text(meta.format).toLowerCase();
  return Boolean(format && format !== 'book');
}

export function progressChapter(meta = {}, progress = null) {
  if (!progress?.chapter || !Array.isArray(meta.contents)) return null;
  return meta.contents.find((chapter) => chapter?.id === progress.chapter) || null;
}

export function publicationAction(meta = {}, progress = null) {
  if (progressChapter(meta, progress)) return 'Continue';
  switch (text(meta.format).toLowerCase()) {
    case 'paper': return 'Read paper';
    case 'magazine':
    case 'journal':
    case 'newsletter': return 'Read issue';
    case 'newspaper': return 'Read edition';
    case 'report': return 'Read report';
    case 'comic': return 'Read comic';
    case 'anthology': return 'Open collection';
    default: return 'Open';
  }
}

export function buildLibraryBookPreview(meta = {}, progress = null, { maxTags = 2 } = {}) {
  const label = publicationLabel(meta);
  const series = text(meta.series);
  const count = contentCountLabel(meta);
  const date = text(meta.publicationDate);
  const chapter = progressChapter(meta, progress);
  const tags = Array.isArray(meta.tags)
    ? meta.tags.map(text).filter(Boolean).slice(0, Math.max(0, maxTags))
    : [];
  const action = publicationAction(meta, progress);
  const kicker = [series, label].filter(Boolean).join(' · ');
  const facts = [count, date].filter(Boolean).join(' · ');
  const progressText = chapter ? `Continue at ${text(chapter.title) || 'saved place'}` : '';
  const ariaLabel = [
    text(meta.title),
    text(meta.authors) ? `by ${text(meta.authors)}` : '',
    kicker,
    facts,
    progressText || action,
  ].filter(Boolean).join('. ');

  return Object.freeze({
    action,
    kicker,
    facts,
    tags: Object.freeze(tags),
    progressText,
    ariaLabel,
  });
}
