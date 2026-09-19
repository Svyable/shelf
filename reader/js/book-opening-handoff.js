import { parseHash } from './router.js';

const STYLE_HREF = 'css/book-opening-handoff.css?v=r1';
export const COVER_MORE_ACTION_IDS = Object.freeze([
  'copyPreviewBtn',
  'citeBtn',
  'feedbackBtn',
  'sourceLink',
  'historyLink',
  'rightsLink',
]);

let pending = null;
let cleanupTimer = 0;
let styleReady = null;

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function handoffFrames(sourceRect = {}, targetRect = {}, kind = 'shelf') {
  const source = {
    left: finite(sourceRect.left),
    top: finite(sourceRect.top),
    width: Math.max(1, finite(sourceRect.width, 1)),
    height: Math.max(1, finite(sourceRect.height, 1)),
  };
  const target = {
    left: finite(targetRect.left),
    top: finite(targetRect.top),
    width: Math.max(1, finite(targetRect.width, source.width)),
    height: Math.max(1, finite(targetRect.height, source.height)),
  };
  const resume = kind === 'resume';
  return [
    {
      left: `${source.left}px`,
      top: `${source.top}px`,
      width: `${source.width}px`,
      height: `${source.height}px`,
      opacity: 1,
      transform: 'rotate(0deg) scale(1)',
    },
    {
      left: `${target.left}px`,
      top: `${target.top}px`,
      width: `${target.width}px`,
      height: `${target.height}px`,
      opacity: resume ? 0.08 : 0.94,
      transform: resume ? 'rotate(0deg) scale(.99)' : 'rotate(0deg) scale(1)',
    },
  ];
}

export function sourceKindForElement(target) {
  if (!target?.closest) return '';
  if (target.closest('#continueCardLink')) return 'resume';
  if (target.closest('.volume')) return 'shelf';
  return '';
}

export function reducedMotionPreferred(matchMedia = globalThis.matchMedia) {
  try {
    return !!matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  } catch {
    return false;
  }
}

function ensureStyles() {
  if (styleReady) return styleReady;
  const existing = document.querySelector(`link[href="${STYLE_HREF}"]`);
  if (existing) {
    styleReady = Promise.resolve(true);
    return styleReady;
  }
  styleReady = new Promise((resolve) => {
    const link = document.createElement('link');
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    link.addEventListener('load', () => finish(true), { once: true });
    link.addEventListener('error', () => finish(false), { once: true });
    document.head.appendChild(link);
    window.setTimeout(() => finish(!!link.sheet), 900);
  });
  return styleReady;
}

function removeIds(root) {
  root.removeAttribute?.('id');
  root.querySelectorAll?.('[id]').forEach((node) => node.removeAttribute('id'));
}

function cleanupPending() {
  clearTimeout(cleanupTimer);
  cleanupTimer = 0;
  pending?.clone?.remove?.();
  document.body.classList.remove(
    'book-handoff-cover-arriving',
    'book-handoff-cover-reveal',
    'book-handoff-resume-arriving'
  );
  pending = null;
}

function sourceDescriptor(target) {
  const resumeLink = target.closest?.('#continueCardLink');
  if (resumeLink) {
    return {
      kind: 'resume',
      route: parseHash(resumeLink.getAttribute('href') || ''),
      source: resumeLink.querySelector('.continue-book-object') || resumeLink,
    };
  }
  const volume = target.closest?.('.volume');
  if (!volume) return null;
  return {
    kind: 'shelf',
    route: parseHash(volume.getAttribute('href') || ''),
    source: volume,
  };
}

function captureSource(event) {
  if (event.button != null && event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  if (reducedMotionPreferred()) return;
  const descriptor = sourceDescriptor(event.target);
  if (!descriptor?.route?.slug || !descriptor.source) return;
  const rect = descriptor.source.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return;
  cleanupPending();

  const clone = descriptor.source.cloneNode(true);
  removeIds(clone);
  clone.classList.add('book-handoff-clone', `book-handoff-${descriptor.kind}`);
  clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll?.('a, button, input, textarea, select, [tabindex]').forEach((node) => {
    node.setAttribute('tabindex', '-1');
  });
  Object.assign(clone.style, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  });
  document.body.appendChild(clone);
  pending = {
    ...descriptor,
    clone,
    sourceRect: rect,
  };
  cleanupTimer = window.setTimeout(cleanupPending, 2800);
}

