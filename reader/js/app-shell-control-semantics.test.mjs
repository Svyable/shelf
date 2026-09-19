import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('./app-shell-polish.js', import.meta.url), 'utf8');

assert.match(source, /export function syncHomeControl/);
assert.match(source, /stage === 'library' \? home : `Back to \$\{home\}`/);
assert.match(source, /logo\.setAttribute\('aria-label', label\)/);
assert.match(source, /logo\.setAttribute\('title', label\)/);
assert.match(source, /export function syncBookmarkControl/);
assert.match(source, /bookmark\.classList\.contains\('active'\)/);
assert.match(source, /bookmark\.setAttribute\('aria-pressed', value\)/);
assert.match(source, /attributeFilter: \['data-stage'\]/);

console.log('Reader app-shell control semantics contract ok');
