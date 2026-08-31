import {
  clampGuideY,
  guideHeight,
  guideVisible,
  nextGuideY,
  normalizeGuideMode,
  shouldTrackPointer,
} from './reading-guide-model.js';

const STORAGE_KEY = 'bookself:reading-guide:v1';
const CONTENT_SELECTOR = '.page-inner, .scroll-document';
const OVERLAY_IDS = [
  'tocOverlay',
  'progressPanel',
  'settingsPanel',
  'searchOverlay',
  'noteDialog',
  'helpOverlay',
];

function loadMode() {
  try {
    return normalizeGuideMode(localStorage.getItem(STORAGE_KEY));
  } catch {
    return 'off';
  }
}

function saveMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, normalizeGuideMode(mode));
  } catch {}
}

function installStyles() {
  if (document.getElementById('readingGuideStyles')) return;
  const style = document.createElement('style');
  style.id = 'readingGuideStyles';
  style.textContent = `
    .reading-guide { position:fixed; z-index:75; inset:0 0 auto 0; width:100vw; height:var(--reading-guide-height,3rem); pointer-events:none; opacity:0; transform:translate3d(0,var(--reading-guide-y,50vh),0); border-block:1px solid color-mix(in srgb,currentColor 18%,transparent); background:color-mix(in srgb,Canvas 8%,transparent); box-shadow:0 -100vh 0 100vh rgba(18,17,14,.16),0 100vh 0 100vh rgba(18,17,14,.16); transition:opacity 120ms ease-out; will-change:transform,opacity; }
    .reading-guide.is-visible { opacity:1; }
    [data-theme="dark"] .reading-guide,[data-theme="night"] .reading-guide { box-shadow:0 -100vh 0 100vh rgba(0,0,0,.28),0 100vh 0 100vh rgba(0,0,0,.28); }
    .reading-guide-control { margin-block-start:.9rem; padding-block-start:.8rem; border-block-start:1px solid color-mix(in srgb,currentColor 14%,transparent); }
    .reading-guide-control legend { font:inherit; font-weight:650; padding:0; margin-block-end:.45rem; }
    .reading-guide-options { display:flex; flex-wrap:wrap; gap:.4rem; }
    .reading-guide-options button[aria-pressed="true"] { outline:2px solid currentColor; outline-offset:1px; }
    .reading-guide-help { display:block; margin-block-start:.45rem; opacity:.72; font-size:.82em; line-height:1.35; }
    @media (prefers-reduced-motion:reduce) { .reading-guide { transition:none; } }
    @media (forced-colors:active) { .reading-guide { background:transparent; border-color:Highlight; box-shadow:none; } }
  `;
  document.head.appendChild(style);
}

function installControl(onMode) {
  const panel = document.getElementById('settingsPanel');
  if (!panel || panel.querySelector('[data-reading-guide-control]')) return null;
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'reading-guide-control';
  fieldset.dataset.readingGuideControl = '';
  fieldset.innerHTML = `
    <legend>Reading guide</legend>
    <div class="reading-guide-options" role="group" aria-label="Reading guide size">
      <button type="button" data-guide-mode="off">Off</button>
      <button type="button" data-guide-mode="line">Line</button>
      <button type="button" data-guide-mode="band">Band</button>
    </div>
    <small class="reading-guide-help">Tracks your place without changing page layout. Alt+G cycles; Alt+↑/↓ nudges.</small>
  `;
  panel.appendChild(fieldset);
  fieldset.addEventListener('click', (event) => {
    const button = event.target.closest('[data-guide-mode]');
    if (button) onMode(button.dataset.guideMode);
  });
  return fieldset;
}

function activeOverlays() { return OVERLAY_IDS.some((id) => document.getElementById(id)?.classList.contains('active')); }
function inEditableTarget(target) { return !!target?.closest?.('input, textarea, select, [contenteditable="true"]'); }
function viewportHeight() { return window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 0; }
function targetLineHeight(target) {
  const content = target?.closest?.(CONTENT_SELECTOR) || document.querySelector(CONTENT_SELECTOR);
  if (!content) return 24;
  const value = Number.parseFloat(getComputedStyle(content).lineHeight);
  return Number.isFinite(value) ? value : 24;
}

