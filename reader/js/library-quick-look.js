import { fetchText } from './base.js';
import { parseBookReadme, parsePortalCatalog } from './catalog.js';
import { loadProgress } from './storage.js';
import { buildLibraryBookPreview } from './library-book-preview-model.js';
import { installGlobalThemeControls } from './theme-controls.js';

const STYLE_HREF = 'css/library-quick-look.css?v=r1';
const metadata = new Map();
let initialized = false;

function installStyles(root = document) {
  if (root.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = root.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  root.head?.appendChild(link);
}

function slugFromVolume(volume) {
  const match = String(volume?.getAttribute('href') || '').match(/#\/b\/([^/]+)\/?/);
  return match ? decodeURIComponent(match[1]) : '';
}

function ensurePreview(volume) {
  let preview = volume.querySelector('.volume-quick-look');
  if (preview) return preview;
  const cover = volume.querySelector('.volume-cover');
  if (!cover) return null;

  preview = document.createElement('span');
  preview.className = 'volume-quick-look';
  preview.setAttribute('aria-hidden', 'true');
  preview.innerHTML = `
    <span class="volume-quick-kicker"></span>
    <span class="volume-quick-facts"></span>
    <span class="volume-quick-tags"></span>
    <span class="volume-quick-progress"></span>`;
  cover.appendChild(preview);
  return preview;
}

function setText(preview, selector, value) {
  const node = preview?.querySelector(selector);
  if (!node) return;
  const next = String(value || '').trim();
  node.textContent = next;
  node.hidden = !next;
}

export function decorateLibraryVolume(volume, meta, progress = null) {
  if (!volume || !meta || volume.classList.contains('publication-web-volume')) return false;
  const previewModel = buildLibraryBookPreview(meta, progress);
  const preview = ensurePreview(volume);
  if (!preview) return false;

  setText(preview, '.volume-quick-kicker', previewModel.kicker);
  setText(preview, '.volume-quick-facts', previewModel.facts);
  setText(preview, '.volume-quick-tags', previewModel.tags.join(' · '));
  setText(preview, '.volume-quick-progress', previewModel.progressText);

  const open = volume.querySelector('.volume-open');
  if (open) open.textContent = previewModel.action;
  volume.setAttribute('aria-label', previewModel.ariaLabel);
  volume.dataset.quickLook = 'ready';
  volume.dataset.hasReadingProgress = previewModel.progressText ? 'true' : 'false';
  return true;
}

function decorateVolume(volume) {
  const slug = slugFromVolume(volume);
  if (!slug) return false;
  const meta = metadata.get(slug);
  if (!meta) return false;
  return decorateLibraryVolume(volume, meta, loadProgress(slug));
}

function decorateAll(root = document) {
  root.querySelectorAll?.('a.volume[href*="#/b/"]').forEach(decorateVolume);
}

function observeLibrary(root = document) {
  const library = root.getElementById?.('libraryView') || root.getElementById?.('binderView');
  if (!library) return;
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches?.('a.volume[href*="#/b/"]')) decorateVolume(node);
        node.querySelectorAll?.('a.volume[href*="#/b/"]').forEach(decorateVolume);
      }
    }
  });
  observer.observe(library, { childList: true, subtree: true });
}

async function loadMetadata() {
  const portal = await fetchText('README.md');
  const slugs = parsePortalCatalog(portal);
  await Promise.all(slugs.map(async (slug) => {
    try {
      const readme = await fetchText(`books/${slug}/README.md`);
      metadata.set(slug, parseBookReadme(readme, slug));
    } catch {
      // Core catalog/loading remains authoritative for publication failures.
    }
  }));
}

export async function installLibraryQuickLook(root = document) {
  if (initialized) return true;
  initialized = true;
  installStyles(root);
  observeLibrary(root);
  try {
    await loadMetadata();
  } catch {
    return false;
  }
  decorateAll(root);
  return true;
}

function installWhenReady() {
  installGlobalThemeControls();
  void installLibraryQuickLook();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installWhenReady, { once: true });
  } else {
    installWhenReady();
  }
}