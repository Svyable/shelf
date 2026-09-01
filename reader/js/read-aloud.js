import {
  canAdvancePaged,
  chunkSpeechText,
  clampSpeechRate,
  nextSpeechRate,
  readAloudAvailability,
  visibleBlockIndex,
} from './read-aloud-model.js';

const STORAGE_KEY = `${window.__IMPRINT?.storagePrefix || 'obb'}:read-aloud`;
const SYNTH = window.speechSynthesis;
const supported = typeof window.SpeechSynthesisUtterance === 'function' && !!SYNTH;

let state = {
  active: false,
  paused: false,
  selectedOnly: false,
  rate: loadRate(),
  queue: [],
  queueIndex: 0,
  unit: null,
  advancing: false,
  generation: 0,
};

function loadRate() {
  try {
    return clampSpeechRate(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').rate);
  } catch {
    return 1;
  }
}

function saveRate() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ rate: state.rate }));
  } catch {
    // Speech still works when storage is unavailable.
  }
}

function overlaysOpen() {
  return !!document.querySelector(
    '.toc-overlay.active, .stats-overlay.active, .search-overlay.active, #noteDialog.active'
  );
}

function mode() {
  return document.documentElement.dataset.readerMode === 'scroll' ? 'scroll' : 'paged';
}

function availability() {
  return readAloudAvailability({
    supported,
    stage: document.body?.dataset.stage,
    overlayOpen: overlaysOpen(),
  });
}

function normalizedSelection() {
  const selection = window.getSelection?.();
  if (!selection || selection.isCollapsed) return '';
  const anchor = selection.anchorNode?.nodeType === Node.ELEMENT_NODE
    ? selection.anchorNode
    : selection.anchorNode?.parentElement;
  if (!anchor?.closest?.('.page-inner, .scroll-block')) return '';
  return String(selection.toString() || '').trim();
}

function pageUnits() {
  return [...document.querySelectorAll('.page-surface.active .page-inner')]
    .filter((el) => !el.closest('.measure') && el.offsetParent !== null)
    .map((el) => ({
      kind: 'page',
      key: `${el.closest('.page-surface')?.id || 'page'}:${document.getElementById('currentPage')?.textContent || ''}`,
      el,
      text: el.innerText,
    }))
    .filter((unit) => unit.text.trim());
}

function scrollUnits() {
  const reader = document.getElementById('scrollReader');
  const blocks = [...document.querySelectorAll('#scrollDocument .scroll-block')];
  if (!reader || !blocks.length) return [];
  const readerRect = reader.getBoundingClientRect();
  const rects = blocks.map((block) => block.getBoundingClientRect());
  const index = visibleBlockIndex(rects, readerRect.top, reader.clientHeight);
  const start = Math.max(0, index);
  return blocks.slice(start).map((el) => ({
    kind: 'scroll',
    key: `${el.dataset.chapter || ''}:${el.dataset.offset || '0'}`,
    el,
    text: el.innerText,
  })).filter((unit) => unit.text.trim());
}

function visibleUnits() {
  const selected = normalizedSelection();
  if (selected) {
    return [{ kind: 'selection', key: `selection:${selected.slice(0, 32)}`, el: null, text: selected }];
  }
  return mode() === 'scroll' ? scrollUnits().slice(0, 1) : pageUnits();
}

function status(message) {
  const live = document.getElementById('readAloudLive');
  if (live) live.textContent = message;
}

function render() {
  const panel = document.getElementById('readAloudBar');
  const launch = document.getElementById('readAloudBtn');
  const toggle = document.getElementById('readAloudToggle');
  const rate = document.getElementById('readAloudRate');
  const stopButton = document.getElementById('readAloudStop');
  const ready = availability() === 'ready';

  if (launch) {
    launch.disabled = !supported;
    launch.setAttribute('aria-pressed', String(state.active));
    launch.textContent = state.active ? 'Reading aloud' : 'Read aloud';
    launch.title = supported ? 'Read the current passage aloud' : 'Read aloud is not supported by this browser';
  }
  if (panel) panel.hidden = !state.active || document.body?.dataset.stage !== 'read';
  if (toggle) {
    toggle.disabled = !ready && !state.paused;
    toggle.textContent = state.paused ? 'Resume' : 'Pause';
    toggle.setAttribute('aria-label', state.paused ? 'Resume read aloud' : 'Pause read aloud');
  }
  if (rate) rate.textContent = `${state.rate.toFixed(1)}×`;
  if (stopButton) stopButton.disabled = !state.active;
  document.body?.toggleAttribute('data-read-aloud', state.active);
}

function cancelSpeech() {
  state.generation += 1;
  SYNTH?.cancel();
}

