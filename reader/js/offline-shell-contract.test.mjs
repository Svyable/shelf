import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const readerRoot = path.resolve(here, '..');
const baseSource = fs.readFileSync(path.join(here, 'base.js'), 'utf8');
const formatsSource = fs.readFileSync(path.join(here, 'formats.js'), 'utf8');
const quickLookSource = fs.readFileSync(path.join(here, 'library-quick-look.js'), 'utf8');
const swSource = fs.readFileSync(path.join(readerRoot, 'sw.js'), 'utf8');

function listSource(source, name) {
  const pattern = name === 'OPTIONAL_SHELL'
    ? /const\s+OPTIONAL_SHELL\s*=\s*new\s+Set\(\[([\s\S]*?)\]\);/
    : new RegExp(`const\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\];`);
  const match = source.match(pattern);
  assert.ok(match, `${name} declaration should be readable by the contract test`);
  return [...match[1].matchAll(/['"](\.\/[^'"]+)['"]/g)].map((row) => row[1]);
}

function dynamicEnhancements(source) {
  return [...source.matchAll(/import\(\s*['"](\.\/[^'"]+\.js)['"]\s*\)/g)]
    .map((row) => row[1]);
}

function shellPath(moduleSpecifier) {
  return `./js/${moduleSpecifier.replace(/^\.\//, '')}`;
}

const shellList = listSource(swSource, 'SHELL');
const optionalList = listSource(swSource, 'OPTIONAL_SHELL');
const shell = new Set(shellList);
const optional = new Set(optionalList);

const recentCompanions = [
  './js/accessibility-surface-model.js',
  './js/accessibility-surfaces.js',
  './css/scroll-chapter-nav.css',
  './js/scroll-chapter-nav-model.js',
  './js/scroll-chapter-nav.js',
  './js/reading-session-model.js',
  './js/reading-session.js',
  './css/settings-panel.css',
];

const quickLookAssets = [
  './css/library-quick-look.css',
  './js/library-book-preview-model.js',
  './js/library-quick-look.js',
  './js/theme-controls.js',
];

const removedOfflineReadinessAssets = [
  './css/offline-readiness.css',
  './js/offline-readiness-model.js',
  './js/offline-readiness.js',
];

test('shell manifest has no duplicate or missing local assets', () => {
  assert.equal(shellList.length, shell.size, 'SHELL should not contain duplicate paths');
  for (const asset of shell) {
    if (asset === './') continue;
    const diskPath = path.join(readerRoot, asset.replace(/^\.\//, ''));
    assert.equal(fs.existsSync(diskPath), true, `${asset} should exist on disk`);
  }
});

test('optional shell is a subset of the declared shell', () => {
  assert.equal(optionalList.length, optional.size, 'OPTIONAL_SHELL should not contain duplicate paths');
  for (const asset of optional) {
    assert.equal(shell.has(asset), true, `${asset} should also be declared in SHELL`);
  }
});

test('every opportunistic base enhancement is available to an offline shell install', () => {
  const enhancements = dynamicEnhancements(baseSource);
  assert.equal(enhancements.length >= 9, true, 'expected the current opportunistic enhancement set');
  for (const moduleSpecifier of enhancements) {
    const asset = shellPath(moduleSpecifier);
    assert.equal(shell.has(asset), true, `${asset} should be precached`);
    assert.equal(optional.has(asset), true, `${asset} should remain best-effort rather than atomic core`);
  }
});

test('recent optional enhancements include their model/style companions', () => {
  for (const asset of recentCompanions) {
    assert.equal(shell.has(asset), true, `${asset} should be in SHELL`);
    assert.equal(optional.has(asset), true, `${asset} should be best-effort optional`);
  }
});

test('library quick look and global theme controls are offline-safe optional enhancements', () => {
  assert.match(formatsSource, /import\(\s*['"]\.\/library-quick-look\.js['"]\s*\)/);
  assert.match(quickLookSource, /from\s+['"]\.\/theme-controls\.js['"]/);
  for (const asset of quickLookAssets) {
    assert.equal(shell.has(asset), true, `${asset} should be in SHELL`);
    assert.equal(optional.has(asset), true, `${asset} should be best-effort optional`);
  }
});

test('removed offline readiness surface is absent from the install shell', () => {
  for (const asset of removedOfflineReadinessAssets) {
    assert.equal(shell.has(asset), false, `${asset} should not be precached`);
    assert.equal(optional.has(asset), false, `${asset} should not remain an optional shell asset`);
  }
});

test('offline shell generation advances for global theme controls', () => {
  assert.match(swSource, /const\s+CACHE\s*=\s*['"]obb-shell-v101['"]/);
});

console.log('offline shell contract tests cover dynamic enhancement parity');
