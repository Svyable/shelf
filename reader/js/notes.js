const key = (slug) => {
  const prefix = (typeof window !== 'undefined' && window.__IMPRINT?.storagePrefix) || 'obb';
  return `${prefix}:${slug}:notes`;
};

export function loadNotes(slug) {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) || '[]');
  } catch {
    return [];
  }
}

export function saveNotes(slug, notes) {
  localStorage.setItem(key(slug), JSON.stringify(notes));
}

export function addNote(slug, note) {
  const notes = loadNotes(slug);
  notes.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
    ...note,
  });
  saveNotes(slug, notes);
  return notes;
}

export function removeNote(slug, id) {
  const notes = loadNotes(slug).filter((n) => n.id !== id);
  saveNotes(slug, notes);
  return notes;
}

export function notesMarkdown(book, notes) {
  const lines = [`# Notes — ${book.title}`, ''];
  for (const n of notes) {
    const ch = book.contents.find((c) => c.id === n.chapter);
    lines.push(`## ${ch ? ch.title : n.chapter}`);
    if (n.quote) lines.push(`> ${n.quote}`, '');
    if (n.body) lines.push(n.body, '');
  }
  return lines.join('\n');
}

export function applyNotes(container, notes, chapter) {
  if (!container || !notes?.length) return;
  const relevant = notes.filter((n) => n.chapter === chapter && n.quote);
  for (const note of relevant) wrapQuote(container, note);
}

function wrapQuote(root, note) {
  const needles = [note.quote];
  if (note.quote.length > 48) needles.push(note.quote.slice(0, 48));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const needle of needles) {
    for (const node of nodes) {
      if (!node.parentNode || node.parentNode.closest('mark')) continue;
      const i = node.textContent.indexOf(needle);
      if (i < 0) continue;
      try {
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + needle.length);
        const mark = document.createElement('mark');
        mark.className = 'note-mark';
        mark.dataset.noteId = note.id;
        mark.title = note.body || 'Highlight';
        range.surroundContents(mark);
        return;
      } catch {
        return;
      }
    }
  }
}
