import assert from 'node:assert/strict';
import {
  catalogCoverCandidates,
  createStartupCatalogPrimer,
  runCatalogPrimer,
} from './startup-catalog-primer.js';

let checks = 0;
const check = (actual, expected, message) => {
  assert.deepEqual(actual, expected, message);
  checks += 1;
};

check(catalogCoverCandidates('demo'), [
  'books/demo/media/cover.png',
  'books/demo/media/cover.jpg',
  'books/demo/media/cover.webp',
  'books/demo/media/cover.jpeg',
], 'cover candidates match canonical Reader order');

let active = 0;
let maxActive = 0;
const started = [];
const settled = await runCatalogPrimer(['a', 'b', 'c', 'd', 'e', 'f'], async (slug) => {
  active += 1;
  maxActive = Math.max(maxActive, active);
  started.push(slug);
  await new Promise((resolve) => setTimeout(resolve, slug === 'a' ? 15 : 2));
  active -= 1;
  return slug.toUpperCase();
}, 3);
check(maxActive, 3, 'bounded worker never exceeds configured concurrency');
check(settled.map((row) => row.value), ['A', 'B', 'C', 'D', 'E', 'F'], 'results preserve portal order');
check(started.slice(0, 3), ['a', 'b', 'c'], 'FIFO lanes begin with the first portal entries');

const failures = await runCatalogPrimer(['ok', 'bad', 'after'], async (slug) => {
  if (slug === 'bad') throw new Error('bad hub');
  return slug;
}, 2);
check(failures[0].status, 'fulfilled', 'successful entry is fulfilled');
check(failures[1].status, 'rejected', 'one bad publication is isolated');
check(failures[2].value, 'after', 'later publications still warm after a failure');
check(await runCatalogPrimer([], async () => 'unused', 4), [], 'empty catalog performs no work');

const events = [];
let portalCalls = 0;
let releasePortal;
const portalGate = new Promise((resolve) => { releasePortal = resolve; });
const primer = createStartupCatalogPrimer({
  loadPortal: async () => {
    portalCalls += 1;
    await portalGate;
    return 'portal';
  },
  parsePortal: () => ['published', 'draft'],
  loadHub: async (slug) => {
    events.push(`hub:${slug}`);
    return slug;
  },
  parseHub: (hub) => ({ published: hub === 'published' }),
  loadCover: async (slug) => {
    events.push(`cover:${slug}`);
    return `${slug}.png`;
  },
  concurrency: 2,
});
const first = primer.prime();
const second = primer.prime();
check(first, second, 'overlapping prime calls share one active promise');
check(portalCalls, 1, 'overlapping prime calls load the portal once');
releasePortal();
const primed = await first;
check(primed.length, 2, 'all portal publications are represented');
check(events.includes('cover:published'), true, 'published publication cover is warmed');
check(events.includes('cover:draft'), false, 'draft cover is not warmed');

await primer.prime();
check(portalCalls, 2, 'completed primer can run again for a fresh catalog');

console.log(`startup catalog primer tests ok (${checks} assertions)`);
