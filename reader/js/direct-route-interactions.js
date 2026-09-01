import { addNote, applyNotes, loadNotes, selectionSourceAnchor } from './notes.js';
import { parseRoute } from './router.js';
import { loadBookmarks, saveBookmarks } from './storage.js';
import {
  normalizePreviewSelection,
  previewInteractionState,
  previewVisibleOffset,
  togglePreviewBookmark,
} from './direct-route-interaction-model.js';

const STYLE_ID = 'directRouteInteractionStyle';
const TOOLBAR_CLASS = 'direct-route-preview-tools';
const SELECTION_CLASS = 'direct-route-preview-selection-tools';
let pendingNote = null;

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.setTimeout(() => {
    if (el.textContent === message) el.hidden = true;
  }, 1800);
}

function installStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .${TOOLBAR_CLASS}{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin-top:.75rem}
    .${TOOLBAR_CLASS} button,.${SELECTION_CLASS} button{font:inherit;color:inherit;border:1px solid color-mix(in srgb,currentColor 28%,transparent);background:color-mix(in srgb,var(--paper,#fff) 90%,transparent);border-radius:999px;min-height:2.35rem;padding:.42rem .8rem;cursor:pointer}
    .${TOOLBAR_CLASS} button[aria-pressed="true"]{font-weight:700;border-color:currentColor}
    .direct-route-preview-tool-status{font-size:.82em;opacity:.72;min-height:1.2em}
    .${SELECTION_CLASS}{position:fixed;z-index:140;display:flex;gap:.35rem;padding:.38rem;border-radius:999px;background:var(--paper,#fff);box-shadow:0 8px 32px rgba(0,0,0,.2);border:1px solid color-mix(in srgb,currentColor 22%,transparent)}
    .${SELECTION_CLASS}[hidden]{display:none}
    .${SELECTION_CLASS} button{min-height:2.3rem;background:transparent;border-color:transparent}
    @media (max-width:640px),(pointer:coarse){
      .${TOOLBAR_CLASS} button,.${SELECTION_CLASS} button{min-height:44px;min-width:44px}
      .${SELECTION_CLASS}{left:max(8px,env(safe-area-inset-left));right:max(8px,env(safe-area-inset-right));bottom:max(10px,calc(env(safe-area-inset-bottom) + 8px));justify-content:center;border-radius:1rem}
    }
    @media (max-height:520px) and (orientation:landscape){.${TOOLBAR_CLASS}{gap:.35rem;margin-top:.45rem}.direct-route-preview-tool-status{display:none}}
    @media (prefers-reduced-motion:reduce){.${SELECTION_CLASS}{transition:none}}
    @media (forced-colors:active){.${TOOLBAR_CLASS} button,.${SELECTION_CLASS},.${SELECTION_CLASS} button{forced-color-adjust:auto;border-color:ButtonText}}
  `;
  document.head.appendChild(style);
}

function routeContext(region) {
  const route = parseRoute();
  const chapter = region.querySelector('.direct-route-preview-block')?.dataset.chapter || route.chapter || '';
  return {
    slug: route.slug || '',
    chapter,
    routeMatches: !!route.slug && (!route.chapter || !chapter || route.chapter === chapter),
  };
}

function visibleOffset(region) {
  const paper = region.querySelector('.direct-route-preview-paper');
  if (!paper) return 0;
  const rect = paper.getBoundingClientRect();
  const focusY = rect.top + Math.min(144, Math.max(52, paper.clientHeight * 0.2));
  const entries = [...region.querySelectorAll('.direct-route-preview-block')].map((block) => {
    const blockRect = block.getBoundingClientRect();
    return {
      start: Number(block.dataset.previewSourceStart),
      top: blockRect.top,
      bottom: blockRect.bottom,
    };
  });
  return previewVisibleOffset(entries, focusY, Number(parseRoute().offset) || 0);
}

function refreshHighlights(region, slug, chapter) {
  const notes = loadNotes(slug);
  const body = region.querySelector('.direct-route-preview-body');
  if (body) applyNotes(body, notes, chapter);
  document.querySelectorAll('.page-inner').forEach((root) => applyNotes(root, notes, chapter));
  document.querySelectorAll(`.scroll-chapter[data-chapter="${CSS.escape(chapter)}"]`)
    .forEach((root) => applyNotes(root, notes, chapter));
}

function bookmarkLabel(active) {
  return active ? 'Remove bookmark from this passage' : 'Bookmark this passage';
}

function updateBookmark(region, button, status) {
  const { slug, chapter, routeMatches } = routeContext(region);
  const state = previewInteractionState({
    stage: document.body?.dataset.stage,
    hasPreview: region.isConnected,
    routeMatches,
  });
  button.disabled = !state.canBookmark || !slug || !chapter;
  if (button.disabled) return;
  const offset = visibleOffset(region);
  const active = loadBookmarks(slug).some((bookmark) => bookmark.chapter === chapter && Number(bookmark.offset) === offset);
  button.setAttribute('aria-pressed', active ? 'true' : 'false');
  button.textContent = active ? 'Bookmarked' : 'Bookmark';
  button.setAttribute('aria-label', bookmarkLabel(active));
  button.dataset.offset = String(offset);
  if (status && status.dataset.locked !== 'true') status.textContent = `Passage ${offset.toLocaleString()} ready for notes or bookmarking.`;
}

function toggleBookmark(region, button, status) {
  const { slug, chapter, routeMatches } = routeContext(region);
  const state = previewInteractionState({ stage: document.body?.dataset.stage, hasPreview: true, routeMatches });
  if (!state.canBookmark || !slug || !chapter) return;
  const offset = visibleOffset(region);
  const next = togglePreviewBookmark(loadBookmarks(slug), { chapter, offset });
  if (!next.changed) return;
  saveBookmarks(slug, next.bookmarks);
  status.dataset.locked = 'true';
  status.textContent = next.active ? 'Bookmark saved. It will be available in the full Reader.' : 'Bookmark removed.';
  button.setAttribute('aria-pressed', next.active ? 'true' : 'false');
  button.textContent = next.active ? 'Bookmarked' : 'Bookmark';
  button.setAttribute('aria-label', bookmarkLabel(next.active));
  window.setTimeout(() => {
    status.dataset.locked = 'false';
    updateBookmark(region, button, status);
  }, 1800);
}

function selectionInside(region) {
  const selection = window.getSelection?.();
  if (!selection?.rangeCount || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  const node = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  if (!node?.closest?.('#directRoutePreview')) return null;
  return normalizePreviewSelection(selection.toString(), selectionSourceAnchor(selection));
}

function positionSelectionTools(tools, range) {
  if (matchMedia('(max-width:640px), (pointer:coarse)').matches) {
    tools.style.left = '';
    tools.style.top = '';
    return;
  }
  const rect = range.getBoundingClientRect();
  const width = tools.offsetWidth || 250;
  const height = tools.offsetHeight || 44;
  const vv = window.visualViewport;
  const leftBase = vv?.offsetLeft || 0;
  const topBase = vv?.offsetTop || 0;
  const vw = vv?.width || window.innerWidth;
  const vh = vv?.height || window.innerHeight;
  const left = Math.min(leftBase + vw - width - 8, Math.max(leftBase + 8, rect.left + rect.width / 2 - width / 2));
  const above = rect.top - height - 10;
  const top = above >= topBase + 8 ? above : Math.min(topBase + vh - height - 8, rect.bottom + 10);
  tools.style.left = `${Math.round(left)}px`;
  tools.style.top = `${Math.round(top)}px`;
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied');
  } catch {
    toast('Could not copy');
  }
}

function saveSelection(region, selection, body = '') {
  const { slug, chapter, routeMatches } = routeContext(region);
  const state = previewInteractionState({
    stage: document.body?.dataset.stage,
    hasPreview: true,
    routeMatches,
    selection,
  });
  if (!state.canAnnotate || !slug || !chapter) return false;
  addNote(slug, {
    chapter,
    offset: selection.offset,
    quote: selection.quote,
    body,
    anchor: selection.anchor,
  });
  refreshHighlights(region, slug, chapter);
  window.dispatchEvent(new Event('resize'));
  return true;
}

function installSelectionTools(region) {
  const tools = document.createElement('div');
  tools.className = SELECTION_CLASS;
  tools.hidden = true;
  tools.setAttribute('role', 'toolbar');
  tools.setAttribute('aria-label', 'Selected passage actions');
  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.textContent = 'Copy';
  const highlightBtn = document.createElement('button');
  highlightBtn.type = 'button';
  highlightBtn.textContent = 'Highlight';
  const noteBtn = document.createElement('button');
  noteBtn.type = 'button';
  noteBtn.textContent = 'Note';
  tools.append(copyBtn, highlightBtn, noteBtn);
  region.appendChild(tools);
  let current = null;

  const update = () => {
    const normalized = selectionInside(region);
    const selection = window.getSelection?.();
    if (!normalized || !selection?.rangeCount) {
      if (!tools.contains(document.activeElement)) {
        tools.hidden = true;
        current = null;
      }
      return;
    }
    current = normalized;
    tools.hidden = false;
    positionSelectionTools(tools, selection.getRangeAt(0));
  };
  document.addEventListener('selectionchange', update);
  region.addEventListener('pointerup', () => requestAnimationFrame(update), { passive: true });

  copyBtn.addEventListener('click', () => {
    if (current) void copy(current.quote);
    tools.hidden = true;
  });
  highlightBtn.addEventListener('click', () => {
    if (current && saveSelection(region, current)) toast('Highlight saved');
    window.getSelection?.()?.removeAllRanges?.();
    tools.hidden = true;
  });
  noteBtn.addEventListener('click', () => {
    if (!current) return;
    const context = routeContext(region);
    if (!context.slug || !context.chapter) return;
    pendingNote = { region, selection: current, ...context };
    const quote = document.getElementById('noteQuote');
    const body = document.getElementById('noteBody');
    if (quote) quote.textContent = current.quote;
    if (body) body.value = '';
    document.getElementById('noteDialog')?.classList.add('active');
    body?.focus();
    tools.hidden = true;
  });

  const parent = region.parentElement;
  const cleanup = new MutationObserver(() => {
    if (region.isConnected) return;
    document.removeEventListener('selectionchange', update);
    cleanup.disconnect();
  });
  if (parent) cleanup.observe(parent, { childList: true });
}

function bindPreview(region) {
  if (!region || region.dataset.interactionsBound === 'true') return;
  region.dataset.interactionsBound = 'true';
  installStyles();
  const heading = region.querySelector('.direct-route-preview-heading');
  const paper = region.querySelector('.direct-route-preview-paper');
  if (!heading || !paper) return;

  const toolbar = document.createElement('div');
  toolbar.className = TOOLBAR_CLASS;
  toolbar.setAttribute('role', 'group');
  toolbar.setAttribute('aria-label', 'Early reading actions');
  const bookmark = document.createElement('button');
  bookmark.type = 'button';
  bookmark.textContent = 'Bookmark';
  bookmark.setAttribute('aria-pressed', 'false');
  const status = document.createElement('span');
  status.className = 'direct-route-preview-tool-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  toolbar.append(bookmark, status);
  heading.appendChild(toolbar);

  bookmark.addEventListener('click', () => toggleBookmark(region, bookmark, status));
  let raf = 0;
  paper.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => updateBookmark(region, bookmark, status));
  }, { passive: true });
  region.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('input, textarea, select, button, [contenteditable="true"]')) return;
    if (event.key === 'b' || event.key === 'B') {
      event.preventDefault();
      event.stopPropagation();
      toggleBookmark(region, bookmark, status);
    }
  }, true);

  installSelectionTools(region);
  updateBookmark(region, bookmark, status);
}

function bindAddedPreview(node) {
  if (!(node instanceof Element)) return;
  if (node.id === 'directRoutePreview') bindPreview(node);
  node.querySelectorAll?.('#directRoutePreview').forEach(bindPreview);
}

function install() {
  document.querySelectorAll('#directRoutePreview').forEach(bindPreview);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach(bindAddedPreview);
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

document.addEventListener('click', (event) => {
  if (!pendingNote) return;
  if (event.target.closest?.('#noteCancel')) {
    pendingNote = null;
    return;
  }
  if (!event.target.closest?.('#noteSave')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const pending = pendingNote;
  pendingNote = null;
  const body = document.getElementById('noteBody')?.value.trim() || '';
  if (saveSelection(pending.region, pending.selection, body)) toast('Note saved');
  document.getElementById('noteDialog')?.classList.remove('active');
}, true);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') pendingNote = null;
}, true);

install();
