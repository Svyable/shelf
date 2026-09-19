import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../css/library-home.css', import.meta.url), 'utf8');
const atmosphere = fs.readFileSync(new URL('../css/atmosphere-library.css', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const worker = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

const shelfOwnedShell = app.includes('Shelf owns the public library and its release state.');

let assertions = 0;
const check = (run) => {
  run();
  assertions += 1;
};

check(() => assert.match(atmosphere, /@import url\('\.\/library-home\.css\?v=r1'\);/));
check(() => assert.match(css, /body\[data-stage="library"\] \.app-header \.header-right \{[\s\S]*display: flex;/));
check(() => assert.match(css, /body\[data-stage="library"\] #bookmarkBtn,[\s\S]*#searchBtn,[\s\S]*#tocBtn,[\s\S]*\.reading-time \{[\s\S]*display: none;/));
check(() => assert.match(css, /body\[data-stage="library"\] #themeModeBtn,[\s\S]*#settingsBtn \{[\s\S]*display: inline-flex;/));
check(() => assert.match(css, /body\[data-stage="library"\] \.continue-card \{/));
check(() => assert.match(css, /#continueCardLink::after \{/));
check(() => assert.match(css, /content: "Resume  ›"/));
check(() => assert.match(css, /body\[data-stage="library"\] \.library-bar \{/));
check(() => assert.match(css, /position: sticky;/));
check(() => assert.match(css, /body\[data-stage="library"\] \.pub-filters \{/));
check(() => assert.match(css, /overflow-x: auto;/));
check(() => assert.match(css, /body\[data-stage="library"\] #libraryHits \{/));
check(() => assert.match(css, /body\[data-stage="library"\] \.stack-title \{/));
check(() => assert.match(css, /@media \(max-width: 700px\)/));
check(() => assert.match(css, /@media \(forced-colors: active\)/));
check(() => assert.match(css, /@media \(prefers-reduced-motion: reduce\)/));

check(() => assert.doesNotMatch(css, /--reader-page-(?:top|bottom|pad|radius)/));
check(() => assert.doesNotMatch(css, /\.page-inner\s*\{/));
check(() => assert.doesNotMatch(css, /body\[data-stage="read"\]/));
check(() => assert.doesNotMatch(css, /body\[data-stage="cover"\]/));
check(() => assert.doesNotMatch(css, /body\[data-stage="end"\]/));
check(() => assert.doesNotMatch(css, /body\[data-stage="library"\] \.volume\s*\{/));

if (!shelfOwnedShell) {
  check(() => assert.match(index, /id="librarySearch"/));
  check(() => assert.match(index, /id="continueCard"/));
  check(() => assert.match(index, /id="pubFilters"/));
  check(() => assert.match(index, /data-sort="title"/));
  check(() => assert.match(index, /data-sort="recent"/));
  check(() => assert.match(app, /function renderContinue\(\)/));
  check(() => assert.match(app, /function renderPublisherFilters\(entries\)/));
  check(() => assert.match(app, /function renderShelf\(entries\)/));
  check(() => assert.match(app, /function sortEntries\(list\)/));
  check(() => assert.match(app, /async function runLibrarySearch\(query\)/));
  check(() => assert.match(worker, /const CACHE = 'bookself-reader-shell-v\d+';/));
  check(() => assert.match(worker, /'\.\/css\/library-home\.css'/));
  check(() => assert.match(worker, /'\.\/css\/shelf-gui\.css'/));
  check(() => assert.match(worker, /'\.\/js\/shelf-gui\.js'/));
  check(() => assert.match(worker, /'\.\/js\/library-sort-model\.js'/));
  check(() => assert.match(worker, /'\.\/js\/library-sort\.js'/));
}

console.log(`Library home GUI contract: ${assertions}/${shelfOwnedShell ? 22 : 38} assertions passed`);
