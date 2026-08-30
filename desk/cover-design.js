import {
  COVER_PRESENTATION_DEFAULTS,
  COVER_PRESENTATION_OPTIONS,
  coverStyleState,
  normalizeCoverPresentation,
  resolveCoverPresentation,
} from '../reader/js/cover-presentation.js';

const $ = (id) => document.getElementById(id);
let currentCover = { ...COVER_PRESENTATION_DEFAULTS };
let artToken = 0;

function optionMarkup(values, labels = {}) {
  return values.map((value) => `<option value="${value}">${labels[value] || value}</option>`).join('');
}

function markup() {
  const ranges = COVER_PRESENTATION_OPTIONS.ranges;
  return {
    preview: `
      <div class="cover-design-view-switch" role="group" aria-label="Preview surface">
        <button type="button" data-cover-preview="cover" aria-pressed="true">Cover</button>
        <button type="button" data-cover-preview="page" aria-pressed="false">Reading page</button>
      </div>
      <div class="cover-design-preview" id="coverDesignPreview" data-cover-layout="classic" data-cover-align="center" data-cover-tone="light">
        <div class="cover-design-face" id="coverDesignFace">
          <span class="cover-design-rule"></span>
          <h3 id="coverDesignTitle">Publication title</h3>
          <p class="cover-design-author" id="coverDesignAuthor">Author</p>
        </div>
      </div>`,
    controls: `
      <fieldset class="cover-design-controls">
        <legend>Cover composition</legend>
        <label>Layout<select id="coverLayout">${optionMarkup(COVER_PRESENTATION_OPTIONS.layouts, { classic: 'Classic', centered: 'Centered', 'lower-third': 'Lower third' })}</select></label>
        <label>Text align<select id="coverAlign">${optionMarkup(COVER_PRESENTATION_OPTIONS.aligns, { left: 'Left', center: 'Center' })}</select></label>
        <label>Image fit<select id="coverFit">${optionMarkup(COVER_PRESENTATION_OPTIONS.fits, { cover: 'Fill cover', contain: 'Show whole image' })}</select></label>
        <label>Text tone<select id="coverTone">${optionMarkup(COVER_PRESENTATION_OPTIONS.tones, { light: 'Light on art', dark: 'Dark on art' })}</select></label>
        <label>Image horizontal <output id="coverPositionXValue">50%</output><input id="coverPositionX" type="range" min="${ranges.positionX.min}" max="${ranges.positionX.max}" step="${ranges.positionX.step}"></label>
        <label>Image vertical <output id="coverPositionYValue">50%</output><input id="coverPositionY" type="range" min="${ranges.positionY.min}" max="${ranges.positionY.max}" step="${ranges.positionY.step}"></label>
        <label>Art shade <output id="coverShadeValue">42%</output><input id="coverShade" type="range" min="${ranges.shade.min}" max="${ranges.shade.max}" step="${ranges.shade.step}"></label>
        <label>Title scale <output id="coverTitleScaleValue">100%</output><input id="coverTitleScale" type="range" min="${ranges.titleScale.min}" max="${ranges.titleScale.max}" step="${ranges.titleScale.step}"></label>
      </fieldset>`,
  };
}

function remoteRepo() {
  const repo = new URLSearchParams(location.search).get('repo') || '';
  const match = repo.match(/^([^/]+)\/([^/]+)$/);
  if (!match) return null;
  const branch = $('repoBranch')?.textContent?.trim() || 'main';
  return { owner: match[1], repo: match[2], branch };
}

function publicationUrl(slug, rel) {
  const remote = remoteRepo();
  const path = `books/${slug}/${rel}`.split('/').map(encodeURIComponent).join('/');
  if (!remote) return new URL(`../${path}`, location.href).href;
  return `https://raw.githubusercontent.com/${encodeURIComponent(remote.owner)}/${encodeURIComponent(remote.repo)}/${encodeURIComponent(remote.branch)}/${path}`;
}

function selectedCard() {
  const slug = $('readerDesignBook')?.value;
  return [...document.querySelectorAll('#manuscriptList .book-card[data-slug]')]
    .find((card) => card.dataset.slug === slug) || null;
}

function selectedBookMeta() {
  const card = selectedCard();
  return {
    slug: card?.dataset.slug || $('readerDesignBook')?.value || '',
    title: card?.querySelector('.book-title')?.textContent?.trim() || 'Publication title',
    author: card?.querySelector('.book-authors')?.textContent?.trim() || 'Author',
  };
}

function setValue(id, value) {
  const input = $(id);
  if (input) input.value = String(value);
}

function readCover() {
  return resolveCoverPresentation({
    layout: $('coverLayout').value,
    align: $('coverAlign').value,
    fit: $('coverFit').value,
    tone: $('coverTone').value,
    positionX: Number($('coverPositionX').value),
    positionY: Number($('coverPositionY').value),
    shade: Number($('coverShade').value),
    titleScale: Number($('coverTitleScale').value),
  });
}

function applyControls(raw) {
  currentCover = resolveCoverPresentation(raw);
  setValue('coverLayout', currentCover.layout);
  setValue('coverAlign', currentCover.align);
  setValue('coverFit', currentCover.fit);
  setValue('coverTone', currentCover.tone);
  setValue('coverPositionX', currentCover.positionX);
  setValue('coverPositionY', currentCover.positionY);
  setValue('coverShade', currentCover.shade);
  setValue('coverTitleScale', currentCover.titleScale);
  syncCover();
}

