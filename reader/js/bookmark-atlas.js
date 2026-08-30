import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { loadBookmarks, saveBookmarks } from './storage.js';
import { go, parseRoute, readHash } from './router.js';
import {
  adjacentBookmark,
  bookmarkExcerpt,
  bookmarkKey,
  bookmarkPositionLabel,
  filterBookmarkEntries,
  hasBookmark,
  normalizeBookmarks,
  sortBookmarks,
  toggleBookmark,
} from './bookmark-atlas-model.js';

const STYLE_HREF = 'css/bookmark-atlas.css?v=r1';
const publicationCache = new Map();
let dialog = null;
let list = null;
let search = null;
let status = null;
let countBadge = null;
let opener = null;
let entries = [];
let chapterOrder = [];

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function currentPoint() {
  const route = parseRoute();
  if (document.body.dataset.stage !== 'read' || route.view !== 'read' || !route.slug || !route.chapter || route.chapter === 'back-cover') {
    return null;
  }
  return { slug: route.slug, chapter: route.chapter, offset: Math.max(0, Number(route.offset) || 0) };
}

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.setTimeout(() => {
    if (el.textContent === message) el.hidden = true;
  }, 1800);
}

function syncBookmarkButton() {
  const button = document.getElementById('bookmarkBtn');
  const point = currentPoint();
  const marks = point ? loadBookmarks(point.slug) : [];
  const active = !!point && hasBookmark(marks, point);
  if (button) {
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.title = active ? 'Remove bookmark' : 'Bookmark this passage';
    button.setAttribute('aria-label', active ? 'Remove bookmark' : 'Bookmark this passage');
  }
  syncAtlasButton(point?.slug || parseRoute().slug || '');
}

function syncAtlasButton(slug = '') {
  const button = document.getElementById('bookmarkAtlasBtn');
  if (!button) return;
  const total = slug ? normalizeBookmarks(loadBookmarks(slug)).length : 0;
  if (countBadge) {
    countBadge.textContent = String(total);
    countBadge.hidden = total === 0;
  }
  button.setAttribute('aria-label', total ? `Bookmarks, ${total}` : 'Bookmarks');
  button.title = total ? `Bookmarks (${total})` : 'Bookmarks';
}

function toggleCurrentBookmark() {
  const point = currentPoint();
  if (!point) return false;
  const result = toggleBookmark(loadBookmarks(point.slug), point);
  if (!result.changed) return false;
  saveBookmarks(point.slug, result.bookmarks);
  toast(result.added ? 'Bookmark added' : 'Bookmark removed');
  syncBookmarkButton();
  if (dialog?.open) void refreshDialog();
  return true;
}

async function publication(slug) {
  if (publicationCache.has(slug)) return publicationCache.get(slug);
  const pending = (async () => {
    const readme = await fetchText(`books/${slug}/README.md`);
    const meta = parseBookReadme(readme, slug);
    const chapters = new Map();
    await Promise.all(meta.contents.map(async (chapter) => {
      const markdown = await fetchText(`books/${slug}/${chapter.file}`).catch(() => '');
      chapters.set(chapter.id, { ...chapter, markdown });
    }));
    return { meta, chapters };
  })();
  publicationCache.set(slug, pending);
  return pending;
}

async function buildEntries(slug) {
  const marks = normalizeBookmarks(loadBookmarks(slug));
  if (!marks.length) {
    chapterOrder = [];
    return [];
  }
  const book = await publication(slug);
  chapterOrder = book.meta.contents.map((chapter) => chapter.id);
  return sortBookmarks(marks, chapterOrder).map((bookmark) => {
    const chapter = book.chapters.get(bookmark.chapter);
    return {
      ...bookmark,
      key: bookmarkKey(bookmark),
      chapterTitle: chapter?.title || bookmark.chapter,
      excerpt: bookmarkExcerpt(chapter?.markdown || '', bookmark.offset),
    };
  });
}

