export const COOPERATIVE_SEARCH_POLICY = Object.freeze({
  resultLimit: 40,
  idleTimeoutMs: 80,
});

export function prioritizedChapterIds(contents = [], currentChapter = '') {
  const ids = contents.map((entry) => String(entry?.id || '')).filter(Boolean);
  const current = ids.indexOf(String(currentChapter || ''));
  if (current < 0) return ids;

  const order = [current, current + 1, current + 2, current - 1];
  const seen = new Set();
  const prioritized = [];
  for (const index of order) {
    const id = ids[index];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    prioritized.push(id);
  }
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    prioritized.push(id);
  }
  return prioritized;
}

export function mergeRankedHits(existing = [], incoming = [], limit = COOPERATIVE_SEARCH_POLICY.resultLimit) {
  const bounded = Number.isInteger(limit) && limit > 0 ? limit : COOPERATIVE_SEARCH_POLICY.resultLimit;
  return [...existing, ...incoming]
    .sort((a, b) => (b?.score || 0) - (a?.score || 0)
      || String(a?.title || '').localeCompare(String(b?.title || ''))
      || (a?.offset || 0) - (b?.offset || 0))
    .slice(0, bounded);
}

export function isCurrentSearch(epoch, activeEpoch, query, activeQuery) {
  return Number(epoch) === Number(activeEpoch)
    && String(query || '') === String(activeQuery || '');
}

export function searchProgress(completed, total, results) {
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeCompleted = Math.min(safeTotal, Math.max(0, Number(completed) || 0));
  const safeResults = Math.max(0, Number(results) || 0);
  return {
    completed: safeCompleted,
    total: safeTotal,
    results: safeResults,
    done: safeTotal === 0 || safeCompleted >= safeTotal,
    label: safeTotal
      ? `Searching ${safeCompleted} of ${safeTotal} chapters · ${safeResults} ${safeResults === 1 ? 'passage' : 'passages'}`
      : 'No searchable chapters',
  };
}
