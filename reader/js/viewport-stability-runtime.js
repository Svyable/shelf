import './scroll-reflow-anchor.js';
import './immersive-focus.js';
import { parseRoute } from './router.js';
import {
  keyboardViewportTransition,
  lifecycleResumePlan,
  readingLifecycleSnapshot,
  textEntryTarget,
} from './viewport-stability.js';

import('./global-reader-controls.js').catch((error) => {
  console.warn('Global Reader controls could not be loaded', error);
});

import('./app-shell-polish.js').catch((error) => {
  console.warn('Reader app-shell polish could not be loaded', error);
});

function installCriticalReadingStyles(document = globalThis.document) {
  if (!document?.head) return null;
  let link = document.querySelector('link[data-reader-navigation]');
  if (link) return link;
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('../css/navigation.css?v=r1', import.meta.url).href;
  link.dataset.readerNavigation = 'true';
  link.dataset.readerCritical = 'true';
  document.head.appendChild(link);
  return link;
}

function installFirstReadLayoutSettlement({
  window = globalThis.window,
  document = globalThis.document,
  navigationLink = null,
} = {}) {
  if (!window || !document?.documentElement || !document.body) return;
  const root = document.documentElement;
  let timer = 0;
  let rafA = 0;
  let rafB = 0;
  let lastSignature = '';

  const signature = () => [
    document.body.dataset.stage || '',
    root.dataset.readerMode || 'paged',
    root.dataset.readerFont || '',
    root.dataset.readerMeasure || '',
    root.dataset.readerAlign || '',
    root.dataset.readerParagraph || '',
    root.dataset.readerIndent || '',
    root.dataset.readerHyphens || '',
    root.style.getPropertyValue('--reader-font-size'),
    root.style.getPropertyValue('--reader-leading'),
    root.style.getPropertyValue('--reader-font-weight'),
    root.style.getPropertyValue('--reader-tracking'),
  ].join('|');

  const settle = ({ force = false } = {}) => {
    if (document.body.dataset.stage !== 'read') return;
    if (root.dataset.readerMode === 'scroll') return;
    const nextSignature = signature();
    if (!force && nextSignature === lastSignature) return;
    lastSignature = nextSignature;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      window.cancelAnimationFrame(rafA);
      window.cancelAnimationFrame(rafB);
      rafA = window.requestAnimationFrame(() => {
        rafB = window.requestAnimationFrame(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    }, 24);
  };

  const bodyObserver = new MutationObserver(() => settle());
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });

  const prefsObserver = new MutationObserver(() => settle());
  prefsObserver.observe(root, {
    attributes: true,
    attributeFilter: [
      'data-reader-mode',
      'data-reader-font',
      'data-reader-measure',
      'data-reader-align',
      'data-reader-paragraph',
      'data-reader-indent',
      'data-reader-hyphens',
    ],
  });

  navigationLink?.addEventListener?.('load', () => settle({ force: true }), { once: true });
  if (navigationLink?.sheet) queueMicrotask(() => settle({ force: true }));
  document.fonts?.ready?.then(() => settle({ force: true })).catch(() => {});
  window.addEventListener('load', () => settle({ force: true }), { once: true });
}

