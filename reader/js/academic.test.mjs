import assert from 'node:assert/strict';
import {
  setAcademicContext,
  academicPreviewModel,
  academicPreviewPlacement,
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

assert.deepEqual(academicPreviewModel('footnote', 'note'), {
  kind: 'footnote',
  key: 'note',
  offset: ctx.footnotes.get('note').offset,
  body: 'A footnote with context.',
  label: 'Footnote 1',
  targetId: 'fn-note',
});
assert.deepEqual(academicPreviewModel('citation', 'git'), {
  kind: 'citation',
  key: 'git',
  offset: ctx.citations.get('git').offset,
  body: 'Chacon, S., and B. Straub. *Pro Git*.',
  label: 'Reference',
  targetId: 'ref-git',
});
assert.equal(academicPreviewModel('citation', 'missing'), null);

assert.deepEqual(
  academicPreviewPlacement(
    { left: 300, right: 320, top: 100, bottom: 120 },
    { width: 240, height: 120 },
    { width: 800, height: 600 }
  ),
  { left: 190, top: 130, placement: 'below' }
);
assert.deepEqual(
  academicPreviewPlacement(
    { left: 760, right: 780, top: 540, bottom: 560 },
    { width: 240, height: 160 },
    { width: 800, height: 600 }
  ),
  { left: 548, top: 370, placement: 'above' }
);
assert.deepEqual(
  academicPreviewPlacement(
    { left: 4, right: 14, top: 4, bottom: 14 },
    { width: 780, height: 580 },
    { width: 800, height: 600 }
  ),
  { left: 12, top: 12, placement: 'below' }
);

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

const footnoteExtension = config.extensions.find((entry) => entry.name === 'bookselfFootnoteRef');
const footnoteHtml = footnoteExtension.renderer({ key: 'note', number: 1, offset: 42 });
assert.match(footnoteHtml, /data-academic-kind="footnote"/);
assert.match(footnoteHtml, /aria-haspopup="dialog"/);
assert.match(footnoteHtml, /aria-expanded="false"/);

console.log('academic tests ok');