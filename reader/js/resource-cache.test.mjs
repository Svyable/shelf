import assert from 'node:assert/strict';
import { createAsyncResourceCache } from './resource-cache.js';

const cache = createAsyncResourceCache({ limit: 3 });
assert.equal(cache.limit, 3);
assert.equal(cache.size, 0);

let loads = 0;
let release;
const pending = cache.load('chapter-a', async () => {
  loads += 1;
  await new Promise((resolve) => { release = resolve; });
  return Object.freeze({ text: 'A' });
});
const duplicate = cache.load('chapter-a', async () => {
  loads += 100;
  return { text: 'wrong' };
});
assert.equal(pending, duplicate);
assert.equal(loads, 0);
await Promise.resolve();
assert.equal(loads, 1);
assert.equal(cache.size, 1);
release();
const first = await pending;
assert.equal(first.text, 'A');
assert.equal(await cache.load('chapter-a', async () => ({ text: 'wrong' })), first);
assert.equal(loads, 1);

cache.load('chapter-b', async () => 'B');
cache.load('chapter-c', async () => 'C');
await Promise.all([cache.get('chapter-b'), cache.get('chapter-c')]);
assert.equal(cache.size, 3);
assert.equal(await cache.get('chapter-a'), first);

await cache.load('chapter-d', async () => 'D');
assert.equal(cache.size, 3);
assert.equal(cache.has('chapter-b'), false);
assert.equal(cache.has('chapter-a'), true);
assert.equal(cache.has('chapter-c'), true);
assert.equal(cache.has('chapter-d'), true);

let failures = 0;
await assert.rejects(
  cache.load('flaky', async () => {
    failures += 1;
    throw new Error('offline');
  }),
  /offline/
);
assert.equal(cache.has('flaky'), false);
assert.equal(await cache.load('flaky', async () => {
  failures += 1;
  return 'recovered';
}), 'recovered');
assert.equal(failures, 2);

assert.equal(cache.invalidate('chapter-a'), true);
assert.equal(cache.has('chapter-a'), false);
cache.clear();
assert.equal(cache.size, 0);

const fallbackLimit = createAsyncResourceCache({ limit: 0 });
assert.equal(fallbackLimit.limit, 256);

console.log('resource cache tests ok');
