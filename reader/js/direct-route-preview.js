import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { blocksFromMarkdown } from './markdown.js';
import { applyNotes, loadNotes } from './notes.js';
import { go, parseRoute, readHash } from './router.js';
import {
  appendPreviewBlockWindow,
  handoffPreviewOffset,
  normalizeReadRoute,
  previewAnchorOffset,
  previewBlockWindow,
  previewCompletionState,
  samePreviewRoute,
  selectPreviewChapter,
  shouldShowPreview,
} from './direct-route-preview-model.js';

const PREVIEW_ID = 'directRoutePreview';
const STYLE_ID = 'directRoutePreviewStyle';
const APPEND_THRESHOLD = 1.35;

function canonicalReady() {
  const paged = !!document.querySelector('#pageLeft .page-inner')?.textContent?.trim();
  const continuous = !!document.querySelector('#scrollReader .scroll-document, #scrollReader [data-chapter]')?.textContent?.trim();
  return { paged, continuous, ready: paged || continuous };
}

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const link = document.createElement('link');
  link.id = STYLE_ID;
  link.rel = 'stylesheet';
  link.href = new URL('../css/direct-route-preview.css', import.meta.url).href;
  document.head.appendChild(link);
}

function removePreview() {
  document.getElementById(PREVIEW_ID)?.remove();
}

function appendBlock(body, block, chapter) {
  const wrapper = document.createElement('div');
  wrapper.className = 'direct-route-preview-block';
  wrapper.dataset.previewSourceStart = String(Math.max(0, Number(block?.start) || 0));
  wrapper.dataset.previewSourceEnd = String(Math.max(Number(block?.start) || 0, Number(block?.end) || 0));
  wrapper.dataset.chapter = chapter;
  wrapper.innerHTML = block?.html || '';
  body.appendChild(wrapper);
}

function readingFocusY(paper) {
  const rect = paper.getBoundingClientRect();
  return rect.top + Math.min(144, Math.max(52, paper.clientHeight * 0.2));
}

function visibleSourceOffset(paper, fallback) {
  const entries = [...paper.querySelectorAll('.direct-route-preview-block')].map((block) => {
    const rect = block.getBoundingClientRect();
    return {
      start: Number(block.dataset.previewSourceStart),
      top: rect.top,
      bottom: rect.bottom,
    };
  });
  return previewAnchorOffset(entries, readingFocusY(paper), fallback);
}

function selectionInside(region) {
  const selection = window.getSelection?.();
  if (!selection?.rangeCount || selection.isCollapsed) return false;
  const node = selection.getRangeAt(0).commonAncestorContainer;
  const element = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
  return !!element?.closest?.(`#${PREVIEW_ID}`) && region.contains(element);
}

function installPreviewKeyboard(region, paper) {
  region.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('a, button, input, textarea, select, [contenteditable="true"]')) return;
    const pageStep = Math.max(180, paper.clientHeight * 0.82);
    const lineStep = Math.max(48, Math.min(120, parseFloat(getComputedStyle(paper).lineHeight) * 3 || 72));
    let top = null;
    if (event.key === 'PageDown' || event.key === ' ') top = event.shiftKey && event.key === ' ' ? -pageStep : pageStep;
    else if (event.key === 'PageUp') top = -pageStep;
    else if (event.key === 'ArrowDown') top = lineStep;
    else if (event.key === 'ArrowUp') top = -lineStep;
    else if (event.key === 'Home') top = -paper.scrollHeight;
    else if (event.key === 'End') top = paper.scrollHeight;
    if (top == null) return;
    event.preventDefault();
    event.stopPropagation();
    paper.scrollBy({
      top,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, true);
}

function renderPreview({ book, chapter, markdown, blocks, initialOffset }) {
  removePreview();
  ensureStyle();
  const region = document.createElement('section');
  region.id = PREVIEW_ID;
  region.className = 'direct-route-preview';
  region.setAttribute('role', 'region');
  region.setAttribute('aria-label', `Reading ${chapter.title || book.title} while the full book loads`);

  const paper = document.createElement('article');
  paper.className = 'direct-route-preview-paper';
  paper.tabIndex = 0;
  paper.setAttribute('aria-describedby', 'directRoutePreviewStatus');

  const heading = document.createElement('header');
  heading.className = 'direct-route-preview-heading';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'direct-route-preview-kicker';
  eyebrow.textContent = book.title || 'Bookself';
  const title = document.createElement('h1');
  title.textContent = chapter.title || book.title || 'Opening chapter';
  const status = document.createElement('p');
  status.id = 'directRoutePreviewStatus';
  status.className = 'direct-route-preview-status';
  status.setAttribute('role', 'status');
  status.textContent = 'Chapter ready. Full-book page count is still loading.';
  heading.append(eyebrow, title, status);

  const body = document.createElement('div');
  body.className = 'direct-route-preview-body';
  paper.append(heading, body);
  region.appendChild(paper);
  (document.getElementById('bookStage') || document.body).appendChild(region);

  let cursor = 0;
  let complete = false;
  const initial = previewBlockWindow(blocks, initialOffset);
  for (const block of initial.blocks) appendBlock(body, block, chapter.id);
  cursor = initial.nextIndex;
  complete = initial.complete;

  const refreshNotes = () => {
    if (!book.slug) return;
    applyNotes(body, loadNotes(book.slug), chapter.id);
  };
  refreshNotes();

  const renderMore = () => {
    if (complete) return false;
    const next = appendPreviewBlockWindow(blocks, cursor);
    if (!next.blocks.length) {
      complete = true;
      return false;
    }
    for (const block of next.blocks) appendBlock(body, block, chapter.id);
    cursor = next.nextIndex;
    complete = next.complete;
    refreshNotes();
    return true;
  };

  const maybeExtend = () => {
    if (complete) return;
    const remaining = paper.scrollHeight - paper.scrollTop - paper.clientHeight;
    if (remaining <= paper.clientHeight * APPEND_THRESHOLD) renderMore();
  };
  paper.addEventListener('scroll', maybeExtend, { passive: true });
  if (paper.scrollHeight <= paper.clientHeight * 1.6) renderMore();
  installPreviewKeyboard(region, paper);
  requestAnimationFrame(() => paper.focus({ preventScroll: true }));

  return { region, paper, status, renderMore, complete: () => complete, sourceLength: markdown.length };
}

