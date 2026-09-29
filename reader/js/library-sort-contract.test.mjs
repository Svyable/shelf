import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('compact shelf index clears stale controls when the compact shelf disappears or empties', async () => {
  const source = await readFile(new URL('./library-sort.js', import.meta.url), 'utf8');
  assert.match(source, /function resetShelfIndex\(\)/);
  assert.match(source, /index\.replaceChildren\(\)/);
  assert.match(source, /index\.hidden = true/);
  assert.match(source, /delete index\.dataset\.fingerprint/);
  assert.match(source, /if \(!libraryStage\(\) \|\| !section \|\| !grid\) \{\s*resetShelfIndex\(\);\s*return;/);
  assert.match(source, /if \(!spines\.length\) \{\s*resetShelfIndex\(\);\s*return;/);
});

test('compact shelf index fast path verifies the actual index buttons before skipping rebuild', async () => {
  const source = await readFile(new URL('./library-sort.js', import.meta.url), 'utf8');
  assert.match(source, /const indexedLetters = \[\.\.\.index\.querySelectorAll\('\.compact-shelf-index-button'\)\]/);
  assert.match(source, /const indexMatches = indexedLetters\.length === letters\.length/);
  assert.match(source, /index\.dataset\.fingerprint === fingerprint && landmarkCount === letters\.length && indexMatches/);
});

test('library stage changes resynchronize index state', async () => {
  const source = await readFile(new URL('./library-sort.js', import.meta.url), 'utf8');
  assert.match(source, /stageObserver\.observe\(document\.body, \{\s*attributes: true,\s*attributeFilter: \['data-stage'\]/);
});
