function normalizedLimit(value, fallback = 256) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const DEFAULT_RETRY_DELAYS = Object.freeze([140, 520]);
const OFFLINE_RETRY_FLOOR_MS = 1200;
const OFFLINE_RETRY_CEILING_MS = 1800;

function normalizedDelays(value) {
  if (!Array.isArray(value)) return [...DEFAULT_RETRY_DELAYS];
  return value
    .map((delay) => Math.max(0, Math.floor(Number(delay) || 0)))
    .slice(0, 4);
}

function errorStatus(error) {
  const status = Number(error?.status);
  return Number.isFinite(status) ? status : null;
}

/**
 * Classify failures without coupling the cache to fetch().
 * HTTP errors supplied by fetchDocument carry `status`; network failures do not.
 */
export function resourceFailureKind(error) {
  if (error?.name === 'AbortError') return 'abort';
  const status = errorStatus(error);
  if (status == null || status === 0) {
    return error instanceof TypeError || error?.network === true ? 'transient' : 'permanent';
  }
  if (status === 408 || status === 425 || status === 429 || status >= 500) return 'transient';
  return 'permanent';
}

export function retryPauseMs(delay, { offline = false } = {}) {
  const base = Math.max(0, Math.floor(Number(delay) || 0));
  if (!offline) return base;
  return Math.min(OFFLINE_RETRY_CEILING_MS, Math.max(OFFLINE_RETRY_FLOOR_MS, base));
}

function defaultPause(delay) {
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
  const wait = retryPauseMs(delay, { offline });
  if (!wait) return Promise.resolve();

  if (!offline || typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
    return new Promise((resolve) => setTimeout(resolve, wait));
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      window.removeEventListener('online', finish);
      resolve();
    };
    const timer = setTimeout(finish, wait);
    window.addEventListener('online', finish, { once: true });
  });
}

/**
 * Bounded latest-use cache for async resources.
 *
 * Concurrent callers for one key share one acquisition transaction. Successful
 * values stay available for the session until LRU eviction or explicit
 * invalidation. Transient acquisition failures receive two bounded retries by
 * default; permanent HTTP failures (such as 404) and aborts do not. A terminal
 * failure is removed immediately so a later user action remains retryable.
 */
export function createAsyncResourceCache({
  limit = 256,
  retryDelays = DEFAULT_RETRY_DELAYS,
  pause = defaultPause,
} = {}) {
  const maxEntries = normalizedLimit(limit);
  const delays = normalizedDelays(retryDelays);
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

    const entry = { promise: null, status: 'pending', attempts: 0 };
    const acquire = async () => {
      let lastError = null;
      for (let attempt = 0; ; attempt += 1) {
        if (entries.get(normalized) !== entry && lastError) throw lastError;
        entry.attempts = attempt + 1;
        try {
          return await loader({ attempt, key: normalized });
        } catch (error) {
          lastError = error;
          const retryable = resourceFailureKind(error) === 'transient' && attempt < delays.length;
          if (!retryable || entries.get(normalized) !== entry) throw error;
          await pause(delays[attempt], {
            attempt,
            key: normalized,
            error,
            offline: typeof navigator !== 'undefined' && navigator.onLine === false,
          });
        }
      }
    };

    const promise = Promise.resolve()
      .then(acquire)
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
