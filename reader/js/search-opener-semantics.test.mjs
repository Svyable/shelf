import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Reader Search opener describes the inline library action on the library stage', async () => {
  const source = await readFile(new URL('./gui.js', import.meta.url), 'utf8');
  assert.match(source, /config\.id === 'searchOverlay' && document\.body\.dataset\.stage === 'library'/);
  assert.match(source, /opener\.setAttribute\('aria-controls', 'librarySearch'\)/);
  assert.match(source, /opener\.setAttribute\('aria-label', 'Search library'\)/);
  assert.match(source, /opener\.removeAttribute\('aria-haspopup'\)/);
  assert.match(source, /opener\.removeAttribute\('aria-expanded'\)/);
});

test('Reader Search opener returns to dialog semantics outside the library', async () => {
  const source = await readFile(new URL('./gui.js', import.meta.url), 'utf8');
  assert.match(source, /opener\.setAttribute\('aria-controls', config\.id\)/);
  assert.match(source, /opener\.setAttribute\('aria-haspopup', 'dialog'\)/);
  assert.match(source, /opener\.setAttribute\('aria-expanded', String\(active\)\)/);
  assert.match(source, /config\.id === 'searchOverlay'\) opener\.setAttribute\('aria-label', 'Search this book'\)/);
});

test('Search opener alone resynchronizes on Reader stage changes', async () => {
  const source = await readFile(new URL('./gui.js', import.meta.url), 'utf8');
  assert.match(source, /const syncSearchOpener = \(\) => \{/);
  assert.match(source, /new MutationObserver\(syncSearchOpener\)\.observe\(document\.body/);
  const stageBlock = source.slice(source.indexOf('const syncSearchOpener'), source.indexOf('syncOverlayStack();', source.indexOf('const syncSearchOpener')));
  assert.doesNotMatch(stageBlock, /syncOverlayStack\(\)/);
});