function watchCanonicalHandoff(surface, initialRoute, chapter) {
  const { region, paper, status } = surface;
  let finishing = false;
  let retryTimer = 0;

  const cleanup = () => {
    clearTimeout(retryTimer);
    observer.disconnect();
    window.removeEventListener('hashchange', onRouteChange);
    window.removeEventListener('popstate', onRouteChange);
    document.removeEventListener('selectionchange', onSelectionChange);
  };

  const remove = () => {
    cleanup();
    region.remove();
  };

  const onRouteChange = () => {
    const current = normalizeReadRoute(parseRoute());
    if (!samePreviewRoute(initialRoute, current)) remove();
  };

  const finishIfReady = () => {
    if (finishing || !region.isConnected) return finishing;
    const currentRoute = normalizeReadRoute(parseRoute());
    if (!samePreviewRoute(initialRoute, currentRoute)) {
      remove();
      return true;
    }
    const ready = canonicalReady();
    const state = previewCompletionState({
      stage: document.body?.dataset?.stage || '',
      hasPagedContent: ready.paged,
      hasContinuousContent: ready.continuous,
    });
    if (state !== 'dismiss') return false;
    if (selectionInside(region)) {
      status.textContent = 'Full reader is ready. Finish your selection to continue.';
      clearTimeout(retryTimer);
      retryTimer = window.setTimeout(finishIfReady, 360);
      return false;
    }

    finishing = true;
    const visibleOffset = visibleSourceOffset(paper, initialRoute.offset);
    const handoffOffset = handoffPreviewOffset({
      initialOffset: initialRoute.offset,
      visibleOffset,
      routeMatches: true,
    });
    status.textContent = 'Full reader ready. Keeping your place…';
    region.classList.add('is-handing-off');
    if (handoffOffset !== initialRoute.offset) {
      go(readHash(initialRoute.slug, chapter.id, handoffOffset), { replace: true });
    }
    window.setTimeout(remove, 160);
    return true;
  };

  const onSelectionChange = () => {
    if (!selectionInside(region)) finishIfReady();
  };

  const observer = new MutationObserver(finishIfReady);
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['data-stage'],
  });
  window.addEventListener('hashchange', onRouteChange);
  window.addEventListener('popstate', onRouteChange);
  document.addEventListener('selectionchange', onSelectionChange);
  window.setTimeout(() => {
    if (!finishIfReady()) cleanup();
  }, 30000);
  finishIfReady();
}

export async function installDirectRoutePreview() {
  const route = parseRoute();
  const initial = normalizeReadRoute(route);
  const ready = canonicalReady();
  if (!shouldShowPreview({
    route,
    canonicalReady: ready.ready,
    stage: document.body?.dataset?.stage || 'library',
  }) || !initial) return { status: 'skipped' };

  try {
    const hub = await fetchText(`books/${initial.slug}/README.md`);
    const book = parseBookReadme(hub, initial.slug);
    const chapter = selectPreviewChapter(book.contents, initial.chapter);
    if (!chapter) return { status: 'empty' };
    const markdown = await fetchText(`books/${initial.slug}/${chapter.file}`);
    const current = normalizeReadRoute(parseRoute());
    const nowReady = canonicalReady();
    if (!samePreviewRoute(initial, current) || nowReady.ready) return { status: 'superseded' };

    const blocks = blocksFromMarkdown(markdown, initial.slug);
    if (!blocks.length) return { status: 'empty' };
    const surface = renderPreview({
      book,
      chapter,
      markdown,
      blocks,
      initialOffset: chapter.id === initial.chapter ? initial.offset : 0,
    });
    watchCanonicalHandoff(surface, initial, chapter);
    return {
      status: 'shown',
      chapter: chapter.id,
      blocks: blocks.length,
      sourceLength: markdown.length,
    };
  } catch (error) {
    console.warn('Direct-route reading bridge could not be shown', error);
    removePreview();
    return { status: 'failed' };
  }
}

installDirectRoutePreview();
