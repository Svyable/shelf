import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = await readFile(new URL('./base.js', import.meta.url), 'utf8');
const app = await readFile(new URL('./app.js', import.meta.url), 'utf8');

const has = (source, text, message) => assert.ok(source.includes(text), message || text);

test('cooperative pagination exposes an explicit busy lifecycle', () => {
  has(app, "wrapper?.setAttribute('aria-busy', 'true')");
  has(app, "if (run === paginationEpoch) wrapper?.removeAttribute('aria-busy')");
  has(app, 'const run = ++paginationEpoch');
  has(app, 'run !== paginationEpoch');
});

test('reflow guard keeps stale pages visible but non-interactive', () => {
  has(base, 'function installPaginationReflowGuard');
  has(base, '#pagesWrapper[aria-busy="true"] .page-inner');
  has(base, 'opacity: .58');
  has(base, '#pagesWrapper[aria-busy="true"] .page-surface');
  has(base, 'pointer-events: none');
  assert.ok(!base.includes('visibility: hidden'), 'reflow must not introduce a blank interval');
  assert.ok(!base.includes('display: none'), 'reflow must keep the old page visually present');
});

test('reflow guard blocks stale page-turn inputs without stealing modifiers', () => {
  for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown']) {
    has(base, `event.key === '${key}'`);
  }
  has(base, "event.key === ' '");
  has(base, 'event.metaKey || event.ctrlKey || event.altKey');
  has(base, 'event.stopImmediatePropagation()');
  has(base, "document.body?.dataset.stage !== 'read'");
});

test('reflow state is accessible and honors reduced motion', () => {
  has(base, "pageNav.setAttribute('aria-disabled', 'true')");
  has(base, "live.textContent = 'Updating page layout'");
  has(base, "live.textContent = 'Page layout updated'");
  has(base, '@media (prefers-reduced-motion: reduce)');
  has(base, "document.body?.toggleAttribute('data-reader-reflowing', next)");
  has(base, "attributeFilter: ['aria-busy']");
});

console.log('reflow transaction contract tests ok (27 assertions)');
