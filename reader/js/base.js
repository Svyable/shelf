import './page-drag.js';
import './reader-keyboard-runtime.js';
import './one-handed-actions.js';
import { parseBookReadme, parsePortalCatalog } from './catalog.js';
import { parseRoute } from './router.js';
import { createAsyncResourceCache } from './resource-cache.js';
import { createStartupCatalogPrimer, catalogCoverCandidates } from './startup-catalog-primer.js';
import { createStartupPublicationPrimer } from './startup-publication-primer.js';

queueMicrotask(() => {
  import('./semantic-progress.js').catch((error) => {
    console.warn('Semantic reading progress could not be loaded', error);
  });
});

/** Repo-root URL prefix so fetches work at / and at /<repo>/ */

const documentCache = createAsyncResourceCache({ limit: 256 });
const existenceCache = createAsyncResourceCache({ limit: 256 });

export function repoBase() {
  const path = window.location.pathname.replace(/index\.html$/, '');
  if (path.endsWith('/reader/') || path.endsWith('/reader')) {
    return path.replace(/reader\/?$/, '');
  }
  const i = path.indexOf('/reader/');
  if (i >= 0) return path.slice(0, i + 1);
  return path.endsWith('/') ? path : `${path}/`;
}

export function fileUrl(relativePath) {
  const base = repoBase();
  const clean = String(relativePath).replace(/^\.\//, '').replace(/^\/+/, '');
  return `${base}${clean}`;
}

export function fetchDocument(relativePath) {
  const url = fileUrl(relativePath);
  return documentCache.load(url, async () => {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
      const err = new Error(`Could not load ${relativePath} (${res.status})`);
      err.status = res.status;
      err.url = url;
      throw err;
    }
    return Object.freeze({
      text: await res.text(),
      modified: res.headers.get('Last-Modified'),
    });
  });
}

export async function fetchText(relativePath) {
  const doc = await fetchDocument(relativePath);
  return doc.text;
}

export function invalidateDocument(relativePath) {
  return documentCache.invalidate(fileUrl(relativePath));
}

export function clearDocumentCache() {
  documentCache.clear();
  existenceCache.clear();
}

export async function fileExists(relativePath) {
  const url = fileUrl(relativePath);
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    if (res.ok) return true;
    const get = await fetch(url, { method: 'GET', cache: 'no-cache' });
    return get.ok;
  } catch {
    return false;
  }
}

async function existingUrl(relativePath) {
  const url = fileUrl(relativePath);
  return existenceCache.load(url, async () => {
    const res = await fetch(url, { method: 'GET', cache: 'no-cache' });
    return res.ok ? url : null;
  });
}

export async function firstExisting(relativePaths) {
  for (const path of relativePaths) {
    try {
      const url = await existingUrl(path);
      if (url) return url;
    } catch {
      // Transient probe failures stay retryable and do not block later candidates.
    }
  }
  return null;
}

const startupCatalogPrimer = createStartupCatalogPrimer({
  loadPortal: () => fetchText('README.md'),
  parsePortal: parsePortalCatalog,
  loadHub: (slug) => fetchText(`books/${slug}/README.md`),
  parseHub: parseBookReadme,
  loadCover: (slug) => firstExisting(catalogCoverCandidates(slug)),
  concurrency: 4,
});

const startupPrimer = createStartupPublicationPrimer({
  loadReadme: (slug) => fetchText(`books/${slug}/README.md`),
  parseReadme: parseBookReadme,
  loadChapter: (slug, chapter) => fetchText(`books/${slug}/${chapter.file}`),
  concurrency: 2,
});

function primeInitialCatalog() {
  startupCatalogPrimer.prime().catch(() => {
    // Catalog priming is opportunistic. The canonical loader retries and owns errors.
  });
}

function primeInitialPublication() {
  const route = parseRoute();
  if (!route.slug || (route.view !== 'cover' && route.view !== 'read')) return;
  startupPrimer.prime({ slug: route.slug, chapter: route.chapter }).catch(() => {
    // Priming is opportunistic. The canonical loader retries and owns errors.
  });
}

primeInitialCatalog();
primeInitialPublication();