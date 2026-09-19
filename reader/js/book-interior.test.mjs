import assert from 'node:assert/strict';
import fs from 'node:fs';
import { interiorStyleHref } from './book-interior.js';

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

equal(interiorStyleHref(), 'css/book-interior.css?v=r1');

const source = fs.readFileSync(new URL('./book-interior.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/book-interior.css', import.meta.url), 'utf8');
const runtime = fs.readFileSync(new URL('./viewport-stability-runtime.js', import.meta.url), 'utf8');

match(source, /STYLE_HREF = 'css\/book-interior\.css\?v=r1'/);
match(source, /dataset\.bookInterior = 'true'/);
match(source, /link\.addEventListener\('error'/);
match(source, /window\.setTimeout\(\(\) => finish\(!!link\.sheet\), 900\)/);

match(css, /\.page-surface\.left \.page-running/);
match(css, /\.page-surface\.right \.page-running/);
match(css, /\.page-inner\.chapter-open > h1:first-child::before/);
match(css, /p:first-of-type::first-line/);
match(css, /blockquote::before/);
match(css, /figcaption::before/);
match(css, /\[data-reader-mode="scroll"\] \.scroll-reader/);
match(css, /@media \(max-width: 700px\)/);
match(css, /@media \(prefers-contrast: more\)/);
match(css, /@media \(forced-colors: active\)/);
match(css, /@media print/);

/* Progressive aesthetic loading must never invalidate already-measured pages. */
doesNotMatch(css, /--reader-page-(?:top|bottom|pad|inline|radius)\s*:/);
doesNotMatch(css, /--reader-stage-(?:inline|block)\s*:/);
doesNotMatch(css, /\.pages-wrapper\.active\s*\{/);
doesNotMatch(css, /\.page-inner\s*\{/);
doesNotMatch(css, /p:first-of-type::first-line\s*\{[^}]*(?:font-family|font-size|font-weight|font-variant|letter-spacing|line-height|margin|padding|text-indent)/s);
doesNotMatch(css, /(?:\.page-inner h2|\.scroll-document h2)[^{]*\{[^}]*(?:font-family|font-size|font-weight|letter-spacing|line-height|margin|padding|text-indent)/s);
doesNotMatch(css, /figcaption\s*\{[^}]*(?:font-family|font-size|font-weight|font-style|letter-spacing|line-height|margin|padding)/s);
doesNotMatch(css, /\) strong\s*\{[^}]*font-weight/s);

match(runtime, /import\('\.\/book-interior\.js'\)\.catch/);
match(runtime, /Book-interior polish could not be loaded/);

console.log(`Premium book interior: ${assertions}/24 assertions passed`);
