import assert from 'node:assert/strict';
import { normalizeReaderStyles } from './imprint.js';

assert.deepEqual(normalizeReaderStyles(undefined), []);
assert.deepEqual(normalizeReaderStyles('styles/reader.css'), []);

assert.deepEqual(
  normalizeReaderStyles([
    'styles/reader.css',
    './themes/serif.css',
    'styles/reader.css',
    '  assets/large-print.CSS  ',
  ]),
  ['styles/reader.css', 'themes/serif.css', 'assets/large-print.CSS']
);

assert.deepEqual(
  normalizeReaderStyles([
    '../reader/css/style.css',
    '/absolute.css',
    'https://example.com/theme.css',
    '//example.com/theme.css',
    'javascript:theme.css',
    'styles/theme.js',
    '',
    null,
  ]),
  []
);

assert.equal(
  normalizeReaderStyles(Array.from({ length: 12 }, (_, i) => `styles/${i}.css`)).length,
  8
);

console.log('imprint tests ok');