function stop({ announce = true } = {}) {
  cancelSpeech();
  state.active = false;
  state.paused = false;
  state.selectedOnly = false;
  state.queue = [];
  state.queueIndex = 0;
  state.unit = null;
  if (announce) status('Read aloud stopped');
  render();
}

function buildQueue(unit) {
  state.unit = unit;
  state.queue = chunkSpeechText(unit?.text || '');
  state.queueIndex = 0;
}

function speakNext() {
  if (!state.active || state.paused || availability() !== 'ready') return;
  const text = state.queue[state.queueIndex];
  if (!text) {
    advanceUnit();
    return;
  }
  const generation = state.generation;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = state.rate;
  utterance.onend = () => {
    if (!state.active || generation !== state.generation) return;
    state.queueIndex += 1;
    speakNext();
  };
  utterance.onerror = (event) => {
    if (event.error === 'canceled' || event.error === 'interrupted') return;
    status('Read aloud could not continue');
    stop({ announce: false });
  };
  SYNTH.speak(utterance);
}

function beginUnit(unit, { announce = false } = {}) {
  if (!unit) {
    stop({ announce: false });
    status('No readable text in this passage');
    return;
  }
  buildQueue(unit);
  if (!state.queue.length) {
    advanceUnit();
    return;
  }
  if (announce) status(state.selectedOnly ? 'Reading selected text' : 'Read aloud started');
  speakNext();
}

function pagedAdvance() {
  const current = document.getElementById('currentPage')?.textContent;
  const total = document.getElementById('totalPages')?.textContent;
  if (!canAdvancePaged(current, total)) return false;
  document.getElementById('nextBtn')?.click();
  return true;
}

function nextScrollUnit() {
  const current = state.unit?.el;
  if (!current) return null;
  let next = current.nextElementSibling;
  if (!next) {
    const section = current.closest('.scroll-chapter');
    next = section?.nextElementSibling?.querySelector?.('.scroll-block') || null;
  }
  if (!next?.classList?.contains('scroll-block')) return null;
  next.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
  return {
    kind: 'scroll',
    key: `${next.dataset.chapter || ''}:${next.dataset.offset || '0'}`,
    el: next,
    text: next.innerText,
  };
}

function nextVisiblePageUnit() {
  const units = pageUnits();
  const currentIndex = units.findIndex((unit) => unit.key === state.unit?.key);
  return currentIndex >= 0 ? units[currentIndex + 1] || null : null;
}

function advanceUnit() {
  if (!state.active) return;
  if (state.selectedOnly) {
    stop({ announce: false });
    status('Selected text finished');
    return;
  }

  if (mode() === 'scroll') {
    const next = nextScrollUnit();
    if (!next) {
      stop({ announce: false });
      status('End of publication');
      return;
    }
    beginUnit(next);
    return;
  }

  const secondPage = nextVisiblePageUnit();
  if (secondPage) {
    beginUnit(secondPage);
    return;
  }

  if (!pagedAdvance()) {
    stop({ announce: false });
    status('End of publication');
    return;
  }

  state.advancing = true;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    state.advancing = false;
    if (!state.active) return;
    beginUnit(pageUnits()[0]);
  }));
}

function start() {
  if (availability() !== 'ready') {
    status(supported ? 'Close Reader panels before starting read aloud' : 'Read aloud is unavailable in this browser');
    return;
  }
  cancelSpeech();
  const units = visibleUnits();
  state.active = true;
  state.paused = false;
  state.selectedOnly = units[0]?.kind === 'selection';
  render();
  beginUnit(units[0], { announce: true });
}

function pauseResume() {
  if (!state.active) return start();
  if (state.paused) {
    state.paused = false;
    SYNTH.resume();
    status('Read aloud resumed');
  } else {
    state.paused = true;
    SYNTH.pause();
    status('Read aloud paused');
  }
  render();
}

function changeRate(direction) {
  state.rate = nextSpeechRate(state.rate, direction);
  saveRate();
  if (state.active) {
    const unit = state.unit;
    const index = state.queueIndex;
    cancelSpeech();
    buildQueue(unit);
    state.queueIndex = Math.min(index, Math.max(0, state.queue.length - 1));
    if (!state.paused) speakNext();
    status(`Read aloud speed ${state.rate.toFixed(1)} times`);
  }
  render();
}