function destinationFor(kind) {
  if (kind === 'shelf') return document.getElementById('coverPage');
  const paged = document.documentElement.dataset.readerMode !== 'scroll';
  if (paged) {
    const pages = document.getElementById('pagesWrapper');
    if (pages?.getBoundingClientRect().width > 20) return pages;
  }
  return document.getElementById('bookStage');
}

function syncCoverMaterial() {
  const page = document.getElementById('coverPage');
  const face = document.getElementById('coverFront');
  if (!page || !face) return;
  const cloth = face.style.getPropertyValue('--cloth').trim();
  if (cloth) page.style.setProperty('--book-handoff-cloth', cloth);
}

async function finishAnimation(clone, kind) {
  if (pending?.clone !== clone) return;
  if (kind !== 'shelf' || typeof clone.animate !== 'function') {
    cleanupPending();
    return;
  }

  document.body.classList.add('book-handoff-cover-reveal');
  document.body.classList.remove('book-handoff-cover-arriving');
  const fade = clone.animate(
    [{ opacity: 0.94 }, { opacity: 0 }],
    { duration: 240, easing: 'ease-out', fill: 'forwards' }
  );
  await fade.finished.catch(() => {});
  if (pending?.clone === clone) cleanupPending();
}

async function settlePending() {
  if (!pending) return;
  const stage = document.body.dataset.stage;
  if (pending.kind === 'shelf' && stage !== 'cover') return;
  if (pending.kind === 'resume' && stage !== 'read') return;
  const route = parseHash(window.location.hash || '');
  if (route.slug && route.slug !== pending.route.slug) {
    cleanupPending();
    return;
  }

  const target = destinationFor(pending.kind);
  if (!target) return;
  document.body.classList.add(
    pending.kind === 'shelf' ? 'book-handoff-cover-arriving' : 'book-handoff-resume-arriving'
  );
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  if (!pending || !target.isConnected) return;
  const targetRect = target.getBoundingClientRect();
  if (targetRect.width < 20 || targetRect.height < 20) {
    cleanupPending();
    return;
  }

  const clone = pending.clone;
  if (typeof clone.animate !== 'function') {
    cleanupPending();
    return;
  }
  const kind = pending.kind;
  const frames = handoffFrames(pending.sourceRect, targetRect, kind);
  const animation = clone.animate(frames, {
    duration: kind === 'shelf' ? 430 : 360,
    easing: 'cubic-bezier(.2,.82,.24,1)',
    fill: 'forwards',
  });
  animation.finished.catch(() => {}).then(() => finishAnimation(clone, kind));
}

function installCoverDockHierarchy() {
  const dock = document.getElementById('coverDock');
  if (!dock || dock.dataset.bookHandoffReady === 'true') return;
  dock.dataset.bookHandoffReady = 'true';

  const details = document.createElement('details');
  details.className = 'cover-more';
  const summary = document.createElement('summary');
  summary.textContent = 'More';
  summary.setAttribute('aria-label', 'More book actions');
  const menu = document.createElement('div');
  menu.className = 'cover-more-menu';
  menu.setAttribute('role', 'group');
  menu.setAttribute('aria-label', 'Book actions');

  COVER_MORE_ACTION_IDS.forEach((id) => {
    const control = document.getElementById(id);
    if (control) menu.appendChild(control);
  });
  details.append(summary, menu);
  dock.appendChild(details);

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a,button')) queueMicrotask(() => { details.open = false; });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && details.open) details.open = false;
  });
  const observer = new MutationObserver(() => {
    if (document.body.dataset.stage !== 'cover') details.open = false;
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
}

async function initialize() {
  const ready = await ensureStyles();
  if (!ready) return;
  document.documentElement.dataset.bookOpeningHandoff = 'true';
  installCoverDockHierarchy();
  syncCoverMaterial();
  document.addEventListener('click', captureSource, true);
  const stageObserver = new MutationObserver(() => {
    syncCoverMaterial();
    void settlePending();
  });
  stageObserver.observe(document.body, { attributes: true, attributeFilter: ['data-stage'] });
  window.addEventListener('popstate', cleanupPending);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
}
