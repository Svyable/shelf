import assert from 'node:assert/strict';
import {
  orderedPublicationFiles,
  startupAcquisitionPlan,
  publicationPrefetchDepth,
  runBounded,
  createStartupPublicationPrimer,
} from './startup-publication-primer.js';

let assertions = 0;
const eq = (actual, expected, message) => { assert.deepEqual(actual, expected, message); assertions += 1; };

const contents = [
  { id: 'front', file: 'front.md' },
  { id: 'one', file: 'one.md' },
  { id: 'two', file: 'two.md' },
  { id: 'three', file: 'three.md' },
];
eq(orderedPublicationFiles(contents, 'two').map((x) => x.id), ['two', 'three', 'one', 'front']);
eq(orderedPublicationFiles(contents, 'front').map((x) => x.id), ['front', 'one', 'two', 'three']);
eq(orderedPublicationFiles(contents, 'missing').map((x) => x.id), ['front', 'one', 'two', 'three']);
eq(orderedPublicationFiles([], 'two'), []);
const longContents = ['front', 'one', 'two', 'three', 'four', 'five', 'six'].map((id) => ({ id, file: `${id}.md` }));
eq(
  orderedPublicationFiles(longContents, 'three').map((x) => x.id),
  ['three', 'four', 'five', 'two', 'front', 'one', 'six'],
  'deep links warm the forward reading corridor before unrelated early chapters'
);

eq(publicationPrefetchDepth(), 'publication');
eq(publicationPrefetchDepth('route'), 'publication');
eq(publicationPrefetchDepth('activate'), 'publication');
eq(publicationPrefetchDepth('hover'), 'target');
eq(publicationPrefetchDepth('focus'), 'target');

eq(startupAcquisitionPlan({}), {
  primeCatalog: true, catalogConcurrency: 4, warmPublicationRemainder: true, publicationConcurrency: 2,
});
eq(startupAcquisitionPlan({ effectiveType: '4g' }), startupAcquisitionPlan({}));
eq(startupAcquisitionPlan({ effectiveType: '3g' }), {
  primeCatalog: true, catalogConcurrency: 2, warmPublicationRemainder: true, publicationConcurrency: 1,
});
eq(startupAcquisitionPlan({ effectiveType: '2g' }), {
  primeCatalog: false, catalogConcurrency: 0, warmPublicationRemainder: false, publicationConcurrency: 1,
});
eq(startupAcquisitionPlan({ effectiveType: 'slow-2g' }), startupAcquisitionPlan({ effectiveType: '2g' }));
eq(startupAcquisitionPlan({ saveData: true, effectiveType: '4g' }), startupAcquisitionPlan({ effectiveType: '2g' }));

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
eq(maxActive, 2);
eq(starts.slice(0, 2), [1, 2]);
eq(bounded.map((x) => x.value), [2, 4, 6, 8, 10]);

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
const p1 = primer.prime({ slug: 'book', chapter: 'two', intent: 'route' });
const p2 = primer.prime({ slug: 'book', chapter: 'two', intent: 'route' });
eq(p1, p2);
const result = await p1;
eq(result.first, 'two');
eq(result.loaded, 4);
eq(result.failed, 0);
eq(result.deferred, 0);
eq(result.depth, 'publication');
eq(calls[0], 'readme:book');
eq(calls[1], 'start:two');
eq(calls[2], 'done:two');
eq(calls.filter((x) => x.startsWith('start:')).slice(0, 3), ['start:two', 'start:three', 'start:one']);
eq(peak, 2);

const hoverCalls = [];
const hoverPrimer = createStartupPublicationPrimer({
  loadReadme: async () => '# readme',
  parseReadme: () => ({ contents }),
  loadChapter: async (_slug, row) => { hoverCalls.push(row.id); return row.file; },
  concurrency: 2,
});
const hoverResult = await hoverPrimer.prime({ slug: 'hover-book', chapter: 'three', intent: 'hover' });
eq(hoverCalls, ['three']);
eq(hoverResult.loaded, 1);
eq(hoverResult.deferred, 3);
eq(hoverResult.depth, 'target');
const activateResult = await hoverPrimer.prime({ slug: 'hover-book', chapter: 'three', intent: 'activate' });
eq(hoverCalls, ['three', 'three', 'two', 'front', 'one']);
eq(activateResult.loaded, 4);
eq(activateResult.deferred, 0);
eq(activateResult.depth, 'publication');

const focusCalls = [];
const focusPrimer = createStartupPublicationPrimer({
  loadReadme: async () => '# readme',
  parseReadme: () => ({ contents }),
  loadChapter: async (_slug, row) => { focusCalls.push(row.id); return row.file; },
});
const focusResult = await focusPrimer.prime({ slug: 'focus-book', chapter: 'one', intent: 'focus' });
eq(focusCalls, ['one']);
eq(focusResult.depth, 'target');
eq(focusResult.deferred, 3);

const constrainedCalls = [];
const constrainedPrimer = createStartupPublicationPrimer({
  loadReadme: async () => '# readme',
  parseReadme: () => ({ contents }),
  loadChapter: async (_slug, row) => { constrainedCalls.push(row.id); return row.file; },
  warmRemainder: false,
});
const constrainedResult = await constrainedPrimer.prime({ slug: 'book', chapter: 'three', intent: 'activate' });
eq(constrainedCalls, ['three']);
eq(constrainedResult.loaded, 1);
eq(constrainedResult.failed, 0);
eq(constrainedResult.deferred, 3);
eq(constrainedResult.first, 'three');
eq(constrainedResult.depth, 'publication');

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
await assert.rejects(retryPrimer.prime({ slug: 'retry', chapter: 'one', intent: 'route' }));
assertions += 1;
const retry = await retryPrimer.prime({ slug: 'retry', chapter: 'one', intent: 'route' });
eq(retry.loaded, 1);
eq(retry.deferred, 0);
eq(attempts, 2);

const skipped = await primer.prime({});
eq(skipped.status, 'skipped');

console.log(`startup publication primer tests ok (${assertions} assertions)`);
