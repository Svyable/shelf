import assert from 'node:assert/strict';
import {
  FONT_SETTLEMENT,
  fontLoadSpec,
  metricDelta,
  metricsChanged,
  shouldRefreshReader,
} from './font-settlement-model.js';

let assertions = 0;
const ok = (value) => {
  assert.ok(value);
  assertions += 1;
};
const eq = (actual, expected) => {
  assert.deepEqual(actual, expected);
  assertions += 1;
};

eq(metricDelta({ width: 100, height: 20 }, { width: 101, height: 22 }), { width: 1, height: 2 });
ok(!metricsChanged({ width: 100, height: 20 }, { width: 100.49, height: 20.49 }));
ok(metricsChanged({ width: 100, height: 20 }, { width: 100.5, height: 20 }));
ok(metricsChanged({ width: 100, height: 20 }, { width: 100, height: 20.5 }));
ok(!shouldRefreshReader({ stage: 'cover', mode: 'paged', before: { width: 1, height: 1 }, after: { width: 2, height: 1 } }));
ok(!shouldRefreshReader({ stage: 'read', mode: 'other', before: { width: 1, height: 1 }, after: { width: 2, height: 1 } }));
ok(!shouldRefreshReader({ stage: 'read', mode: 'paged', active: false, before: { width: 1, height: 1 }, after: { width: 2, height: 1 } }));
ok(shouldRefreshReader({ stage: 'read', mode: 'paged', before: { width: 100, height: 20 }, after: { width: 101, height: 20 } }));
ok(shouldRefreshReader({ stage: 'read', mode: 'scroll', before: { width: 100, height: 20 }, after: { width: 100, height: 21 } }));
eq(fontLoadSpec({ family: '"Literata", Georgia, serif', weight: 500, size: 20 }), '500 20px "Literata", Georgia, serif');
eq(fontLoadSpec({ family: 'Lora', weight: 600, size: 60 }), '600 32px Lora');
eq(fontLoadSpec({ family: 'Lora', weight: 'bad', size: 'bad' }), '400 18px Lora');
eq(fontLoadSpec({ family: '' }), '');
eq(FONT_SETTLEMENT.widthEpsilon, 0.5);
eq(FONT_SETTLEMENT.heightEpsilon, 0.5);
eq(FONT_SETTLEMENT.timeoutMs, 3200);
eq(FONT_SETTLEMENT.debounceMs, 80);

console.log(`font settlement model tests ok (${assertions} assertions)`);
