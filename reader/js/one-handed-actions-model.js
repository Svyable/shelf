const ACTIONS = Object.freeze([
  Object.freeze({ id: 'contents', label: 'Contents', targetId: 'tocBtn' }),
  Object.freeze({ id: 'search', label: 'Search', targetId: 'searchBtn' }),
  Object.freeze({ id: 'bookmark', label: 'Bookmark', targetId: 'bookmarkBtn' }),
  Object.freeze({ id: 'bookmarks', label: 'Bookmarks', targetId: 'bookmarkAtlasBtn' }),
  Object.freeze({ id: 'settings', label: 'Reading', targetId: 'settingsBtn' }),
]);

export function oneHandedActionsEligible({
  stage = '',
  device = 'desktop',
  pointer = 'fine',
  orientation = 'landscape',
} = {}) {
  if (stage !== 'read' || pointer !== 'coarse') return false;
  if (device === 'phone') return true;
  return device === 'tablet' && orientation === 'portrait';
}

export function oneHandedActionItems({ bookmarked = false, bookmarkCount = 0 } = {}) {
  const count = Math.max(0, Math.floor(Number(bookmarkCount) || 0));
  return ACTIONS.map((action) => {
    if (action.id === 'bookmark') {
      return {
        ...action,
        label: bookmarked ? 'Unbookmark' : 'Bookmark',
        pressed: !!bookmarked,
        badge: '',
      };
    }
    if (action.id === 'bookmarks') {
      return {
        ...action,
        pressed: false,
        badge: count ? String(count) : '',
      };
    }
    return { ...action, pressed: false, badge: '' };
  });
}

export function oneHandedMenuState({ eligible = false, open = false, chromeHidden = false } = {}) {
  const available = !!eligible && !chromeHidden;
  return Object.freeze({
    eligible: available,
    open: available && !!open,
  });
}

export function oneHandedActionAvailable({ exists = false, disabled = false, hidden = false } = {}) {
  return !!exists && !disabled && !hidden;
}

export function oneHandedActionTarget(actionId) {
  return ACTIONS.find((action) => action.id === actionId)?.targetId || '';
}
