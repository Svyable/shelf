import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  COVER_MORE_ACTION_IDS,
  handoffFrames,
  reducedMotionPreferred,
  sourceKindForElement,
} from './book-opening-handoff.js';

let assertions = 0;
const equal = (...args) => {
  assertions += 1;
  assert.equal(...args);
};
const deepEqual = (...args) => {
  assertions += 1;
  assert.deepEqual(...args);
};
const match = (...args) => {
  assertions += 1;
  assert.match(...args);
};
const doesNotMatch = (...args) => {
  assertions += 1;
  assert.doesNotMatch(...args);
};

const frames = handoffFrames(
  { left: 12, top: 24, width: 120, height: 180 },
  { left: 320, top: 80, width: 360, height: 540 },
  'shelf'
);
equal(frames[0].left, '12px');
equal(frames[0].width, '120px');
equal(frames[1].left, '320px');
equal(frames[1].width, '360px');
equal(frames[1].opacity, 0.94);

const resumeFrames = handoffFrames(
  { left: 0, top: 0, width: 80, height: 120 },
  { left: 100, top: 40, width: 700, height: 500 },
  'resume'
);
equal(resumeFrames[1].opacity, 0.08);
equal(resumeFrames[1].height, '500px');

equal(reducedMotionPreferred(() => ({ matches: true })), true);
equal(reducedMotionPreferred(() => ({ matches: false })), false);
equal(reducedMotionPreferred(() => { throw new Error('unsupported'); }), false);

deepEqual(COVER_MORE_ACTION_IDS, [
  'copyPreviewBtn',
  'citeBtn',
  'feedbackBtn',
  'sourceLink',
  'historyLink',
  'rightsLink',
]);
equal(COVER_MORE_ACTION_IDS.includes('startOverBtn'), false);

const fakeResume = {
  closest(selector) {
    if (selector === '#continueCardLink') return {};
    return null;
  },
};
const fakeShelf = {
  closest(selector) {
    if (selector === '#continueCardLink') return null;
    if (selector === '.volume') return {};
    return null;
  },
};
equal(sourceKindForElement(fakeResume), 'resume');
equal(sourceKindForElement(fakeShelf), 'shelf');
equal(sourceKindForElement(null), '');

const source = fs.readFileSync(new URL('./book-opening-handoff.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/book-opening-handoff.css', import.meta.url), 'utf8');
const runtime = fs.readFileSync(new URL('./viewport-stability-runtime.js', import.meta.url), 'utf8');

match(source, /document\.addEventListener\('click', captureSource, true\)/);
match(source, /clone\.animate\(frames/);
match(source, /destinationFor\(pending\.kind\)/);
match(source, /book-handoff-cover-arriving/);
match(source, /installCoverDockHierarchy/);
match(source, /summary\.textContent = 'More'/);
match(source, /menu\.appendChild\(control\)/);
match(source, /prefers-reduced-motion: reduce/);
match(source, /styleReady/);
match(source, /--book-handoff-cloth/);

match(css, /\.cover-page::before/);
match(css, /\.cover-page::after/);
match(css, /var\(--book-handoff-cloth/);
match(css, /@keyframes bookCoverSettle/);
match(css, /@keyframes bookPagesArrive/);
match(css, /\.book-handoff-clone/);
match(css, /\.cover-more-menu/);
match(css, /@media \(max-width: 700px\)/);
match(css, /@media \(forced-colors: active\)/);
match(css, /@media \(prefers-reduced-motion: reduce\)/);
doesNotMatch(css, /\.page-inner\s*\{/);
doesNotMatch(css, /--reader-page-(?:top|bottom|pad|radius)/);

match(runtime, /import\('\.\/book-opening-handoff\.js'\)\.catch/);

console.log(`Book opening handoff: ${assertions}/38 assertions passed`);
