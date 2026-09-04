import test from 'node:test';
import assert from 'node:assert/strict';
import {
  nextReaderTheme,
  normalizeReaderTheme,
  resetReadingAppearancePrefs,
} from './storage.js';
import { themeButtonState } from './theme-controls.js';

test('reader theme is constrained to light or dark', () => {
  assert.equal(normalizeReaderTheme('dark'), 'dark');
  assert.equal(normalizeReaderTheme('light'), 'light');
  assert.equal(normalizeReaderTheme('sepia'), 'light');
  assert.equal(normalizeReaderTheme('unexpected'), 'dark');
});

test('theme toggle flips only between light and dark', () => {
  assert.equal(nextReaderTheme('dark'), 'light');
  assert.equal(nextReaderTheme('light'), 'dark');
  assert.equal(nextReaderTheme('sepia'), 'dark');
});

test('appearance reset preserves the independently selected theme', () => {
  const prefs = {
    theme: 'dark',
    fontSize: 27,
    lineHeight: '1.8',
    fontFamily: 'sans',
    nightLight: true,
    viewMode: 'single',
    focus: true,
    lastSlug: 'example',
    futurePreference: 'keep-me',
  };
  const next = resetReadingAppearancePrefs(prefs, 'light');
  assert.equal(next.theme, 'dark');
  assert.equal(next.fontSize, 18);
  assert.equal(next.lineHeight, '1.55');
  assert.equal(next.fontFamily, 'serif');
  assert.equal(next.nightLight, false);
  assert.equal(next.viewMode, 'single');
  assert.equal(next.focus, true);
  assert.equal(next.lastSlug, 'example');
  assert.equal(next.futurePreference, 'keep-me');
});

test('legacy sepia theme migrates to light without changing other preferences', () => {
  const next = resetReadingAppearancePrefs({ theme: 'sepia', fontSize: 22, focus: true }, 'dark');
  assert.equal(next.theme, 'light');
  assert.equal(next.focus, true);
});

test('theme button announces the mode it will switch to', () => {
  const dark = themeButtonState('dark');
  assert.equal(dark.current, 'dark');
  assert.equal(dark.next, 'light');
  assert.equal(dark.ariaLabel, 'Switch to light mode');
  assert.equal(dark.pressed, true);

  const light = themeButtonState('light');
  assert.equal(light.current, 'light');
  assert.equal(light.next, 'dark');
  assert.equal(light.ariaLabel, 'Switch to dark mode');
  assert.equal(light.pressed, false);
});