function focusReadingSurface() {
  const scroll = document.documentElement.dataset.readerMode === 'scroll';
  const target = scroll
    ? document.querySelector('#scrollReader:not([hidden])')
    : document.querySelector('#pagesWrapper .page-surface.active') || document.getElementById('pagesWrapper');
  if (!target) return;
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  requestAnimationFrame(() => {
    try { target.focus({ preventScroll: true }); } catch { target.focus(); }
  });
}

function closeDialog(value = 'close') {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close(value);
  else {
    dialog.removeAttribute('open');
    dialog.dispatchEvent(new Event('close'));
  }
}

function goToBookmark(bookmark) {
  const route = parseRoute();
  if (!route.slug || !bookmark) return;
  closeDialog('navigate');
  go(readHash(route.slug, bookmark.chapter, bookmark.offset));
  requestAnimationFrame(() => requestAnimationFrame(focusReadingSurface));
}

function removeBookmark(bookmark) {
  const route = parseRoute();
  if (!route.slug) return;
  const key = bookmarkKey(bookmark);
  const next = normalizeBookmarks(loadBookmarks(route.slug)).filter((item) => bookmarkKey(item) !== key);
  saveBookmarks(route.slug, next);
  toast('Bookmark removed');
  syncBookmarkButton();
  void refreshDialog();
}

function card(entry, index, total) {
  const li = document.createElement('li');
  li.className = 'bookmark-atlas-item';
  li.dataset.bookmarkKey = entry.key;

  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'bookmark-atlas-card';
  open.innerHTML = `
    <span class="bookmark-atlas-chapter"></span>
    <span class="bookmark-atlas-excerpt"></span>
    <span class="bookmark-atlas-position"></span>`;
  open.querySelector('.bookmark-atlas-chapter').textContent = entry.chapterTitle;
  open.querySelector('.bookmark-atlas-excerpt').textContent = entry.excerpt || 'Saved passage';
  open.querySelector('.bookmark-atlas-position').textContent = bookmarkPositionLabel(index, total);
  open.setAttribute('aria-label', `${bookmarkPositionLabel(index, total)}. ${entry.chapterTitle}. ${entry.excerpt || 'Saved passage'}`);
  open.addEventListener('click', () => goToBookmark(entry));

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'bookmark-atlas-remove';
  remove.textContent = 'Remove';
  remove.setAttribute('aria-label', `Remove bookmark in ${entry.chapterTitle}`);
  remove.addEventListener('click', () => removeBookmark(entry));

  li.append(open, remove);
  return li;
}

function renderEntries() {
  if (!list || !status) return;
  const filtered = filterBookmarkEntries(entries, search?.value || '');
  list.replaceChildren();
  filtered.forEach((entry, index) => list.appendChild(card(entry, index, filtered.length)));
  const total = entries.length;
  status.textContent = !total
    ? 'No bookmarks yet. Save a passage with the bookmark button or B.'
    : filtered.length === total
      ? `${total} bookmark${total === 1 ? '' : 's'}`
      : `${filtered.length} of ${total} bookmarks`;
  list.hidden = filtered.length === 0;
  dialog?.querySelector('.bookmark-atlas-empty')?.toggleAttribute('hidden', filtered.length !== 0);
}

async function refreshDialog() {
  if (!dialog?.open) return;
  const route = parseRoute();
  if (!route.slug) return;
  status.textContent = 'Loading bookmarks…';
  entries = await buildEntries(route.slug).catch(() => []);
  renderEntries();
  syncAtlasButton(route.slug);
}

function stepBookmark(direction) {
  const route = parseRoute();
  if (!route.slug) return;
  const target = adjacentBookmark(loadBookmarks(route.slug), route, chapterOrder, direction);
  if (target) goToBookmark(target);
}

