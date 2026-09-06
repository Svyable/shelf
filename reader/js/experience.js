import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { blocksFromMarkdown } from './markdown.js';
import { parseRoute, readHash } from './router.js';
import { isTitlePageChapter } from './title-page.js';
import { loadNotes, addNote, applyNotes } from './notes.js';

const FONTS = ['book', 'literary', 'warm', 'classic', 'modern', 'clear', 'humanist', 'system'];
const DEFAULTS = Object.freeze({
  fontSize: 18,
  font: 'book',
  fontWeight: 400,
  tracking: 0,
  leading: 1.55,
  measure: 'balanced',
  align: 'justify',
  paragraph: 'normal',
  indent: 'none',
  mode: 'paged',
  hyphens: 'auto',
});

let prefs = { ...DEFAULTS };
let repaginateTimer = null;
let scrollRaf = null;
let scrollSyncTimer = null;
let ignoreNextRouteSync = false;
let programmaticScroll = false;
let selectionTimer = null;
let lastScrollSelection = null;
let pendingScrollNote = null;

const scrollState = {
  slug: null,
  title: '',
  blocks: [],
  tops: [],
  loading: null,
  activeIndex: -1,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'obb';
}

function experienceKey() {
  return `${storagePrefix()}:reader-experience`;
}

function myPresetKey() {
  return `${storagePrefix()}:reader-experience:preset`;
}

function legacyPrefs() {
  try {
    return JSON.parse(localStorage.getItem(`${storagePrefix()}:prefs`) || '{}');
  } catch {
    return {};
  }
}

function normalize(raw = {}) {
  const font = FONTS.includes(raw.font) ? raw.font : DEFAULTS.font;
  const measure = ['narrow', 'balanced', 'wide'].includes(raw.measure) ? raw.measure : DEFAULTS.measure;
  const align = ['left', 'justify'].includes(raw.align) ? raw.align : DEFAULTS.align;
  const paragraph = ['compact', 'normal', 'airy'].includes(raw.paragraph) ? raw.paragraph : DEFAULTS.paragraph;
  const indent = ['none', 'gentle', 'classic'].includes(raw.indent) ? raw.indent : DEFAULTS.indent;
  const mode = ['paged', 'scroll'].includes(raw.mode) ? raw.mode : DEFAULTS.mode;
  const hyphens = ['auto', 'off'].includes(raw.hyphens) ? raw.hyphens : DEFAULTS.hyphens;
  const weight = [400, 500, 600].includes(Number(raw.fontWeight)) ? Number(raw.fontWeight) : DEFAULTS.fontWeight;
  return {
    fontSize: Math.round(clamp(Number(raw.fontSize) || DEFAULTS.fontSize, 14, 32)),
    font,
    fontWeight: weight,
    tracking: Number(clamp(Number(raw.tracking) || 0, -0.02, 0.08).toFixed(2)),
    leading: Number(clamp(Number(raw.leading) || DEFAULTS.leading, 1.3, 2).toFixed(2)),
    measure,
    align,
    paragraph,
    indent,
    mode,
    hyphens,
  };
}

function loadPrefs() {
  try {
    const stored = localStorage.getItem(experienceKey());
    if (stored) return normalize(JSON.parse(stored));
  } catch {
    // Fall through to legacy migration.
  }
  const legacy = legacyPrefs();
  return normalize({
    fontSize: legacy.fontSize,
    leading: legacy.lineHeight,
    font: legacy.fontFamily === 'sans' ? 'modern' : 'book',
  });
}

function savePrefs() {
  try {
    localStorage.setItem(experienceKey(), JSON.stringify(prefs));
  } catch {
    // Reading still works when storage is unavailable.
  }
}

