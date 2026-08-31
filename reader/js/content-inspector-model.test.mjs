import assert from 'node:assert/strict';
import {
  CONTENT_INSPECTOR_DOUBLE_TAP_MS,
  contentInspectorCopyText,
  contentInspectorKind,
  contentInspectorLabel,
  contentInspectorShortcut,
  contentInspectorViewport,
  isDoubleTap,
  isInspectibleOverflow,
  tableRowsToTsv,
} from './content-inspector-model.js';

let checks = 0;
const equal = (actual, expected) => {
  assert.deepEqual(actual, expected);
  checks += 1;
};

equal(contentInspectorKind('TABLE'), 'table');
equal(contentInspectorKind('pre'), 'code');
equal(contentInspectorKind('code'), 'code');
equal(contentInspectorKind('div'), null);
equal(contentInspectorLabel('table'), 'Expanded table');
equal(contentInspectorLabel('code'), 'Expanded code');

equal(isInspectibleOverflow({ scrollWidth: 802, clientWidth: 800 }), false);
equal(isInspectibleOverflow({ scrollWidth: 803, clientWidth: 800 }), true);
equal(isInspectibleOverflow({ scrollWidth: 1200, clientWidth: 390 }), true);

equal(contentInspectorShortcut({ key: 'Enter' }), 'open');
equal(contentInspectorShortcut({ key: 'Enter', shiftKey: true }), null);
equal(contentInspectorShortcut({ key: 'Enter', metaKey: true }), null);
equal(contentInspectorShortcut({ key: 'Enter', isComposing: true }), null);
equal(contentInspectorShortcut({ key: ' ' }), null);

const tap = { pointerType: 'touch', time: 1000, x: 120, y: 80 };
equal(isDoubleTap(tap, { pointerType: 'touch', time: 1000 + CONTENT_INSPECTOR_DOUBLE_TAP_MS, x: 130, y: 90 }), true);
equal(isDoubleTap(tap, { pointerType: 'touch', time: 1000 + CONTENT_INSPECTOR_DOUBLE_TAP_MS + 1, x: 130, y: 90 }), false);
equal(isDoubleTap(tap, { pointerType: 'pen', time: 1100, x: 120, y: 80 }), false);
equal(isDoubleTap(tap, { pointerType: 'touch', time: 1100, x: 200, y: 80 }), false);
equal(isDoubleTap(null, tap), false);

equal(tableRowsToTsv([
  ['Name', 'Value'],
  [' Alpha  beta ', ' 42 '],
]), 'Name\tValue\nAlpha beta\t42');
equal(contentInspectorCopyText('table', { rows: [['A', 'B'], ['1', '2']] }), 'A\tB\n1\t2');
equal(contentInspectorCopyText('code', { text: '\nconst x = 1;\n  next();\n\n' }), 'const x = 1;\n  next();');

equal(contentInspectorViewport({ width: 390, height: 844 }), { compact: true, landscape: false });
equal(contentInspectorViewport({ width: 844, height: 390 }), { compact: true, landscape: true });
equal(contentInspectorViewport({ width: 1024, height: 768 }), { compact: false, landscape: true });
equal(contentInspectorViewport({ width: 700, height: 480 }), { compact: true, landscape: true });

console.log(`content inspector model tests ok (${checks} assertions)`);
