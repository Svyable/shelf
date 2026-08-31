import assert from 'node:assert/strict';
import {
  orderedPublicationFiles,
  runBounded,
  createStartupPublicationPrimer,
} from './startup-publication-primer.js';

const contents = [
  { id: 'front', file: 'front.md' },
  { id: 'one', file: 'one.md' },
  { id: 'two', file: 'two.md' },
  { id: 'three', file: 'three.md' },
];
assert.deepEqual(orderedPublicationFiles(contents, 'two').map((x) => x.id), ['two', 'front', 'one', 'three']);
assert.deepEqual(orderedPublicationFiles(contents, 'front').map((x) => x.id), ['front', 'one', 'two', 'three']);
assert.deepEqual(orderedPublicationFiles(contents, 'missing').map((x) => x.id), ['front', 'one', 'two', 'three']);
assert.deepEqual(orderedPublicationFiles([], 'two'), []);

let active = 0;
let maxActive = 0;
const starts = [];
const bounded = await runBounded([1, 2, 3, 4, 5], async (item) => {
  starts.push(item);
  active += 1;
  maxActive = Math.max(maxActive, active);
  await new Promise((resolve) => setTimeout(resolve, item === 1 ? 8 : 2));
  active -= 1;
  return item * 2;
}, { concurrency: 2 });
assert.equal(maxActive, 2);
assert.deepEqual(starts.slice(0, 2), [1, 2]);
assert.deepEqual(bounded.map((x) => x.value), [2, 4, 6, 8, 10]);

const calls = [];
let inFlight = 0;
let peak = 0;
const primer = createStartupPublicationPrimer({
  loadReadme: async (slug) => { calls.push(`readme:${slug}`); return '# readme'; },
  parseReadme: () => ({ contents }),
  loadChapter: async (slug, row) => {
    calls.push(`start:${row.id}`);
    inFlight += 1;
    peak = Math.max(peak, inFlight);
    await new Promise((resolve) => setTimeout(resolve, 3));
    inFlight -= 1;
    calls.push(`done:${row.id}`);
    return `${slug}/${row.file}`;
  },
  concurrency: 2,
});
const p1 = primer.prime({ slug: 'book', chapter: 'two' });
const p2 = primer.prime({ slug: 'book', chapter: 'two' });
assert.equal(p1, p2);
const result = await p1;
assert.equal(result.first, 'two');
assert.equal(result.loaded, 4);
assert.equal(result.failed, 0);
assert.equal(calls[0], 'readme:book');
assert.equal(calls[1], 'start:two');
assert.equal(calls[2], 'done:two');
assert.deepEqual(calls.filter((x) => x.startsWith('start:')).slice(0, 3), ['start:two', 'start:front', 'start:one']);
assert.equal(peak, 2);

let attempts = 0;
const retryPrimer = createStartupPublicationPrimer({
  loadReadme: async () => 'x',
  parseReadme: () => ({ contents: [{ id: 'one', file: 'one.md' }] }),
  loadChapter: async () => {
    attempts += 1;
    if (attempts === 1) throw new Error('offline');
    return 'ok';
  },
});
await assert.rejects(retryPrimer.prime({ slug: 'retry', chapter: 'one' }));
const retry = await retryPrimer.prime({ slug: 'retry', chapter: 'one' });
assert.equal(retry.loaded, 1);
assert.equal(attempts, 2);

const skipped = await primer.prime({});
assert.equal(skipped.status, 'skipped');

console.log('startup publication primer tests ok');
