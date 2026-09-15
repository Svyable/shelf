import assert from 'node:assert/strict';
import fs from 'node:fs';
import { centerChromeIntent } from './immersive-chrome.js';
import { coarseTapZones, pageTapIntent } from './page-tap-zones.js';

let assertions = 0;
const equal = (actual, expected, message) => {
  assertions += 1;
  assert.equal(actual, expected, message);
};
const deepEqual = (actual, expected, message) => {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
};
const match = (actual, expected, message) => {
  assertions += 1;
  assert.match(actual, expected, message);
};

// Coarse-pointer reading keeps deliberate page-turn zones at the physical edges
// while preserving the center/control band and a safety buffer around it.
equal(pageTapIntent(0, 100, { coarse: true }), 'prev');
equal(pageTapIntent(20, 100, { coarse: true }), 'prev');
equal(pageTapIntent(21, 100, { coarse: true }), 'pass');
equal(pageTapIntent(34, 100, { coarse: true }), 'pass');
equal(pageTapIntent(50, 100, { coarse: true }), 'pass');
equal(pageTapIntent(66, 100, { coarse: true }), 'pass');
equal(pageTapIntent(71, 100, { coarse: true }), 'pass');
equal(pageTapIntent(72, 100, { coarse: true }), 'next');
equal(pageTapIntent(100, 100, { coarse: true }), 'next');

// The immersive chrome's canonical center band is fully contained inside the
// no-turn region, with buffer space on both sides.
equal(centerChromeIntent(34, 100), true);
equal(centerChromeIntent(50, 100), true);
equal(centerChromeIntent(66, 100), true);
equal(centerChromeIntent(33, 100), false);
equal(centerChromeIntent(67, 100), false);
equal(pageTapIntent(33, 100, { coarse: true }), 'pass');
equal(pageTapIntent(67, 100, { coarse: true }), 'pass');

// Fine-pointer behavior retains the existing physical-edge calculation.
equal(pageTapIntent(61, 1000), 'prev');
equal(pageTapIntent(62, 1000), 'prev');
equal(pageTapIntent(500, 1000), 'pass');
equal(pageTapIntent(868, 1000), 'next');
equal(pageTapIntent(939, 1000), 'next');

equal(pageTapIntent(-1, 100, { coarse: true }), 'pass');
equal(pageTapIntent(101, 100, { coarse: true }), 'pass');
equal(pageTapIntent(50, 0, { coarse: true }), 'pass');

deepEqual(coarseTapZones(1000), { previousEnd: 200, nextStart: 720 });
deepEqual(coarseTapZones(-100), { previousEnd: 0, nextStart: 0 });

const navigation = fs.readFileSync(new URL('./navigation.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/navigation.css', import.meta.url), 'utf8');
match(navigation, /import \{ pageTapIntent \} from '\.\/page-tap-zones\.js'/);
match(navigation, /if \(intent === 'pass'\) return/);
match(navigation, /Tap center for controls · tap an edge or swipe to turn/);
match(navigation, /requestTurn\(intent === 'prev' \? -1 : 1\)/);
match(css, /data-reader-immersive="manual"/);
match(css, /\.nav-gesture-preview\.prev \{\s*width: 20%/s);
match(css, /\.nav-gesture-preview\.next \{\s*width: 28%/s);

console.log(`page tap zones ok (${assertions} assertions)`);
