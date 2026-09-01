export function orderedPublicationFiles(contents = [], targetChapter = null) {
  const rows = Array.isArray(contents) ? contents.filter((row) => row?.file) : [];
  if (!rows.length) return [];
  const targetIndex = targetChapter
    ? rows.findIndex((row) => row.id === targetChapter)
    : -1;
  if (targetIndex < 0) return rows.slice();
  if (targetIndex === 0) return rows.slice();

  // A deep-linked reader is overwhelmingly likely to continue forward. Warm a
  // small reading corridor around the target before returning to publication
  // order so the next chapter is not stuck behind unrelated front matter.
  const priorityIndexes = [targetIndex, targetIndex + 1, targetIndex + 2, targetIndex - 1]
    .filter((index) => index >= 0 && index < rows.length);
  const seen = new Set(priorityIndexes);
  return [
    ...priorityIndexes.map((index) => rows[index]),
    ...rows.filter((_row, index) => !seen.has(index)),
  ];
}

export function startupAcquisitionPlan(connection = {}) {
  const effectiveType = String(connection?.effectiveType || '').toLowerCase();
  const constrained = !!connection?.saveData || effectiveType === 'slow-2g' || effectiveType === '2g';
  if (constrained) {
    return Object.freeze({
      primeCatalog: false,
      catalogConcurrency: 0,
      warmPublicationRemainder: false,
      publicationConcurrency: 1,
    });
  }
  if (effectiveType === '3g') {
    return Object.freeze({
      primeCatalog: true,
      catalogConcurrency: 2,
      warmPublicationRemainder: true,
      publicationConcurrency: 1,
    });
  }
  return Object.freeze({
    primeCatalog: true,
    catalogConcurrency: 4,
    warmPublicationRemainder: true,
    publicationConcurrency: 2,
  });
}

export function publicationPrefetchDepth(intent = 'route') {
  return intent === 'hover' || intent === 'focus' ? 'target' : 'publication';
}

export async function runBounded(items, worker, { concurrency = 2 } = {}) {
  const queue = Array.isArray(items) ? items.slice() : [];
  const limit = Math.max(1, Math.floor(Number(concurrency) || 1));
  let cursor = 0;
  const results = new Array(queue.length);

  async function lane() {
    while (cursor < queue.length) {
      const index = cursor++;
      try {
        results[index] = { status: 'fulfilled', value: await worker(queue[index], index) };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, lane));
  return results;
}

export function createStartupPublicationPrimer({
  loadReadme,
  parseReadme,
  loadChapter,
  concurrency = 2,
  warmRemainder = true,
} = {}) {
  if (typeof loadReadme !== 'function' || typeof parseReadme !== 'function' || typeof loadChapter !== 'function') {
    throw new TypeError('startup publication primer requires readme, parser, and chapter loaders');
  }

  const active = new Map();

  function prime({ slug, chapter = null, intent = 'route' } = {}) {
    if (!slug) return Promise.resolve({ status: 'skipped', loaded: 0 });
    const depth = publicationPrefetchDepth(intent);
    const key = `${slug}:${chapter || ''}:${depth}`;
    if (active.has(key)) return active.get(key);

    const promise = (async () => {
      const readme = await loadReadme(slug);
      const meta = parseReadme(readme, slug);
      const ordered = orderedPublicationFiles(meta?.contents, chapter);
      if (!ordered.length) return { status: 'complete', loaded: 0, depth };

      // Resolve the requested/first chapter before any speculative warming.
      await loadChapter(slug, ordered[0]);
      const rest = ordered.slice(1);
      const connectionAllowsRemainder = typeof warmRemainder === 'function'
        ? !!warmRemainder({ slug, chapter: ordered[0], meta, intent })
        : !!warmRemainder;
      const allowRemainder = depth === 'publication' && connectionAllowsRemainder;
      if (!allowRemainder || !rest.length) {
        return {
          status: 'complete',
          loaded: 1,
          failed: 0,
          deferred: rest.length,
          first: ordered[0].id || ordered[0].file,
          depth,
        };
      }

      const settled = await runBounded(rest, (item) => loadChapter(slug, item), { concurrency });
      return {
        status: 'complete',
        loaded: 1 + settled.filter((entry) => entry?.status === 'fulfilled').length,
        failed: settled.filter((entry) => entry?.status === 'rejected').length,
        deferred: 0,
        first: ordered[0].id || ordered[0].file,
        depth,
      };
    })();

    active.set(key, promise);
    const clear = () => {
      if (active.get(key) === promise) active.delete(key);
    };
    promise.then(clear, clear);
    return promise;
  }

  return Object.freeze({ prime });
}