const CACHE = 'sven-shelf-reader-v108';
const READER_PREFIX = new URL('./', self.location.href).pathname;
const REPO_PREFIX = READER_PREFIX.replace(/reader\/?$/, '');
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './css/shelf-gui.css',
  './js/app.js',
];

function isReaderDocument(url, request) {
  return request.mode === 'navigate'
    || url.pathname === READER_PREFIX
    || url.pathname === `${READER_PREFIX}index.html`;
}

function isStaticReaderAsset(url) {
  return url.pathname.startsWith(READER_PREFIX)
    && !url.pathname.endsWith('/')
    && !url.pathname.endsWith('/index.html');
}

function isCatalog(url) {
  return url.pathname === `${REPO_PREFIX}README.md`
    || url.pathname === `${REPO_PREFIX}catalog.json`;
}

function isPublication(url) {
  return url.pathname.startsWith(`${REPO_PREFIX}books/`);
}

async function put(request, response) {
  if (!response?.ok) return response;
  try {
    const cache = await caches.open(CACHE);
    await cache.put(request, response.clone());
  } catch {
    // Storage pressure must never block the live Reader.
  }
  return response;
}

async function cached(request, { ignoreSearch = false } = {}) {
  const cache = await caches.open(CACHE);
  return cache.match(request, { ignoreSearch })
    || caches.match(request, { ignoreSearch });
}

async function networkAndCache(request) {
  return put(request, await fetch(request));
}

async function cacheFirst(request, event) {
  const hit = await cached(request, { ignoreSearch: true });
  const refresh = networkAndCache(request).catch(() => null);
  if (hit) {
    event.waitUntil(refresh);
    return hit;
  }
  return (await refresh) || Response.error();
}

async function networkFirst(request, { ignoreSearch = false } = {}) {
  try {
    return await networkAndCache(request);
  } catch {
    return (await cached(request, { ignoreSearch })) || Response.error();
  }
}

function after(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function freshWithCacheDeadline(request, event, ms = 300) {
  const hit = await cached(request);
  if (!hit) return networkFirst(request);

  const network = networkAndCache(request).catch(() => null);
  event.waitUntil(network.then(() => {}));
  const winner = await Promise.race([network, after(ms, hit)]);
  return winner || hit;
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

  if (isReaderDocument(url, request)) {
    event.respondWith(networkFirst(request, { ignoreSearch: true }));
    return;
  }

  if (isStaticReaderAsset(url)) {
    event.respondWith(cacheFirst(request, event));
    return;
  }

  if (isCatalog(url)) {
    event.respondWith(freshWithCacheDeadline(request, event, 250));
    return;
  }

  if (isPublication(url)) {
    event.respondWith(freshWithCacheDeadline(request, event, 350));
  }
});
