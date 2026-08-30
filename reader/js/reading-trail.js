import { parseRoute } from './router.js';
import { readingReturnLabel, readingReturnPoint } from './reading-trail-model.js';

const STYLE_HREF = 'css/reading-trail.css?v=r1';
let returning = false;
let button = null;
let live = null;

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function activeReadingSurface() {
  if (document.body.dataset.stage !== 'read') return null;
  if (document.documentElement.dataset.readerMode === 'scroll') {
    const scroll = document.getElementById('scrollReader');
    return scroll && !scroll.hidden ? scroll : null;
  }
  return document.querySelector('#pagesWrapper .page-surface.active')
    || document.getElementById('pagesWrapper');
}

function focusReadingSurface() {
  const target = activeReadingSurface();
  if (!target) return false;
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
  return document.activeElement === target;
}

function announce(message) {
  if (!live) return;
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = message; });
}

function academicReturnActive() {
  return !!document.querySelector('.reader-academic-return');
}

function sync() {
  if (!button) return;
  const point = readingReturnPoint(history.state, parseRoute());
  const available = !!point
    && document.body.dataset.stage === 'read'
    && !academicReturnActive();
  button.hidden = !available;
  button.disabled = !available;
  button.tabIndex = available ? 0 : -1;
  if (!available) {
    button.removeAttribute('title');
    button.removeAttribute('aria-label');
    return;
  }

  const label = readingReturnLabel(point) || 'Return to previous reading spot';
  button.title = label;
  button.setAttribute('aria-label', label);
  const text = button.querySelector('.reading-trail-label');
  if (text) text.textContent = 'Return';
}

function afterFrames(count, callback) {
  const frame = () => {
    if (count <= 0) {
      callback();
      return;
    }
    count -= 1;
    requestAnimationFrame(frame);
  };
  frame();
}

function returnToPreviousSpot() {
  const point = readingReturnPoint(history.state, parseRoute());
  if (!point || history.length <= 1) return;
  returning = true;
  button.disabled = true;
  history.back();
}

function onPopState() {
  sync();
  if (!returning) return;
  returning = false;
  afterFrames(3, () => {
    focusReadingSurface();
    announce('Returned to previous reading spot');
  });
}

function install() {
  if (document.documentElement.dataset.readingTrailReady === 'true') return;
  document.documentElement.dataset.readingTrailReady = 'true';
  installStyles();

  button = document.createElement('button');
  button.id = 'readingTrailBack';
  button.className = 'reading-trail-back';
  button.type = 'button';
  button.hidden = true;
  button.innerHTML = '<span class="reading-trail-icon" aria-hidden="true">↩</span><span class="reading-trail-label">Return</span>';
  button.addEventListener('click', returnToPreviousSpot);

  live = document.createElement('p');
  live.id = 'readingTrailLive';
  live.className = 'sr-only';
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');

  document.body.append(button, live);

  window.addEventListener('hashchange', sync, { passive: true });
  window.addEventListener('popstate', onPopState, { passive: true });

  new MutationObserver(sync).observe(document.body, {
    attributes: true,
    attributeFilter: ['data-stage'],
  });
  new MutationObserver(sync).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reader-mode'],
  });
  const bookStage = document.getElementById('bookStage');
  if (bookStage) {
    new MutationObserver(sync).observe(bookStage, { childList: true, subtree: true });
  }
  sync();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
