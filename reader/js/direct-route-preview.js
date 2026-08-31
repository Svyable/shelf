import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute } from './router.js';
import {
  normalizeReadRoute,
  samePreviewRoute,
  selectPreviewChapter,
  projectPreviewParagraphs,
  shouldShowPreview,
  previewCompletionState,
} from './direct-route-preview-model.js';

const PREVIEW_ID = 'directRoutePreview';
const STYLE_ID = 'directRoutePreviewStyle';

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

function renderPreview({ book, chapter, paragraphs }) {
  removePreview();
  ensureStyle();
  const region = document.createElement('section');
  region.id = PREVIEW_ID;
  region.className = 'direct-route-preview';
  region.setAttribute('role', 'region');
  region.setAttribute('aria-label', `Opening ${chapter.title || book.title}`);
  region.setAttribute('aria-busy', 'true');

  const paper = document.createElement('div');
  paper.className = 'direct-route-preview-paper';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'direct-route-preview-kicker';
  eyebrow.textContent = book.title || 'Bookself';
  const title = document.createElement('h1');
  title.textContent = chapter.title || book.title || 'Opening chapter';
  paper.append(eyebrow, title);

  for (const text of paragraphs) {
    const p = document.createElement('p');
    p.textContent = text;
    paper.appendChild(p);
  }

  const status = document.createElement('p');
  status.className = 'direct-route-preview-status';
  status.textContent = 'Opening the full book…';
  paper.appendChild(status);
  region.appendChild(paper);
  (document.getElementById('bookStage') || document.body).appendChild(region);
  return region;
}

function watchCanonicalHandoff(region, initialRoute) {
  const finishIfReady = () => {
    const currentRoute = normalizeReadRoute(parseRoute());
    if (!samePreviewRoute(initialRoute, currentRoute)) {
      region.remove();
      return true;
    }
    const ready = canonicalReady();
    const state = previewCompletionState({
      stage: document.body?.dataset?.stage || '',
      hasPagedContent: ready.paged,
      hasContinuousContent: ready.continuous,
    });
    if (state !== 'dismiss') return false;
    region.classList.add('is-handing-off');
    window.setTimeout(() => region.remove(), 120);
    return true;
  };

  if (finishIfReady()) return;
  const observer = new MutationObserver(() => {
    if (finishIfReady()) observer.disconnect();
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['data-stage'],
  });
  window.setTimeout(() => observer.disconnect(), 30000);
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

    const paragraphs = projectPreviewParagraphs(
      markdown,
      chapter.id === initial.chapter ? initial.offset : 0
    );
    if (!paragraphs.length) return { status: 'empty' };
    const region = renderPreview({ book, chapter, paragraphs });
    watchCanonicalHandoff(region, initial);
    return { status: 'shown', chapter: chapter.id, paragraphs: paragraphs.length };
  } catch (error) {
    console.warn('Direct-route first paint could not be shown', error);
    removePreview();
    return { status: 'failed' };
  }
}

installDirectRoutePreview();
