import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { headingOffsets } from './markdown.js';
import { parseRoute, readHash, go } from './router.js';
import {
  chapterNavigationState,
  chapterNavigatorVisible,
  chapterShortcutAction,
  readingNavigatorVisible,
  sectionNavigationState,
  sectionShortcutAction,
} from './scroll-chapter-nav-model.js';

const STYLE_HREF = 'css/scroll-chapter-nav.css?v=r2';
const manifests = new Map();
const sections = new Map();
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
  return !!document.querySelector('dialog[open], #tocOverlay.active, #progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active');
}

function visibility() {
  const input = {
    stage: document.body.dataset.stage || '',
    mode: document.documentElement.dataset.readerMode || 'paged',
    chromeHidden: document.body.classList.contains('reader-chrome-hidden'),
    overlayOpen: overlaysOpen(),
  };
  return { all: readingNavigatorVisible(input), chapter: chapterNavigatorVisible(input), mode: input.mode };
}

function ensureUi() {
  if (root?.isConnected) return root;
  const app = document.querySelector('.app');
  if (!app) return null;
  root = document.createElement('nav');
  root.id = 'scrollChapterNavigator';
  root.className = 'scroll-chapter-nav';
  root.hidden = true;
  root.setAttribute('aria-label', 'Reading navigation');
  root.innerHTML = `
    <div class="scroll-chapter-nav-row scroll-chapter-nav-chapters" data-nav-row="chapter" aria-label="Chapter navigation">
      <button type="button" class="scroll-chapter-nav-button" data-chapter-action="previous" aria-label="Previous chapter" title="Previous chapter · Alt+↑"><span aria-hidden="true">‹</span></button>
      <div class="scroll-chapter-nav-center" aria-live="polite" aria-atomic="true"><span class="scroll-chapter-nav-title" id="scrollChapterTitle">Chapter</span><span class="scroll-chapter-nav-count" id="scrollChapterCount"></span></div>
      <button type="button" class="scroll-chapter-nav-button" data-chapter-action="next" aria-label="Next chapter" title="Next chapter · Alt+↓"><span aria-hidden="true">›</span></button>
    </div>
    <div class="scroll-chapter-nav-row scroll-chapter-nav-sections" data-nav-row="section" aria-label="Section navigation">
      <button type="button" class="scroll-chapter-nav-button scroll-chapter-nav-section-button" data-section-action="previous" aria-label="Previous section" title="Previous section · Alt+["><span aria-hidden="true">↑</span></button>
      <div class="scroll-chapter-nav-center" aria-live="polite" aria-atomic="true"><span class="scroll-chapter-nav-title" id="scrollSectionTitle">Chapter opening</span><span class="scroll-chapter-nav-count" id="scrollSectionCount"></span></div>
      <button type="button" class="scroll-chapter-nav-button scroll-chapter-nav-section-button" data-section-action="next" aria-label="Next section" title="Next section · Alt+]"><span aria-hidden="true">↓</span></button>
    </div>`;
  root.addEventListener('click', (event) => {
    const chapterButton = event.target.closest('[data-chapter-action]');
    if (chapterButton && !chapterButton.disabled) navigateChapter(chapterButton.dataset.chapterAction);
    const sectionButton = event.target.closest('[data-section-action]');
    if (sectionButton && !sectionButton.disabled) navigateSection(sectionButton.dataset.sectionAction);
  });
  app.appendChild(root);
  return root;
}

async function manifestFor(slug) {
  if (!slug) return null;
  if (!manifests.has(slug)) manifests.set(slug, fetchText(`books/${slug}/README.md`).then((markdown) => parseBookReadme(markdown, slug)).catch((error) => { manifests.delete(slug); throw error; }));
  return manifests.get(slug);
}

async function sectionsFor(slug, chapter) {
  if (!slug || !chapter?.id || !chapter?.file) return [];
  const key = `${slug}:${chapter.id}`;
  if (!sections.has(key)) sections.set(key, fetchText(`books/${slug}/${chapter.file}`).then((markdown) => headingOffsets(markdown).filter((heading) => heading.level === 2)).catch((error) => { sections.delete(key); throw error; }));
  return sections.get(key);
}

