import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./offline-cache.js', import.meta.url), 'utf8');
const context = { URL };
context.globalThis = context;
vm.runInNewContext(source, context);
const { chapterLinks, isPublicationReadme } = context.BookselfOfflineCache;

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

test('isPublicationReadme accepts deployed book paths only', () => {
  assert.equal(isPublicationReadme('https://reader.test/bookself/books/demo/README.md'), true);
  assert.equal(isPublicationReadme('https://reader.test/books/demo/ch01.md'), false);
  assert.equal(isPublicationReadme('not a url'), false);
});
