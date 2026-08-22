const PREFS = 'svp:prefs';

function bookKey(slug, name) {
  return `svp:${slug}:${name}`;
}

function systemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function loadPrefs() {
  const defaults = {
    theme: systemTheme(),
    fontSize: 18,
    lineHeight: '1.55',
    fontFamily: 'serif',
    nightLight: false,
    viewMode: 'spread',
    focus: false,
    lastSlug: null,
  };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(PREFS) || '{}') };
  } catch {
    return defaults;
  }
}

export function savePrefs(prefs) {
  localStorage.setItem(PREFS, JSON.stringify(prefs));
}

export function loadProgress(slug) {
  try {
    return JSON.parse(localStorage.getItem(bookKey(slug, 'progress')) || 'null');
  } catch {
    return null;
  }
}

export function saveProgress(slug, data) {
  localStorage.setItem(
    bookKey(slug, 'progress'),
    JSON.stringify({ ...data, savedAt: Date.now() })
  );
}

export function loadBookmarks(slug) {
  try {
    return JSON.parse(localStorage.getItem(bookKey(slug, 'bookmarks')) || '[]');
  } catch {
    return [];
  }
}

export function saveBookmarks(slug, bookmarks) {
  localStorage.setItem(bookKey(slug, 'bookmarks'), JSON.stringify(bookmarks));
}

export function loadStats(slug) {
  try {
    return {
      minutes: 0,
      chapters: [],
      ...JSON.parse(localStorage.getItem(bookKey(slug, 'stats')) || '{}'),
    };
  } catch {
    return { minutes: 0, chapters: [] };
  }
}

export function saveStats(slug, stats) {
  localStorage.setItem(bookKey(slug, 'stats'), JSON.stringify(stats));
}
