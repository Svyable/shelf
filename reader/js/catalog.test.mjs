import { parsePortalCatalog, parsePortalStand, parseBookReadme, extractSection } from './catalog.js';
import assert from 'node:assert/strict';

const portal = `# bookself

## The books

| Book | Authors |
|------|---------|
| [The Example Book](books/the-example-book/) | @svyable |

To start one, copy [\`books/_TEMPLATE/\`](books/_TEMPLATE/) to \`books/<your-slug>/\`.

## The stand

- [QNTLab](https://qntlab.app/) — Build + Test = Run
- [Geek to Me](https://geektome.lovable.app/)

## How to take part
`;

const slugs = parsePortalCatalog(portal);
assert.deepEqual(slugs, ['the-example-book']);

const stand = parsePortalStand(portal);
assert.deepEqual(stand, [
  { title: 'QNTLab', url: 'https://qntlab.app/', note: 'Build + Test = Run', domain: 'qntlab.app' },
  { title: 'Geek to Me', url: 'https://geektome.lovable.app/', note: '', domain: 'geektome.lovable.app' },
]);

const empty = parsePortalCatalog(`# x\n\n## The books\n\nNo books yet.\n`);
assert.deepEqual(empty, []);
assert.deepEqual(parsePortalStand(`# x\n\n## The stand\n\nNothing here.\n`), []);

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

const pub = parseBookReadme(
  `# T\n\n| **Status** | Published |\n| **Publisher** | House |\n| **Edition** | Second |\n| **ISBN** | 978-1 |\n`,
  't'
);
assert.equal(pub.publisher, 'House');
assert.equal(pub.edition, 'Second');
assert.equal(pub.isbn, '978-1');

const paper = parseBookReadme(
  `# A Result\n\n| **Status** | Published |\n| **Format** | Whitepaper |\n| **Venue** | Example Lab |\n| **DOI** | 10.1234/example |\n`,
  'result'
);
assert.equal(paper.format, 'paper');
assert.equal(paper.formatLabel, 'Whitepaper');
assert.equal(paper.venue, 'Example Lab');
assert.equal(paper.doi, '10.1234/example');

const preprint = parseBookReadme(` # ignored\n`, 'x');
assert.equal(preprint.format, 'book');

const tagged = parseBookReadme(
  `# T\n\n| **Series** | Field Notes |\n| **Tags** | guide, git |\n`,
  't'
);
assert.equal(tagged.series, 'Field Notes');
assert.deepEqual(tagged.tags, ['guide', 'git']);

const drafting = parseBookReadme(`# T\n\n| **Status** | Drafting |\n`, 't');
assert.equal(drafting.published, false);

assert.ok(extractSection(portal, 'The books').includes('the-example-book'));
assert.ok(extractSection(portal, 'The stand').includes('QNTLab'));

console.log('catalog tests ok');
