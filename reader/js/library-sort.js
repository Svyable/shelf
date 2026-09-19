import {
  normalizeLibrarySort,
  shelfIndexLetters,
  shelfLetter,
  sortByLastRead,
  volumeSlug,
} from './library-sort-model.js';

let lastReadActive = false;
let sortFrame = 0;
let restoreComplete = false;
let shelfIndexFrame = 0;
let shelfIndexPointerId = null;
let shelfIndexBubbleTimer = 0;
let shelfIndexHighlightTimer = 0;

function $(id) {
  return document.getElementById(id);
}

function libraryStage() {
  return document.body.dataset.stage === 'library';
}

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'bookself';
}

function sortPreferenceKey() {
  return `${storagePrefix()}:library-sort`;
}

function loadSortPreference() {
  try {
    return normalizeLibrarySort(localStorage.getItem(sortPreferenceKey()));
  } catch {
    return 'title';
  }
}

function saveSortPreference(mode) {
  try {
    localStorage.setItem(sortPreferenceKey(), normalizeLibrarySort(mode));
  } catch {
    // Preference persistence is optional; sorting itself must remain usable.
  }
}

function progressSavedAt(slug) {
  if (!slug) return 0;
  try {
    const progress = JSON.parse(localStorage.getItem(`${storagePrefix()}:${slug}:progress`) || 'null');
    return Number(progress?.savedAt) || 0;
  } catch {
    return 0;
  }
}

function volumeTitle(volume) {
  return volume.querySelector('.volume-title')?.textContent?.trim() || 'Publication';
}

function currentVolumes() {
  return [...document.querySelectorAll('#stacks .volume, #shelf .volume')];
}

function syncControls() {
  document.querySelectorAll('.library-bar [data-sort]').forEach((button) => {
    if (lastReadActive) button.classList.remove('active');
    button.setAttribute('aria-pressed', String(!lastReadActive && button.classList.contains('active')));
  });
  const lastRead = document.querySelector('[data-library-sort="last-read"]');
  if (lastRead) {
    lastRead.classList.toggle('active', lastReadActive);
    lastRead.setAttribute('aria-pressed', String(lastReadActive));
  }
}

function applyLastReadSort() {
  sortFrame = 0;
  if (!lastReadActive || !libraryStage()) return;
  const shelf = $('shelf');
  const stacks = $('stacks');
  if (!shelf || !stacks) return;

  const rows = currentVolumes().map((volume) => {
    const slug = volumeSlug(volume.getAttribute('href') || '');
    return {
      volume,
      title: volumeTitle(volume),
      lastReadAt: progressSavedAt(slug),
    };
  });
  if (!rows.length) return;

  const sorted = sortByLastRead(rows);
  const current = [...shelf.querySelectorAll(':scope > .volume')];
  const alreadyFlat = !stacks.querySelector('.volume') && current.length === sorted.length;
  const alreadyOrdered = alreadyFlat && current.every((volume, index) => volume === sorted[index].volume);
  if (alreadyOrdered) return;

  const fragment = document.createDocumentFragment();
  sorted.forEach(({ volume }) => fragment.appendChild(volume));
  stacks.replaceChildren();
  shelf.replaceChildren(fragment);
}

function scheduleLastReadSort() {
  if (!lastReadActive || sortFrame) return;
  sortFrame = requestAnimationFrame(applyLastReadSort);
}

function activateLastRead({ persist = true } = {}) {
  lastReadActive = true;
  restoreComplete = true;
  if (persist) saveSortPreference('last-read');
  syncControls();
  scheduleLastReadSort();
}

function deactivateLastRead(mode = null) {
  lastReadActive = false;
  restoreComplete = true;
  if (mode) saveSortPreference(mode);
  syncControls();
}

function restoreSortPreference() {
  if (restoreComplete || !currentVolumes().length) return;
  const mode = loadSortPreference();
  if (mode === 'last-read') {
    activateLastRead({ persist: false });
    return;
  }
  if (mode === 'updated') {
    const updated = document.querySelector('.library-bar [data-sort="recent"]');
    if (!updated) return;
    restoreComplete = true;
    updated.click();
    return;
  }
  restoreComplete = true;
  syncControls();
}

