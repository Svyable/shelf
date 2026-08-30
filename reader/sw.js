importScripts('./js/offline-cache.js');

const CACHE = 'obb-shell-v70';
const KATEX_CDN = 'https://cdn.jsdelivr.net/npm/katex@0.18.4/dist/katex.min.js';
const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/experience.css',
  './css/experience-scroll.css',
  './css/typesetting.css',
  './css/atmosphere.css',
  './css/atmosphere-library.css',
  './css/navigation.css',
  './css/reading-surface.css',
  './css/reading-chrome.css',
  './css/reading-content.css',
  './css/content-scroll-regions.css',
  './css/gui.css',
  './css/search-navigation.css',
  './css/search-landing.css',
  './css/selection-marker.css',
  './css/annotation-navigator.css',
  './css/reader-state-backup.css',
  './css/pwa-update.css',
  './css/offline-readiness.css',
  './css/reading-trail.css',
  './css/bookmark-atlas.css',
  './css/cover-design.css',
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
  './js/immersive-chrome.js',
  './js/font-readiness.js',
  './js/font-readiness-runtime.js',
  './js/reading-position.js',
  './js/reading-continuity.js',
  './js/page-drag.js',
  './js/app.js',
  './js/experience.js',
  './js/gui.js',
  './js/dialog-stack.js',
  './js/pwa-update-model.js',
  './js/pwa-update.js',
  './js/offline-readiness-model.js',
  './js/offline-readiness.js',
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
  './js/export.js',
  './js/offline-cache.js',
  './js/progress-position.js',
  './js/semantic-progress.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
});

async function publicationReadiness(url) {
  if (!self.BookselfOfflineCache.isPublicationReadme(url)) return null;
  const cache = await caches.open(CACHE);
  const readmeRequest = new Request(url, { credentials: 'same-origin' });
  const readmeResponse = await cache.match(readmeRequest, { ignoreSearch: true });
  if (!readmeResponse) {
    return { hasReadme: false, totalChapters: 0, cachedChapters: 0, totalMedia: 0, cachedMedia: 0 };
  }

  let readme = '';
  try {
    readme = await readmeResponse.clone().text();
  } catch {
    return { hasReadme: true, totalChapters: 0, cachedChapters: 0, totalMedia: 0, cachedMedia: 0 };
  }

  const chapters = self.BookselfOfflineCache.chapterLinks(readme, url);
  let cachedChapters = 0;
  let totalMedia = 0;
  let cachedMedia = 0;

  for (const href of chapters) {
    const response = await cache.match(new Request(href, { credentials: 'same-origin' }), { ignoreSearch: true });
    if (!response) continue;
    cachedChapters += 1;
    let markdown = '';
    try {
      markdown = await response.clone().text();
    } catch {
      continue;
    }
    const media = self.BookselfOfflineCache.mediaLinks(markdown, href, url);
    totalMedia += media.length;
    for (const mediaHref of media) {
      const cached = await cache.match(new Request(mediaHref, { credentials: 'same-origin' }), { ignoreSearch: true });
      if (cached) cachedMedia += 1;
    }
  }

  return {
    hasReadme: true,
    totalChapters: chapters.length,
    cachedChapters,
    totalMedia,
    cachedMedia,
  };
}

self.addEventListener('message', (event) => {
  if (event.data?.type === 'BOOKSELF_ACTIVATE_UPDATE') {
    self.skipWaiting();
    return;
  }
  if (event.data?.type !== 'BOOKSELF_OFFLINE_READINESS') return;
  const port = event.ports?.[0];
  if (!port) return;
  event.waitUntil(
    publicationReadiness(event.data.url)
      .then((readiness) => port.postMessage({ readiness }))
      .catch(() => port.postMessage({ readiness: null }))
  );
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

async function cacheRequest(cache, href) {
  const request = new Request(href, { credentials: 'same-origin' });
  const existing = await cache.match(request, { ignoreSearch: true });
  if (existing) return existing;
  const response = await fetch(request);
  if (!response.ok) return null;
  try {
    await cache.put(request, response.clone());
  } catch {
    // A full cache must not interfere with the book currently being read.
  }
  return response;
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
  await Promise.allSettled(media.map((href) => cacheRequest(cache, href)));
}

async function warmPublication(readmeResponse, readmeUrl) {
  if (!readmeResponse?.ok) return;
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
    const response = await cacheRequest(cache, href);
    if (!response) return;
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

  const network = fetch(req)
    .then(async (res) => {
      try {
        const cache = await caches.open(CACHE);
        await cache.put(req, res.clone());
      } catch {
        // Reading continues from the network response.
      }
      return res;
    });

  if (sameOrigin && self.BookselfOfflineCache.isPublicationReadme(url.href)) {
    event.waitUntil(
      network
        .then((res) => warmPublication(res.clone(), url))
        .catch(() => {})
    );
  }

  event.respondWith(
    network.catch(() => caches.match(req, { ignoreSearch: sameOrigin }))
  );
});
