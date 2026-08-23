import('./navigation.js').catch((error) => {
  console.warn('Navigation enhancements could not be loaded', error);
});

const THEMES = [
  { id: 'light', name: 'Paper', note: 'Neutral & bright', group: 'Day', page: '#F7F3EC', ink: '#2B2621', accent: '#8F623A' },
  { id: 'linen', name: 'Linen', note: 'Cool & quiet', group: 'Day', page: '#EEF1EC', ink: '#253029', accent: '#4F725D' },
  { id: 'ivory', name: 'Ivory', note: 'Soft cream', group: 'Warm', page: '#F2EBDD', ink: '#2D261F', accent: '#845B35' },
  { id: 'sepia', name: 'Parchment', note: 'Warm & literary', group: 'Warm', page: '#EADBC0', ink: '#33281E', accent: '#80522F' },
  { id: 'rose', name: 'Rose Paper', note: 'Gentle blush', group: 'Warm', page: '#F3E7E3', ink: '#322827', accent: '#8A5753' },
  { id: 'dark', name: 'Ink', note: 'Warm black', group: 'Night', page: '#181512', ink: '#EEE5D8', accent: '#D29A55' },
  { id: 'slate', name: 'Slate', note: 'Cool charcoal', group: 'Night', page: '#1A1E24', ink: '#E9EDF3', accent: '#8FB2DB' },
  { id: 'midnight', name: 'Midnight', note: 'Blue-black', group: 'Night', page: '#11151C', ink: '#E8ECF4', accent: '#8FA8D2' },
  { id: 'forest', name: 'Forest', note: 'Green-black', group: 'Night', page: '#151B17', ink: '#E3EAE2', accent: '#87A88B' },
  { id: 'contrast', name: 'High Contrast', note: 'Maximum clarity', group: 'Accessibility', page: '#FFFFFF', ink: '#111111', accent: '#005FCC' },
];

const WARMTHS = [
  { id: 'off', name: 'Off', note: 'True palette' },
  { id: 'soft', name: 'Soft', note: 'Gentle warmth' },
  { id: 'golden', name: 'Golden', note: 'Evening light' },
];

let warmthInitialized = false;
let currentWarmth = 'off';
let overlayObserver = null;

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'obb';
}

function warmthKey() {
  return `${storagePrefix()}:reader-warmth`;
}

function appearancePresetKey() {
  return `${storagePrefix()}:reader-experience:appearance-preset`;
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

function themeMarkup(theme) {
  return `
    <button
      type="button"
      class="atmosphere-option"
      data-paper="${theme.id}"
      aria-pressed="false"
      aria-label="${theme.name}: ${theme.note}"
      style="--swatch-page:${theme.page};--swatch-ink:${theme.ink};--swatch-accent:${theme.accent}"
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
        ${THEMES.filter((theme) => theme.group === group).map(themeMarkup).join('')}
      </div>
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
    <section class="atmosphere-panel" id="readerAtmosphere" aria-labelledby="readerAtmosphereTitle">
      <div class="atmosphere-head">
        <div>
          <p class="atmosphere-eyebrow">Atmosphere</p>
          <h4 id="readerAtmosphereTitle">Choose your reading room</h4>
        </div>
        <span class="atmosphere-current" id="atmosphereCurrent">Ink</span>
      </div>
      <p class="atmosphere-lede">Page, ink, chrome, accents, and shadows shift together as one calm palette.</p>
      <div class="atmosphere-groups">
        ${['Day', 'Warm', 'Night', 'Accessibility'].map(groupMarkup).join('')}
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

  syncThemeUi();
}

function syncThemeUi() {
  const theme = document.documentElement.dataset.theme || 'dark';
  const current = THEMES.find((item) => item.id === theme) || THEMES.find((item) => item.id === 'dark');
  document.querySelectorAll('.atmosphere-option[data-paper]').forEach((button) => {
    const active = button.dataset.paper === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const label = document.getElementById('atmosphereCurrent');
  if (label && current) label.textContent = current.name;
  requestAnimationFrame(updateBrowserThemeColor);
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
    const themeButton = document.querySelector(`.atmosphere-option[data-paper="${CSS.escape(saved.theme || '')}"]`);
    themeButton?.click();
    if (warmthExists(saved.warmth)) setWarmth(saved.warmth, { persist: true, syncLegacy: true });
  } catch {
    // Keep the typography preset usable even if this snapshot is malformed.
  }
}

function resetAppearance() {
  const theme = systemThemeId();
  document.querySelector(`.atmosphere-option[data-paper="${theme}"]`)?.click();
  setWarmth('off', { persist: true, syncLegacy: true });
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

installPicker();
bindPresetBridge();
watchTheme();
window.addEventListener('load', syncThemeUi, { once: true });
