import test from 'node:test';
import assert from 'node:assert/strict';
import { stabilizeViewport, textEntryTarget } from './viewport-stability.js';

const phone = {
  width: 390,
  height: 844,
  short: 390,
  orientation: 'portrait',
  device: 'phone',
  coarse: true,
  spreadRecommended: false,
};

test('keeps the reading viewport stable while a keyboard occludes a text field', () => {
  const keyboard = { ...phone, height: 492 };
  const result = stabilizeViewport(phone, keyboard, { editing: true });
  assert.equal(result.transientKeyboard, true);
  assert.equal(result.snapshot, phone);
});

test('accepts the restored viewport when the keyboard closes', () => {
  const keyboard = { ...phone, height: 492 };
  const result = stabilizeViewport(keyboard, phone, { editing: true });
  assert.equal(result.transientKeyboard, false);
  assert.equal(result.snapshot, phone);
});

test('does not hide a real orientation change behind keyboard handling', () => {
  const landscape = {
    ...phone,
    width: 844,
    height: 390,
    orientation: 'landscape',
  };
  const result = stabilizeViewport(phone, landscape, { editing: true });
  assert.equal(result.transientKeyboard, false);
  assert.equal(result.snapshot, landscape);
});

test('does not suppress a large viewport change when no text control is active', () => {
  const shorter = { ...phone, height: 520 };
  const result = stabilizeViewport(phone, shorter, { editing: false });
  assert.equal(result.transientKeyboard, false);
  assert.equal(result.snapshot, shorter);
});

test('small mobile browser chrome changes remain real layout updates', () => {
  const chrome = { ...phone, height: 760 };
  const result = stabilizeViewport(phone, chrome, { editing: true });
  assert.equal(result.transientKeyboard, false);
  assert.equal(result.snapshot, chrome);
});

test('text entry detection includes editable inputs and excludes controls', () => {
  assert.equal(textEntryTarget({ tagName: 'TEXTAREA' }), true);
  assert.equal(textEntryTarget({ tagName: 'INPUT', type: 'search' }), true);
  assert.equal(textEntryTarget({ tagName: 'INPUT', type: 'checkbox' }), false);
  assert.equal(textEntryTarget({ tagName: 'BUTTON' }), false);
  assert.equal(textEntryTarget({ tagName: 'DIV', isContentEditable: true }), true);
});
