import assert from 'node:assert/strict';
import { createCooperativePaginationScheduler } from './pagination-scheduler.js';

let yields = 0;
const scheduler = createCooperativePaginationScheduler({
  yieldControl: async () => {
    yields += 1;
  },
});

const completed = await scheduler.run(['a', 'b', 'c', 'd'], (value, index) => `${index}:${value}`);
assert.equal(completed.status, 'complete');
assert.deepEqual(completed.values, ['0:a', '1:b', '2:c', '3:d']);
assert.equal(completed.completed, 4);
assert.equal(completed.yields, 3);
assert.equal(yields, 3);

const single = await scheduler.run(['only'], (value) => value.toUpperCase());
assert.equal(single.status, 'complete');
assert.deepEqual(single.values, ['ONLY']);
assert.equal(single.yields, 0);

const empty = await scheduler.run([], () => {
  throw new Error('empty run must not invoke work');
});
assert.equal(empty.status, 'complete');
assert.equal(empty.completed, 0);
assert.equal(empty.yields, 0);

let releaseFirstYield;
const firstYield = new Promise((resolve) => {
  releaseFirstYield = resolve;
});
let blockingYieldCalls = 0;
const latestWins = createCooperativePaginationScheduler({
  yieldControl: async () => {
    blockingYieldCalls += 1;
    if (blockingYieldCalls === 1) await firstYield;
  },
});

const staleWork = [];
const stalePromise = latestWins.run([1, 2, 3], (value) => {
  staleWork.push(value);
  return value;
});
await Promise.resolve();
assert.deepEqual(staleWork, [1]);

const freshPromise = latestWins.run(['fresh'], (value) => value);
releaseFirstYield();
const fresh = await freshPromise;
const stale = await stalePromise;
assert.equal(fresh.status, 'complete');
assert.deepEqual(fresh.values, ['fresh']);
assert.equal(stale.status, 'cancelled');
assert.deepEqual(stale.values, [1]);
assert.equal(stale.completed, 1);
assert.equal(stale.yields, 1);
assert.deepEqual(staleWork, [1]);

const cancelScheduler = createCooperativePaginationScheduler({ yieldControl: async () => {} });
const beforeCancel = cancelScheduler.generation;
cancelScheduler.cancel();
assert.equal(cancelScheduler.generation, beforeCancel + 1);

let resolveYield;
const cancellationYield = new Promise((resolve) => {
  resolveYield = resolve;
});
const explicit = createCooperativePaginationScheduler({
  yieldControl: async () => cancellationYield,
});
const explicitWork = [];
const explicitPromise = explicit.run(['x', 'y'], (value) => {
  explicitWork.push(value);
  return value;
});
await Promise.resolve();
explicit.cancel();
resolveYield();
const explicitResult = await explicitPromise;
assert.equal(explicitResult.status, 'cancelled');
assert.deepEqual(explicitWork, ['x']);
assert.equal(explicitResult.completed, 1);

console.log('pagination scheduler tests ok');
