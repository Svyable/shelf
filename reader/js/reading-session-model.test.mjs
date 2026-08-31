import assert from 'node:assert/strict';
import {
  activeSecondsFromStats,
  advanceReadingClock,
  buildReadingWordMap,
  estimateReadingMinutes,
  formatReadingDuration,
  readingEligible,
  readingWordPosition,
} from './reading-session-model.js';

const chapters = [
  { id: 'one', title: 'One', markdown: '# One\n\nAlpha beta gamma delta.' },
  { id: 'two', title: 'Two', markdown: '# Two\n\nEpsilon zeta eta theta iota kappa.' },
];
const map = buildReadingWordMap(chapters);
assert.equal(map.entries.length, 2);
assert.equal(map.total > 0, true);
const start = readingWordPosition(map, 'one', 0);
assert.equal(start.wordsRead, 0);
const endOne = readingWordPosition(map, 'one', 9999);
assert.equal(endOne.wordsRead, map.entries[0].wordCount);
assert.equal(endOne.wordsRemaining, map.total - map.entries[0].wordCount);
const endBook = readingWordPosition(map, 'two', 9999);
assert.equal(endBook.wordsRemaining, 0);
assert.equal(endBook.progress, 1);
assert.equal(readingWordPosition({ entries: [], total: 0 }, 'none', 0).wordsRemaining, 0);

assert.equal(estimateReadingMinutes(0), 0);
assert.equal(estimateReadingMinutes(230), 1);
assert.equal(estimateReadingMinutes(231), 2);
assert.equal(estimateReadingMinutes(460, 230), 2);
assert.equal(formatReadingDuration(59), '0m');
assert.equal(formatReadingDuration(3600), '1h');
assert.equal(formatReadingDuration(5460), '1h 31m');
assert.equal(activeSecondsFromStats({ minutes: 7 }), 420);
assert.equal(activeSecondsFromStats({ minutes: 7, activeSeconds: 125 }), 125);

const base = {
  stage: 'read',
  visible: true,
  overlayOpen: false,
  now: 1000,
  lastActivityAt: 900,
};
assert.equal(readingEligible(base), true);
assert.equal(readingEligible({ ...base, stage: 'cover' }), false);
assert.equal(readingEligible({ ...base, visible: false }), false);
assert.equal(readingEligible({ ...base, overlayOpen: true }), false);
assert.equal(readingEligible({ ...base, now: 200000, lastActivityAt: 0, idleMs: 180000 }), false);

let clock = advanceReadingClock({}, base);
assert.equal(clock.accruedMs, 0);
assert.equal(clock.state.eligible, true);
clock = advanceReadingClock(clock.state, { ...base, now: 11000, lastActivityAt: 900 });
assert.equal(clock.accruedMs, 10000);
clock = advanceReadingClock(
  clock.state,
  { ...base, now: 50000, lastActivityAt: 900 },
  { maxSliceMs: 20000 }
);
assert.equal(clock.accruedMs, 20000);
clock = advanceReadingClock(
  { lastAt: 170000, eligible: true },
  { ...base, now: 190000, lastActivityAt: 0 },
  { idleMs: 180000, maxSliceMs: 20000 }
);
assert.equal(clock.accruedMs, 10000);
assert.equal(clock.state.eligible, false);

console.log('reading session model tests ok (28 assertions)');
