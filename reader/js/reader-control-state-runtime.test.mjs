import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readReaderRuntimeSource() {
  const shellSource = await readFile(new URL('./app.js', import.meta.url), 'utf8');
  return shellSource.includes('Shelf owns the public library and its release state.')
    ? readFile(new URL('./app-core.js', import.meta.url), 'utf8')
    : shellSource;
}

test('Reader preference controls keep visual and programmatic pressed state synchronized', async () => {
  const source = await readReaderRuntimeSource();

  assert.match(source, /nightLightBtn'\)\.setAttribute\('aria-pressed', String\(active\)\)/);
  assert.match(source, /focusBtn'\)\.setAttribute\('aria-pressed', String\(active\)\)/);
  assert.match(source, /document\.querySelectorAll\('\[data-paper\]'\)[\s\S]*?setAttribute\('aria-pressed', String\(active\)\)/);
  assert.match(source, /document\.querySelectorAll\('\[data-font\]'\)[\s\S]*?setAttribute\('aria-pressed', String\(active\)\)/);
  assert.match(source, /document\.querySelectorAll\('\[data-leading\]'\)[\s\S]*?setAttribute\('aria-pressed', String\(active\)\)/);
});

test('Reader bookmark, publication filter, and sort controls expose their active state', async () => {
  const source = await readReaderRuntimeSource();

  assert.match(source, /bookmarkBtn'\)\.setAttribute\('aria-pressed', String\(here\)\)/);
  assert.match(source, /btn\.setAttribute\('aria-pressed', String\(active\)\);\s*btn\.addEventListener\('click'/);
  assert.match(source, /b\.setAttribute\('aria-pressed', String\(active\)\)/);
});

test('Reader HTML does not claim the lamp is on before preferences load', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(html, /id="nightLightBtn" aria-pressed="false" aria-label="Lamp off">Off<\/button>/);
  assert.match(html, /id="focusBtn" aria-pressed="false">Focus mode<\/button>/);
  assert.match(html, /id="bookmarkBtn"[^>]*aria-pressed="false"/);
  assert.match(html, /data-sort="title" aria-pressed="true"/);
  assert.match(html, /data-sort="recent" aria-pressed="false"/);
});


test('Focus mode hides chrome only while reading', async () => {
  const css = await readFile(new URL('../css/style.css', import.meta.url), 'utf8');
  assert.match(css, /body\[data-stage="read"\]\.focus-mode \.app-header/);
  assert.match(css, /body\[data-stage="read"\]\.focus-mode:hover \.app-header/);
  assert.doesNotMatch(css, /(^|\n)body\.focus-mode \.app-header/);
});
