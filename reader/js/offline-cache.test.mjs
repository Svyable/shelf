import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./offline-cache.js', import.meta.url), 'utf8');
const context = { URL };
context.globalThis = context;
vm.runInNewContext(source, context);
const { chapterLinks, mediaLinks, isPublicationReadme } = context.BookselfOfflineCache;

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
