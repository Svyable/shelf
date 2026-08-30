import { parseRoute } from './router.js';
import {
  coverStyleState,
  findBookCoverAsset,
  loadBookCoverPresentation,
} from './cover-presentation.js';

const COVER_CSS = 'css/cover-design.css?v=r1';
let applyToken = 0;
let routeTimer = null;

function installStyles() {
  if (document.querySelector(`link[href="${COVER_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = COVER_CSS;
  document.head.appendChild(link);
}

function escapedUrl(value) {
  return String(value || '').replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}

async function applyCurrentCover() {
  const face = document.getElementById('coverFront');
  const slug = parseRoute().slug || '';
  if (!face || !slug) return;
  const token = ++applyToken;
  const [cover, art] = await Promise.all([
    loadBookCoverPresentation(slug),
    findBookCoverAsset(slug),
  ]);
  if (token !== applyToken || (parseRoute().slug || '') !== slug) return;

  const state = coverStyleState(cover);
  face.dataset.coverLayout = state.layout;
  face.dataset.coverAlign = state.align;
  face.dataset.coverTone = state.tone;
  face.style.setProperty('--cover-fit', state.fit);
  face.style.setProperty('--cover-position-x', `${state.positionX}%`);
  face.style.setProperty('--cover-position-y', `${state.positionY}%`);
  face.style.setProperty('--cover-title-size', state.titleSize);
  face.style.setProperty('--cover-shade', String(state.shade));
  face.style.setProperty('--cover-shade-top', String(state.shadeTop));

  if (art) {
    face.classList.add('has-art');
    face.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,var(--cover-shade-top)), rgba(0,0,0,var(--cover-shade))), url("${escapedUrl(art)}")`;
  }
}

function scheduleApply(delay = 0) {
  clearTimeout(routeTimer);
  routeTimer = window.setTimeout(applyCurrentCover, delay);
}

function initialize() {
  installStyles();
  scheduleApply();
  window.addEventListener('hashchange', () => scheduleApply(40));
  window.addEventListener('popstate', () => scheduleApply(40));

  const title = document.getElementById('coverTitle');
  if (title) {
    const observer = new MutationObserver(() => scheduleApply());
    observer.observe(title, { childList: true, subtree: true, characterData: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
