// Shelf owns the public library and its release state. The heavy Reader core is
// local to this repository and is loaded only when a publication is opened.
// Library search reuses the shared catalog/search modules without booting the
// full reading surface. Bookself remains the upstream framework source, never a
// production runtime.

const readerCoreUrl = new URL('./app-core.js?v=20260912-cover-1', import.meta.url).href;
const readmeUrl = new URL('../../README.md', import.meta.url);
const catalogUrl = new URL('../../catalog.json', import.meta.url);
const fastCatalogCacheKey = 'sven-shelf:fast-catalog:v5';

let readerCorePromise = null;
let readerCoreLoaded = false;
let librarySearchModulesPromise = null;
let librarySearchEpoch = 0;
let fastEntries = [];
let recentRanks = new Map();
let recentRanksPromise = null;
let sortMode = 'title';
const searchBookCache = new Map();

const $ = (id) => document.getElementById(id);

function bookRouteRequested() {
  return /^#\/b\/[a-z0-9][a-z0-9-]*(?:\/|$)/i.test(location.hash || '')
    || new URLSearchParams(location.search).has('b');
}

function libraryRouteRequested() {
  return !bookRouteRequested();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clothColor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 33 + slug.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} ${28 + (h % 18)}% ${16 + (h % 10)}%)`;
}

function releasedSection(markdown) {
  const match = /^##\s+The books\s*$/im.exec(markdown || '');
  if (!match) return '';
  const tail = String(markdown).slice(match.index + match[0].length);
  const next = /^##\s+/m.exec(tail);
  return next ? tail.slice(0, next.index) : tail;
}

function cleanTitle(label, slug) {
  const title = String(label || '')
    .replace(/[*_`]/g, '')
    .replace(/\\([\\`*_{}\[\]()#+.!-])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  if (title) return title;
  return String(slug || '').split('-').filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function parseReleasedBooks(markdown) {
  const section = releasedSection(markdown);
  const entries = [];
  const seen = new Set();
  const re = /\[([^\]]+)\]\((?:\.\/)?books\/([a-z0-9][a-z0-9-]*)\/?\)/gi;
  let match;
  while ((match = re.exec(section))) {
    const slug = match[2].toLowerCase();
    if (seen.has(slug) || slug === '_template') continue;
    seen.add(slug);
    entries.push({ slug, title: cleanTitle(match[1], slug), sourceIndex: entries.length });
  }
  return entries;
}

function saveFastCatalog(entries) {
  try { localStorage.setItem(fastCatalogCacheKey, JSON.stringify(entries)); } catch {}
}

function readFastCatalog() {
  try {
    const parsed = JSON.parse(localStorage.getItem(fastCatalogCacheKey) || '[]');
    return Array.isArray(parsed) ? parsed.filter((entry) => entry?.slug && entry?.title) : [];
  } catch {
    return [];
  }
}

function sortedEntries(entries) {
  const copy = entries.slice();
  if (sortMode === 'recent') {
    copy.sort((a, b) => {
      const ar = recentRanks.has(a.slug) ? recentRanks.get(a.slug) : Number.MAX_SAFE_INTEGER;
      const br = recentRanks.has(b.slug) ? recentRanks.get(b.slug) : Number.MAX_SAFE_INTEGER;
      return ar - br || a.sourceIndex - b.sourceIndex;
    });
    return copy;
  }
  return copy.sort((a, b) => a.title.localeCompare(b.title));
}

function showFastLibraryStage() {
  document.body.dataset.stage = 'library';
  if ($('libraryView')) $('libraryView').hidden = false;
  if ($('coverPage')) $('coverPage').hidden = true;
  $('pagesWrapper')?.classList.remove('active');
  $('backCover')?.classList.remove('show');
  if ($('pageNav')) $('pageNav').hidden = true;
  $('readerChrome')?.classList.remove('is-reading');
  if ($('proofRibbon')) $('proofRibbon').hidden = true;
  if ($('loader')) $('loader').hidden = true;
  if ($('homeFromEnd')) $('homeFromEnd').textContent = 'Shelf';
  if ($('shelfError')) $('shelfError').hidden = true;
  document.documentElement.lang = 'en';
  document.documentElement.dataset.bookselfRole = 'shelf';
  document.title = 'Sven Hardy Benson’s Shelf — Reader';
}

function ensureReaderCore() {
  if (readerCorePromise) return readerCorePromise;
  readerCorePromise = import(readerCoreUrl)
    .then(() => {
      readerCoreLoaded = true;
      return true;
    })
    .catch((error) => {
      readerCorePromise = null;
      console.error('Shelf Reader core failed', error);
      if ($('loader')) $('loader').hidden = true;
      const message = $('shelfError');
      if (message) {
        message.hidden = false;
        message.textContent = 'The book reader could not be loaded. Reload this page to try again.';
      }
      throw error;
    });
  return readerCorePromise;
}

function ensureLibrarySearchModules() {
  if (librarySearchModulesPromise) return librarySearchModulesPromise;
  librarySearchModulesPromise = Promise.all([
    import('./catalog.js'),
    import('./search.js'),
    import('./router.js'),
  ]).then(([catalog, search, router]) => ({
    parseBookReadme: catalog.parseBookReadme,
    searchLibrary: search.searchLibrary,
    coverHash: router.coverHash,
    readHash: router.readHash,
  }));
  return librarySearchModulesPromise;
}

async function loadSearchBook(entry, parseBookReadme) {
  if (searchBookCache.has(entry.slug)) return searchBookCache.get(entry.slug);
  const pending = (async () => {
    const response = await fetch(new URL(`../../books/${entry.slug}/README.md`, import.meta.url));
    if (!response.ok) throw new Error(`Search metadata failed (${response.status})`);
    const meta = parseBookReadme(await response.text(), entry.slug);
    const chapters = await Promise.all((meta.contents || []).map(async (chapter) => {
      try {
        const chapterResponse = await fetch(new URL(`../../books/${entry.slug}/${chapter.file}`, import.meta.url));
        if (!chapterResponse.ok) throw new Error(`Chapter request failed (${chapterResponse.status})`);
        return { ...chapter, markdown: await chapterResponse.text(), missing: false };
      } catch {
        return { ...chapter, markdown: '', missing: true };
      }
    }));
    return { ...meta, chapters };
  })();
  searchBookCache.set(entry.slug, pending);
  try {
    return await pending;
  } catch (error) {
    searchBookCache.delete(entry.slug);
    throw error;
  }
}

async function loadSearchBooks(entries, parseBookReadme) {
  const books = new Array(entries.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(5, entries.length) }, async () => {
    while (next < entries.length) {
      const index = next++;
      try {
        books[index] = await loadSearchBook(entries[index], parseBookReadme);
      } catch (error) {
        console.warn('Skip search publication', entries[index].slug, error);
      }
    }
  }));
  return books.filter(Boolean);
}

function renderLibrarySearchHits(hits, modules) {
  const box = $('libraryHits');
  if (!box) return;
  box.innerHTML = '';
  box.dataset.searchState = hits.length ? 'ready' : 'empty';
  box.hidden = false;
  if (!hits.length) {
    const li = document.createElement('li');
    li.className = 'search-empty';
    li.textContent = 'No titles or passages.';
    box.appendChild(li);
    return;
  }
  for (const hit of hits) {
    const li = document.createElement('li');
    li.dataset.searchKind = hit.chapter ? 'passage' : 'title';
    const a = document.createElement('a');
    const slug = hit.book.slug;
    a.href = hit.chapter
      ? modules.readHash(slug, hit.chapter, hit.offset || 0)
      : modules.coverHash(slug);
    const detail = hit.chapter
      ? [hit.title, hit.snippet].filter(Boolean).join(' — ')
      : (hit.snippet || hit.title);
    a.innerHTML = `<strong>${escapeHtml(hit.book.title)}</strong><em>${escapeHtml(detail)}</em>`;
    const warm = () => ensureReaderCore().catch(() => {});
    a.addEventListener('pointerdown', warm, { once: true, passive: true });
    a.addEventListener('click', warm, { once: true });
    li.appendChild(a);
    box.appendChild(li);
  }
}

async function runFastLibrarySearch(value) {
  const box = $('libraryHits');
  if (!box || readerCoreLoaded) return;
  const query = String(value || '').trim();
  const epoch = ++librarySearchEpoch;
  if (query.length < 2) {
    box.hidden = true;
    box.innerHTML = '';
    delete box.dataset.searchState;
    return;
  }

  box.hidden = false;
  box.dataset.searchState = 'loading';
  box.innerHTML = '<li class="search-empty">Searching titles and passages…</li>';

  try {
    const modules = await ensureLibrarySearchModules();
    const books = await loadSearchBooks(fastEntries.slice(), modules.parseBookReadme);
    if (epoch !== librarySearchEpoch || String($('librarySearch')?.value || '').trim() !== query) return;
    renderLibrarySearchHits(modules.searchLibrary(books, query), modules);
  } catch (error) {
    if (epoch !== librarySearchEpoch) return;
    console.error('Shelf library search failed', error);
    box.dataset.searchState = 'error';
    box.innerHTML = '<li class="search-empty">Passage search could not be loaded. Title filtering still works.</li>';
  }
}

function volumeElement(entry) {
  const a = document.createElement('a');
  a.className = 'volume';
  a.href = `#/b/${entry.slug}/`;
  a.style.setProperty('--cloth', clothColor(entry.slug));
  a.style.setProperty('--block', '7px');
  a.innerHTML = `
    <span class="volume-spine"></span>
    <span class="volume-block"></span>
    <span class="volume-cover">
      <span class="volume-title">${escapeHtml(entry.title)}</span>
      <span class="volume-author">Sven Hardy Benson</span>
      <span class="volume-open">Open</span>
    </span>`;
  const warm = () => {
    if ($('loader')) $('loader').hidden = false;
    ensureReaderCore();
  };
  a.addEventListener('pointerdown', warm, { once: true, passive: true });
  a.addEventListener('click', warm, { once: true });
  return a;
}

function renderFastShelf() {
  if (!libraryRouteRequested()) return;
  showFastLibraryStage();
  const shelf = $('shelf');
  const empty = $('emptyShelf');
  if (!shelf || !empty) return;
  const query = String($('librarySearch')?.value || '').trim().toLowerCase();
  const entries = sortedEntries(fastEntries).filter((entry) => (
    !query || entry.title.toLowerCase().includes(query) || entry.slug.includes(query)
  ));
  $('stacks')?.replaceChildren();
  shelf.replaceChildren(...entries.map(volumeElement));
  empty.hidden = entries.length > 0;
  empty.textContent = query
    ? 'No title matches. Passage matches appear above.'
    : (fastEntries.length ? 'No matching publications.' : 'Loading publications…');
}

async function ensureRecentRanks() {
  if (recentRanks.size) return recentRanks;
  if (recentRanksPromise) return recentRanksPromise;
  recentRanksPromise = (async () => {
    try {
      const response = await fetch(catalogUrl, { cache: 'no-cache' });
      if (!response.ok) return recentRanks;
      const manifest = await response.json();
      if (!Array.isArray(manifest?.books)) return recentRanks;
      recentRanks = new Map(manifest.books.map((slug, index) => [String(slug), index]));
      return recentRanks;
    } catch {
      return recentRanks;
    } finally {
      recentRanksPromise = null;
    }
  })();
  return recentRanksPromise;
}

function bindFastLibraryControls() {
  const search = $('librarySearch');
  if (search && !search.dataset.fastShelfBound) {
    search.dataset.fastShelfBound = 'true';
    const prepare = () => ensureLibrarySearchModules().catch(() => {});
    search.addEventListener('pointerdown', prepare, { once: true, passive: true });
    search.addEventListener('focus', prepare, { once: true });
    search.addEventListener('input', () => {
      renderFastShelf();
      if (!readerCoreLoaded) runFastLibrarySearch(search.value);
    });
  }
  document.querySelectorAll('[data-sort]').forEach((button) => {
    if (button.dataset.fastShelfBound) return;
    button.dataset.fastShelfBound = 'true';
    button.addEventListener('click', async () => {
      sortMode = button.dataset.sort === 'recent' ? 'recent' : 'title';
      document.querySelectorAll('[data-sort]').forEach((peer) => peer.classList.toggle('active', peer === button));
      if (sortMode === 'recent') await ensureRecentRanks();
      renderFastShelf();
    });
  });
}

async function refreshFastCatalog() {
  try {
    const response = await fetch(readmeUrl, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const entries = parseReleasedBooks(await response.text());
    if (!entries.length) throw new Error('No released publications were found in the Shelf README.');
    fastEntries = entries;
    saveFastCatalog(entries);
    renderFastShelf();
  } catch (error) {
    console.error('Shelf fast catalog failed', error);
    if (!fastEntries.length && $('emptyShelf')) {
      $('emptyShelf').hidden = false;
      $('emptyShelf').textContent = 'The Shelf catalog could not be loaded. Reload to try again.';
    }
  }
}

function scheduleAfterFirstPaint(task, timeout = 900) {
  const run = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(task, { timeout });
    else window.setTimeout(task, Math.min(timeout, 500));
  };
  window.requestAnimationFrame(() => window.requestAnimationFrame(run));
}

function scheduleShelfWorker() {
  if (!('serviceWorker' in navigator)) return;
  scheduleAfterFirstPaint(() => {
    navigator.serviceWorker
      .register(new URL('../sw.js', import.meta.url), { updateViaCache: 'none' })
      .then((registration) => registration.update().catch(() => {}))
      .catch((error) => console.warn('Shelf service worker could not be updated', error));
  }, 2400);
}

function fastLibraryRouteGuard(event) {
  if (!libraryRouteRequested()) return;
  if (readerCoreLoaded) event.stopImmediatePropagation();
  renderFastShelf();
}

window.addEventListener('hashchange', fastLibraryRouteGuard, true);
window.addEventListener('popstate', fastLibraryRouteGuard, true);

bindFastLibraryControls();
scheduleShelfWorker();
if ($('homeFromEnd')) $('homeFromEnd').textContent = 'Shelf';

if (bookRouteRequested()) {
  ensureReaderCore();
} else {
  const cached = readFastCatalog();
  if (cached.length) {
    fastEntries = cached;
    renderFastShelf();
    scheduleAfterFirstPaint(() => refreshFastCatalog(), 1200);
  } else {
    if ($('emptyShelf')) {
      $('emptyShelf').hidden = false;
      $('emptyShelf').textContent = 'Loading publications…';
    }
    refreshFastCatalog();
  }
}
