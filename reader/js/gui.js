import {
  reconcileDialogStack,
  activateDialog,
  deactivateDialog,
  topDialogId,
} from './dialog-stack.js';
import { loadPrefs, savePrefs, resetReadingAppearancePrefs } from './storage.js';

import('./media.js').catch((error) => {
  console.warn('Media enhancements could not be loaded', error);
});

import('./search-navigation.js').catch((error) => {
  console.warn('Search navigation could not be loaded', error);
});

import('./pwa-update.js').catch((error) => {
  console.warn('PWA enhancements could not be loaded', error);
});

const SETTINGS_STYLE_HREF = 'css/settings-panel.css?v=r1';
const OVERLAYS = [
  { id: 'tocOverlay', close: 'tocClose', opener: 'tocBtn', initial: 'tocSearch', label: 'Contents' },
  { id: 'progressPanel', close: 'statsClose', opener: 'progressBtn', label: 'Reading progress' },
  { id: 'settingsPanel', close: 'settingsClose', opener: 'settingsBtn', initial: 'resetAppearanceBtn', label: 'Reading experience' },
  { id: 'searchOverlay', close: 'searchClose', opener: 'searchBtn', initial: 'bookSearch', label: 'Search this book' },
  { id: 'noteDialog', close: 'noteCancel', opener: 'selNote', initial: 'noteBody', label: 'Note' },
  { id: 'helpOverlay', close: 'helpClose', opener: 'helpBtn', label: 'Keyboard shortcuts' },
];

const BACKGROUND_SELECTORS = ['.app', '#selPop'];
const openers = new Map();
let overlayStack = [];
let lastExternalFocus = null;
let idleTimer = null;

function $(id) {
  return document.getElementById(id);
}

