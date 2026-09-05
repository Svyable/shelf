import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GLOBAL_READER_CONTROLS_CSS } from './global-reader-controls.js';

const viewportRuntime = fs.readFileSync(new URL('./viewport-stability-runtime.js', import.meta.url), 'utf8');
const quickLook = fs.readFileSync(new URL('./library-quick-look.js', import.meta.url), 'utf8');
const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

let assertions = 0;
function check(run) {
  run();
  assertions += 1;
}

test('global controls stay visible and semantically separate across Reader stages', () => {
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /body\[data-stage="library"\] \.app-header \.header-right \{[\s\S]*display: flex !important;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /body\[data-stage="library"\] #bookmarkBtn,[\s\S]*#searchBtn,[\s\S]*#tocBtn,[\s\S]*\.reading-time \{[\s\S]*display: none !important;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /body\[data-stage="library"\] #themeModeBtn,[\s\S]*#settingsBtn \{[\s\S]*display: inline-flex !important;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /body\[data-stage="library"\] #settingsBtn svg,[\s\S]*body\[data-stage="cover"\] #settingsBtn svg,[\s\S]*body\[data-stage="read"\] #settingsBtn svg,[\s\S]*body\[data-stage="end"\] #settingsBtn svg \{[\s\S]*display: block !important;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /#settingsBtn::before \{[\s\S]*content: none !important;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /@media \(pointer: coarse\)[\s\S]*min-width: 44px;[\s\S]*min-height: 44px;/));
  check(() => assert.match(GLOBAL_READER_CONTROLS_CSS, /@media \(forced-colors: active\)/));

  check(() => assert.match(viewportRuntime, /import\('\.\/global-reader-controls\.js'\)/));
  check(() => assert.doesNotMatch(quickLook, /theme-controls\.js|installGlobalThemeControls/));
  check(() => assert.match(index, /id="settingsBtn"[\s\S]*<circle cx="12" cy="12" r="3"\/>/));

  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /--reader-page-(?:top|bottom|pad|radius)/));
  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /\.page-inner\s*\{/));
  check(() => assert.doesNotMatch(GLOBAL_READER_CONTROLS_CSS, /\.pages-wrapper\s*\{/));

  assert.equal(assertions, 13);
});
