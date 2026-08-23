import('./navigation.js').catch((error) => {
  console.warn('Navigation enhancements could not be loaded', error);
});

const ATMOSPHERE_LIBRARY_CSS = 'css/atmosphere-library.css?v=r1';
const GROUPS = ['Light', 'Warm', 'Night', 'Accessibility'];
const THEMES = [
  { id: 'light', name: 'Paper', note: 'Neutral & bright', group: 'Light', page: '#F7F3EC', ink: '#2B2621', accent: '#8F623A' },
  { id: 'linen', name: 'Linen', note: 'Cool & quiet', group: 'Light', page: '#EEF1EC', ink: '#253029', accent: '#4F725D' },
  { id: 'porcelain', name: 'Porcelain', note: 'Crisp & clean', group: 'Light', page: '#FCFCFA', ink: '#252525', accent: '#566B87' },
  { id: 'sage', name: 'Sage', note: 'Restful green', group: 'Light', page: '#EDF1E6', ink: '#273026', accent: '#55705A' },
  { id: 'lavender', name: 'Lavender', note: 'Soft lilac', group: 'Light', page: '#EEE9F2', ink: '#2E2933', accent: '#756389' },
  { id: 'ivory', name: 'Ivory', note: 'Soft cream', group: 'Warm', page: '#F2EBDD', ink: '#2D261F', accent: '#845B35' },
  { id: 'sepia', name: 'Parchment', note: 'Warm & literary', group: 'Warm', page: '#EADBC0', ink: '#33281E', accent: '#80522F' },
  { id: 'rose', name: 'Rose Paper', note: 'Gentle blush', group: 'Warm', page: '#F3E7E3', ink: '#322827', accent: '#8A5753' },
  { id: 'sand', name: 'Sand', note: 'Sun-warmed beige', group: 'Warm', page: '#EFE2CB', ink: '#31281E', accent: '#7A542F' },
  { id: 'dark', name: 'Ink', note: 'Warm black', group: 'Night', page: '#181512', ink: '#EEE5D8', accent: '#D29A55' },
  { id: 'slate', name: 'Slate', note: 'Cool charcoal', group: 'Night', page: '#1A1E24', ink: '#E9EDF3', accent: '#8FB2DB' },
  { id: 'midnight', name: 'Midnight', note: 'Blue-black', group: 'Night', page: '#11151C', ink: '#E8ECF4', accent: '#8FA8D2' },
  { id: 'forest', name: 'Forest', note: 'Green-black', group: 'Night', page: '#151B17', ink: '#E3EAE2', accent: '#87A88B' },
  { id: 'ember', name: 'Ember', note: 'Brown-black glow', group: 'Night', page: '#1B1511', ink: '#F0E2D5', accent: '#D18A4A' },
  { id: 'deep-sea', name: 'Deep Sea', note: 'Teal-black', group: 'Night', page: '#10191B', ink: '#E2ECEC', accent: '#6FA8AE' },
  { id: 'aubergine', name: 'Aubergine', note: 'Plum-black', group: 'Night', page: '#19131A', ink: '#EDE3EE', accent: '#AD86B1' },
  { id: 'contrast', name: 'High Contrast', note: 'Maximum clarity', group: 'Accessibility', page: '#FFFFFF', ink: '#111111', accent: '#005FCC' },
  { id: 'contrast-dark', name: 'High Contrast Dark', note: 'Maximum night clarity', group: 'Accessibility', page: '#0B0B0B', ink: '#F7F7F7', accent: '#69A7FF' },
];

const WARMTHS = [
  { id: 'off', name: 'Off', note: 'True palette' },
  { id: 'soft', name: 'Soft', note: 'Gentle warmth' },
  { id: 'golden', name: 'Golden', note: 'Evening light' },
];

let warmthInitialized = false;
let currentWarmth = 'off';
let overlayObserver = null;
let favoriteThemes = new Set();
let activeFilter = 'all';

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'obb';
}

function warmthKey() {
  return `${storagePrefix()}:reader-warmth`;
}

function appearancePresetKey() {
  return `${storagePrefix()}:reader-experience:appearance-preset`;
}

function favoritesKey() {
  return `${storagePrefix()}:reader-atmosphere:favorites`;
}

