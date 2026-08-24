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

assert.deepEqual(tokenizeFootnoteRef('[^note] rest'), {
  raw: '[^note]',
  key: 'note',
  number: 1,
  offset: ctx.footnotes.get('note').offset,
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
});
assert.equal(tokenizeCitationDefinition('[@git]: A source.\n').body, 'A source.');

assert.deepEqual(tokenizeFigure('![Loop](../media/loop.svg "Caption here.")\n'), {
  raw: '![Loop](../media/loop.svg "Caption here.")\n',
  alt: 'Loop',
  href: '../media/loop.svg',
  caption: 'Caption here.',
});
assert.equal(tokenizeFigure('![Loop](../media/loop.svg)\n'), null);

let config = null;
const fakeMarked = {
  use(value) {
    config = value;
  },
};
assert.equal(installMarkedAcademic(fakeMarked), true);
assert.equal(config.extensions.length, 5);

console.log('academic tests ok');
