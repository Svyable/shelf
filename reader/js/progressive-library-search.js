import { fetchText } from './base.js';
import { parsePortalCatalog, parseBookReadme } from './catalog.js';
import { searchLibrary } from './search.js';
import { coverHash, readHash } from './router.js';
import {
  createQueryGeneration,
  normalizeQuery,
  queryEligible,
  runBounded,
  searchConcurrency,
  stageLabel,
} from './progressive-library-search-model.js';

const generations = createQueryGeneration();
const metadataBySlug = new Map();
const metadataSeen = new Set();
const bookCache = new Map();
let slugsPromise = null;
let debounceTimer = 0;
let installed = false;

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function portalSlugs() {
  if (!slugsPromise) {
    slugsPromise = fetchText('README.md').then(parsePortalCatalog).catch((error) => {
      slugsPromise = null;
      throw error;
    });
  }
  return slugsPromise;
}

async function loadMetadata(slug) {
  if (metadataSeen.has(slug)) return metadataBySlug.get(slug) || null;
  metadataSeen.add(slug);
  try {
    const hub = await fetchText(`books/${slug}/README.md`);
    const meta = parseBookReadme(hub, slug);
    if (!meta.published) return null;
    metadataBySlug.set(slug, meta);
    return meta;
  } catch {
    return null;
  }
}

async function loadBook(meta, chapterConcurrency, isCurrent) {
  if (bookCache.has(meta.slug)) return bookCache.get(meta.slug);
  const chapters = new Array(meta.contents.length);
  await runBounded(meta.contents, async (chapter, index) => {
    if (!isCurrent()) return;
    try {
      const markdown = await fetchText(`books/${meta.slug}/${chapter.file}`);
      chapters[index] = { ...chapter, markdown, missing: false };
    } catch {
      chapters[index] = {
        ...chapter,
        markdown: `# ${chapter.title}\n\nThis chapter file is missing from the repository.\n`,
        missing: true,
      };
    }
  }, { concurrency: chapterConcurrency, shouldContinue: isCurrent });
  if (!isCurrent() || chapters.some((chapter) => !chapter)) return null;
  const book = { ...meta, chapters };
  bookCache.set(meta.slug, book);
  return book;
}

function statusItem(text) {
  return text ? `<li class="library-search-status" role="status">${escapeHtml(text)}</li>` : '';
}

function render(box, books, query, stage) {
  if (!box) return;
  const hits = searchLibrary(books, query);
  const status = stageLabel({ ...stage, matches: hits.length });
  box.hidden = false;
  box.setAttribute('aria-busy', String(!stage.passageComplete));
  const rows = hits.map((hit) => {
    const slug = hit.book.slug;
    const href = hit.chapter
      ? readHash(slug, hit.chapter, hit.offset || 0)
      : coverHash(slug);
    return `<li><a href="${escapeHtml(href)}"><strong>${escapeHtml(hit.book.title)}</strong><em>${escapeHtml(hit.snippet || hit.title)}</em></a></li>`;
  }).join('');
  box.innerHTML = rows + statusItem(status);
  if (!rows && !status) box.hidden = true;
}

function prioritizedBooks(metadata, query) {
  const ranked = searchLibrary(metadata.map((book) => ({ ...book, chapters: [] })), query)
    .filter((hit) => hit.type === 'book')
    .map((hit) => hit.book.slug);
  const priority = new Map(ranked.map((slug, index) => [slug, index]));
  return metadata.slice().sort((a, b) => {
    const ar = priority.has(a.slug) ? priority.get(a.slug) : Number.MAX_SAFE_INTEGER;
    const br = priority.has(b.slug) ? priority.get(b.slug) : Number.MAX_SAFE_INTEGER;
    return ar - br || a.title.localeCompare(b.title);
  });
}

async function runQuery(box, rawQuery, generation) {
  const query = normalizeQuery(rawQuery);
  const isCurrent = () => generations.isCurrent(generation);
  if (!queryEligible(query)) return;
  const concurrency = searchConcurrency(navigator.connection || {});
  render(box, [], query, { metadataComplete: false, passageComplete: false });

  let slugs;
  try {
    slugs = await portalSlugs();
  } catch {
    if (!isCurrent()) return;
    box.removeAttribute('aria-busy');
    box.hidden = false;
    box.innerHTML = statusItem('Library search is temporarily unavailable.');
    return;
  }
  if (!isCurrent()) return;

  const existing = slugs.map((slug) => metadataBySlug.get(slug)).filter(Boolean);
  if (existing.length) render(box, existing.map((book) => ({ ...book, chapters: [] })), query, {
    metadataComplete: slugs.every((slug) => metadataSeen.has(slug)),
    passageComplete: false,
  });

  const missing = slugs.filter((slug) => !metadataSeen.has(slug));
  await runBounded(missing, async (slug) => {
    await loadMetadata(slug);
    if (!isCurrent()) return;
    const metadata = slugs.map((value) => metadataBySlug.get(value)).filter(Boolean);
    render(box, metadata.map((book) => ({ ...book, chapters: [] })), query, {
      metadataComplete: false,
      passageComplete: false,
    });
  }, { concurrency: concurrency.metadata, shouldContinue: isCurrent });
  if (!isCurrent()) return;

  const metadata = slugs.map((slug) => metadataBySlug.get(slug)).filter(Boolean);
  const loadedBooks = metadata.map((meta) => bookCache.get(meta.slug) || { ...meta, chapters: [] });
  render(box, loadedBooks, query, { metadataComplete: true, passageComplete: false });

  const candidates = prioritizedBooks(metadata, query).filter((meta) => !bookCache.has(meta.slug));
  await runBounded(candidates, async (meta) => {
    const book = await loadBook(meta, concurrency.chapters, isCurrent);
    if (!book || !isCurrent()) return;
    const books = metadata.map((row) => bookCache.get(row.slug) || { ...row, chapters: [] });
    render(box, books, query, { metadataComplete: true, passageComplete: false });
  }, { concurrency: concurrency.books, shouldContinue: isCurrent });
  if (!isCurrent()) return;

  const books = metadata.map((meta) => bookCache.get(meta.slug) || { ...meta, chapters: [] });
  render(box, books, query, { metadataComplete: true, passageComplete: true });
  box.removeAttribute('aria-busy');
}

function clear(box) {
  generations.next();
  window.clearTimeout(debounceTimer);
  if (!box) return;
  box.hidden = true;
  box.innerHTML = '';
  box.removeAttribute('aria-busy');
}

export function installProgressiveLibrarySearch(root = document) {
  if (installed || !root?.addEventListener) return;
  installed = true;
  root.addEventListener('input', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.id !== 'librarySearch') return;
    event.stopImmediatePropagation();
    const box = document.getElementById('libraryHits');
    const query = normalizeQuery(input.value);
    if (!queryEligible(query)) {
      clear(box);
      return;
    }
    const generation = generations.next();
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      runQuery(box, query, generation).catch((error) => {
        if (!generations.isCurrent(generation)) return;
        console.warn('Progressive library search failed', error);
        if (box) {
          box.removeAttribute('aria-busy');
          box.hidden = false;
          box.innerHTML = statusItem('Library search is temporarily unavailable.');
        }
      });
    }, 120);
  }, true);
}

if (typeof document !== 'undefined') installProgressiveLibrarySearch(document);