function installLibraryStyles() {
  if (document.querySelector(`link[href="${ATMOSPHERE_LIBRARY_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = ATMOSPHERE_LIBRARY_CSS;
  document.head.appendChild(link);
}

function loadWarmth() {
  try {
    const value = localStorage.getItem(warmthKey());
    return WARMTHS.some((item) => item.id === value) ? value : null;
  } catch {
    return null;
  }
}

function saveWarmth(value) {
  try {
    localStorage.setItem(warmthKey(), value);
  } catch {
    // Appearance still works when storage is unavailable.
  }
}

function loadFavorites() {
  try {
    const raw = JSON.parse(localStorage.getItem(favoritesKey()) || '[]');
    if (!Array.isArray(raw)) return new Set();
    const valid = raw.filter((id) => THEMES.some((theme) => theme.id === id));
    return new Set(valid);
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(favoritesKey(), JSON.stringify([...favoriteThemes]));
  } catch {
    // Favorites are an enhancement; theme selection still works without storage.
  }
}

function themeMarkup(theme, { favoriteClone = false } = {}) {
  const favoriteAttr = favoriteClone ? ` data-favorite-theme="${theme.id}"${favoriteThemes.has(theme.id) ? '' : ' hidden'}` : '';
  return `
    <button
      type="button"
      class="atmosphere-option"
      data-paper="${theme.id}"
      aria-pressed="false"
      aria-label="${theme.name}: ${theme.note}"
      style="--swatch-page:${theme.page};--swatch-ink:${theme.ink};--swatch-accent:${theme.accent}"${favoriteAttr}
    >
      <span class="atmosphere-swatch" aria-hidden="true">
        <i></i><b></b><em></em>
      </span>
      <span class="atmosphere-copy"><strong>${theme.name}</strong><small>${theme.note}</small></span>
    </button>`;
}

function groupMarkup(group) {
  return `
    <div class="atmosphere-group" data-atmosphere-group="${group.toLowerCase()}">
      <p class="atmosphere-group-label">${group}</p>
      <div class="atmosphere-options">
        ${THEMES.filter((theme) => theme.group === group).map((theme) => themeMarkup(theme)).join('')}
      </div>
    </div>`;
}

function favoritesMarkup() {
  return `
    <div class="atmosphere-group atmosphere-favorites" id="atmosphereFavorites"${favoriteThemes.size ? '' : ' hidden'}>
      <p class="atmosphere-group-label">Favorites</p>
      <div class="atmosphere-options">
        ${THEMES.map((theme) => themeMarkup(theme, { favoriteClone: true })).join('')}
      </div>
    </div>`;
}

function filterMarkup() {
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'light', name: 'Light' },
    { id: 'warm', name: 'Warm' },
    { id: 'night', name: 'Night' },
    { id: 'accessibility', name: 'Access' },
  ];
  return `
    <div class="atmosphere-filter-row" role="group" aria-label="Atmosphere categories">
      ${filters.map((filter) => `<button type="button" class="atmosphere-filter${filter.id === 'all' ? ' active' : ''}" data-atmosphere-filter="${filter.id}" aria-pressed="${filter.id === 'all'}">${filter.name}</button>`).join('')}
    </div>`;
}

function warmthMarkup(item) {
  return `
    <button type="button" class="atmosphere-warmth" data-reader-warmth="${item.id}" aria-pressed="false">
      <span class="warmth-orb" aria-hidden="true"></span>
      <span><strong>${item.name}</strong><small>${item.note}</small></span>
    </button>`;
}

function panelMarkup() {
  return `
    <section class="atmosphere-panel" id="readerAtmosphere" data-filter="all" aria-labelledby="readerAtmosphereTitle">
      <div class="atmosphere-head">
        <div>
          <p class="atmosphere-eyebrow">Atmosphere</p>
          <h4 id="readerAtmosphereTitle">Choose your reading room</h4>
        </div>
        <div class="atmosphere-head-actions">
          <button class="atmosphere-favorite-toggle" id="atmosphereFavorite" type="button" aria-pressed="false" aria-label="Add current atmosphere to favorites" title="Favorite current atmosphere">☆</button>
          <span class="atmosphere-current" id="atmosphereCurrent">Ink</span>
        </div>
      </div>
      <p class="atmosphere-lede">Eighteen coordinated palettes shift page, ink, chrome, accents, shadows, and ambient glow together.</p>
      ${filterMarkup()}
      <div class="atmosphere-groups">
        ${favoritesMarkup()}
        ${GROUPS.map(groupMarkup).join('')}
      </div>
      <div class="atmosphere-divider"></div>
      <div class="atmosphere-warmth-head">
        <span>Warm light</span>
        <small>Optional evening tint</small>
      </div>
      <div class="atmosphere-warmth-row" role="group" aria-label="Warm light intensity">
        ${WARMTHS.map(warmthMarkup).join('')}
      </div>
    </section>`;
}

function installPicker() {
  const card = document.querySelector('#settingsPanel .settings-card');
  if (!card || document.getElementById('readerAtmosphere')) return;

  if (!document.getElementById('atmosphereCompatibilityStyles')) {
    const style = document.createElement('style');
    style.id = 'atmosphereCompatibilityStyles';
    style.textContent = '.atmosphere-option[data-paper]::before{content:none!important;display:none!important}';
    document.head.appendChild(style);
  }

  const rows = [...card.querySelectorAll('.setting-row')];
  const paperRow = rows.find((row) => row.querySelector(':scope > span')?.textContent?.trim() === 'Paper');
  const lampRow = rows.find((row) => row.querySelector(':scope > span')?.textContent?.trim() === 'Lamp');
  if (!paperRow) return;

  paperRow.insertAdjacentHTML('beforebegin', panelMarkup());

  paperRow.classList.add('atmosphere-legacy-hidden');
  lampRow?.classList.add('atmosphere-legacy-hidden');
  paperRow.querySelector(':scope > span')?.replaceChildren(document.createTextNode('Legacy paper'));
  lampRow?.querySelector(':scope > span')?.replaceChildren(document.createTextNode('Legacy lamp'));
  paperRow.querySelectorAll('[data-paper]').forEach((button) => button.removeAttribute('data-paper'));

  document.querySelectorAll('[data-reader-warmth]').forEach((button) => {
    button.addEventListener('click', () => setWarmth(button.dataset.readerWarmth, { persist: true, syncLegacy: true }));
  });
  document.querySelectorAll('[data-atmosphere-filter]').forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.atmosphereFilter));
  });
  document.getElementById('atmosphereFavorite')?.addEventListener('click', toggleCurrentFavorite);

  syncThemeUi();
  syncFavoriteUi();
}

function currentTheme() {
  const id = document.documentElement.dataset.theme || 'dark';
  return THEMES.find((item) => item.id === id) || THEMES.find((item) => item.id === 'dark');
}

function syncThemeUi() {
  const theme = document.documentElement.dataset.theme || 'dark';
  const current = currentTheme();
  document.querySelectorAll('.atmosphere-option[data-paper]').forEach((button) => {
    const active = button.dataset.paper === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const label = document.getElementById('atmosphereCurrent');
  if (label && current) label.textContent = current.name;
  syncFavoriteUi();
  requestAnimationFrame(updateBrowserThemeColor);
}

function setFilter(value) {
  activeFilter = ['all', 'light', 'warm', 'night', 'accessibility'].includes(value) ? value : 'all';
  const panel = document.getElementById('readerAtmosphere');
  if (panel) panel.dataset.filter = activeFilter;
  document.querySelectorAll('[data-atmosphere-filter]').forEach((button) => {
    const active = button.dataset.atmosphereFilter === activeFilter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function syncFavoriteUi() {
  const theme = currentTheme();
  const group = document.getElementById('atmosphereFavorites');
  document.querySelectorAll('[data-favorite-theme]').forEach((button) => {
    button.hidden = !favoriteThemes.has(button.dataset.favoriteTheme);
  });
  if (group) group.hidden = favoriteThemes.size === 0;

  const toggle = document.getElementById('atmosphereFavorite');
  if (!toggle || !theme) return;
  const favorite = favoriteThemes.has(theme.id);
  toggle.classList.toggle('active', favorite);
  toggle.setAttribute('aria-pressed', String(favorite));
  toggle.setAttribute('aria-label', `${favorite ? 'Remove' : 'Add'} ${theme.name} ${favorite ? 'from' : 'to'} favorites`);
  toggle.title = favorite ? 'Remove current atmosphere from favorites' : 'Favorite current atmosphere';
  toggle.textContent = favorite ? '★' : '☆';
}

function toggleCurrentFavorite() {
  const theme = currentTheme();
  if (!theme) return;
  if (favoriteThemes.has(theme.id)) favoriteThemes.delete(theme.id);
  else favoriteThemes.add(theme.id);
  saveFavorites();
  syncFavoriteUi();
}

function updateBrowserThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  const color = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
  if (color) meta.setAttribute('content', color);
}

function warmthExists(value) {
  return WARMTHS.some((item) => item.id === value);
}

function systemThemeId() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function syncLegacyLamp(active) {
  const button = document.getElementById('nightLightBtn');
  if (!button) return;
  const legacyOn = button.classList.contains('active');
  if (legacyOn !== active) button.click();
}

function setWarmth(value, { persist = false, syncLegacy = false } = {}) {
  currentWarmth = warmthExists(value) ? value : 'off';
  const root = document.documentElement;
  root.dataset.readerWarmth = currentWarmth;

  const active = currentWarmth !== 'off';
  if (syncLegacy) syncLegacyLamp(active);
  document.getElementById('nightLightOverlay')?.classList.toggle('active', active);
  document.getElementById('lampPool')?.classList.toggle('active', active);

  document.querySelectorAll('[data-reader-warmth]').forEach((button) => {
    const selected = button.dataset.readerWarmth === currentWarmth;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  if (persist) saveWarmth(currentWarmth);
}

function keepWarmthApplied() {
  if (currentWarmth === 'off') return;
  const overlay = document.getElementById('nightLightOverlay');
  const lamp = document.getElementById('lampPool');
  if (!overlay?.classList.contains('active') || !lamp?.classList.contains('active')) {
    queueMicrotask(() => setWarmth(currentWarmth));
  }
}

function initializeWarmth() {
  if (warmthInitialized) return;
  warmthInitialized = true;
  const legacyOn = document.getElementById('nightLightBtn')?.classList.contains('active');
  currentWarmth = loadWarmth() || (legacyOn ? 'golden' : 'off');
  setWarmth(currentWarmth, { syncLegacy: true });

  const overlay = document.getElementById('nightLightOverlay');
  const lamp = document.getElementById('lampPool');
  if (overlay && lamp) {
    overlayObserver = new MutationObserver(keepWarmthApplied);
    overlayObserver.observe(overlay, { attributes: true, attributeFilter: ['class'] });
    overlayObserver.observe(lamp, { attributes: true, attributeFilter: ['class'] });
  }
}

function saveAppearancePreset() {
  try {
    localStorage.setItem(appearancePresetKey(), JSON.stringify({
      theme: document.documentElement.dataset.theme || 'dark',
      warmth: currentWarmth,
    }));
  } catch {
    // Typography preset still saves if this supplementary snapshot cannot.
  }
}

function applyAppearancePreset() {
  try {
    const raw = localStorage.getItem(appearancePresetKey());
    if (!raw) return;
    const saved = JSON.parse(raw);
    const themeButton = document.querySelector(`.atmosphere-group:not(.atmosphere-favorites) .atmosphere-option[data-paper="${CSS.escape(saved.theme || '')}"]`);
    themeButton?.click();
    if (warmthExists(saved.warmth)) setWarmth(saved.warmth, { persist: true, syncLegacy: true });
  } catch {
    // Keep the typography preset usable even if this snapshot is malformed.
  }
}

function resetAppearance() {
  const theme = systemThemeId();
  document.querySelector(`.atmosphere-group:not(.atmosphere-favorites) .atmosphere-option[data-paper="${theme}"]`)?.click();
  setWarmth('off', { persist: true, syncLegacy: true });
  setFilter('all');
}

function bindPresetBridge() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#readerReset')) {
      window.setTimeout(resetAppearance, 0);
      return;
    }
    if (event.target.closest('#readerSavePreset')) {
      saveAppearancePreset();
      return;
    }
    if (event.target.closest('[data-reader-preset="mine"]')) {
      window.setTimeout(applyAppearancePreset, 0);
    }
  }, true);
}

function watchTheme() {
  const root = document.documentElement;
  const observer = new MutationObserver((records) => {
    if (records.some((record) => record.attributeName === 'data-theme')) {
      syncThemeUi();
      initializeWarmth();
    }
  });
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (root.dataset.theme) initializeWarmth();
}

installLibraryStyles();
favoriteThemes = loadFavorites();
installPicker();
bindPresetBridge();
watchTheme();
window.addEventListener('load', syncThemeUi, { once: true });
