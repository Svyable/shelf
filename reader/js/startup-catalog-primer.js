export function catalogCoverCandidates(slug) {
  return ['cover.png', 'cover.jpg', 'cover.webp', 'cover.jpeg'].map(
    (name) => `books/${slug}/media/${name}`
  );
}

export async function runCatalogPrimer(items, worker, concurrency = 4) {
  const queue = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!queue.length) return [];
  const width = Math.max(1, Math.min(queue.length, Math.floor(Number(concurrency)) || 1));
  const results = new Array(queue.length);
  let cursor = 0;

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

  await Promise.all(Array.from({ length: width }, () => lane()));
  return results;
}

export function createStartupCatalogPrimer({
  loadPortal,
  parsePortal,
  loadHub,
  parseHub,
  loadCover,
  concurrency = 4,
}) {
  let active = null;

  async function warm() {
    const portal = await loadPortal();
    const slugs = parsePortal(portal);
    return runCatalogPrimer(slugs, async (slug) => {
      const hub = await loadHub(slug);
      const meta = parseHub(hub, slug);
      if (!meta?.published) return { slug, published: false, cover: null };
      const cover = await loadCover(slug);
      return { slug, published: true, cover };
    }, concurrency);
  }

  return {
    prime() {
      if (!active) {
        active = warm().finally(() => {
          active = null;
        });
      }
      return active;
    },
  };
}
