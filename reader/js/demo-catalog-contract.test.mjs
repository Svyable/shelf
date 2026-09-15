import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parsePortalCatalog } from './catalog.js';

const readme = readFileSync(new URL('../../README.md', import.meta.url), 'utf8');
const manifest = JSON.parse(
  readFileSync(new URL('../../catalog.json', import.meta.url), 'utf8')
);

assert.equal(manifest.version, 1);
assert.ok(Array.isArray(manifest.books));
assert.deepEqual(
  parsePortalCatalog(readme),
  manifest.books,
  'README demo links must remain compatible with the canonical catalog.json inventory'
);

console.log('demo catalog contract ok');