function installSortControl() {
  const group = document.querySelector('.library-bar .setting-pills');
  if (!group || group.querySelector('[data-library-sort="last-read"]')) return;

  group.setAttribute('aria-label', 'Sort publications');
  const recent = group.querySelector('[data-sort="recent"]');
  if (recent) {
    recent.textContent = 'Updated';
    recent.title = 'Sort by publication update date';
    recent.setAttribute('aria-label', 'Sort by publication update date');
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pill';
  button.dataset.librarySort = 'last-read';
  button.textContent = 'Last Read';
  button.title = 'Sort by your most recently read books';
  button.setAttribute('aria-label', 'Sort by your most recently read books');
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => activateLastRead());
  group.appendChild(button);

  group.addEventListener('click', (event) => {
    const core = event.target.closest('[data-sort]');
    if (!core) return;
    const mode = core.dataset.sort === 'recent' ? 'updated' : 'title';
    deactivateLastRead(mode);
  });
}

function injectShelfIndexStyles() {
  if ($('libraryShelfIndexStyles')) return;
  const style = document.createElement('style');
  style.id = 'libraryShelfIndexStyles';
  style.textContent = `
body[data-stage="library"] .compact-shelf-index {
  position: relative;
  display: flex;
  align-items: center;
  gap: .08rem;
  width: fit-content;
  max-width: 100%;
  margin: -.08rem 0 .5rem;
  padding: .12rem .18rem;
  border: 1px solid color-mix(in srgb, var(--border) 68%, transparent);
  border-radius: 999px;
  overflow-x: auto;
  scrollbar-width: none;
  background: color-mix(in srgb, var(--bg-secondary) 58%, transparent);
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}

body[data-stage="library"] .compact-shelf-index::-webkit-scrollbar {
  display: none;
}

body[data-stage="library"] .compact-shelf-index[hidden] {
  display: none;
}

body[data-stage="library"] .compact-shelf-index-button {
  display: inline-grid;
  place-items: center;
  flex: 0 0 1.42rem;
  width: 1.42rem;
  height: 1.62rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-ui);
  font-size: .62rem;
  font-weight: 720;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

body[data-stage="library"] .compact-shelf-index-button:hover,
body[data-stage="library"] .compact-shelf-index-button:focus-visible,
body[data-stage="library"] .compact-shelf-index-button.is-scrubbing {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent) 18%, var(--bg-elevated));
  outline: none;
}

body[data-stage="library"] .compact-shelf-index-button:focus-visible {
  box-shadow: 0 0 0 1px var(--accent);
}

body[data-stage="library"] .compact-shelf-index-bubble {
  position: fixed;
  z-index: 84;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid color-mix(in srgb, white 24%, var(--border));
  border-radius: 22px;
  background: color-mix(in srgb, var(--bg-elevated) 74%, transparent);
  color: var(--text-primary);
  box-shadow: 0 18px 46px rgba(0,0,0,.34), inset 0 1px rgba(255,255,255,.12);
  -webkit-backdrop-filter: blur(22px) saturate(1.3);
  backdrop-filter: blur(22px) saturate(1.3);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 650;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%) scale(.9);
  transition: opacity 90ms ease, transform 110ms ease;
}

body[data-stage="library"] .compact-shelf-index-bubble.visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

body[data-stage="library"] .compact-shelf-landmark {
  position: absolute;
  top: 11px;
  left: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  border-radius: 999px;
  background: rgba(0,0,0,.34);
  color: rgba(255,255,255,.95);
  font-family: var(--font-ui);
  font-size: .5rem;
  font-weight: 800;
  line-height: 1;
  transform: translateX(-50%);
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0,0,0,.22), inset 0 0 0 1px rgba(255,255,255,.18);
}

body[data-stage="library"] .compact-spine[data-shelf-letter-start] .compact-spine-title {
  max-height: calc(100% - 32px);
}

body[data-stage="library"] .compact-spine.is-index-target {
  z-index: 5;
  filter: brightness(1.14) saturate(1.06);
  transform: translateY(-6px) scale(1.12);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 72%, white), 3px 9px 18px rgba(0,0,0,.34);
}

@media (max-width: 760px) {
  body[data-stage="library"] .compact-shelf-index {
    width: 100%;
    justify-content: space-between;
    gap: 0;
    box-sizing: border-box;
  }

  body[data-stage="library"] .compact-shelf-index-button {
    flex: 1 1 0;
    min-width: .68rem;
    max-width: 1.3rem;
    height: 1.48rem;
    font-size: .54rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  body[data-stage="library"] .compact-shelf-index-bubble,
  body[data-stage="library"] .compact-spine.is-index-target {
    transition: none;
  }
}

@media (forced-colors: active) {
  body[data-stage="library"] .compact-shelf-index,
  body[data-stage="library"] .compact-shelf-index-button:focus-visible,
  body[data-stage="library"] .compact-shelf-index-bubble,
  body[data-stage="library"] .compact-shelf-landmark {
    border: 1px solid CanvasText;
  }
}
`;
  document.head.appendChild(style);
}

