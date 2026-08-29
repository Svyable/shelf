import { installReadingSurface } from './reading-surface.js';
import { installReadingContinuity } from './reading-continuity.js';

const state = {
  pointerId: null,
  startX: 0,
  startY: 0,
  startTime: 0,
  axis: null,
  suppressClickUntil: 0,
  queuedDirection: 0,
};

function loadStyles() {
  if (document.querySelector('link[data-reader-navigation]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('../css/navigation.css', import.meta.url).href;
  link.dataset.readerNavigation = 'true';
  document.head.appendChild(link);
}

function wrap() {
  return document.getElementById('pagesWrapper');
}

function pagedRead() {
  return document.body.dataset.stage === 'read'
    && document.documentElement.dataset.readerMode !== 'scroll';
}

function overlaysOpen() {
  return !!document.querySelector(
    '#tocOverlay.active, #progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active'
  );
}

function selectionActive() {
  return !!window.getSelection?.().toString().trim();
}

function interactiveTarget(target) {
  return !!target?.closest?.(
    'a, button, input, textarea, select, label, mark, pre, code, [contenteditable="true"], .sel-pop'
  );
}

function keyboardInteractiveTarget(target) {
  return !!target?.closest?.(
    'a, button, input, textarea, select, [contenteditable="true"]'
  );
}

function turnBusy() {
  const el = wrap();
  return !!el && (el.classList.contains('turn-next') || el.classList.contains('turn-prev'));
}

function pageNumbers() {
  const text = document.getElementById('currentPage')?.textContent || '';
  return (text.match(/\d+/g) || []).map(Number);
}

function firstPageVisible() {
  return pageNumbers()[0] === 1;
}

function lastPageVisible() {
  const numbers = pageNumbers();
  const total = Number(document.getElementById('totalPages')?.textContent || 0);
  return !!total && numbers.length > 0 && Math.max(...numbers) >= total;
}

function syncNavSemantics() {
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (!prev || !next || document.body.dataset.stage !== 'read') return;

  // The core reader supports turning back to the cover from page one; expose
  // that same behavior through the visible Previous control.
  prev.disabled = false;
  prev.setAttribute('aria-label', firstPageVisible() ? 'Back to cover' : 'Previous page');
  prev.setAttribute('title', firstPageVisible() ? 'Back to cover' : 'Previous page');
  prev.setAttribute('aria-keyshortcuts', 'ArrowLeft PageUp');

  next.setAttribute('aria-label', lastPageVisible() ? 'Finish book' : 'Next page');
  next.setAttribute('title', lastPageVisible() ? 'Finish book' : 'Next page');
  next.setAttribute('aria-keyshortcuts', 'ArrowRight PageDown Space');
}

function clearQueuedTurn() {
  state.queuedDirection = 0;
  const el = wrap();
  if (el) delete el.dataset.navBuffered;
}

function requestTurn(direction) {
  if (!pagedRead() || overlaysOpen()) return;
  const el = wrap();
  if (!el) return;

  if (turnBusy()) {
    state.queuedDirection = direction;
    el.dataset.navBuffered = direction > 0 ? 'next' : 'prev';
    return;
  }

  clearQueuedTurn();

  // Always travel through the core Previous / Next controls. That keeps page
  // boundaries, progress persistence, spread stepping, and leaf transitions on
  // the same path as every other page turn.
  const button = document.getElementById(direction > 0 ? 'nextBtn' : 'prevBtn');
  if (!button) return;
  if (button.disabled) button.disabled = false;
  button.click();
}

function flushQueuedTurn() {
  if (!state.queuedDirection) return;
  if (!pagedRead()) {
    clearQueuedTurn();
    return;
  }
  if (turnBusy()) return;

  const direction = state.queuedDirection;
  clearQueuedTurn();
  window.setTimeout(() => requestTurn(direction), 24);
}

function installQueueObserver() {
  const el = wrap();
  if (!el) return;
  const observer = new MutationObserver(() => {
    syncNavSemantics();
    flushQueuedTurn();
  });
  observer.observe(el, { attributes: true, attributeFilter: ['class'] });

  const current = document.getElementById('currentPage');
  const total = document.getElementById('totalPages');
  if (current) observer.observe(current, { childList: true, characterData: true, subtree: true });
  if (total) observer.observe(total, { childList: true, characterData: true, subtree: true });
}

function resetGesture() {
  state.pointerId = null;
  state.axis = null;
  const el = wrap();
  if (!el) return;
  el.classList.remove('nav-drag-next', 'nav-drag-prev');
  el.style.removeProperty('--nav-drag-opacity');
  el.style.removeProperty('--nav-drag-distance');
}

function showGesture(direction, amount) {
  const el = wrap();
  if (!el) return;
  const clamped = Math.max(0, Math.min(1, amount));
  el.classList.toggle('nav-drag-next', direction > 0);
  el.classList.toggle('nav-drag-prev', direction < 0);
  el.style.setProperty('--nav-drag-opacity', String(0.12 + clamped * 0.78));
  el.style.setProperty('--nav-drag-distance', `${Math.round(clamped * 14)}px`);
}

function onPointerDown(event) {
  if (!pagedRead() || overlaysOpen() || interactiveTarget(event.target)) return;
  if (!event.isPrimary || !['touch', 'pen'].includes(event.pointerType)) return;
  if (!event.target.closest('#pagesWrapper')) return;

  state.pointerId = event.pointerId;
  state.startX = event.clientX;
  state.startY = event.clientY;
  state.startTime = performance.now();
  state.axis = null;
}

function onPointerMove(event) {
  if (event.pointerId !== state.pointerId || !pagedRead()) return;
  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);

  if (!state.axis && Math.max(ax, ay) > 8) {
    state.axis = ax > ay * 1.08 ? 'x' : 'y';
  }
  if (state.axis !== 'x') return;

  event.preventDefault();
  const width = Math.max(1, wrap()?.clientWidth || window.innerWidth);
  const amount = ax / Math.max(86, width * 0.28);
  showGesture(dx < 0 ? 1 : -1, amount);
}

function onPointerUp(event) {
  if (event.pointerId !== state.pointerId) return;
  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;
  const elapsed = Math.max(1, performance.now() - state.startTime);
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  const velocity = ax / elapsed;
  const width = Math.max(1, wrap()?.clientWidth || window.innerWidth);
  const distanceThreshold = Math.min(88, Math.max(42, width * 0.105));
  const intentionalDistance = ax >= distanceThreshold;
  const intentionalFlick = elapsed <= 280 && ax >= 24 && velocity >= 0.28;
  const horizontal = ax > ay * 1.15;
  const meaningfulVerticalDrag = ay > 14 && ay > ax;

  resetGesture();
  if (selectionActive()) return;
  if (meaningfulVerticalDrag) {
    // Do not reinterpret an abandoned vertical gesture as a forward tap when
    // the browser subsequently synthesizes a click.
    state.suppressClickUntil = performance.now() + 360;
    return;
  }
  if (horizontal && (intentionalDistance || intentionalFlick)) {
    state.suppressClickUntil = performance.now() + 520;
    requestTurn(dx < 0 ? 1 : -1);
  }
}

function onPointerCancel(event) {
  if (event.pointerId === state.pointerId) resetGesture();
}

function coarseClick(event) {
  return event.pointerType === 'touch'
    || event.pointerType === 'pen'
    || window.matchMedia('(pointer: coarse)').matches;
}

function onPageClick(event) {
  if (!pagedRead() || overlaysOpen() || interactiveTarget(event.target)) return;
  if (!event.target.closest('#pagesWrapper')) return;
  if (selectionActive()) return;

  // Always stop the core 50/50 click handler. This layer substitutes safer,
  // device-aware zones below.
  event.stopImmediatePropagation();

  if (performance.now() < state.suppressClickUntil) {
    event.preventDefault();
    return;
  }

  const el = wrap();
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = event.clientX - rect.left;

  if (coarseClick(event)) {
    // One-handed reading: the backward zone is deliberately small, while most
    // of the page advances. This mirrors dedicated e-reader ergonomics.
    event.preventDefault();
    requestTurn(x < rect.width * 0.22 ? -1 : 1);
    return;
  }

  // Desktop follows the visual page curl: only the physical edges turn.
  const edge = Math.min(132, Math.max(62, rect.width * 0.14));
  if (x <= edge) requestTurn(-1);
  else if (x >= rect.width - edge) requestTurn(1);
}

function navKey(event) {
  return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(event.key);
}

function onKeyDown(event) {
  if (!navKey(event)) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  if (keyboardInteractiveTarget(event.target)) {
    // Do not reinterpret keys while a real control owns focus.
    return;
  }

  // Never turn or scroll the book behind a modal/panel.
  if (overlaysOpen()) {
    event.stopImmediatePropagation();
    return;
  }

  // Scroll mode owns its own keys in experience.js.
  if (document.documentElement.dataset.readerMode === 'scroll') return;
  if (document.body.dataset.stage !== 'read') return;

  if (selectionActive()) {
    event.stopImmediatePropagation();
    return;
  }

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    // Vertical arrows are left alone for assistive/browser semantics rather
    // than unexpectedly turning a page.
    event.stopImmediatePropagation();
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();

  if (event.key === 'ArrowLeft' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)) {
    requestTurn(-1);
  } else {
    requestTurn(1);
  }
}

