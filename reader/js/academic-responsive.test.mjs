import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const cssUrl = new URL('../css/academic.css', import.meta.url);
const css = fs.readFileSync(fileURLToPath(cssUrl), 'utf8');

assert.match(css, /@media \(max-width: 640px\), \(pointer: coarse\)/);
assert.match(css, /bottom: max\(10px, env\(safe-area-inset-bottom\)\) !important;/);
assert.match(css, /max-height: min\(68dvh, 30rem\);/);
assert.match(css, /min-height: 3rem;/);
assert.match(css, /position: sticky;/);
assert.match(css, /@media \(max-height: 520px\) and \(orientation: landscape\)/);
assert.match(css, /max-height: min\(82dvh, 22rem\);/);
assert.match(css, /scrollbar-gutter: stable;/);
assert.match(css, /overscroll-behavior: contain;/);
assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/);
assert.match(css, /@media \(forced-colors: active\)/);
assert.match(css, /\.reader-academic-preview__jump \{\n    flex: 1 1 auto;/);
assert.match(css, /\.reader-academic-preview::before/);

console.log('academic responsive preview tests ok (13 assertions)');
