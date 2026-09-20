import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('library search invalidates older async requests whenever the query changes', async () => {
  const source = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  assert.match(source, /let librarySearchSequence = 0;/);
  assert.match(source, /async function runLibrarySearch\(query\) \{\s*const requestId = \+\+librarySearchSequence;/);
  assert.match(source, /await Promise\.all\([\s\S]*?if \(requestId !== librarySearchSequence\) return;/);
  assert.match(source, /const hits = searchLibrary\(books, q\);\s*if \(requestId !== librarySearchSequence\) return;/);
});

test('short queries still invalidate an in-flight longer search before returning', async () => {
  const source = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  const start = source.indexOf('async function runLibrarySearch(query)');
  const end = source.indexOf('function runSearch(query)', start);
  const block = source.slice(start, end);
  assert.ok(block.indexOf('const requestId = ++librarySearchSequence;') < block.indexOf('if (q.length < 2)'));
});


test('library search clears visibly stale results while the newest query loads', async () => {
  const source = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  assert.match(source, /box\.setAttribute\('aria-busy', 'true'\)/);
  assert.match(source, /box\.innerHTML = '<li>Searching…<\/li>'/);
  assert.match(source, /box\.removeAttribute\('aria-busy'\);\s*box\.innerHTML = '';/);

  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="libraryHits" aria-live="polite" hidden/);
});


test('concurrent book loads share one in-flight promise and failures remain retryable', async () => {
  const source = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  assert.match(source, /const bookLoads = new Map\(\)/);
  assert.match(source, /if \(bookLoads\.has\(slug\)\) return bookLoads\.get\(slug\)/);
  assert.match(source, /bookLoads\.set\(slug, task\)/);
  assert.match(source, /return await task;\s*\} finally \{\s*if \(bookLoads\.get\(slug\) === task\) bookLoads\.delete\(slug\)/);
});
