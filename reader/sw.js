importScripts('./js/offline-cache.js');

const CACHE = 'obb-shell-v46';
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
  './css/gui.css',
  './css/search-navigation.css',
  './css/media.css',
  './css/formats.css',
  './css/math.css',
  './css/academic.css',
  './manifest.webmanifest',
  './vendor/marked.min.js',
  './js/atmosphere.js',
  './js/navigation.js',
  './js/reading-surface.js',
  './js/viewport-stability.js',
  './js/reading-position.js',
  './js/reading-continuity.js',
  './js/page-drag.js',
  './js/app.js',
  './js/experience.js',
  './js/gui.js',
  './js/dialog-stack.js',
  './js/search-navigation.js',
  './js/media.js',
  './js/formats.js',
  './js/math.js',
  './js/academic.js',
  './js/base.js',
  './js/catalog.js',
  './js/imprint.js',
  './js/presentation.js',
  './js/presentation-runtime.js',
  './js/markdown.js',
  './js/paginate.js',
  './js/storage.js',
  './js/router.js',
  './js/notes.js',
  './js/annotations.js',
  './js/search.js',
  './js/export.js',
  './js/offline-cache.js',
  './js/progress-position.js',
  './js/semantic-progress.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
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
    const request = new Request(href, { credentials: 'same-origin' });
    const existing = await cache.match(request, { ignoreSearch: true });
    if (existing) return;
    const response = await fetch(request);
    if (!response.ok) return;
    try {
      await cache.put(request, response.clone());
    } catch {
      // A full cache must not interfere with the book currently being read.
    }
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
      // Keep a current copy, but never sacrifice a successful network
      // response just because storage is full or unavailable. Pinned KaTeX,
      // reader font resources, and publication reader.json defaults are
      // cached after first successful use for later offline reading.
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