function installContentsDrawerPolish({
  window = globalThis.window,
  document = globalThis.document,
} = {}) {
  if (!window || !document?.head || !document.body) return;
  const root = document.documentElement;
  const button = document.getElementById('tocBtn');
  const drawer = document.getElementById('tocOverlay');
  const header = document.getElementById('readerChrome');
  if (!button || !drawer || !header) return;

  if (!document.getElementById('readerContentsDrawerPolish')) {
    const style = document.createElement('style');
    style.id = 'readerContentsDrawerPolish';
    style.textContent = `
      .gui-toc-scrim {
        top: var(--reader-toc-top, 0px) !important;
      }
      @media (min-width: 701px) {
        .toc-overlay {
          top: var(--reader-toc-top, 0px) !important;
          height: calc(100dvh - var(--reader-toc-top, 0px)) !important;
        }
      }
      @media (pointer: coarse) and (min-width: 701px) {
        #tocBtn {
          display: inline-flex;
          width: auto;
          min-width: 44px;
          gap: .38rem;
          padding-inline: .72rem;
        }
        #tocBtn::after {
          content: "Contents";
          font-family: var(--font-ui);
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .01em;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const syncTop = () => {
    root.style.setProperty('--reader-toc-top', `${Math.max(0, Math.ceil(header.getBoundingClientRect().height))}px`);
  };

  const otherModalOpen = () => !!document.querySelector(
    '#progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active'
  );

  const syncDrawer = () => {
    syncTop();
    const active = drawer.classList.contains('active');
    button.title = 'Contents';
    button.setAttribute('aria-label', 'Contents');
    button.setAttribute('aria-controls', 'tocOverlay');
    button.setAttribute('aria-expanded', String(active));
    if (!active || otherModalOpen()) return;

    drawer.setAttribute('aria-modal', 'false');
    const releaseBackground = () => {
      if (!drawer.classList.contains('active') || otherModalOpen()) return;
      const app = document.querySelector('.app');
      if (app) {
        app.inert = false;
        app.classList.remove('gui-modal-background');
      }
    };
    queueMicrotask(releaseBackground);
    window.requestAnimationFrame(releaseBackground);
  };

  const drawerObserver = new MutationObserver(syncDrawer);
  drawerObserver.observe(drawer, { attributes: true, attributeFilter: ['class', 'aria-modal'] });
  const bodyObserver = new MutationObserver(syncDrawer);
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  if ('ResizeObserver' in window) new ResizeObserver(syncTop).observe(header);
  window.addEventListener('orientationchange', syncTop, { passive: true });
  window.visualViewport?.addEventListener('resize', syncTop, { passive: true });
  syncDrawer();
}

function snapshot(vv = globalThis.visualViewport) {
  if (!vv) return null;
  return {
    width: Number(vv.width) || 0,
    height: Number(vv.height) || 0,
    offsetTop: Number(vv.offsetTop) || 0,
    offsetLeft: Number(vv.offsetLeft) || 0,
    scale: Number(vv.scale) || 1,
  };
}

export function createViewportKeyboardGuard({
  visualViewport = globalThis.visualViewport,
  document = globalThis.document,
} = {}) {
  let stable = snapshot(visualViewport);
  let keyboardActive = false;
  let editing = textEntryTarget(document?.activeElement);
  let suppressed = 0;

  const evaluate = () => {
    const next = snapshot(visualViewport);
    const result = keyboardViewportTransition(stable, next, { editing, keyboardActive });
    stable = result.snapshot;
    keyboardActive = result.keyboardActive;
    if (result.suppress) suppressed += 1;
    return result;
  };

  const onFocusIn = (event) => {
    editing = textEntryTarget(event.target);
  };
  const onFocusOut = () => {
    queueMicrotask(() => {
      editing = textEntryTarget(document?.activeElement);
    });
  };
  const onResize = (event) => {
    const result = evaluate();
    if (!result.suppress) return;
    event.stopImmediatePropagation();
  };

  document?.addEventListener('focusin', onFocusIn, true);
  document?.addEventListener('focusout', onFocusOut, true);
  visualViewport?.addEventListener('resize', onResize, true);

  return Object.freeze({
    evaluate,
    state() {
      return { stable, keyboardActive, editing, suppressed };
    },
    destroy() {
      document?.removeEventListener('focusin', onFocusIn, true);
      document?.removeEventListener('focusout', onFocusOut, true);
      visualViewport?.removeEventListener('resize', onResize, true);
    },
  });
}

function readerMode(document) {
  return document?.documentElement?.dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
}

function overlaysOpen(document) {
  return !!document?.querySelector?.(
    '.toc-overlay.active, .stats-overlay.active, .search-overlay.active, .settings-panel.active, .note-dialog.active, .help-overlay.active'
  );
}

export function createReaderLifecycleGuard({
  window = globalThis.window,
  document = globalThis.document,
  visualViewport = globalThis.visualViewport,
  now = () => Date.now(),
} = {}) {
  let suspended = null;
  let resumeCount = 0;
  let rafA = 0;
  let rafB = 0;

  const capture = () => {
    suspended = readingLifecycleSnapshot({
      route: parseRoute(),
      stage: document?.body?.dataset.stage || '',
      mode: readerMode(document),
      viewport: snapshot(visualViewport),
      at: now(),
    });
    return suspended;
  };

  const settle = (plan) => {
    if (!plan.resume) return plan;
    resumeCount += 1;
    window?.dispatchEvent?.(new CustomEvent('bookself:reader-resume', { detail: plan }));
    if (plan.repaginate) window?.dispatchEvent?.(new Event('resize'));
    if (plan.resyncRoute && !overlaysOpen(document)) {
      window?.dispatchEvent?.(new HashChangeEvent('hashchange'));
    }
    return plan;
  };

  const resume = ({ persisted = false } = {}) => {
    const current = readingLifecycleSnapshot({
      route: parseRoute(),
      stage: document?.body?.dataset.stage || '',
      mode: readerMode(document),
      viewport: snapshot(visualViewport),
      at: now(),
    });
    const plan = lifecycleResumePlan(suspended, current, {
      persisted,
      now: now(),
      viewport: snapshot(visualViewport),
    });
    if (!plan.resume) return plan;
    cancelAnimationFrame(rafA);
    cancelAnimationFrame(rafB);
    rafA = requestAnimationFrame(() => {
      rafB = requestAnimationFrame(() => settle(plan));
    });
    return plan;
  };

  const onPageHide = () => capture();
  const onPageShow = (event) => resume({ persisted: !!event.persisted });
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') capture();
    else if (document.visibilityState === 'visible') resume();
  };
  const onFreeze = () => capture();
  const onResume = () => resume();

  window?.addEventListener?.('pagehide', onPageHide, true);
  window?.addEventListener?.('pageshow', onPageShow, true);
  document?.addEventListener?.('visibilitychange', onVisibility, true);
  document?.addEventListener?.('freeze', onFreeze, true);
  document?.addEventListener?.('resume', onResume, true);

  return Object.freeze({
    capture,
    resume,
    state() { return { suspended, resumeCount }; },
    destroy() {
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
      window?.removeEventListener?.('pagehide', onPageHide, true);
      window?.removeEventListener?.('pageshow', onPageShow, true);
      document?.removeEventListener?.('visibilitychange', onVisibility, true);
      document?.removeEventListener?.('freeze', onFreeze, true);
      document?.removeEventListener?.('resume', onResume, true);
    },
  });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const criticalNavigationStyles = installCriticalReadingStyles(document);
  installFirstReadLayoutSettlement({ window, document, navigationLink: criticalNavigationStyles });
  installContentsDrawerPolish({ window, document });

  if (window.visualViewport) {
    window.__bookselfViewportKeyboardGuard?.destroy?.();
    window.__bookselfViewportKeyboardGuard = createViewportKeyboardGuard({
      visualViewport: window.visualViewport,
      document,
    });
  }
  window.__bookselfReaderLifecycleGuard?.destroy?.();
  window.__bookselfReaderLifecycleGuard = createReaderLifecycleGuard({
    window,
    document,
    visualViewport: window.visualViewport,
  });
}
