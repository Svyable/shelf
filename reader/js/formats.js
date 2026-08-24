import { fetchText } from './base.js';
import { parsePortalCatalog, parsePortalWebShelf, parsePortalStand, parseBookReadme } from './catalog.js';

const FORMAT_CSS = 'css/formats.css?v=r1';
const publicationMeta = new Map();
let initialized = false;
let webEntries = [];
let standEntries = [];

function installStyles() {
  if (document.querySelector(`link[href="${FORMAT_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FORMAT_CSS;
  document.head.appendChild(link);
}

function slugFromHref(href) {
  const match = String(href || '').match(/#\/b\/([^/]+)\/?/);
  return match ? decodeURIComponent(match[1]) : '';
}

function currentSlug() {
  const query = new URLSearchParams(window.location.search).get('b');
  if (query) return query;
  return slugFromHref(window.location.hash);
}

function publicationLabel(meta) {
  if (!meta) return 'Book';
  if (meta.format === 'paper') return meta.formatLabel || 'Paper';
  return 'Book';
}

function annotateVolume(volume) {
  const slug = slugFromHref(volume.getAttribute('href'));
  const meta = publicationMeta.get(slug);
  if (!meta) return;

  const isPaper = meta.format === 'paper';
  volume.dataset.publicationFormat = meta.format;
  volume.classList.toggle('publication-paper', isPaper);

  let badge = volume.querySelector('.volume-format-badge');
  if (isPaper && !badge) {
    badge = document.createElement('span');
    badge.className = 'volume-format-badge';
    volume.querySelector('.volume-cover')?.prepend(badge);
  }
  if (badge) {
    badge.hidden = !isPaper;
    const nextLabel = publicationLabel(meta);
    if (badge.textContent !== nextLabel) badge.textContent = nextLabel;
  }

  const open = volume.querySelector('.volume-open');
  if (open && isPaper && open.textContent !== 'Read paper') open.textContent = 'Read paper';
}

function annotateVolumes() {
  document.querySelectorAll('a.volume').forEach(annotateVolume);
}

function hashHue(value) {
  let hash = 0;
  const text = String(value || 'publication');
  for (let i = 0; i < text.length; i += 1) hash = (hash * 33 + text.charCodeAt(i)) >>> 0;
  return 18 + (hash % 310);
}

function webVolume(entry, index) {
  const card = document.createElement('a');
  card.className = 'volume publication-web-volume';
  card.href = entry.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.dataset.publicationFormat = 'web';
  card.dataset.webVolume = String(index + 1);
  card.style.setProperty('--cloth', `hsl(${hashHue(entry.domain || entry.title)} 38% 18%)`);
  card.style.setProperty('--block', '7px');
  card.setAttribute('aria-label', `${entry.title}, web volume; opens ${entry.domain || 'external site'} in a new tab`);
  card.title = entry.note || `Open ${entry.domain}`;

  const spine = document.createElement('span');
  spine.className = 'volume-spine';
  const block = document.createElement('span');
  block.className = 'volume-block';
  const cover = document.createElement('span');
  cover.className = 'volume-cover';

  const badge = document.createElement('span');
  badge.className = 'volume-format-badge web-volume-badge';
  badge.textContent = 'Web';

  const title = document.createElement('span');
  title.className = 'volume-title';
  title.textContent = entry.title;

  const domain = document.createElement('span');
  domain.className = 'volume-author';
  domain.textContent = entry.domain;

  const note = document.createElement('span');
  note.className = 'volume-imprint web-volume-note';
  note.textContent = entry.note || 'Live on the web';

  const open = document.createElement('span');
  open.className = 'volume-open';
  open.textContent = 'Visit ↗';

  cover.append(badge, title, domain, note, open);
  card.append(spine, block, cover);
  return card;
}

function renderWebShelf() {
  const binder = document.getElementById('binderView');
  const shelf = document.getElementById('shelf');
  if (!binder || !shelf) return;

  let section = document.getElementById('publicationWebShelf');
  if (!webEntries.length) {
    section?.remove();
    return;
  }

  if (!section) {
    section = document.createElement('section');
    section.id = 'publicationWebShelf';
    section.className = 'publication-web-shelf';
    section.innerHTML = `
      <div class="publication-web-shelf-head">
        <div>
          <p class="publication-stand-kicker">Bound for the web</p>
          <h2>Web shelf</h2>
        </div>
        <p class="publication-stand-lede">Sites and apps presented as volumes. Pull one out to visit the original.</p>
      </div>
      <div class="shelf publication-web-shelf-row" aria-label="Web volumes"></div>`;
    shelf.insertAdjacentElement('afterend', section);
  }

  const row = section.querySelector('.publication-web-shelf-row');
  if (!row) return;
  row.innerHTML = '';
  webEntries.forEach((entry, index) => row.appendChild(webVolume(entry, index)));
}

function standCard(entry, index) {
  const card = document.createElement('a');
  card.className = 'stand-card';
  card.href = entry.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.style.setProperty('--stand-hue', String(hashHue(entry.domain || entry.title)));
  card.setAttribute('aria-label', `${entry.title}, opens ${entry.domain || 'external site'} in a new tab`);

  const cover = document.createElement('span');
  cover.className = 'stand-cover';

  const issue = document.createElement('span');
  issue.className = 'stand-issue';
  issue.textContent = `The stand · ${String(index + 1).padStart(2, '0')}`;

  const title = document.createElement('span');
  title.className = 'stand-cover-title';
  title.textContent = entry.title;

  const domain = document.createElement('span');
  domain.className = 'stand-domain';
  domain.textContent = entry.domain;

  cover.append(issue, title, domain);

  const copy = document.createElement('span');
  copy.className = 'stand-copy';
  const strong = document.createElement('strong');
  strong.textContent = entry.title;
  const note = document.createElement('small');
  note.textContent = entry.note || `Open at ${entry.domain}`;
  const open = document.createElement('span');
  open.className = 'stand-open';
  open.textContent = 'Visit ↗';
  copy.append(strong, note, open);

  card.append(cover, copy);
  return card;
}

function renderStand() {
  const binder = document.getElementById('binderView');
  const shelf = document.getElementById('shelf');
  if (!binder || !shelf) return;

  let section = document.getElementById('publicationStand');
  if (!standEntries.length) {
    section?.remove();
    return;
  }

  if (!section) {
    section = document.createElement('section');
    section.id = 'publicationStand';
    section.className = 'publication-stand';
    section.innerHTML = `
      <div class="publication-stand-head">
        <div>
          <p class="publication-stand-kicker">Beyond the shelf</p>
          <h2>The stand</h2>
        </div>
        <p class="publication-stand-lede">Sites, tools, experiments, and other creations worth opening at the source.</p>
      </div>
      <div class="publication-stand-grid"></div>`;
    const anchor = document.getElementById('publicationWebShelf') || shelf;
    anchor.insertAdjacentElement('afterend', section);
  }

  const grid = section.querySelector('.publication-stand-grid');
  if (!grid) return;
  grid.innerHTML = '';
  standEntries.forEach((entry, index) => grid.appendChild(standCard(entry, index)));
}

function syncEmptyShelf() {
  const empty = document.getElementById('emptyShelf');
  if (!empty) return;
  if ((webEntries.length || standEntries.length) && !empty.hidden) empty.hidden = true;
}

function syncPaperCover() {
  const slug = currentSlug();
  const meta = publicationMeta.get(slug);
  const face = document.getElementById('coverFront');
  if (!face) return;

  let badge = face.querySelector('.cover-publication-kind');
  let detail = face.querySelector('.cover-paper-meta');
  const isPaper = meta?.format === 'paper';

  document.body.classList.toggle('publication-format-paper', !!isPaper);
  if (!isPaper) {
    if (badge) badge.hidden = true;
    if (detail) detail.hidden = true;
    return;
  }

  if (!badge) {
    badge = document.createElement('p');
    badge.className = 'cover-publication-kind';
    const title = face.querySelector('.cover-title');
    title?.insertAdjacentElement('beforebegin', badge);
  }
  badge.hidden = false;
  const label = publicationLabel(meta);
  if (badge.textContent !== label) badge.textContent = label;

  if (!detail) {
    detail = document.createElement('p');
    detail.className = 'cover-paper-meta';
    const metaLine = face.querySelector('.cover-meta');
    metaLine?.insertAdjacentElement('afterend', detail);
  }
  const bits = [meta.venue, meta.doi ? `DOI ${meta.doi}` : ''].filter(Boolean);
  const text = bits.join(' · ');
  detail.hidden = bits.length === 0;
  if (detail.textContent !== text) detail.textContent = text;
}

function observeReader() {
  const binder = document.getElementById('binderView');
  const empty = document.getElementById('emptyShelf');
  const observer = new MutationObserver(() => {
    annotateVolumes();
    syncEmptyShelf();
  });
  if (binder) observer.observe(binder, { childList: true, subtree: true });
  if (empty) observer.observe(empty, { attributes: true, attributeFilter: ['hidden'] });
  window.addEventListener('hashchange', () => queueMicrotask(syncPaperCover));
  window.addEventListener('popstate', () => queueMicrotask(syncPaperCover));
}

async function loadPublicationMetadata(portal) {
  const slugs = parsePortalCatalog(portal);
  await Promise.all(slugs.map(async (slug) => {
    try {
      const markdown = await fetchText(`books/${slug}/README.md`);
      publicationMeta.set(slug, parseBookReadme(markdown, slug));
    } catch {
      // The core reader already handles missing/unreadable publication hubs.
    }
  }));
}

async function initialize() {
  if (initialized) return;
  initialized = true;
  installStyles();
  observeReader();

  try {
    const portal = await fetchText('README.md');
    webEntries = parsePortalWebShelf(portal);
    standEntries = parsePortalStand(portal);
    await loadPublicationMetadata(portal);
  } catch {
    webEntries = [];
    standEntries = [];
  }

  annotateVolumes();
  renderWebShelf();
  renderStand();
  syncEmptyShelf();
  syncPaperCover();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
  initialize();
}