function syncPreview() {
  const preview = $('coverDesignPreview');
  const face = $('coverDesignFace');
  if (!preview || !face) return;
  const state = coverStyleState(currentCover);
  preview.dataset.coverLayout = state.layout;
  preview.dataset.coverAlign = state.align;
  preview.dataset.coverTone = state.tone;
  face.style.setProperty('--cover-preview-fit', state.fit);
  face.style.setProperty('--cover-preview-x', `${state.positionX}%`);
  face.style.setProperty('--cover-preview-y', `${state.positionY}%`);
  face.style.setProperty('--cover-preview-shade', String(state.shade));
  face.style.setProperty('--cover-preview-shade-top', String(state.shadeTop));
  face.style.setProperty('--cover-preview-title-size', state.titleSize);
  const meta = selectedBookMeta();
  $('coverDesignTitle').textContent = meta.title;
  $('coverDesignAuthor').textContent = meta.author;
}

function syncOutputs() {
  $('coverPositionXValue').textContent = `${currentCover.positionX}%`;
  $('coverPositionYValue').textContent = `${currentCover.positionY}%`;
  $('coverShadeValue').textContent = `${Math.round(currentCover.shade * 100)}%`;
  $('coverTitleScaleValue').textContent = `${Math.round(currentCover.titleScale * 100)}%`;
}

function mergeGeneratedJson() {
  const textarea = $('readerDesignJson');
  if (!textarea) return;
  let raw = {};
  try { raw = JSON.parse(textarea.value || '{}'); } catch { return; }
  raw.cover = normalizeCoverPresentation(currentCover);
  textarea.value = `${JSON.stringify(raw, null, 2)}\n`;
}

function syncCover() {
  currentCover = readCover();
  syncPreview();
  syncOutputs();
  mergeGeneratedJson();
}

function imageLoads(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = url;
  });
}

async function loadArt(slug) {
  const token = ++artToken;
  const face = $('coverDesignFace');
  if (!face || !slug) return;
  face.classList.remove('has-art');
  face.style.removeProperty('--cover-preview-art');
  for (const name of ['cover.png', 'cover.jpg', 'cover.webp', 'cover.jpeg']) {
    const url = publicationUrl(slug, `media/${name}`);
    if (await imageLoads(url)) {
      if (token !== artToken) return;
      face.classList.add('has-art');
      face.style.setProperty('--cover-preview-art', `url("${url.replaceAll('"', '%22')}")`);
      return;
    }
  }
}

async function loadCurrentCover() {
  const { slug } = selectedBookMeta();
  if (!slug) return;
  try {
    const response = await fetch(publicationUrl(slug, 'reader.json'), { cache: 'no-store' });
    const raw = response.ok ? JSON.parse(await response.text()) : {};
    applyControls(raw.cover || {});
  } catch {
    applyControls(COVER_PRESENTATION_DEFAULTS);
  }
  loadArt(slug);
}

function setPreviewMode(mode) {
  const cover = $('coverDesignPreview');
  const page = $('readerDesignPreview');
  if (!cover || !page) return;
  const showCover = mode === 'cover';
  cover.hidden = !showCover;
  page.hidden = showCover;
  document.querySelectorAll('[data-cover-preview]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.coverPreview === mode));
  });
}

function installStyles() {
  if (document.querySelector('link[data-cover-design-studio]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./cover-design.css?v=1', import.meta.url).href;
  link.dataset.coverDesignStudio = 'true';
  document.head.appendChild(link);
}

function install() {
  const previewWrap = document.querySelector('.reader-design-preview-wrap');
  const form = $('readerDesignForm');
  if (!previewWrap || !form || $('coverDesignPreview')) return false;
  const parts = markup();
  previewWrap.insertAdjacentHTML('afterbegin', parts.preview);
  form.insertAdjacentHTML('afterbegin', parts.controls);
  setPreviewMode('cover');
  applyControls(COVER_PRESENTATION_DEFAULTS);
  loadCurrentCover();

  document.querySelectorAll('[data-cover-preview]').forEach((button) => {
    button.addEventListener('click', () => setPreviewMode(button.dataset.coverPreview));
  });
  form.addEventListener('input', (event) => {
    if (event.target.closest('.cover-design-controls')) syncCover();
    else queueMicrotask(mergeGeneratedJson);
  });
  form.addEventListener('change', (event) => {
    if (event.target.closest('.cover-design-controls')) syncCover();
    else queueMicrotask(mergeGeneratedJson);
  });
  $('readerDesignBook')?.addEventListener('change', () => queueMicrotask(loadCurrentCover));
  document.querySelector('.reader-design-presets')?.addEventListener('click', () => queueMicrotask(mergeGeneratedJson));

  const status = $('readerDesignLoadStatus');
  if (status) new MutationObserver(() => queueMicrotask(mergeGeneratedJson)).observe(status, { childList: true, subtree: true });
  return true;
}

function initialize() {
  installStyles();
  if (install()) return;
  const observer = new MutationObserver(() => {
    if (install()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
else initialize();
