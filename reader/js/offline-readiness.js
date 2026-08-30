import { parseRoute } from './router.js';
import {
  normalizeOfflineReadiness,
  offlineReadinessLabel,
  offlineReadinessState,
  shouldKeepOfflineNoticeVisible,
} from './offline-readiness-model.js';

const STYLE_HREF = 'css/offline-readiness.css?v=r1';
const QUERY_TYPE = 'BOOKSELF_OFFLINE_READINESS';
let pollTimer = null;
let hideTimer = null;
let requestSerial = 0;
let lastSlug = null;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function ensureNotice() {
  let notice = document.getElementById('offlineReadinessNotice');
  if (notice) return notice;
  notice = document.createElement('aside');
  notice.id = 'offlineReadinessNotice';
  notice.className = 'offline-readiness-notice';
  notice.hidden = true;
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.setAttribute('aria-atomic', 'true');
  notice.innerHTML = '<span class="offline-readiness-dot" aria-hidden="true"></span><span class="offline-readiness-label"></span>';
  document.body.appendChild(notice);
  return notice;
}

function publicationReadme(slug) {
  return new URL(`../../books/${encodeURIComponent(slug)}/README.md`, import.meta.url).href;
}

async function activeWorker() {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return null;
  if (navigator.serviceWorker.controller) return navigator.serviceWorker.controller;
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active || null;
  } catch {
    return null;
  }
}

async function queryReadiness(slug) {
  const worker = await activeWorker();
  if (!worker || typeof MessageChannel === 'undefined') return null;
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    const timeout = window.setTimeout(() => resolve(null), 1800);
    channel.port1.onmessage = (event) => {
      window.clearTimeout(timeout);
      resolve(event.data?.readiness || null);
    };
    worker.postMessage({ type: QUERY_TYPE, url: publicationReadme(slug) }, [channel.port2]);
  });
}

function clearTimers() {
  if (pollTimer) window.clearTimeout(pollTimer);
  if (hideTimer) window.clearTimeout(hideTimer);
  pollTimer = null;
  hideTimer = null;
}

function hideNotice() {
  const notice = ensureNotice();
  notice.hidden = true;
  notice.removeAttribute('data-state');
}

function render(state, readiness) {
  const notice = ensureNotice();
  const label = offlineReadinessLabel({
    supported: state !== 'unsupported',
    online: navigator.onLine,
    readiness,
  });
  notice.dataset.state = state;
  notice.querySelector('.offline-readiness-label').textContent = label;
  notice.hidden = false;

  if (!shouldKeepOfflineNoticeVisible(state)) {
    hideTimer = window.setTimeout(hideNotice, state === 'online-ready' ? 3500 : 1800);
  }
}

async function syncReadiness() {
  clearTimers();
  const route = parseRoute();
  if (route.view !== 'read' || !route.slug) {
    lastSlug = null;
    hideNotice();
    return;
  }
  lastSlug = route.slug;
  const serial = ++requestSerial;
  const supported = 'serviceWorker' in navigator && window.isSecureContext;
  if (!supported) {
    render('unsupported', {});
    return;
  }

  const raw = await queryReadiness(route.slug);
  if (serial !== requestSerial || lastSlug !== route.slug) return;
  const readiness = normalizeOfflineReadiness(raw || {});
  const state = offlineReadinessState({ supported: !!raw, online: navigator.onLine, readiness });
  render(state, readiness);

  if (state === 'online-saving') {
    pollTimer = window.setTimeout(syncReadiness, 1400);
  }
}

function install() {
  installStyles();
  ensureNotice();
  window.addEventListener('hashchange', syncReadiness, { passive: true });
  window.addEventListener('online', syncReadiness, { passive: true });
  window.addEventListener('offline', syncReadiness, { passive: true });
  navigator.serviceWorker?.addEventListener('controllerchange', syncReadiness);
  void syncReadiness();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', install, { once: true });
} else {
  install();
}
