import { pageRegionLabel, shouldProtectNativeKey } from './reader-keyboard-policy.js';

const INTERACTIVE_SELECTOR = [
  'a[href]', 'button', 'input', 'textarea', 'select', 'summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
  '[role="button"]', '[role="link"]', '[role="menuitem"]', '[role="option"]',
  '[role="slider"]', '[role="spinbutton"]', '[role="switch"]', '[role="tab"]',
  '[role="textbox"]', '[role="treeitem"]',
].join(',');

const DIALOG_SELECTOR = [
  '.toc-overlay.active', '.stats-overlay.active', '.search-overlay.active',
  'dialog[open]', '[role="dialog"][aria-modal="true"]:not([aria-hidden="true"])',
].join(',');

function nativeKeyboardTarget(target) {
  return target instanceof Element && !!target.closest(INTERACTIVE_SELECTOR);
}

function dialogOpen() {
  return !!document.querySelector(DIALOG_SELECTOR);
}

function protectNativeKeyboard(event) {
  if (!shouldProtectNativeKey({
    key: event.key,
    interactive: nativeKeyboardTarget(event.target),
    dialogOpen: dialogOpen(),
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    altKey: event.altKey,
    composing: event.isComposing,
    repeat: event.repeat,
  })) return;

  // Registered before app.js. At document bubble phase the target has already
  // received the event and browser defaults stay intact; only later Reader-
  // global shortcut handlers are fenced off.
  event.stopImmediatePropagation();
}

function pageModeActive() {
  return document.body.dataset.stage === 'read'
    && document.documentElement.dataset.readerMode !== 'scroll';
}

function syncPageSurface(surface, side) {
  if (!surface) return;
  const active = pageModeActive() && surface.classList.contains('active');

  if (!active) {
    surface.setAttribute('aria-hidden', 'true');
    surface.removeAttribute('role');
    surface.removeAttribute('aria-label');
    return;
  }

  const chapter = surface.querySelector('.page-running')?.textContent?.trim()
    || document.getElementById('currentChapter')?.textContent?.trim()
    || '';
  const page = surface.querySelector('.page-num')?.textContent?.trim() || '';
  const spread = !!document.getElementById('pageRight')?.classList.contains('active');
  surface.removeAttribute('aria-hidden');
  surface.setAttribute('role', 'region');
  surface.setAttribute('aria-label', pageRegionLabel({ chapter, page, side, spread }));
}

function syncTocCurrent() {
  document.querySelectorAll('#tocList .toc-link[aria-current]').forEach((link) => {
    link.removeAttribute('aria-current');
  });
  document.querySelectorAll('#tocList .toc-link.is-current').forEach((link) => {
    link.setAttribute('aria-current', 'location');
  });
}

function syncReadingSemantics() {
  syncPageSurface(document.getElementById('pageLeft'), 'left');
  syncPageSurface(document.getElementById('pageRight'), 'right');
  syncTocCurrent();

  const scrollReader = document.getElementById('scrollReader');
  if (scrollReader) {
    const active = document.body.dataset.stage === 'read'
      && document.documentElement.dataset.readerMode === 'scroll'
      && !scrollReader.hidden;
    scrollReader.setAttribute('aria-hidden', String(!active));
  }
}

function installShortcutSemantics() {
  document.getElementById('prevBtn')?.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowUp');
  document.getElementById('nextBtn')?.setAttribute('aria-keyshortcuts', 'ArrowRight ArrowDown Space');
  document.getElementById('bookmarkBtn')?.setAttribute('aria-keyshortcuts', 'b');
  document.getElementById('searchBtn')?.setAttribute('aria-keyshortcuts', '/');
  document.getElementById('focusBtn')?.setAttribute('aria-keyshortcuts', 'f');
  document.getElementById('helpBtn')?.setAttribute('aria-keyshortcuts', '?');
}

function installSemantics() {
  installShortcutSemantics();
  syncReadingSemantics();

  const observer = new MutationObserver(syncReadingSemantics);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'hidden', 'data-stage', 'data-reader-mode'],
  });
  window.addEventListener('hashchange', syncReadingSemantics);
  window.addEventListener('popstate', syncReadingSemantics);
}

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', protectNativeKeyboard);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installSemantics, { once: true });
  } else {
    installSemantics();
  }
}
