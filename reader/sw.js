const CACHE = 'sven-shelf-reader-v106';
const READER_PREFIX = new URL('./', self.location.href).pathname;
const REPO_PREFIX = READER_PREFIX.replace(/reader\/?$/, '');
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './css/experience.css',
  './css/experience-scroll.css',
  './css/atmosphere.css',
  './css/gui.css',
  './css/shelf-gui.css',
  './vendor/marked.min.js',
  './js/app.js',
];

function freshRequest(request) {
  try {
    return new Request(request, { cache: 'reload' });
  } catch {
    return request;
  }
}

async function cacheFresh(request) {
  const response = await fetch(freshRequest(request));
  if (response?.ok) {
    try {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
    } catch {
      // Storage pressure must never block the live Reader.
    }
  }
  return response;
}

async function cachedFallback(request, ignoreSearch = false) {
  const current = await caches.open(CACHE);
  const hit = await current.match(request, { ignoreSearch });
  if (hit) return hit;
  // Keep compatibility with the prior Reader cache while this worker rolls out.
  return caches.match(request, { ignoreSearch });
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(CORE.map(async (path) => {
      const request = new Request(new URL(path, self.location.href), { cache: 'reload' });
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith('sven-shelf-reader-') && key !== CACHE)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'BOOKSELF_ACTIVATE_UPDATE') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const inReader = url.pathname.startsWith(READER_PREFIX);
  const isCatalog = url.pathname === `${REPO_PREFIX}README.md`
    || url.pathname === `${REPO_PREFIX}catalog.json`;
  const isPublication = url.pathname.startsWith(`${REPO_PREFIX}books/`);
  if (!inReader && !isCatalog && !isPublication) return;

  const ignoreSearch = inReader;
  event.respondWith((async () => {
    try {
      const response = await cacheFresh(request);
      if (response) return response;
    } catch {
      // Fall through to the cached copy for offline or transient failures.
    }
    const cached = await cachedFallback(request, ignoreSearch);
    return cached || Response.error();
  })());
});
