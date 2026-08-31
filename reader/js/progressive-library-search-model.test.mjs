import assert from 'node:assert/strict';
import {
  normalizeQuery,
  queryEligible,
  searchConcurrency,
  createQueryGeneration,
  runBounded,
  stageLabel,
} from './progressive-library-search-model.js';

let assertions = 0;
const ok = (value, message) => { assert.ok(value, message); assertions += 1; };
const eq = (actual, expected, message) => { assert.deepEqual(actual, expected, message); assertions += 1; };

eq(normalizeQuery('  quiet   reader '), 'quiet reader');
ok(!queryEligible('a'));
ok(queryEligible('ab'));
eq(searchConcurrency({}), { metadata: 5, books: 2, chapters: 3 });
eq(searchConcurrency({ effectiveType: '3g' }), { metadata: 3, books: 1, chapters: 2 });
eq(searchConcurrency({ effectiveType: '2g' }), { metadata: 2, books: 1, chapters: 1 });
eq(searchConcurrency({ saveData: true, effectiveType: '4g' }), { metadata: 2, books: 1, chapters: 1 });

const generations = createQueryGeneration();
eq(generations.current(), 0);
const first = generations.next();
eq(first, 1);
ok(generations.isCurrent(first));
const second = generations.next();
eq(second, 2);
ok(!generations.isCurrent(first));
ok(generations.isCurrent(second));

let active = 0;
let maxActive = 0;
const seen = [];
const complete = await runBounded([1, 2, 3, 4, 5], async (value) => {
  active += 1;
  maxActive = Math.max(maxActive, active);
  await new Promise((resolve) => setTimeout(resolve, 2));
  seen.push(value);
  active -= 1;
}, { concurrency: 2 });
eq(complete, { completed: 5, total: 5, cancelled: false });
ok(maxActive <= 2);
eq([...seen].sort((a, b) => a - b), [1, 2, 3, 4, 5]);

let allowed = true;
let count = 0;
const cancelled = await runBounded([1, 2, 3, 4], async () => {
  count += 1;
  if (count === 1) allowed = false;
}, { concurrency: 1, shouldContinue: () => allowed });
eq(cancelled, { completed: 1, total: 4, cancelled: true });

eq(stageLabel({}), 'Searching library…');
eq(stageLabel({ matches: 2 }), 'Searching titles…');
eq(stageLabel({ metadataComplete: true }), 'Searching passages…');
eq(stageLabel({ metadataComplete: true, matches: 1 }), 'Searching inside books…');
eq(stageLabel({ metadataComplete: true, passageComplete: true, matches: 0 }), 'No titles or passages.');
eq(stageLabel({ metadataComplete: true, passageComplete: true, matches: 3 }), '');

console.log(`progressive library search model tests ok (${assertions} assertions)`);
