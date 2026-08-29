import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const source = await fs.readFile(new URL('./notes.js', import.meta.url), 'utf8');
const mod = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

assert.equal(mod.sourceOffsetForTextPosition(100, 300, 100, 50), 200);
assert.equal(mod.sourceOffsetForTextPosition(100, 300, 100, 0), 100);
assert.equal(mod.sourceOffsetForTextPosition(100, 300, 100, 100), 300);
assert.equal(mod.textPositionForSourceOffset(100, 300, 100, 200), 50);
assert.equal(mod.textPositionForSourceOffset(100, 300, 100, 350), 100);
assert.deepEqual(mod.normalizeSourceAnchor({ start: 220.4, end: 180.2 }), { version: 1, start: 220, end: 220 });
assert.equal(mod.normalizeSourceAnchor({ start: 'x', end: 10 }), null);
assert.deepEqual(
  mod.anchorSegmentsForRanges(
    [{ start: 0, end: 100 }, { start: 100, end: 200 }, { start: 200, end: 300 }],
    { start: 80, end: 230 }
  ),
  [
    { index: 0, sourceStart: 80, sourceEnd: 100 },
    { index: 1, sourceStart: 100, sourceEnd: 200 },
    { index: 2, sourceStart: 200, sourceEnd: 230 },
  ]
);

console.log('notes anchor tests passed');