function injectShelfPolishStyles() {
  if ($('libraryShelfPolishStyles')) return;
  const style = document.createElement('style');
  style.id = 'libraryShelfPolishStyles';
  style.textContent = `
body[data-stage="library"] .compact-shelf-grid {
  border-color: color-mix(in srgb, var(--border) 82%, var(--text-primary) 5%);
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent calc(var(--compact-row) - 12px),
      color-mix(in srgb, var(--text-primary) 4%, transparent) calc(var(--compact-row) - 12px),
      color-mix(in srgb, var(--text-primary) 9%, var(--border)) calc(var(--compact-row) - 8px),
      color-mix(in srgb, var(--shadow) 44%, var(--border)) calc(var(--compact-row) - 5px),
      color-mix(in srgb, var(--shadow) 66%, transparent) var(--compact-row),
      color-mix(in srgb, var(--shadow) 24%, transparent) calc(var(--compact-row) + 6px),
      transparent calc(var(--compact-row) + 18px)
    ),
    radial-gradient(64rem 18rem at 50% 0%, color-mix(in srgb, var(--accent) 5%, transparent), transparent 72%),
    linear-gradient(180deg, color-mix(in srgb, var(--bg-secondary) 78%, transparent), color-mix(in srgb, var(--bg-primary) 92%, transparent));
  box-shadow:
    inset 0 18px 32px color-mix(in srgb, var(--shadow) 13%, transparent),
    inset 0 -12px 22px color-mix(in srgb, var(--shadow) 20%, transparent),
    0 12px 32px color-mix(in srgb, var(--shadow) 12%, transparent);
}

body[data-stage="library"] .compact-spine {
  background:
    linear-gradient(90deg, rgba(255,255,255,.16), transparent 17%, rgba(255,255,255,.035) 52%, transparent 76%, rgba(0,0,0,.22)),
    linear-gradient(180deg, rgba(255,255,255,.055), transparent 20%, rgba(0,0,0,.075)),
    var(--spine-cloth, #67584a);
  box-shadow:
    1px 3px 5px rgba(0,0,0,.28),
    inset 1px 0 rgba(255,255,255,.1),
    inset -1px 0 rgba(0,0,0,.12);
}

body[data-stage="library"] .library-spine-loupe {
  border-color: color-mix(in srgb, white 27%, var(--border));
  background: color-mix(in srgb, var(--bg-elevated) 68%, transparent);
  box-shadow: 0 20px 54px rgba(0,0,0,.4), inset 0 1px rgba(255,255,255,.16);
  -webkit-backdrop-filter: blur(26px) saturate(1.28);
  backdrop-filter: blur(26px) saturate(1.28);
}

@media (max-width: 760px) {
  body[data-stage="library"] .library-spine-loupe {
    top: calc(env(safe-area-inset-top) + 76px) !important;
    left: 50% !important;
    width: min(19rem, calc(100vw - 28px));
    min-height: 72px;
    padding: .82rem 1rem .78rem;
    border-radius: 24px;
    transform: translate(-50%, 0) scale(.94);
    transform-origin: 50% 0;
  }

  body[data-stage="library"] .library-spine-loupe.visible {
    transform: translate(-50%, 0) scale(1);
  }

  body[data-stage="library"] .library-spine-loupe-title {
    font-size: 1.2rem;
    line-height: 1.12;
  }

  body[data-stage="library"] .library-spine-loupe-meta {
    margin-top: .28rem;
    font-size: .8rem;
  }
}

@media (forced-colors: active) {
  body[data-stage="library"] .compact-shelf-grid,
  body[data-stage="library"] .compact-spine,
  body[data-stage="library"] .library-spine-loupe {
    background: Canvas;
    box-shadow: none;
  }
}
`;
  document.head.appendChild(style);
}

