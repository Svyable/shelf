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
  if (!chapters.length) {
    return Object.freeze({ count: 0, index: -1, current: null, previous: null, next: null, label: 'No chapters' });
  }
  let index = chapters.findIndex((chapter) => chapter.id === chapterId);
  if (index < 0) index = 0;
  return Object.freeze({
    count: chapters.length,
    index,
    current: chapters[index],
    previous: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
    label: `Chapter ${index + 1} of ${chapters.length}`,
  });
}

export function chapterNavigatorVisible({ stage = '', mode = '', chromeHidden = false, overlayOpen = false } = {}) {
  return stage === 'read' && mode === 'scroll' && !chromeHidden && !overlayOpen;
}

export function chapterShortcutAction({ key = '', altKey = false, ctrlKey = false, metaKey = false, shiftKey = false } = {}) {
  if (!altKey || ctrlKey || metaKey || shiftKey) return null;
  if (key === 'ArrowUp') return 'previous';
  if (key === 'ArrowDown') return 'next';
  return null;
}
