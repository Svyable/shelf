import {
  READER_FONT_LIBRARY_HREF,
  readerFontCanAffectPagination,
  readerFontNeedsLibrary,
  readerFontRequest,
  readerFontRequestKey,
} from './font-readiness.js';

const root = document.documentElement;
let installed = false;
let requestRevision = 0;
let lastSettledKey = '';
let lastObservedKey = '';
let onGeometryReady = null;

function currentFontState() {
  const styles = getComputedStyle(root);
  const name = root.dataset.readerFont || 'book';
  const weight = Number(styles.getPropertyValue('--reader-font-weight')) || 400;
  const size = Number.parseFloat(styles.getPropertyValue('--reader-font-size')) || 18;
  return { name, weight, size };
}

function ensureFontLibrary() {
  let link = document.querySelector('link[data-reader-font-library]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.dataset.readerFontLibrary = 'true';
    document.head.appendChild(link);
  }
  if (link.dataset.readerFontReadinessObserved !== 'true') {
    link.dataset.readerFontReadinessObserved = 'true';
    link.addEventListener('load', () => settleActiveFont({ reason: 'stylesheet' }), { passive: true });
  }
  if (link.href !== READER_FONT_LIBRARY_HREF) link.href = READER_FONT_LIBRARY_HREF;
  return link;
}

function setStatus(name, status) {
  root.dataset.readerFontStatus = status;
  document.querySelectorAll('[data-reader-font-value]').forEach((button) => {
    const active = button.dataset.readerFontValue === name;
    button.dataset.fontStatus = active ? status : '';
    if (active) button.setAttribute('aria-busy', String(status === 'loading'));
    else button.removeAttribute('aria-busy');
  });
}

function waitForFont(fontSet, probe, sample, timeoutMs = 2800) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(result);
    };
    const timer = window.setTimeout(() => finish('timeout'), timeoutMs);
    fontSet.load(probe, sample).then(
      () => finish('loaded'),
      () => finish('failed')
    );
  });
}

function notifyGeometryReady(key, request) {
  if (lastSettledKey === key) return;
  lastSettledKey = key;
  if (!readerFontCanAffectPagination(request.name)) return;
  onGeometryReady?.({ font: request.name, weight: request.weight });
  window.dispatchEvent(new CustomEvent('readerfontready', {
    detail: { font: request.name, weight: request.weight },
  }));
}

async function settleActiveFont({ reason = 'state' } = {}) {
  const state = currentFontState();
  const key = readerFontRequestKey(state.name, state.weight);
  const request = readerFontRequest(state.name, state.weight, state.size);

  if (reason === 'state' && key === lastObservedKey && root.dataset.readerFontStatus === 'ready') return;
  lastObservedKey = key;
  const revision = ++requestRevision;

  if (!readerFontCanAffectPagination(request.name)) {
    setStatus(request.name, 'ready');
    lastSettledKey = key;
    return;
  }

  if (readerFontNeedsLibrary(request.name)) ensureFontLibrary();
  if (!document.fonts?.load || !document.fonts?.check) {
    setStatus(request.name, 'fallback');
    return;
  }

  setStatus(request.name, 'loading');
  const sample = 'Bookself reading geometry 0123456789';
  await waitForFont(document.fonts, request.probe, sample);
  if (revision !== requestRevision) return;

  const ready = document.fonts.check(request.probe, sample);
  setStatus(request.name, ready ? 'ready' : 'fallback');
  if (ready) notifyGeometryReady(key, request);
}

function observeTypography() {
  const observer = new MutationObserver(() => {
    const state = currentFontState();
    const key = readerFontRequestKey(state.name, state.weight);
    if (key === lastObservedKey) return;
    lastSettledKey = '';
    settleActiveFont();
  });
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-reader-font', 'style'],
  });

  document.fonts?.addEventListener?.('loadingdone', () => {
    if (root.dataset.readerFontStatus !== 'ready') settleActiveFont({ reason: 'fontset' });
  });
}

export function installFontReadiness({ onReady } = {}) {
  if (typeof onReady === 'function') onGeometryReady = onReady;
  if (installed) {
    settleActiveFont({ reason: 'install' });
    return;
  }
  installed = true;
  root.dataset.readerFontReadiness = 'enhanced';
  ensureFontLibrary();
  observeTypography();
  settleActiveFont({ reason: 'initial' });
}
