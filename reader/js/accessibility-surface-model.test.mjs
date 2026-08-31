import assert from 'node:assert/strict';
import {
  accessibilitySurfacePlan,
  normalizeReaderStage,
  pageAccessibilityLabel,
  surfaceState,
} from './accessibility-surface-model.js';

let assertions = 0;
const check = (actual, expected, message) => {
  assert.deepEqual(actual, expected, message);
  assertions += 1;
};

check(normalizeReaderStage('library'), 'library');
check(normalizeReaderStage('read'), 'read');
check(normalizeReaderStage('bogus'), 'library');

let plan = accessibilitySurfacePlan({ stage: 'library' });
check(plan.library, true);
check(plan.pages, false);
check(plan.skipTarget, 'libraryView');

plan = accessibilitySurfacePlan({ stage: 'cover' });
check(plan.cover, true);
check(plan.skipTarget, 'coverPage');

plan = accessibilitySurfacePlan({ stage: 'end' });
check(plan.end, true);
check(plan.skipTarget, 'backCover');

plan = accessibilitySurfacePlan({ stage: 'read', continuous: false, spread: false, rightPageActive: false });
check(plan.pages, true);
check(plan.leftPage, true);
check(plan.rightPage, false);
check(plan.continuous, false);
check(plan.skipTarget, 'pageLeft');

plan = accessibilitySurfacePlan({ stage: 'read', continuous: false, spread: true, rightPageActive: true });
check(plan.pages, true);
check(plan.rightPage, true);

plan = accessibilitySurfacePlan({ stage: 'read', continuous: true, spread: true, rightPageActive: true });
check(plan.pages, false);
check(plan.leftPage, false);
check(plan.rightPage, false);
check(plan.continuous, true);
check(plan.skipTarget, 'scrollReader');

check(pageAccessibilityLabel({ chapter: 'Chapter One', page: '3', total: '12' }), 'Chapter One, page 3, of 12');
check(pageAccessibilityLabel({ page: '3–4', total: '12' }), 'page 3–4, of 12');
check(pageAccessibilityLabel({}), 'Reading page');

check(surfaceState(true, 'Page 1'), {
  active: true,
  ariaHidden: null,
  inert: false,
  tabIndex: -1,
  label: 'Page 1',
});
check(surfaceState(false, 'Ignored'), {
  active: false,
  ariaHidden: 'true',
  inert: true,
  tabIndex: null,
  label: '',
});

console.log(`accessibility surface model tests ok (${assertions} assertions)`);
