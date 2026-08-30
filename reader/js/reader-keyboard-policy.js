const READER_KEYS = new Set([
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Enter',
  'b', 'B', 's', 'S', 'f', 'F', '/', '?',
]);

export function readerClaimsKey(key) {
  return READER_KEYS.has(String(key || ''));
}

export function shouldProtectNativeKey({
  key,
  interactive = false,
  dialogOpen = false,
  ctrlKey = false,
  metaKey = false,
  altKey = false,
  composing = false,
  repeat = false,
} = {}) {
  if (!readerClaimsKey(key)) return false;
  if (dialogOpen || interactive || composing) return true;
  if (ctrlKey || metaKey || altKey) return true;
  if (repeat && !String(key || '').startsWith('Arrow')) return true;
  return false;
}

export function pageRegionLabel({ chapter = '', page = '', side = '', spread = false } = {}) {
  const bits = [];
  const cleanChapter = String(chapter || '').trim();
  const cleanPage = String(page || '').trim();
  if (cleanChapter) bits.push(cleanChapter);
  if (cleanPage) bits.push(`page ${cleanPage}`);
  if (spread && side) bits.push(`${side} page`);
  return bits.length ? bits.join(', ') : 'Reading page';
}
