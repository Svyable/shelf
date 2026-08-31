const SEARCH_LIMIT = 40;
const SNIPPET_RADIUS = 54;
const TOKEN_GAP_BONUS = 120;

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
    const relative = match[2] ? match[0].lastIndexOf(match[2]) : match[0].indexOf(match[1]);
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
  const punctuation = { '’': "'", '‘': "'", '“': '"', '”': '"', '‐': '-', '‑': '-', '–': '-', '—': '-' };
  return (punctuation[ch] || ch).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
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

export function searchTerms(query) {
  const normalized = normalizedQuery(query);
  if (normalized.length < 2) return [];
  return [...new Set(normalized.split(' ').filter((term) => term.length >= 2))];
}

function snippetAround(text, start, length) {
  const from = Math.max(0, start - SNIPPET_RADIUS);
  const to = Math.min(text.length, start + Math.max(1, length) + SNIPPET_RADIUS);
  let snippet = text.slice(from, to).trim();
  if (from > 0) snippet = `…${snippet}`;
  if (to < text.length) snippet = `${snippet}…`;
  return snippet;
}

function foldedRange(folded, start, length) {
  const safeStart = Math.max(0, Math.min(start, folded.folded.length - 1));
  const safeEnd = Math.max(safeStart, Math.min(start + Math.max(1, length) - 1, folded.folded.length - 1));
  return {
    textStart: folded.textMap[safeStart] ?? 0,
    textEnd: folded.textMap[safeEnd] ?? (folded.textMap[safeStart] ?? 0),
    sourceStart: folded.sourceMap[safeStart] ?? 0,
    sourceEnd: (folded.sourceMap[safeEnd] ?? folded.sourceMap[safeStart] ?? 0) + 1,
  };
}

function exactMatches(folded, needle) {
  const matches = [];
  let from = 0;
  while (matches.length < SEARCH_LIMIT) {
    const index = folded.folded.indexOf(needle, from);
    if (index < 0) break;
    matches.push({ index, length: needle.length, exact: true, score: 10000 - index });
    from = index + Math.max(needle.length, 1);
  }
  return matches;
}

function positionsForTerm(haystack, term) {
  const positions = [];
  let from = 0;
  while (positions.length < SEARCH_LIMIT * 4) {
    const index = haystack.indexOf(term, from);
    if (index < 0) break;
    positions.push(index);
    from = index + Math.max(term.length, 1);
  }
  return positions;
}

export function bestTermWindow(haystack, terms) {
  if (!terms.length) return null;
  const occurrences = terms.map((term) => positionsForTerm(haystack, term));
  if (occurrences.some((rows) => rows.length === 0)) return null;
  const events = [];
  occurrences.forEach((rows, termIndex) => rows.forEach((index) => events.push({ index, termIndex, length: terms[termIndex].length })));
  events.sort((a, b) => a.index - b.index || a.termIndex - b.termIndex);
  const counts = new Array(terms.length).fill(0);
  let covered = 0;
  let left = 0;
  let best = null;
  for (let right = 0; right < events.length; right += 1) {
    const event = events[right];
    if (counts[event.termIndex] === 0) covered += 1;
    counts[event.termIndex] += 1;
    while (covered === terms.length && left <= right) {
      const first = events[left];
      const last = events[right];
      const end = last.index + last.length;
      const span = end - first.index;
      if (!best || span < best.length || (span === best.length && first.index < best.index)) best = { index: first.index, length: span, exact: false };
      counts[first.termIndex] -= 1;
      if (counts[first.termIndex] === 0) covered -= 1;
      left += 1;
    }
  }
  if (!best) return null;
  const queryWidth = terms.reduce((sum, term) => sum + term.length, 0);
  const gap = Math.max(0, best.length - queryWidth);
  return { ...best, score: 5000 + Math.max(0, TOKEN_GAP_BONUS - gap) - best.index / 1000 };
}

function chapterMatches(ch, query) {
  const needle = normalizedQuery(query);
  const terms = searchTerms(query);
  if (needle.length < 2) return [];
  const projected = searchableMarkdown(ch.markdown || '');
  const folded = foldSearchText(projected.text, projected.sourceMap);
  const exact = exactMatches(folded, needle);
  const matches = exact.length ? exact : [bestTermWindow(folded.folded, terms)].filter(Boolean);
  return matches.map((match) => {
    const range = foldedRange(folded, match.index, match.length);
    const headingBoost = range.textStart < Math.max(120, (ch.title || '').length + 8) ? 180 : 0;
    return {
      chapter: ch.id,
      title: ch.title,
      offset: range.sourceStart,
      end: range.sourceEnd,
      snippet: snippetAround(projected.text, range.textStart, Math.max(1, range.textEnd - range.textStart + 1)),
      score: match.score + headingBoost,
      exact: match.exact,
    };
  });
}

function metadataScore(book, query) {
  const needle = normalizedQuery(query);
  const terms = searchTerms(query);
  const title = foldSearchText(book.title || '').folded;
  const authors = foldSearchText(book.authors || '').folded;
  const secondary = foldSearchText([book.publisher, book.series, (book.tags || []).join(' ')].filter(Boolean).join(' ')).folded;
  if (title.includes(needle)) return 20000 - title.indexOf(needle);
  if (authors.includes(needle)) return 18000 - authors.indexOf(needle);
  if (secondary.includes(needle)) return 16000 - secondary.indexOf(needle);
  const all = [title, authors, secondary].join(' ');
  const window = bestTermWindow(all, terms);
  return window ? 14000 + window.score : 0;
}

export function searchLibrary(books, query) {
  if (normalizedQuery(query).length < 2) return [];
  const hits = [];
  for (const book of books) {
    const score = metadataScore(book, query);
    if (score) hits.push({ type: 'book', book, chapter: null, offset: 0, title: book.title, snippet: [book.authors, book.publisher, book.series].filter(Boolean).join(' · '), score });
    for (const pass of searchBook(book, query)) hits.push({ type: 'passage', book, ...pass });
  }
  hits.sort((a, b) => b.score - a.score || a.book.title.localeCompare(b.book.title) || (a.offset || 0) - (b.offset || 0));
  return hits.slice(0, SEARCH_LIMIT);
}

export function searchBook(book, query) {
  if (normalizedQuery(query).length < 2) return [];
  const hits = [];
  for (const ch of book.chapters || []) hits.push(...chapterMatches(ch, query));
  hits.sort((a, b) => b.score - a.score || a.offset - b.offset);
  return hits.slice(0, SEARCH_LIMIT);
}

export function wordCount(book) {
  let n = 0;
  for (const ch of book.chapters || []) n += (ch.markdown || '').trim().split(/\s+/).filter(Boolean).length;
  return n;
}

export function readingMinutes(words) {
  return Math.max(1, Math.round(words / 230));
}
