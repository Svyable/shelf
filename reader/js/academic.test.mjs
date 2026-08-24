import assert from 'node:assert/strict';
import {
  setAcademicContext,
  tokenizeFootnoteDefinition,
  tokenizeFootnoteRef,
  tokenizeCitationDefinition,
  tokenizeCitationRef,
  tokenizeFigure,
  installMarkedAcademic,
} from './academic.js';

const md = `A claim[^note] with evidence [@git|Chacon and Straub, 2014].

![Loop](../media/loop.svg "A versioned course-text loop.")

[^note]: A footnote with context.

[@git]: Chacon, S., and B. Straub. *Pro Git*.`;

const ctx = setAcademicContext(md);
assert.equal(ctx.footnotes.get('note').number, 1);
assert.ok(ctx.footnotes.get('note').offset > 0);
assert.ok(ctx.citations.get('git').offset > 0);
assert.equal(ctx.duplicateFootnotes.size, 0);
assert.equal(ctx.duplicateCitations.size, 0);

assert.deepEqual(tokenizeFootnoteRef('[^note] rest'), {
  raw: '[^note]',
  key: 'note',
  number: 1,
  offset: ctx.footnotes.get('note').offset,
  duplicate: false,
  missing: false,
});
assert.equal(
  tokenizeFootnoteDefinition('[^note]: A footnote with context.\n').body,
  'A footnote with context.'
);

assert.deepEqual(tokenizeCitationRef('[@git|Chacon and Straub, 2014] next'), {
  raw: '[@git|Chacon and Straub, 2014]',
  key: 'git',
  label: 'Chacon and Straub, 2014',
  offset: ctx.citations.get('git').offset,
  duplicate: false,
});
assert.equal(tokenizeCitationDefinition('[@git]: A source.\n').body, 'A source.');

assert.deepEqual(tokenizeFigure('![Loop](../media/loop.svg "Caption here.")\n'), {
  raw: '![Loop](../media/loop.svg "Caption here.")\n',
  alt: 'Loop',
  href: '../media/loop.svg',
  caption: 'Caption here.',
});
assert.equal(tokenizeFigure('![Loop](../media/loop.svg)\n'), null);

const duplicateMd = `Use[^same] and [@same|One].

[^same]: First footnote.
[^same]: Second footnote.

[@same]: First citation.
[@same]: Second citation.`;
const duplicateCtx = setAcademicContext(duplicateMd);
assert.equal(duplicateCtx.duplicateFootnotes.has('same'), true);
assert.equal(duplicateCtx.duplicateCitations.has('same'), true);
assert.equal(tokenizeFootnoteRef('[^same]').duplicate, true);
assert.equal(tokenizeFootnoteRef('[^same]').missing, false);
assert.equal(tokenizeFootnoteRef('[^same]').offset, undefined);
assert.equal(tokenizeCitationRef('[@same|One]').duplicate, true);
assert.equal(tokenizeCitationRef('[@same|One]').offset, undefined);
assert.equal(tokenizeFootnoteDefinition('[^same]: First footnote.\n').duplicate, true);
assert.equal(tokenizeCitationDefinition('[@same]: First citation.\n').duplicate, true);

setAcademicContext('A missing note[^gone] and [@gone|Unknown].');
const missingFootnote = tokenizeFootnoteRef('[^gone]');
assert.equal(missingFootnote.missing, true);
assert.equal(missingFootnote.offset, undefined);
const missingCitation = tokenizeCitationRef('[@gone|Unknown]');
assert.equal(missingCitation.offset, undefined);

let config = null;
const fakeMarked = {
  use(value) {
    config = value;
  },
};
assert.equal(installMarkedAcademic(fakeMarked), true);
assert.equal(config.extensions.length, 5);

const byName = Object.fromEntries(config.extensions.map((extension) => [extension.name, extension]));
const parserThis = { parser: { parseInline() { return 'Rendered definition'; } } };
const duplicateFootnoteHtml = byName.bookselfFootnoteDefinition.renderer.call(parserThis, {
  key: 'same',
  number: 1,
  duplicate: true,
  tokens: [],
});
assert.ok(duplicateFootnoteHtml.includes('reader-academic-ambiguous'));
assert.equal(duplicateFootnoteHtml.includes('id="fn-same"'), false);

const duplicateCitationHtml = byName.bookselfCitationDefinition.renderer.call(parserThis, {
  key: 'same',
  duplicate: true,
  tokens: [],
});
assert.ok(duplicateCitationHtml.includes('reader-academic-ambiguous'));
assert.equal(duplicateCitationHtml.includes('id="ref-same"'), false);

const duplicateRefHtml = byName.bookselfCitationRef.renderer({
  key: 'same',
  label: 'One',
  offset: undefined,
  duplicate: true,
});
assert.ok(duplicateRefHtml.includes('aria-label="Ambiguous citation key same: duplicate definitions"'));
assert.equal(duplicateRefHtml.includes('<a '), false);

const missingFootnoteHtml = byName.bookselfFootnoteRef.renderer({
  key: 'gone',
  number: 1,
  offset: undefined,
  duplicate: false,
  missing: true,
});
assert.ok(missingFootnoteHtml.includes('>?</span>'));
assert.ok(missingFootnoteHtml.includes('aria-label="Unresolved footnote key gone"'));
assert.equal(missingFootnoteHtml.includes('<a '), false);

const missingCitationHtml = byName.bookselfCitationRef.renderer({
  key: 'gone',
  label: 'Unknown',
  offset: undefined,
  duplicate: false,
});
assert.ok(missingCitationHtml.includes('aria-label="Unresolved citation key gone"'));
assert.equal(missingCitationHtml.includes('<a '), false);

console.log('academic tests ok');
