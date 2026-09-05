import { installGlobalThemeControls } from './theme-controls.js';

const STYLE_ID = 'bookselfGlobalReaderControls';

export const GLOBAL_READER_CONTROLS_CSS = `
/* Theme and Settings are app-level controls, not book-level controls. */
body[data-stage="library"] .app-header .header-right {
  display: flex !important;
  align-items: center;
  gap: .08rem;
}

body[data-stage="library"] #bookmarkBtn,
body[data-stage="library"] #searchBtn,
body[data-stage="library"] #tocBtn,
body[data-stage="library"] .reading-time {
  display: none !important;
}

body[data-stage="library"] #themeModeBtn,
body[data-stage="library"] #settingsBtn {
  display: inline-flex !important;
}

body[data-stage="library"] #settingsBtn svg,
body[data-stage="cover"] #settingsBtn svg,
body[data-stage="read"] #settingsBtn svg,
body[data-stage="end"] #settingsBtn svg {
  display: block !important;
}

body[data-stage="library"] #settingsBtn::before,
body[data-stage="cover"] #settingsBtn::before,
body[data-stage="read"] #settingsBtn::before,
body[data-stage="end"] #settingsBtn::before {
  content: none !important;
  display: none !important;
}

#themeModeBtn,
#settingsBtn {
  align-items: center;
  justify-content: center;
}

@media (pointer: coarse) {
  #themeModeBtn,
  #settingsBtn {
    min-width: 44px;
    min-height: 44px;
  }
}

@media (forced-colors: active) {
  #themeModeBtn,
  #settingsBtn {
    forced-color-adjust: auto;
  }
}
`;

function installStyles(root = document) {
  if (root.getElementById?.(STYLE_ID)) return;
  const style = root.createElement('style');
  style.id = STYLE_ID;
  style.textContent = GLOBAL_READER_CONTROLS_CSS;
  root.head?.appendChild(style);
}

export function installGlobalReaderControls(root = document) {
  installStyles(root);
  const installed = installGlobalThemeControls(root);
  const settings = root.getElementById?.('settingsBtn');
  if (settings) {
    settings.dataset.globalReaderControl = 'settings';
    settings.title = 'Reading settings';
    settings.setAttribute('aria-label', 'Reading settings');
  }
  const theme = root.getElementById?.('themeModeBtn');
  if (theme) theme.dataset.globalReaderControl = 'theme';
  return installed;
}

function installWhenReady() {
  installGlobalReaderControls();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installWhenReady, { once: true });
  } else {
    installWhenReady();
  }
}
