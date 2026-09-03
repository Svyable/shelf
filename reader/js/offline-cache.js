(function installOfflineCacheHelpers(scope) {
  const MARKDOWN_LINK = /(?<!!)\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\)/g;
  const MARKDOWN_IMAGE = /!\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\)/g;
  const MEDIA_EXT = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

  function publicationRoot(baseUrl) {
    const base = new URL(baseUrl);
    const slash = base.pathname.lastIndexOf('/');
    base.pathname = `${base.pathname.slice(0, slash + 1)}`;
    base.search = '';
    base.hash = '';
    return base;
  }

  function chapterLinks(markdown, baseUrl, limit = 160) {
    const root = publicationRoot(baseUrl);
    const urls = [];
    const seen = new Set();
    MARKDOWN_LINK.lastIndex = 0;
    let match;

    while ((match = MARKDOWN_LINK.exec(markdown || '')) && urls.length < limit) {
      const raw = match[1] || match[2] || '';
      let url;
      try {
        url = new URL(raw, baseUrl);
      } catch {
        continue;
      }
      url.hash = '';
      url.search = '';
      if (url.origin !== root.origin) continue;
      if (!url.pathname.startsWith(root.pathname)) continue;
      if (!/\.md$/i.test(url.pathname)) continue;
      const key = url.href;
      if (seen.has(key)) continue;
      seen.add(key);
      urls.push(key);
    }
    return urls;
  }

  function mediaLinks(markdown, baseUrl, publicationUrl, limit = 96) {
    const root = publicationRoot(publicationUrl || baseUrl);
    const urls = [];
    const seen = new Set();
    MARKDOWN_IMAGE.lastIndex = 0;
    let match;

    while ((match = MARKDOWN_IMAGE.exec(markdown || '')) && urls.length < limit) {
      const raw = match[1] || match[2] || '';
      let url;
      try {
        url = new URL(raw, baseUrl);
      } catch {
        continue;
      }
      url.hash = '';
      url.search = '';
      if (url.origin !== root.origin) continue;
      if (!url.pathname.startsWith(root.pathname)) continue;
      if (!MEDIA_EXT.test(url.pathname)) continue;
      const key = url.href;
      if (seen.has(key)) continue;
      seen.add(key);
      urls.push(key);
    }
    return urls;
  }

  function isPublicationReadme(url) {
    try {
      return /\/books\/[^/]+\/README\.md$/i.test(new URL(url).pathname);
    } catch {
      return false;
    }
  }

  function publicationWarmPlan(connection = {}) {
    const saveData = connection?.saveData === true;
    const effectiveType = String(connection?.effectiveType || '').toLowerCase();
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return Object.freeze({ warmChapters: false, warmMedia: false });
    }
    if (effectiveType === '3g') {
      return Object.freeze({ warmChapters: true, warmMedia: false });
    }
    return Object.freeze({ warmChapters: true, warmMedia: true });
  }

  function createWarmScheduler({ concurrency = 3 } = {}) {
    const limit = Math.max(1, Math.min(8, Math.floor(Number(concurrency) || 1)));
    const pending = new Map();
    const queue = [];
    let active = 0;

    function settle(job, outcome, value) {
      active -= 1;
      if (pending.get(job.key) === job.promise) pending.delete(job.key);
      if (outcome === 'resolve') job.resolve(value);
      else job.reject(value);
      pump();
    }

    function pump() {
      while (active < limit && queue.length) {
        const job = queue.shift();
        active += 1;
        Promise.resolve()
          .then(job.task)
          .then(
            (value) => settle(job, 'resolve', value),
            (error) => settle(job, 'reject', error)
          );
      }
    }

    function run(key, task) {
      const normalizedKey = String(key || '');
      if (!normalizedKey || typeof task !== 'function') {
        return Promise.reject(new TypeError('Warm scheduler requires a key and task'));
      }
      const existing = pending.get(normalizedKey);
      if (existing) return existing;

      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      const job = { key: normalizedKey, task, resolve, reject, promise };
      pending.set(normalizedKey, promise);
      queue.push(job);
      pump();
      return promise;
    }

    return Object.freeze({
      run,
      get concurrency() {
        return limit;
      },
      get active() {
        return active;
      },
      get queued() {
        return queue.length;
      },
      get pending() {
        return pending.size;
      },
    });
  }

  scope.BookselfOfflineCache = Object.freeze({
    chapterLinks,
    mediaLinks,
    isPublicationReadme,
    publicationWarmPlan,
    createWarmScheduler,
  });
})(globalThis);
