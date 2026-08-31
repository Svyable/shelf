import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./offline-shell-install.js', import.meta.url), 'utf8');
const context = { Promise, Set, Number, TypeError, Object, String };
context.globalThis = context;
vm.runInNewContext(source, context);
const {
  uniqueUrls,
  splitShell,
  normalizeConcurrency,
  cacheOptional,
  installShell,
} = context.BookselfOfflineShellInstall;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('uniqueUrls trims blanks and removes duplicates without reordering', () => {
  assert.deepEqual([...uniqueUrls([' ./a ', './b', './a', '', null, './c'])], ['./a', './b', './c']);
});

test('splitShell keeps only declared shell assets in the atomic core', () => {
  const groups = splitShell(['./', './index.html', './app.js', './extra.js', './extra.js'], [
    './', './index.html', './missing.js', './app.js', './',
  ]);
  assert.deepEqual([...groups.core], ['./', './index.html', './app.js']);
  assert.deepEqual([...groups.optional], ['./extra.js']);
  assert.equal(Object.isFrozen(groups), true);
  assert.equal(Object.isFrozen(groups.core), true);
  assert.equal(Object.isFrozen(groups.optional), true);
});

test('normalizeConcurrency uses a safe default and clamps worker count', () => {
  assert.equal(normalizeConcurrency(undefined), 4);
  assert.equal(normalizeConcurrency('bad'), 4);
  assert.equal(normalizeConcurrency(0), 4);
  assert.equal(normalizeConcurrency(1.9), 1);
  assert.equal(normalizeConcurrency(5), 5);
  assert.equal(normalizeConcurrency(99), 8);
});

test('cacheOptional tolerates individual failures and preserves successful writes', async () => {
  const calls = [];
  const cache = {
    async add(url) {
      calls.push(url);
      if (url === './broken.js') throw new Error('404');
    },
  };
  const result = await cacheOptional(cache, ['./a.js', './broken.js', './b.js', './a.js'], { concurrency: 2 });
  assert.equal(result.attempted, 3);
  assert.equal(result.cached, 2);
  assert.equal(result.failed.length, 1);
  assert.equal(result.failed[0].url, './broken.js');
  assert.deepEqual(calls.sort(), ['./a.js', './b.js', './broken.js']);
});

test('cacheOptional bounds concurrent cache writes', async () => {
  let active = 0;
  let maxActive = 0;
  const cache = {
    async add() {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await delay(5);
      active -= 1;
    },
  };
  const urls = Array.from({ length: 12 }, (_, index) => `./feature-${index}.js`);
  const result = await cacheOptional(cache, urls, { concurrency: 3 });
  assert.equal(result.attempted, 12);
  assert.equal(result.cached, 12);
  assert.equal(result.failed.length, 0);
  assert.equal(maxActive, 3);
});

test('cacheOptional rejects an invalid cache contract', async () => {
  await assert.rejects(cacheOptional({}, ['./a.js']), /Cache-like add/);
});

test('installShell keeps core installation atomic but makes enhancements best effort', async () => {
  const events = [];
  const cache = {
    async addAll(urls) {
      events.push(['core', ...urls]);
    },
    async add(url) {
      events.push(['optional', url]);
      if (url === './optional-broken.js') throw new Error('missing');
    },
  };
  const result = await installShell(
    cache,
    ['./', './index.html', './app.js', './optional-ok.js', './optional-broken.js'],
    ['./', './index.html', './app.js'],
    { concurrency: 2 }
  );
  assert.deepEqual(events[0], ['core', './', './index.html', './app.js']);
  assert.equal(result.core, 3);
  assert.equal(result.optionalAttempted, 2);
  assert.equal(result.optionalCached, 1);
  assert.equal(result.optionalFailed.length, 1);
  assert.equal(result.optionalFailed[0].url, './optional-broken.js');
});

test('installShell rejects when an atomic core asset fails', async () => {
  let optionalCalls = 0;
  const cache = {
    async addAll() {
      throw new Error('core unavailable');
    },
    async add() {
      optionalCalls += 1;
    },
  };
  await assert.rejects(
    installShell(cache, ['./', './feature.js'], ['./']),
    /core unavailable/
  );
  assert.equal(optionalCalls, 0);
});

test('installShell requires a nonempty core and complete cache contract', async () => {
  await assert.rejects(installShell({}, ['./'], ['./']), /Cache-like addAll/);
  const cache = { addAll: async () => {}, add: async () => {} };
  await assert.rejects(installShell(cache, ['./feature.js'], ['./missing.js']), /at least one core asset/);
});
