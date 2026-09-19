import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('legacy Reader shortcuts use the native-key protection policy', async () => {
  const shellSource = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  const shelfOwnedShell = shellSource.includes('Shelf owns the public library and its release state.');
  const source = shelfOwnedShell
    ? await readFile(new URL('./app-core.js', import.meta.url), 'utf8')
    : shellSource;
  assert.match(source, /import \{ shouldProtectNativeKey \} from '\.\/reader-keyboard-policy\.js'/);
  assert.match(source, /const interactive = !!e\.target\?\.closest\?\.\('input, textarea, select, button, a, \[contenteditable="true"\]'\)/);
  assert.match(source, /if \(shouldProtectNativeKey\(\{/);
  assert.match(source, /ctrlKey: e\.ctrlKey/);
  assert.match(source, /metaKey: e\.metaKey/);
  assert.match(source, /altKey: e\.altKey/);
  assert.match(source, /composing: e\.isComposing/);
  assert.match(source, /repeat: e\.repeat/);
});
