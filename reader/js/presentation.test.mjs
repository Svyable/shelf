import assert from 'node:assert/strict';
import {
  READER_PRESENTATION_OPTIONS,
  READER_PRESENTATION_PRESETS,
  normalizeReaderPresentation,
  readerPersonalizationState,
  markReaderPersonalized,
  clearReaderPersonalization,
  clearAllReaderPersonalization,
  migrateReaderPersonalization,
} from './presentation.js';

assert.ok(READER_PRESENTATION_OPTIONS.themes.includes('contrast-dark'));
assert.ok(READER_PRESENTATION_OPTIONS.fonts.includes('clear'));
assert.deepEqual(READER_PRESENTATION_OPTIONS.ranges.fontSize, { min: 14, max: 32, step: 1 });
assert.equal(READER_PRESENTATION_PRESETS.literary.appearance.theme, 'sepia');
assert.equal(READER_PRESENTATION_PRESETS.accessible.typography.font, 'clear');

const normalized = normalizeReaderPresentation({
  appearance: { theme: 'sepia', warmth: 'soft', ignored: true },
  typography: {
    fontSize: 40,
    font: 'literary',
    fontWeight: 500,
    tracking: 0.2,
    leading: 1.7,
    measure: 'narrow',
    align: 'left',
    paragraph: 'airy',
    indent: 'gentle',
    mode: 'scroll',
    hyphens: 'off',
  },
});
assert.deepEqual(normalized.appearance, { theme: 'sepia', warmth: 'soft' });
assert.deepEqual(normalized.typography, {
  fontSize: 32,
  font: 'literary',
  fontWeight: 500,
  tracking: 0.08,
  leading: 1.7,
  measure: 'narrow',
  align: 'left',
  paragraph: 'airy',
  indent: 'gentle',
  mode: 'scroll',
  hyphens: 'off',
});

const preset = normalizeReaderPresentation({
  preset: 'night-story',
  typography: { fontSize: 21, measure: 'balanced' },
});
assert.equal(preset.preset, 'night-story');
assert.deepEqual(preset.appearance, { theme: 'midnight', warmth: 'soft' });
assert.equal(preset.typography.font, 'warm');
assert.equal(preset.typography.fontSize, 21);
assert.equal(preset.typography.measure, 'balanced');
assert.equal(preset.typography.mode, 'paged');

const invalid = normalizeReaderPresentation({
  preset: 'unknown-preset',
  appearance: { theme: 'remote-theme', warmth: 'hot' },
  typography: {
    fontSize: null,
    leading: '',
    tracking: undefined,
    font: 'custom-font',
    fontWeight: 700,
    mode: 'flipbook',
  },
});
assert.equal(invalid.preset, undefined);
assert.deepEqual(invalid.appearance, {});
assert.deepEqual(invalid.typography, {});

class MemoryStorage {
  constructor() { this.values = new Map(); }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

global.window = { __IMPRINT: { storagePrefix: 'test-bookself' } };
global.localStorage = new MemoryStorage();

migrateReaderPersonalization();
assert.deepEqual(readerPersonalizationState(), { appearance: false, typography: false });
markReaderPersonalized('typography');
assert.deepEqual(readerPersonalizationState(), { appearance: false, typography: true });
clearReaderPersonalization('typography');
assert.deepEqual(readerPersonalizationState(), { appearance: false, typography: false });
markReaderPersonalized('appearance');
markReaderPersonalized('typography');
clearAllReaderPersonalization();
assert.deepEqual(readerPersonalizationState(), { appearance: false, typography: false });

const migratedStorage = new MemoryStorage();
global.localStorage = migratedStorage;
migratedStorage.setItem('test-bookself:prefs', JSON.stringify({ theme: 'sepia' }));
migratedStorage.setItem('test-bookself:reader-experience', JSON.stringify({ font: 'clear' }));
migrateReaderPersonalization();
assert.deepEqual(readerPersonalizationState(), { appearance: true, typography: true });

console.log('presentation tests ok');
