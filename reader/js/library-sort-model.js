const LIBRARY_SORTS = new Set(['title', 'updated', 'last-read']);

export function normalizeLibrarySort(value) {
  return LIBRARY_SORTS.has(value) ? value : 'title';
}

export function shelfLetter(title = '') {
  const value = String(title || '').trim().normalize('NFKD');
  for (const char of value) {
    const upper = char.toUpperCase();
    if (/^[A-Z]$/.test(upper)) return upper;
    if (/^[0-9]$/.test(char)) return '#';
  }
  return '#';
}

export function shelfIndexLetters(titles = []) {
  const letters = new Set(titles.map((title) => shelfLetter(title)));
  return [...letters].sort((a, b) => {
    if (a === '#') return 1;
    if (b === '#') return -1;
    return a.localeCompare(b);
  });
}

export function volumeSlug(href = '') {
  const match = String(href).match(/#\/b\/([^/]+)\//);
  if (!match) return '';
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function sortByLastRead(rows = []) {
  return rows.slice().sort((a, b) => {
    const aRead = Number(a.lastReadAt) || 0;
    const bRead = Number(b.lastReadAt) || 0;
    if (aRead !== bRead) return bRead - aRead;
    return String(a.title || '').localeCompare(String(b.title || ''), undefined, {
      sensitivity: 'base',
    });
  });
}
