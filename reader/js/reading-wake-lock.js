import {
  WAKE_LOCK_STORAGE_KEY,
  parseWakeLockPreference,
  wakeLockEligibility,
  wakeLockButtonModel,
  shouldRetryWakeLock,
} from './reading-wake-lock-model.js';

const STATUS_ID = 'keepAwakeStatus';
let sentinel = null;
let pendingRequest = null;
let enabled = false;
let button = null;
let status = null;
let observer = null;

function supported() {
  return !!(navigator.wakeLock && typeof navigator.wakeLock.request === 'function');
}

function stage() {
  return document.body?.dataset?.stage || '';
}

function readPreference() {
  try {
    return parseWakeLockPreference(localStorage.getItem(WAKE_LOCK_STORAGE_KEY));
  } catch {
    return false;
  }
}

function writePreference(value) {
  try {
    localStorage.setItem(WAKE_LOCK_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // Storage can be unavailable in privacy-constrained contexts; session behavior still works.
  }
}

function updateUi() {
  if (!button) return;
  const model = wakeLockButtonModel({
    enabled,
    supported: supported(),
    held: !!sentinel && !sentinel.released,
    pending: !!pendingRequest,
  });
  button.textContent = model.label;
  button.disabled = model.disabled;
  button.setAttribute('aria-pressed', String(model.pressed));
  button.setAttribute('aria-describedby', STATUS_ID);
  button.title = model.status;
  if (status) status.textContent = model.status;
}

async function releaseWakeLock() {
  const current = sentinel;
  sentinel = null;
  if (current && !current.released) {
    try {
      await current.release();
    } catch {
      // Release is best-effort; browsers may already have revoked the sentinel.
    }
  }
  updateUi();
}

async function requestWakeLock(reason = 'user') {
  const eligibility = wakeLockEligibility({
    enabled,
    supported: supported(),
    visibility: document.visibilityState,
    stage: stage(),
  });
  if (!eligibility.shouldHold) {
    await releaseWakeLock();
    return null;
  }
  if (sentinel && !sentinel.released) return sentinel;
  if (pendingRequest) return pendingRequest;

  pendingRequest = navigator.wakeLock.request('screen')
    .then((next) => {
      sentinel = next;
      next.addEventListener('release', () => {
        if (sentinel === next) sentinel = null;
        updateUi();
      }, { once: true });
      return next;
    })
    .catch((error) => {
      if (reason === 'user') console.warn('Screen wake lock could not be acquired', error);
      return null;
    })
    .finally(() => {
      pendingRequest = null;
      updateUi();
    });
  updateUi();
  return pendingRequest;
}

function syncWakeLock(reason) {
  const eligibility = wakeLockEligibility({
    enabled,
    supported: supported(),
    visibility: document.visibilityState,
    stage: stage(),
  });
  if (!eligibility.shouldHold) {
    releaseWakeLock();
    return;
  }
  if (shouldRetryWakeLock({
    enabled,
    supported: supported(),
    visibility: document.visibilityState,
    stage: stage(),
    reason,
  })) {
    requestWakeLock(reason);
  }
}

function installSetting() {
  const panel = document.getElementById('settingsPanel');
  const card = panel?.querySelector('.settings-card');
  if (!card || document.getElementById('keepAwakeBtn')) return false;

  const row = document.createElement('div');
  row.className = 'setting-row';
  row.dataset.readerWakeLock = 'true';

  const label = document.createElement('span');
  label.textContent = 'Keep awake';

  const pills = document.createElement('div');
  pills.className = 'setting-pills';

  button = document.createElement('button');
  button.type = 'button';
  button.className = 'pill';
  button.id = 'keepAwakeBtn';
  button.setAttribute('aria-label', 'Keep screen awake while reading');

  status = document.createElement('span');
  status.id = STATUS_ID;
  status.className = 'sr-only';
  status.setAttribute('aria-live', 'polite');

  pills.appendChild(button);
  row.append(label, pills, status);

  const actions = card.querySelector('.setting-actions');
  card.insertBefore(row, actions || card.querySelector('.stats-close'));

  button.addEventListener('click', async () => {
    enabled = !enabled;
    writePreference(enabled);
    updateUi();
    if (enabled) await requestWakeLock('user');
    else await releaseWakeLock();
  });
  updateUi();
  return true;
}

function installLifecycle() {
  if (!document.body || observer) return;
  observer = new MutationObserver(() => syncWakeLock('stage'));
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });

  document.addEventListener('visibilitychange', () => syncWakeLock('visibility'));
  window.addEventListener('pageshow', () => syncWakeLock('pageshow'));
  window.addEventListener('pagehide', () => releaseWakeLock());
}

function init() {
  enabled = readPreference();
  installSetting();
  installLifecycle();
  syncWakeLock('stage');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
