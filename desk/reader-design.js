import {
  READER_PRESENTATION_OPTIONS,
  READER_PRESENTATION_VERSION,
  normalizeReaderPresentation,
} from '../reader/js/presentation.js';

const THEME_META = {
  light: { label: 'Paper', page: '#F7F3EC', ink: '#2B2621', accent: '#8F623A' },
  linen: { label: 'Linen', page: '#EEF1EC', ink: '#253029', accent: '#4F725D' },
  porcelain: { label: 'Porcelain', page: '#FCFCFA', ink: '#252525', accent: '#566B87' },
  sage: { label: 'Sage', page: '#EDF1E6', ink: '#273026', accent: '#55705A' },
  lavender: { label: 'Lavender', page: '#EEE9F2', ink: '#2E2933', accent: '#756389' },
  ivory: { label: 'Ivory', page: '#F2EBDD', ink: '#2D261F', accent: '#845B35' },
  sepia: { label: 'Parchment', page: '#EADBC0', ink: '#33281E', accent: '#80522F' },
  rose: { label: 'Rose Paper', page: '#F3E7E3', ink: '#322827', accent: '#8A5753' },
  sand: { label: 'Sand', page: '#EFE2CB', ink: '#31281E', accent: '#7A542F' },
  dark: { label: 'Ink', page: '#181512', ink: '#EEE5D8', accent: '#D29A55' },
  slate: { label: 'Slate', page: '#1A1E24', ink: '#E9EDF3', accent: '#8FB2DB' },
  midnight: { label: 'Midnight', page: '#11151C', ink: '#E8ECF4', accent: '#8FA8D2' },
  forest: { label: 'Forest', page: '#151B17', ink: '#E3EAE2', accent: '#87A88B' },
  ember: { label: 'Ember', page: '#1B1511', ink: '#F0E2D5', accent: '#D18A4A' },
  'deep-sea': { label: 'Deep Sea', page: '#10191B', ink: '#E2ECEC', accent: '#6FA8AE' },
  aubergine: { label: 'Aubergine', page: '#19131A', ink: '#EDE3EE', accent: '#AD86B1' },
  contrast: { label: 'High Contrast', page: '#FFFFFF', ink: '#111111', accent: '#005FCC' },
  'contrast-dark': { label: 'High Contrast Dark', page: '#0B0B0B', ink: '#F7F7F7', accent: '#69A7FF' },
};

