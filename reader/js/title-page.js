function plainInline(value) {
  return String(value || '')
    .replace(/^\*\*(.+)\*\*$/, '$1')
    .replace(/^__(.+)__$/, '$1')
    .replace(/^\*(.+)\*$/, '$1')
    .replace(/^_(.+)_$/, '$1')
    .replace(/^by\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstHeading(markdown) {
  return String(markdown || '').match(/^#\s+(.+)$/m)?.[1]?.trim() || '';
}

export function isTitlePageChapter(chapter, book) {
  if (!chapter) return false;
  const id = String(chapter.id || '').trim();
  const label = String(chapter.title || '').trim();
  if (/(?:^|-)front-matter$/i.test(id) || /^front matter\b/i.test(label)) return true;

  const chapters = Array.isArray(book?.chapters) ? book.chapters : [];
  const index = chapters.findIndex((candidate) => candidate === chapter || candidate?.id === chapter.id);
  if (index !== 0) return false;

  const markdown = String(chapter.markdown || '');
  const bookTitle = String(book?.title || '').trim();
  if (!bookTitle || firstHeading(markdown) !== bookTitle) return false;

  const opening = markdown.split(/^\s*---\s*$/m, 1)[0];
  const author = plainInline(book?.authors || '');
  const lines = opening.split(/\n/).map((line) => line.trim()).filter(Boolean).slice(1);
  return lines.some((line) => {
    const bold = line.match(/^(?:\*\*|__)(.+?)(?:\*\*|__)$/);
    if (!bold) return false;
    const value = plainInline(bold[1]);
    return author ? value.toLowerCase() === author.toLowerCase() : value.length > 1;
  });
}
