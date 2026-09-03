(function installOfflineFetchPolicy(scope) {
  const PUBLICATION_PATH = /\/books\/[^/]+\//i;
  const REVISION_API_ORIGIN = 'https://api.github.com';
  const REVISION_API_PATH = /^\/repos\/[^/]+\/[^/]+\/commits$/i;
  const DEFAULT_PUBLICATION_DEADLINE_MS = 1200;

  function normalizeHref(value, baseHref = 'https://bookself.invalid/reader/') {
    try {
      return new URL(String(value || ''), baseHref).href;
    } catch {
      return '';
    }
  }

  function shellUrlSet(paths, baseHref) {
    return new Set((paths || []).map((path) => normalizeHref(path, baseHref)).filter(Boolean));
  }

  function isRevisionLookup(url) {
    try {
      const parsed = new URL(String(url || ''));
      return parsed.origin === REVISION_API_ORIGIN
        && REVISION_API_PATH.test(parsed.pathname)
        && parsed.searchParams.has('path')
        && parsed.searchParams.get('per_page') === '1';
    } catch {
      return false;
    }
  }

  function classifyRequest(url, {
    sameOrigin = false,
    external = false,
    shellUrls = null,
  } = {}) {
    const href = normalizeHref(url);
    if (!href) return 'other';
    if (external) return 'external';
    if (!sameOrigin) return 'other';
    if (shellUrls?.has(href)) return 'shell';
    try {
      if (PUBLICATION_PATH.test(new URL(href).pathname)) return 'publication';
    } catch {
      return 'other';
    }
    return 'other';
  }

  function responsePlan(kind, hasCached = false) {
    if ((kind === 'shell' || kind === 'external') && hasCached) return 'cache-then-network';
    if (kind === 'publication' && hasCached) return 'network-with-cache-deadline';
    return 'network-first';
  }

  function deadlineMs(kind, overrideMs) {
    if (kind !== 'publication') return 0;
    const value = Number(overrideMs);
    if (Number.isFinite(value) && value >= 0) return Math.round(value);
    return DEFAULT_PUBLICATION_DEADLINE_MS;
  }

  scope.BookselfOfflineFetchPolicy = Object.freeze({
    DEFAULT_PUBLICATION_DEADLINE_MS,
    shellUrlSet,
    isRevisionLookup,
    classifyRequest,
    responsePlan,
    deadlineMs,
  });
})(globalThis);