function ensureDialog() {
  if (dialog) return;
  dialog = document.createElement('dialog');
  dialog.id = 'bookmarkAtlasDialog';
  dialog.className = 'bookmark-atlas-dialog';
  dialog.innerHTML = `
    <div class="bookmark-atlas-shell">
      <header class="bookmark-atlas-head">
        <div><p class="bookmark-atlas-eyebrow">Reading map</p><h2>Bookmarks</h2></div>
        <button type="button" class="bookmark-atlas-close" aria-label="Close bookmarks">×</button>
      </header>
      <div class="bookmark-atlas-tools">
        <input type="search" class="bookmark-atlas-search" placeholder="Search saved passages…" autocomplete="off">
        <div class="bookmark-atlas-step" role="group" aria-label="Move between bookmarks">
          <button type="button" data-bookmark-step="-1">Previous</button>
          <button type="button" data-bookmark-step="1">Next</button>
        </div>
      </div>
      <p class="bookmark-atlas-status" role="status" aria-live="polite"></p>
      <p class="bookmark-atlas-empty" hidden>No matching bookmarks.</p>
      <ol class="bookmark-atlas-list"></ol>
    </div>`;
  document.body.appendChild(dialog);
  list = dialog.querySelector('.bookmark-atlas-list');
  search = dialog.querySelector('.bookmark-atlas-search');
  status = dialog.querySelector('.bookmark-atlas-status');
  dialog.querySelector('.bookmark-atlas-close').addEventListener('click', () => closeDialog('close'));
  dialog.querySelectorAll('[data-bookmark-step]').forEach((button) => {
    button.addEventListener('click', () => stepBookmark(Number(button.dataset.bookmarkStep)));
  });
  search.addEventListener('input', renderEntries);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog('backdrop');
  });
  dialog.addEventListener('close', () => {
    if (dialog.returnValue !== 'navigate' && opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') return;
    if (!['ArrowDown', 'ArrowUp'].includes(event.key) || event.target === search) return;
    const cards = [...dialog.querySelectorAll('.bookmark-atlas-card')];
    if (!cards.length) return;
    const index = cards.indexOf(document.activeElement);
    if (index < 0) return;
    const next = event.key === 'ArrowDown'
      ? (index + 1 + cards.length) % cards.length
      : (index - 1 + cards.length) % cards.length;
    event.preventDefault();
    cards[next].focus();
  });
}

function openAtlas(source) {
  ensureDialog();
  opener = source || document.activeElement;
  if (!dialog.open) {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else {
      dialog.setAttribute('open', '');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('role', 'dialog');
    }
  }
  search.value = '';
  void refreshDialog().then(() => search.focus());
}

function ensureAtlasButton() {
  if (document.getElementById('bookmarkAtlasBtn')) return;
  const toggle = document.getElementById('bookmarkBtn');
  if (!toggle?.parentElement) return;
  const button = document.createElement('button');
  button.id = 'bookmarkAtlasBtn';
  button.className = 'header-btn bookmark-atlas-button';
  button.type = 'button';
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M6 4h10a2 2 0 0 1 2 2v14l-7-4-7 4V6a2 2 0 0 1 2-2z"/><path d="M8 8h6M8 11h6"/>
    </svg><span class="bookmark-atlas-count" aria-hidden="true">0</span>`;
  countBadge = button.querySelector('.bookmark-atlas-count');
  button.addEventListener('click', () => openAtlas(button));
  toggle.after(button);
}

function install() {
  if (document.documentElement.dataset.bookmarkAtlasReady === 'true') return;
  document.documentElement.dataset.bookmarkAtlasReady = 'true';
  installStyles();
  ensureAtlasButton();
  ensureDialog();

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('#bookmarkBtn');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    toggleCurrentBookmark();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (dialog?.open && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeDialog('close');
      return;
    }
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'b' || event.key === 'B') {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.shiftKey) openAtlas(document.getElementById('bookmarkAtlasBtn'));
      else toggleCurrentBookmark();
    }
  }, true);

  ['hashchange', 'popstate'].forEach((type) => window.addEventListener(type, () => requestAnimationFrame(syncBookmarkButton), { passive: true }));
  new MutationObserver(() => requestAnimationFrame(syncBookmarkButton)).observe(document.body, {
    attributes: true,
    attributeFilter: ['data-stage'],
  });
  syncBookmarkButton();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
