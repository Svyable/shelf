import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  chapterResumeLabel,
  relativeSavedLabel,
  slugFromContinueHref,
} from './library-current-book.js';

let assertions = 0;
const equal = (...args) => {
  assertions += 1;
  assert.equal(...args);
};
const match = (...args) => {
  assertions += 1;
  assert.match(...args);
};
const doesNotMatch = (...args) => {
  assertions += 1;
  assert.doesNotMatch(...args);
};

const now = Date.UTC(2026, 8, 4, 20, 0, 0);
equal(relativeSavedLabel(now - 20_000, now), 'Saved just now');
equal(relativeSavedLabel(now - 12 * 60_000, now), 'Saved 12m ago');
equal(relativeSavedLabel(now - 3 * 60 * 60_000, now), 'Saved 3h ago');
equal(relativeSavedLabel(now - 2 * 24 * 60 * 60_000, now), 'Saved 2d ago');
equal(relativeSavedLabel(null, now), '');

const meta = {
  contents: [
    { id: 'front-matter', title: 'Front matter' },
    { id: 'chapter-one', title: 'The first room' },
    { id: 'chapter-two', title: 'The second room' },
  ],
};
equal(chapterResumeLabel(meta, { chapter: 'chapter-one' }), 'The first room · 2 of 3');
equal(chapterResumeLabel(meta, { chapter: 'missing' }), '');
equal(slugFromContinueHref('#/b/warm-library/chapter-one/42'), 'warm-library');
equal(slugFromContinueHref('#/'), '');

const source = fs.readFileSync(new URL('./library-current-book.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/library-current-book.css', import.meta.url), 'utf8');
const runtime = fs.readFileSync(new URL('./viewport-stability-runtime.js', import.meta.url), 'utf8');

match(source, /buildProgressMap/);
match(source, /progressAt/);
match(source, /firstExisting\(coverCandidates\(slug\)\)/);
match(source, /data\.currentBookEnhanced/);
match(source, /document\.body\.dataset\.stage !== 'library'/);
match(source, /card\.dataset\.currentBookReady = 'fallback'/);
match(source, /setAttribute\('aria-label'/);
match(source, /MutationObserver/);
match(source, /const stylesAvailable = await installStyles\(\)/);
match(source, /requestIdleCallback/);

match(css, /\.continue-book-object/);
match(css, /\.continue-book-meter-fill/);
match(css, /#continueCardLink:focus-visible/);
match(css, /@media \(max-width: 700px\)/);
match(css, /@media \(forced-colors: active\)/);
match(css, /@media \(prefers-reduced-motion: reduce\)/);
doesNotMatch(css, /body\[data-stage="read"\]/);
doesNotMatch(css, /\.page-inner\s*\{/);
doesNotMatch(css, /--reader-page-/);

match(runtime, /import\('\.\/library-current-book\.js'\)\.catch/);
match(runtime, /Current-book polish could not be loaded/);

console.log(`Current-book resume polish: ${assertions}/29 assertions passed`);
