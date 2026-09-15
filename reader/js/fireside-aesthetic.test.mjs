import assert from 'node:assert/strict';
import fs from 'node:fs';

const fireside = fs.readFileSync(new URL('../css/fireside-library.css', import.meta.url), 'utf8');
const atmosphereLibrary = fs.readFileSync(new URL('../css/atmosphere-library.css', import.meta.url), 'utf8');
const worker = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

let assertions = 0;
const check = (run) => {
  run();
  assertions += 1;
};

check(() => assert.match(atmosphereLibrary, /@import url\('\.\/fireside-library\.css\?v=r1'\);/));
check(() => assert.match(fireside, /--fireside-wood:/));
check(() => assert.match(fireside, /--fireside-brass:/));
check(() => assert.match(fireside, /body\[data-stage="library"\] \.shelf \{/));
check(() => assert.match(fireside, /body\[data-stage="library"\] \.volume-cover::before/));
check(() => assert.match(fireside, /body\[data-stage="library"\] \.volume:focus-visible/));
check(() => assert.match(fireside, /body\[data-stage="cover"\] \.cover-front \{/));
check(() => assert.match(fireside, /body\[data-stage="cover"\] \.cover-title \{/));
check(() => assert.match(fireside, /body\[data-stage="read"\] \.page-surface \{/));
check(() => assert.match(fireside, /\[data-reader-mode="scroll"\] body\[data-stage="read"\] \.scroll-reader/));
check(() => assert.match(fireside, /body\[data-stage="read"\] \.app-header \{/));
check(() => assert.match(fireside, /\[data-reader-device="phone"\] body\[data-stage="read"\] \.page-surface/));
check(() => assert.match(fireside, /\[data-theme="contrast-dark"\]/));
check(() => assert.match(fireside, /\[data-theme="contrast"\] body,[\s\S]*background: var\(--bg-primary\);/));
check(() => assert.match(fireside, /@media \(prefers-reduced-motion: reduce\)/));
check(() => assert.match(fireside, /@media \(forced-colors: active\)/));
check(() => assert.doesNotMatch(fireside, /--reader-page-(?:top|bottom|pad|radius)/));
check(() => assert.doesNotMatch(fireside, /\.page-inner\s*\{/));
check(() => assert.match(worker, /const CACHE = 'obb-shell-v102';/));
check(() => assert.match(worker, /'\.\/css\/fireside-library\.css'/));

console.log(`Fireside aesthetic contract: ${assertions}/20 assertions passed`);