function ensureUi() {
  const actions = document.querySelector('#settingsPanel .setting-actions');
  if (actions && !document.getElementById('readAloudBtn')) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ghost-btn';
    button.id = 'readAloudBtn';
    button.textContent = 'Read aloud';
    button.addEventListener('click', () => {
      document.getElementById('settingsPanel')?.classList.remove('active');
      window.setTimeout(() => state.active ? pauseResume() : start(), 0);
    });
    actions.prepend(button);
  }

  if (!document.getElementById('readAloudBar')) {
    const bar = document.createElement('div');
    bar.id = 'readAloudBar';
    bar.className = 'read-aloud-bar';
    bar.hidden = true;
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Read aloud controls');
    bar.innerHTML = `
      <button type="button" class="read-aloud-control" id="readAloudToggle">Pause</button>
      <button type="button" class="read-aloud-control read-aloud-rate" id="readAloudRate" aria-label="Change read aloud speed">1.0×</button>
      <button type="button" class="read-aloud-control" id="readAloudStop">Stop</button>
      <span class="sr-only" id="readAloudLive" aria-live="polite"></span>`;
    document.body.appendChild(bar);
    document.getElementById('readAloudToggle')?.addEventListener('click', pauseResume);
    document.getElementById('readAloudRate')?.addEventListener('click', () => changeRate(1));
    document.getElementById('readAloudStop')?.addEventListener('click', () => stop());
  }

  if (!document.getElementById('readAloudStyle')) {
    const style = document.createElement('style');
    style.id = 'readAloudStyle';
    style.textContent = `
      .read-aloud-bar {
        position: fixed;
        z-index: 78;
        left: 50%;
        bottom: max(1rem, env(safe-area-inset-bottom));
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: .35rem;
        padding: .4rem;
        border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
        border-radius: 999px;
        background: color-mix(in srgb, var(--paper, #f4efe5) 94%, transparent);
        box-shadow: 0 .55rem 1.8rem rgba(0,0,0,.2);
        backdrop-filter: blur(14px);
      }
      .read-aloud-bar[hidden] { display: none !important; }
      .read-aloud-control {
        min-height: 2.5rem;
        min-width: 2.5rem;
        border: 0;
        border-radius: 999px;
        padding: .55rem .85rem;
        background: transparent;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      .read-aloud-control:hover,
      .read-aloud-control:focus-visible { background: color-mix(in srgb, currentColor 10%, transparent); }
      .read-aloud-rate { font-variant-numeric: tabular-nums; font-weight: 700; }
      body[data-read-aloud] .page-nav { padding-bottom: .2rem; }
      @media (max-width: 640px), (pointer: coarse) {
        .read-aloud-bar {
          bottom: max(.6rem, env(safe-area-inset-bottom));
          max-width: calc(100vw - 1rem - env(safe-area-inset-left) - env(safe-area-inset-right));
        }
        .read-aloud-control { min-height: 2.75rem; min-width: 2.75rem; }
      }
      @media (max-height: 430px) and (orientation: landscape) {
        .read-aloud-bar { left: auto; right: max(.6rem, env(safe-area-inset-right)); transform: none; }
      }
      @media (prefers-reduced-motion: reduce) {
        .read-aloud-bar { transition: none; }
      }
      @media (forced-colors: active) {
        .read-aloud-bar { background: Canvas; border: 1px solid CanvasText; box-shadow: none; backdrop-filter: none; }
        .read-aloud-control:focus-visible { outline: 2px solid Highlight; }
      }
    `;
    document.head.appendChild(style);
  }

  const help = document.querySelector('#helpOverlay .help-keys');
  if (help && !help.querySelector('[data-read-aloud-help]')) {
    const li = document.createElement('li');
    li.dataset.readAloudHelp = 'true';
    li.innerHTML = '<kbd>Alt</kbd> + <kbd>R</kbd> read aloud';
    help.appendChild(li);
  }
  render();
}

function onReaderMutation() {
  render();
  if (!state.active) return;
  if (document.body?.dataset.stage !== 'read') {
    stop({ announce: false });
    return;
  }
  if (overlaysOpen() && !state.paused) {
    state.paused = true;
    SYNTH.pause();
    status('Read aloud paused while Reader controls are open');
    render();
  }
}

function bind() {
  ensureUi();
  document.addEventListener('keydown', (event) => {
    if (!(event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 'r')) return;
    if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    event.preventDefault();
    state.active ? pauseResume() : start();
  }, true);

  window.addEventListener('pagehide', () => stop({ announce: false }));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.active && !state.paused) pauseResume();
  });
  window.addEventListener('hashchange', () => {
    if (!state.active || state.advancing || state.selectedOnly) return;
    cancelSpeech();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!state.active) return;
      beginUnit(visibleUnits()[0]);
    }));
  });

  const observer = new MutationObserver(onReaderMutation);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-stage'],
    subtree: true,
    childList: false,
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reader-mode'],
  });
  ['tocOverlay', 'progressPanel', 'settingsPanel', 'searchOverlay', 'noteDialog', 'helpOverlay'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el, { attributes: true, attributeFilter: ['class'] });
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true });
else bind();
