import assert from 'node:assert/strict';
import {
  tokenizeBlockMath,
  tokenizeInlineMath,
  renderMath,
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

assert.equal(tokenizeInlineMath('$ 5$'), null);
assert.equal(tokenizeInlineMath('$5 and $10'), null);
assert.equal(tokenizeInlineMath('plain text'), null);

const block = tokenizeBlockMath('$$\n\\frac{a}{b}\n$$\nnext');
assert.equal(block.tex, '\\frac{a}{b}');
assert.equal(block.display, true);
assert.equal(block.delimiter, '$$');

const bracket = tokenizeBlockMath('\\[\nx^2 + y^2 = z^2\n\\]\n');
assert.equal(bracket.tex, 'x^2 + y^2 = z^2');
assert.equal(bracket.delimiter, '\\[');

const env = tokenizeBlockMath('\\begin{align}\na &= b + c \\\\n d &= e\n\\end{align}\n');
assert.equal(env.delimiter, 'environment');
assert.ok(env.tex.includes('\\begin{align}'));

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

console.log('math tests ok');