function shelfIndexElement(section) {
  let index = $('compactShelfIndex');
  if (index) return index;

  index = document.createElement('nav');
  index.id = 'compactShelfIndex';
  index.className = 'compact-shelf-index';
  index.setAttribute('aria-label', 'Jump through bookshelf by letter');

  const guide = section.querySelector('.compact-shelf-guide');
  if (guide) guide.insertAdjacentElement('afterend', index);
  else section.prepend(index);
  installShelfIndexGesture(index);
  return index;
}

function shelfIndexBubble() {
  let bubble = $('compactShelfIndexBubble');
  if (bubble) return bubble;
  bubble = document.createElement('div');
  bubble.id = 'compactShelfIndexBubble';
  bubble.className = 'compact-shelf-index-bubble';
  bubble.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bubble);
  return bubble;
}

function compactSpines() {
  const grid = $('compactShelfGrid');
  return grid ? [...grid.querySelectorAll(':scope > .compact-spine')] : [];
}

function clearShelfIndexFeedback() {
  document.querySelectorAll('.compact-shelf-index-button.is-scrubbing').forEach((button) => {
    button.classList.remove('is-scrubbing');
  });
  window.clearTimeout(shelfIndexBubbleTimer);
  shelfIndexBubbleTimer = window.setTimeout(() => {
    $('compactShelfIndexBubble')?.classList.remove('visible');
  }, 120);
}

function highlightShelfLetter(letter) {
  const target = compactSpines().find((spine) => spine.dataset.shelfLetterStart === letter);
  if (!target) return;
  document.querySelector('.compact-spine.is-index-target')?.classList.remove('is-index-target');
  target.classList.add('is-index-target');
  window.clearTimeout(shelfIndexHighlightTimer);
  shelfIndexHighlightTimer = window.setTimeout(() => target.classList.remove('is-index-target'), 520);
}

function jumpToShelfLetter(letter, { smooth = true } = {}) {
  const target = compactSpines().find((spine) => spine.dataset.shelfLetterStart === letter);
  if (!target) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({
    behavior: smooth && !reduced ? 'smooth' : 'auto',
    block: 'center',
    inline: 'nearest',
  });
  highlightShelfLetter(letter);
}

function activateShelfIndexButton(button, { smooth = false } = {}) {
  if (!button) return;
  const letter = button.dataset.shelfIndexLetter;
  if (!letter) return;
  document.querySelectorAll('.compact-shelf-index-button.is-scrubbing').forEach((other) => {
    other.classList.toggle('is-scrubbing', other === button);
  });
  const bubble = shelfIndexBubble();
  bubble.textContent = letter;
  bubble.classList.add('visible');
  jumpToShelfLetter(letter, { smooth });
}

function nearestShelfIndexButton(index, x) {
  const buttons = [...index.querySelectorAll('.compact-shelf-index-button')];
  let best = null;
  let distance = Infinity;
  for (const button of buttons) {
    const rect = button.getBoundingClientRect();
    const d = Math.abs(x - (rect.left + rect.width / 2));
    if (d < distance) {
      distance = d;
      best = button;
    }
  }
  return best;
}

