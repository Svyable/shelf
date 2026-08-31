import {
  oneHandedActionAvailable,
  oneHandedActionItems,
  oneHandedActionsEligible,
  oneHandedActionTarget,
  oneHandedMenuState,
} from './one-handed-actions-model.js';

const STYLE_HREF = 'css/one-handed-actions.css?v=r1';
const ROOT_ID = 'readerOneHandedActions';
const TOGGLE_ID = 'readerOneHandedToggle';
const MENU_ID = 'readerOneHandedMenu';
let menuOpen = false;
let restoreFocusOnClose = false;
let root = null;
let toggle = null;
let menu = null;
let observer = null;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function viewportState() {
  const html = document.documentElement;
  return {
    stage: document.body.dataset.stage || '',
    device: html.dataset.readerDevice || 'desktop',
    pointer: html.dataset.readerPointer || 'fine',
    orientation: html.dataset.readerOrientation || 'landscape',
  };
}

function bookmarkState() {
  const bookmark = document.getElementById('bookmarkBtn');
  const atlas = document.getElementById('bookmarkAtlasBtn');
  const badge = atlas?.querySelector('.bookmark-atlas-count');
  return {
    bookmarked: bookmark?.getAttribute('aria-pressed') === 'true' || bookmark?.classList.contains('active') || false,
    bookmarkCount: Number.parseInt(badge?.textContent || '0', 10) || 0,
  };
}

function chromeHidden() {
  return document.body.classList.contains('reader-chrome-hidden');
}

function eligibility() {
  return oneHandedActionsEligible(viewportState());
}

function actionIcon(id) {
  const icons = {
    contents: '<path d="M7 6h14M7 12h14M7 18h14M3 6h.01M3 12h.01M3 18h.01"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
    bookmark: '<path d="M6 4h12v16l-6-4-6 4z"/>',
    bookmarks: '<path d="M5 4h11a2 2 0 0 1 2 2v14l-7-4-6 4z"/><path d="M8 8h6M8 11h6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[id] || ''}</svg>`;
}

function targetAvailability(target) {
  return oneHandedActionAvailable({
    exists: !!target,
    disabled: !!target?.disabled,
    hidden: !!target?.hidden,
  });
}

function ensureUi() {
  if (root?.isConnected) return;
  const app = document.querySelector('.app');
  if (!app) return;

  root = document.createElement('div');
  root.id = ROOT_ID;
  root.className = 'reader-one-handed-actions';
  root.hidden = true;
  root.innerHTML = `
    <button class="reader-one-handed-toggle" id="${TOGGLE_ID}" type="button" aria-expanded="false" aria-controls="${MENU_ID}" aria-label="Reading shortcuts">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></svg>
      <span>Shortcuts</span>
    </button>
    <nav class="reader-one-handed-menu" id="${MENU_ID}" aria-label="Reading shortcuts" hidden></nav>`;
  app.appendChild(root);
  toggle = root.querySelector(`#${TOGGLE_ID}`);
  menu = root.querySelector(`#${MENU_ID}`);

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(!menuOpen, { restoreFocus: false });
  });

  menu.addEventListener('click', (event) => {
    const button = event.target.closest('[data-reader-one-handed-action]');
    if (!button || button.disabled) return;
    const targetId = oneHandedActionTarget(button.dataset.readerOneHandedAction);
    const target = targetId ? document.getElementById(targetId) : null;
    if (!targetAvailability(target)) return;
    setOpen(false, { restoreFocus: false });
    target.click();
  });
}

function renderActions() {
  if (!menu) return;
  const items = oneHandedActionItems(bookmarkState());
  menu.innerHTML = items.map((item) => {
    const available = targetAvailability(document.getElementById(item.targetId));
    return `
      <button class="reader-one-handed-action" type="button" data-reader-one-handed-action="${item.id}"${item.id === 'bookmark' ? ` aria-pressed="${item.pressed}"` : ''}${available ? '' : ' disabled aria-disabled="true"'}>
        <span class="reader-one-handed-icon">${actionIcon(item.id)}${item.badge ? `<span class="reader-one-handed-badge" aria-hidden="true">${item.badge}</span>` : ''}</span>
        <span>${item.label}</span>
      </button>`;
  }).join('');
}

function setOpen(next, { restoreFocus = false } = {}) {
  ensureUi();
  if (!root || !toggle || !menu) return;
  const state = oneHandedMenuState({
    eligible: eligibility(),
    open: next,
    chromeHidden: chromeHidden(),
  });
  menuOpen = state.open;
  restoreFocusOnClose = restoreFocus && !menuOpen;
  toggle.setAttribute('aria-expanded', String(menuOpen));
  menu.hidden = !menuOpen;
  root.classList.toggle('is-open', menuOpen);
  if (menuOpen) {
    renderActions();
    requestAnimationFrame(() => menu.querySelector('button:not(:disabled)')?.focus({ preventScroll: true }));
  } else if (restoreFocusOnClose && toggle.isConnected) {
    restoreFocusOnClose = false;
    requestAnimationFrame(() => toggle.focus({ preventScroll: true }));
  }
}

function sync() {
  ensureUi();
  if (!root || !toggle || !menu) return;
  const state = oneHandedMenuState({
    eligible: eligibility(),
    open: menuOpen,
    chromeHidden: chromeHidden(),
  });
  root.hidden = !state.eligible;
  root.setAttribute('aria-hidden', String(!state.eligible));
  if (menuOpen !== state.open) setOpen(state.open);
  if (state.open) renderActions();
}

function onKeydown(event) {
  if (!menuOpen) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopImmediatePropagation();
    setOpen(false, { restoreFocus: true });
    return;
  }
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const buttons = [...menu.querySelectorAll('button:not(:disabled)')];
  if (!buttons.length || !buttons.includes(document.activeElement)) return;
  event.preventDefault();
  const current = buttons.indexOf(document.activeElement);
  let next = current;
  if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
  if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = buttons.length - 1;
  buttons[next].focus({ preventScroll: true });
}

function install() {
  if (document.documentElement.dataset.oneHandedActionsReady === 'true') return;
  document.documentElement.dataset.oneHandedActionsReady = 'true';
  installStyles();
  ensureUi();

  document.addEventListener('keydown', onKeydown, true);
  document.addEventListener('pointerdown', (event) => {
    if (menuOpen && root && !root.contains(event.target)) setOpen(false);
  }, true);
  window.addEventListener('hashchange', () => setOpen(false), { passive: true });
  window.addEventListener('popstate', () => setOpen(false), { passive: true });

  observer = new MutationObserver(sync);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reader-device', 'data-reader-pointer', 'data-reader-orientation'],
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-stage', 'class'],
    subtree: false,
  });

  const controls = document.querySelector('.header-right');
  if (controls) {
    observer.observe(controls, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['aria-pressed', 'class', 'hidden'],
    });
  }
  sync();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
