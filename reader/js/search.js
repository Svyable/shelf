const SEARCH_LIMIT = 40;

function markHidden(hidden, start, end) {
  for (let i = Math.max(0, start); i < Math.min(hidden.length, end); i += 1) hidden[i] = true;
}

function keepOnly(hidden, start, end, keepStart, keepEnd) {
  markHidden(hidden, start, end);
  for (let i = Math.max(start, keepStart); i < Math.min(end, keepEnd); i += 1) hidden[i] = false;
}

function hidePairDelimiters(markdown, hidden, pattern, delimiterLength) {
  let match;
  while ((match = pattern.exec(markdown))) {
    const width = typeof delimiterLength === 'function' ? delimiterLength(match) : delimiterLength;
    markHidden(hidden, match.index, match.index + width);
    markHidden(hidden, match.index + match[0].length - width, match.index + match[0].length);
  }
}

function hideMarkdownSyntax(markdown, hidden) {
  const inlineLink = /(!?)\[([^\]\n]+)\]\(([^)\n]+)\)/g;
  let match;
  while ((match = inlineLink.exec(markdown))) {
    const labelStart = match.index + match[1].length + 1;
    const labelEnd = labelStart + match[2].length;
    keepOnly(hidden, match.index, match.index + match[0].length, labelStart, labelEnd);
  }

  const wikiLink = /\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g;
  while ((match = wikiLink.exec(markdown))) {
    const visible = match[2] || match[1];
    const relative = match[2]
      ? match[0].lastIndexOf(match[2])
      : match[0].indexOf(match[1]);
    const labelStart = match.index + relative;
    keepOnly(hidden, match.index, match.index + match[0].length, labelStart, labelStart + visible.length);
  }

  const citation = /\[@[^|\]\n]+(?:\|([^\]\n]+))?\]/g;
  while ((match = citation.exec(markdown))) {
    if (!match[1]) continue;
    const relative = match[0].lastIndexOf(match[1]);
    const labelStart = match.index + relative;
    keepOnly(hidden, match.index, match.index + match[0].length, labelStart, labelStart + match[1].length);
  }

  hidePairDelimiters(markdown, hidden, /\*\*([^*\n]+)\*\*/g, 2);
  hidePairDelimiters(markdown, hidden, /__([^_\n]+)__/g, 2);
  hidePairDelimiters(markdown, hidden, /~~([^~\n]+)~~/g, 2);
  hidePairDelimiters(markdown, hidden, /\*([^*\n]+)\*/g, 1);
  hidePairDelimiters(markdown, hidden, /_([^_\n]+)_/g, 1);
  hidePairDelimiters(markdown, hidden, /(`+)([^`\n]+)\1/g, (m) => m[1].length);
}

function lineSyntax(markdown, index) {
  const lineStart = markdown.lastIndexOf('\n', index - 1) + 1;
  const prefix = markdown.slice(lineStart, index);
  return /^\s*$/.test(prefix);
}

export function searchableMarkdown(markdown) {
  const source = String(markdown || '');
  const hidden = new Array(source.length).fill(false);
  hideMarkdownSyntax(source, hidden);

  let text = '';
  const sourceMap = [];
  let pendingSpace = false;
  let pendingSpaceOffset = 0;

  function appendSpace(offset) {
    if (!text || text.endsWith(' ')) return;
    text += ' ';
    sourceMap.push(offset);
  }

  for (let i = 0; i < source.length; i += 1) {
    if (hidden[i]) continue;

    const ch = source[i];
    if (/\s/.test(ch)) {
      if (text && !text.endsWith(' ')) {
        pendingSpace = true;
        pendingSpaceOffset = i;
      }
      continue;
    }

    const structuralPunctuation = (ch === '#' || ch === '>' || ch === '-' || ch === '+') && lineSyntax(source, i);
    if (structuralPunctuation || ch === '\\') continue;

    if (pendingSpace) appendSpace(pendingSpaceOffset);
    pendingSpace = false;
    text += ch;
    sourceMap.push(i);
  }

  return { text: text.trim(), sourceMap: sourceMap.slice(0, text.trimEnd().length) };
}

function foldCharacter(ch) {
  const punctuation = {
    '’': "'",
    '‘': "'",
    '“': '"',
    '”': '"',
    '‐': '-',
    '‑': '-',
    '–': '-',
    '—': '-',
  };
  return (punctuation[ch] || ch)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

export function foldSearchText(text, sourceMap = null) {
  const value = String(text || '');
  let folded = '';
  const foldedSourceMap = [];
  const foldedTextMap = [];
  let sourceIndex = 0;

  for (const ch of value) {
    const part = foldCharacter(ch);
    const mappedSource = sourceMap ? sourceMap[sourceIndex] : sourceIndex;
    for (let j = 0; j < part.length; j += 1) {
      folded += part[j];
      foldedSourceMap.push(mappedSource);
      foldedTextMap.push(sourceIndex);
    }
    sourceIndex += ch.length;
  }

  return { folded, sourceMap: foldedSourceMap, textMap: foldedTextMap };
}

function normalizedQuery(query) {
  return foldSearchText(String(query || '').trim().replace(/\s+/g, ' ')).folded;
}

function snippetAround(text, start, length) {
  const radius = 54;
  const from = Math.max(0, start - radius);
  const to = Math.min(text.length, start + Math.max(1, length) + radius);
  let snippet = text.slice(from, to).trim();
  if (from > 0) snippet = `…${snippet}`;
  if (to < text.length) snippet = `${snippet}…`;
  return snippet;
}

export function searchLibrary(books, query) {
  const q = String(query || '').trim();
  const needle = normalizedQuery(q);
  if (needle.length < 2) return [];
  const hits = [];
  for (const book of books) {
    const hay = [book.title, book.authors, book.publisher, book.series, (book.tags || []).join(' ')]
      .filter(Boolean)
      .join(' ');
    if (foldSearchText(hay).folded.includes(needle)) {
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
      if (hits.length >= SEARCH_LIMIT) return hits;
    }
  }
  return hits;
}

export function searchBook(book, query) {
  const q = String(query || '').trim();
  const needle = normalizedQuery(q);
  if (needle.length < 2) return [];
  const hits = [];
  for (const ch of book.chapters || []) {
    const md = ch.markdown || '';
    const projected = searchableMarkdown(md);
    const folded = foldSearchText(projected.text, projected.sourceMap);
    let from = 0;
    while (hits.length < SEARCH_LIMIT) {
      const i = folded.folded.indexOf(needle, from);
      if (i < 0) break;
      const textStart = folded.textMap[i] ?? 0;
      const textEnd = folded.textMap[Math.min(i + needle.length - 1, folded.textMap.length - 1)] ?? textStart;
      hits.push({
        chapter: ch.id,
        title: ch.title,
        offset: folded.sourceMap[i] ?? 0,
        end: (folded.sourceMap[Math.min(i + needle.length - 1, folded.sourceMap.length - 1)] ?? folded.sourceMap[i] ?? 0) + 1,
        snippet: snippetAround(projected.text, textStart, Math.max(1, textEnd - textStart + 1)),
      });
      from = i + Math.max(needle.length, 1);
    }
    if (hits.length >= SEARCH_LIMIT) break;
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
