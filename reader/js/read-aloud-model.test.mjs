import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  READ_ALOUD_RATES,
  canAdvancePaged,
  chunkSpeechText,
  clampSpeechRate,
  nextSpeechRate,
  normalizeSpeechText,
  pagedRange,
  readAloudAvailability,
  visibleBlockIndex,
} from './read-aloud-model.js';

let assertions = 0;
const equal = (actual, expected, message) => {
  assert.deepEqual(actual, expected, message);
  assertions += 1;
};

equal(normalizeSpeechText('  A\n\nquiet\tpage  '), 'A quiet page', 'normalizes whitespace');
equal(normalizeSpeechText('a\u200Bb'), 'ab', 'removes zero-width characters');
equal(chunkSpeechText(''), [], 'empty text produces no speech chunks');
equal(chunkSpeechText('One sentence.', 80), ['One sentence.'], 'short text stays whole');
const chunks = chunkSpeechText('One short sentence. Two short sentences. Three short sentences. Four short sentences.', 80);
equal(chunks.every((chunk) => chunk.length <= 80), true, 'sentence chunks respect the requested ceiling');
equal(chunks.join(' ').includes('Four short sentences.'), true, 'chunking preserves the tail');
const longWordChunks = chunkSpeechText('alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau', 80);
equal(longWordChunks.every((chunk) => chunk.length <= 80), true, 'word fallback stays bounded');

equal(clampSpeechRate(undefined), 1, 'invalid pace falls back to normal');
equal(clampSpeechRate(0.2), 0.8, 'pace clamps low');
equal(clampSpeechRate(2), 1.4, 'pace clamps high');
equal(READ_ALOUD_RATES, [0.8, 1, 1.2, 1.4], 'pace choices remain deliberate');
equal(nextSpeechRate(1, 1), 1.2, 'pace advances one step');
equal(nextSpeechRate(1.4, 1), 1.4, 'pace does not exceed maximum');
equal(nextSpeechRate(1, -1), 0.8, 'pace can move backward');

equal(pagedRange('3'), { start: 3, end: 3 }, 'parses a single page');
equal(pagedRange('3–4'), { start: 3, end: 4 }, 'parses a spread');
equal(pagedRange('not a page'), null, 'rejects an invalid page label');
equal(canAdvancePaged('3–4', '10'), true, 'spread can advance before publication end');
equal(canAdvancePaged('9–10', '10'), false, 'spread stops at publication end');
equal(canAdvancePaged('10', '10'), false, 'single page stops at publication end');

equal(visibleBlockIndex([
  { top: 0, bottom: 160 },
  { top: 160, bottom: 360 },
  { top: 360, bottom: 620 },
], 0, 600), 1, 'continuous reading chooses the block at the reading probe');
equal(visibleBlockIndex([{ top: 700, bottom: 900 }], 0, 600), 0, 'continuous reading chooses nearest block if probe is between content');
equal(visibleBlockIndex([], 0, 600), -1, 'empty continuous document has no speech block');

equal(readAloudAvailability({ supported: false, stage: 'read' }), 'unsupported', 'unsupported browsers do not advertise speech');
equal(readAloudAvailability({ supported: true, stage: 'cover' }), 'inactive', 'speech is limited to reading stage');
equal(readAloudAvailability({ supported: true, stage: 'read', overlayOpen: true }), 'blocked', 'open Reader controls block speech start');
equal(readAloudAvailability({ supported: true, stage: 'read' }), 'ready', 'active reading is speech-ready');

const runtime = readFileSync(new URL('./read-aloud.js', import.meta.url), 'utf8');
const base = readFileSync(new URL('./base.js', import.meta.url), 'utf8');
equal(runtime.includes('const secondPage = nextVisiblePageUnit();'), true, 'spread handoff reads the second visible page before turning');
equal(runtime.includes("event.altKey") && runtime.includes("event.key.toLowerCase() === 'r'"), true, 'keyboard shortcut remains explicit and modifier-safe');
equal(base.includes("import('./read-aloud.js')"), true, 'read-aloud remains a lazy enhancement');

console.log(`read-aloud model tests ok (${assertions} assertions)`);
