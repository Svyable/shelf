import {
  modeTargetReady,
  modeTransitionEligible,
  modeTransitionFadeMs,
  modeTransitionLabel,
  normalizeReaderMode,
  shouldRestoreModeFocus,
} from './reading-mode-transition-model.js';

const STYLE_ID = 'readerModeTransitionStyle';
const STATUS_ID = 'readerModeTransitionStatus';
const SNAPSHOT_CLASS = 'reader-mode-transition-snapshot';
const OVERLAY_SELECTOR = '#tocOverlay.active, #progressPanel.active, #settingsPanel.active, #searchOverlay.active, #noteDialog.active, #helpOverlay.active, dialog[open]';

let previousMode = normalizeReaderMode(document.documentElement.dataset.readerMode);
let pendingSnapshot = null;
let pendingSnapshotTimer = 0;
let transitionToken = 0;
let activeSnapshot = null;

function installStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .${SNAPSHOT_CLASS} {
      position: fixed !important;
      z-index: 58 !important;
      margin: 0 !important;
      pointer-events: none !important;
      user-select: none !important;
      contain: layout paint style;
      opacity: 1;
      transition: opacity 180ms ease-out;
      box-shadow: 0 18px 52px color-mix(in srgb, var(--shadow, #000) 42%, transparent);
    }
    .${SNAPSHOT_CLASS}.pages-wrapper { display: flex !important; }
    .${SNAPSHOT_CLASS}.scroll-reader { display: block !important; overflow: hidden !important; }
    .${SNAPSHOT_CLASS}.is-settling { opacity: 0; }
    #${STATUS_ID} {
      position: fixed;
      left: 50%;
      bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
      z-index: 92;
      max-width: min(calc(100vw - 2rem), 28rem);
      transform: translateX(-50%);
      padding: .62rem .86rem;
      border: 1px solid color-mix(in srgb, var(--border, currentColor) 72%, transparent);
      border-radius: 999px;
      background: color-mix(in srgb, var(--bg-primary, #111) 92%, transparent);
      color: var(--text-secondary, currentColor);
      box-shadow: 0 10px 32px color-mix(in srgb, var(--shadow, #000) 38%, transparent);
      font: 500 .72rem/1.2 system-ui, sans-serif;
      letter-spacing: .01em;
      text-align: center;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    #${STATUS_ID}[hidden] { display: none !important; }
    body[data-reader-mode-transition="true"] #pagesWrapper,
    body[data-reader-mode-transition="true"] #scrollReader {
      pointer-events: none !important;
    }
    @media (max-width: 640px) {
      #${STATUS_ID} {
        bottom: calc(.72rem + env(safe-area-inset-bottom, 0px));
        max-width: calc(100vw - 1.2rem);
        padding: .58rem .74rem;
      }
    }
    @media (max-height: 460px) and (orientation: landscape) {
      #${STATUS_ID} {
        left: auto;
        right: calc(.6rem + env(safe-area-inset-right, 0px));
        bottom: calc(.5rem + env(safe-area-inset-bottom, 0px));
        transform: none;
        max-width: min(45vw, 21rem);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .${SNAPSHOT_CLASS} { transition: none; }
    }
    @media (forced-colors: active) {
      #${STATUS_ID} {
        border: 1px solid CanvasText;
        background: Canvas;
        color: CanvasText;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
      .${SNAPSHOT_CLASS} { box-shadow: none; }
    }
  `;
  document.head.appendChild(style);
}

function statusNode() {
  let node = document.getElementById(STATUS_ID);
  if (node) return node;
  node = document.createElement('p');
  node.id = STATUS_ID;
  node.hidden = true;
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');
  node.setAttribute('aria-atomic', 'true');
  document.body.appendChild(node);
  return node;
}

function readingSurface(mode) {
  return normalizeReaderMode(mode) === 'scroll'
    ? document.getElementById('scrollReader')
    : document.getElementById('pagesWrapper');
}

function stripInteractiveSemantics(root) {
  root.removeAttribute('id');
  root.removeAttribute('aria-live');
  root.setAttribute('aria-hidden', 'true');
  root.inert = true;
  root.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
  root.querySelectorAll('a, button, input, textarea, select, [tabindex]').forEach((node) => {
    node.tabIndex = -1;
    node.removeAttribute('aria-live');
  });
}

function snapshotSurface(mode) {
  const source = readingSurface(mode);
  if (!source || !source.isConnected) return null;
  const rect = source.getBoundingClientRect();
  if (rect.width < 40 || rect.height < 40) return null;

  const sourceMode = normalizeReaderMode(mode);
  const clone = source.cloneNode(true);
  stripInteractiveSemantics(clone);
  clone.classList.add(SNAPSHOT_CLASS);
  clone.dataset.readerSnapshotMode = sourceMode;
  clone.style.setProperty('display', sourceMode === 'scroll' ? 'block' : 'flex', 'important');
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;

  document.body.appendChild(clone);
  if (sourceMode === 'scroll') clone.scrollTop = source.scrollTop;
  return {
    node: clone,
    mode: sourceMode,
    sourceOwnedFocus: source.contains(document.activeElement),
    createdAt: performance.now(),
  };
}

function clearPendingSnapshot() {
  window.clearTimeout(pendingSnapshotTimer);
  pendingSnapshotTimer = 0;
  if (pendingSnapshot?.node?.isConnected) pendingSnapshot.node.remove();
  pendingSnapshot = null;
}

function precapture() {
  if (document.body.dataset.stage !== 'read') return;
  clearPendingSnapshot();
  pendingSnapshot = snapshotSurface(previousMode);
  if (!pendingSnapshot) return;
  pendingSnapshotTimer = window.setTimeout(clearPendingSnapshot, 900);
}

function overlaysOpen() {
  return !!document.querySelector(OVERLAY_SELECTOR);
}

function surfaceState(mode) {
  const targetMode = normalizeReaderMode(mode);
  const surface = readingSurface(targetMode);
  if (!surface) return { mode: targetMode, hidden: true, busy: true, hasContent: false };
  if (targetMode === 'scroll') {
    const documentRoot = document.getElementById('scrollDocument');
    const hasContent = !!documentRoot?.textContent?.trim()
      && (!documentRoot.querySelector('.scroll-loading') || surface.getAttribute('aria-busy') !== 'true');
    return {
      mode: targetMode,
      hidden: surface.hidden,
      busy: surface.getAttribute('aria-busy') === 'true',
      hasContent,
    };
  }
  const hasContent = !!surface.querySelector('.page-surface.active .page-inner')?.textContent?.trim()
    || !!document.querySelector('#pageLeft .page-inner')?.textContent?.trim();
  return {
    mode: targetMode,
    hidden: false,
    busy: surface.getAttribute('aria-busy') === 'true',
    hasContent,
  };
}

function focusTarget(mode) {
  const targetMode = normalizeReaderMode(mode);
  const target = targetMode === 'scroll'
    ? document.getElementById('scrollReader')
    : document.querySelector('#pagesWrapper .page-surface.active') || document.getElementById('pagesWrapper');
  if (!target) return false;
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
  return document.activeElement === target;
}

function cleanupActiveSnapshot() {
  if (activeSnapshot?.node?.isConnected) activeSnapshot.node.remove();
  activeSnapshot = null;
  document.body.removeAttribute('data-reader-mode-transition');
  document.getElementById('bookStage')?.removeAttribute('aria-busy');
  const status = statusNode();
  status.hidden = true;
}

function snapshotForTransition(from) {
  window.clearTimeout(pendingSnapshotTimer);
  pendingSnapshotTimer = 0;
  if (
    pendingSnapshot?.node?.isConnected
    && pendingSnapshot.mode === normalizeReaderMode(from)
    && performance.now() - pendingSnapshot.createdAt < 1000
  ) {
    const snapshot = pendingSnapshot;
    pendingSnapshot = null;
    return snapshot;
  }
  clearPendingSnapshot();
  return snapshotSurface(from);
}

function settleTransition(token, to, snapshot) {
  if (token !== transitionToken) return;
  const stillReading = document.body.dataset.stage === 'read';
  const status = statusNode();
  status.textContent = modeTransitionLabel(to, { ready: true });
  if (shouldRestoreModeFocus({
    sourceOwnedFocus: !!snapshot?.sourceOwnedFocus,
    overlayOpen: overlaysOpen(),
    stillReading,
  })) {
    focusTarget(to);
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeMs = modeTransitionFadeMs({ reducedMotion });
  if (snapshot?.node?.isConnected) snapshot.node.classList.add('is-settling');
  window.setTimeout(() => {
    if (token !== transitionToken) return;
    cleanupActiveSnapshot();
  }, fadeMs + 80);
}

function waitForTarget(token, to, snapshot) {
  if (token !== transitionToken) return;
  if (document.body.dataset.stage !== 'read') {
    cleanupActiveSnapshot();
    return;
  }
  if (normalizeReaderMode(document.documentElement.dataset.readerMode) !== normalizeReaderMode(to)) return;

  if (modeTargetReady(surfaceState(to))) {
    requestAnimationFrame(() => requestAnimationFrame(() => settleTransition(token, to, snapshot)));
    return;
  }
  requestAnimationFrame(() => waitForTarget(token, to, snapshot));
}

function beginTransition(from, to) {
  const stage = document.body.dataset.stage || '';
  if (!modeTransitionEligible({ from, to, stage })) return;
  transitionToken += 1;
  cleanupActiveSnapshot();

  const token = transitionToken;
  const snapshot = snapshotForTransition(from);
  activeSnapshot = snapshot;
  document.body.setAttribute('data-reader-mode-transition', 'true');
  document.getElementById('bookStage')?.setAttribute('aria-busy', 'true');
  const status = statusNode();
  status.textContent = modeTransitionLabel(to);
  status.hidden = false;
  waitForTarget(token, to, snapshot);
}

function onModeMutation() {
  const next = normalizeReaderMode(document.documentElement.dataset.readerMode);
  const from = previousMode;
  previousMode = next;
  if (from === next) return;
  beginTransition(from, next);
}

function installPrecapture() {
  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('[data-reader-mode-value]')) precapture();
  }, true);
  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key?.toLowerCase() === 'v') precapture();
  }, true);
}

function install() {
  if (document.documentElement.dataset.readerModeTransitionReady === 'true') return;
  document.documentElement.dataset.readerModeTransitionReady = 'true';
  installStyles();
  statusNode();
  previousMode = normalizeReaderMode(document.documentElement.dataset.readerMode);
  installPrecapture();

  new MutationObserver(onModeMutation).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reader-mode'],
  });
  new MutationObserver(() => {
    if (document.body.dataset.stage !== 'read') {
      transitionToken += 1;
      clearPendingSnapshot();
      cleanupActiveSnapshot();
    }
  }).observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
