import assert from 'node:assert/strict';
import fs from 'node:fs';

const gui = fs.readFileSync(new URL('./shelf-gui.js', import.meta.url), 'utf8');
const librarySort = fs.readFileSync(new URL('./library-sort.js', import.meta.url), 'utf8');

let assertions = 0;
const check = (run) => {
  run();
  assertions += 1;
};

check(() => assert.match(gui, /const LIBRARY_VIEWS = new Set\(\['covers', 'spines'\]\)/));
check(() => assert.match(gui, /:library-view`/));
check(() => assert.match(gui, /data-library-view-option/));
check(() => assert.match(gui, /aria-label', 'Library view'/));
check(() => assert.match(gui, /id = 'compactShelf'/));
check(() => assert.match(gui, /aria-label', 'Alphabetical bookshelf'/));
check(() => assert.match(gui, /\.sort\(\(a, b\) => a\.title\.localeCompare/));
check(() => assert.match(gui, /Tap a spine · press and slide to browse titles/));
check(() => assert.match(gui, /grid-template-columns: repeat\(auto-fill, 30px\)/));
check(() => assert.match(gui, /writing-mode: vertical-rl/));
check(() => assert.match(gui, /backdrop-filter: blur\(22px\) saturate\(1\.35\)/));
check(() => assert.match(gui, /grid\.addEventListener\('pointerdown'/));
check(() => assert.match(gui, /grid\.addEventListener\('pointermove'/));
check(() => assert.match(gui, /grid\.addEventListener\('pointerup'/));
check(() => assert.match(gui, /suppressShelfClickUntil/));
check(() => assert.match(gui, /@media \(prefers-reduced-motion: reduce\)/));
check(() => assert.match(gui, /@media \(forced-colors: active\)/));
check(() => assert.match(gui, /touch-action: pan-y/));
check(() => assert.match(gui, /setLibraryView\(loadLibraryView\(\), \{ persist: false \}\)/));

check(() => assert.match(librarySort, /shelfIndexLetters/));
check(() => assert.match(librarySort, /shelfLetter/));
check(() => assert.match(librarySort, /aria-label', 'Jump through bookshelf by letter'/));
check(() => assert.match(librarySort, /data\.shelfLetterStart/));
check(() => assert.match(librarySort, /compact-shelf-landmark/));
check(() => assert.match(librarySort, /index\.addEventListener\('pointerdown'/));
check(() => assert.match(librarySort, /index\.addEventListener\('pointermove'/));
check(() => assert.match(librarySort, /touch-action: pan-y/));
check(() => assert.match(librarySort, /prefers-reduced-motion: reduce/));

check(() => assert.match(librarySort, /libraryShelfPolishStyles/));
check(() => assert.match(librarySort, /repeating-linear-gradient\(/));
check(() => assert.match(librarySort, /blur\(26px\) saturate\(1\.28\)/));
check(() => assert.match(librarySort, /top: calc\(env\(safe-area-inset-top\) \+ 76px\) !important/));
check(() => assert.match(librarySort, /width: min\(19rem, calc\(100vw - 28px\)\)/));
check(() => assert.match(librarySort, /background: Canvas;[\s\S]*box-shadow: none;/));

console.log(`Compact shelf contract: ${assertions}/34 assertions passed`);
