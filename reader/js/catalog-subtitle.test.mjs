import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { parseBookReadme } from './catalog.js';

test('parseBookReadme carries an italic subtitle directly below the H1', () => {
  const meta = parseBookReadme(`# The Risk Pool\n\n*How Insurance Quietly Decides What Can Be Built*\n\n| | |\n|---|---|\n| **Authors** | Sven Hardy Benson |\n| **Status** | Published |\n`, 'the-risk-pool');
  assert.equal(meta.title, 'The Risk Pool');
  assert.equal(meta.subtitle, 'How Insurance Quietly Decides What Can Be Built');
});

test('parseBookReadme does not mistake metadata or prose for a subtitle', () => {
  const tableFirst = parseBookReadme(`# Plain Book\n\n| | |\n|---|---|\n| **Authors** | Sven Hardy Benson |\n`, 'plain-book');
  assert.equal(tableFirst.subtitle, '');
  const proseFirst = parseBookReadme(`# Plain Book\n\nOpening prose.\n\n| | |\n`, 'plain-book');
  assert.equal(proseFirst.subtitle, '');
});

test('catalog cards render subtitle metadata when present', () => {
  const app = fs.readFileSync(new URL('./app.js', import.meta.url), 'utf8');
  const css = fs.readFileSync(new URL('../css/style.css', import.meta.url), 'utf8');
  assert.match(app, /volume-subtitle/);
  assert.match(css, /\.volume-subtitle\s*\{/);
});
