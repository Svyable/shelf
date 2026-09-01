import { parseRoute } from './router.js';
import {
  availabilityCopy,
  chapterFailureState,
  chapterResourceIdentity,
  failureMatchesRoute,
} from './chapter-availability-model.js';

const failures = new Map();
let installed = false;

function keyOf(identity) {
  return identity ? `${identity.slug}\u0000${identity.chapter}` : '';
}

function currentFailure() {
  const route = parseRoute();
  const failure = failures.get(`${route.slug || ''}\u0000${route.chapter || ''}`);
  return failureMatchesRoute(failure, route) ? failure : null;
}

function ensureStyle() {
  if (document.getElementById('chapterAvailabilityStyle')) return;
  const style = document.createElement('style');
  style.id = 'chapterAvailabilityStyle';
  style.textContent = `
    .chapter-availability-notice {
      position: fixed;
      z-index: 34;
      left: max(16px, env(safe-area-inset-left));
      right: max(16px, env(safe-area-inset-right));
      bottom: max(18px, calc(env(safe-area-inset-bottom) + 12px));
      width: min(620px, calc(100vw - 32px));
      margin-inline: auto;
      padding: 14px 16px;
      border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
      border-radius: 14px;
      background: color-mix(in srgb, var(--paper, #fff) 94%, transparent);
      box-shadow: 0 12px 34px rgb(0 0 0 / .16);
      backdrop-filter: blur(12px);
    }
    .chapter-availability-notice[hidden] { display: none !important; }
    .chapter-availability-notice h3 { margin: 0 0 4px; font: inherit; font-weight: 700; }
    .chapter-availability-notice p { margin: 0; max-width: 58ch; }
    .chapter-availability-actions { margin-top: 10px; display: flex; gap: 8px; align-items: center; }
    .chapter-availability-retry {
      min-height: 36px;
      padding: 7px 12px;
      border: 1px solid currentColor;
      border-radius: 999px;
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: 650;
      cursor: pointer;
    }
    .chapter-availability-retry[aria-busy="true"] { cursor: progress; opacity: .68; }
    @media (pointer: coarse), (max-width: 680px) {
      .chapter-availability-retry { min-height: 44px; padding-inline: 16px; }
    }
    @media (max-height: 430px) and (orientation: landscape) {
      .chapter-availability-notice { bottom: max(8px, env(safe-area-inset-bottom)); padding-block: 10px; }
      .chapter-availability-notice p { font-size: .92em; }
    }
    @media (forced-colors: active) {
      .chapter-availability-notice { background: Canvas; border: 2px solid CanvasText; box-shadow: none; }
      .chapter-availability-retry { border: 2px solid ButtonText; }
    }
  `;
  document.head.appendChild(style);
}

function ensureNotice() {
  let notice = document.getElementById('chapterAvailabilityNotice');
  if (notice) return notice;
  notice = document.createElement('section');
  notice.id = 'chapterAvailabilityNotice';
  notice.className = 'chapter-availability-notice';
  notice.hidden = true;
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  notice.setAttribute('aria-atomic', 'true');
  notice.innerHTML = `
    <h3 data-chapter-availability-title></h3>
    <p data-chapter-availability-message></p>
    <div class="chapter-availability-actions" data-chapter-availability-actions>
      <button class="chapter-availability-retry" type="button" data-chapter-availability-retry>Try again</button>
    </div>
  `;
  document.body.appendChild(notice);
  notice.querySelector('[data-chapter-availability-retry]')?.addEventListener('click', () => {
    const failure = currentFailure();
    if (!failure?.state.retryable) return;
    const button = notice.querySelector('[data-chapter-availability-retry]');
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = 'Retrying…';
    }
    const message = notice.querySelector('[data-chapter-availability-message]');
    if (message) message.textContent = 'Reloading this chapter at your current reading place.';
    window.setTimeout(() => window.location.reload(), 80);
  });
  return notice;
}

function render() {
  if (typeof document === 'undefined') return;
  const notice = ensureNotice();
  const failure = currentFailure();
  if (!failure || document.body?.dataset.stage !== 'read') {
    notice.hidden = true;
    return;
  }
  const copy = availabilityCopy(failure.state, { online: navigator.onLine !== false });
  notice.querySelector('[data-chapter-availability-title]').textContent = copy.title;
  notice.querySelector('[data-chapter-availability-message]').textContent = copy.message;
  const actions = notice.querySelector('[data-chapter-availability-actions]');
  const button = notice.querySelector('[data-chapter-availability-retry]');
  if (actions) actions.hidden = !failure.state.retryable;
  if (button) {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.textContent = copy.action || 'Try again';
  }
  notice.hidden = false;
}

export function reportChapterAcquisitionFailure(relativePath, error) {
  const identity = chapterResourceIdentity(relativePath);
  if (!identity) return false;
  const state = chapterFailureState(error);
  if (state.kind === 'aborted') return false;
  failures.set(keyOf(identity), Object.freeze({ ...identity, state }));
  queueMicrotask(render);
  return true;
}

export function reportChapterAcquisitionSuccess(relativePath) {
  const identity = chapterResourceIdentity(relativePath);
  if (!identity) return false;
  const removed = failures.delete(keyOf(identity));
  if (removed) queueMicrotask(render);
  return removed;
}

export function installChapterAvailabilityRecovery() {
  if (installed || typeof window === 'undefined' || typeof document === 'undefined') return;
  installed = true;
  ensureStyle();
  window.addEventListener('hashchange', render);
  window.addEventListener('online', render);
  window.addEventListener('offline', render);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) render();
  });
  const observer = new MutationObserver(render);
  if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  else document.addEventListener('DOMContentLoaded', () => {
    ensureNotice();
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
    render();
  }, { once: true });
}

installChapterAvailabilityRecovery();
