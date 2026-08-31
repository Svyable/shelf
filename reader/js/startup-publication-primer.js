export function orderedPublicationFiles(contents = [], targetChapter = null) {
  const rows = Array.isArray(contents) ? contents.filter((row) => row?.file) : [];
  if (!rows.length) return [];
  const targetIndex = targetChapter
    ? rows.findIndex((row) => row.id === targetChapter)
    : -1;
  if (targetIndex <= 0) return rows.slice();
  return [rows[targetIndex], ...rows.slice(0, targetIndex), ...rows.slice(targetIndex + 1)];
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
} = {}) {
  if (typeof loadReadme !== 'function' || typeof parseReadme !== 'function' || typeof loadChapter !== 'function') {
    throw new TypeError('startup publication primer requires readme, parser, and chapter loaders');
  }

  let active = null;

  return {
    prime({ slug, chapter = null } = {}) {
      if (!slug) return Promise.resolve({ status: 'skipped', loaded: 0 });
      const key = `${slug}:${chapter || ''}`;
      if (active?.key === key) return active.promise;

      const promise = (async () => {
        const readme = await loadReadme(slug);
        const meta = parseReadme(readme, slug);
        const ordered = orderedPublicationFiles(meta?.contents, chapter);
        if (!ordered.length) return { status: 'complete', loaded: 0 };

        // Resolve the requested/first chapter before lower-priority warming.
        await loadChapter(slug, ordered[0]);
        const rest = ordered.slice(1);
        const settled = await runBounded(rest, (item) => loadChapter(slug, item), { concurrency });
        return {
          status: 'complete',
          loaded: 1 + settled.filter((entry) => entry?.status === 'fulfilled').length,
          failed: settled.filter((entry) => entry?.status === 'rejected').length,
          first: ordered[0].id || ordered[0].file,
        };
      })();

      active = { key, promise };
      const clear = () => { if (active?.promise === promise) active = null; };
      promise.then(clear, clear);
      return promise;
    },
  };
}