const FONT_META = {
  book: { label: 'Book · Source Serif 4', stack: '"Source Serif 4", Georgia, serif' },
  literary: { label: 'Literata', stack: '"Literata", "Source Serif 4", Georgia, serif' },
  warm: { label: 'Lora', stack: '"Lora", Georgia, serif' },
  classic: { label: 'Classic · Georgia', stack: 'Georgia, "Times New Roman", serif' },
  modern: { label: 'Plex · IBM Plex Sans', stack: '"IBM Plex Sans", system-ui, sans-serif' },
  clear: { label: 'Clear · Atkinson', stack: '"Atkinson Hyperlegible", Verdana, sans-serif' },
  humanist: { label: 'Humanist sans', stack: '"Trebuchet MS", "Segoe UI", sans-serif' },
  system: { label: 'System', stack: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
};

const BASE = Object.freeze({
  version: READER_PRESENTATION_VERSION,
  appearance: { theme: 'ivory', warmth: 'off' },
  typography: {
    font: 'literary', fontSize: 18, fontWeight: 400, tracking: 0, leading: 1.62,
    measure: 'balanced', align: 'justify', paragraph: 'normal', indent: 'gentle',
    mode: 'paged', hyphens: 'auto',
  },
});

const PRESETS = {
  book: BASE,
  research: {
    version: 1,
    appearance: { theme: 'porcelain', warmth: 'off' },
    typography: { font: 'book', fontSize: 17, fontWeight: 400, tracking: 0, leading: 1.55, measure: 'wide', align: 'justify', paragraph: 'compact', indent: 'none', mode: 'paged', hyphens: 'auto' },
  },
  editorial: {
    version: 1,
    appearance: { theme: 'light', warmth: 'off' },
    typography: { font: 'modern', fontSize: 18, fontWeight: 400, tracking: 0, leading: 1.55, measure: 'balanced', align: 'left', paragraph: 'airy', indent: 'none', mode: 'scroll', hyphens: 'off' },
  },
  accessible: {
    version: 1,
    appearance: { theme: 'contrast', warmth: 'off' },
    typography: { font: 'clear', fontSize: 22, fontWeight: 500, tracking: 0.01, leading: 1.75, measure: 'narrow', align: 'left', paragraph: 'airy', indent: 'none', mode: 'scroll', hyphens: 'off' },
  },
  night: {
    version: 1,
    appearance: { theme: 'dark', warmth: 'soft' },
    typography: { font: 'literary', fontSize: 19, fontWeight: 400, tracking: 0, leading: 1.65, measure: 'balanced', align: 'left', paragraph: 'normal', indent: 'gentle', mode: 'paged', hyphens: 'off' },
  },
};

const $ = (id) => document.getElementById(id);
let bookSignature = '';
let loadingSlug = '';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function titleCase(value) {
  return String(value || '').replace(/(^|-)([a-z])/g, (_, dash, letter) => `${dash ? ' ' : ''}${letter.toUpperCase()}`);
}

function optionMarkup(values, labels = {}) {
  return values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(labels[value] || titleCase(value))}</option>`).join('');
}

function studioMarkup() {
  const ranges = READER_PRESENTATION_OPTIONS.ranges;
  const themeLabels = Object.fromEntries(Object.entries(THEME_META).map(([id, meta]) => [id, meta.label]));
  const fontLabels = Object.fromEntries(Object.entries(FONT_META).map(([id, meta]) => [id, meta.label]));
  return `
    <section class="reader-design-studio" id="readerDesignStudio" aria-labelledby="readerDesignTitle">
      <div class="reader-design-head">
        <div>
          <p class="eyebrow">Typesetting & appearance</p>
          <h2 id="readerDesignTitle">Reader Design Studio</h2>
          <p>Recommend a first reading experience for a publication. Readers can always override it in their own browser.</p>
        </div>
        <div class="reader-design-book-select">
          <label for="readerDesignBook">Publication</label>
          <select id="readerDesignBook"></select>
        </div>
      </div>

      <div class="reader-design-presets" role="group" aria-label="Design starting points">
        <span>Starting point</span>
        <button type="button" data-design-preset="book">Literary book</button>
        <button type="button" data-design-preset="research">Research</button>
        <button type="button" data-design-preset="editorial">Editorial</button>
        <button type="button" data-design-preset="accessible">Accessible</button>
        <button type="button" data-design-preset="night">Night</button>
      </div>

      <div class="reader-design-grid">
        <div class="reader-design-preview-wrap">
          <div class="reader-design-preview" id="readerDesignPreview">
            <div class="reader-design-preview-page">
              <p class="reader-design-kicker">Chapter three</p>
              <h3>A quiet opening</h3>
              <p class="reader-design-sample first">Every publication can carry a considered starting point for color, type, rhythm, and measure.</p>
              <p class="reader-design-sample second">The design belongs to the book. The final reading experience still belongs to the reader.</p>
              <blockquote>Good typesetting offers an invitation, not a constraint.</blockquote>
            </div>
          </div>
          <div class="reader-design-preview-meta">
            <strong id="readerDesignPreviewLabel">Ivory · Literata</strong>
            <span id="readerDesignPreviewSpecs">18px · 1.62 leading · balanced</span>
          </div>
          <a class="secondary-button" id="readerDesignOpenReader" href="#" target="_blank" rel="noopener">Open publication in Reader</a>
        </div>

        <form class="reader-design-controls" id="readerDesignForm">
          <fieldset>
            <legend>Atmosphere</legend>
            <label>Palette<select id="designTheme">${optionMarkup(READER_PRESENTATION_OPTIONS.themes, themeLabels)}</select></label>
            <label>Warm light<select id="designWarmth">${optionMarkup(READER_PRESENTATION_OPTIONS.warmths, { off: 'Off', soft: 'Soft', golden: 'Golden' })}</select></label>
          </fieldset>

          <fieldset>
            <legend>Typeface</legend>
            <label class="wide">Family<select id="designFont">${optionMarkup(READER_PRESENTATION_OPTIONS.fonts, fontLabels)}</select></label>
            <label>Size <output id="designFontSizeValue">18px</output><input id="designFontSize" type="range" min="${ranges.fontSize.min}" max="${ranges.fontSize.max}" step="${ranges.fontSize.step}"></label>
            <label>Weight<select id="designFontWeight">${optionMarkup(READER_PRESENTATION_OPTIONS.fontWeights.map(String), { 400: 'Regular · 400', 500: 'Medium · 500', 600: 'Strong · 600' })}</select></label>
            <label>Tracking <output id="designTrackingValue">0em</output><input id="designTracking" type="range" min="${ranges.tracking.min}" max="${ranges.tracking.max}" step="${ranges.tracking.step}"></label>
            <label>Leading <output id="designLeadingValue">1.62</output><input id="designLeading" type="range" min="${ranges.leading.min}" max="${ranges.leading.max}" step="${ranges.leading.step}"></label>
          </fieldset>

          <fieldset>
            <legend>Page rhythm</legend>
            <label>Measure<select id="designMeasure">${optionMarkup(READER_PRESENTATION_OPTIONS.measures)}</select></label>
            <label>Alignment<select id="designAlign">${optionMarkup(READER_PRESENTATION_OPTIONS.aligns, { left: 'Ragged right', justify: 'Justified' })}</select></label>
            <label>Paragraphs<select id="designParagraph">${optionMarkup(READER_PRESENTATION_OPTIONS.paragraphs)}</select></label>
            <label>First-line indent<select id="designIndent">${optionMarkup(READER_PRESENTATION_OPTIONS.indents)}</select></label>
            <label>Reading mode<select id="designMode">${optionMarkup(READER_PRESENTATION_OPTIONS.modes, { paged: 'Pages', scroll: 'Scroll' })}</select></label>
            <label>Hyphenation<select id="designHyphens">${optionMarkup(READER_PRESENTATION_OPTIONS.hyphens, { auto: 'Automatic', off: 'Off' })}</select></label>
          </fieldset>
        </form>
      </div>

      <div class="reader-design-output">
        <div class="reader-design-output-head">
          <div><strong>Generated <code>reader.json</code></strong><span id="readerDesignLoadStatus">Choose a publication to load its current design.</span></div>
          <div class="reader-design-actions">
            <button class="secondary-button" id="readerDesignReload" type="button">Reload current</button>
            <button class="secondary-button" id="readerDesignCopy" type="button">Copy JSON</button>
            <button class="primary-button" id="readerDesignDownload" type="button">Download reader.json</button>
            <a class="secondary-button" id="readerDesignFiles" href="#" target="_blank" rel="noopener">Open book files</a>
          </div>
        </div>
        <textarea id="readerDesignJson" readonly spellcheck="false" aria-label="Generated reader.json"></textarea>
        <p class="reader-design-privacy"><strong>Reader ownership:</strong> this file only sets recommendations. A reader changing color, typeface, size, spacing, measure, or mode changes only their browser-local experience—not this file and not anybody else’s book.</p>
      </div>
    </section>`;
}

function installStyles() {
  if (document.querySelector('link[data-reader-design-studio]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./reader-design.css?v=1', import.meta.url).href;
  link.dataset.readerDesignStudio = 'true';
  document.head.appendChild(link);
}

function installStudio() {
  if ($('readerDesignStudio')) return;
  const list = $('manuscriptList');
  if (!list) return;
  list.insertAdjacentHTML('beforebegin', studioMarkup());
  bindUi();
  syncBooks();
  applyDesign(BASE);
}

function cards() {
  return [...document.querySelectorAll('#manuscriptList .book-card[data-slug]')];
}

function bookInfo(card) {
  return {
    slug: card.dataset.slug,
    title: card.querySelector('.book-title')?.textContent?.trim() || card.dataset.slug,
    preview: card.querySelector('.preview-action')?.href || '#',
    files: card.querySelector('.folder-action')?.href || '#',
  };
}

function syncBooks() {
  const rows = cards().map(bookInfo);
  if (!rows.length) return;
  const signature = rows.map((row) => `${row.slug}:${row.title}`).join('|');
  if (signature === bookSignature) return;
  bookSignature = signature;
  const select = $('readerDesignBook');
  const previous = select.value;
  select.innerHTML = rows.map((row) => `<option value="${escapeHtml(row.slug)}">${escapeHtml(row.title)}</option>`).join('');
  if (rows.some((row) => row.slug === previous)) select.value = previous;
  syncBookLinks();
  loadCurrentDesign();
}

function selectedCard() {
  const slug = $('readerDesignBook')?.value;
  return cards().find((card) => card.dataset.slug === slug) || null;
}

function syncBookLinks() {
  const card = selectedCard();
  if (!card) return;
  const info = bookInfo(card);
  $('readerDesignOpenReader').href = info.preview;
  $('readerDesignFiles').href = info.files;
}

function remoteRepo() {
  const repo = new URLSearchParams(location.search).get('repo') || '';
  const match = repo.match(/^([^/]+)\/([^/]+)$/);
  if (!match) return null;
  const branch = $('repoBranch')?.textContent?.trim() || 'main';
  return { owner: match[1], repo: match[2], branch };
}

function presentationUrl(slug) {
  const remote = remoteRepo();
  if (!remote) return new URL(`../books/${encodeURIComponent(slug)}/reader.json`, location.href).href;
  const path = `books/${slug}/reader.json`.split('/').map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/${encodeURIComponent(remote.owner)}/${encodeURIComponent(remote.repo)}/${encodeURIComponent(remote.branch)}/${path}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function editorDesign(raw) {
  const normalized = normalizeReaderPresentation(raw);
  const design = clone(BASE);
  Object.assign(design.appearance, normalized.appearance);
  Object.assign(design.typography, normalized.typography);
  return design;
}

async function loadCurrentDesign() {
  const slug = $('readerDesignBook')?.value;
  if (!slug || slug === loadingSlug) return;
  loadingSlug = slug;
  syncBookLinks();
  $('readerDesignLoadStatus').textContent = 'Loading current publication design…';
  try {
    const response = await fetch(presentationUrl(slug), { cache: 'no-store' });
    if (!response.ok) throw new Error(String(response.status));
    const raw = JSON.parse(await response.text());
    applyDesign(editorDesign(raw));
    $('readerDesignLoadStatus').textContent = `Loaded books/${slug}/reader.json.`;
  } catch {
    applyDesign(BASE);
    $('readerDesignLoadStatus').textContent = `No readable reader.json found for ${slug}; starting from Literary book.`;
  } finally {
    loadingSlug = '';
  }
}

function setValue(id, value) {
  const input = $(id);
  if (input) input.value = String(value);
}

function applyDesign(raw) {
  const design = editorDesign(raw);
  setValue('designTheme', design.appearance.theme);
  setValue('designWarmth', design.appearance.warmth);
  setValue('designFont', design.typography.font);
  setValue('designFontSize', design.typography.fontSize);
  setValue('designFontWeight', design.typography.fontWeight);
  setValue('designTracking', design.typography.tracking);
  setValue('designLeading', design.typography.leading);
  setValue('designMeasure', design.typography.measure);
  setValue('designAlign', design.typography.align);
  setValue('designParagraph', design.typography.paragraph);
  setValue('designIndent', design.typography.indent);
  setValue('designMode', design.typography.mode);
  setValue('designHyphens', design.typography.hyphens);
  syncDesign();
}

function readDesign() {
  return normalizeReaderPresentation({
    version: READER_PRESENTATION_VERSION,
    appearance: {
      theme: $('designTheme').value,
      warmth: $('designWarmth').value,
    },
    typography: {
      font: $('designFont').value,
      fontSize: Number($('designFontSize').value),
      fontWeight: Number($('designFontWeight').value),
      tracking: Number($('designTracking').value),
      leading: Number($('designLeading').value),
      measure: $('designMeasure').value,
      align: $('designAlign').value,
      paragraph: $('designParagraph').value,
      indent: $('designIndent').value,
      mode: $('designMode').value,
      hyphens: $('designHyphens').value,
    },
  });
}

function warmthColor(id) {
  if (id === 'golden') return 'rgba(211, 145, 55, .13)';
  if (id === 'soft') return 'rgba(211, 162, 91, .07)';
  return 'transparent';
}

function syncPreview(design) {
  const preview = $('readerDesignPreview');
  const page = preview?.querySelector('.reader-design-preview-page');
  if (!preview || !page) return;
  const palette = THEME_META[design.appearance.theme] || THEME_META.ivory;
  const font = FONT_META[design.typography.font] || FONT_META.book;
  preview.style.setProperty('--design-page', palette.page);
  preview.style.setProperty('--design-ink', palette.ink);
  preview.style.setProperty('--design-accent', palette.accent);
  preview.style.setProperty('--design-warmth', warmthColor(design.appearance.warmth));
  preview.style.setProperty('--design-font', font.stack);
  preview.style.setProperty('--design-size', `${Math.max(14, design.typography.fontSize) / 18}rem`);
  preview.style.setProperty('--design-weight', String(design.typography.fontWeight));
  preview.style.setProperty('--design-tracking', `${design.typography.tracking}em`);
  preview.style.setProperty('--design-leading', String(design.typography.leading));
  preview.dataset.measure = design.typography.measure;
  preview.dataset.align = design.typography.align;
  preview.dataset.paragraph = design.typography.paragraph;
  preview.dataset.indent = design.typography.indent;
  preview.dataset.mode = design.typography.mode;
  preview.dataset.hyphens = design.typography.hyphens;
  $('readerDesignPreviewLabel').textContent = `${palette.label} · ${font.label}`;
  $('readerDesignPreviewSpecs').textContent = `${design.typography.fontSize}px · ${design.typography.leading} leading · ${design.typography.measure} · ${design.typography.mode === 'paged' ? 'Pages' : 'Scroll'}`;
}

function syncOutputs(design) {
  $('designFontSizeValue').textContent = `${design.typography.fontSize}px`;
  $('designTrackingValue').textContent = `${design.typography.tracking}em`;
  $('designLeadingValue').textContent = String(design.typography.leading);
  $('readerDesignJson').value = `${JSON.stringify(design, null, 2)}\n`;
}

function syncDesign() {
  const design = readDesign();
  syncPreview(design);
  syncOutputs(design);
}

async function copyJson() {
  const text = $('readerDesignJson').value;
  try {
    await navigator.clipboard.writeText(text);
    $('readerDesignLoadStatus').textContent = 'Copied reader.json to the clipboard.';
  } catch {
    $('readerDesignJson').focus();
    $('readerDesignJson').select();
    $('readerDesignLoadStatus').textContent = 'Clipboard access is unavailable; the JSON is selected for copying.';
  }
}

function downloadJson() {
  const blob = new Blob([$('readerDesignJson').value], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'reader.json';
  link.click();
  URL.revokeObjectURL(link.href);
  const slug = $('readerDesignBook').value;
  $('readerDesignLoadStatus').textContent = `Downloaded reader.json. Put it at books/${slug}/reader.json.`;
}

function bindUi() {
  $('readerDesignBook').addEventListener('change', loadCurrentDesign);
  $('readerDesignForm').addEventListener('input', syncDesign);
  $('readerDesignForm').addEventListener('change', syncDesign);
  document.querySelectorAll('[data-design-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      applyDesign(PRESETS[button.dataset.designPreset] || BASE);
      $('readerDesignLoadStatus').textContent = `${button.textContent.trim()} starting point applied. Fine-tune it, then copy or download reader.json.`;
    });
  });
  $('readerDesignReload').addEventListener('click', loadCurrentDesign);
  $('readerDesignCopy').addEventListener('click', copyJson);
  $('readerDesignDownload').addEventListener('click', downloadJson);
}

function observeBooks() {
  const list = $('manuscriptList');
  if (!list) return;
  const observer = new MutationObserver(syncBooks);
  observer.observe(list, { childList: true });
  syncBooks();
}

installStyles();
installStudio();
observeBooks();
