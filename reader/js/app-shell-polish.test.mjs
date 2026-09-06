import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { controlLabel } from './app-shell-polish.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(HERE, '../css/app-shell-polish.css'), 'utf8');
const runtime = readFileSync(resolve(HERE, './viewport-stability-runtime.js'), 'utf8');
const loader = readFileSync(resolve(HERE, './app-shell-polish.js'), 'utf8');

let assertions = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  assertions += 1;
};

check(controlLabel(null) === '', 'missing controls have no label');
check(
  controlLabel({
    getAttribute(name) {
      return name === 'aria-label' ? 'Reading settings' : '';
    },
    textContent: 'fallback',
  }) === 'Reading settings',
  'aria-label wins for discoverability labels'
);
check(loader.includes("const STYLE_HREF = 'css/app-shell-polish.css?v=r1'"), 'loader owns one optional stylesheet');
check(loader.includes("'#themeModeBtn'"), 'late global theme control participates in labels');
check(loader.includes("attributeFilter: ['aria-label', 'title']"), 'dynamic control labels remain synchronized');
check(loader.includes("document.documentElement.dataset.readerAppShell = 'ready'"), 'runtime exposes a ready marker');
check(runtime.includes("import('./app-shell-polish.js').catch"), 'polish is loaded opportunistically');

check(css.includes('.reader-context::before'), 'current reading context receives subtle grouping');
check(css.includes('[data-reader-label]::after'), 'fine-pointer icon labels are visible on demand');
check(css.includes('.sel-pop,'), 'selection actions use the refined transient material');
check(css.includes('.toast,'), 'feedback toasts use the refined transient material');
check(css.includes('.read-hint,'), 'reading hints use the refined transient material');
check(css.includes('.progress-seek-label'), 'seek feedback uses the refined transient material');
check(css.includes('@media (prefers-contrast: more)'), 'increased contrast has an explicit contract');
check(css.includes('@media (prefers-reduced-transparency: reduce)'), 'reduced transparency has an explicit contract');
check(css.includes('@media (forced-colors: active)'), 'forced colors has an explicit contract');
check(css.includes('@media (prefers-reduced-motion: reduce)'), 'reduced motion has an explicit contract');

for (const forbidden of [
  '.page-inner',
  '.page-surface',
  '.pages-wrapper',
  '.scroll-reader',
  '--reader-page-pad',
  '--reader-font-size',
  '--reader-leading',
]) {
  check(!css.includes(forbidden), `polish must not target reading geometry: ${forbidden}`);
}

for (const competingOwner of [
  '.app-header {',
  '.nav-center {',
  '.cover-dock {',
  '.toc-overlay,',
  '#settingsPanel .settings-card',
  'body[data-stage="library"] .library-bar',
  'body[data-stage="library"] .continue-card',
]) {
  check(!css.includes(competingOwner), `canonical control/library layer remains authoritative: ${competingOwner}`);
}

for (const forbidden of [
  'paginate(',
  'saveProgress(',
  'location.hash',
  'history.pushState',
  'history.replaceState',
]) {
  check(!loader.includes(forbidden), `loader must not own Reader behavior: ${forbidden}`);
}

console.log(`app shell polish contract ok (${assertions} assertions)`);
