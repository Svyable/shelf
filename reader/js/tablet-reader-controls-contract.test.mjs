import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../css/interface-v3.css', import.meta.url), 'utf8');

assert.match(
  css,
  /@media \(pointer: coarse\) and \(min-width: 701px\)/,
  'touch tablets should receive a dedicated Reader control treatment',
);
assert.match(css, /#bookmarkBtn::after \{ content: "Bookmark"; \}/);
assert.match(css, /#searchBtn::after \{ content: "Search"; \}/);
assert.match(css, /#tocBtn::after \{ content: "Contents"; \}/);
assert.match(css, /#settingsBtn::after \{ content: "Reading"; \}/);
assert.match(
  css,
  /body\[data-stage="library"\] #bookmarkBtn,[\s\S]*body\[data-stage="library"\] #tocBtn/,
  'book-only actions should stay out of the library toolbar',
);
assert.match(
  css,
  /body:not\(\[data-stage="read"\]\) \.reading-time/,
  'reading time should only appear while reading',
);
assert.match(css, /\.volume-open \{\s*display: none;/);
assert.match(css, /\.volume:focus-visible \{/);

console.log('tablet Reader controls contract ok');
