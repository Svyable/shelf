import assert from 'node:assert/strict';
import { parseBookReadme } from './catalog.js';

const valid = parseBookReadme(
  `# Valid ISBN\n\n| **ISBN** | 978-0-385-53322-5 |\n`,
  'valid-isbn'
);
assert.deepEqual(valid.externalLinks, [
  { label: 'Open Library', url: 'https://openlibrary.org/isbn/9780385533225' },
]);

const typo = parseBookReadme(
  `# ISBN Typo\n\n| **ISBN** | 978-0-385-53322-6 |\n`,
  'isbn-typo'
);
assert.deepEqual(typo.externalLinks, []);

console.log('catalog ISBN checksum tests ok');
