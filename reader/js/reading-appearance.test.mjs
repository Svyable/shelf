import assert from 'node:assert/strict';
import {
  readingAppearanceDefaults,
  resetReadingAppearancePrefs,
} from './storage.js';

let assertions = 0;
const check = (actual, expected) => {
  assert.deepEqual(actual, expected);
  assertions += 1;
};

check(readingAppearanceDefaults('light'), {
  theme: 'light',
  fontSize: 18,
  lineHeight: '1.55',
  fontFamily: 'serif',
  nightLight: false,
});

check(readingAppearanceDefaults('sepia').theme, 'dark');

const before = {
  theme: 'sepia',
  fontSize: 26,
  lineHeight: '1.8',
  fontFamily: 'sans',
  nightLight: true,
  viewMode: 'single',
  focus: true,
  lastSlug: 'example-book',
  seenHint: true,
  futurePreference: 'preserve-me',
};

const after = resetReadingAppearancePrefs(before, 'light');
check(after, {
  theme: 'light',
  fontSize: 18,
  lineHeight: '1.55',
  fontFamily: 'serif',
  nightLight: false,
  viewMode: 'single',
  focus: true,
  lastSlug: 'example-book',
  seenHint: true,
  futurePreference: 'preserve-me',
});
check(before.theme, 'sepia');
check(before.fontSize, 26);
check(after.viewMode, 'single');
check(after.focus, true);
check(after.lastSlug, 'example-book');

console.log(`reading appearance reset tests ok (${assertions} assertions)`);
