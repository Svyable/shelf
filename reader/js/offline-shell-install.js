(function installOfflineShellInstaller(scope) {
  function uniqueUrls(values = []) {
    const seen = new Set();
    const urls = [];
    for (const value of values) {
      const url = String(value || '').trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      urls.push(url);
    }
    return urls;
  }

  function splitShell(shell = [], core = []) {
    const all = uniqueUrls(shell);
    const allSet = new Set(all);
    const coreUrls = uniqueUrls(core).filter((url) => allSet.has(url));
    const coreSet = new Set(coreUrls);
    return Object.freeze({
      core: Object.freeze(coreUrls),
      optional: Object.freeze(all.filter((url) => !coreSet.has(url))),
    });
  }

  function normalizeConcurrency(value, fallback = 4) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 1) return fallback;
    return Math.max(1, Math.min(8, Math.floor(numeric)));
  }

  async function cacheOptional(cache, urls = [], { concurrency = 4 } = {}) {
    if (!cache || typeof cache.add !== 'function') {
      throw new TypeError('Optional shell caching requires a Cache-like add() method');
    }
    const queue = uniqueUrls(urls);
    const attempted = queue.length;
    if (!attempted) {
      return Object.freeze({ attempted: 0, cached: 0, failed: Object.freeze([]) });
    }

    const failed = [];
    let cached = 0;
    let cursor = 0;
    const limit = Math.min(normalizeConcurrency(concurrency), attempted);

    async function worker() {
      while (cursor < attempted) {
        const index = cursor;
        cursor += 1;
        const url = queue[index];
        try {
          await cache.add(url);
          cached += 1;
        } catch (error) {
          failed.push(Object.freeze({ url, error }));
        }
      }
    }

    await Promise.all(Array.from({ length: limit }, () => worker()));
    return Object.freeze({ attempted, cached, failed: Object.freeze(failed) });
  }

  async function installShell(cache, shell = [], core = [], options = {}) {
    if (!cache || typeof cache.addAll !== 'function') {
      throw new TypeError('Shell install requires a Cache-like addAll() method');
    }
    const groups = splitShell(shell, core);
    if (!groups.core.length) {
      throw new TypeError('Shell install requires at least one core asset');
    }

    // Core Reader files stay atomic: if any of these are unavailable, retaining
    // the previous service worker is safer than activating a broken Reader.
    await cache.addAll(groups.core);

    // Enhancements are best effort. A missing optional module must not strand a
    // valid core Reader behind a failed service-worker install.
    const optional = await cacheOptional(cache, groups.optional, options);
    return Object.freeze({
      core: groups.core.length,
      optionalAttempted: optional.attempted,
      optionalCached: optional.cached,
      optionalFailed: optional.failed,
    });
  }

  scope.BookselfOfflineShellInstall = Object.freeze({
    uniqueUrls,
    splitShell,
    normalizeConcurrency,
    cacheOptional,
    installShell,
  });
})(globalThis);
