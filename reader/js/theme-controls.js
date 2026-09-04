import {
  loadPrefs,
  savePrefs,
  nextReaderTheme,
  normalizeReaderTheme,
} from './storage.js';

const THEME_COLORS = Object.freeze({
  dark: '#0c0b0a',
  light: '#f4efe6',
});

function themeIcon(theme) {
  if (theme === 'dark') {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  }
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

export function themeButtonState(theme) {
  const current = normalizeReaderTheme(theme);
  const next = nextReaderTheme(current);
  const targetLabel = next === 'dark' ? 'Dark mode' : 'Light mode';
  return Object.freeze({
    current,
    next,
    title: `Switch to ${targetLabel.toLowerCase()}`,
    ariaLabel: `Switch to ${targetLabel.toLowerCase()}`,
    pressed: current === 'dark',
  });
}

function updateThemeMeta(root, theme) {
  const meta = root.querySelector?.('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
}

export function applyReaderTheme(theme, root = document) {
  const next = normalizeReaderTheme(theme);
  root.documentElement?.setAttribute('data-theme', next);
  updateThemeMeta(root, next);
  return next;
}

function updateButton(button, theme) {
  const state = themeButtonState(theme);
  button.dataset.themeMode = state.current;
  button.setAttribute('aria-pressed', String(state.pressed));
  button.setAttribute('aria-label', state.ariaLabel);
  button.title = state.title;
  button.innerHTML = themeIcon(state.current);
}

function hideLegacyPaperTheme(root) {
  const row = root.querySelector?.('[data-paper]')?.closest('.setting-row');
  if (row) {
    row.hidden = true;
    row.setAttribute('aria-hidden', 'true');
  }

  const help = root.getElementById?.('appearanceResetHelp');
  if (help) {
    const text = 'Restores lamp, type size, typeface, and line height. Theme, your place, notes, bookmarks, reading mode, and focus setting stay put.';
    if (help.textContent !== text) help.textContent = text;
  }
}

function setThemeThroughReader(root, theme) {
  const next = normalizeReaderTheme(theme);
  const legacyButton = root.querySelector?.(`[data-paper="${next}"]`);
  if (legacyButton) {
    legacyButton.click();
  } else {
    const currentPrefs = loadPrefs();
    savePrefs({ ...currentPrefs, theme: next });
  }
  applyReaderTheme(next, root);
  return next;
}

export function installGlobalThemeControls(root = document) {
  const header = root.getElementById?.('readerChrome');
  const settings = root.getElementById?.('settingsBtn');
  if (!header || !settings) return false;

  let button = root.getElementById?.('themeModeBtn');
  if (!button) {
    button = root.createElement('button');
    button.id = 'themeModeBtn';
    button.type = 'button';
    button.className = 'header-btn';
    settings.insertAdjacentElement('beforebegin', button);
  }

  const prefs = loadPrefs();
  const theme = applyReaderTheme(prefs.theme, root);
  updateButton(button, theme);
  hideLegacyPaperTheme(root);

  if (button.dataset.themeControl !== 'installed') {
    button.dataset.themeControl = 'installed';
    button.addEventListener('click', () => {
      const currentPrefs = loadPrefs();
      const next = setThemeThroughReader(root, nextReaderTheme(currentPrefs.theme));
      updateButton(button, next);
    });
  }

  const settingsPanel = root.getElementById?.('settingsPanel');
  if (settingsPanel && settingsPanel.dataset.themeCleanup !== 'installed') {
    settingsPanel.dataset.themeCleanup = 'installed';
    const observer = new MutationObserver(() => hideLegacyPaperTheme(root));
    observer.observe(settingsPanel, { childList: true, subtree: true });
  }

  return true;
}
