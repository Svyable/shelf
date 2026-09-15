import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { isTitlePageChapter } from './title-page.js';

test('recognizes ordinary and numbered front matter', () => {
  assert.equal(isTitlePageChapter({ id: 'front-matter', title: 'Front Matter' }, {}), true);
  assert.equal(isTitlePageChapter({ id: '00-front-matter', title: 'Opening' }, {}), true);
});

test('recognizes an embedded canonical title page only when it opens the book', () => {
  const first = {
    id: 'book',
    title: 'Complete manuscript',
    markdown: '# Synthetic Intelligence\n\n*Subtitle*\n\n**Sven Hardy Benson**\n\n---\n\nOpening',
  };
  const second = { id: 'chapter-two', title: 'Chapter Two', markdown: first.markdown };
  const book = { title: 'Synthetic Intelligence', authors: 'Sven Hardy Benson', chapters: [first, second] };
  assert.equal(isTitlePageChapter(first, book), true);
  assert.equal(isTitlePageChapter(second, book), false);
});

test('does not mistake an ordinary first chapter for a title page', () => {
  const chapter = { id: 'chapter-one', title: 'Chapter One', markdown: '# Chapter One\n\nProse.' };
  const book = { title: 'Example Book', authors: 'Example Author', chapters: [chapter] };
  assert.equal(isTitlePageChapter(chapter, book), false);
});

test('Reader loads title-page CSS and carries title-page classes through both modes', () => {
  const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const app = fs.readFileSync(new URL('./app.js', import.meta.url), 'utf8');
  const experience = fs.readFileSync(new URL('./experience.js', import.meta.url), 'utf8');
  const css = fs.readFileSync(new URL('../css/title-page.css', import.meta.url), 'utf8');
  assert.match(index, /css\/title-page\.css\?v=r1/);
  assert.match(app, /title-page-chapter/);
  assert.match(app, /title-page-leaf/);
  assert.match(experience, /title-page-chapter/);
  assert.match(css, /generic chapter drop cap must never/i);
});
