import assert from 'node:assert/strict';
import {
  createAsyncResourceCache,
  resourceFailureKind,
  retryPauseMs,
} from './resource-cache.js';

const noPause = async () => {};
const cache = createAsyncResourceCache({ limit: 3, retryDelays: [0, 0], pause: noPause });
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
assert.equal(await cache.load('flaky', async () => {
  failures += 1;
  if (failures < 3) throw new TypeError('offline');
  return 'recovered';
}), 'recovered');
assert.equal(failures, 3);
assert.equal(cache.has('flaky'), true);

let permanentCalls = 0;
const missing = Object.assign(new Error('missing'), { status: 404 });
await assert.rejects(cache.load('missing', async () => {
  permanentCalls += 1;
  throw missing;
}), /missing/);
assert.equal(permanentCalls, 1);
assert.equal(cache.has('missing'), false);

let serviceCalls = 0;
assert.equal(await cache.load('service', async () => {
  serviceCalls += 1;
  if (serviceCalls === 1) throw Object.assign(new Error('busy'), { status: 503 });
  return 'ready';
}), 'ready');
assert.equal(serviceCalls, 2);

let abortCalls = 0;
const aborted = Object.assign(new Error('cancelled'), { name: 'AbortError' });
await assert.rejects(cache.load('aborted', async () => {
  abortCalls += 1;
  throw aborted;
}), /cancelled/);
assert.equal(abortCalls, 1);

let terminalCalls = 0;
const terminal = createAsyncResourceCache({ retryDelays: [0], pause: noPause });
await assert.rejects(terminal.load('down', async () => {
  terminalCalls += 1;
  throw Object.assign(new Error('still down'), { status: 502 });
}), /still down/);
assert.equal(terminalCalls, 2);
assert.equal(terminal.has('down'), false);
assert.equal(await terminal.load('down', async () => 'later'), 'later');

let invalidatedCalls = 0;
let releaseRetry;
const invalidateCache = createAsyncResourceCache({
  retryDelays: [10],
  pause: () => new Promise((resolve) => { releaseRetry = resolve; }),
});
const invalidated = invalidateCache.load('stale', async () => {
  invalidatedCalls += 1;
  throw new TypeError('network');
});
await Promise.resolve();
await Promise.resolve();
assert.equal(invalidatedCalls, 1);
assert.equal(invalidateCache.invalidate('stale'), true);
releaseRetry();
await assert.rejects(invalidated, /network/);
assert.equal(invalidatedCalls, 1);

assert.equal(resourceFailureKind(new TypeError('network')), 'transient');
assert.equal(resourceFailureKind(new Error('application failure')), 'permanent');
assert.equal(resourceFailureKind(Object.assign(new Error('timeout'), { status: 408 })), 'transient');
assert.equal(resourceFailureKind(Object.assign(new Error('early'), { status: 425 })), 'transient');
assert.equal(resourceFailureKind(Object.assign(new Error('rate'), { status: 429 })), 'transient');
assert.equal(resourceFailureKind(Object.assign(new Error('server'), { status: 500 })), 'transient');
assert.equal(resourceFailureKind(Object.assign(new Error('forbidden'), { status: 403 })), 'permanent');
assert.equal(resourceFailureKind(Object.assign(new Error('gone'), { status: 410 })), 'permanent');
assert.equal(resourceFailureKind(aborted), 'abort');
assert.equal(retryPauseMs(140), 140);
assert.equal(retryPauseMs(140, { offline: true }), 1200);
assert.equal(retryPauseMs(5000, { offline: true }), 1800);

assert.equal(cache.invalidate('flaky'), true);
assert.equal(cache.has('flaky'), false);
cache.clear();
assert.equal(cache.size, 0);

const fallbackLimit = createAsyncResourceCache({ limit: 0, retryDelays: [], pause: noPause });
assert.equal(fallbackLimit.limit, 256);

console.log('resource cache tests ok');