function installShelfIndexGesture(index) {
  if (index.dataset.scrubReady === 'true') return;
  index.dataset.scrubReady = 'true';

  index.addEventListener('click', (event) => {
    const button = event.target.closest('.compact-shelf-index-button');
    if (!button) return;
    activateShelfIndexButton(button, { smooth: true });
    clearShelfIndexFeedback();
  });

  index.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    const button = event.target.closest('.compact-shelf-index-button');
    if (!button) return;
    shelfIndexPointerId = event.pointerId;
    index.setPointerCapture?.(event.pointerId);
    activateShelfIndexButton(button);
    if (event.pointerType !== 'mouse') event.preventDefault();
  });

  index.addEventListener('pointermove', (event) => {
    if (shelfIndexPointerId !== event.pointerId) return;
    const button = nearestShelfIndexButton(index, event.clientX);
    if (!button || button.classList.contains('is-scrubbing')) return;
    event.preventDefault();
    activateShelfIndexButton(button);
  });

  const finish = (event) => {
    if (event && shelfIndexPointerId !== event.pointerId) return;
    shelfIndexPointerId = null;
    clearShelfIndexFeedback();
  };
  index.addEventListener('pointerup', finish);
  index.addEventListener('pointercancel', finish);
  index.addEventListener('lostpointercapture', () => finish());
}

function syncShelfIndex() {
  shelfIndexFrame = 0;
  const section = $('compactShelf');
  const grid = $('compactShelfGrid');
  if (!section || !grid) return;

  const spines = compactSpines();
  if (!spines.length) return;
  const letters = shelfIndexLetters(spines.map((spine) => spine.dataset.title || ''));
  const fingerprint = spines
    .map((spine) => `${spine.getAttribute('href') || ''}\u0000${spine.dataset.title || ''}`)
    .join('\u0001');
  const index = shelfIndexElement(section);
  const landmarkCount = grid.querySelectorAll('.compact-shelf-landmark').length;
  if (index.dataset.fingerprint === fingerprint && landmarkCount === letters.length) {
    index.hidden = letters.length <= 1;
    return;
  }

  grid.querySelectorAll('.compact-shelf-landmark').forEach((landmark) => landmark.remove());
  spines.forEach((spine) => {
    delete spine.dataset.shelfLetter;
    delete spine.dataset.shelfLetterStart;
  });

  const seen = new Set();
  for (const spine of spines) {
    const letter = shelfLetter(spine.dataset.title || '');
    spine.dataset.shelfLetter = letter;
    if (seen.has(letter)) continue;
    seen.add(letter);
    spine.dataset.shelfLetterStart = letter;
    const landmark = document.createElement('span');
    landmark.className = 'compact-shelf-landmark';
    landmark.setAttribute('aria-hidden', 'true');
    landmark.textContent = letter;
    spine.appendChild(landmark);
  }

  index.replaceChildren();
  for (const letter of letters) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'compact-shelf-index-button';
    button.dataset.shelfIndexLetter = letter;
    button.textContent = letter;
    button.title = `Jump to ${letter}`;
    button.setAttribute('aria-label', letter === '#' ? 'Jump to numbers and symbols' : `Jump to titles beginning with ${letter}`);
    index.appendChild(button);
  }
  index.dataset.fingerprint = fingerprint;
  index.hidden = letters.length <= 1;
}

function scheduleShelfIndexSync() {
  if (shelfIndexFrame) return;
  shelfIndexFrame = requestAnimationFrame(syncShelfIndex);
}

function installObserver() {
  const library = $('libraryView');
  if (!library) return;
  const observer = new MutationObserver(() => {
    restoreSortPreference();
    scheduleShelfIndexSync();
    if (!lastReadActive) return;
    syncControls();
    scheduleLastReadSort();
  });
  observer.observe(library, { childList: true, subtree: true });
}

function initialize() {
  injectShelfIndexStyles();
  injectShelfPolishStyles();
  installSortControl();
  installObserver();
  restoreSortPreference();
  scheduleShelfIndexSync();
  syncControls();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
