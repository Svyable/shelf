importScripts('./js/offline-cache.js');
importScripts('./js/offline-fetch-policy.js');
importScripts('./js/offline-storage-budget.js');
importScripts('./js/offline-shell-install.js');

const CACHE = 'obb-shell-v98';
const KATEX_CDN = 'https://cdn.jsdelivr.net/npm/katex@0.18.4/dist/katex.min.js';
const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/experience.css',
  './css/experience-scroll.css',
  './css/scroll-performance.css',
  './css/typesetting.css',
  './css/atmosphere.css',
  './css/atmosphere-library.css',
  './css/navigation.css',
  './css/reading-surface.css',
  './css/reading-chrome.css',
  './css/reading-content.css',
  './css/content-scroll-regions.css',
  './css/one-handed-actions.css',
  './css/gui.css',
  './css/settings-panel.css',
  './css/search-navigation.css',
  './css/search-landing.css',
  './css/selection-marker.css',
  './css/annotation-navigator.css',
  './css/reader-state-backup.css',
  './css/pwa-update.css',
  './css/reading-trail.css',
  './css/bookmark-atlas.css',
  './css/cover-design.css',
  './css/content-inspector.css',
  './css/direct-route-preview.css',
  './css/scroll-chapter-nav.css',
  './css/media.css',
  './css/formats.css',
  './css/math.css',
  './css/academic.css',
  './manifest.webmanifest',
  './vendor/marked.min.js',
  './js/atmosphere.js',
  './js/navigation.js',
  './js/content-navigation.js',
  './js/reading-surface.js',
  './js/viewport-stability.js',
  './js/viewport-stability-runtime.js',
  './js/immersive-chrome.js',
  './js/font-readiness.js',
  './js/font-readiness-runtime.js',
  './js/reading-position.js',
  './js/reading-continuity.js',
  './js/page-drag.js',
  './js/reader-keyboard-policy.js',
  './js/reader-keyboard-runtime.js',
  './js/one-handed-actions-model.js',
  './js/one-handed-actions.js',
  './js/app.js',
  './js/route-queue.js',
  './js/pagination-scheduler.js',
  './js/experience.js',
  './js/scroll-performance-model.js',
  './js/scroll-performance.js',
  './js/gui.js',
  './js/dialog-stack.js',
  './js/pwa-update-model.js',
  './js/pwa-update.js',
  './js/native-share.js',
  './js/search-navigation.js',
  './js/search-landing.js',
  './js/cover-presentation.js',
  './js/cover-runtime.js',
  './js/media.js',
  './js/media-viewer.js',
  './js/content-scroll-region-model.js',
  './js/content-scroll-regions.js',
  './js/formats.js',
  './js/math.js',
  './js/academic.js',
  './js/base.js',
  './js/resource-cache.js',
  './js/navigation-prefetch.js',
  './js/startup-catalog-primer.js',
  './js/startup-publication-primer.js',
  './js/catalog.js',
  './js/imprint.js',
  './js/presentation.js',
  './js/presentation-runtime.js',
  './js/markdown.js',
  './js/derivation-cache.js',
  './js/paginate.js',
  './js/storage.js',
  './js/router.js',
  './js/reading-trail-model.js',
  './js/reading-trail.js',
  './js/bookmark-atlas-model.js',
  './js/bookmark-atlas.js',
  './js/notes.js',
  './js/annotations.js',
  './js/annotation-navigator-model.js',
  './js/annotation-backup.js',
  './js/annotation-navigator.js',
  './js/annotation-navigator-modal.js',
  './js/reader-state-backup.js',
  './js/reader-state-backup-runtime.js',
  './js/reader-state-transaction.js',
  './js/selection-memory.js',
  './js/selection-marker.js',
  './js/selection-actions.js',
  './js/search.js',
  './js/progressive-library-search-model.js',
  './js/progressive-library-search.js',
  './js/content-inspector-model.js',
  './js/content-inspector.js',
  './js/reading-wake-lock-model.js',
  './js/reading-wake-lock.js',
  './js/reading-guide-model.js',
  './js/reading-guide.js',
  './js/accessibility-surface-model.js',
  './js/accessibility-surfaces.js',
  './js/direct-route-preview-model.js',
  './js/direct-route-preview.js',
  './js/scroll-chapter-nav-model.js',
  './js/scroll-chapter-nav.js',
  './js/reading-session-model.js',
  './js/reading-session.js',
  './js/export.js',
  './js/offline-cache.js',
  './js/offline-fetch-policy.js',
  './js/offline-storage-budget.js',
  './js/offline-shell-install.js',
  './js/progress-position.js',
  './js/semantic-progress.js',
];

