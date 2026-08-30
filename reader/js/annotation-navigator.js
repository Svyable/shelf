import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { loadNotes, removeNote, saveNotes } from './notes.js';
import { go, parseRoute, readHash } from './router.js';
import {
  filterNotes,
  neighboringNoteIndex,
  noteStatus,
  noteTarget,
  orderNotes,
} from './annotation-navigator-model.js';

const STYLE_HREF = 'css/annotation-navigator.css?v=r1';
const chapterCache = new Map();
let rows = [];
let visibleRows = [];
let selectedId = null;
let pendingLandingId = null;
let landingTimer = 0;

function $(id) {
  return document.getElementById(id);
}

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

async function chapterInfo(slug) {
  if (!slug) return { order: [], titles: {} };
  if (chapterCache.has(slug)) return chapterCache.get(slug);
  const pending = fetchText(`books/${slug}/README.md`)
    .then((markdown) => {
      const contents = parseBookReadme(markdown, slug).contents || [];
      return {
        order: contents.map((chapter) => chapter.id),
        titles: Object.fromEntries(contents.map((chapter) => [chapter.id, chapter.title || chapter.id])),
      };
    })
    .catch(() => ({ order: [], titles: {} }));
  chapterCache.set(slug, pending);
  return pending;
}

function ensureUi() {
  if ($('notesOverlay')) return;
  const tocButton = $('tocBtn');
  if (tocButton && !$('notesBtn')) {
    const button = document.createElement('button');
    button.className = 'header-btn notes-header-btn';
    button.id = 'notesBtn';
    button.type = 'button';
    button.title = 'Notes and highlights';
    button.setAttribute('aria-label', 'Notes and highlights');
    button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg><span class="notes-count" id="notesCount" hidden></span>`;
    tocButton.insertAdjacentElement('afterend', button);
  }

  const overlay = document.createElement('div');
  overlay.className = 'stats-overlay notes-overlay';
  overlay.id = 'notesOverlay';
  overlay.innerHTML = `
    <section class="stats-card notes-card" aria-labelledby="notesHeading">
      <header class="notes-card-header">
        <div>
          <p class="notes-kicker">Reread and research</p>
          <h3 id="notesHeading">Notes &amp; highlights</h3>
        </div>
        <button class="stats-close notes-close" id="notesClose" type="button" aria-label="Close notes">Close</button>
      </header>
      <label class="notes-search-wrap" for="notesSearch">
        <span class="sr-only">Search notes and highlights</span>
        <input type="search" id="notesSearch" placeholder="Search quotes or notes…" autocomplete="off">
      </label>
      <div class="notes-layout">
        <div class="notes-browser">
          <p class="notes-summary" id="notesSummary"></p>
          <ol class="notes-results" id="notesResults"></ol>
          <p class="notes-empty" id="notesEmpty" hidden>No matching notes.</p>
        </div>
        <section class="note-inspector" id="noteInspector" aria-label="Selected note" hidden>
          <div class="note-inspector-nav">
            <button type="button" class="ghost-btn" id="notePrev">Previous</button>
            <span id="notePosition" aria-live="polite"></span>
            <button type="button" class="ghost-btn" id="noteNext">Next</button>
          </div>
          <p class="note-chapter" id="noteChapter"></p>
          <blockquote class="note-quote" id="noteInspectorQuote"></blockquote>
          <label class="note-editor-label" for="noteInspectorBody">Your note</label>
          <textarea id="noteInspectorBody" rows="5" placeholder="Add a thought…"></textarea>
          <div class="note-inspector-actions">
            <button type="button" class="ghost-btn" id="noteJump">Go to highlight</button>
            <button type="button" class="ghost-btn" id="noteUpdate">Save note</button>
            <button type="button" class="ghost-btn danger" id="noteDelete">Delete</button>
          </div>
        </section>
      </div>
      <p class="sr-only" id="notesLive" aria-live="polite" aria-atomic="true"></p>
    </section>`;
  document.body.appendChild(overlay);
}

function announce(message) {
  const live = $('notesLive');
  if (!live) return;
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = message; });
}

function updateHeaderCount() {
  const route = parseRoute();
  const count = route.slug ? loadNotes(route.slug).length : 0;
  const badge = $('notesCount');
  if (!badge) return;
  badge.hidden = count === 0;
  badge.textContent = count > 99 ? '99+' : String(count);
  $('notesBtn')?.setAttribute('aria-label', count ? `Notes and highlights, ${count}` : 'Notes and highlights');
}

function selectedIndex() {
  return visibleRows.findIndex((note) => note.id === selectedId);
}

function renderInspector(titles) {
  const inspector = $('noteInspector');
  const index = selectedIndex();
  const note = index >= 0 ? visibleRows[index] : null;
  if (!inspector) return;
  inspector.hidden = !note;
  if (!note) return;
  $('notePosition').textContent = noteStatus(index, visibleRows.length);
  $('noteChapter').textContent = titles[note.chapter] || note.chapter || 'Unknown chapter';
  $('noteInspectorQuote').textContent = note.quote || 'Highlight';
  $('noteInspectorBody').value = note.body || '';
}

function renderList(titles) {
  const list = $('notesResults');
  if (!list) return;
  list.innerHTML = '';
  visibleRows.forEach((note, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'note-result';
    button.dataset.noteId = note.id;
    button.setAttribute('aria-current', note.id === selectedId ? 'true' : 'false');
    const chapter = document.createElement('span');
    chapter.className = 'note-result-chapter';
    chapter.textContent = titles[note.chapter] || note.chapter || 'Unknown chapter';
    const quote = document.createElement('span');
    quote.className = 'note-result-quote';
    quote.textContent = note.quote || 'Highlight';
    const body = document.createElement('span');
    body.className = 'note-result-body';
    body.textContent = note.body || 'Highlight only';
    const number = document.createElement('span');
    number.className = 'sr-only';
    number.textContent = `${noteStatus(index, visibleRows.length)}. `;
    button.append(number, chapter, quote, body);
    item.appendChild(button);
    list.appendChild(item);
  });
  $('notesEmpty').hidden = visibleRows.length !== 0;
  $('notesSummary').textContent = visibleRows.length === rows.length
    ? `${rows.length} saved ${rows.length === 1 ? 'annotation' : 'annotations'}`
    : `${visibleRows.length} of ${rows.length} annotations`;
  renderInspector(titles);
}

async function refresh({ preserveSelection = true } = {}) {
  const route = parseRoute();
  updateHeaderCount();
  if (!route.slug) {
    rows = [];
    visibleRows = [];
    selectedId = null;
    renderList({});
    return;
  }
  const info = await chapterInfo(route.slug);
  rows = orderNotes(loadNotes(route.slug), info.order);
  const query = $('notesSearch')?.value || '';
  visibleRows = filterNotes(rows, query, info.titles);
  if (!preserveSelection || !visibleRows.some((note) => note.id === selectedId)) {
    selectedId = visibleRows[0]?.id || null;
  }
  renderList(info.titles);
}

function selectByIndex(index) {
  const note = visibleRows[index];
  if (!note) return;
  selectedId = note.id;
  void chapterInfo(parseRoute().slug).then((info) => {
    renderList(info.titles);
    document.querySelector(`.note-result[data-note-id="${CSS.escape(note.id)}"]`)?.scrollIntoView({ block: 'nearest' });
  });
}

function refreshRenderedHighlights() {
  window.dispatchEvent(new Event('resize'));
}

function updateSelectedNote() {
  const route = parseRoute();
  if (!route.slug || !selectedId) return;
  const notes = loadNotes(route.slug);
  const index = notes.findIndex((note) => note.id === selectedId);
  if (index < 0) return;
  notes[index] = { ...notes[index], body: $('noteInspectorBody')?.value.trim() || '' };
  saveNotes(route.slug, notes);
  refreshRenderedHighlights();
  void refresh();
  announce('Note saved');
}

function deleteSelectedNote() {
  const route = parseRoute();
  if (!route.slug || !selectedId) return;
  if (!window.confirm('Delete this note and highlight?')) return;
  const oldIndex = selectedIndex();
  removeNote(route.slug, selectedId);
  selectedId = null;
  refreshRenderedHighlights();
  void refresh({ preserveSelection: false }).then(() => {
    if (visibleRows.length) selectByIndex(Math.min(oldIndex, visibleRows.length - 1));
    announce('Note deleted');
  });
}

function findLandingMark(id) {
  if (!id) return null;
  const marks = [...document.querySelectorAll(`mark.note-mark[data-note-id="${CSS.escape(id)}"]`)]
    .filter((mark) => mark.getClientRects().length > 0);
  return marks[0] || null;
}

function focusLanding() {
  clearTimeout(landingTimer);
  if (!pendingLandingId) return false;
  const mark = findLandingMark(pendingLandingId);
  if (!mark) return false;
  const id = pendingLandingId;
  pendingLandingId = null;
  mark.tabIndex = -1;
  mark.dataset.noteLanding = 'true';
  const rect = mark.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    mark.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  mark.focus({ preventScroll: true });
  window.setTimeout(() => {
    if (mark.dataset.noteLanding === 'true') delete mark.dataset.noteLanding;
  }, 2400);
  announce(`Highlight: ${mark.textContent?.replace(/\s+/g, ' ').trim() || 'selected passage'}`);
  return id;
}

function scheduleLanding() {
  clearTimeout(landingTimer);
  const attempt = (delays, index = 0) => {
    if (focusLanding() || index >= delays.length) return;
    landingTimer = window.setTimeout(() => attempt(delays, index + 1), delays[index]);
  };
  requestAnimationFrame(() => attempt([50, 140, 320, 700]));
}

function jumpToSelected() {
  const route = parseRoute();
  const note = visibleRows[selectedIndex()];
  const target = noteTarget(note);
  if (!route.slug || !note || !target) return;
  pendingLandingId = note.id;
  $('notesClose')?.click();
  go(readHash(route.slug, target.chapter, target.offset));
  scheduleLanding();
}

function bindEvents() {
  $('notesBtn')?.addEventListener('click', () => {
    void refresh({ preserveSelection: false }).then(() => {
      $('notesOverlay')?.classList.add('active');
    });
  });
  $('notesClose')?.addEventListener('click', () => $('notesOverlay')?.classList.remove('active'));
  $('notesSearch')?.addEventListener('input', () => void refresh({ preserveSelection: false }));
  $('notesResults')?.addEventListener('click', (event) => {
    const button = event.target.closest('.note-result[data-note-id]');
    if (!button) return;
    selectedId = button.dataset.noteId;
    void chapterInfo(parseRoute().slug).then((info) => renderList(info.titles));
  });
  $('notePrev')?.addEventListener('click', () => selectByIndex(neighboringNoteIndex(selectedIndex(), visibleRows.length, -1)));
  $('noteNext')?.addEventListener('click', () => selectByIndex(neighboringNoteIndex(selectedIndex(), visibleRows.length, 1)));
  $('noteUpdate')?.addEventListener('click', updateSelectedNote);
  $('noteDelete')?.addEventListener('click', deleteSelectedNote);
  $('noteJump')?.addEventListener('click', jumpToSelected);
  window.addEventListener('hashchange', () => {
    updateHeaderCount();
    if (pendingLandingId) scheduleLanding();
  });
  window.addEventListener('storage', (event) => {
    if (event.key?.endsWith(':notes')) void refresh();
  });
}

function initialize() {
  installStyles();
  ensureUi();
  bindEvents();
  updateHeaderCount();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
}
