import { catalogEntryVisible, parsePortalCatalog, parsePortalWebShelf, parsePortalStand, parseBookReadme, extractSection } from './catalog.js';
import assert from 'node:assert/strict';

const portal = `# bookself

## The books

| Book | Authors |
|------|---------|
| [The Example Book](books/the-example-book/) | @svyable |

To start one, copy [\`books/_TEMPLATE/\`](books/_TEMPLATE/) to \`books/<your-slug>/\`.

## The web shelf

- [QNTLab](https://qntlab.app/) — Build + Test = Run

## The stand

- [Geek to Me](https://geektome.lovable.app/)

## How to take part
`;

const slugs = parsePortalCatalog(portal);
assert.deepEqual(slugs, ['the-example-book']);

const webShelf = parsePortalWebShelf(portal);
assert.deepEqual(webShelf, [
  { title: 'QNTLab', url: 'https://qntlab.app/', note: 'Build + Test = Run', domain: 'qntlab.app' },
]);

const stand = parsePortalStand(portal);
assert.deepEqual(stand, [
  { title: 'Geek to Me', url: 'https://geektome.lovable.app/', note: '', domain: 'geektome.lovable.app' },
]);

const empty = parsePortalCatalog(`# x\n\n## The books\n\nNo books yet.\n`);
assert.deepEqual(empty, []);
assert.deepEqual(parsePortalWebShelf(`# x\n\n## The web shelf\n\nNothing here.\n`), []);
assert.deepEqual(parsePortalStand(`# x\n\n## The stand\n\nNothing here.\n`), []);

const aliases = parsePortalWebShelf(`## Web volumes\n\n- [Lab](https://www.example.org/path) - A useful site\n`);
assert.deepEqual(aliases, [
  { title: 'Lab', url: 'https://www.example.org/path', note: 'A useful site', domain: 'example.org' },
]);

const deduped = parsePortalWebShelf(`## The web shelf\n\n- [One](https://example.com/)\n- [Again](https://example.com/)\n`);
assert.equal(deduped.length, 1);

const mixed = parsePortalCatalog(`## The books

- [Draft](books/secret-draft/)
- [Live](books/live-title/)
`);
assert.deepEqual(mixed, ['secret-draft', 'live-title']);

const hub = `# River Book

| | |
|---|---|
| **Authors**   | @ada |
| **Status**    | Published |
| **Rights** | © 2026 Ada · All Rights Reserved |
| **AI use** | Training, RAG, AI indexing, and generative reuse reserved |
| **Rights file** | [RIGHTS.md](RIGHTS.md) |
| **Chapters**  | 1 of 2 drafted |

## Contents

- [x] [Front Matter](manuscript/front-matter.md)
- [ ] [Ch 1 — Current](manuscript/ch01-current.md)
`;

const book = parseBookReadme(hub, 'river-book');
assert.equal(book.title, 'River Book');
assert.equal(book.authors, '@ada');
assert.equal(book.status, 'Published');
assert.equal(book.published, true);
assert.equal(book.format, 'book');
assert.equal(book.formatLabel, 'Book');
assert.equal(book.contents.length, 2);
assert.equal(book.contents[0].id, 'front-matter');
assert.equal(book.contents[1].id, 'ch01-current');
assert.equal(book.publisher, '');
assert.equal(book.rights, '© 2026 Ada · All Rights Reserved');
assert.equal(book.aiUse, 'Training, RAG, AI indexing, and generative reuse reserved');
assert.equal(book.rightsFile, '[RIGHTS.md](RIGHTS.md)');
assert.deepEqual(book.authorLinks, []);
assert.deepEqual(book.externalLinks, []);

const pub = parseBookReadme(
  `# T\n\n| **Status** | Published |\n| **Publisher** | House |\n| **Edition** | Second |\n| **ISBN** | 978-1 |\n`,
  't'
);
assert.equal(pub.publisher, 'House');
assert.equal(pub.edition, 'Second');
assert.equal(pub.isbn, '978-1');
assert.equal(pub.rights, 'All Rights Reserved');
assert.equal(pub.aiUse, 'AI training and generative use reserved');
assert.equal(pub.rightsFile, '[RIGHTS.md](RIGHTS.md)');

const paper = parseBookReadme(
  `# A Result\n\n| **Status** | Published |\n| **Format** | Whitepaper |\n| **Venue** | Example Lab |\n| **DOI** | 10.1234/example |\n`,
  'result'
);
assert.equal(paper.format, 'paper');
assert.equal(paper.formatLabel, 'Whitepaper');
assert.equal(paper.venue, 'Example Lab');
assert.equal(paper.doi, '10.1234/example');

const preprint = parseBookReadme(`# Early Result\n\n| **Format** | Preprint |\n`, 'early-result');
assert.equal(preprint.format, 'paper');
assert.equal(preprint.formatLabel, 'Preprint');

const magazine = parseBookReadme(
  `# Field & Form\n\n| **Format** | Magazine |\n| **Volume** | 2 |\n| **Issue** | 7 |\n| **Publication date** | 2026-08-24 |\n| **ISSN** | 1234-5678 |\n`,
  'field-and-form'
);
assert.equal(magazine.format, 'magazine');
assert.equal(magazine.volume, '2');
assert.equal(magazine.issue, '7');
assert.equal(magazine.publicationDate, '2026-08-24');
assert.equal(magazine.issn, '1234-5678');

const newspaper = parseBookReadme(`# Morning Ledger\n\n| **Format** | Newspaper |\n`, 'morning-ledger');
assert.equal(newspaper.format, 'newspaper');
assert.equal(newspaper.formatLabel, 'Newspaper');

const linked = parseBookReadme(
  `# Linked Book\n\n| **Authors** | [Ada Example](https://example.com/ada) |\n| **Author Links** | [Goodreads](https://goodreads.com/ada) |\n| **Links** | [Amazon](https://amazon.com/example) · [WorldCat](https://worldcat.org/example) |\n| **Find elsewhere** | [Open Library](https://openlibrary.org/example) · [WorldCat](https://worldcat.org/example) |\n`,
  'linked-book'
);
assert.equal(linked.authors, 'Ada Example');
assert.deepEqual(linked.authorLinks, [
  { label: 'Ada Example', url: 'https://example.com/ada' },
  { label: 'Goodreads', url: 'https://goodreads.com/ada' },
]);
assert.deepEqual(linked.externalLinks, [
  { label: 'Amazon', url: 'https://amazon.com/example' },
  { label: 'WorldCat', url: 'https://worldcat.org/example' },
  { label: 'Open Library', url: 'https://openlibrary.org/example' },
]);

const tagged = parseBookReadme(
  `# T\n\n| **Series** | Field Notes |\n| **Tags** | guide, git |\n`,
  't'
);
assert.equal(tagged.series, 'Field Notes');
assert.deepEqual(tagged.tags, ['guide', 'git']);

const drafting = parseBookReadme(`# T\n\n| **Status** | Drafting |\n`, 't');
assert.equal(drafting.published, false);
assert.equal(catalogEntryVisible(book, 'shelf'), true);
assert.equal(catalogEntryVisible(drafting, 'shelf'), false);
assert.equal(catalogEntryVisible(drafting, 'desk'), true);
assert.equal(catalogEntryVisible(drafting, 'DESK'), true);
assert.equal(drafting.published, false);

assert.ok(extractSection(portal, 'The books').includes('the-example-book'));
assert.ok(extractSection(portal, 'The web shelf').includes('QNTLab'));
assert.ok(extractSection(portal, 'The stand').includes('Geek to Me'));

console.log('catalog tests ok');