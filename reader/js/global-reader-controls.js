import { installGlobalThemeControls } from './theme-controls.js';

const STYLE_ID = 'bookselfGlobalReaderControls';

export const GLOBAL_READER_CONTROLS_CSS = `
:root {
  --reader-control-size: 2.55rem;
  --reader-control-radius: 999px;
  --reader-control-gap: .22rem;
  --reader-control-surface: color-mix(in srgb, var(--bg-elevated) 84%, transparent);
  --reader-control-surface-strong: color-mix(in srgb, var(--bg-elevated) 94%, transparent);
  --reader-control-border: color-mix(in srgb, var(--border) 68%, transparent);
  --reader-control-hover: color-mix(in srgb, var(--accent-glow) 58%, var(--bg-elevated));
  --reader-control-shadow: 0 10px 28px color-mix(in srgb, var(--shadow) 26%, transparent);
  --reader-panel-shadow: 0 28px 80px color-mix(in srgb, var(--shadow) 58%, transparent);
  --reader-focus-ring: color-mix(in srgb, var(--accent) 78%, white 8%);
}

#themeModeBtn,
#settingsBtn {
  align-items: center;
  justify-content: center;
}

.app-header {
  padding-inline: max(.62rem, env(safe-area-inset-left)) max(.62rem, env(safe-area-inset-right));
  background: color-mix(in srgb, var(--header-bg) 86%, transparent);
  -webkit-backdrop-filter: blur(20px) saturate(.9);
  backdrop-filter: blur(20px) saturate(.9);
}

.header-left,
.header-right {
  gap: var(--reader-control-gap);
}

.header-btn,
.logo,
.nav-btn,
.view-toggle,
.cover-dock button,
.cover-dock a,
.toc-close,
.stats-close,
.settings-reset {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.header-btn,
.logo {
  min-width: var(--reader-control-size);
  min-height: var(--reader-control-size);
  border-radius: var(--reader-control-radius);
}

.header-btn {
  position: relative;
  color: var(--text-secondary);
}

.header-btn svg {
  width: 17px;
  height: 17px;
  transition: transform 140ms ease;
}

.header-btn:hover,
.header-btn:focus-visible,
.logo:hover,
.logo:focus-visible {
  color: var(--text-primary);
  background: var(--reader-control-hover);
  border-color: color-mix(in srgb, var(--accent) 28%, var(--reader-control-border));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, white 7%, transparent);
}

.header-btn:hover svg,
.header-btn:focus-visible svg {
  transform: scale(1.04);
}

.header-btn:active,
.logo:active,
.nav-btn:active,
.view-toggle:active,
.cover-dock button:active,
.cover-dock a:active {
  transform: scale(.94);
}

.header-btn.active,
.header-btn[aria-expanded="true"] {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent-glow) 72%, var(--reader-control-surface));
  border-color: color-mix(in srgb, var(--accent) 46%, var(--reader-control-border));
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent),
    0 5px 18px color-mix(in srgb, var(--accent) 12%, transparent);
}

.header-btn:focus-visible,
.logo:focus-visible,
.nav-btn:focus-visible,
.view-toggle:focus-visible,
.cover-dock button:focus-visible,
.cover-dock a:focus-visible,
.toc-close:focus-visible,
.stats-close:focus-visible,
.settings-reset:focus-visible {
  outline: 2px solid var(--reader-focus-ring);
  outline-offset: 2px;
}

.page-nav {
  padding-inline: max(.7rem, env(safe-area-inset-left)) max(.7rem, env(safe-area-inset-right));
}

.nav-center {
  min-height: 2.7rem;
  padding-inline: .85rem;
  border-color: var(--reader-control-border);
  background: var(--reader-control-surface);
  box-shadow: var(--reader-control-shadow);
  -webkit-backdrop-filter: blur(18px) saturate(.9);
  backdrop-filter: blur(18px) saturate(.9);
}

.nav-btn {
  min-width: 2.7rem;
  min-height: 2.7rem;
  color: var(--text-secondary);
  border-color: var(--reader-control-border);
  background: var(--reader-control-surface);
  box-shadow: var(--reader-control-shadow);
}

.nav-btn:hover,
.nav-btn:focus-visible {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 48%, var(--reader-control-border));
  background: var(--reader-control-hover);
}

.view-toggle {
  min-height: 2rem;
  padding-inline: .68rem;
  font-weight: 650;
  letter-spacing: .01em;
}

.cover-dock {
  gap: .32rem;
  padding: .36rem;
  border: 1px solid var(--reader-control-border);
  border-radius: 16px;
  background: var(--reader-control-surface);
  box-shadow: var(--reader-control-shadow);
  -webkit-backdrop-filter: blur(18px) saturate(.9);
  backdrop-filter: blur(18px) saturate(.9);
}

.cover-dock button,
.cover-dock a {
  min-height: 2.35rem;
  padding: .46rem .72rem;
  border: 1px solid transparent;
  border-radius: 10px;
  color: var(--text-secondary);
  background: transparent;
  font-family: var(--font-ui);
  font-size: .76rem;
  font-weight: 650;
  letter-spacing: .01em;
  text-decoration: none;
  transition: color 140ms ease, background 140ms ease, border-color 140ms ease, transform 120ms ease;
}

.cover-dock button:hover,
.cover-dock button:focus-visible,
.cover-dock a:hover,
.cover-dock a:focus-visible {
  color: var(--text-primary);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--reader-control-border));
  background: var(--reader-control-hover);
}

.toc-overlay,
.stats-card,
.search-card,
.settings-card {
  border-color: var(--reader-control-border);
  background: var(--reader-control-surface-strong);
  box-shadow: var(--reader-panel-shadow);
  -webkit-backdrop-filter: blur(24px) saturate(.92);
  backdrop-filter: blur(24px) saturate(.92);
}

.stats-card,
.search-card,
.settings-card {
  border-radius: 20px;
}

.toc-close,
.stats-close {
  min-width: var(--reader-control-size);
  min-height: var(--reader-control-size);
  border-radius: var(--reader-control-radius);
}

.settings-section {
  border-color: color-mix(in srgb, var(--reader-control-border) 82%, transparent);
}

.settings-section h4,
.settings-section-head h4 {
  letter-spacing: .015em;
}

.settings-reset {
  min-height: 2rem;
  padding-inline: .62rem;
  border-radius: 999px;
}

.setting-row input[type="range"] {
  accent-color: var(--accent);
}

.setting-pills,
.settings-action-grid {
  gap: .3rem;
}

.toast {
  border-radius: 999px;
  padding: .66rem .9rem;
}

@media (hover: hover) and (pointer: fine) {
  .header-btn,
  .logo,
  .nav-btn,
  .view-toggle,
  .cover-dock button,
  .cover-dock a {
    transition-duration: 140ms;
  }
}

@media (pointer: coarse) {
  #themeModeBtn,
  #settingsBtn,
  .header-btn,
  .logo,
  .nav-btn,
  .toc-close,
  .stats-close {
    min-width: 44px;
    min-height: 44px;
  }

  .cover-dock button,
  .cover-dock a,
  .view-toggle,
  .settings-reset {
    min-height: 44px;
  }
}

@media (max-width: 700px) {
  :root {
    --reader-control-size: 2.75rem;
  }

  .app-header {
    padding-inline: max(.4rem, env(safe-area-inset-left)) max(.4rem, env(safe-area-inset-right));
  }

  .header-left,
  .header-right {
    gap: .08rem;
  }

  .page-nav {
    gap: .34rem;
    padding-inline: max(.45rem, env(safe-area-inset-left)) max(.45rem, env(safe-area-inset-right));
    padding-bottom: max(.38rem, env(safe-area-inset-bottom));
  }

  .nav-center {
    min-height: 2.8rem;
    padding-inline: .68rem;
  }

  .nav-btn {
    min-width: 2.8rem;
    min-height: 2.8rem;
  }

  .cover-dock {
    width: min(calc(100vw - 1rem), 36rem);
    padding: .34rem;
    border-radius: 18px;
  }

  .cover-dock button,
  .cover-dock a {
    flex: 1 1 auto;
    justify-content: center;
    text-align: center;
  }

  .stats-card,
  .search-card,
  .settings-card {
    border-radius: 24px 24px 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-btn,
  .header-btn svg,
  .logo,
  .nav-btn,
  .view-toggle,
  .cover-dock button,
  .cover-dock a {
    transition: none;
  }
}

@media (forced-colors: active) {
  #themeModeBtn,
  #settingsBtn,
  .header-btn,
  .logo,
  .nav-btn,
  .view-toggle,
  .cover-dock button,
  .cover-dock a {
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
