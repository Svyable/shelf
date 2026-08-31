import assert from 'node:assert/strict';
import { normalizeStats } from './storage.js';

assert.deepEqual(normalizeStats({}), { minutes: 0, chapters: [] });
assert.deepEqual(normalizeStats({ minutes: 7, chapters: ['a'] }), {
  minutes: 7,
  chapters: ['a'],
});
assert.deepEqual(normalizeStats({ minutes: -3, chapters: null }), {
  minutes: 0,
  chapters: [],
});
assert.deepEqual(normalizeStats({ minutes: 99, activeSeconds: 125, chapters: ['a'] }), {
  minutes: 2,
  activeSeconds: 125,
  chapters: ['a'],
});
assert.equal(normalizeStats({ activeSeconds: 3600 }).minutes, 60);
assert.equal(normalizeStats({ activeSeconds: 3600.9 }).activeSeconds, 3600);
assert.equal('activeSeconds' in normalizeStats({ activeSeconds: -1, minutes: 4 }), false);
assert.equal(normalizeStats({ activeSeconds: -1, minutes: 4 }).minutes, 4);

console.log('storage stats tests ok (8 assertions)');