function installSettingsStyles() {
  if (document.querySelector(`link[href="${SETTINGS_STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = SETTINGS_STYLE_HREF;
  document.head.appendChild(link);
}

function settingsSection(title, className = '') {
  const section = document.createElement('section');
  section.className = `settings-section ${className}`.trim();
  const heading = document.createElement('h4');
  heading.textContent = title;
  section.appendChild(heading);
  return section;
}

function moveButtons(container, ids) {
  for (const id of ids) {
    const button = $(id);
    if (button) container.appendChild(button);
  }
}

function resetAppearance() {
  const button = $('resetAppearanceBtn');
  if (!button || button.disabled) return;
  const next = resetReadingAppearancePrefs(loadPrefs());
  savePrefs(next);
  button.disabled = true;
  button.textContent = 'Resetting…';
  window.setTimeout(() => window.location.reload(), 80);
}

function installSettingsHierarchy() {
  const panel = $('settingsPanel');
  const card = panel?.querySelector('.settings-card');
  if (!panel || !card || card.dataset.settingsHierarchy === 'true') return;
  card.dataset.settingsHierarchy = 'true';

  const title = card.querySelector(':scope > h3');
  if (title) title.textContent = 'Reading settings';

  const rows = [...card.querySelectorAll(':scope > .setting-row')];
  const legacyActions = card.querySelector(':scope > .setting-actions');
  const close = $('settingsClose');

  const appearance = settingsSection('Appearance', 'settings-appearance');
  const appearanceHead = document.createElement('div');
  appearanceHead.className = 'settings-section-head';
  const appearanceTitle = appearance.querySelector('h4');
  appearanceTitle.remove();
  appearanceHead.appendChild(appearanceTitle);

  const reset = document.createElement('button');
  reset.id = 'resetAppearanceBtn';
  reset.className = 'settings-reset';
  reset.type = 'button';
  reset.textContent = 'Reset appearance';
  reset.setAttribute('aria-describedby', 'appearanceResetHelp');
  reset.addEventListener('click', resetAppearance);
  appearanceHead.appendChild(reset);
  appearance.appendChild(appearanceHead);

  const help = document.createElement('p');
  help.id = 'appearanceResetHelp';
  help.className = 'settings-note';
  help.textContent = 'Restores paper, lamp, type size, typeface, and line height. Your place, notes, bookmarks, reading mode, and focus setting stay put.';
  appearance.appendChild(help);
  rows.forEach((row) => appearance.appendChild(row));

  const tools = settingsSection('Reading tools');
  const toolActions = document.createElement('div');
  toolActions.className = 'setting-actions settings-action-grid';
  moveButtons(toolActions, ['shareBtn', 'focusBtn', 'progressBtn', 'helpBtn']);
  tools.appendChild(toolActions);

  const exports = settingsSection('Export & print');
  const exportActions = document.createElement('div');
  exportActions.className = 'setting-actions settings-action-grid';
  moveButtons(exportActions, ['printBtn', 'downloadMd', 'downloadHtml', 'exportNotesBtn']);
  exports.appendChild(exportActions);

  legacyActions?.remove();
  if (close) {
    card.insertBefore(appearance, close);
    card.insertBefore(tools, close);
    card.insertBefore(exports, close);
  } else {
    card.append(appearance, tools, exports);
  }
}

function activeOverlays() {
  return OVERLAYS
    .map(({ id }) => $(id))
    .filter((overlay) => overlay?.classList.contains('active'));
}

function activeOverlayIds() {
  return activeOverlays().map((overlay) => overlay.id);
}

function topOverlay() {
  const id = topDialogId(overlayStack, activeOverlayIds());
  return id ? $(id) : null;
}

function focusables(container) {
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter((element) => !element.hidden && element.getClientRects().length > 0);
}

function syncOverlayAccessibility(overlay, active) {
  overlay.inert = !active;
  overlay.setAttribute('aria-hidden', String(!active));
}

function syncBackgroundIsolation(isolated) {
  for (const selector of BACKGROUND_SELECTORS) {
    const root = document.querySelector(selector);
    if (!root) continue;
    root.inert = isolated;
    root.classList.toggle('gui-modal-background', isolated);
  }
}

function syncOpenerSemantics(config, active) {
  const opener = $(config.opener);
  if (!opener) return;
  opener.setAttribute('aria-controls', config.id);
  opener.setAttribute('aria-haspopup', 'dialog');
  opener.setAttribute('aria-expanded', String(active));
}

function syncOverlayStack() {
  const activeIds = activeOverlayIds();
  overlayStack = reconcileDialogStack(overlayStack, activeIds);
  const topId = topDialogId(overlayStack, activeIds);

  OVERLAYS.forEach((config) => {
    const overlay = $(config.id);
    if (!overlay) return;
    const isActive = activeIds.includes(config.id);
    const stackIndex = overlayStack.indexOf(config.id);
    syncOverlayAccessibility(overlay, isActive && config.id === topId);
    syncOpenerSemantics(config, isActive);
    overlay.style.zIndex = isActive ? String(80 + Math.max(0, stackIndex)) : '';
  });

  syncBackgroundIsolation(Boolean(topId));
}

function setOverlaySemantics(overlay, config) {
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  if (!overlay.hasAttribute('aria-label') && !overlay.hasAttribute('aria-labelledby')) {
    overlay.setAttribute('aria-label', config.label);
  }
  syncOverlayAccessibility(overlay, false);
  syncOpenerSemantics(config, false);
}

function syncBodyOverlayState() {
  const active = activeOverlays();
  document.body.classList.toggle('gui-overlay-open', active.length > 0);
  document.body.classList.toggle('gui-toc-open', $('tocOverlay')?.classList.contains('active') || false);
  if (active.length) wakeChrome();
}

function focusOverlay(overlay, config) {
  if (!overlay.classList.contains('active') || overlay !== topOverlay()) return;

  if (overlay.id === 'settingsPanel') {
    overlay.querySelector('.settings-card')?.scrollTo({ top: 0, behavior: 'auto' });
  }

  if (overlay.contains(document.activeElement)) return;
  const preferred = config.initial ? $(config.initial) : null;
  const close = $(config.close);
  const target = preferred && overlay.contains(preferred) && !preferred.disabled
    ? preferred
    : focusables(overlay)[0] || (close && overlay.contains(close) ? close : null);
  target?.focus({ preventScroll: true });
}

function restoreFocus(overlay) {
  const opener = openers.get(overlay.id);
  openers.delete(overlay.id);
  if (!opener?.isConnected || typeof opener.focus !== 'function') return;

  const top = topOverlay();
  if (top && !top.contains(opener)) return;
  opener.focus({ preventScroll: true });
}

function onOverlayMutation(overlay, config) {
  const isActive = overlay.classList.contains('active');
  const wasActive = overlay.dataset.guiActive === 'true';
  if (isActive === wasActive) return;
  overlay.dataset.guiActive = String(isActive);

  if (isActive) {
    const active = document.activeElement;
    const opener = active && active !== document.body && !overlay.contains(active)
      ? active
      : lastExternalFocus;
    if (opener?.isConnected && !overlay.contains(opener)) {
      openers.set(overlay.id, opener);
    }
    overlayStack = activateDialog(overlayStack, overlay.id);
    syncOverlayStack();
    focusOverlay(overlay, config);
  } else {
    overlayStack = deactivateDialog(overlayStack, overlay.id);
    syncOverlayStack();
    restoreFocus(overlay);
  }
  syncBodyOverlayState();
}

function closeOverlay(config) {
  const overlay = $(config.id);
  if (!overlay?.classList.contains('active')) return false;
  const close = $(config.close);
  if (close) close.click();
  else overlay.classList.remove('active');
  return true;
}

function closeTopOverlay() {
  const top = topOverlay();
  if (!top) return false;
  const config = OVERLAYS.find((entry) => entry.id === top.id);
  return config ? closeOverlay(config) : false;
}

function installOverlayPolish() {
  const tocScrim = document.createElement('div');
  tocScrim.className = 'gui-toc-scrim';
  tocScrim.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tocScrim);
  tocScrim.addEventListener('click', () => {
    if (topOverlay()?.id === 'tocOverlay') closeOverlay(OVERLAYS[0]);
  });

  document.addEventListener('focusin', (event) => {
    if (!activeOverlays().length && event.target !== document.body) {
      lastExternalFocus = event.target;
    }
  });

  OVERLAYS.forEach((config) => {
    const overlay = $(config.id);
    if (!overlay) return;
    setOverlaySemantics(overlay, config);
    overlay.dataset.guiActive = String(overlay.classList.contains('active'));

    if (config.id !== 'tocOverlay') {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay && overlay === topOverlay()) closeOverlay(config);
      });
    }

    const observer = new MutationObserver(() => onOverlayMutation(overlay, config));
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  });

  syncOverlayStack();
  syncBodyOverlayState();
}

function handleModalKeys(event) {
  const overlay = topOverlay();
  if (!overlay) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopImmediatePropagation();
    closeTopOverlay();
    return;
  }

  if (event.key !== 'Tab') return;
  const items = focusables(overlay);
  if (!items.length) {
    event.preventDefault();
    return;
  }

  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || !overlay.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !overlay.contains(active))) {
    event.preventDefault();
    first.focus();
  }
}

function installReaderContext() {
  const header = $('readerChrome');
  if (!header || header.querySelector('.reader-context')) return;

  const context = document.createElement('div');
  context.className = 'reader-context';
  context.setAttribute('aria-hidden', 'true');
  context.innerHTML = `
    <span class="reader-context-title"></span>
    <span class="reader-context-chapter"></span>`;
  header.querySelector('.header-left')?.insertAdjacentElement('afterend', context);

  const title = context.querySelector('.reader-context-title');
  const chapter = context.querySelector('.reader-context-chapter');
  const coverTitle = $('coverTitle');
  const currentChapter = $('currentChapter');

  const sync = () => {
    const stage = document.body.dataset.stage;
    const bookTitle = coverTitle?.textContent?.trim() || document.title.replace(/\s*[—|-].*$/, '').trim();
    let chapterText = currentChapter?.textContent?.trim() || '';
    if (stage === 'cover') chapterText = 'Cover';
    if (stage === 'end') chapterText = 'Finished';
    if (stage === 'read' && !chapterText) chapterText = 'Reading';
    title.textContent = bookTitle;
    chapter.textContent = chapterText;
  };

  const observer = new MutationObserver(sync);
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  if (coverTitle) observer.observe(coverTitle, { childList: true, subtree: true, characterData: true });
  if (currentChapter) observer.observe(currentChapter, { childList: true, subtree: true, characterData: true });
  sync();
}

function canIdle() {
  return document.body.dataset.stage === 'read'
    && !activeOverlays().length
    && document.visibilityState === 'visible';
}

function scheduleIdle() {
  clearTimeout(idleTimer);
  document.body.classList.remove('gui-reading-idle');
  if (!canIdle()) return;
  idleTimer = window.setTimeout(() => {
    if (canIdle()) document.body.classList.add('gui-reading-idle');
  }, 3400);
}

function wakeChrome() {
  clearTimeout(idleTimer);
  document.body.classList.remove('gui-reading-idle');
  if (canIdle()) scheduleIdle();
}

function installCalmChrome() {
  ['pointermove', 'pointerdown', 'touchstart', 'keydown'].forEach((type) => {
    document.addEventListener(type, wakeChrome, { passive: type !== 'keydown' });
  });
  document.addEventListener('scroll', wakeChrome, { capture: true, passive: true });
  document.addEventListener('focusin', wakeChrome);
  document.addEventListener('visibilitychange', scheduleIdle);

  const observer = new MutationObserver(scheduleIdle);
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  scheduleIdle();
}

function polishStaticSemantics() {
  $('readerChrome')?.setAttribute('aria-label', 'Reader controls');
  $('pageNav')?.setAttribute('aria-label', 'Reading navigation');
  $('progressBarFill')?.setAttribute('aria-hidden', 'true');

  const hint = $('readHint');
  if (hint) hint.setAttribute('aria-hidden', 'true');
}

function initialize() {
  if (document.documentElement.dataset.guiEnhanced === 'true') return;
  document.documentElement.dataset.guiEnhanced = 'true';
  installSettingsStyles();
  installSettingsHierarchy();
  polishStaticSemantics();
  installReaderContext();
  installOverlayPolish();
  installCalmChrome();
  document.addEventListener('keydown', handleModalKeys, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
