import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { searchBook } from './search.js';
import { parseRoute, readHash, go } from './router.js';
import {
  COOPERATIVE_SEARCH_POLICY,
  prioritizedChapterIds,
  mergeRankedHits,
  isCurrentSearch,
  searchProgress,
} from './cooperative-search-model.js';

import('./search-landing.js').catch((error) => {
  console.warn('Search landing context could not be loaded', error);
});

export function nextSearchIndex(current, total, command) {
  if (!Number.isInteger(total) || total <= 0) return -1;
  const start = Number.isInteger(current) && current >= 0 && current < total ? current : -1;
  if (command === 'first') return 0;
  if (command === 'last') return total - 1;
  if (command === 'next') return start < 0 ? 0 : (start + 1) % total;
  if (command === 'previous') return start < 0 ? total - 1 : (start - 1 + total) % total;
  if (command === 'page-next') return start < 0 ? 0 : Math.min(total - 1, start + 5);
  if (command === 'page-previous') return start < 0 ? total - 1 : Math.max(0, start - 5);
  return start;
}

export function searchResultSummary(rows = []) {
  const chapters = new Set();
  for (const row of rows) {
    const chapter = String(row?.chapter || '').trim();
    if (chapter) chapters.add(chapter);
  }
  return {
    results: rows.length,
    chapters: chapters.size,
    label: rows.length
      ? `${rows.length} ${rows.length === 1 ? 'passage' : 'passages'} · ${chapters.size} ${chapters.size === 1 ? 'chapter' : 'chapters'}`
      : 'No passages',
  };
}

export function hrefMatchesHash(href, hash) {
  if (!href || !hash) return false;
  try {
    const url = new URL(href, 'https://bookself.invalid/');
    return url.hash === hash;
  } catch {
    return false;
  }
}

function ensureStylesheet() {
  if (!document.querySelector('link[data-search-navigation]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../css/search-navigation.css', import.meta.url).href;
    link.dataset.searchNavigation = 'true';
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[data-search-landing]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../css/search-landing.css', import.meta.url).href;
    link.dataset.searchLanding = 'true';
    document.head.appendChild(link);
  }
}

const publicationCache = new Map();
let searchEpoch = 0;
let activeQuery = '';

async function loadPublication(slug) {
  if (publicationCache.has(slug)) return publicationCache.get(slug);
  const promise = fetchText(`books/${slug}/README.md`).then((readme) => {
    const meta = parseBookReadme(readme, slug);
    return {
      slug,
      contents: meta.contents || [],
      chapters: new Map(),
    };
  });
  publicationCache.set(slug, promise);
  try {
    return await promise;
  } catch (error) {
    publicationCache.delete(slug);
    throw error;
  }
}

async function loadChapter(publication, entry) {
  if (publication.chapters.has(entry.id)) return publication.chapters.get(entry.id);
  const promise = fetchText(`books/${publication.slug}/${entry.file}`).then((markdown) => ({
    ...entry,
    markdown,
  }));
  publication.chapters.set(entry.id, promise);
  try {
    return await promise;
  } catch (error) {
    publication.chapters.delete(entry.id);
    throw error;
  }
}

