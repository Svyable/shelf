import assert from 'node:assert/strict';
import {
  bestTermWindow,
  foldSearchText,
  searchableMarkdown,
  searchBook,
  searchLibrary,
  searchTerms,
} from './search.js';

let assertions = 0;
function equal(actual, expected) { assert.equal(actual, expected); assertions += 1; }
function ok(value) { assert.ok(value); assertions += 1; }

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
      markdown: '# Punctuation\n\n“Reader—first” and reader-first should both feel familiar.\n\nThe café appears much later beside another reader.\n',
    },
  ],
};

{
  const projected = searchableMarkdown(book.chapters[0].markdown);
  ok(projected.text.includes('quiet reader'));
  ok(projected.text.includes('the visible label'));
  ok(projected.text.includes('second chapter'));
  ok(projected.text.includes('snake_case'));
  ok(projected.text.includes('a*b'));
  ok(!projected.text.includes('private-target'));
  ok(!projected.text.includes('**'));
  ok(!projected.text.includes('`'));
}

{
  const hits = searchBook(book, 'quiet reader');
  equal(hits.length, 1);
  equal(hits[0].chapter, 'ch01');
  equal(hits[0].offset, book.chapters[0].markdown.indexOf('quiet'));
  ok(hits[0].snippet.includes('quiet reader'));
  ok(hits[0].exact);
}

{
  const hits = searchBook(book, 'cafe light');
  equal(hits[0].chapter, 'ch01');
  equal(hits[0].offset, book.chapters[0].markdown.indexOf('café'));
}

{
  equal(searchBook(book, 'private-target').length, 0);
  equal(searchBook(book, 'visible label').length, 1);
  equal(searchBook(book, 'second chapter').length, 1);
  equal(searchBook(book, 'snake_case').length, 1);
  equal(searchBook(book, 'a*b').length, 1);
}

{
  equal(searchBook(book, 'reader-first').length, 2);
  equal(searchBook(book, 'reader—first').length, 2);
}

{
  const hits = searchBook(book, 'reader cafe');
  equal(hits.length, 2);
  equal(hits[0].chapter, 'ch01');
  ok(!hits[0].exact);
  ok(hits[0].snippet.includes('reader'));
  ok(hits[0].snippet.includes('café'));
}

{
  const hits = searchBook(book, 'light quiet');
  equal(hits.length, 1);
  equal(hits[0].chapter, 'ch01');
  equal(hits[0].offset, book.chapters[0].markdown.indexOf('quiet'));
}

{
  const window = bestTermWindow('alpha xx beta yyyyy alpha beta', ['alpha', 'beta']);
  equal(window.index, 20);
  equal(window.length, 10);
}

{
  const terms = searchTerms(' Café   READER cafe ');
  equal(terms.length, 2);
  equal(terms[0], 'cafe');
  equal(terms[1], 'reader');
}

{
  const libraryHits = searchLibrary([book], 'cafe');
  equal(libraryHits[0].type, 'book');
  equal(libraryHits[0].book.slug, 'search-fixture');
  ok(libraryHits.some((hit) => hit.type === 'passage'));
}

{
  const another = {
    ...book,
    slug: 'other',
    title: 'Other Volume',
    publisher: 'Café Archive',
    chapters: [{ id: 'only', title: 'Only', markdown: '# Only\n\nA reader mentions café in passing.' }],
  };
  const hits = searchLibrary([another, book], 'cafe reader');
  equal(hits[0].book.slug, 'search-fixture');
  equal(hits[0].type, 'book');
}

{
  const folded = foldSearchText('Café — “Reader”').folded;
  equal(folded, 'cafe - "reader"');
}

console.log(`search relevance tests ok (${assertions} assertions)`);
