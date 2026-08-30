import './offline-readiness.js';
import {
  activationMessage,
  shouldOfferReaderUpdate,
  shouldReloadAfterControllerChange,
} from './pwa-update-model.js';

const STYLE_HREF = 'css/pwa-update.css?v=r1';
let registration = null;
let activationRequested = false;
let reloadCommitted = false;
let dismissedWorker = null;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function ensureNotice() {
  let notice = document.getElementById('readerUpdateNotice');
  if (notice) return notice;
  notice = document.createElement('aside');
  notice.id = 'readerUpdateNotice';
  notice.className = 'reader-update-notice';
  notice.hidden = true;
  notice.setAttribute('aria-label', 'Reader update');
  notice.innerHTML = `
    <div class="reader-update-copy">
      <strong>Reader update ready</strong>
      <span id="readerUpdateStatus" aria-live="polite" aria-atomic="true">Refresh when convenient to switch to the new Reader shell.</span>
    </div>
    <div class="reader-update-actions">
      <button type="button" class="ghost-btn" id="readerUpdateLater">Later</button>
      <button type="button" class="start-btn" id="readerUpdateApply">Refresh Reader</button>
    </div>`;
  document.body.appendChild(notice);
  notice.querySelector('#readerUpdateLater')?.addEventListener('click', dismissUpdate);
  notice.querySelector('#readerUpdateApply')?.addEventListener('click', applyUpdate);
  return notice;
}

function waitingWorker() {
  return registration?.waiting || null;
}

function showUpdate(worker = waitingWorker()) {
  if (!worker || worker === dismissedWorker) return false;
  if (!shouldOfferReaderUpdate({
    hasController: !!navigator.serviceWorker.controller,
    hasWaitingWorker: true,
  })) return false;
  const notice = ensureNotice();
  notice.hidden = false;
  notice.dataset.state = 'ready';
  return true;
}

function hideUpdate() {
  const notice = document.getElementById('readerUpdateNotice');
  if (notice) notice.hidden = true;
}

function dismissUpdate() {
  dismissedWorker = waitingWorker();
  hideUpdate();
}

function applyUpdate() {
  const worker = waitingWorker();
  if (!worker) return;
  activationRequested = true;
  const notice = ensureNotice();
  notice.hidden = false;
  notice.dataset.state = 'applying';
  const status = notice.querySelector('#readerUpdateStatus');
  if (status) status.textContent = 'Applying update…';
  notice.querySelectorAll('button').forEach((button) => { button.disabled = true; });
  worker.postMessage(activationMessage());
}

function trackInstalling(worker) {
  if (!worker) return;
  worker.addEventListener('statechange', () => {
    if (worker.state !== 'installed') return;
    if (navigator.serviceWorker.controller) showUpdate(registration?.waiting || worker);
  });
}

async function installReaderUpdates() {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
  installStyles();
  ensureNotice();
  try {
    registration = await navigator.serviceWorker.register(new URL('../sw.js', import.meta.url));
    if (registration.waiting) showUpdate(registration.waiting);
    if (registration.installing) trackInstalling(registration.installing);
    registration.addEventListener('updatefound', () => trackInstalling(registration.installing));
    window.addEventListener('focus', () => registration?.update().catch(() => {}), { passive: true });
  } catch {
    // Reading remains fully usable when service workers are unavailable.
  }
}

navigator.serviceWorker?.addEventListener('controllerchange', () => {
  if (!shouldReloadAfterControllerChange({ activationRequested, reloadCommitted })) return;
  reloadCommitted = true;
  window.location.reload();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installReaderUpdates, { once: true });
} else {
  void installReaderUpdates();
}
