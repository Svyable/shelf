import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Reader experience delegates continuous keyboard decisions to the tested model', async () => {
  const source = await readFile(new URL('./experience.js', import.meta.url), 'utf8');
  assert.match(source, /continuousKeyboardCommand/);
  assert.match(source, /continuousScrollDelta/);
  assert.match(source, /continuousEdgeTarget/);
  assert.match(source, /const command = continuousKeyboardCommand\(event, \{/);
  assert.match(source, /event\.stopImmediatePropagation\(\);\s*runContinuousKeyboardCommand\(command\);/);
  assert.doesNotMatch(source, /\['ArrowLeft', 'ArrowRight'\]\.includes\(event\.key\)/);
});

test('Reader appearance shortcuts leave modified browser and OS shortcuts alone', async () => {
  const source = await readFile(new URL('./experience.js', import.meta.url), 'utf8');
  const start = source.indexOf("function bindKeyboard()");
  const end = source.indexOf("function bindRoutesAndViewport()", start);
  const keyboard = source.slice(start, end);
  assert.match(keyboard, /if \(event\.metaKey \|\| event\.ctrlKey \|\| event\.altKey\) return;/);
  assert.match(keyboard, /if \(event\.key === '\+' \|\| event\.key === '='\)/);
  assert.match(keyboard, /if \(event\.key === '-'\)/);
  assert.match(keyboard, /if \(event\.key === 'v' \|\| event\.key === 'V'\)/);
});
