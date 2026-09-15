import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseBookReadme, parseFrontMatterMeta } from './catalog.js';

const source = await readFile(process.argv[2] || new URL('./app.js', import.meta.url), 'utf8');
const start = source.indexOf('async function loadBook(slug)');
const end = source.indexOf('async function fetchRevision(slug)', start);
assert.ok(start >= 0 && end > start);
const createLoader = new Function('app', 'fetchDocument', 'parseBookReadme', 'parseFrontMatterMeta', 'fetchText', 'firstExisting', 'fetchRevision', `${source.slice(start, end)}; return loadBook;`);

async function load(readme, front) {
  const loader = createLoader({ books: new Map() }, async () => ({ text: readme }), parseBookReadme, parseFrontMatterMeta, async () => front, async () => null, async () => null);
  return loader('example');
}
const readme = `# The Correct Title

*The Correct Subtitle*

| | |
|---|---|
| **Authors** | Sven Hardy Benson |
| **Status** | Drafting |

- [x] [Front Matter](manuscript/00-front-matter.md)
`;
const book = await load(readme, '# Old Heading\n\n*Old Subtitle*\n\n**Sven Hardy Benson**\n\n© 2026 Sven Hardy Benson');
assert.equal(book.title, 'The Correct Title');
assert.equal(book.subtitle, 'The Correct Subtitle');
assert.equal(book.authors, 'Sven Hardy Benson');
assert.equal(book.year, '2026', 'numbered front matter must still supply its publication year');
const legacy = await load(readme.replace('*The Correct Subtitle*', ''), '# Old Heading\n\n*Legacy Subtitle*\n\n**Sven Hardy Benson**');
assert.equal(legacy.title, 'The Correct Title');
assert.equal(legacy.subtitle, 'Legacy Subtitle', 'older editions retain their subtitle fallback');
console.log('Cover loading: canonical title/subtitle/byline, numbered front matter, and legacy fallback passed.');
