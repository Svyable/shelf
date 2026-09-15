const DIRECT_COVER_OPENING_TEXT = 'Opening full book…';

function directCoverRoute() {
  if (typeof window === 'undefined') return null;
  const query = new URLSearchParams(window.location.search || '');
  const querySlug = query.get('b');
  if (querySlug && !query.get('c')) return { slug: querySlug };

  const raw = String(window.location.hash || '#/').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  if (parts[0] !== 'b' || !parts[1] || parts[2]) return null;
  try {
    return { slug: decodeURIComponent(parts[1]) };
  } catch {
    return null;
  }
}

function readerRepoBase() {
  const path = String(window.location.pathname || '/').replace(/index\.html$/, '');
  if (path.endsWith('/reader/') || path.endsWith('/reader')) return path.replace(/reader\/?$/, '');
  const index = path.indexOf('/reader/');
  if (index >= 0) return path.slice(0, index + 1);
  return path.endsWith('/') ? path : `${path}/`;
}

function directCoverStillRequested(slug) {
  return directCoverRoute()?.slug === slug;
}

function finishDirectCoverPreviewWhenCanonical(meta, start, dock) {
  if (!meta || typeof MutationObserver === 'undefined') return;
  const observer = new MutationObserver(() => {
    if (meta.textContent === DIRECT_COVER_OPENING_TEXT) return;
    if (start) {
      start.disabled = false;
      delete start.dataset.directCoverPreview;
    }
    if (dock) dock.hidden = false;
    observer.disconnect();
  });
  observer.observe(meta, { childList: true, characterData: true, subtree: true });
}

export async function installDirectCoverFirstPaint() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return { status: 'skipped' };
  const route = directCoverRoute();
  if (!route?.slug) return { status: 'skipped' };

  const title = document.getElementById('coverTitle');
  if (document.body?.dataset.stage === 'cover' && title?.textContent?.trim()) {
    return { status: 'ready' };
  }

  try {
    const response = await fetch(
      `${readerRepoBase()}books/${encodeURIComponent(route.slug)}/README.md`,
      { cache: 'no-cache' }
    );
    if (!response.ok) return { status: 'failed' };
    const markdown = await response.text();
    if (!directCoverStillRequested(route.slug)) return { status: 'superseded' };

    const { parseBookReadme, clothColor } = await import('./catalog.js');
    const book = parseBookReadme(markdown, route.slug);
    if (!directCoverStillRequested(route.slug)) return { status: 'superseded' };

    const cover = document.getElementById('coverPage');
    if (!cover || !title) return { status: 'unavailable' };

    document.body.dataset.stage = 'cover';
    document.getElementById('libraryView')?.setAttribute('hidden', '');
    cover.hidden = false;
    cover.classList.remove('opened');
    document.getElementById('pagesWrapper')?.classList.remove('active');
    document.getElementById('backCover')?.classList.remove('show');
    const pageNav = document.getElementById('pageNav');
    if (pageNav) pageNav.hidden = true;
    document.getElementById('readerChrome')?.classList.remove('is-reading');
    const loader = document.getElementById('loader');
    if (loader) loader.hidden = true;

    title.textContent = book.title || route.slug;
    const subtitle = document.getElementById('coverSubtitle');
    if (subtitle) subtitle.textContent = book.subtitle || '';
    const author = document.getElementById('coverAuthor');
    if (author) author.textContent = String(book.authors || '').replace(/@/g, '').trim();
    const imprint = [book.publisher, book.edition].filter(Boolean).join(' · ');
    const imprintNode = document.getElementById('coverImprint');
    if (imprintNode) imprintNode.textContent = imprint;
    const backImprint = document.getElementById('backImprint');
    if (backImprint) backImprint.textContent = imprint;
    const backTitle = document.getElementById('backTitle');
    if (backTitle) backTitle.textContent = book.title || route.slug;
    const backAuthor = document.getElementById('backAuthor');
    if (backAuthor) backAuthor.textContent = String(book.authors || '').replace(/@/g, '').trim();

    const draft = !book.published;
    const draftBadge = document.getElementById('draftBadge');
    if (draftBadge) draftBadge.hidden = !draft;
    document.body.classList.toggle('is-draft', draft);
    const proofRibbon = document.getElementById('proofRibbon');
    if (proofRibbon) proofRibbon.hidden = !draft;

    const face = document.getElementById('coverFront');
    if (face) face.style.setProperty('--cloth', clothColor(book.slug));

    const meta = document.getElementById('coverMeta');
    if (meta) meta.textContent = DIRECT_COVER_OPENING_TEXT;
    const start = document.getElementById('startBtn');
    if (start) {
      start.disabled = true;
      start.dataset.directCoverPreview = 'true';
      start.textContent = 'Opening…';
    }
    const dock = document.getElementById('coverDock');
    if (dock) dock.hidden = true;
    finishDirectCoverPreviewWhenCanonical(meta, start, dock);
    document.title = book.title || document.title;
    return { status: 'shown', slug: route.slug };
  } catch (error) {
    console.warn('Direct-cover first paint could not be shown', error);
    return { status: 'failed' };
  }
}

