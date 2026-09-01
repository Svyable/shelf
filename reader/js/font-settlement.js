import { FONT_SETTLEMENT, fontLoadSpec, shouldRefreshReader } from './font-settlement-model.js';

const PROBE_TEXT = 'Hamburgefonts 0123456789 — Reading rhythm ffi AV';
const FAMILY_BY_READER_FONT = Object.freeze({
  book: '"Source Serif 4", Georgia, serif',
  literary: '"Literata", Georgia, serif',
  warm: '"Lora", Georgia, serif',
  classic: 'Georgia, "Times New Roman", serif',
  modern: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  clear: '"Atkinson Hyperlegible", Verdana, sans-serif',
  humanist: '"Trebuchet MS", "Segoe UI", sans-serif',
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

function readerMode(root = document.documentElement) {
  return root.dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
}

function activeFamily(root = document.documentElement) {
  return FAMILY_BY_READER_FONT[root.dataset.readerFont] || FAMILY_BY_READER_FONT.book;
}

function activeWeight(root = document.documentElement) {
  const raw = getComputedStyle(root).getPropertyValue('--reader-font-weight');
  const weight = Number.parseInt(raw, 10);
  return Number.isFinite(weight) ? weight : 400;
}

function activeSize(root = document.documentElement) {
  const raw = getComputedStyle(root).getPropertyValue('--reader-font-size');
  const size = Number.parseFloat(raw);
  return Number.isFinite(size) ? size : 18;
}

function createProbe(root = document) {
  const probe = root.createElement('span');
  probe.dataset.readerFontProbe = 'true';
  probe.setAttribute('aria-hidden', 'true');
  probe.textContent = PROBE_TEXT;
  Object.assign(probe.style, {
    position: 'fixed',
    left: '-10000px',
    top: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    contain: 'layout style paint',
  });
  root.body?.appendChild(probe);
  return probe;
}

function measureProbe(probe, root = document.documentElement) {
  probe.style.fontFamily = activeFamily(root);
  probe.style.fontWeight = String(activeWeight(root));
  probe.style.fontSize = `${activeSize(root)}px`;
  probe.style.letterSpacing = getComputedStyle(root).getPropertyValue('--reader-tracking') || '0em';
  const rect = probe.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

function dispatchRefresh(reason) {
  const body = document.body;
  body?.setAttribute('data-reader-font-settling', '');
  window.dispatchEvent(new CustomEvent('reader:font-settled', { detail: { reason } }));
  window.dispatchEvent(new Event('resize'));
  requestAnimationFrame(() => requestAnimationFrame(() => {
    body?.removeAttribute('data-reader-font-settling');
  }));
}

export function installFontSettlement(root = document) {
  if (!root?.documentElement || root.documentElement.dataset.fontSettlement === 'installed') return;
  if (!root.fonts?.load) return;
  root.documentElement.dataset.fontSettlement = 'installed';

  const probe = createProbe(root);
  let signature = measureProbe(probe);
  let generation = 0;
  let timer = 0;

  const settle = (reason) => {
    const mine = ++generation;
    clearTimeout(timer);
    timer = window.setTimeout(async () => {
      const before = signature;
      const spec = fontLoadSpec({
        family: activeFamily(root.documentElement),
        weight: activeWeight(root.documentElement),
        size: activeSize(root.documentElement),
      });

      try {
        await Promise.race([
          root.fonts.load(spec, PROBE_TEXT),
          new Promise((resolve) => window.setTimeout(resolve, FONT_SETTLEMENT.timeoutMs)),
        ]);
      } catch {
        // Font loading is progressive enhancement; measurement below still decides.
      }
      if (mine !== generation) return;

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (mine !== generation) return;
      const after = measureProbe(probe);
      const stage = root.body?.dataset.stage || '';
      const active = !root.hidden;
      if (stage !== 'read') {
        signature = after;
        return;
      }
      if (!active) return;
      signature = after;
      if (shouldRefreshReader({
        stage,
        mode: readerMode(root.documentElement),
        before,
        after,
        active,
      })) dispatchRefresh(reason);
    }, FONT_SETTLEMENT.debounceMs);
  };

  const observer = new MutationObserver((records) => {
    if (records.some((record) => record.attributeName === 'data-reader-font' || record.attributeName === 'style')) {
      settle('reader typography changed');
    }
  });
  observer.observe(root.documentElement, { attributes: true, attributeFilter: ['data-reader-font', 'style'] });

  root.fonts.addEventListener?.('loadingdone', () => settle('font resources loaded'));
  root.fonts.ready?.then(() => settle('font set ready')).catch?.(() => {});

  root.addEventListener('visibilitychange', () => {
    if (!root.hidden) settle('reader became visible');
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) settle('restored font metrics');
  });
}

if (typeof document !== 'undefined') installFontSettlement(document);
