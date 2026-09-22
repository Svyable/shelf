import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

async function readerAppSource() {
  const shelfCore = new URL('./app-core.js', import.meta.url);
  try {
    await access(shelfCore);
    return readFile(shelfCore, 'utf8');
  } catch {
    return readFile(new URL('./app.js', import.meta.url), 'utf8');
  }
}

test('Reader blob downloads stay attached long enough for browsers to consume them', async () => {
  const source = await readFile(new URL('./export.js', import.meta.url), 'utf8');
  assert.match(source, /export function downloadBlob\(filename, blob\)/);
  assert.match(source, /const url = URL\.createObjectURL\(blob\)/);
  assert.match(source, /document\.body\.appendChild\(a\)/);
  assert.match(source, /a\.click\(\)/);
  assert.match(source, /a\.remove\(\)/);
  assert.match(source, /window\.setTimeout\(\(\) => URL\.revokeObjectURL\(url\), 1000\)/);
  assert.doesNotMatch(source, /URL\.revokeObjectURL\(a\.href\)/);
});

test('Markdown, HTML, notes, and quote cards share the durable download helper', async () => {
  const exportSource = await readFile(new URL('./export.js', import.meta.url), 'utf8');
  const appSource = await readerAppSource();

  assert.match(exportSource, /downloadBlob\(filename, new Blob\(\[text\], \{ type \}\)\)/);
  assert.match(appSource, /import \{ bookAsMarkdown, bookAsHtml, downloadBlob, downloadText \} from '\.\/export\.js'/);
  assert.match(appSource, /downloadBlob\(`\$\{book\.slug\}-quote\.png`, blob\)/);
  assert.match(appSource, /downloadBlob\(\s*`\$\{app\.book\.slug\}-notes\.md`/);
  assert.doesNotMatch(appSource, /URL\.revokeObjectURL\(a\.href\)/);
});
