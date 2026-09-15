import assert from 'node:assert/strict';
import { parseBookReadme } from './catalog.js';

const singular = parseBookReadme(
  `# A Book\n\n| **Author** | Ada Example |\n| **Status** | Published |\n`,
  'a-book'
);
assert.equal(singular.authors, 'Ada Example');
assert.equal(singular.authorsRaw, 'Ada Example');
assert.equal(singular.published, true);

const plural = parseBookReadme(
  `# A Collaboration\n\n| **Authors** | Ada Example and Grace Example |\n| **Author** | Ignored Fallback |\n`,
  'a-collaboration'
);
assert.equal(plural.authors, 'Ada Example and Grace Example');
assert.equal(plural.authorsRaw, 'Ada Example and Grace Example');

console.log('catalog author-field compatibility ok');
