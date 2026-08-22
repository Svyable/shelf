import { fetchText } from './base.js';

export const DEFAULT_IMPRINT = {
  name: 'Open Book Binder',
  shortName: 'Binder',
  description: 'Read books written in public — a Kindle-style binder for open manuscripts.',
  kicker: 'Written on GitHub · Read like a book',
  lede: 'Manuscripts live as plain Markdown. When an author marks a book Published, it takes a place on this shelf.',
  credit: '',
  creditHref: '',
  writeHref: 'https://github.com/Svyable/openbookbinder',
  writeLabel: 'Start your own shelf',
  forkHref: 'https://svyable.github.io/shelf/reader/',
  forkLabel: 'See a live shelf',
  homeLabel: 'Binder',
  storagePrefix: 'obb',
  github: { owner: 'Svyable', repo: 'openbookbinder' },
};

export async function loadImprint() {
  try {
    const data = JSON.parse(await fetchText('imprint.json'));
    return {
      ...DEFAULT_IMPRINT,
      ...data,
      github: { ...DEFAULT_IMPRINT.github, ...(data.github || {}) },
    };
  } catch {
    return { ...DEFAULT_IMPRINT, github: { ...DEFAULT_IMPRINT.github } };
  }
}

export function applyImprint(imprint) {
  window.__IMPRINT = imprint;
  document.title = imprint.name;
  const apple = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (apple) apple.setAttribute('content', imprint.shortName);
  const desc = document.querySelector('meta[name="description"]');
  if (desc && imprint.description) desc.setAttribute('content', imprint.description);
  const h1 = document.querySelector('.binder-hero h1');
  if (h1) h1.textContent = imprint.name;
  const kicker = document.querySelector('.binder-kicker');
  if (kicker) kicker.textContent = imprint.kicker;
  const lede = document.querySelector('.binder-lede');
  if (lede) {
    lede.textContent = imprint.lede;
    if (imprint.credit && imprint.creditHref) {
      lede.append(' ');
      const a = document.createElement('a');
      a.href = imprint.creditHref;
      a.textContent = imprint.credit;
      lede.appendChild(a);
      lede.append('.');
    }
  }
  const write = document.getElementById('writeLink');
  if (write) {
    write.href = imprint.writeHref;
    write.textContent = imprint.writeLabel;
  }
  const fork = document.getElementById('forkLink');
  if (fork) {
    if (imprint.forkHref && imprint.forkLabel) {
      fork.hidden = false;
      fork.href = imprint.forkHref;
      fork.textContent = imprint.forkLabel;
    } else {
      fork.hidden = true;
    }
  }
  const home = document.getElementById('homeFromEnd');
  if (home) home.textContent = imprint.homeLabel;
  const logo = document.getElementById('logoBtn');
  if (logo) {
    logo.title = imprint.name;
    logo.setAttribute('aria-label', imprint.name);
  }
}

export function imprintName() {
  return window.__IMPRINT?.name || DEFAULT_IMPRINT.name;
}

export function imprintGithub() {
  return window.__IMPRINT?.github || DEFAULT_IMPRINT.github;
}

export function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || DEFAULT_IMPRINT.storagePrefix;
}
