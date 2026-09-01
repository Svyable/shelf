function foldedChar(ch) {
  const punctuation = { '’': "'", '‘': "'", '“': '"', '”': '"', '‐': '-', '‑': '-', '–': '-', '—': '-' };
  return (punctuation[ch] || ch).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
}

export function normalizedAnchorText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .split('')
    .map(foldedChar)
    .join('');
}

export function quoteMatchesText(candidate, quote) {
  const a = normalizedAnchorText(candidate);
  const b = normalizedAnchorText(quote);
  if (!a || !b) return false;
  if (a === b || a.includes(b) || b.includes(a)) return Math.min(a.length, b.length) >= 6;
  return false;
}

function normalizedProjection(text) {
  const source = String(text || '');
  let normalized = '';
  const textMap = [];
  let pendingSpace = false;
  let pendingIndex = 0;
  let index = 0;
  for (const ch of source) {
    if (/\s/.test(ch)) {
      if (normalized && !normalized.endsWith(' ')) {
        pendingSpace = true;
        pendingIndex = index;
      }
      index += ch.length;
      continue;
    }
    if (pendingSpace) {
      normalized += ' ';
      textMap.push(pendingIndex);
      pendingSpace = false;
    }
    const folded = foldedChar(ch);
    for (let i = 0; i < folded.length; i += 1) {
      normalized += folded[i];
      textMap.push(index);
    }
    index += ch.length;
  }
  return { normalized, textMap };
}

export function projectedTextForAnchor(text, sourceMap, anchor) {
  if (!anchor || !Array.isArray(sourceMap)) return '';
  const start = Number(anchor.start);
  const end = Number(anchor.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return '';
  let out = '';
  for (let i = 0; i < sourceMap.length && i < String(text || '').length; i += 1) {
    const sourceOffset = Number(sourceMap[i]);
    if (sourceOffset >= start && sourceOffset <= end) out += text[i];
  }
  return out;
}

export function anchorMatchesProjectedQuote(text, sourceMap, anchor, quote) {
  return quoteMatchesText(projectedTextForAnchor(text, sourceMap, anchor), quote);
}

export function recoverQuoteAnchor(text, sourceMap, quote, priorAnchor = null) {
  const needle = normalizedAnchorText(quote);
  if (needle.length < 6 || !Array.isArray(sourceMap) || !sourceMap.length) return null;
  const projection = normalizedProjection(text);
  const matches = [];
  let from = 0;
  while (matches.length < 32) {
    const index = projection.normalized.indexOf(needle, from);
    if (index < 0) break;
    const startText = projection.textMap[index];
    const endText = projection.textMap[index + needle.length - 1];
    if (Number.isFinite(startText) && Number.isFinite(endText)) {
      const start = Number(sourceMap[Math.min(startText, sourceMap.length - 1)]);
      const end = Number(sourceMap[Math.min(endText, sourceMap.length - 1)]);
      if (Number.isFinite(start) && Number.isFinite(end)) {
        matches.push({ version: 1, start: Math.min(start, end), end: Math.max(start, end) + 1 });
      }
    }
    from = index + Math.max(needle.length, 1);
  }
  if (!matches.length) return null;
  const prior = Number(priorAnchor?.start);
  if (!Number.isFinite(prior)) return matches[0];
  return matches.sort((a, b) => Math.abs(a.start - prior) - Math.abs(b.start - prior) || a.start - b.start)[0];
}

export function anchorChanged(before, after) {
  if (!before || !after) return Boolean(before) !== Boolean(after);
  return Number(before.start) !== Number(after.start) || Number(before.end) !== Number(after.end);
}
