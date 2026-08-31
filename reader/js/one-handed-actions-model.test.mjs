import assert from 'node:assert/strict';
import {
  oneHandedActionAvailable,
  oneHandedActionItems,
  oneHandedActionsEligible,
  oneHandedActionTarget,
  oneHandedMenuState,
} from './one-handed-actions-model.js';

assert.equal(oneHandedActionsEligible({ stage: 'read', device: 'phone', pointer: 'coarse', orientation: 'portrait' }), true);
assert.equal(oneHandedActionsEligible({ stage: 'read', device: 'phone', pointer: 'coarse', orientation: 'landscape' }), true);
assert.equal(oneHandedActionsEligible({ stage: 'read', device: 'tablet', pointer: 'coarse', orientation: 'portrait' }), true);
assert.equal(oneHandedActionsEligible({ stage: 'read', device: 'tablet', pointer: 'coarse', orientation: 'landscape' }), false);
assert.equal(oneHandedActionsEligible({ stage: 'read', device: 'desktop', pointer: 'coarse', orientation: 'portrait' }), false);
assert.equal(oneHandedActionsEligible({ stage: 'read', device: 'phone', pointer: 'fine', orientation: 'portrait' }), false);
assert.equal(oneHandedActionsEligible({ stage: 'cover', device: 'phone', pointer: 'coarse', orientation: 'portrait' }), false);

const items = oneHandedActionItems({ bookmarked: true, bookmarkCount: 3 });
assert.equal(items.length, 5);
assert.deepEqual(items.map((item) => item.id), ['contents', 'search', 'bookmark', 'bookmarks', 'settings']);
assert.equal(items.find((item) => item.id === 'bookmark').label, 'Unbookmark');
assert.equal(items.find((item) => item.id === 'bookmark').pressed, true);
assert.equal(items.find((item) => item.id === 'bookmarks').badge, '3');
assert.equal(items.find((item) => item.id === 'settings').badge, '');

const empty = oneHandedActionItems({ bookmarked: false, bookmarkCount: -8 });
assert.equal(empty.find((item) => item.id === 'bookmark').label, 'Bookmark');
assert.equal(empty.find((item) => item.id === 'bookmark').pressed, false);
assert.equal(empty.find((item) => item.id === 'bookmarks').badge, '');

assert.deepEqual(oneHandedMenuState({ eligible: true, open: true, chromeHidden: false }), { eligible: true, open: true });
assert.deepEqual(oneHandedMenuState({ eligible: true, open: true, chromeHidden: true }), { eligible: false, open: false });
assert.deepEqual(oneHandedMenuState({ eligible: false, open: true, chromeHidden: false }), { eligible: false, open: false });

assert.equal(oneHandedActionAvailable({ exists: true }), true);
assert.equal(oneHandedActionAvailable({ exists: false }), false);
assert.equal(oneHandedActionAvailable({ exists: true, disabled: true }), false);
assert.equal(oneHandedActionAvailable({ exists: true, hidden: true }), false);

assert.equal(oneHandedActionTarget('contents'), 'tocBtn');
assert.equal(oneHandedActionTarget('bookmarks'), 'bookmarkAtlasBtn');
assert.equal(oneHandedActionTarget('settings'), 'settingsBtn');
assert.equal(oneHandedActionTarget('nope'), '');

console.log('one-handed actions tests ok');