function scheduleDirectCoverFirstPaint() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  queueMicrotask(() => installDirectCoverFirstPaint());
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  scheduleDirectCoverFirstPaint();
  window.addEventListener('hashchange', scheduleDirectCoverFirstPaint);
  window.addEventListener('popstate', scheduleDirectCoverFirstPaint);
}

export function orderedPublicationFiles(contents = [], targetChapter = null) {
  const rows = Array.isArray(contents) ? contents.filter((row) => row?.file) : [];
  if (!rows.length) return [];
  const targetIndex = targetChapter
    ? rows.findIndex((row) => row.id === targetChapter)
    : -1;
  if (targetIndex < 0) return rows.slice();
  if (targetIndex === 0) return rows.slice();

  // A deep-linked reader is overwhelmingly likely to continue forward. Warm a
  // small reading corridor around the target before returning to publication
  // order so the next chapter is not stuck behind unrelated front matter.
  const priorityIndexes = [targetIndex, targetIndex + 1, targetIndex + 2, targetIndex - 1]
    .filter((index) => index >= 0 && index < rows.length);
  const seen = new Set(priorityIndexes);
  return [
    ...priorityIndexes.map((index) => rows[index]),
    ...rows.filter((_row, index) => !seen.has(index)),
  ];
}

export function startupAcquisitionPlan(connection = {}) {
  const effectiveType = String(connection?.effectiveType || '').toLowerCase();
  const constrained = !!connection?.saveData || effectiveType === 'slow-2g' || effectiveType === '2g';
  if (constrained) {
    return Object.freeze({
      primeCatalog: false,
      catalogConcurrency: 0,
      warmPublicationRemainder: false,
      publicationConcurrency: 1,
    });
  }
  if (effectiveType === '3g') {
    return Object.freeze({
      primeCatalog: true,
      catalogConcurrency: 2,
      warmPublicationRemainder: true,
      publicationConcurrency: 1,
    });
  }
  return Object.freeze({
    primeCatalog: true,
    catalogConcurrency: 8,
    warmPublicationRemainder: true,
    publicationConcurrency: 4,
  });
}

export function publicationPrefetchDepth(intent = 'route') {
  return intent === 'hover' || intent === 'focus' ? 'target' : 'publication';
}

export async function runBounded(items, worker, { concurrency = 2 } = {}) {
  const queue = Array.isArray(items) ? items.slice() : [];
  const limit = Math.max(1, Math.floor(Number(concurrency) || 1));
  let cursor = 0;
  const results = new Array(queue.length);

  async function lane() {
    while (cursor < queue.length) {
      const index = cursor++;
      try {
        results[index] = { status: 'fulfilled', value: await worker(queue[index], index) };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, lane));
  return results;
}

export function createStartupPublicationPrimer({
  loadReadme,
  parseReadme,
  loadChapter,
  concurrency = 2,
  warmRemainder = true,
} = {}) {
  if (typeof loadReadme !== 'function' || typeof parseReadme !== 'function' || typeof loadChapter !== 'function') {
    throw new TypeError('startup publication primer requires readme, parser, and chapter loaders');
  }

  const active = new Map();

  function prime({ slug, chapter = null, intent = 'route' } = {}) {
    if (!slug) return Promise.resolve({ status: 'skipped', loaded: 0 });
    const depth = publicationPrefetchDepth(intent);
    const key = `${slug}:${chapter || ''}:${depth}`;
    if (active.has(key)) return active.get(key);

    const promise = (async () => {
      const readme = await loadReadme(slug);
      const meta = parseReadme(readme, slug);
      const ordered = orderedPublicationFiles(meta?.contents, chapter);
      if (!ordered.length) return { status: 'complete', loaded: 0, depth };

      // Resolve the requested/first chapter before any speculative warming.
      await loadChapter(slug, ordered[0]);
      const rest = ordered.slice(1);
      const connectionAllowsRemainder = typeof warmRemainder === 'function'
        ? !!warmRemainder({ slug, chapter: ordered[0], meta, intent })
        : !!warmRemainder;
      const allowRemainder = depth === 'publication' && connectionAllowsRemainder;
      if (!allowRemainder || !rest.length) {
        return {
          status: 'complete',
          loaded: 1,
          failed: 0,
          deferred: rest.length,
          first: ordered[0].id || ordered[0].file,
          depth,
        };
      }

      const settled = await runBounded(rest, (item) => loadChapter(slug, item), { concurrency });
      return {
        status: 'complete',
        loaded: 1 + settled.filter((entry) => entry?.status === 'fulfilled').length,
        failed: settled.filter((entry) => entry?.status === 'rejected').length,
        deferred: 0,
        first: ordered[0].id || ordered[0].file,
        depth,
      };
    })();

    active.set(key, promise);
    const clear = () => {
      if (active.get(key) === promise) active.delete(key);
    };
    promise.then(clear, clear);
    return promise;
  }

  return Object.freeze({ prime });
}