function yieldToReader() {
  if (globalThis.scheduler?.yield) return globalThis.scheduler.yield();
  if (typeof requestIdleCallback === 'function') {
    return new Promise((resolve) => requestIdleCallback(resolve, { timeout: COOPERATIVE_SEARCH_POLICY.idleTimeoutMs }));
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function installSearchNavigation() {
  const overlay = document.getElementById('searchOverlay');
  const card = overlay?.querySelector('.search-card');
  const input = document.getElementById('bookSearch');
  const list = document.getElementById('searchHits');
  if (!overlay || !card || !input || !list || card.querySelector('.search-session')) return;
  ensureStylesheet();

  const session = document.createElement('div');
  session.className = 'search-session';
  session.innerHTML = `
    <p class="search-session-status" id="searchSessionStatus" aria-live="polite">Type at least 2 characters</p>
    <div class="search-session-actions" aria-label="Search result navigation">
      <button type="button" data-search-move="previous" aria-label="Previous search result">↑</button>
      <button type="button" data-search-move="next" aria-label="Next search result">↓</button>
      <button type="button" data-search-open disabled>Open</button>
    </div>`;
  list.insertAdjacentElement('beforebegin', session);

  const status = session.querySelector('#searchSessionStatus');
  const openButton = session.querySelector('[data-search-open]');
  const moveButtons = [...session.querySelectorAll('[data-search-move]')];
  const state = { active: -1, links: [], hits: [] };

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'searchHits');
  input.setAttribute('aria-expanded', 'false');
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Search results');

  const rows = () => state.links.map((link) => ({
    chapter: link.dataset.chapter || link.querySelector('strong')?.textContent?.trim() || '',
  }));

  const paint = ({ announce = false } = {}) => {
    state.links.forEach((link, index) => {
      const active = index === state.active;
      link.classList.toggle('is-search-active', active);
      link.setAttribute('aria-selected', String(active));
      if (active) input.setAttribute('aria-activedescendant', link.id);
    });
    if (state.active < 0) input.removeAttribute('aria-activedescendant');
    input.setAttribute('aria-expanded', String(state.links.length > 0 && overlay.classList.contains('active')));
    openButton.disabled = state.active < 0;
    moveButtons.forEach((button) => { button.disabled = state.links.length === 0; });

    const summary = searchResultSummary(rows());
    if (input.value.trim().length < 2) {
      status.textContent = 'Type at least 2 characters';
    } else if (list.dataset.searching === 'true') {
      status.textContent = list.dataset.searchProgress || 'Searching…';
    } else if (state.active >= 0) {
      status.textContent = `${state.active + 1} of ${summary.results} · ${summary.chapters} ${summary.chapters === 1 ? 'chapter' : 'chapters'}`;
    } else {
      status.textContent = summary.label;
    }

    if (state.active >= 0) state.links[state.active]?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    if (announce && state.active >= 0) {
      const active = state.links[state.active];
      const title = active?.querySelector('strong')?.textContent?.trim();
      const snippet = active?.querySelector('em')?.textContent?.trim();
      status.textContent = `${state.active + 1} of ${summary.results}${title ? ` · ${title}` : ''}${snippet ? ` · ${snippet}` : ''}`;
    }
  };

  const select = (command, { announce = true } = {}) => {
    state.active = nextSearchIndex(state.active, state.links.length, command);
    paint({ announce });
  };

  const syncLinks = () => {
    const previousHref = state.active >= 0 ? state.links[state.active]?.getAttribute('href') : '';
    state.links = [...list.querySelectorAll('a[href]')];
    state.links.forEach((link, index) => {
      link.id = `searchResult${index + 1}`;
      link.setAttribute('role', 'option');
    });
    const current = state.links.findIndex((link) => hrefMatchesHash(link.href, window.location.hash));
    const previous = previousHref ? state.links.findIndex((link) => link.getAttribute('href') === previousHref) : -1;
    state.active = current >= 0 ? current : previous >= 0 ? previous : state.links.length ? 0 : -1;
    paint();
  };

  const renderHits = (hits) => {
    const fragment = document.createDocumentFragment();
    for (const hit of hits) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = readHash(parseRoute().slug, hit.chapter, hit.offset);
      a.dataset.chapter = hit.chapter;
      const strong = document.createElement('strong');
      strong.textContent = hit.title;
      const em = document.createElement('em');
      em.textContent = hit.snippet;
      a.append(strong, em);
      a.addEventListener('click', (event) => {
        event.preventDefault();
        overlay.classList.remove('active');
        go(a.getAttribute('href'));
      });
      li.appendChild(a);
      fragment.appendChild(li);
    }
    list.replaceChildren(fragment);
  };

  const finishSearch = (epoch, query, { failed = false } = {}) => {
    if (!isCurrentSearch(epoch, searchEpoch, query, activeQuery)) return;
    list.dataset.searching = 'false';
    list.removeAttribute('aria-busy');
    if (!state.hits.length) list.innerHTML = `<li>${failed ? 'Search could not finish.' : 'No passages found.'}</li>`;
    syncLinks();
  };

  const runCooperativeSearch = async (query) => {
    const q = query.trim();
    const epoch = ++searchEpoch;
    activeQuery = q;
    state.hits = [];
    state.active = -1;
    list.replaceChildren();
    if (q.length < 2) {
      list.dataset.searching = 'false';
      list.removeAttribute('aria-busy');
      syncLinks();
      return;
    }
    const route = parseRoute();
    if (!route.slug) {
      finishSearch(epoch, q, { failed: true });
      return;
    }
    list.dataset.searching = 'true';
    list.setAttribute('aria-busy', 'true');
    list.dataset.searchProgress = 'Preparing search…';
    paint();
    try {
      const publication = await loadPublication(route.slug);
      if (!isCurrentSearch(epoch, searchEpoch, q, activeQuery)) return;
      const byId = new Map(publication.contents.map((entry) => [entry.id, entry]));
      const order = prioritizedChapterIds(publication.contents, route.chapter);
      let completed = 0;
      for (const id of order) {
        if (!isCurrentSearch(epoch, searchEpoch, q, activeQuery)) return;
        const entry = byId.get(id);
        if (!entry) continue;
        try {
          const chapter = await loadChapter(publication, entry);
          if (!isCurrentSearch(epoch, searchEpoch, q, activeQuery)) return;
          const hits = searchBook({ chapters: [chapter] }, q);
          state.hits = mergeRankedHits(state.hits, hits);
          renderHits(state.hits);
        } catch (error) {
          console.warn('Skip chapter during search', entry.id, error);
        }
        completed += 1;
        const progress = searchProgress(completed, order.length, state.hits.length);
        list.dataset.searchProgress = progress.label;
        syncLinks();
        await yieldToReader();
      }
      finishSearch(epoch, q);
    } catch (error) {
      console.warn('Cooperative search could not load publication', error);
      finishSearch(epoch, q, { failed: true });
    }
  };

  input.addEventListener('input', (event) => {
    event.stopImmediatePropagation();
    runCooperativeSearch(event.target.value);
  }, true);

  input.addEventListener('keydown', (event) => {
    const commands = { ArrowDown: 'next', ArrowUp: 'previous', PageDown: 'page-next', PageUp: 'page-previous', Home: 'first', End: 'last' };
    const command = commands[event.key];
    if (command && state.links.length) {
      event.preventDefault();
      select(command);
      return;
    }
    if (event.key === 'Enter' && state.active >= 0) {
      event.preventDefault();
      state.links[state.active]?.click();
    }
  });

  moveButtons.forEach((button) => {
    button.addEventListener('click', () => {
      select(button.dataset.searchMove);
      input.focus({ preventScroll: true });
    });
  });
  openButton.addEventListener('click', () => state.links[state.active]?.click());
  new MutationObserver(syncLinks).observe(list, { childList: true, subtree: true });
  new MutationObserver(() => paint()).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('hashchange', () => {
    searchEpoch += 1;
    syncLinks();
  });
  syncLinks();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installSearchNavigation, { once: true });
  else installSearchNavigation();
}
