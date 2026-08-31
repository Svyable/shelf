import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./offline-storage-budget.js', import.meta.url), 'utf8');
const context = { Promise, Date };
context.globalThis = context;
vm.runInNewContext(source, context);
const { storagePressure, warmDecision, createBudgetMonitor } = context.BookselfOfflineStorageBudget;

test('storage pressure normalizes quota usage and remaining bytes', () => {
  const value = storagePressure({ usage: 80, quota: 100 });
  assert.equal(value.known, true);
  assert.equal(value.ratio, 0.8);
  assert.equal(value.remaining, 20);
});

test('unknown or unusable estimates fail open for foreground safety', () => {
  assert.equal(storagePressure(null).known, false);
  assert.equal(storagePressure({ usage: 1, quota: 0 }).known, false);
  assert.equal(warmDecision(null, 'media').allow, true);
  assert.equal(warmDecision({ usage: 10, quota: 0 }, 'chapter').allow, true);
});

test('media warming yields earlier than chapter warming under pressure', () => {
  const estimate = { usage: 84, quota: 100 };
  const media = warmDecision(estimate, 'media');
  const chapter = warmDecision(estimate, 'chapter');
  assert.equal(media.allow, false);
  assert.equal(media.reason, 'pressure');
  assert.equal(media.threshold, 0.8);
  assert.equal(chapter.allow, true);
  assert.equal(chapter.reason, 'headroom');
  assert.equal(chapter.threshold, 0.92);
});

test('chapter warming stops before quota exhaustion', () => {
  assert.equal(warmDecision({ usage: 91, quota: 100 }, 'chapter').allow, true);
  assert.equal(warmDecision({ usage: 92, quota: 100 }, 'chapter').allow, false);
  assert.equal(warmDecision({ usage: 99, quota: 100 }, 'chapter').allow, false);
});

test('other warming uses the middle headroom threshold', () => {
  assert.equal(warmDecision({ usage: 85, quota: 100 }, 'other').allow, true);
  assert.equal(warmDecision({ usage: 86, quota: 100 }, 'other').allow, false);
});

test('budget monitor coalesces concurrent storage estimates', async () => {
  let calls = 0;
  let resolveEstimate;
  const gate = new Promise((resolve) => { resolveEstimate = resolve; });
  const monitor = createBudgetMonitor({ estimate: async () => { calls += 1; await gate; return { usage: 20, quota: 100 }; }, ttlMs: 1000, now: () => 10 });
  const first = monitor.canWarm('media');
  const second = monitor.canWarm('chapter');
  resolveEstimate();
  assert.equal((await first).allow, true);
  assert.equal((await second).allow, true);
  assert.equal(calls, 1);
});

test('budget monitor reuses fresh estimates and refreshes expired ones', async () => {
  let now = 0;
  let calls = 0;
  const monitor = createBudgetMonitor({ estimate: async () => ({ usage: ++calls * 10, quota: 100 }), ttlMs: 50, now: () => now });
  assert.equal((await monitor.canWarm('media')).usage, 10);
  now = 25;
  assert.equal((await monitor.canWarm('media')).usage, 10);
  assert.equal(calls, 1);
  now = 80;
  assert.equal((await monitor.canWarm('media')).usage, 20);
  assert.equal(calls, 2);
});

test('invalid estimator failure fails open and can recover later', async () => {
  let calls = 0;
  const monitor = createBudgetMonitor({ estimate: async () => { calls += 1; if (calls === 1) throw new Error('estimate unavailable'); return { usage: 95, quota: 100 }; }, ttlMs: 0, now: () => calls });
  assert.equal((await monitor.canWarm('media')).allow, true);
  assert.equal((await monitor.canWarm('media')).allow, false);
  assert.equal(calls, 2);
});

console.log('offline storage budget tests ok (24 assertions)');
