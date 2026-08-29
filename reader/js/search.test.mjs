import assert from 'node:assert/strict';
import {
  foldSearchText,
  searchableMarkdown,
  searchBook,
  searchLibrary,
} from './search.js';

const book = {
  slug: 'search-fixture',
  title: 'The Café Reader',
  authors: 'A. Example',
  publisher: 'Plain Press',
  chapters: [
    {
      id: 'ch01',
      title: 'Formatting',
      markdown: '# Formatting\n\nA quiet **reader** follows the café light. Read [the visible label](https://example.com/private-target) without leaving the page.\n\nA [[ch02|second chapter]] waits nearby.\n\nUse `snake_case` and `a*b` literally.\n',
    },
    {
      id: 'ch02',
      title: 'Punctuation',
      markdown: '# Punctuation\n\n“Reader—first” and reader-first should both feel familiar.\n',
    },
  ],
};

{
  const projected = searchableMarkdown(book.chapters[0].markdown);
  assert.ok(projected.text.includes('quiet reader'));
  assert.ok(projected.text.includes('the visible label'));
  assert.ok(projected.text.includes('second chapter'));
  assert.ok(projected.text.includes('snake_case'));
  assert.ok(projected.text.includes('a*b'));
  assert.ok(!projected.text.includes('private-target'));
  assert.ok(!projected.text.includes('**'));
  assert.ok(!projected.text.includes('`'));
}

{
  const hits = searchBook(book, 'quiet reader');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].chapter, 'ch01');
  assert.equal(hits[0].offset, book.chapters[0].markdown.indexOf('quiet'));
  assert.ok(hits[0].snippet.includes('quiet reader'));
  assert.ok(!hits[0].snippet.includes('**'));
}

{
  const hits = searchBook(book, 'cafe light');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].offset, book.chapters[0].markdown.indexOf('café'));
}

{
  assert.equal(searchBook(book, 'private-target').length, 0);
  assert.equal(searchBook(book, 'visible label').length, 1);
  assert.equal(searchBook(book, 'second chapter').length, 1);
  assert.equal(searchBook(book, 'snake_case').length, 1);
  assert.equal(searchBook(book, 'a*b').length, 1);
}

{
  assert.equal(searchBook(book, 'reader-first').length, 2);
  assert.equal(searchBook(book, 'reader—first').length, 2);
}

{
  const libraryHits = searchLibrary([book], 'cafe');
  assert.equal(libraryHits[0].type, 'book');
  assert.equal(libraryHits[0].book.slug, 'search-fixture');
  assert.ok(libraryHits.some((hit) => hit.type === 'passage'));
}

{
  const folded = foldSearchText('Café — “Reader”').folded;
  assert.equal(folded, 'cafe - "reader"');
}

console.log('search: render-aware matching and source offsets OK');
