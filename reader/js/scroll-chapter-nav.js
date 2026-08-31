import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute, readHash, go } from './router.js';
import {
  chapterNavigationState,
  chapterNavigatorVisible,
  chapterShortcutAction,
} from './scroll-chapter-nav-model.js';

const STYLE_HREF = 'css/scroll-chapter-nav.css?v=r1';
const manifests = new Map();
let root = null;
let renderToken = 0;
let observer = null;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function overlaysOpen() {
  return !!document.querySelector(
    'dialog[open], #tocOverlay.active, #progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active'
  );
}

function visibleState() {
  return chapterNavigatorVisible({
    stage: document.body.dataset.stage || '',
    mode: document.documentElement.dataset.readerMode || 'paged',
    chromeHidden: document.body.classList.contains('reader-chrome-hidden'),
    overlayOpen: overlaysOpen(),
  });
}

function ensureUi() {
  if (root?.isConnected) return root;
  const app = document.querySelector('.app');
  if (!app) return null;
  root = document.createElement('nav');
  root.id = 'scrollChapterNavigator';
  root.className = 'scroll-chapter-nav';
  root.hidden = true;
  root.setAttribute('aria-label', 'Chapter navigation');
  root.innerHTML = `
    <button type="button" class="scroll-chapter-nav-button" data-chapter-action="previous" aria-label="Previous chapter" title="Previous chapter · Alt+↑">
      <span aria-hidden="true">‹</span>
    </button>
    <div class="scroll-chapter-nav-center" aria-live="polite" aria-atomic="true">
      <span class="scroll-chapter-nav-title" id="scrollChapterTitle">Chapter</span>
      <span class="scroll-chapter-nav-count" id="scrollChapterCount"></span>
    </div>
    <button type="button" class="scroll-chapter-nav-button" data-chapter-action="next" aria-label="Next chapter" title="Next chapter · Alt+↓">
      <span aria-hidden="true">›</span>
    </button>`;
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-chapter-action]');
    if (!button || button.disabled) return;
    navigate(button.dataset.chapterAction);
  });
  app.appendChild(root);
  return root;
}

async function manifestFor(slug) {
  if (!slug) return null;
  if (!manifests.has(slug)) {
    manifests.set(slug, fetchText(`books/${slug}/README.md`)
      .then((markdown) => parseBookReadme(markdown, slug))
      .catch((error) => {
        manifests.delete(slug);
        throw error;
      }));
  }
  return manifests.get(slug);
}

async function render() {
  ensureUi();
  if (!root) return;
  const token = ++renderToken;
  const route = parseRoute();
  if (!visibleState() || route.view !== 'read' || !route.slug) {
    root.hidden = true;
    return;
  }
  root.hidden = false;
  root.dataset.loading = 'true';
  try {
    const book = await manifestFor(route.slug);
    if (token !== renderToken || !visibleState()) return;
    const latestRoute = parseRoute();
    if (latestRoute.view !== 'read' || latestRoute.slug !== route.slug) return;
    const state = chapterNavigationState(book?.contents || [], latestRoute.chapter || '');
    const title = root.querySelector('#scrollChapterTitle');
    const count = root.querySelector('#scrollChapterCount');
    const previous = root.querySelector('[data-chapter-action="previous"]');
    const next = root.querySelector('[data-chapter-action="next"]');
    if (title) title.textContent = state.current?.title || 'Chapter';
    if (count) count.textContent = state.count ? state.label : '';
    if (previous) {
      previous.disabled = !state.previous;
      previous.dataset.chapterId = state.previous?.id || '';
      previous.setAttribute('aria-label', state.previous ? `Previous chapter: ${state.previous.title}` : 'No previous chapter');
    }
    if (next) {
      next.disabled = !state.next;
      next.dataset.chapterId = state.next?.id || '';
      next.setAttribute('aria-label', state.next ? `Next chapter: ${state.next.title}` : 'No next chapter');
    }
  } catch (error) {
    console.warn('Continuous chapter navigator could not load publication contents', error);
    root.hidden = true;
  } finally {
    if (token === renderToken && root) delete root.dataset.loading;
  }
}

function navigate(action) {
  if (!root || !visibleState()) return;
  const button = root.querySelector(`[data-chapter-action="${action}"]`);
  const chapter = button?.dataset.chapterId || '';
  const route = parseRoute();
  if (!chapter || route.view !== 'read' || !route.slug) return;
  go(readHash(route.slug, chapter, 0));
}

function onKeydown(event) {
  const action = chapterShortcutAction(event);
  if (!action || !visibleState()) return;
  if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
  const button = root?.querySelector(`[data-chapter-action="${action}"]`);
  if (!button || button.disabled) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  navigate(action);
}

function observeUiState() {
  observer = new MutationObserver(() => render());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reader-mode'],
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-stage', 'class'],
  });
  ['tocOverlay', 'progressPanel', 'settingsPanel', 'searchOverlay', 'noteDialog', 'helpOverlay'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el, { attributes: true, attributeFilter: ['class', 'open', 'hidden'] });
  });
}

export function installScrollChapterNavigator() {
  if (document.documentElement.dataset.scrollChapterNavigatorReady === 'true') return;
  document.documentElement.dataset.scrollChapterNavigatorReady = 'true';
  installStyles();
  ensureUi();
  observeUiState();
  window.addEventListener('hashchange', render, { passive: true });
  window.addEventListener('popstate', render, { passive: true });
  document.addEventListener('keydown', onKeydown, true);
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installScrollChapterNavigator, { once: true });
} else {
  installScrollChapterNavigator();
}
