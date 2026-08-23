const CACHE = 'obb-shell-v25';
const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/experience.css',
  './css/experience-scroll.css',
  './css/atmosphere.css',
  './css/navigation.css',
  './css/gui.css',
  './manifest.webmanifest',
  './vendor/marked.min.js',
  './js/atmosphere.js',
  './js/navigation.js',
  './js/app.js',
  './js/experience.js',
  './js/gui.js',
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

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(req)
      .then(async (res) => {
        // Keep a current same-origin copy, but never sacrifice a successful
        // network response just because storage is full or unavailable.
        try {
          const cache = await caches.open(CACHE);
          await cache.put(req, res.clone());
        } catch {
          // Reading continues from the network response.
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
