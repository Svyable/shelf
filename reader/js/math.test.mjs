import assert from 'node:assert/strict';
import {
  tokenizeBlockMath,
  tokenizeInlineMath,
  renderMath,
  renderEquationRef,
  setMathReferenceContext,
  installMarkedMath,
} from './math.js';

assert.deepEqual(tokenizeInlineMath('$E = mc^2$ rest'), {
  raw: '$E = mc^2$',
  tex: 'E = mc^2',
  display: false,
  delimiter: '$',
});

assert.deepEqual(tokenizeInlineMath('\\(x^2 + y^2\\) rest'), {
  raw: '\\(x^2 + y^2\\)',
  tex: 'x^2 + y^2',
  display: false,
  delimiter: '\\(',
});

assert.deepEqual(tokenizeInlineMath('\\eqref{eq:one} next'), {
  raw: '\\eqref{eq:one}',
  ref: 'eq:one',
  display: false,
  delimiter: 'eqref',
});

assert.equal(tokenizeInlineMath('$ 5$'), null);
assert.equal(tokenizeInlineMath('$5 and $10'), null);
assert.equal(tokenizeInlineMath('plain text'), null);

const block = tokenizeBlockMath('$$\n\\frac{a}{b}\n$$\nnext');
assert.equal(block.tex, '\\frac{a}{b}');
assert.equal(block.label, '');
assert.equal(block.display, true);
assert.equal(block.delimiter, '$$');

const labeled = tokenizeBlockMath('$$\nx+y=1\\label{eq:sum}\n$$\n');
assert.equal(labeled.tex, 'x+y=1');
assert.equal(labeled.label, 'eq:sum');

const bracket = tokenizeBlockMath('\\[\nx^2 + y^2 = z^2\n\\]\n');
assert.equal(bracket.tex, 'x^2 + y^2 = z^2');
assert.equal(bracket.delimiter, '\\[');

const env = tokenizeBlockMath('\\begin{align}\na &= b + c \\\\n d &= e\n\\end{align}\n');
assert.equal(env.delimiter, 'environment');
assert.ok(env.tex.includes('\\begin{align}'));

const refs = setMathReferenceContext(`A result.\n\n$$\nx+y=1\\label{eq:sum}\n$$\n\nSee \\eqref{eq:sum}.\n`);
assert.equal(refs.get('eq:sum').number, 1);
assert.ok(refs.get('eq:sum').offset > 0);
assert.ok(renderEquationRef('eq:sum').includes('(1)'));
assert.ok(renderEquationRef('eq:sum').includes('data-academic-offset='));
assert.ok(renderEquationRef('missing').includes('reader-academic-missing'));

const fallback = renderMath('x < y', false);
assert.ok(fallback.includes('reader-math-pending'));
assert.ok(fallback.includes('x &lt; y'));
assert.ok(fallback.includes('data-math-source='));

let extensionConfig = null;
const fakeMarked = {
  use(config) {
    extensionConfig = config;
  },
};
assert.equal(installMarkedMath(fakeMarked), true);
assert.equal(extensionConfig.extensions.length, 2);
assert.equal(extensionConfig.extensions[0].tokenizer('$$x+y$$\n').tex, 'x+y');
assert.equal(extensionConfig.extensions[1].tokenizer('$x+y$ rest').tex, 'x+y');

globalThis.katex = {
  renderToString(tex, options) {
    assert.equal(options.output, 'mathml');
    assert.equal(options.trust, false);
    assert.equal(options.maxSize, 20);
    assert.equal(options.maxExpand, 1000);
    return `<math data-display="${options.displayMode}"><mi>${tex}</mi></math>`;
  },
};

const rendered = renderMath('x+y', true);
assert.ok(rendered.includes('data-math-rendered="true"'));
assert.ok(rendered.includes('<math data-display="true">'));

const numbered = renderMath('x+y=1', true, { label: 'eq:sum', number: 1 });
assert.ok(numbered.includes('id="eq-eq:sum"'));
assert.ok(numbered.includes('data-equation-number="1"'));

console.log('math tests ok');