const OPTIONAL_SHELL = new Set([
  './css/content-scroll-regions.css',
  './css/settings-panel.css',
  './css/search-navigation.css',
  './css/search-landing.css',
  './css/selection-marker.css',
  './css/annotation-navigator.css',
  './css/reader-state-backup.css',
  './css/pwa-update.css',
  './css/reading-trail.css',
  './css/bookmark-atlas.css',
  './css/content-inspector.css',
  './css/direct-route-preview.css',
  './css/scroll-chapter-nav.css',
  './js/content-scroll-region-model.js',
  './js/content-scroll-regions.js',
  './js/pwa-update-model.js',
  './js/pwa-update.js',
  './js/native-share.js',
  './js/search-navigation.js',
  './js/search-landing.js',
  './js/reading-trail-model.js',
  './js/reading-trail.js',
  './js/bookmark-atlas-model.js',
  './js/bookmark-atlas.js',
  './js/annotation-navigator-model.js',
  './js/annotation-backup.js',
  './js/annotation-navigator.js',
  './js/annotation-navigator-modal.js',
  './js/reader-state-backup.js',
  './js/reader-state-backup-runtime.js',
  './js/reader-state-transaction.js',
  './js/selection-memory.js',
  './js/selection-marker.js',
  './js/selection-actions.js',
  './js/progressive-library-search-model.js',
  './js/progressive-library-search.js',
  './js/content-inspector-model.js',
  './js/content-inspector.js',
  './js/reading-wake-lock-model.js',
  './js/reading-wake-lock.js',
  './js/reading-guide-model.js',
  './js/reading-guide.js',
  './js/accessibility-surface-model.js',
  './js/accessibility-surfaces.js',
  './js/direct-route-preview-model.js',
  './js/direct-route-preview.js',
  './js/scroll-chapter-nav-model.js',
  './js/scroll-chapter-nav.js',
  './js/reading-session-model.js',
  './js/reading-session.js',
  './js/progress-position.js',
  './js/semantic-progress.js',
]);
const CORE_SHELL = SHELL.filter((url) => !OPTIONAL_SHELL.has(url));

const SHELL_URLS = self.BookselfOfflineFetchPolicy.shellUrlSet(SHELL, self.location.href);
const warmScheduler = self.BookselfOfflineCache.createWarmScheduler({ concurrency: 3 });
const warmBudget = self.BookselfOfflineStorageBudget.createBudgetMonitor({
  estimate: self.navigator?.storage?.estimate
    ? () => self.navigator.storage.estimate()
    : null,
  ttlMs: 1200,
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => self.BookselfOfflineShellInstall.installShell(
      cache,
      SHELL,
      CORE_SHELL,
      { concurrency: 4 }
    ))
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'BOOKSELF_ACTIVATE_UPDATE') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function cacheableExternal(url) {
  return url.href === KATEX_CDN
    || url.origin === 'https://fonts.googleapis.com'
    || url.origin === 'https://fonts.gstatic.com';
}

async function cachedResponse(request, sameOrigin) {
  const cache = await caches.open(CACHE);
  return cache.match(request, { ignoreSearch: sameOrigin });
}

async function networkResponse(request) {
  const response = await fetch(request);
  if (!response.ok) return response;
  try {
    const cache = await caches.open(CACHE);
    await cache.put(request, response.clone());
  } catch {
    // A full cache must not interfere with the book currently being read.
  }
  return response;
}

function after(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function respondWithPolicy(request, network, kind, sameOrigin) {
  const cached = await cachedResponse(request, sameOrigin);
  const plan = self.BookselfOfflineFetchPolicy.responsePlan(kind, !!cached);

  if (plan === 'cache-then-network') return cached;
  if (plan === 'network-with-cache-deadline') {
    const deadline = self.BookselfOfflineFetchPolicy.deadlineMs(kind);
    return Promise.race([network, after(deadline, cached)]).catch(() => cached);
  }
  return network.catch(() => cached || Promise.reject(new Error('Network unavailable and no cached response')));
}

function cacheRequest(cache, href, kind = 'other') {
  return warmScheduler.run(href, async () => {
    const request = new Request(href, { credentials: 'same-origin' });
    const existing = await cache.match(request, { ignoreSearch: true });
    if (existing) return existing;
    const decision = await warmBudget.canWarm(kind);
    if (!decision.allow) return null;
    const response = await fetch(request);
    if (!response.ok) return null;
    try {
      await cache.put(request, response.clone());
      warmBudget.invalidate();
    } catch {
      // A full cache must not interfere with the book currently being read.
    }
    return response;
  });
}

async function warmChapterMedia(cache, chapterResponse, chapterUrl, publicationUrl) {
  if (!chapterResponse?.ok) return;
  let markdown;
  try {
    markdown = await chapterResponse.text();
  } catch {
    return;
  }
  const media = self.BookselfOfflineCache.mediaLinks(markdown, chapterUrl, publicationUrl);
  await Promise.allSettled(media.map((href) => cacheRequest(cache, href, 'media')));
}

async function warmPublication(readmeResponse, readmeUrl, plan) {
  if (!readmeResponse?.ok || !plan?.warmChapters) return;
  let markdown;
  try {
    markdown = await readmeResponse.text();
  } catch {
    return;
  }

  const chapters = self.BookselfOfflineCache.chapterLinks(markdown, readmeUrl.href);
  if (!chapters.length) return;
  const cache = await caches.open(CACHE);

  await Promise.allSettled(chapters.map(async (href) => {
    const response = await cacheRequest(cache, href, 'chapter');
    if (!response || !plan.warmMedia) return;
    await warmChapterMedia(cache, response.clone(), href, readmeUrl.href);
  }));
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const external = cacheableExternal(url);
  if (!sameOrigin && !external) return;

  const kind = self.BookselfOfflineFetchPolicy.classifyRequest(url.href, {
    sameOrigin,
    external,
    shellUrls: SHELL_URLS,
  });
  const network = networkResponse(req);

  // Keep revalidation alive even when a cached response wins immediately or
  // after the publication deadline. The next request then sees the fresh copy.
  event.waitUntil(network.then(() => {}).catch(() => {}));

  if (sameOrigin && self.BookselfOfflineCache.isPublicationReadme(url.href)) {
    const plan = self.BookselfOfflineCache.publicationWarmPlan(self.navigator?.connection || {});
    if (plan.warmChapters) {
      event.waitUntil(
        network
          .then((res) => warmPublication(res.clone(), url, plan))
          .catch(() => {})
      );
    }
  }

  event.respondWith(respondWithPolicy(req, network, kind, sameOrigin));
});
