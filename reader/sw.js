const CACHE = 'obb-shell-v32';
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
  './css/gui.css',
  './css/media.css',
  './css/formats.css',
  './css/math.css',
  './css/academic.css',
  './manifest.webmanifest',
  './vendor/marked.min.js',
  './js/atmosphere.js',
  './js/navigation.js',
  './js/app.js',
  './js/experience.js',
  './js/gui.js',
  './js/media.js',
  './js/formats.js',
  './js/math.js',
  './js/academic.js',
  './js/base.js',
  './js/catalog.js',
  './js/imprint.js',
  './js/markdown.js',
  './js/paginate.js',
  './js/storage.js',
  './js/router.js',
  './js/notes.js',
  './js/search.js',
  './js/export.js',
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

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const external = cacheableExternal(url);
  if (!sameOrigin && !external) return;

  event.respondWith(
    fetch(req)
      .then(async (res) => {
        // Keep a current copy, but never sacrifice a successful network
        // response just because storage is full or unavailable. Pinned KaTeX
        // and reader font resources are cached after first successful use so
        // math and chosen typefaces survive later offline sessions.
        try {
          const cache = await caches.open(CACHE);
          await cache.put(req, res.clone());
        } catch {
          // Reading continues from the network response.
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: sameOrigin }))
  );
});
