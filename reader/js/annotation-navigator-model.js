export function noteTarget(note = {}) {
  const chapter = String(note.chapter || '').trim();
  const anchored = Number(note.anchor?.start);
  const fallback = Number(note.offset);
  const offset = Number.isFinite(anchored)
    ? Math.max(0, Math.round(anchored))
    : (Number.isFinite(fallback) ? Math.max(0, Math.round(fallback)) : 0);
  if (!chapter) return null;
  return { chapter, offset };
}

export function orderNotes(notes = [], chapterOrder = []) {
  const positions = new Map(chapterOrder.map((chapter, index) => [String(chapter), index]));
  return [...notes].sort((a, b) => {
    const aChapter = positions.has(String(a.chapter)) ? positions.get(String(a.chapter)) : Number.MAX_SAFE_INTEGER;
    const bChapter = positions.has(String(b.chapter)) ? positions.get(String(b.chapter)) : Number.MAX_SAFE_INTEGER;
    if (aChapter !== bChapter) return aChapter - bChapter;
    const aOffset = noteTarget(a)?.offset ?? 0;
    const bOffset = noteTarget(b)?.offset ?? 0;
    if (aOffset !== bOffset) return aOffset - bOffset;
    return Number(a.createdAt || 0) - Number(b.createdAt || 0);
  });
}

export function filterNotes(notes = [], query = '', chapterTitles = {}) {
  const needle = String(query || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
  if (!needle) return [...notes];
  return notes.filter((note) => {
    const title = chapterTitles[note.chapter] || note.chapter || '';
    const haystack = [title, note.quote, note.body]
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .toLocaleLowerCase();
    return haystack.includes(needle);
  });
}

export function neighboringNoteIndex(index, total, delta) {
  const count = Math.max(0, Number(total) || 0);
  if (!count) return -1;
  const current = Math.max(0, Math.min(count - 1, Number(index) || 0));
  const step = Number(delta) < 0 ? -1 : 1;
  return (current + step + count) % count;
}

export function noteStatus(index, total) {
  const count = Math.max(0, Number(total) || 0);
  if (!count) return 'No notes';
  const current = Math.max(0, Math.min(count - 1, Number(index) || 0));
  return `Note ${current + 1} of ${count}`;
}