function loadMyPreset() {
  try {
    const raw = localStorage.getItem(myPresetKey());
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function saveMyPreset() {
  try {
    localStorage.setItem(myPresetKey(), JSON.stringify(normalize(prefs)));
    updateMyPresetUi();
    showToast('My preset saved');
  } catch {
    showToast('Could not save preset');
  }
}

function scheduleRepaginate() {
  clearTimeout(repaginateTimer);
  repaginateTimer = window.setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 130);
}

function setPressed(selector, value, attr) {
  document.querySelectorAll(selector).forEach((button) => {
    const active = button.getAttribute(attr) === String(value);
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function trackingLabel(value) {
  if (Math.abs(value) < 0.005) return '0';
  return `${value > 0 ? '+' : '−'}${Math.abs(value).toFixed(2)}em`;
}

function updateMyPresetUi() {
  const mine = document.querySelector('[data-reader-preset="mine"]');
  const save = document.getElementById('readerSavePreset');
  const exists = !!loadMyPreset();
  if (mine) {
    mine.disabled = !exists;
    mine.setAttribute('aria-disabled', String(!exists));
    const small = mine.querySelector('small');
    if (small) small.textContent = exists ? 'Your saved setup' : 'Save one below';
  }
  if (save) save.textContent = exists ? 'Update My preset' : 'Save current as My preset';
}

function updateUi() {
  const size = document.getElementById('readerFontSize');
  const sizeOut = document.getElementById('readerFontSizeValue');
  const leading = document.getElementById('readerLeading');
  const leadingOut = document.getElementById('readerLeadingValue');
  const tracking = document.getElementById('readerTracking');
  const trackingOut = document.getElementById('readerTrackingValue');
  if (size) size.value = String(prefs.fontSize);
  if (sizeOut) sizeOut.textContent = `${prefs.fontSize}px`;
  if (leading) leading.value = String(prefs.leading);
  if (leadingOut) leadingOut.textContent = prefs.leading.toFixed(2);
  if (tracking) tracking.value = String(prefs.tracking);
  if (trackingOut) trackingOut.textContent = trackingLabel(prefs.tracking);
  setPressed('[data-reader-mode-value]', prefs.mode, 'data-reader-mode-value');
  setPressed('[data-reader-font-value]', prefs.font, 'data-reader-font-value');
  setPressed('[data-reader-weight-value]', prefs.fontWeight, 'data-reader-weight-value');
  setPressed('[data-reader-measure-value]', prefs.measure, 'data-reader-measure-value');
  setPressed('[data-reader-align-value]', prefs.align, 'data-reader-align-value');
  setPressed('[data-reader-paragraph-value]', prefs.paragraph, 'data-reader-paragraph-value');
  setPressed('[data-reader-indent-value]', prefs.indent, 'data-reader-indent-value');
  setPressed('[data-reader-hyphens-value]', prefs.hyphens, 'data-reader-hyphens-value');
  updateMyPresetUi();
}

function applyPrefs({ save = true, repaginate = true } = {}) {
  prefs = normalize(prefs);
  const root = document.documentElement;
  const previousMode = root.dataset.readerMode;
  const modeChanged = previousMode !== prefs.mode;
  const leavingScroll = previousMode === 'scroll' && prefs.mode === 'paged';

  if (leavingScroll) {
    clearTimeout(scrollSyncTimer);
    updateScrollPosition({ force: true });
  }

  root.dataset.readerFont = prefs.font;
  root.dataset.readerMeasure = prefs.measure;
  root.dataset.readerAlign = prefs.align;
  root.dataset.readerParagraph = prefs.paragraph;
  root.dataset.readerIndent = prefs.indent;
  root.dataset.readerMode = prefs.mode;
  root.dataset.readerHyphens = prefs.hyphens;
  root.style.setProperty('--reader-font-size', `${prefs.fontSize}px`);
  root.style.setProperty('--reader-leading', String(prefs.leading));
  root.style.setProperty('--reader-font-weight', String(prefs.fontWeight));
  root.style.setProperty('--reader-tracking', `${prefs.tracking}em`);
  updateUi();
  if (save) savePrefs();
  if (repaginate) scheduleRepaginate();
  refreshScrollMetrics();
  syncReaderMode({ followRoute: modeChanged || !scrollState.blocks.length });

  if (leavingScroll && document.body.dataset.stage === 'read') {
    // The URL already tracks the visible Scroll block. Re-run the canonical
    // route once Pages becomes active so the hidden paginated engine lands on
    // that exact chapter/source offset instead of its last delayed sync point.
    queueMicrotask(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
  }
}

function preset(name) {
  const mode = prefs.mode;
  if (name === 'mine') {
    const saved = loadMyPreset();
    if (!saved) return;
    prefs = saved;
    applyPrefs();
    showToast('My preset applied');
    return;
  }
  if (name === 'comfort') {
    prefs = {
      ...DEFAULTS,
      fontSize: 20,
      font: 'clear',
      fontWeight: 400,
      tracking: 0.01,
      leading: 1.72,
      measure: 'narrow',
      align: 'left',
      paragraph: 'airy',
      indent: 'none',
      mode,
      hyphens: 'off',
    };
  } else if (name === 'large') {
    prefs = {
      ...DEFAULTS,
      fontSize: 25,
      font: 'clear',
      fontWeight: 500,
      tracking: 0.01,
      leading: 1.82,
      measure: 'narrow',
      align: 'left',
      paragraph: 'airy',
      indent: 'none',
      mode,
      hyphens: 'off',
    };
  } else {
    prefs = { ...DEFAULTS, mode };
  }
  applyPrefs();
}

function resetExperience() {
  prefs = { ...DEFAULTS };
  applyPrefs();
}

function markup() {
  return `
    <div class="reader-experience" id="readerExperience">
      <section class="experience-section" aria-labelledby="experienceTypographyTitle">
        <div class="experience-section-head">
          <div>
            <p class="experience-eyebrow">Reading</p>
            <h4 id="experienceTypographyTitle">Make the page yours</h4>
          </div>
          <button class="experience-reset" id="readerReset" type="button">Reset all</button>
        </div>

        <div class="experience-control experience-control-first">
          <div class="experience-label-row"><span>Reading mode</span><span>Turn pages or flow</span></div>
          <div class="experience-choice-row experience-mode-row" role="group" aria-label="Reading mode">
            <button class="experience-choice experience-mode" type="button" data-reader-mode-value="paged" aria-pressed="false">
              <strong>Pages</strong><small>Single or spread</small>
            </button>
            <button class="experience-choice experience-mode" type="button" data-reader-mode-value="scroll" aria-pressed="false">
              <strong>Scroll</strong><small>Continuous reading</small>
            </button>
          </div>
        </div>

        <div class="experience-preview" aria-label="Reading settings preview">
          <div class="experience-preview-title">A quiet chapter</div>
          <p class="experience-preview-sample">Good reading disappears into the story. Tune the page until the words feel effortless and entirely your own.</p>
        </div>

        <div class="experience-control">
          <div class="experience-label-row">
            <label for="readerFontSize">Text size</label>
            <output id="readerFontSizeValue" for="readerFontSize">18px</output>
          </div>
          <input class="experience-range" id="readerFontSize" type="range" min="14" max="32" step="1" value="18">
          <div class="experience-range-scale" aria-hidden="true"><span>A</span><span>A</span></div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row"><span>Typeface</span><span>8 curated choices</span></div>
          <div class="experience-fonts" role="group" aria-label="Typeface">
            <button class="experience-font" type="button" data-reader-font-value="book" aria-pressed="false" title="Source Serif 4"><strong>Aa</strong><small>Book</small></button>
            <button class="experience-font" type="button" data-reader-font-value="literary" aria-pressed="false" title="Literata"><strong>Aa</strong><small>Literata</small></button>
            <button class="experience-font" type="button" data-reader-font-value="warm" aria-pressed="false" title="Lora"><strong>Aa</strong><small>Lora</small></button>
            <button class="experience-font" type="button" data-reader-font-value="classic" aria-pressed="false" title="Georgia"><strong>Aa</strong><small>Classic</small></button>
            <button class="experience-font" type="button" data-reader-font-value="modern" aria-pressed="false" title="IBM Plex Sans"><strong>Aa</strong><small>Plex</small></button>
            <button class="experience-font" type="button" data-reader-font-value="clear" aria-pressed="false" title="Atkinson Hyperlegible"><strong>Aa</strong><small>Clear</small></button>
            <button class="experience-font" type="button" data-reader-font-value="humanist" aria-pressed="false" title="Humanist system sans"><strong>Aa</strong><small>Humanist</small></button>
            <button class="experience-font" type="button" data-reader-font-value="system" aria-pressed="false" title="Your device system font"><strong>Aa</strong><small>System</small></button>
          </div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row"><span>Text weight</span><span>Ink density</span></div>
          <div class="experience-choice-row" role="group" aria-label="Text weight">
            <button class="experience-choice" type="button" data-reader-weight-value="400" aria-pressed="false">Regular</button>
            <button class="experience-choice" type="button" data-reader-weight-value="500" aria-pressed="false">Medium</button>
            <button class="experience-choice" type="button" data-reader-weight-value="600" aria-pressed="false">Strong</button>
          </div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row">
            <label for="readerTracking">Letter spacing</label>
            <output id="readerTrackingValue" for="readerTracking">0</output>
          </div>
          <input class="experience-range" id="readerTracking" type="range" min="-0.02" max="0.08" step="0.01" value="0">
        </div>

        <div class="experience-control">
          <div class="experience-label-row">
            <label for="readerLeading">Line spacing</label>
            <output id="readerLeadingValue" for="readerLeading">1.55</output>
          </div>
          <input class="experience-range" id="readerLeading" type="range" min="1.3" max="2" step="0.05" value="1.55">
        </div>

        <div class="experience-divider"></div>

        <div class="experience-control">
          <div class="experience-label-row"><span>Line width</span><span>Reading measure</span></div>
          <div class="experience-choice-row" role="group" aria-label="Reading line width">
            <button class="experience-choice" type="button" data-reader-measure-value="narrow" aria-pressed="false">Narrow</button>
            <button class="experience-choice" type="button" data-reader-measure-value="balanced" aria-pressed="false">Balanced</button>
            <button class="experience-choice" type="button" data-reader-measure-value="wide" aria-pressed="false">Wide</button>
          </div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row"><span>Alignment</span><span>Choose your rhythm</span></div>
          <div class="experience-choice-row experience-mode-row" role="group" aria-label="Text alignment">
            <button class="experience-choice" type="button" data-reader-align-value="left" aria-pressed="false">Ragged right</button>
            <button class="experience-choice" type="button" data-reader-align-value="justify" aria-pressed="false">Justified</button>
          </div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row"><span>Hyphenation</span><span>Long-word breaks</span></div>
          <div class="experience-choice-row experience-mode-row" role="group" aria-label="Hyphenation">
            <button class="experience-choice" type="button" data-reader-hyphens-value="auto" aria-pressed="false">Automatic</button>
            <button class="experience-choice" type="button" data-reader-hyphens-value="off" aria-pressed="false">Off</button>
          </div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row"><span>First-line indent</span><span>Paragraph shape</span></div>
          <div class="experience-choice-row" role="group" aria-label="First-line paragraph indent">
            <button class="experience-choice" type="button" data-reader-indent-value="none" aria-pressed="false">None</button>
            <button class="experience-choice" type="button" data-reader-indent-value="gentle" aria-pressed="false">Gentle</button>
            <button class="experience-choice" type="button" data-reader-indent-value="classic" aria-pressed="false">Classic</button>
          </div>
        </div>

        <div class="experience-control">
          <div class="experience-label-row"><span>Paragraph rhythm</span><span>Space between thoughts</span></div>
          <div class="experience-choice-row" role="group" aria-label="Paragraph spacing">
            <button class="experience-choice" type="button" data-reader-paragraph-value="compact" aria-pressed="false">Compact</button>
            <button class="experience-choice" type="button" data-reader-paragraph-value="normal" aria-pressed="false">Normal</button>
            <button class="experience-choice" type="button" data-reader-paragraph-value="airy" aria-pressed="false">Airy</button>
          </div>
        </div>

        <div class="experience-divider"></div>
        <div class="experience-control">
          <div class="experience-label-row"><span>Quick starts</span><span>Fine-tune anything after</span></div>
          <div class="experience-presets experience-presets-expanded" role="group" aria-label="Reading presets">
            <button class="experience-preset" type="button" data-reader-preset="book">Book<small>Classic page</small></button>
            <button class="experience-preset" type="button" data-reader-preset="comfort">Comfort<small>Clear + airy</small></button>
            <button class="experience-preset" type="button" data-reader-preset="large">Large print<small>25px + clear</small></button>
            <button class="experience-preset experience-preset-mine" type="button" data-reader-preset="mine" disabled>My preset<small>Save one below</small></button>
          </div>
          <button class="experience-save-preset" id="readerSavePreset" type="button">Save current as My preset</button>
        </div>
      </section>
    </div>`;
}

function enhanceSettings() {
  const panel = document.getElementById('settingsPanel');
  const card = panel?.querySelector('.settings-card');
  if (!card || document.getElementById('readerExperience')) return;

  card.classList.add('experience-card');
  const title = card.querySelector('h3');
  if (title) title.textContent = 'Reading experience';
  const intro = document.createElement('p');
  intro.className = 'experience-intro';
  intro.textContent = 'Your choices stay on this device. Change the page, not the book.';
  title?.insertAdjacentElement('afterend', intro);
  intro.insertAdjacentHTML('afterend', markup());

  card.querySelectorAll('.setting-row').forEach((row) => {
    const label = row.querySelector('span')?.textContent?.trim();
    if (['Size', 'Typeface', 'Line height'].includes(label)) row.classList.add('experience-legacy-hidden');
  });

  const paperRow = [...card.querySelectorAll('.setting-row')].find((row) => row.querySelector('span')?.textContent?.trim() === 'Paper');
  if (paperRow) {
    const subhead = document.createElement('p');
    subhead.className = 'experience-subhead';
    subhead.textContent = 'Atmosphere';
    paperRow.insertAdjacentElement('beforebegin', subhead);
  }

  const actions = card.querySelector('.setting-actions');
  if (actions) {
    const subhead = document.createElement('p');
    subhead.className = 'experience-subhead';
    subhead.textContent = 'Tools';
    actions.insertAdjacentElement('beforebegin', subhead);
  }

  const settingsButton = document.getElementById('settingsBtn');
  settingsButton?.setAttribute('title', 'Reading experience');
  settingsButton?.setAttribute('aria-label', 'Reading experience');

  document.getElementById('readerFontSize')?.addEventListener('input', (event) => {
    prefs.fontSize = Number(event.target.value);
    applyPrefs();
  });
  document.getElementById('readerLeading')?.addEventListener('input', (event) => {
    prefs.leading = Number(event.target.value);
    applyPrefs();
  });
  document.getElementById('readerTracking')?.addEventListener('input', (event) => {
    prefs.tracking = Number(event.target.value);
    applyPrefs();
  });
  document.getElementById('readerReset')?.addEventListener('click', resetExperience);
  document.getElementById('readerSavePreset')?.addEventListener('click', saveMyPreset);

  document.querySelectorAll('[data-reader-mode-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.mode = button.dataset.readerModeValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-font-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.font = button.dataset.readerFontValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-weight-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.fontWeight = Number(button.dataset.readerWeightValue);
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-measure-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.measure = button.dataset.readerMeasureValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-align-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.align = button.dataset.readerAlignValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-hyphens-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.hyphens = button.dataset.readerHyphensValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-indent-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.indent = button.dataset.readerIndentValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-paragraph-value]').forEach((button) => {
    button.addEventListener('click', () => {
      prefs.paragraph = button.dataset.readerParagraphValue;
      applyPrefs();
    });
  });
  document.querySelectorAll('[data-reader-preset]').forEach((button) => {
    button.addEventListener('click', () => preset(button.dataset.readerPreset));
  });

  const help = document.querySelector('.help-keys');
  if (help && !help.querySelector('[data-experience-help]')) {
    const sizeLi = document.createElement('li');
    sizeLi.dataset.experienceHelp = 'true';
    sizeLi.innerHTML = '<kbd>+</kbd> <kbd>−</kbd> text size';
    help.appendChild(sizeLi);
    const modeLi = document.createElement('li');
    modeLi.dataset.experienceHelp = 'true';
    modeLi.innerHTML = '<kbd>v</kbd> pages / scroll';
    help.appendChild(modeLi);
  }

  updateUi();
}

function ensureScrollReader() {
  let reader = document.getElementById('scrollReader');
  if (reader) return reader;
  const stage = document.getElementById('bookStage');
  if (!stage) return null;

  reader = document.createElement('div');
  reader.id = 'scrollReader';
  reader.className = 'scroll-reader';
  reader.hidden = true;
  reader.tabIndex = 0;
  reader.setAttribute('role', 'region');
  reader.setAttribute('aria-label', 'Continuous reading view');
  reader.innerHTML = '<div class="scroll-document" id="scrollDocument"></div>';
  stage.appendChild(reader);

  reader.addEventListener('scroll', onScroll, { passive: true });
  reader.addEventListener('touchstart', (event) => event.stopPropagation());
  reader.addEventListener('touchend', (event) => event.stopPropagation());
  return reader;
}

async function loadScrollBook(slug) {
  const hub = await fetchText(`books/${slug}/README.md`);
  const meta = parseBookReadme(hub, slug);
  const chapters = await Promise.all(meta.contents.map(async (chapter) => {
    try {
      const markdown = await fetchText(`books/${slug}/${chapter.file}`);
      return { ...chapter, markdown };
    } catch {
      return {
        ...chapter,
        markdown: `# ${chapter.title}\n\nThis chapter file is missing from the repository.\n`,
      };
    }
  }));
  return { ...meta, chapters };
}

function relativeTop(element, ancestor) {
  let top = 0;
  let node = element;
  while (node && node !== ancestor) {
    top += node.offsetTop || 0;
    node = node.offsetParent;
  }
  return top;
}

function refreshScrollMetrics() {
  const reader = document.getElementById('scrollReader');
  if (!reader || !scrollState.blocks.length) return;
  requestAnimationFrame(() => {
    scrollState.tops = scrollState.blocks.map((block) => relativeTop(block.el, reader));
  });
}

async function buildScrollBook(slug) {
  const reader = ensureScrollReader();
  const doc = document.getElementById('scrollDocument');
  if (!reader || !doc || !slug) return;

  if (scrollState.slug === slug && scrollState.blocks.length) {
    refreshScrollMetrics();
    return;
  }
  if (scrollState.loading) {
    await scrollState.loading;
    if (scrollState.slug === slug) return;
  }

  scrollState.loading = (async () => {
    reader.setAttribute('aria-busy', 'true');
    doc.innerHTML = '<p class="scroll-loading">Preparing continuous view…</p>';
    try {
      const book = await loadScrollBook(slug);
      scrollState.slug = slug;
      scrollState.title = book.title || slug;
      scrollState.blocks = [];
      scrollState.tops = [];
      scrollState.activeIndex = -1;
      doc.innerHTML = '';

      for (const chapter of book.chapters) {
        const section = document.createElement('section');
        section.className = 'scroll-chapter';
        section.classList.toggle('title-page-chapter', isTitlePageChapter(chapter, book));
        section.dataset.chapter = chapter.id;
        section.setAttribute('aria-label', chapter.title);

        const blocks = blocksFromMarkdown(chapter.markdown, slug);
        blocks.forEach((block) => {
          const wrap = document.createElement('div');
          wrap.className = 'scroll-block';
          wrap.dataset.chapter = chapter.id;
          wrap.dataset.offset = String(block.start);
          wrap.innerHTML = block.html;
          section.appendChild(wrap);
          scrollState.blocks.push({
            el: wrap,
            chapter: chapter.id,
            title: chapter.title,
            start: block.start,
          });
        });
        applyNotes(section, loadNotes(slug), chapter.id);
        doc.appendChild(section);
      }

      refreshScrollMetrics();
    } finally {
      reader.removeAttribute('aria-busy');
    }
  })();

  try {
    await scrollState.loading;
  } finally {
    scrollState.loading = null;
  }
}

function nearestBlockIndex(route) {
  const sameChapter = scrollState.blocks
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => block.chapter === route.chapter);
  if (!sameChapter.length) return 0;
  let best = sameChapter[0];
  for (const candidate of sameChapter) {
    if (candidate.block.start <= route.offset) best = candidate;
    else break;
  }
  return best.index;
}

function scrollToRoute(route) {
  const reader = document.getElementById('scrollReader');
  if (!reader || !scrollState.blocks.length || route.view !== 'read') return;
  const index = nearestBlockIndex(route);
  const top = scrollState.tops[index] ?? relativeTop(scrollState.blocks[index].el, reader);
  programmaticScroll = true;
  reader.scrollTo({ top: Math.max(0, top - 24), behavior: 'auto' });
  window.setTimeout(() => {
    programmaticScroll = false;
    updateScrollPosition();
  }, 30);
}

function routeUrl(block) {
  const hash = readHash(scrollState.slug, block.chapter, block.start);
  const q = new URLSearchParams();
  q.set('b', scrollState.slug);
  q.set('c', block.chapter);
  if (block.start) q.set('o', String(block.start));
  return `${window.location.pathname}?${q.toString()}${hash}`;
}

function overlaysOpen() {
  return !!document.querySelector(
    '.toc-overlay.active, .stats-overlay.active, .search-overlay.active'
  );
}

function syncPagedStateFromScroll() {
  clearTimeout(scrollSyncTimer);
  scrollSyncTimer = window.setTimeout(() => {
    if (prefs.mode !== 'scroll' || overlaysOpen()) return;
    ignoreNextRouteSync = true;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    window.setTimeout(updateScrollPosition, 30);
  }, 260);
}

function updateScrollPosition({ force = false } = {}) {
  const reader = document.getElementById('scrollReader');
  if (!reader || (!force && prefs.mode !== 'scroll') || !scrollState.blocks.length) return;

  if (!scrollState.tops.length) refreshScrollMetrics();
  const probe = reader.scrollTop + Math.min(reader.clientHeight * 0.3, 220);
  const tops = scrollState.tops;
  let lo = 0;
  let hi = tops.length - 1;
  let index = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if ((tops[mid] ?? 0) <= probe) {
      index = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  const block = scrollState.blocks[index];
  scrollState.activeIndex = index;

  const maxScroll = Math.max(1, reader.scrollHeight - reader.clientHeight);
  const pct = Math.round(clamp(reader.scrollTop / maxScroll, 0, 1) * 100);
  const progress = document.getElementById('progressBarFill');
  const progressText = document.getElementById('progressPercent');
  const currentChapter = document.getElementById('currentChapter');
  if (progress) progress.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${pct}%`;
  if (currentChapter) currentChapter.textContent = block.title || '—';

  const nextUrl = routeUrl(block);
  const here = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl !== here && !programmaticScroll) {
    history.replaceState(null, '', nextUrl);
    if (!force) syncPagedStateFromScroll();
  }
}

function onScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = null;
    updateScrollPosition();
  });
}

async function syncReaderMode({ followRoute = true } = {}) {
  const reader = ensureScrollReader();
  if (!reader) return;
  const route = parseRoute();
  const active = prefs.mode === 'scroll' && document.body.dataset.stage === 'read' && route.view === 'read';
  reader.hidden = !active;
  if (!active) {
    const pop = document.getElementById('selPop');
    if (pop) pop.hidden = true;
    lastScrollSelection = null;
    setScrollSelectionActions(false);
    return;
  }

  try {
    await buildScrollBook(route.slug);
    reader.hidden = false;
    if (followRoute) scrollToRoute(route);
  } catch (error) {
    console.error('Could not prepare continuous reading view', error);
    reader.hidden = false;
    reader.removeAttribute('aria-busy');
    const doc = document.getElementById('scrollDocument');
    if (doc) doc.innerHTML = '<p class="scroll-loading">Continuous view could not be prepared. Switch back to Pages to keep reading.</p>';
  }
}

function handleRouteChange() {
  if (ignoreNextRouteSync) {
    ignoreNextRouteSync = false;
    return;
  }
  syncReaderMode({ followRoute: true });
}

function setScrollSelectionActions(active) {
  const card = document.getElementById('selCard');
  const report = document.getElementById('selReport');
  if (card) card.hidden = active;
  if (report) report.hidden = active;
}

function scrollSelection() {
  if (prefs.mode !== 'scroll' || document.body.dataset.stage !== 'read') return null;
  const sel = window.getSelection();
  const text = sel?.toString().trim();
  if (!text || !sel.anchorNode) return null;
  const anchor = sel.anchorNode.nodeType === Node.ELEMENT_NODE
    ? sel.anchorNode
    : sel.anchorNode.parentElement;
  const block = anchor?.closest?.('.scroll-block');
  if (!block) return null;
  const range = sel.rangeCount ? sel.getRangeAt(0) : null;
  if (!range) return null;
  return {
    text,
    chapter: block.dataset.chapter,
    offset: Number(block.dataset.offset) || 0,
    range,
  };
}

function positionScrollSelection() {
  const cur = scrollSelection();
  const pop = document.getElementById('selPop');
  if (!pop) return;
  if (!cur) {
    pop.hidden = true;
    lastScrollSelection = null;
    setScrollSelectionActions(false);
    return;
  }

  lastScrollSelection = cur;
  setScrollSelectionActions(true);
  pop.hidden = false;
  const rect = cur.range.getBoundingClientRect();
  const vv = window.visualViewport;
  const leftOff = vv ? vv.offsetLeft : 0;
  const topOff = vv ? vv.offsetTop : 0;
  const vw = vv ? vv.width : window.innerWidth;
  const popW = Math.min(pop.offsetWidth || 180, vw - 16);
  const left = Math.min(
    Math.max(8 + leftOff, rect.left + leftOff),
    leftOff + vw - popW - 8
  );
  const top = Math.max(8 + topOff, rect.top + topOff - 42);
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.setTimeout(() => {
    if (toast.textContent === message) toast.hidden = true;
  }, 1800);
}

async function copyScrollText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied');
  } catch {
    showToast('Could not copy');
  }
}

function refreshScrollNotes(chapter) {
  const route = parseRoute();
  if (!route.slug) return;
  const section = document.querySelector(`.scroll-chapter[data-chapter="${CSS.escape(chapter)}"]`);
  if (section) applyNotes(section, loadNotes(route.slug), chapter);
}

function syncAfterScrollNote() {
  ignoreNextRouteSync = true;
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  window.setTimeout(updateScrollPosition, 30);
}

function bindScrollSelection() {
  document.addEventListener('mouseup', () => {
    if (prefs.mode !== 'scroll') return;
    clearTimeout(selectionTimer);
    selectionTimer = window.setTimeout(positionScrollSelection, 24);
  });

  document.addEventListener('selectionchange', () => {
    if (prefs.mode !== 'scroll' || !('ontouchstart' in window)) return;
    clearTimeout(selectionTimer);
    selectionTimer = window.setTimeout(positionScrollSelection, 110);
  });

  document.getElementById('selCopy')?.addEventListener('click', (event) => {
    if (prefs.mode !== 'scroll' || !lastScrollSelection) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    copyScrollText(lastScrollSelection.text);
    document.getElementById('selPop').hidden = true;
  }, true);

  document.getElementById('selShare')?.addEventListener('click', (event) => {
    if (prefs.mode !== 'scroll' || !lastScrollSelection) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    copyScrollText(`“${lastScrollSelection.text}”\n${window.location.href}`);
    document.getElementById('selPop').hidden = true;
  }, true);

  document.getElementById('selNote')?.addEventListener('click', (event) => {
    if (prefs.mode !== 'scroll' || !lastScrollSelection) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    pendingScrollNote = { ...lastScrollSelection };
    document.getElementById('selPop').hidden = true;
    const quote = document.getElementById('noteQuote');
    const body = document.getElementById('noteBody');
    if (quote) quote.textContent = pendingScrollNote.text;
    if (body) body.value = '';
    document.getElementById('noteDialog')?.classList.add('active');
    body?.focus();
  }, true);

  document.getElementById('noteSave')?.addEventListener('click', (event) => {
    if (prefs.mode !== 'scroll' || !pendingScrollNote) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const route = parseRoute();
    if (!route.slug) return;
    addNote(route.slug, {
      chapter: pendingScrollNote.chapter,
      offset: pendingScrollNote.offset,
      quote: pendingScrollNote.text,
      body: document.getElementById('noteBody')?.value.trim() || '',
    });
    document.getElementById('noteDialog')?.classList.remove('active');
    const chapter = pendingScrollNote.chapter;
    pendingScrollNote = null;
    refreshScrollNotes(chapter);
    showToast('Note saved');
    syncAfterScrollNote();
  }, true);

  document.getElementById('noteCancel')?.addEventListener('click', () => {
    pendingScrollNote = null;
  }, true);
}

function nudgeSize(delta) {
  const next = clamp(prefs.fontSize + delta, 14, 32);
  if (next === prefs.fontSize) return;
  prefs.fontSize = next;
  applyPrefs();
}

function toggleMode() {
  prefs.mode = prefs.mode === 'paged' ? 'scroll' : 'paged';
  applyPrefs();
}

function scrollByReadingStep(direction) {
  const reader = document.getElementById('scrollReader');
  if (!reader) return;
  reader.scrollBy({
    top: direction * Math.max(160, reader.clientHeight * 0.78),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}

function keyboardControl(target) {
  return !!target?.closest?.('input, textarea, select, button, a, [contenteditable="true"]');
}

function bindKeyboard() {
  document.addEventListener('keydown', (event) => {
    if (keyboardControl(event.target)) return;
    if (document.body.dataset.stage !== 'read' || overlaysOpen()) return;

    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      nudgeSize(1);
      return;
    }
    if (event.key === '-') {
      event.preventDefault();
      nudgeSize(-1);
      return;
    }
    if (event.key === 'v' || event.key === 'V') {
      event.preventDefault();
      toggleMode();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (prefs.mode !== 'scroll' || document.body.dataset.stage !== 'read') return;
    if (keyboardControl(event.target) || overlaysOpen()) return;

    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      event.stopImmediatePropagation();
      scrollByReadingStep(-1);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      event.stopImmediatePropagation();
      scrollByReadingStep(1);
    }
  }, true);
}

function bindRoutesAndViewport() {
  window.addEventListener('hashchange', handleRouteChange);
  window.addEventListener('popstate', handleRouteChange);
  window.addEventListener('resize', () => {
    refreshScrollMetrics();
  });

  const stageObserver = new MutationObserver(() => syncReaderMode({ followRoute: true }));
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
}

function loadEnhancementStyles() {
  if (!document.querySelector('link[data-reader-experience-scroll]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../css/experience-scroll.css', import.meta.url).href;
    link.dataset.readerExperienceScroll = 'true';
    document.head.appendChild(link);
  }

  if (!document.querySelector('link[data-reader-font-library]')) {
    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=Lora:wght@400;500;600&display=swap';
    fonts.dataset.readerFontLibrary = 'true';
    document.head.appendChild(fonts);
  }

  if (document.getElementById('readerCustomizationStyles')) return;
  const style = document.createElement('style');
  style.id = 'readerCustomizationStyles';
  style.textContent = `
    :root { --reader-font-weight: 400; --reader-tracking: 0em; }
    [data-reader-font="book"] .page-inner, [data-reader-font="book"] .scroll-document, [data-reader-font="book"] .experience-preview-sample { font-family: "Source Serif 4", Georgia, serif !important; }
    [data-reader-font="literary"] .page-inner, [data-reader-font="literary"] .scroll-document, [data-reader-font="literary"] .experience-preview-sample { font-family: "Literata", Georgia, serif !important; }
    [data-reader-font="warm"] .page-inner, [data-reader-font="warm"] .scroll-document, [data-reader-font="warm"] .experience-preview-sample { font-family: "Lora", Georgia, serif !important; }
    [data-reader-font="classic"] .page-inner, [data-reader-font="classic"] .scroll-document, [data-reader-font="classic"] .experience-preview-sample { font-family: Georgia, "Times New Roman", serif !important; }
    [data-reader-font="modern"] .page-inner, [data-reader-font="modern"] .scroll-document, [data-reader-font="modern"] .experience-preview-sample { font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important; }
    [data-reader-font="clear"] .page-inner, [data-reader-font="clear"] .scroll-document, [data-reader-font="clear"] .experience-preview-sample { font-family: "Atkinson Hyperlegible", Verdana, sans-serif !important; }
    [data-reader-font="humanist"] .page-inner, [data-reader-font="humanist"] .scroll-document, [data-reader-font="humanist"] .experience-preview-sample { font-family: "Trebuchet MS", "Segoe UI", sans-serif !important; }
    [data-reader-font="system"] .page-inner, [data-reader-font="system"] .scroll-document, [data-reader-font="system"] .experience-preview-sample { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important; }
    .page-inner, .scroll-document, .experience-preview-sample { font-weight: var(--reader-font-weight); letter-spacing: var(--reader-tracking); }
    [data-reader-indent="gentle"] .page-inner p + p, [data-reader-indent="gentle"] .scroll-document p + p, [data-reader-indent="gentle"] .experience-preview-sample { text-indent: .85em; }
    [data-reader-indent="classic"] .page-inner p + p, [data-reader-indent="classic"] .scroll-document p + p, [data-reader-indent="classic"] .experience-preview-sample { text-indent: 1.45em; }
    .experience-preview-title { max-width: var(--reader-preview-measure); margin: 0 auto .32rem; color: var(--accent); font: 600 .64rem/1.1 "IBM Plex Sans", sans-serif; letter-spacing: .11em; text-transform: uppercase; }
    .experience-font[data-reader-font-value="literary"] strong { font-family: "Literata", Georgia, serif; }
    .experience-font[data-reader-font-value="warm"] strong { font-family: "Lora", Georgia, serif; }
    .experience-font[data-reader-font-value="humanist"] strong { font-family: "Trebuchet MS", "Segoe UI", sans-serif; }
    .experience-font[data-reader-font-value="system"] strong { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .experience-presets-expanded { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .experience-save-preset { width: 100%; min-height: 2.5rem; margin-top: .48rem; border: 1px dashed color-mix(in srgb, var(--accent) 60%, var(--border)); border-radius: 9px; background: color-mix(in srgb, var(--accent-glow) 42%, transparent); color: var(--accent); cursor: pointer; font: 500 .72rem/1.2 "IBM Plex Sans", sans-serif; }
    .experience-save-preset:hover, .experience-save-preset:focus-visible { border-style: solid; background: var(--accent-glow); }
    .experience-preset:disabled { cursor: default; opacity: .48; }
    @media (max-width: 700px) {
      .experience-fonts { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .experience-font { min-height: 3.45rem; }
      .experience-presets-expanded { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .experience-preview-title { font-size: .57rem; }
      .experience-save-preset { min-height: 2.65rem; border-radius: 10px; }
    }
    @media (max-width: 360px) {
      .experience-font { min-height: 3.2rem; }
      .experience-font strong { font-size: 1rem; }
      .experience-font small { font-size: .51rem; }
    }
  `;
  document.head.appendChild(style);
}

function initialize() {
  loadEnhancementStyles();
  prefs = loadPrefs();
  applyPrefs({ save: true, repaginate: false });
  enhanceSettings();
  ensureScrollReader();
  bindKeyboard();
  bindScrollSelection();
  bindRoutesAndViewport();
  syncReaderMode({ followRoute: true });
}

function waitForImprint(attempt = 0) {
  if (window.__IMPRINT || attempt >= 100) {
    initialize();
    return;
  }
  window.setTimeout(() => waitForImprint(attempt + 1), 50);
}

if (document.readyState === 'complete') waitForImprint();
else window.addEventListener('load', () => waitForImprint(), { once: true });
