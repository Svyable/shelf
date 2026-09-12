const STORAGE_PREFIX = 'svs';
const VALID_SORTS = new Set(['title', 'updated', 'last-read']);
let lastReadActive = false;
let sortFrame = 0;
let restoreComplete = false;

function $(id) {
  return document.getElementById(id);
}

function normalizeSort(value) {
  return VALID_SORTS.has(value) ? value : 'title';
}

function sortPreferenceKey() {
  return `${STORAGE_PREFIX}:library-sort`;
}

function loadSortPreference() {
  try {
    return normalizeSort(localStorage.getItem(sortPreferenceKey()));
  } catch {
    return 'title';
  }
}

function saveSortPreference(mode) {
  try {
    localStorage.setItem(sortPreferenceKey(), normalizeSort(mode));
  } catch {
    // Sorting remains usable when browser storage is unavailable.
  }
}

function volumeSlug(href = '') {
  const match = String(href).match(/#\/b\/([^/]+)\//);
  if (!match) return '';
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function progressSavedAt(slug) {
  if (!slug) return 0;
  try {
    const progress = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}:${slug}:progress`) || 'null');
    return Number(progress?.savedAt) || 0;
  } catch {
    return 0;
  }
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
  if (!lastReadActive || document.body.dataset.stage !== 'library') return;
  const shelf = $('shelf');
  const stacks = $('stacks');
  if (!shelf || !stacks) return;

  const rows = currentVolumes().map((volume) => ({
    volume,
    title: volume.querySelector('.volume-title')?.textContent?.trim() || 'Publication',
    lastReadAt: progressSavedAt(volumeSlug(volume.getAttribute('href') || '')),
  }));
  if (!rows.length) return;

  rows.sort((a, b) => {
    if (a.lastReadAt !== b.lastReadAt) return b.lastReadAt - a.lastReadAt;
    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
  });

  const current = [...shelf.querySelectorAll(':scope > .volume')];
  const alreadyFlat = !stacks.querySelector('.volume') && current.length === rows.length;
  const alreadyOrdered = alreadyFlat && current.every((volume, index) => volume === rows[index].volume);
  if (alreadyOrdered) return;

  const fragment = document.createDocumentFragment();
  rows.forEach(({ volume }) => fragment.appendChild(volume));
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

function selectCoreSort(mode, { persist = true } = {}) {
  lastReadActive = false;
  restoreComplete = true;
  if (persist) saveSortPreference(mode);
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
    selectCoreSort(core.dataset.sort === 'recent' ? 'updated' : 'title');
  });
}

function initialize() {
  installSortControl();
  const library = $('libraryView');
  if (library) {
    new MutationObserver(() => {
      restoreSortPreference();
      if (lastReadActive) {
        syncControls();
        scheduleLastReadSort();
      }
    }).observe(library, { childList: true, subtree: true });
  }
  restoreSortPreference();
  syncControls();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
