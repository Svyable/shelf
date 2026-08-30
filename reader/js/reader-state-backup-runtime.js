import {
  MAX_READER_STATE_FILE_BYTES,
  buildReaderStateBackup,
  parseReaderStateBackup,
  restoreReaderState,
} from './reader-state-backup.js';
import {
  loadPrefs,
  savePrefs,
  loadProgress,
  saveProgress,
  loadBookmarks,
  saveBookmarks,
  loadStats,
  saveStats,
} from './storage.js';
import { loadNotes, saveNotes } from './notes.js';
import { parseRoute, readHash } from './router.js';

const STYLE_HREF = 'css/reader-state-backup.css?v=r1';
const MAX_MB = Math.round(MAX_READER_STATE_FILE_BYTES / (1024 * 1024));

function storagePrefix() {
  return window.__IMPRINT?.storagePrefix || 'obb';
}

function experienceKey() {
  return `${storagePrefix()}:reader-experience`;
}

function presetKey() {
  return `${storagePrefix()}:reader-experience:preset`;
}

function readJsonStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJsonStorage(key, value) {
  if (value == null) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(value));
}

function currentSlug() {
  return parseRoute().slug || loadPrefs().lastSlug || '';
}

function currentTitle(slug) {
  const cover = document.getElementById('coverTitle')?.textContent?.trim();
  if (cover) return cover;
  const title = document.title.split(' — ').pop()?.trim();
  return title || slug;
}

function status(message, kind = '') {
  const el = document.getElementById('readerBackupStatus');
  if (!el) return;
  el.textContent = message;
  el.dataset.kind = kind;
}

function localState(slug) {
  return {
    legacyPrefs: loadPrefs(),
    experience: readJsonStorage(experienceKey()) || {},
    preset: readJsonStorage(presetKey()),
    progress: loadProgress(slug),
    bookmarks: loadBookmarks(slug),
    stats: loadStats(slug),
    notes: loadNotes(slug),
  };
}

function snapshot(slug) {
  const local = localState(slug);
  return buildReaderStateBackup({
    slug,
    title: currentTitle(slug),
    legacyPrefs: local.legacyPrefs,
    experience: local.experience,
    preset: local.preset,
    progress: local.progress,
    bookmarks: local.bookmarks,
    stats: local.stats,
    notes: local.notes,
  });
}

function safeFilename(value) {
  const base = String(value || 'publication')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'publication';
  return `bookself-reader-${base}.json`;
}

function downloadBackup() {
  const slug = currentSlug();
  if (!slug) {
    status('Open a publication before exporting Reader state.', 'error');
    return;
  }
  try {
    const backup = snapshot(slug);
    const blob = new Blob([`${JSON.stringify(backup, null, 2)}\n`], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = safeFilename(slug);
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    status(`Backup exported: ${backup.reading.bookmarks.length} bookmarks, ${backup.annotations.length} annotations.`, 'ok');
  } catch (error) {
    status(error?.message || 'Could not export Reader state.', 'error');
  }
}

function applyRestoredState(slug, restored) {
  savePrefs(restored.legacyPrefs);
  if (restored.progress) saveProgress(slug, restored.progress);
  saveBookmarks(slug, restored.bookmarks);
  saveStats(slug, restored.stats);
  saveNotes(slug, restored.notes);
  writeJsonStorage(experienceKey(), restored.experience);
  writeJsonStorage(presetKey(), restored.preset);
}

async function importBackup(file) {
  const slug = currentSlug();
  if (!slug) {
    status('Open a publication before importing Reader state.', 'error');
    return;
  }
  if (!file) return;
  if (file.size > MAX_READER_STATE_FILE_BYTES) {
    status(`Reader backups must be ${MAX_MB} MiB or smaller.`, 'error');
    return;
  }

  let text;
  try {
    text = await file.text();
  } catch {
    status('Could not read that backup file.', 'error');
    return;
  }
  const parsed = parseReaderStateBackup(text, slug);
  if (!parsed.ok) {
    status(parsed.error, 'error');
    return;
  }

  try {
    const restored = restoreReaderState(localState(slug), parsed.backup);
    applyRestoredState(slug, restored);
    const summary = restored.summary;
    status(
      `Restored ${summary.bookmarksAdded} new bookmarks; annotations: ${summary.notesAdded} added, ${summary.notesUpdated} updated. Reloading Reader…`,
      'ok'
    );
    const progress = restored.progress;
    if (progress?.chapter) window.location.hash = readHash(slug, progress.chapter, progress.offset || 0);
    window.setTimeout(() => window.location.reload(), 80);
  } catch (error) {
    status(error?.message || 'Could not restore Reader state.', 'error');
  }
}

function markup() {
  return `
    <section class="reader-backup" id="readerBackup" aria-labelledby="readerBackupTitle">
      <div class="reader-backup-copy">
        <p class="experience-eyebrow">Portability</p>
        <h4 id="readerBackupTitle">Move your reading setup</h4>
        <p>Back up this publication’s position, bookmarks, notes, reading stats, and page preferences to one local file.</p>
      </div>
      <div class="reader-backup-actions">
        <button type="button" id="readerBackupExport">Export Reader backup</button>
        <button type="button" id="readerBackupImport">Import Reader backup</button>
        <input id="readerBackupFile" type="file" accept="application/json,.json" hidden>
      </div>
      <p class="reader-backup-detail">Import merges bookmarks and annotations safely, restores the backed-up reading position and settings, then reloads the Reader. No account or network sync is required.</p>
      <p class="reader-backup-status" id="readerBackupStatus" role="status" aria-live="polite"></p>
    </section>`;
}

function installStyles() {
  if (document.querySelector(`link[href="${STYLE_HREF}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STYLE_HREF;
  document.head.appendChild(link);
}

function install() {
  const card = document.querySelector('#settingsPanel .settings-card');
  if (!card || document.getElementById('readerBackup')) return false;
  installStyles();
  const actions = card.querySelector('.setting-actions');
  if (actions) actions.insertAdjacentHTML('beforebegin', markup());
  else card.insertAdjacentHTML('beforeend', markup());

  document.getElementById('readerBackupExport')?.addEventListener('click', downloadBackup);
  const input = document.getElementById('readerBackupFile');
  document.getElementById('readerBackupImport')?.addEventListener('click', () => input?.click());
  input?.addEventListener('change', () => {
    const file = input.files?.[0];
    input.value = '';
    void importBackup(file);
  });
  return true;
}

if (typeof document !== 'undefined') {
  if (!install()) {
    const observer = new MutationObserver(() => {
      if (install()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}
