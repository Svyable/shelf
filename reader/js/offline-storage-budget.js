(function (root) {
  'use strict';

  const DEFAULT_THRESHOLDS = Object.freeze({
    chapter: 0.92,
    media: 0.80,
    other: 0.86,
  });

  function finiteNonNegative(value) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
  }

  function storagePressure(estimate) {
    const usage = finiteNonNegative(estimate?.usage);
    const quota = finiteNonNegative(estimate?.quota);
    if (usage == null || quota == null || quota <= 0) {
      return { known: false, usage: usage || 0, quota: quota || 0, ratio: 0, remaining: Infinity };
    }
    const ratio = Math.max(0, Math.min(1, usage / quota));
    return {
      known: true,
      usage,
      quota,
      ratio,
      remaining: Math.max(0, quota - usage),
    };
  }

  function warmDecision(estimate, kind = 'other', thresholds = DEFAULT_THRESHOLDS) {
    const pressure = storagePressure(estimate);
    const threshold = Number(thresholds?.[kind] ?? thresholds?.other ?? DEFAULT_THRESHOLDS.other);
    const limit = Number.isFinite(threshold) ? Math.max(0, Math.min(1, threshold)) : DEFAULT_THRESHOLDS.other;
    if (!pressure.known) {
      return { allow: true, reason: 'unknown', threshold: limit, ...pressure };
    }
    return {
      allow: pressure.ratio < limit,
      reason: pressure.ratio < limit ? 'headroom' : 'pressure',
      threshold: limit,
      ...pressure,
    };
  }

  function createBudgetMonitor({ estimate, ttlMs = 1200, now = () => Date.now(), thresholds = DEFAULT_THRESHOLDS } = {}) {
    const estimator = typeof estimate === 'function' ? estimate : null;
    const ttl = Math.max(0, Number(ttlMs) || 0);
    let cached = null;
    let cachedAt = -Infinity;
    let pending = null;

    async function snapshot() {
      const current = Number(now()) || 0;
      if (cached && current - cachedAt <= ttl) return cached;
      if (!estimator) return null;
      if (!pending) {
        pending = Promise.resolve()
          .then(() => estimator())
          .then((value) => {
            cached = value || null;
            cachedAt = Number(now()) || current;
            return cached;
          })
          .catch(() => null)
          .finally(() => {
            pending = null;
          });
      }
      return pending;
    }

    return {
      async canWarm(kind = 'other') {
        return warmDecision(await snapshot(), kind, thresholds);
      },
      invalidate() {
        cached = null;
        cachedAt = -Infinity;
      },
    };
  }

  root.BookselfOfflineStorageBudget = {
    DEFAULT_THRESHOLDS,
    storagePressure,
    warmDecision,
    createBudgetMonitor,
  };
})(typeof self !== 'undefined' ? self : globalThis);
