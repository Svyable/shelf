import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./offline-cache.js', import.meta.url), 'utf8');
const context = { URL, Promise, TypeError };
context.globalThis = context;
vm.runInNewContext(source, context);
const {
  chapterLinks,
  mediaLinks,
  isPublicationReadme,
  publicationWarmPlan,
  createWarmScheduler,
} = context.BookselfOfflineCache;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('chapterLinks discovers publication markdown once and keeps repository boundaries', () => {
  const markdown = `
- [One](ch01-first.md)
- [Two](<ch02-second.md>)
- [Duplicate](ch01-first.md#middle)
- [Media](media/figure.png)
- [Outside](../other/README.md)
- [External](https://example.com/ch03.md)
  `;
  assert.deepEqual(
    [...chapterLinks(markdown, 'https://reader.test/books/demo/README.md')],
    [
      'https://reader.test/books/demo/ch01-first.md',
      'https://reader.test/books/demo/ch02-second.md',
    ]
  );
});

test('chapterLinks enforces a bounded warm-up list', () => {
  const markdown = Array.from({ length: 6 }, (_, i) => `[${i}](ch${i}.md)`).join('\n');
  assert.equal(chapterLinks(markdown, 'https://reader.test/books/demo/README.md', 3).length, 3);
});

test('mediaLinks discovers supported chapter figures without crossing publication boundaries', () => {
  const markdown = `
![Figure](../media/figure-1.png "Figure 1")
![Portrait](../media/portrait.webp#crop)
![Duplicate](../media/figure-1.png)
![External](https://cdn.example/figure.jpg)
![Other book](../../other/media/map.svg)
![Not media](../media/data.csv)
  `;
  assert.deepEqual(
    [...mediaLinks(
      markdown,
      'https://reader.test/books/demo/manuscript/ch01.md',
      'https://reader.test/books/demo/README.md'
    )],
    [
      'https://reader.test/books/demo/media/figure-1.png',
      'https://reader.test/books/demo/media/portrait.webp',
    ]
  );
});

test('mediaLinks enforces a bounded warm-up list', () => {
  const markdown = Array.from({ length: 6 }, (_, i) => `![${i}](media/${i}.jpg)`).join('\n');
  assert.equal(
    mediaLinks(markdown, 'https://reader.test/books/demo/ch01.md', 'https://reader.test/books/demo/README.md', 3).length,
    3
  );
});

test('isPublicationReadme accepts deployed book paths only', () => {
  assert.equal(isPublicationReadme('https://reader.test/bookself/books/demo/README.md'), true);
  assert.equal(isPublicationReadme('https://reader.test/books/demo/ch01.md'), false);
  assert.equal(isPublicationReadme('not a url'), false);
});

test('publication warm plan preserves full warming on unconstrained connections', () => {
  assert.deepEqual({ ...publicationWarmPlan({}) }, { warmChapters: true, warmMedia: true });
  assert.deepEqual(
    { ...publicationWarmPlan({ effectiveType: '4g' }) },
    { warmChapters: true, warmMedia: true }
  );
});

test('publication warm plan drops media on 3g and all speculative warming on constrained links', () => {
  assert.deepEqual(
    { ...publicationWarmPlan({ effectiveType: '3g' }) },
    { warmChapters: true, warmMedia: false }
  );
  assert.deepEqual(
    { ...publicationWarmPlan({ effectiveType: '2g' }) },
    { warmChapters: false, warmMedia: false }
  );
  assert.deepEqual(
    { ...publicationWarmPlan({ effectiveType: 'slow-2g' }) },
    { warmChapters: false, warmMedia: false }
  );
  assert.deepEqual(
    { ...publicationWarmPlan({ saveData: true, effectiveType: '4g' }) },
    { warmChapters: false, warmMedia: false }
  );
});

test('warm scheduler caps concurrent work and drains all queued jobs', async () => {
  const scheduler = createWarmScheduler({ concurrency: 3 });
  let active = 0;
  let maxActive = 0;
  const started = [];
  const jobs = Array.from({ length: 9 }, (_, index) => scheduler.run(`job-${index}`, async () => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    started.push(index);
    await delay(4 + (index % 3));
    active -= 1;
    return index * 2;
  }));

  assert.equal(scheduler.concurrency, 3);
  assert.equal(scheduler.pending, 9);
  assert.ok(scheduler.active <= 3);
  assert.ok(scheduler.queued >= 6);
  assert.deepEqual(await Promise.all(jobs), [0, 2, 4, 6, 8, 10, 12, 14, 16]);
  assert.equal(maxActive, 3);
  assert.deepEqual(started.slice(0, 3), [0, 1, 2]);
  assert.equal(scheduler.active, 0);
  assert.equal(scheduler.queued, 0);
  assert.equal(scheduler.pending, 0);
});

test('warm scheduler coalesces duplicate URL work into one promise', async () => {
  const scheduler = createWarmScheduler({ concurrency: 2 });
  let calls = 0;
  const first = scheduler.run('https://reader.test/books/demo/ch01.md', async () => {
    calls += 1;
    await delay(5);
    return 'cached';
  });
  const second = scheduler.run('https://reader.test/books/demo/ch01.md', async () => {
    calls += 1;
    return 'duplicate';
  });

  assert.strictEqual(first, second);
  assert.equal(scheduler.pending, 1);
  assert.equal(await second, 'cached');
  assert.equal(calls, 1);
  assert.equal(scheduler.pending, 0);
});

test('warm scheduler removes failed work so a transient request can retry', async () => {
  const scheduler = createWarmScheduler({ concurrency: 1 });
  let attempts = 0;
  await assert.rejects(scheduler.run('retryable', async () => {
    attempts += 1;
    throw new Error('transient');
  }), /transient/);
  assert.equal(attempts, 1);
  assert.equal(scheduler.pending, 0);
  assert.equal(await scheduler.run('retryable', async () => {
    attempts += 1;
    return 'recovered';
  }), 'recovered');
  assert.equal(attempts, 2);
});

test('warm scheduler clamps concurrency and rejects invalid jobs', async () => {
  assert.equal(createWarmScheduler({ concurrency: 0 }).concurrency, 1);
  assert.equal(createWarmScheduler({ concurrency: 99 }).concurrency, 8);
  const scheduler = createWarmScheduler();
  await assert.rejects(scheduler.run('', () => 1), /requires a key and task/);
  await assert.rejects(scheduler.run('x', null), /requires a key and task/);
});
