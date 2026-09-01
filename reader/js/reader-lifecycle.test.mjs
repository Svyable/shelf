import test from 'node:test';
import assert from 'node:assert/strict';
import {
  lifecycleResumePlan,
  readingLifecycleSnapshot,
} from './viewport-stability.js';

const route = { view: 'read', slug: 'book', chapter: 'two', offset: 420 };
const viewport = { width: 390, height: 844 };

function capture(overrides = {}) {
  return readingLifecycleSnapshot({
    route,
    stage: 'read',
    mode: 'paged',
    viewport,
    at: 1000,
    ...overrides,
  });
}

test('captures canonical source identity rather than a viewport/page index', () => {
  const saved = capture();
  assert.equal(saved.identity, 'book:two:420');
  assert.equal(saved.slug, 'book');
  assert.equal(saved.chapter, 'two');
  assert.equal(saved.offset, 420);
  assert.equal(saved.mode, 'paged');
});

test('ignores lifecycle capture outside a canonical read route', () => {
  assert.equal(capture({ stage: 'library' }), null);
  assert.equal(capture({ route: { view: 'cover', slug: 'book' } }), null);
  assert.equal(capture({ route: { view: 'read', slug: 'book' } }), null);
});

test('fresh visibility return avoids unnecessary repagination', () => {
  const saved = capture();
  const plan = lifecycleResumePlan(saved, saved, {
    now: 5000,
    viewport,
  });
  assert.equal(plan.resume, false);
  assert.equal(plan.repaginate, false);
  assert.equal(plan.resyncRoute, false);
  assert.equal(plan.reason, 'fresh');
});

test('BFCache restore always refreshes geometry and canonical route ownership', () => {
  const saved = capture();
  const plan = lifecycleResumePlan(saved, saved, {
    persisted: true,
    now: 5000,
    viewport,
  });
  assert.equal(plan.resume, true);
  assert.equal(plan.repaginate, true);
  assert.equal(plan.resyncRoute, true);
  assert.equal(plan.reason, 'bfcache');
});

test('long suspension resynchronizes source position without gratuitous reflow', () => {
  const saved = capture();
  const plan = lifecycleResumePlan(saved, saved, {
    now: 32000,
    viewport,
  });
  assert.equal(plan.resume, true);
  assert.equal(plan.repaginate, false);
  assert.equal(plan.resyncRoute, true);
  assert.equal(plan.reason, 'stale');
});

test('orientation or material viewport drift requests repagination', () => {
  const saved = capture();
  const plan = lifecycleResumePlan(saved, saved, {
    now: 2000,
    viewport: { width: 844, height: 390 },
  });
  assert.equal(plan.resume, true);
  assert.equal(plan.repaginate, true);
  assert.equal(plan.reason, 'geometry');
});

test('route changes invalidate a suspended snapshot instead of pulling the reader backward', () => {
  const saved = capture();
  const current = { ...saved, identity: 'book:three:0', chapter: 'three', offset: 0 };
  const plan = lifecycleResumePlan(saved, current, {
    persisted: true,
    now: 4000,
    viewport,
  });
  assert.equal(plan.resume, false);
  assert.equal(plan.reason, 'route-changed');
});

test('continuous reading shares the same canonical lifecycle contract', () => {
  const saved = capture({ mode: 'scroll', viewport: { width: 820, height: 1180 }, at: 7 });
  assert.equal(saved.mode, 'scroll');
  const smallChromeDrift = lifecycleResumePlan(saved, saved, {
    now: 8,
    viewport: { width: 800, height: 1160 },
  });
  assert.equal(smallChromeDrift.resume, false);

  const meaningfulDrift = lifecycleResumePlan(saved, saved, {
    now: 8,
    viewport: { width: 770, height: 1160 },
  });
  assert.equal(meaningfulDrift.resume, true);
  assert.equal(meaningfulDrift.repaginate, true);
});
