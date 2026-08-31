export function normalizeQuery(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

export function queryEligible(value) {
  return normalizeQuery(value).length >= 2;
}

export function searchConcurrency(connection = {}) {
  if (connection.saveData) return { metadata: 2, books: 1, chapters: 1 };
  const type = String(connection.effectiveType || '').toLowerCase();
  if (type === 'slow-2g' || type === '2g') return { metadata: 2, books: 1, chapters: 1 };
  if (type === '3g') return { metadata: 3, books: 1, chapters: 2 };
  return { metadata: 5, books: 2, chapters: 3 };
}

export function createQueryGeneration() {
  let current = 0;
  return Object.freeze({
    next() { current += 1; return current; },
    current() { return current; },
    isCurrent(value) { return value === current; },
  });
}

export async function runBounded(items, worker, { concurrency = 1, shouldContinue = () => true } = {}) {
  const rows = Array.from(items || []);
  const width = Math.max(1, Math.min(rows.length || 1, Math.floor(Number(concurrency) || 1)));
  let cursor = 0;
  let completed = 0;
  async function lane() {
    while (shouldContinue()) {
      const index = cursor;
      cursor += 1;
      if (index >= rows.length) return;
      await worker(rows[index], index);
      completed += 1;
    }
  }
  await Promise.all(Array.from({ length: width }, lane));
  return { completed, total: rows.length, cancelled: completed < rows.length };
}

export function stageLabel({ metadataComplete = false, passageComplete = false, matches = 0 } = {}) {
  if (!metadataComplete) return matches ? 'Searching titles…' : 'Searching library…';
  if (!passageComplete) return matches ? 'Searching inside books…' : 'Searching passages…';
  return matches ? '' : 'No titles or passages.';
}
