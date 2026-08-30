import { navigationHistoryState } from './reading-trail-model.js';

/** Routes: hash #/b/<slug>/<chapter>/<offset> and query ?b=&c=&o= */

export function parseHash(hash = window.location.hash) {
  const raw = (hash || '#/').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  if (parts[0] !== 'b' || !parts[1]) {
    return { view: 'library', slug: null, chapter: null, offset: 0 };
  }
  const slug = decodeURIComponent(parts[1]);
  const chapter = parts[2] ? decodeURIComponent(parts[2]) : null;
  const offset = parts[3] ? Math.max(0, parseInt(parts[3], 10) || 0) : 0;
  if (!chapter) return { view: 'cover', slug, chapter: null, offset: 0 };
  return { view: 'read', slug, chapter, offset };
}

export function parseQuery(search = window.location.search) {
  const q = new URLSearchParams(search);
  const slug = q.get('b');
  if (!slug) return null;
  const chapter = q.get('c');
  const offset = Math.max(0, parseInt(q.get('o') || '0', 10) || 0);
  if (!chapter) return { view: 'cover', slug, chapter: null, offset: 0 };
  return { view: 'read', slug, chapter, offset };
}

export function parseRoute() {
  return parseQuery() || parseHash();
}

export function libraryHash() {
  return '#/';
}

export function coverHash(slug) {
  return `#/b/${encodeURIComponent(slug)}/`;
}

export function readHash(slug, chapter, offset = 0) {
  return `#/b/${encodeURIComponent(slug)}/${encodeURIComponent(chapter)}/${Math.max(0, offset | 0)}`;
}

function queryFor(route) {
  if (!route.slug || route.view === 'library') return '';
  const q = new URLSearchParams();
  q.set('b', route.slug);
  if (route.chapter) q.set('c', route.chapter);
  if (route.offset) q.set('o', String(route.offset));
  return `?${q.toString()}`;
}

function withHash(hash) {
  return hash.startsWith('#') ? hash : `#${hash}`;
}

export function go(hash, { replace = false } = {}) {
  const next = withHash(hash);
  const route = parseHash(next);
  const fromRoute = parseRoute();
  const search = queryFor(route);
  const url = `${window.location.pathname}${search}${next}`;
  const here = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (url === here) return;

  const state = navigationHistoryState(history.state, fromRoute, route, { replace });
  if (replace) history.replaceState(state, '', url);
  else history.pushState(state, '', url);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  import('./reading-trail.js').catch(() => {});
  import('./bookmark-atlas.js').catch(() => {});
  import('./scroll-performance.js').catch(() => {});
}
