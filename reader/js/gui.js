const OVERLAYS = [
  { id: 'tocOverlay', close: 'tocClose', label: 'Contents' },
  { id: 'progressPanel', close: 'statsClose', label: 'Reading progress' },
  { id: 'settingsPanel', close: 'settingsClose', label: 'Reading experience' },
  { id: 'searchOverlay', close: 'searchClose', label: 'Search this book' },
  { id: 'noteDialog', close: 'noteCancel', label: 'Note' },
  { id: 'helpOverlay', close: 'helpClose', label: 'Keyboard shortcuts' },
];

const openers = new Map();
let lastExternalFocus = null;
let idleTimer = null;

function $(id) {
  return document.getElementById(id);
}

function activeOverlays() {
  return OVERLAYS
    .map(({ id }) => $(id))
    .filter((overlay) => overlay?.classList.contains('active'));
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

function setOverlaySemantics(overlay, label) {
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  if (!overlay.hasAttribute('aria-label') && !overlay.hasAttribute('aria-labelledby')) {
    overlay.setAttribute('aria-label', label);
  }
  syncOverlayAccessibility(overlay, overlay.classList.contains('active'));
}

function syncBodyOverlayState() {
  const active = activeOverlays();
  document.body.classList.toggle('gui-overlay-open', active.length > 0);
  document.body.classList.toggle('gui-toc-open', $('tocOverlay')?.classList.contains('active') || false);
  if (active.length) wakeChrome();
}

function focusOverlay(overlay, closeId) {
  requestAnimationFrame(() => {
    if (!overlay.classList.contains('active')) return;

    if (overlay.id === 'settingsPanel') {
      overlay.querySelector('.settings-card')?.scrollTo({ top: 0, behavior: 'auto' });
    }

    if (overlay.contains(document.activeElement)) return;
    const preferred = $(closeId);
    const target = preferred && overlay.contains(preferred)
      ? preferred
      : focusables(overlay)[0];
    target?.focus({ preventScroll: true });
  });
}

function restoreFocus(overlay) {
  const opener = openers.get(overlay.id);
  openers.delete(overlay.id);
  if (!opener?.isConnected || typeof opener.focus !== 'function') return;

  const remaining = activeOverlays();
  if (remaining.length && !remaining.some((item) => item.contains(opener))) return;
  opener.focus({ preventScroll: true });
}

function onOverlayMutation(overlay, config) {
  const isActive = overlay.classList.contains('active');
  const wasActive = overlay.dataset.guiActive === 'true';
  if (isActive === wasActive) return;
  overlay.dataset.guiActive = String(isActive);

  if (isActive) {
    syncOverlayAccessibility(overlay, true);
    const active = document.activeElement;
    const opener = active && active !== document.body && !overlay.contains(active)
      ? active
      : lastExternalFocus;
    if (opener?.isConnected && !overlay.contains(opener)) {
      openers.set(overlay.id, opener);
    }
    focusOverlay(overlay, config.close);
  } else {
    restoreFocus(overlay);
    syncOverlayAccessibility(overlay, false);
  }
  syncBodyOverlayState();
}

function closeOverlay(config) {
  const overlay = $(config.id);
  if (!overlay?.classList.contains('active')) return;
  const close = $(config.close);
  if (close) close.click();
  else overlay.classList.remove('active');
}

function installOverlayPolish() {
  const tocScrim = document.createElement('div');
  tocScrim.className = 'gui-toc-scrim';
  tocScrim.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tocScrim);
  tocScrim.addEventListener('click', () => closeOverlay(OVERLAYS[0]));

  document.addEventListener('focusin', (event) => {
    if (!activeOverlays().length && event.target !== document.body) {
      lastExternalFocus = event.target;
    }
  });

  OVERLAYS.forEach((config) => {
    const overlay = $(config.id);
    if (!overlay) return;
    setOverlaySemantics(overlay, config.label);
    overlay.dataset.guiActive = String(overlay.classList.contains('active'));

    if (config.id !== 'tocOverlay') {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeOverlay(config);
      });
    }

    const observer = new MutationObserver(() => onOverlayMutation(overlay, config));
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  });

  syncBodyOverlayState();
}

function trapModalFocus(event) {
  if (event.key !== 'Tab') return;
  const overlays = activeOverlays();
  const overlay = overlays[overlays.length - 1];
  if (!overlay) return;

  const items = focusables(overlay);
  if (!items.length) return;

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
  polishStaticSemantics();
  installReaderContext();
  installOverlayPolish();
  installCalmChrome();
  document.addEventListener('keydown', trapModalFocus, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
