export function normalizeChapterList(contents = []) {
  const seen = new Set();
  const chapters = [];
  for (const item of Array.isArray(contents) ? contents : []) {
    const id = String(item?.id || '').trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    chapters.push(Object.freeze({ id, title: String(item?.title || id).trim() || id }));
  }
  return Object.freeze(chapters);
}

export function chapterNavigationState(contents = [], chapterId = '') {
  const chapters = normalizeChapterList(contents);
  if (!chapters.length) return Object.freeze({ count: 0, index: -1, current: null, previous: null, next: null, label: 'No chapters' });
  let index = chapters.findIndex((chapter) => chapter.id === chapterId);
  if (index < 0) index = 0;
  return Object.freeze({ count: chapters.length, index, current: chapters[index], previous: index > 0 ? chapters[index - 1] : null, next: index < chapters.length - 1 ? chapters[index + 1] : null, label: `Chapter ${index + 1} of ${chapters.length}` });
}

export function normalizeSectionList(headings = []) {
  const seen = new Set();
  const sections = [];
  for (const heading of Array.isArray(headings) ? headings : []) {
    const offset = Math.max(0, Number.parseInt(heading?.offset, 10) || 0);
    const title = String(heading?.title || '').trim();
    if (!title || seen.has(offset)) continue;
    seen.add(offset);
    sections.push(Object.freeze({ offset, title }));
  }
  sections.sort((a, b) => a.offset - b.offset);
  return Object.freeze(sections);
}

export function sectionNavigationState(headings = [], sourceOffset = 0) {
  const sections = normalizeSectionList(headings);
  const offset = Math.max(0, Number.parseInt(sourceOffset, 10) || 0);
  if (!sections.length) return Object.freeze({ count: 0, index: -1, current: null, previous: null, next: null, label: 'No sections' });
  let index = -1;
  for (let i = 0; i < sections.length; i += 1) {
    if (sections[i].offset <= offset) index = i;
    else break;
  }
  const current = index >= 0 ? sections[index] : null;
  return Object.freeze({
    count: sections.length,
    index,
    current,
    previous: index > 0 ? sections[index - 1] : null,
    next: index + 1 < sections.length ? sections[index + 1] : null,
    label: current ? `Section ${index + 1} of ${sections.length}` : `${sections.length} sections`,
  });
}

export function readingNavigatorVisible({ stage = '', chromeHidden = false, overlayOpen = false } = {}) {
  return stage === 'read' && !chromeHidden && !overlayOpen;
}

export function chapterNavigatorVisible({ stage = '', mode = '', chromeHidden = false, overlayOpen = false } = {}) {
  return readingNavigatorVisible({ stage, chromeHidden, overlayOpen }) && mode === 'scroll';
}

export function chapterShortcutAction({ key = '', altKey = false, ctrlKey = false, metaKey = false, shiftKey = false } = {}) {
  if (!altKey || ctrlKey || metaKey || shiftKey) return null;
  if (key === 'ArrowUp') return 'previous';
  if (key === 'ArrowDown') return 'next';
  return null;
}

export function sectionShortcutAction({ key = '', altKey = false, ctrlKey = false, metaKey = false, shiftKey = false } = {}) {
  if (!altKey || ctrlKey || metaKey || shiftKey) return null;
  if (key === '[') return 'previous';
  if (key === ']') return 'next';
  return null;
}
