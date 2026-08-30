import {
  MAX_READER_STATE_FILE_BYTES,
  buildReaderStateBackup,
  parseReaderStateBackup,
  restoreReaderState,
} from './reader-state-backup.js';
import {
  buildRollbackEnvelope,
  parseRollbackEnvelope,
  previewReaderStateRestore,
} from './reader-state-transaction.js';
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

const STYLE_HREF = 'css/reader-state-backup.css?v=r2';
const MAX_MB = Math.round(MAX_READER_STATE_FILE_BYTES / (1024 * 1024));
let pendingImport = null;

function storagePrefix() { return window.__IMPRINT?.storagePrefix || 'obb'; }
function experienceKey() { return `${storagePrefix()}:reader-experience`; }
function presetKey() { return `${storagePrefix()}:reader-experience:preset`; }
function rollbackKey(slug) { return `${storagePrefix()}:${slug}:reader-state-rollback`; }
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
function currentSlug() { return parseRoute().slug || loadPrefs().lastSlug || ''; }
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
  const base = String(value || 'publication').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'publication';
  return `bookself-reader-${base}.json`;
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}
function downloadBackup() {
  const slug = currentSlug();
  if (!slug) return status('Open a publication before exporting Reader state.', 'error');
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
function exactStateFromBackup(backup) {
  return restoreReaderState({
    legacyPrefs: {}, experience: {}, preset: null, progress: null,
    bookmarks: [], stats: {}, notes: [],
  }, backup);
}
function reloadAt(slug, progress) {
  if (progress?.chapter) window.location.hash = readHash(slug, progress.chapter, progress.offset || 0);
  window.setTimeout(() => window.location.reload(), 90);
}
function changeRows(changes) {
  const rows = [];
  if (changes.position.changed) rows.push(`<li><strong>Reading position</strong><span>${escapeHtml(changes.position.before)} → ${escapeHtml(changes.position.after)}</span></li>`);
  if (changes.appearance.changed || changes.experience.changed || changes.preset.changed) rows.push('<li><strong>Reading appearance</strong><span>Backed-up typography, layout, theme, mode, and preset values will be restored.</span></li>');
  rows.push(`<li><strong>Bookmarks</strong><span>${changes.bookmarks.before} → ${changes.bookmarks.after} (${changes.bookmarks.added} added)</span></li>`);
  rows.push(`<li><strong>Annotations</strong><span>${changes.annotations.before} → ${changes.annotations.after} (${changes.annotations.added} added, ${changes.annotations.updated} updated)</span></li>`);
  if (changes.stats.changed) rows.push(`<li><strong>Reading history</strong><span>${Math.round(changes.stats.minutesBefore)} → ${Math.round(changes.stats.minutesAfter)} minutes; chapter history is merged.</span></li>`);
  return rows.join('');
}
function showPreview(slug, preview) {
  pendingImport = { slug, preview };
  const panel = document.getElementById('readerBackupPreview');
  const list = document.getElementById('readerBackupPreviewList');
  if (!panel || !list) return;
  list.innerHTML = changeRows(preview.changes);
  panel.hidden = false;
  document.getElementById('readerBackupApply')?.focus({ preventScroll: true });
  status('Review these changes before applying the backup. Nothing has changed yet.');
}
function hidePreview() {
  pendingImport = null;
  const panel = document.getElementById('readerBackupPreview');
  if (panel) panel.hidden = true;
}
function rollbackEnvelope(slug) {
  const parsed = parseRollbackEnvelope(readJsonStorage(rollbackKey(slug)), { slug });
  if (!parsed.ok) {
    if (parsed.reason === 'expired' || parsed.reason === 'invalid') writeJsonStorage(rollbackKey(slug), null);
    return null;
  }
  return parsed.envelope;
}
function updateRollbackButton() {
  const button = document.getElementById('readerBackupRollback');
  if (!button) return;
  const slug = currentSlug();
  const envelope = slug ? rollbackEnvelope(slug) : null;
  button.hidden = !envelope;
  if (envelope) {
    const ageMinutes = Math.max(0, Math.round((Date.now() - envelope.createdAt) / 60000));
    button.textContent = ageMinutes < 1 ? 'Undo last import' : `Undo last import (${ageMinutes}m ago)`;
  }
}
async function importBackup(file) {
  const slug = currentSlug();
  if (!slug) return status('Open a publication before importing Reader state.', 'error');
  if (!file) return;
  if (file.size > MAX_READER_STATE_FILE_BYTES) return status(`Reader backups must be ${MAX_MB} MiB or smaller.`, 'error');
  let text;
  try { text = await file.text(); } catch { return status('Could not read that backup file.', 'error'); }
  const parsed = parseReaderStateBackup(text, slug);
  if (!parsed.ok) return status(parsed.error, 'error');
  try {
    showPreview(slug, previewReaderStateRestore(localState(slug), parsed.backup));
  } catch (error) {
    status(error?.message || 'Could not preview Reader state.', 'error');
  }
}
function applyPendingImport() {
  if (!pendingImport) return;
  const { slug, preview } = pendingImport;
  const before = localState(slug);
  const rollback = buildRollbackEnvelope({ slug, title: currentTitle(slug), local: before });
  hidePreview();
  try {
    writeJsonStorage(rollbackKey(slug), rollback);
    applyRestoredState(slug, preview.restored);
    updateRollbackButton();
    status('Reader state restored. A one-click rollback is available for 24 hours. Reloading Reader…', 'ok');
    reloadAt(slug, preview.restored.progress);
  } catch (error) {
    try {
      applyRestoredState(slug, exactStateFromBackup(rollback.backup));
      writeJsonStorage(rollbackKey(slug), null);
      status('Restore failed; your previous Reader state was put back.', 'error');
    } catch {
      status('Restore failed and automatic rollback could not complete. Your exported backup remains unchanged.', 'error');
    }
    void error;
  }
}
function rollbackLastImport() {
  const slug = currentSlug();
  const envelope = slug ? rollbackEnvelope(slug) : null;
  if (!envelope) {
    updateRollbackButton();
    return status('There is no recent Reader import to undo.', 'error');
  }
  try {
    const restored = exactStateFromBackup(envelope.backup);
    applyRestoredState(slug, restored);
    writeJsonStorage(rollbackKey(slug), null);
    updateRollbackButton();
    status('Previous Reader state restored. Reloading Reader…', 'ok');
    reloadAt(slug, restored.progress);
  } catch (error) {
    status(error?.message || 'Could not undo the last Reader import.', 'error');
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
        <button type="button" id="readerBackupRollback" hidden>Undo last import</button>
        <input id="readerBackupFile" type="file" accept="application/json,.json" hidden>
      </div>
      <div class="reader-backup-preview" id="readerBackupPreview" hidden>
        <div>
          <p class="experience-eyebrow">Restore preview</p>
          <h5>Review what will change</h5>
          <p>No Reader state is written until you choose Apply restore.</p>
        </div>
        <ul id="readerBackupPreviewList"></ul>
        <div class="reader-backup-preview-actions">
          <button type="button" id="readerBackupApply">Apply restore</button>
          <button type="button" id="readerBackupCancel">Cancel</button>
        </div>
      </div>
      <p class="reader-backup-detail">Imports merge bookmarks, history, and annotations, replace backed-up reading settings and position, and keep a local rollback snapshot for 24 hours.</p>
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
  document.getElementById('readerBackupApply')?.addEventListener('click', applyPendingImport);
  document.getElementById('readerBackupCancel')?.addEventListener('click', () => { hidePreview(); status('Import cancelled. No Reader state changed.'); });
  document.getElementById('readerBackupRollback')?.addEventListener('click', rollbackLastImport);
  input?.addEventListener('change', () => {
    const file = input.files?.[0];
    input.value = '';
    void importBackup(file);
  });
  updateRollbackButton();
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
