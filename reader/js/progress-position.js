function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function buildProgressMap(chapters = []) {
  let total = 0;
  const entries = chapters.map((chapter, index) => {
    const length = Math.max(0, String(chapter?.markdown || '').length);
    const entry = {
      id: chapter?.id || String(index),
      title: chapter?.title || '',
      start: total,
      length,
    };
    total += length;
    return entry;
  });
  return { entries, total };
}

export function progressAt(map, chapterId, offset = 0) {
  const entries = map?.entries || [];
  const total = Math.max(0, Number(map?.total) || 0);
  if (!entries.length || total <= 0) {
    return { book: 0, chapter: 0, percent: 0, chapterPercent: 0 };
  }

  const entry = entries.find((candidate) => candidate.id === chapterId) || entries[0];
  const local = clamp(Number(offset) || 0, 0, entry.length);
  const absolute = clamp(entry.start + local, 0, total);
  const book = absolute / total;
  const chapter = entry.length ? local / entry.length : 0;

  return {
    book,
    chapter,
    percent: Math.round(book * 100),
    chapterPercent: Math.round(chapter * 100),
  };
}