function stopLegacyPageKeysFromControls(event) {
  if (!navKey(event) || !keyboardInteractiveTarget(event.target)) return;
  // This runs during bubbling, after the focused control has received the key,
  // but before the older document-level page-turn handler can reinterpret it.
  event.stopPropagation();
}

function suppressLegacyTouch(event) {
  if (!pagedRead()) return;
  if (event.target.closest('#pagesWrapper')) event.stopImmediatePropagation();
}

function tuneHint() {
  const hint = document.getElementById('readHint');
  if (!hint) return;
  hint.innerHTML = window.matchMedia('(pointer: coarse)').matches
    ? 'Tap right to turn · swipe either way · <kbd>←</kbd> <kbd>→</kbd> also work'
    : 'Click a page edge to turn · <kbd>←</kbd> <kbd>→</kbd> or <kbd>PgUp</kbd> <kbd>PgDn</kbd>';
}

function installGestureIndicators() {
  const el = wrap();
  if (!el || el.querySelector('.nav-gesture-preview')) return;
  const prev = document.createElement('span');
  const next = document.createElement('span');
  prev.className = 'nav-gesture-preview prev';
  next.className = 'nav-gesture-preview next';
  prev.setAttribute('aria-hidden', 'true');
  next.setAttribute('aria-hidden', 'true');
  el.append(prev, next);
}

function syncContext() {
  if (!pagedRead()) {
    clearQueuedTurn();
    resetGesture();
  }
  syncNavSemantics();
}

function initialize() {
  const el = wrap();
  if (!el || document.documentElement.dataset.navigationEnhanced === 'true') return;
  document.documentElement.dataset.navigationEnhanced = 'true';
  installReadingSurface();
  installReadingContinuity();
  loadStyles();
  installGestureIndicators();
  tuneHint();
  syncNavSemantics();
  installQueueObserver();

  el.addEventListener('click', onPageClick, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointermove', onPointerMove, { capture: true, passive: false });
  document.addEventListener('pointerup', onPointerUp, true);
  document.addEventListener('pointercancel', onPointerCancel, true);
  document.addEventListener('keydown', onKeyDown, true);
  document.body.addEventListener('keydown', stopLegacyPageKeysFromControls);

  // Prevent the older distance-only swipe listener from double-firing while
  // retaining native touch defaults for selection and zoom.
  document.addEventListener('touchstart', suppressLegacyTouch, true);
  document.addEventListener('touchend', suppressLegacyTouch, true);

  const stageObserver = new MutationObserver(syncContext);
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  stageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-reader-mode'] });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
