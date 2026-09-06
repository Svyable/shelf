import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GLOBAL_READER_CONTROLS_CSS } from './global-reader-controls.js';

const viewportRuntime = fs.readFileSync(new URL('./viewport-stability-runtime.js', import.meta.url), 'utf8');
const quickLook = fs.readFileSync(new URL('./library-quick-look.js', import.meta.url), 'utf8');
const libraryCss = fs.readFileSync(new URL('../css/library-home.css', import.meta.url), 'utf8');
const settingsCss = fs.readFileSync(new URL('../css/settings-panel.css', import.meta.url), 'utf8');
const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

let assertions = 0;
function check(run) {
  run();
  assertions += 1;
}

test('global controls have one canonical presentation contract across Reader stages', () => {
  check(() => assert.match(libraryCss, /body\[data-stage="library"\] \.app-header \.header-right \{[\s\S]*display: flex;/));
  check(() => assert.match(libraryCss, /body\[data-stage="library"\] #bookmarkBtn,[\s\S]*#searchBtn,[\s\S]*#tocBtn,[\s\S]*\.reading-time \{[\s\S]*display: none;/));
  check(() => assert.match(libraryCss, /body\[data-stage="library"\] #themeModeBtn,[\s\S]*#settingsBtn \{[\s\S]*display: inline-flex;/));
  check(() => assert.doesNotMatch(settingsCss, /#settingsBtn::before/));
  check(() => assert.doesNotMatch(settingsCss, /content:\s*["']Aa["']/));
  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /data-stage|#settingsBtn::before|display:\s*(?:flex|inline-flex|none)\s*!important/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /@media \(pointer: coarse\)[\s\S]*min-width: 44px;[\s\S]*min-height: 44px;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /@media \(forced-colors: active\)/));

  check(() => assert.match(viewportRuntime, /import\('\.\/global-reader-controls\.js'\)/));
  check(() => assert.doesNotMatch(quickLook, /theme-controls\.js|installGlobalThemeControls/));
  check(() => assert.match(index, /id="settingsBtn"[\s\S]*<circle cx="12" cy="12" r="3"\/>/));

  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /--reader-page-(?:top|bottom|pad|radius)/));
  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /\.page-inner\s*\{/));
  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /\.pages-wrapper\s*\{/));

  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /--reader-control-size:\s*2\.55rem;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /--reader-panel-shadow:/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /\.cover-dock \{[\s\S]*backdrop-filter: blur\(18px\)/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /\.nav-btn \{[\s\S]*min-width: 2\.7rem;[\s\S]*min-height: 2\.7rem;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /\.header-btn\[aria-expanded="true"\]/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /@media \(max-width: 700px\)[\s\S]*--reader-control-size:\s*2\.75rem;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /@media \(prefers-reduced-motion: reduce\)/));

  assert.equal(assertions, 21);
});
