import { fetchText } from './base.js';
import { parseBookReadme } from './catalog.js';
import { applyNotes, loadNotes, saveNotes } from './notes.js';
import { parseRoute } from './router.js';
import { searchableMarkdown } from './search.js';
import {
  anchorChanged,
  anchorMatchesProjectedQuote,
  recoverQuoteAnchor,
} from './annotation-anchor-model.js';

const contentMaps = new Map();
let generation = 0;
let timer = 0;

async function publicationContents(slug) {
  if (!contentMaps.has(slug)) {
    contentMaps.set(slug, fetchText(`books/${slug}/README.md`)
      .then((markdown) => parseBookReadme(markdown, slug).contents || [])
      .catch(() => []));
  }
  return contentMaps.get(slug);
}

function refreshVisibleChapter(slug, chapter, notes, contents) {
  document.querySelectorAll(`.scroll-chapter[data-chapter="${CSS.escape(chapter)}"]`)
    .forEach((root) => applyNotes(root, notes, chapter));
  const chapterByTitle = new Map((contents || []).map((entry) => [entry.title, entry.id]));
  document.querySelectorAll('.page-surface .page-inner').forEach((root) => {
    const running = root.closest('.page-surface')?.querySelector('.page-running')?.textContent?.trim();
    const pageChapter = chapterByTitle.get(running);
    if (!pageChapter) return;
    if (parseRoute().slug !== slug) return;
    applyNotes(root, notes, pageChapter);
  });
}

async function repairChapter(slug, chapter, file, notes, isCurrent) {
  let markdown;
  try {
    markdown = await fetchText(`books/${slug}/${file}`);
  } catch {
    return false;
  }
  if (!isCurrent()) return false;
  const projection = searchableMarkdown(markdown);
  let changed = false;
  for (const note of notes) {
    if (!note.quote) continue;
    if (note.anchor && anchorMatchesProjectedQuote(projection.text, projection.sourceMap, note.anchor, note.quote)) continue;
    const recovered = recoverQuoteAnchor(projection.text, projection.sourceMap, note.quote, note.anchor || { start: note.offset || 0 });
    if (!recovered) continue;
    if (!anchorChanged(note.anchor, recovered) && Number(note.offset || 0) === recovered.start) continue;
    note.anchor = recovered;
    note.offset = recovered.start;
    changed = true;
  }
  return changed;
}

async function runRepair(run) {
  const route = parseRoute();
  if (!route.slug) return;
  const notes = loadNotes(route.slug);
  const repairable = notes.filter((note) => note.chapter && note.quote);
  if (!repairable.length) return;
  const isCurrent = () => run === generation && parseRoute().slug === route.slug;
  const contents = await publicationContents(route.slug);
  if (!isCurrent()) return;
  const byChapter = new Map();
  for (const note of repairable) {
    if (!byChapter.has(note.chapter)) byChapter.set(note.chapter, []);
    byChapter.get(note.chapter).push(note);
  }
  const tasks = contents.filter((chapter) => byChapter.has(chapter.id));
  let cursor = 0;
  let changed = false;
  const worker = async () => {
    while (cursor < tasks.length && isCurrent()) {
      const chapter = tasks[cursor++];
      changed = await repairChapter(route.slug, chapter.id, chapter.file, byChapter.get(chapter.id), isCurrent) || changed;
    }
  };
  await Promise.all(Array.from({ length: Math.min(2, tasks.length) }, () => worker()));
  if (!changed || !isCurrent()) return;
  saveNotes(route.slug, notes);
  const current = parseRoute();
  if (current.chapter) refreshVisibleChapter(route.slug, current.chapter, notes, contents);
  window.dispatchEvent(new CustomEvent('bookself:annotation-anchors-repaired', {
    detail: { slug: route.slug },
  }));
}

function scheduleRepair() {
  generation += 1;
  const run = generation;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    runRepair(run).catch((error) => console.warn('Annotation anchor repair failed', error));
  }, 120);
}

window.addEventListener('hashchange', scheduleRepair);
window.addEventListener('pageshow', scheduleRepair);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleRepair, { once: true });
else scheduleRepair();
