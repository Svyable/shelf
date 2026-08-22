export function searchLibrary(books, query) {
  const q = query.trim();
  if (q.length < 2) return [];
  const needle = q.toLowerCase();
  const hits = [];
  for (const book of books) {
    const hay = [book.title, book.authors, book.publisher, book.series, (book.tags || []).join(' ')]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    if (hay.includes(needle)) {
      hits.push({
        type: 'book',
        book,
        chapter: null,
        offset: 0,
        title: book.title,
        snippet: [book.authors, book.publisher, book.series].filter(Boolean).join(' · '),
      });
    }
    for (const pass of searchBook(book, q)) {
      hits.push({
        type: 'passage',
        book,
        ...pass,
      });
      if (hits.length >= 40) return hits;
    }
  }
  return hits;
}

export function searchBook(book, query) {
  const q = query.trim();
  if (q.length < 2) return [];
  const needle = q.toLowerCase();
  const hits = [];
  for (const ch of book.chapters || []) {
    const md = ch.markdown || '';
    const lower = md.toLowerCase();
    let from = 0;
    while (hits.length < 40) {
      const i = lower.indexOf(needle, from);
      if (i < 0) break;
      const start = Math.max(0, i - 42);
      const end = Math.min(md.length, i + q.length + 42);
      let snippet = md.slice(start, end).replace(/\s+/g, ' ').trim();
      if (start > 0) snippet = `…${snippet}`;
      if (end < md.length) snippet = `${snippet}…`;
      hits.push({
        chapter: ch.id,
        title: ch.title,
        offset: i,
        snippet,
      });
      from = i + needle.length;
    }
  }
  return hits;
}

export function wordCount(book) {
  let n = 0;
  for (const ch of book.chapters || []) {
    const parts = (ch.markdown || '').trim().split(/\s+/).filter(Boolean);
    n += parts.length;
  }
  return n;
}

export function readingMinutes(words) {
  return Math.max(1, Math.round(words / 230));
}