function setSectionButton(button, target, label) {
  if (!button) return;
  button.disabled = !target;
  button.dataset.targetOffset = target ? String(target.offset) : '';
  button.setAttribute('aria-label', target ? `${label}: ${target.title}` : `No ${label.toLowerCase()}`);
}

async function render() {
  ensureUi();
  if (!root) return;
  const token = ++renderToken;
  const route = parseRoute();
  const visible = visibility();
  if (!visible.all || route.view !== 'read' || !route.slug) { root.hidden = true; return; }
  root.hidden = false;
  root.dataset.mode = visible.mode;
  root.dataset.loading = 'true';
  try {
    const book = await manifestFor(route.slug);
    if (token !== renderToken || !visibility().all) return;
    const latestRoute = parseRoute();
    if (latestRoute.view !== 'read' || latestRoute.slug !== route.slug) return;
    const chapterState = chapterNavigationState(book?.contents || [], latestRoute.chapter || '');
    root.querySelector('[data-nav-row="chapter"]').hidden = !visibility().chapter;
    root.querySelector('#scrollChapterTitle').textContent = chapterState.current?.title || 'Chapter';
    root.querySelector('#scrollChapterCount').textContent = chapterState.count ? chapterState.label : '';
    const previousChapter = root.querySelector('[data-chapter-action="previous"]');
    const nextChapter = root.querySelector('[data-chapter-action="next"]');
    previousChapter.disabled = !chapterState.previous;
    previousChapter.dataset.chapterId = chapterState.previous?.id || '';
    nextChapter.disabled = !chapterState.next;
    nextChapter.dataset.chapterId = chapterState.next?.id || '';

    const headings = await sectionsFor(route.slug, chapterState.current);
    if (token !== renderToken || !visibility().all) return;
    const currentRoute = parseRoute();
    if (currentRoute.slug !== route.slug || currentRoute.chapter !== latestRoute.chapter) return;
    const sectionState = sectionNavigationState(headings, currentRoute.offset || 0);
    root.querySelector('#scrollSectionTitle').textContent = sectionState.current?.title || chapterState.current?.title || 'Chapter opening';
    root.querySelector('#scrollSectionCount').textContent = sectionState.count ? sectionState.label : 'No section headings';
    setSectionButton(root.querySelector('[data-section-action="previous"]'), sectionState.previous, 'Previous section');
    setSectionButton(root.querySelector('[data-section-action="next"]'), sectionState.next, 'Next section');
  } catch (error) {
    console.warn('Reading navigator could not load publication structure', error);
    root.hidden = true;
  } finally {
    if (token === renderToken && root) delete root.dataset.loading;
  }
}

function navigateChapter(action) {
  if (!root || !visibility().chapter) return;
  const chapter = root.querySelector(`[data-chapter-action="${action}"]`)?.dataset.chapterId || '';
  const route = parseRoute();
  if (chapter && route.view === 'read' && route.slug) go(readHash(route.slug, chapter, 0));
}

function navigateSection(action) {
  if (!root || !visibility().all) return;
  const offset = Number.parseInt(root.querySelector(`[data-section-action="${action}"]`)?.dataset.targetOffset, 10);
  const route = parseRoute();
  if (Number.isFinite(offset) && route.view === 'read' && route.slug && route.chapter) go(readHash(route.slug, route.chapter, offset));
}

function onKeydown(event) {
  if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
  const sectionAction = sectionShortcutAction(event);
  if (sectionAction && visibility().all) {
    const button = root?.querySelector(`[data-section-action="${sectionAction}"]`);
    if (button && !button.disabled) { event.preventDefault(); event.stopImmediatePropagation(); navigateSection(sectionAction); }
    return;
  }
  const chapterAction = chapterShortcutAction(event);
  if (!chapterAction || !visibility().chapter) return;
  const button = root?.querySelector(`[data-chapter-action="${chapterAction}"]`);
  if (!button || button.disabled) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  navigateChapter(chapterAction);
}

function observeUiState() {
  observer = new MutationObserver(() => render());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-reader-mode'] });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage', 'class'] });
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

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installScrollChapterNavigator, { once: true });
else installScrollChapterNavigator();