export function installReadingGuide(doc = document) {
  if (!doc?.body || doc.body.dataset.readingGuideInstalled === 'true') return null;
  doc.body.dataset.readingGuideInstalled = 'true';
  installStyles();
  const guide = doc.createElement('div');
  guide.className = 'reading-guide';
  guide.setAttribute('aria-hidden', 'true');
  doc.body.appendChild(guide);
  let mode = loadMode();
  let y = viewportHeight() / 2;
  let lineHeight = 24;
  let fieldset = null;

  function updateButtons() {
    fieldset?.querySelectorAll('[data-guide-mode]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.guideMode === mode)));
  }
  function render() {
    const height = guideHeight(mode, lineHeight);
    y = clampGuideY(y, viewportHeight(), height);
    guide.style.setProperty('--reading-guide-height', `${height}px`);
    guide.style.setProperty('--reading-guide-y', `${Math.round(y - height / 2)}px`);
    guide.classList.toggle('is-visible', guideVisible({ mode, stage: doc.body.dataset.stage, overlaysOpen: activeOverlays(), documentVisible: doc.visibilityState !== 'hidden' }));
    updateButtons();
  }
  function setMode(next) { mode = normalizeGuideMode(next); saveMode(mode); render(); }
  function cycleMode() { const order = ['off', 'line', 'band']; setMode(order[(order.indexOf(mode) + 1) % order.length]); }
  fieldset = installControl(setMode);

  doc.addEventListener('pointermove', (event) => {
    if (mode === 'off' || !shouldTrackPointer(event.pointerType) || !event.target.closest?.(CONTENT_SELECTOR)) return;
    lineHeight = targetLineHeight(event.target); y = event.clientY; render();
  }, { passive: true });
  doc.addEventListener('pointerdown', (event) => {
    if (mode === 'off' || !shouldTrackPointer(event.pointerType) || !event.target.closest?.(CONTENT_SELECTOR)) return;
    lineHeight = targetLineHeight(event.target); y = event.clientY; render();
  }, { passive: true });
  doc.addEventListener('focusin', (event) => {
    if (mode === 'off' || !event.target.closest?.(CONTENT_SELECTOR)) return;
    const rect = event.target.getBoundingClientRect?.(); lineHeight = targetLineHeight(event.target);
    if (rect?.height) y = rect.top + Math.min(rect.height / 2, lineHeight * 1.6); render();
  });
  doc.addEventListener('keydown', (event) => {
    if (!event.altKey || event.ctrlKey || event.metaKey || inEditableTarget(event.target)) return;
    if (event.key.toLowerCase() === 'g') { event.preventDefault(); cycleMode(); return; }
    if (mode === 'off' || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
    event.preventDefault();
    y = nextGuideY(y, event.key === 'ArrowDown' ? 1 : -1, viewportHeight(), guideHeight(mode, lineHeight)); render();
  });

  const observer = new MutationObserver(render);
  observer.observe(doc.body, { attributes: true, attributeFilter: ['data-stage'] });
  for (const id of OVERLAY_IDS) { const node = doc.getElementById(id); if (node) observer.observe(node, { attributes: true, attributeFilter: ['class', 'hidden'] }); }
  doc.addEventListener('visibilitychange', render);
  window.addEventListener('resize', render, { passive: true });
  window.visualViewport?.addEventListener('resize', render, { passive: true });
  window.visualViewport?.addEventListener('scroll', render, { passive: true });
  render();
  return Object.freeze({ get mode() { return mode; }, setMode, render, destroy() { observer.disconnect(); guide.remove(); fieldset?.remove(); delete doc.body.dataset.readingGuideInstalled; } });
}

if (typeof document !== 'undefined') installReadingGuide(document);
