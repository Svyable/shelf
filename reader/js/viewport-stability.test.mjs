import test from 'node:test';
import assert from 'node:assert/strict';
import {
  keyboardViewportTransition,
  stabilizeViewport,
  textEntryTarget,
} from './viewport-stability.js';

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

test('accepts the restored viewport in the legacy one-shot helper', () => {
  const keyboard = { ...phone, height: 492 };
  const result = stabilizeViewport(keyboard, phone, { editing: true });
  assert.equal(result.transientKeyboard, false);
  assert.equal(result.snapshot, phone);
});

test('suppresses keyboard opening and matching restoration as one lifecycle', () => {
  const keyboard = { ...phone, height: 492 };
  const opening = keyboardViewportTransition(phone, keyboard, { editing: true });
  assert.equal(opening.suppress, true);
  assert.equal(opening.keyboardActive, true);
  assert.equal(opening.phase, 'opening');
  assert.equal(opening.snapshot, phone);

  const restored = keyboardViewportTransition(opening.snapshot, phone, {
    editing: false,
    keyboardActive: opening.keyboardActive,
  });
  assert.equal(restored.suppress, true);
  assert.equal(restored.keyboardActive, false);
  assert.equal(restored.phase, 'restored');
  assert.equal(restored.snapshot, phone);
});

test('does not hide a real orientation change behind keyboard handling', () => {
  const landscape = {
    ...phone,
    width: 844,
    height: 390,
    orientation: 'landscape',
  };
  const result = keyboardViewportTransition(phone, landscape, {
    editing: true,
    keyboardActive: true,
  });
  assert.equal(result.suppress, false);
  assert.equal(result.keyboardActive, false);
  assert.equal(result.phase, 'layout');
  assert.equal(result.snapshot, landscape);
});

test('does not suppress a large viewport change when no text control is active', () => {
  const shorter = { ...phone, height: 520 };
  const result = keyboardViewportTransition(phone, shorter, { editing: false });
  assert.equal(result.suppress, false);
  assert.equal(result.snapshot, shorter);
});

test('small mobile browser chrome changes remain real layout updates', () => {
  const chrome = { ...phone, height: 760 };
  const result = keyboardViewportTransition(phone, chrome, { editing: true });
  assert.equal(result.suppress, false);
  assert.equal(result.phase, 'layout');
  assert.equal(result.snapshot, chrome);
});

test('a stale keyboard flag cannot swallow a materially different restored height', () => {
  const resized = { ...phone, height: 720 };
  const result = keyboardViewportTransition(phone, resized, {
    editing: false,
    keyboardActive: true,
  });
  assert.equal(result.suppress, false);
  assert.equal(result.keyboardActive, false);
  assert.equal(result.snapshot, resized);
});

test('text entry detection includes editable inputs and excludes controls', () => {
  assert.equal(textEntryTarget({ tagName: 'TEXTAREA' }), true);
  assert.equal(textEntryTarget({ tagName: 'INPUT', type: 'search' }), true);
  assert.equal(textEntryTarget({ tagName: 'INPUT', type: 'checkbox' }), false);
  assert.equal(textEntryTarget({ tagName: 'BUTTON' }), false);
  assert.equal(textEntryTarget({ tagName: 'DIV', isContentEditable: true }), true);
});
