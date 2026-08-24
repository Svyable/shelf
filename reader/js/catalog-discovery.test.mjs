import assert from 'node:assert/strict';
import { parseBookReadme } from './catalog.js';

const isbn = parseBookReadme(
  `# ISBN Book\n\n| **ISBN** | 978-0-385-53322-5 |\n`,
  'isbn-book'
);
assert.deepEqual(isbn.externalLinks, [
  { label: 'Open Library', url: 'https://openlibrary.org/isbn/9780385533225' },
]);

const doi = parseBookReadme(
  `# DOI Paper\n\n| **Format** | Paper |\n| **DOI** | 10.1234/example |\n`,
  'doi-paper'
);
assert.deepEqual(doi.externalLinks, [
  { label: 'DOI', url: 'https://doi.org/10.1234/example' },
]);

const explicit = parseBookReadme(
  `# Catalogued\n\n| **ISBN** | 978-0-385-53322-5 |\n| **DOI** | 10.1234/example |\n| **Find elsewhere** | [Open Library](https://openlibrary.org/books/OL1M/example) · [DOI](https://publisher.example/article) · [WorldCat](https://search.worldcat.org/example) |\n`,
  'catalogued'
);
assert.deepEqual(explicit.externalLinks, [
  { label: 'Open Library', url: 'https://openlibrary.org/books/OL1M/example' },
  { label: 'DOI', url: 'https://publisher.example/article' },
  { label: 'WorldCat', url: 'https://search.worldcat.org/example' },
]);

const aliases = [
  ['Thesis', 'paper'],
  ['Dissertation', 'paper'],
  ['Conference Proceedings', 'journal'],
  ['Chapbook', 'anthology'],
  ['Poetry Collection', 'anthology'],
  ['Manual', 'report'],
  ['Handbook', 'report'],
  ['Catalogue', 'report'],
  ['Pamphlet', 'report'],
];
for (const [label, normalized] of aliases) {
  const publication = parseBookReadme(`# ${label}\n\n| **Format** | ${label} |\n`, label.toLowerCase().replaceAll(' ', '-'));
  assert.equal(publication.format, normalized, label);
  assert.equal(publication.formatLabel, label, label);
}

console.log('catalog discovery tests ok');
