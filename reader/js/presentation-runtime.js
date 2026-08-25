import { parseRoute } from './router.js';
import {
  READER_PRESENTATION_VERSION,
  clearAllReaderPersonalization,
  loadBookPresentation,
  markReaderPersonalized,
  migrateReaderPersonalization,
  readerPersonalizationState,
} from './presentation.js';

const DEFAULT_TYPOGRAPHY = Object.freeze({
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

let applying = false;
let activeSlug = '';
let activePresentation = null;
let routeTimer = null;
let appearanceRepairTimer = null;
let baseAppearance = null;

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'obb';
}

function persistenceKeys() {
  const prefix = storagePrefix();
  return [
    `${prefix}:prefs`,
    `${prefix}:reader-experience`,
    `${prefix}:reader-warmth`,
  ];
}

function snapshotPersistence() {
  try {
    return new Map(persistenceKeys().map((key) => [key, localStorage.getItem(key)]));
  } catch {
    return new Map();
  }
}

function restorePersistence(snapshot) {
  if (!snapshot.size) return;
  try {
    snapshot.forEach((value, key) => {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    });
  } catch {
    // Reading still works when browser storage is unavailable.
  }
}

function sessionOnly(callback) {
  const snapshot = snapshotPersistence();
  applying = true;
  try {
    callback();
  } finally {
    restorePersistence(snapshot);
    applying = false;
  }
}

function systemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function captureBaseAppearance() {
  if (baseAppearance) return baseAppearance;
  baseAppearance = {
    theme: document.documentElement.dataset.theme || systemTheme(),
    warmth: document.documentElement.dataset.readerWarmth || 'off',
  };
  return baseAppearance;
}

function resolvedPresentation(presentation) {
  const base = captureBaseAppearance();
  return {
    appearance: {
      theme: presentation?.appearance?.theme || base.theme,
      warmth: presentation?.appearance?.warmth || base.warmth,
    },
    typography: {
      ...DEFAULT_TYPOGRAPHY,
      ...(presentation?.typography || {}),
    },
  };
}

function setRange(id, value) {
  const input = document.getElementById(id);
  if (!input || Number(input.value) === Number(value)) return;
  input.value = String(value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function clickChoice(selector) {
  const button = document.querySelector(selector);
  if (!button || button.getAttribute('aria-pressed') === 'true') return false;
  button.click();
  return true;
}

function activateChoice(selector) {
  const button = document.querySelector(selector);
  if (!button) return false;
  button.click();
  return true;
}

function escapeCss(value) {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(String(value));
  return String(value).replace(/["\\]/g, '\\$&');
}

function applyTypography(typography) {
  const root = document.documentElement;
  setRange('readerFontSize', typography.fontSize);
  setRange('readerTracking', typography.tracking);
  setRange('readerLeading', typography.leading);

  if (root.dataset.readerFont !== typography.font) {
    clickChoice(`[data-reader-font-value="${escapeCss(typography.font)}"]`);
  }
  if (Number.parseFloat(root.style.getPropertyValue('--reader-font-weight')) !== Number(typography.fontWeight)) {
    clickChoice(`[data-reader-weight-value="${typography.fontWeight}"]`);
  }
  if (root.dataset.readerMeasure !== typography.measure) {
    clickChoice(`[data-reader-measure-value="${escapeCss(typography.measure)}"]`);
  }
  if (root.dataset.readerAlign !== typography.align) {
    clickChoice(`[data-reader-align-value="${escapeCss(typography.align)}"]`);
  }
  if (root.dataset.readerParagraph !== typography.paragraph) {
    clickChoice(`[data-reader-paragraph-value="${escapeCss(typography.paragraph)}"]`);
  }
  if (root.dataset.readerIndent !== typography.indent) {
    clickChoice(`[data-reader-indent-value="${escapeCss(typography.indent)}"]`);
  }
  if (root.dataset.readerHyphens !== typography.hyphens) {
    clickChoice(`[data-reader-hyphens-value="${escapeCss(typography.hyphens)}"]`);
  }
  if (root.dataset.readerMode !== typography.mode) {
    clickChoice(`[data-reader-mode-value="${escapeCss(typography.mode)}"]`);
  }
}

function applyAppearance(appearance) {
  const root = document.documentElement;
  if (root.dataset.theme !== appearance.theme) {
    const escaped = escapeCss(appearance.theme);
    const activated = activateChoice(
      `#readerAtmosphere .atmosphere-option[data-paper="${escaped}"], [data-paper="${escaped}"]`
    );
    if (!activated || root.dataset.theme !== appearance.theme) root.dataset.theme = appearance.theme;
  }
  if (root.dataset.readerWarmth !== appearance.warmth) {
    const activated = activateChoice(`[data-reader-warmth="${escapeCss(appearance.warmth)}"]`);
    if (!activated || root.dataset.readerWarmth !== appearance.warmth) {
      root.dataset.readerWarmth = appearance.warmth;
      const active = appearance.warmth !== 'off';
      document.getElementById('nightLightOverlay')?.classList.toggle('active', active);
      document.getElementById('lampPool')?.classList.toggle('active', active);
    }
  }
}

function hasBookDefaults(presentation) {
  return !!(
    presentation?.preset
    || Object.keys(presentation?.appearance || {}).length
    || Object.keys(presentation?.typography || {}).length
  );
}

function presetLabel() {
  if (!activePresentation?.preset) return hasBookDefaults(activePresentation) ? 'Custom' : 'Bookself default';
  return activePresentation.preset
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function statusText() {
  const state = readerPersonalizationState();
  const label = presetLabel();
  if (state.appearance && state.typography) return `Your browser settings · book suggests ${label}`;
  if (state.appearance) return `Your colors · ${label} typography`;
  if (state.typography) return `${label} colors · your typography`;
  return hasBookDefaults(activePresentation) ? `Following ${label}` : 'Following Bookself defaults';
}

function syncStatus() {
  const state = readerPersonalizationState();
  const root = document.documentElement;
  root.dataset.readerPresentation = activePresentation?.preset || (hasBookDefaults(activePresentation) ? 'custom' : 'default');
  root.dataset.readerPresentationVersion = String(READER_PRESENTATION_VERSION);
  root.dataset.readerPresentationAppearance = state.appearance ? 'reader' : 'book';
  root.dataset.readerPresentationTypography = state.typography ? 'reader' : 'book';
  const out = document.getElementById('readerPresentationStatus');
  if (out) out.textContent = statusText();
  const button = document.getElementById('readerUseBookDefaults');
  if (button) button.disabled = !(state.appearance || state.typography);
}

function installUi() {
  const section = document.querySelector('#readerExperience .experience-section');
  if (!section || document.getElementById('readerPresentationTools')) return false;

  const tools = document.createElement('div');
  tools.id = 'readerPresentationTools';
  tools.className = 'reader-presentation-tools';
  tools.innerHTML = `
    <div class="reader-presentation-source">
      <span>Design source</span>
      <strong id="readerPresentationStatus">${statusText()}</strong>
    </div>
    <button id="readerUseBookDefaults" class="experience-save-preset" type="button">
      Use this book’s design
    </button>
    <p class="reader-presentation-note">Author defaults are recommendations. Your changes stay in this browser and never edit the publication.</p>`;

  const firstControl = section.querySelector('.experience-control-first');
  if (firstControl) firstControl.insertAdjacentElement('beforebegin', tools);
  else section.appendChild(tools);

  document.getElementById('readerUseBookDefaults')?.addEventListener('click', async () => {
    clearAllReaderPersonalization();
    await applyCurrentPresentation({ force: true });
    syncStatus();
    showToast('Using this book’s design');
  });

  if (!document.getElementById('readerPresentationRuntimeStyles')) {
    const style = document.createElement('style');
    style.id = 'readerPresentationRuntimeStyles';
    style.textContent = `
      .reader-presentation-tools { margin: .7rem 0 1rem; padding: .72rem; border: 1px solid color-mix(in srgb, var(--border) 78%, transparent); border-radius: 10px; background: color-mix(in srgb, var(--bg-secondary) 82%, transparent); }
      .reader-presentation-source { display: flex; align-items: baseline; justify-content: space-between; gap: .8rem; color: var(--text-secondary); font: 500 .68rem/1.3 "IBM Plex Sans", sans-serif; }
      .reader-presentation-source strong { color: var(--accent); font-weight: 600; text-align: right; }
      .reader-presentation-tools .experience-save-preset { margin-top: .55rem; }
      .reader-presentation-note { margin: .48rem 0 0; color: var(--text-muted); font: 400 .62rem/1.45 "IBM Plex Sans", sans-serif; }
      .reader-presentation-tools button:disabled { opacity: .5; cursor: default; }
    `;
    document.head.appendChild(style);
  }

  syncStatus();
  return true;
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

function trustedTypographyTarget(target) {
  return !!target?.closest?.([
    '#readerFontSize', '#readerTracking', '#readerLeading',
    '[data-reader-font-value]', '[data-reader-weight-value]', '[data-reader-measure-value]',
    '[data-reader-align-value]', '[data-reader-paragraph-value]', '[data-reader-indent-value]',
    '[data-reader-hyphens-value]', '[data-reader-mode-value]', '[data-reader-preset]',
    '#readerSavePreset', '#readerReset', '#fontDecrease', '#fontIncrease', '[data-font]', '[data-leading]',
  ].join(','));
}

function trustedAppearanceTarget(target) {
  return !!target?.closest?.('[data-paper], [data-reader-warmth], #nightLightBtn, #readerReset');
}

function bindPersonalizationTracking() {
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || applying) return;
    let changed = false;
    if (trustedTypographyTarget(event.target)) {
      markReaderPersonalized('typography');
      changed = true;
    }
    if (trustedAppearanceTarget(event.target)) {
      markReaderPersonalized('appearance');
      changed = true;
    }
    if (changed) queueMicrotask(syncStatus);
  }, true);

  document.addEventListener('input', (event) => {
    if (!event.isTrusted || applying) return;
    if (!trustedTypographyTarget(event.target)) return;
    markReaderPersonalized('typography');
    queueMicrotask(syncStatus);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!event.isTrusted || applying || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('input, textarea, select, button, [contenteditable="true"]')) return;
    if (document.body.dataset.stage !== 'read') return;
    if (!['+', '=', '-', 'v', 'V'].includes(event.key)) return;
    markReaderPersonalized('typography');
    queueMicrotask(syncStatus);
  }, true);
}

function repairBookAppearance() {
  clearTimeout(appearanceRepairTimer);
  appearanceRepairTimer = window.setTimeout(() => {
    if (applying || !activePresentation || readerPersonalizationState().appearance) return;
    const expected = resolvedPresentation(activePresentation).appearance;
    const root = document.documentElement;
    if (root.dataset.theme === expected.theme && root.dataset.readerWarmth === expected.warmth) return;
    sessionOnly(() => applyAppearance(expected));
  }, 0);
}

function watchOwnedAppearance() {
  const root = document.documentElement;
  const observer = new MutationObserver((records) => {
    if (applying || readerPersonalizationState().appearance) return;
    if (!records.some((record) => ['data-theme', 'data-reader-warmth'].includes(record.attributeName))) return;
    repairBookAppearance();
  });
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-theme', 'data-reader-warmth'],
  });
}

async function applyCurrentPresentation({ force = false } = {}) {
  const route = parseRoute();
  const slug = route.slug || '';
  if (!slug) return;
  const presentation = await loadBookPresentation(slug);
  activeSlug = slug;
  activePresentation = presentation;
  const resolved = resolvedPresentation(presentation);
  const state = readerPersonalizationState();

  sessionOnly(() => {
    if (force || !state.appearance) applyAppearance(resolved.appearance);
    if (force || !state.typography) applyTypography(resolved.typography);
  });
  syncStatus();
}

function scheduleRouteSync() {
  clearTimeout(routeTimer);
  routeTimer = window.setTimeout(async () => {
    const slug = parseRoute().slug || '';
    if (!slug || slug === activeSlug) return;
    await applyCurrentPresentation();
  }, 40);
}

async function initialize() {
  migrateReaderPersonalization();
  bindPersonalizationTracking();
  watchOwnedAppearance();

  let attempts = 0;
  while ((!window.__IMPRINT || !document.getElementById('readerExperience')) && attempts < 120) {
    await new Promise((resolve) => window.setTimeout(resolve, 50));
    attempts += 1;
  }

  captureBaseAppearance();
  installUi();
  await applyCurrentPresentation();
  window.addEventListener('hashchange', scheduleRouteSync);
  window.addEventListener('popstate', scheduleRouteSync);

  const observer = new MutationObserver(() => {
    installUi();
    syncStatus();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
}

if (document.readyState === 'complete') initialize();
else window.addEventListener('load', initialize, { once: true });
