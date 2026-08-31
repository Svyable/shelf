function normalizedLimit(value, fallback = 256) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Bounded latest-use cache for async resources.
 *
 * Concurrent callers for one key share the same promise. Successful values stay
 * available for the session until LRU eviction or explicit invalidation. Failed
 * loads are removed immediately so transient network failures remain retryable.
 */
export function createAsyncResourceCache({ limit = 256 } = {}) {
  const maxEntries = normalizedLimit(limit);
  const entries = new Map();

  function touch(key, entry) {
    if (entries.get(key) !== entry) return;
    entries.delete(key);
    entries.set(key, entry);
  }

  function evict() {
    while (entries.size > maxEntries) {
      const oldest = entries.keys().next().value;
      entries.delete(oldest);
    }
  }

  function get(key) {
    const normalized = String(key ?? '');
    const entry = entries.get(normalized);
    if (!entry) return undefined;
    touch(normalized, entry);
    return entry.promise;
  }

  function load(key, loader) {
    const normalized = String(key ?? '');
    const existing = entries.get(normalized);
    if (existing) {
      touch(normalized, existing);
      return existing.promise;
    }

    const entry = { promise: null };
    const promise = Promise.resolve()
      .then(loader)
      .then((value) => {
        entry.status = 'fulfilled';
        entry.value = value;
        touch(normalized, entry);
        return value;
      })
      .catch((error) => {
        if (entries.get(normalized) === entry) entries.delete(normalized);
        throw error;
      });

    entry.promise = promise;
    entry.status = 'pending';
    entries.set(normalized, entry);
    evict();
    return promise;
  }

  function invalidate(key) {
    return entries.delete(String(key ?? ''));
  }

  function clear() {
    entries.clear();
  }

  return Object.freeze({
    load,
    get,
    has(key) {
      return entries.has(String(key ?? ''));
    },
    invalidate,
    clear,
    get size() {
      return entries.size;
    },
    get limit() {
      return maxEntries;
    },
  });
}
