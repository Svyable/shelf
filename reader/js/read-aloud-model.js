export const READ_ALOUD_RATES = Object.freeze([0.8, 1, 1.2, 1.4]);

export function normalizeSpeechText(value) {
  return String(value || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function clampSpeechRate(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.max(0.8, Math.min(1.4, n));
}

export function nextSpeechRate(current, direction = 1) {
  const rate = clampSpeechRate(current);
  let index = READ_ALOUD_RATES.findIndex((candidate) => Math.abs(candidate - rate) < 0.01);
  if (index < 0) {
    index = READ_ALOUD_RATES.reduce((best, candidate, candidateIndex) => (
      Math.abs(candidate - rate) < Math.abs(READ_ALOUD_RATES[best] - rate) ? candidateIndex : best
    ), 0);
  }
  return READ_ALOUD_RATES[Math.max(0, Math.min(READ_ALOUD_RATES.length - 1, index + Math.sign(direction || 1)))];
}

export function chunkSpeechText(value, maxLength = 260) {
  const text = normalizeSpeechText(value);
  const limit = Math.max(80, Number(maxLength) || 260);
  if (!text) return [];
  if (text.length <= limit) return [text];

  const sentences = text.match(/[^.!?]+(?:[.!?]+[”’"')\]]*|$)/g) || [text];
  const chunks = [];
  let current = '';

  const pushWords = (segment) => {
    let line = '';
    for (const word of normalizeSpeechText(segment).split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > limit && line) {
        chunks.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) return line;
    return '';
  };

  for (const sentence of sentences) {
    const clean = normalizeSpeechText(sentence);
    if (!clean) continue;
    if (clean.length > limit) {
      if (current) {
        chunks.push(current);
        current = '';
      }
      const tail = pushWords(clean);
      if (tail) current = tail;
      continue;
    }
    const next = current ? `${current} ${clean}` : clean;
    if (next.length > limit && current) {
      chunks.push(current);
      current = clean;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  return chunks.filter(Boolean);
}

export function pagedRange(value) {
  const match = String(value || '').match(/(\d+)(?:\s*[–-]\s*(\d+))?/);
  if (!match) return null;
  const start = Number(match[1]);
  const end = Number(match[2] || match[1]);
  return { start, end: Math.max(start, end) };
}

export function canAdvancePaged(currentValue, totalValue) {
  const current = pagedRange(currentValue);
  const total = Number(String(totalValue || '').replace(/[^0-9]/g, ''));
  return !!(current && Number.isFinite(total) && total > 0 && current.end < total);
}

export function visibleBlockIndex(rects, viewportTop, viewportHeight) {
  if (!Array.isArray(rects) || !rects.length) return -1;
  const top = Number(viewportTop) || 0;
  const height = Math.max(1, Number(viewportHeight) || 1);
  const probe = top + Math.min(height * 0.32, 220);
  let best = -1;
  let bestDistance = Infinity;
  rects.forEach((rect, index) => {
    if (!rect) return;
    const rectTop = Number(rect.top);
    const rectBottom = Number(rect.bottom);
    if (!Number.isFinite(rectTop) || !Number.isFinite(rectBottom)) return;
    if (rectTop <= probe && rectBottom >= probe) {
      best = index;
      bestDistance = 0;
      return;
    }
    if (bestDistance === 0) return;
    const distance = probe < rectTop ? rectTop - probe : probe - rectBottom;
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
}

export function readAloudAvailability({ supported, stage, overlayOpen = false } = {}) {
  if (!supported) return 'unsupported';
  if (stage !== 'read') return 'inactive';
  if (overlayOpen) return 'blocked';
  return 'ready';
}
