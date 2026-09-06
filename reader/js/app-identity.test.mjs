import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(resolve(HERE, '../manifest.webmanifest'), 'utf8'));
const icon = readFileSync(resolve(HERE, '../app-icon.svg'), 'utf8');
const themeControls = readFileSync(resolve(HERE, './theme-controls.js'), 'utf8');

assert.equal(manifest.id, './');
assert.equal(manifest.start_url, './');
assert.equal(manifest.scope, './');
assert.equal(manifest.display, 'standalone');
assert.equal(manifest.orientation, 'any');
assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 1);
assert.deepEqual(manifest.icons[0], {
  src: 'app-icon.svg',
  sizes: 'any',
  type: 'image/svg+xml',
  purpose: 'any maskable',
});
assert.ok(manifest.categories.includes('books'));

assert.match(icon, /viewBox="0 0 512 512"/);
assert.match(icon, /Three books standing on a shelf/);
assert.match(icon, /#0c0b0a/);
assert.match(icon, /#c89a52/);

assert.match(themeControls, /const APP_ICON_HREF = 'app-icon\.svg';/);
assert.match(themeControls, /ensureMeta\(root, 'color-scheme', 'dark light'\)/);
assert.match(themeControls, /root\.documentElement\.style\.colorScheme = theme/);
assert.match(themeControls, /icon\.rel = 'icon'/);
assert.match(themeControls, /icon\.type = 'image\/svg\+xml'/);
assert.match(themeControls, /ensureAppIcon\(root\)/);

for (const forbidden of [
  'paginate(',
  'location.hash',
  'history.pushState',
  'history.replaceState',
  'saveProgress(',
]) {
  assert.doesNotMatch(themeControls, new RegExp(forbidden.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

console.log('Reader native app identity contract ok');
