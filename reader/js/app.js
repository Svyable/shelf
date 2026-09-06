import { fetchText, fetchDocument, firstExisting } from './base.js';
import {
  catalogEntryVisible,
  parsePortalCatalog,
  parseBookReadme,
  parseFrontMatterMeta,
  clothColor,
} from './catalog.js';
import { blocksFromMarkdown, headingOffsets } from './markdown.js';
import { paginateBlocks, pageIndexForOffset } from './paginate.js';
import { isTitlePageChapter } from './title-page.js';
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
import { parseRoute, libraryHash, coverHash, readHash, go } from './router.js';
import { createLatestRouteQueue, routeNeedsCatalog } from './route-queue.js';
import {
  loadNotes,
  addNote,
  removeNote,
  notesMarkdown,
  applyNotes,
} from './notes.js';
import { searchBook, searchLibrary, wordCount, readingMinutes } from './search.js';
import { bookAsMarkdown, bookAsHtml, downloadText } from './export.js';
import { loadImprint, applyImprint, imprintName, imprintGithub } from './imprint.js';

const app = {
  prefs: null,
  catalog: [],
  books: new Map(),
  slug: null,
  book: null,
  pages: [],
  pageIndex: 0,
  isMobile: !canSpreadViewport(),
  sessionBook: null,
  statsTimer: null,
  touchStartX: null,
  touchStartY: null,
  didSwipe: false,
  toastTimer: null,
  selTimer: null,
  pubFilter: 'All',
  pendingNote: null,
  sortMode: 'title',
  turning: false,
};

function $(id) {
  return document.getElementById(id);
}

function applyPrefs() {
  document.documentElement.setAttribute('data-theme', app.prefs.theme);
  document.documentElement.setAttribute('data-font', app.prefs.fontFamily || 'serif');
  document.documentElement.style.setProperty('--base-font-size', `${app.prefs.fontSize}px`);
  document.documentElement.style.setProperty('--line-height', app.prefs.lineHeight || '1.55');
  document.body.classList.toggle('focus-mode', !!app.prefs.focus);
  document.body.classList.toggle('is-draft', !!(app.book && !app.book.published));
  $('nightLightOverlay').classList.toggle('active', !!app.prefs.nightLight);
  $('lampPool')?.classList.toggle('active', !!app.prefs.nightLight);
  $('nightLightBtn')?.classList.toggle('active', !!app.prefs.nightLight);
  $('nightLightBtn') && ($('nightLightBtn').textContent = app.prefs.nightLight ? 'On' : 'Off');
  document.querySelectorAll('[data-paper]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.paper === app.prefs.theme);
  });
  $('viewModeBtn').hidden = !canSpreadViewport();
  $('viewModeBtn').textContent = app.prefs.viewMode === 'spread' ? 'Single' : 'Spread';
  document.querySelectorAll('[data-font]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.font === app.prefs.fontFamily);
  });
  document.querySelectorAll('[data-leading]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.leading === String(app.prefs.lineHeight));
  });
}

function canSpreadViewport() {
  const w = window.visualViewport?.width || window.innerWidth;
  const h = window.visualViewport?.height || window.innerHeight;
  return w >= 900 && h >= 560;
}

function spreadOn() {
  return canSpreadViewport() && app.prefs.viewMode === 'spread';
}

function overlaysOpen() {
  return [
    'tocOverlay',
    'progressPanel',
    'settingsPanel',
    'searchOverlay',
    'noteDialog',
    'helpOverlay',
  ].some((id) => $(id)?.classList.contains('active'));
}

async function loadCatalog() {
  const md = await fetchText('README.md');
  const slugs = parsePortalCatalog(md);
  const entries = [];
  for (const slug of slugs) {
    try {
      const hubDoc = await fetchDocument(`books/${slug}/README.md`);
      const meta = parseBookReadme(hubDoc.text, slug);
      meta.modified = hubDoc.modified;
      meta.cover = await firstExisting(
        ['cover.png', 'cover.jpg', 'cover.webp', 'cover.jpeg'].map(
          (name) => `books/${slug}/media/${name}`
        )
      );
      if (catalogEntryVisible(meta, window.__IMPRINT?.role)) entries.push(meta);
    } catch (err) {
      console.warn('Skip catalog slug', slug, err);
    }
  }
  app.catalog = entries;
  return entries;
}

async function loadBook(slug) {
  if (app.books.has(slug)) return app.books.get(slug);
  const hubDoc = await fetchDocument(`books/${slug}/README.md`);
  const hub = hubDoc.text;
  const meta = parseBookReadme(hub, slug);
  meta.modified = hubDoc.modified;
  let fm = { title: meta.title, subtitle: '', year: '' };
  const chapters = await Promise.all(
    meta.contents.map(async (c) => {
      try {
        const markdown = await fetchText(`books/${slug}/${c.file}`);
        return { ...c, markdown, missing: false };
      } catch {
        return {
          ...c,
          markdown: `# ${c.title}\n\nThis chapter file is missing from the repository.\n`,
          missing: true,
        };
      }
    })
  );
  const front = chapters.find((c) => c.id === 'front-matter');
  if (front) fm = { ...fm, ...parseFrontMatterMeta(front.markdown) };
  const cover = await firstExisting(
    ['cover.png', 'cover.jpg', 'cover.webp', 'cover.jpeg'].map(
      (name) => `books/${slug}/media/${name}`
    )
  );
  const book = { ...meta, title: fm.title || meta.title, subtitle: fm.subtitle, year: fm.year, cover, chapters };
  book.revision = await fetchRevision(slug);
  app.books.set(slug, book);
  return book;
}

async function fetchRevision(slug) {
  try {
    const { owner, repo } = githubRepo();
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?path=books/${encodeURIComponent(slug)}/&per_page=1`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    const c = rows[0];
    if (!c?.sha) return null;
    return {
      sha: c.sha,
      date: c.commit?.committer?.date || c.commit?.author?.date || '',
      url: c.html_url,
    };
  } catch {
    return null;
  }
}

function sizeMeasure() {
  const sample = $('pageLeft');
  const box = $('pageMeasure');
  const host = $('pagesWrapper');
  const stage = $('bookStage');
  if (!host || !box) return false;
  let w = host.clientWidth;
  let h = host.clientHeight;
  if (w < 80 || h < 80) {
    w = stage?.clientWidth || Math.max(window.innerWidth - 24, 200);
    h = stage?.clientHeight || Math.max(Math.floor(window.innerHeight * 0.62), 240);
  }
  if (w < 80 || h < 80) return false;
  const pageW = spreadOn() ? Math.floor((w - 10) / 2) : w;
  box.style.width = `${Math.max(pageW, 200)}px`;
  box.style.height = `${Math.max(h, 240)}px`;
  if (sample) {
    const cs = getComputedStyle(sample);
    box.style.padding = cs.padding;
    box.style.fontFamily = cs.fontFamily;
  }
  return true;
}

let paginationScheduler = null;
let paginationEpoch = 0;

async function rebuildPages({ cooperative = true, commitUi = true } = {}) {
  if (!app.book) return false;
  if (!sizeMeasure()) return false;
  const run = ++paginationEpoch;
  const book = app.book;
  const box = $('pageMeasureInner');
  const wrapper = $('pagesWrapper');

  if (!cooperative) {
    const pages = [];
    for (const ch of book.chapters) {
      box.classList.toggle('title-page-chapter', isTitlePageChapter(ch, book));
      const blocks = blocksFromMarkdown(ch.markdown, book.slug);
      pages.push(...paginateBlocks(ch.id, blocks, box));
    }
    box.classList.remove('title-page-chapter');
    if (run !== paginationEpoch || app.book !== book) return false;
    app.pages = pages;
    return true;
  }

  wrapper?.setAttribute('aria-busy', 'true');
  try {
    if (!paginationScheduler) {
      const { createCooperativePaginationScheduler } = await import('./pagination-scheduler.js');
      if (run !== paginationEpoch || app.book !== book) return false;
      paginationScheduler = createCooperativePaginationScheduler();
    }

    const result = await paginationScheduler.run(book.chapters, (ch) => {
      box.classList.toggle('title-page-chapter', isTitlePageChapter(ch, book));
      const blocks = blocksFromMarkdown(ch.markdown, book.slug);
      return paginateBlocks(ch.id, blocks, box);
    });
    box.classList.remove('title-page-chapter');
    if (
      result.status !== 'complete'
      || run !== paginationEpoch
      || app.book !== book
    ) return false;

    const chapter = chapterOfPage(app.pageIndex);
    const offset = currentOffset();
    app.pages = result.values.flat();
    app.pageIndex = pageIndexForOffset(app.pages, chapter, offset);
    if (commitUi && document.body.dataset.stage === 'read') {
      paintPages();
      persist();
    }
    return true;
  } finally {
    if (run === paginationEpoch) wrapper?.removeAttribute('aria-busy');
  }
}

function chapterOfPage(i) {
  return app.pages[i]?.chapter || app.book?.contents[0]?.id || '';
}

function currentOffset() {
  return app.pages[app.pageIndex]?.start || 0;
}

function persist() {
  if (!app.slug || !app.pages.length) return;
  saveProgress(app.slug, {
    chapter: chapterOfPage(app.pageIndex),
    offset: currentOffset(),
    pageIndex: app.pageIndex,
  });
  updateProgressUi();
}

function percentRead() {
  if (!app.pages.length) return 0;
  return Math.round((app.pageIndex / Math.max(app.pages.length - 1, 1)) * 100);
}

function updateProgressUi() {
  const pct = percentRead();
  $('progressBarFill').style.width = `${pct}%`;
  $('progressPercent').textContent = `${pct}%`;
  const ch = app.pages[app.pageIndex];
  const meta = app.book?.contents.find((c) => c.id === ch?.chapter);
  $('currentChapter').textContent = meta?.title || '—';
  const showTwo = spreadOn() && app.pageIndex < app.pages.length - 1;
  $('currentPage').textContent = showTwo
    ? `${app.pageIndex + 1}–${app.pageIndex + 2}`
    : `${app.pageIndex + 1}`;
  $('totalPages').textContent = String(app.pages.length);
  $('prevBtn').disabled = app.pageIndex <= 0;
  $('nextBtn').disabled = false;
  const marks = loadBookmarks(app.slug);
  const here = marks.some((m) => m.chapter === ch?.chapter && m.offset === ch?.start);
  $('bookmarkBtn').classList.toggle('active', here);
}

function isChapterOpen(html) {
  return /^\s*<h1[\s>]/i.test(html || '');
}

function fillPage(el, page, num, side, two) {
  const inner = el.querySelector('.page-inner');
  inner.innerHTML = page ? page.html : '';
  const chapterOpen = !!(page && isChapterOpen(page.html));
  const chapterMeta = page ? app.book?.chapters.find((chapter) => chapter.id === page.chapter) : null;
  const titlePage = !!(chapterMeta && isTitlePageChapter(chapterMeta, app.book));
  inner.classList.toggle('chapter-open', chapterOpen);
  inner.classList.toggle('title-page-chapter', titlePage);
  el.classList.toggle('title-page-leaf', titlePage && chapterOpen);
  if (page && app.slug) applyNotes(inner, loadNotes(app.slug), page.chapter);
  el.querySelector('.page-num').textContent = page ? String(num) : '';
  const run = el.querySelector('.page-running');
  if (run) {
    const meta = app.book?.contents.find((c) => c.id === page?.chapter);
    run.textContent = meta?.title || '';
  }
  el.classList.toggle('left', two && side === 'left');
  el.classList.toggle('right', !two || side === 'right');
  requestAnimationFrame(() => {
    inner.classList.toggle(
      'is-short',
      !!(page && inner.clientHeight && inner.scrollHeight < inner.clientHeight * 0.78)
    );
  });
}

function paintPages() {
  const left = $('pageLeft');
  const right = $('pageRight');
  const two = spreadOn();
  const a = app.pages[app.pageIndex];
  const b = two ? app.pages[app.pageIndex + 1] : null;
  left.classList.add('active', 'turning');
  fillPage(left, a, app.pageIndex + 1, 'left', two);
  if (two && b) {
    right.classList.add('active', 'turning');
    fillPage(right, b, app.pageIndex + 2, 'right', two);
  } else {
    right.classList.remove('active');
    fillPage(right, null, 0, 'right', two);
  }
  setTimeout(() => {
    left.classList.remove('turning');
    right.classList.remove('turning');
  }, 280);
  updateProgressUi();
  fillToc(app.book);
  setTitle();
  const live = $('pageLive');
  if (live) {
    live.textContent = `${$('currentChapter').textContent}, page ${$('currentPage').textContent} of ${$('totalPages').textContent}`;
  }
}

function showStage(name) {
  const prev = document.body.dataset.stage;
  document.body.dataset.stage = name;
  const cover = $('coverPage');
  $('libraryView').hidden = name !== 'library';
  if (name === 'cover') {
    cover.hidden = false;
    if (prev === 'read' || prev === 'end') {
      cover.classList.add('opened');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => cover.classList.remove('opened'));
      });
    } else {
      cover.classList.remove('opened');
    }
  } else if (name === 'read' && prev === 'cover') {
    cover.hidden = false;
    cover.classList.add('opened');
    window.setTimeout(() => {
      if (document.body.dataset.stage === 'read') {
        cover.hidden = true;
        cover.classList.remove('opened');
      }
    }, 580);
  } else if (name !== 'cover') {
    cover.classList.add('opened');
    window.setTimeout(() => {
      if (document.body.dataset.stage !== 'cover') cover.hidden = true;
    }, 420);
  }
  $('pagesWrapper').classList.toggle('active', name === 'read');
  $('backCover').classList.toggle('show', name === 'end');
  $('pageNav').hidden = name !== 'read';
  $('readerChrome').classList.toggle('is-reading', name === 'read');
  showReadHint(name === 'read');
  const proof = $('proofRibbon');
  if (proof) proof.hidden = !(app.book && !app.book.published && name !== 'library');
}

function setTitle() {
  const book = app.book;
  if (!book) {
    document.title = imprintName();
    return;
  }
  const stage = document.body.dataset.stage;
  if (stage === 'read') {
    const meta = app.book.contents.find((c) => c.id === chapterOfPage(app.pageIndex));
    document.title = meta ? `${meta.title} — ${book.title}` : book.title;
    return;
  }
  document.title = book.title;
}

function fillCover(book, { draft }) {
  $('coverTitle').textContent = book.title;
  $('coverSubtitle').textContent = book.subtitle || '';
  $('coverAuthor').textContent = book.authors ? book.authors.replace(/@/g, '').trim() : '';
  $('coverYear').textContent = book.year || '';
  const imprint = [book.publisher, book.edition].filter(Boolean).join(' · ');
  $('coverImprint').textContent = imprint;
  $('backImprint').textContent = imprint;
  const words = wordCount(book);
  const mins = readingMinutes(words);
  const metaBits = [
    words ? `${words.toLocaleString()} words` : '',
    words ? `~${mins} min` : '',
    book.isbn ? `ISBN ${book.isbn}` : '',
  ].filter(Boolean);
  if (book.revision?.sha) {
    const day = (book.revision.date || '').slice(0, 10);
    metaBits.push(day ? `${book.revision.sha.slice(0, 7)} · ${day}` : book.revision.sha.slice(0, 7));
  } else if (book.modified) {
    const when = new Date(book.modified);
    if (!Number.isNaN(when.getTime())) {
      metaBits.push(`as of ${when.toISOString().slice(0, 10)}`);
    }
  }
  $('coverMeta').textContent = metaBits.join(' · ');
  document.documentElement.lang = htmlLang(book.language);
  $('backColophon').textContent = [
    book.year ? `© ${book.year}` : '',
    book.publisher || '',
    book.isbn ? `ISBN ${book.isbn}` : '',
  ].filter(Boolean).join(' · ');
  $('draftBadge').hidden = !draft;
  document.body.classList.toggle('is-draft', draft);
  const proof = $('proofRibbon');
  if (proof) proof.hidden = !draft || document.body.dataset.stage === 'library';
  const face = $('coverFront');
  face.style.setProperty('--cloth', clothColor(book.slug));
  if (book.cover) {
    face.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.42)), url("${book.cover}")`;
    face.classList.add('has-art');
  } else {
    face.style.backgroundImage = '';
    face.classList.remove('has-art');
  }
  $('backTitle').textContent = book.title;
  $('backAuthor').textContent = book.authors ? book.authors.replace(/@/g, '') : '';
  const prog = loadProgress(book.slug);
  const canContinue = !!(prog && book.contents.some((c) => c.id === prog.chapter));
  $('startBtn').textContent = canContinue ? 'Continue' : 'Begin';
  $('startOverBtn').hidden = !canContinue;
  if ($('copyPreviewBtn')) {
    $('copyPreviewBtn').textContent = draft ? 'Preview link' : 'Link';
  }
  fillProof(book, draft);
  const src = $('sourceLink');
  if (src) src.href = sourceUrl(book);
  const hist = $('historyLink');
  if (hist) {
    const { owner, repo } = githubRepo();
    hist.href = book.revision?.url
      || `https://github.com/${owner}/${repo}/commits/main/books/${book.slug}`;
    hist.hidden = false;
  }
  setTitle();
}

function htmlLang(value) {
  if (!value) return 'en';
  const v = value.trim();
  if (/^[a-z]{2}([-_][A-Za-z]{2})?$/.test(v)) return v.replace('_', '-');
  const map = { english: 'en', french: 'fr', spanish: 'es', german: 'de' };
  return map[v.toLowerCase()] || 'en';
}

function fillProof(book, draft) {
  const issues = [];
  if (draft && !book.cover) issues.push('No cover image (media/cover.png)');
  for (const ch of book.chapters || []) {
    if (ch.missing) issues.push(`Missing file: ${ch.file}`);
    else if (!(ch.markdown || '').replace(/^#.*$/m, '').trim()) issues.push(`Empty: ${ch.title}`);
  }
  const list = $('proofList');
  list.innerHTML = '';
  list.hidden = issues.length === 0;
  for (const issue of issues) {
    const li = document.createElement('li');
    li.textContent = issue;
    list.appendChild(li);
  }
}

function fillToc(book) {
  if (!book) return;
  const list = $('tocList');
  const current = chapterOfPage(app.pageIndex);
  const readCh = loadStats(book.slug).chapters || [];
  list.innerHTML = '';
  for (const c of book.contents) {
    const li = document.createElement('li');
    li.className = 'toc-item';
    if (readCh.includes(c.id)) li.classList.add('is-read');
    const a = document.createElement('a');
    a.className = 'toc-link';
    if (c.id === current) a.classList.add('is-current');
    a.href = readHash(book.slug, c.id, 0);
    a.textContent = c.title;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      $('tocOverlay').classList.remove('active');
      go(readHash(book.slug, c.id, 0));
    });
    li.appendChild(a);
    list.appendChild(li);
    const loaded = book.chapters?.find((x) => x.id === c.id);
    if (loaded?.markdown) {
      for (const h of headingOffsets(loaded.markdown).filter((x) => x.level === 2)) {
        const sub = document.createElement('li');
        sub.className = 'toc-item toc-sub';
        const sa = document.createElement('a');
        sa.className = 'toc-link';
        sa.href = readHash(book.slug, c.id, h.offset);
        sa.textContent = h.title;
        sa.addEventListener('click', (e) => {
          e.preventDefault();
          $('tocOverlay').classList.remove('active');
          go(readHash(book.slug, c.id, h.offset));
        });
        sub.appendChild(sa);
        list.appendChild(sub);
      }
    }
  }
  const marks = loadBookmarks(book.slug);
  const box = $('tocMarks');
  const ul = $('bookmarkList');
  ul.innerHTML = '';
  box.hidden = marks.length === 0;
  for (const m of marks) {
    const meta = book.contents.find((c) => c.id === m.chapter);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'toc-link';
    a.href = readHash(book.slug, m.chapter, m.offset);
    a.textContent = meta ? meta.title : m.chapter;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      $('tocOverlay').classList.remove('active');
      go(readHash(book.slug, m.chapter, m.offset));
    });
    li.appendChild(a);
    ul.appendChild(li);
  }
  const notes = loadNotes(book.slug);
  const notesBox = $('tocNotes');
  const notesUl = $('noteList');
  notesUl.innerHTML = '';
  notesBox.hidden = notes.length === 0;
  for (const n of notes) {
    const meta = book.contents.find((c) => c.id === n.chapter);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'toc-link';
    a.href = readHash(book.slug, n.chapter, n.offset || 0);
    a.textContent = n.body || n.quote || (meta ? meta.title : n.chapter);
    a.addEventListener('click', (e) => {
      e.preventDefault();
      $('tocOverlay').classList.remove('active');
      go(readHash(book.slug, n.chapter, n.offset || 0));
    });
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'toc-close';
    del.textContent = '×';
    del.title = 'Remove note';
    del.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeNote(book.slug, n.id);
      paintPages();
    });
    li.appendChild(a);
    li.appendChild(del);
    notesUl.appendChild(li);
  }
  const edit = $('editChapterLink');
  const wrap = $('tocEditWrap');
  const href = githubEditUrl(book, chapterOfPage(app.pageIndex));
  wrap.hidden = !href;
  if (href) {
    edit.href = href;
    edit.textContent = 'Edit this chapter on GitHub';
  }
}

function renderContinue() {
  const card = $('continueCard');
  const slug = app.prefs.lastSlug;
  if (!slug) {
    card.hidden = true;
    return;
  }
  const book = app.catalog.find((b) => b.slug === slug) || app.books.get(slug);
  const prog = loadProgress(slug);
  if (!book || !prog) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  $('continueCardTitle').textContent = book.title;
  $('continueCardLink').href = readHash(slug, prog.chapter, prog.offset || 0);
}

function renderPublisherFilters(entries) {
  const box = $('pubFilters');
  const pubs = [...new Set(entries.map((b) => b.publisher).filter(Boolean))];
  box.hidden = pubs.length === 0;
  if (!pubs.length) return;
  const labels = ['All', ...pubs];
  box.innerHTML = '';
  for (const label of labels) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.classList.toggle('active', app.pubFilter === label);
    btn.addEventListener('click', () => {
      app.pubFilter = label;
      renderShelf(app.catalog);
    });
    box.appendChild(btn);
  }
}

function volumeEl(book) {
  const a = document.createElement('a');
  a.className = 'volume';
  a.href = coverHash(book.slug);
  a.style.setProperty('--cloth', clothColor(book.slug));
  const n = (book.contents || []).length || 3;
  a.style.setProperty('--block', `${Math.min(16, Math.max(3, Math.round(n * 0.55)))}px`);
  const progress = loadProgress(book.slug);
  const last = app.prefs.lastSlug === book.slug;
  a.classList.toggle('is-reading', !!(progress || last));
  if (book.cover) a.classList.add('has-art');
  const coverStyle = book.cover
    ? ` style="background-image: linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.5)), url('${book.cover}')"`
    : '';
  a.innerHTML = `
      <span class="volume-spine"></span>
      <span class="volume-block"></span>
      <span class="volume-cover"${coverStyle}>
        ${progress || last ? '<span class="reading-ribbon">Reading</span>' : ''}
        <span class="volume-title">${escapeHtml(book.title)}</span>
        <span class="volume-author">${escapeHtml((book.authors || '').replace(/@/g, ''))}</span>
        ${book.publisher ? `<span class="volume-imprint">${escapeHtml(book.publisher)}</span>` : ''}
        <span class="volume-open">Open</span>
      </span>`;
  a.addEventListener('click', (e) => {
    e.preventDefault();
    go(coverHash(book.slug));
  });
  a.addEventListener('pointerenter', () => {
    loadBook(book.slug).catch(() => {});
  }, { once: true });
  return a;
}

function sortEntries(list) {
  const copy = list.slice();
  if (app.sortMode === 'recent') {
    copy.sort((a, b) => Date.parse(b.modified || 0) - Date.parse(a.modified || 0));
  } else {
    copy.sort((a, b) => a.title.localeCompare(b.title));
  }
  return copy;
}

function renderShelf(entries) {
  renderContinue();
  renderPublisherFilters(entries);
  const filtered = sortEntries(
    entries.filter((b) => app.pubFilter === 'All' || b.publisher === app.pubFilter)
  );
  const shelf = $('shelf');
  const stacks = $('stacks');
  const empty = $('emptyShelf');
  stacks.innerHTML = '';
  shelf.innerHTML = '';
  empty.hidden = filtered.length > 0;
  const seriesMap = new Map();
  const rest = [];
  for (const book of filtered) {
    if (book.series) {
      if (!seriesMap.has(book.series)) seriesMap.set(book.series, []);
      seriesMap.get(book.series).push(book);
    } else rest.push(book);
  }
  for (const [name, books] of seriesMap) {
    const block = document.createElement('section');
    block.className = 'stack';
    const h = document.createElement('h2');
    h.className = 'stack-title';
    h.textContent = name;
    const row = document.createElement('div');
    row.className = 'shelf';
    books.forEach((b) => row.appendChild(volumeEl(b)));
    block.appendChild(h);
    block.appendChild(row);
    stacks.appendChild(block);
  }
  rest.forEach((b) => shelf.appendChild(volumeEl(b)));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function rememberBook(slug) {
  app.prefs.lastSlug = slug;
  savePrefs(app.prefs);
}

function setLoader(on) {
  $('loader').hidden = !on;
}

function githubRepo() {
  const named = imprintGithub();
  if (named?.owner && named?.repo) return named;
  const href = $('writeLink')?.getAttribute('href') || '';
  const m = href.match(/github\.com\/([^/]+)\/([^/#]+)/);
  return m ? { owner: m[1], repo: m[2].replace(/\.git$/, '') } : { owner: 'Svyable', repo: 'bookself' };
}

function sourceUrl(book) {
  if (!book) return '#';
  const { owner, repo } = githubRepo();
  return `https://github.com/${owner}/${repo}/tree/main/books/${book.slug}`;
}

function citeBook(book) {
  const authors = (book.authors || '').replace(/@/g, '').trim();
  const year = book.year || '';
  const pub = book.publisher || '';
  const url = `${window.location.origin}${window.location.pathname}?b=${encodeURIComponent(book.slug)}`;
  const rev = book.revision?.sha
    ? ` ${book.revision.sha.slice(0, 7)}${book.revision.date ? `, ${(book.revision.date || '').slice(0, 10)}` : ''}.`
    : '';
  return `${authors}${authors ? '. ' : ''}${book.title}.${pub || year ? ' ' : ''}${[pub, year].filter(Boolean).join(', ')}. ${url}.${rev}`;
}

function feedbackUrl(quote) {
  if (!app.book) return '#';
  const { owner, repo } = githubRepo();
  const ch = app.book.contents.find((c) => c.id === chapterOfPage(app.pageIndex));
  const title = `[Feedback]: ${app.book.title}${ch ? ` — ${ch.title}` : ''}`;
  const body = [
    `**Book:** \`${app.book.slug}\``,
    ch ? `**Chapter:** ${ch.title} (\`${ch.file}\`)` : '',
    quote ? `**Passage:**\n\n> ${quote}` : '',
    `**Reader:** ${locationUrl()}`,
    '',
    'What would you change, and why?',
  ].filter(Boolean).join('\n');
  return `https://github.com/${owner}/${repo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

function githubEditUrl(book, chapterId) {
  if (!book || !chapterId) return '';
  const ch = book.contents.find((c) => c.id === chapterId);
  if (!ch) return '';
  const { owner, repo } = githubRepo();
  return `https://github.com/${owner}/${repo}/edit/main/books/${book.slug}/${ch.file}`;
}

function locationUrl() {
  return `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied');
  } catch {
    toast('Could not copy');
  }
}

function wrapCanvasLines(ctx, text, maxWidth) {
  const words = String(text).replace(/\s+/g, ' ').trim().split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 8);
}

async function downloadQuoteCard(quote, book) {
  const w = 1200;
  const h = 630;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#16120e';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#c4a265';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(88, 88);
  ctx.lineTo(220, 88);
  ctx.stroke();
  ctx.fillStyle = '#ede6d9';
  ctx.font = 'italic 40px Georgia, serif';
  const lines = wrapCanvasLines(ctx, `“${quote}”`, w - 176);
  let y = 180;
  for (const line of lines) {
    ctx.fillText(line, 88, y);
    y += 54;
  }
  ctx.fillStyle = '#c4a265';
  ctx.font = '20px Georgia, serif';
  ctx.fillText(book.title, 88, h - 96);
  ctx.fillStyle = '#8a8274';
  ctx.font = '16px Georgia, serif';
  ctx.fillText(locationUrl(), 88, h - 62);
  canvas.toBlob((blob) => {
    if (!blob) {
      toast('Could not make card');
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${book.slug}-quote.png`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Quote card saved');
  }, 'image/png');
}

function printBook() {
  if (!app.book) {
    toast('Open a book first');
    return;
  }
  const wasRead = document.body.dataset.stage === 'read';
  if (!app.pages.length) {
    $('pagesWrapper').classList.add('active');
    sizeMeasure();
    rebuildPages({ cooperative: false });
    if (!wasRead) $('pagesWrapper').classList.remove('active');
  }
  if (!app.pages.length) {
    toast('Open a book first');
    return;
  }
  const root = $('printRoot');
  root.hidden = false;
  const titlePage = `<section class="print-page print-title">
    <h1>${escapeHtml(app.book.title)}</h1>
    <p>${escapeHtml((app.book.authors || '').replace(/@/g, ''))}</p>
    <p>${escapeHtml([app.book.publisher, app.book.edition].filter(Boolean).join(' · '))}</p>
    ${app.book.revision?.sha ? `<p>rev. ${escapeHtml(app.book.revision.sha.slice(0, 7))}</p>` : ''}
  </section>`;
  root.innerHTML = titlePage + app.pages
    .map((p) => `<section class="print-page">${p.html}</section>`)
    .join('');
  const after = () => {
    root.innerHTML = '';
    root.hidden = true;
    window.removeEventListener('afterprint', after);
  };
  window.addEventListener('afterprint', after);
  window.print();
}

function exportNotes() {
  if (!app.book) {
    toast('Open a book first');
    return;
  }
  const notes = loadNotes(app.book.slug);
  if (!notes.length) {
    toast('No notes yet');
    return;
  }
  const blob = new Blob([notesMarkdown(app.book, notes)], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${app.book.slug}-notes.md`;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function runLibrarySearch(query) {
  const box = $('libraryHits');
  if (!box) return;
  const q = query.trim();
  if (q.length < 2) {
    box.hidden = true;
    box.innerHTML = '';
    return;
  }
  await Promise.all(app.catalog.map((e) => loadBook(e.slug).catch(() => null)));
  const books = app.catalog.map((e) => app.books.get(e.slug)).filter(Boolean);
  const hits = searchLibrary(books, q);
  box.innerHTML = '';
  box.hidden = hits.length === 0;
  if (!hits.length) {
    box.hidden = false;
    box.innerHTML = '<li>No titles or passages.</li>';
    return;
  }
  for (const hit of hits) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const slug = hit.book.slug;
    a.href = hit.chapter ? readHash(slug, hit.chapter, hit.offset) : coverHash(slug);
    a.innerHTML = `<strong>${escapeHtml(hit.book.title)}</strong><em>${escapeHtml(hit.snippet || hit.title)}</em>`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      go(hit.chapter ? readHash(slug, hit.chapter, hit.offset) : coverHash(slug));
    });
    li.appendChild(a);
    box.appendChild(li);
  }
}

function runSearch(query) {
  const box = $('searchHits');
  box.innerHTML = '';
  if (!app.book) return;
  const hits = searchBook(app.book, query);
  if (!hits.length && query.trim().length >= 2) {
    box.innerHTML = '<li>No passages found.</li>';
    return;
  }
  for (const hit of hits) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = readHash(app.book.slug, hit.chapter, hit.offset);
    a.innerHTML = `<strong>${escapeHtml(hit.title)}</strong><em>${escapeHtml(hit.snippet)}</em>`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      $('searchOverlay').classList.remove('active');
      go(readHash(app.book.slug, hit.chapter, hit.offset));
    });
    li.appendChild(a);
    box.appendChild(li);
  }
}

function hideSelPop() {
  $('selPop').hidden = true;
}

function positionSelPop(rect) {
  const pop = $('selPop');
  pop.hidden = false;
  const vv = window.visualViewport;
  const leftOff = vv ? vv.offsetLeft : 0;
  const topOff = vv ? vv.offsetTop : 0;
  const vw = vv ? vv.width : window.innerWidth;
  const popW = Math.min(pop.offsetWidth || 180, vw - 16);
  const left = Math.min(Math.max(8 + leftOff, rect.left + leftOff), leftOff + vw - popW - 8);
  const top = Math.max(8 + topOff, rect.top + topOff - 42);
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
}

function currentSelection() {
  const sel = window.getSelection();
  const text = sel && sel.toString().trim();
  if (!text) return null;
  const node = sel.anchorNode;
  const page = node && node.parentElement && node.parentElement.closest('.page-surface');
  if (!page) return null;
  const chapter = page === $('pageRight') && app.pages[app.pageIndex + 1]
    ? app.pages[app.pageIndex + 1].chapter
    : chapterOfPage(app.pageIndex);
  const offset = page === $('pageRight') && app.pages[app.pageIndex + 1]
    ? app.pages[app.pageIndex + 1].start
    : currentOffset();
  return { text, chapter, offset, sel };
}

async function openCover(slug) {
  setLoader(true);
  try {
    const cached = app.books.get(slug);
    if (!cached || !cached.published) app.books.delete(slug);
    const book = await loadBook(slug);
    app.slug = slug;
    app.book = book;
    rememberBook(slug);
    fillCover(book, { draft: !book.published });
    fillToc(book);
    showStage('cover');
  } finally {
    setLoader(false);
  }
}

async function openRead(slug, chapter, offset) {
  setLoader(true);
  try {
    const book = await loadBook(slug);
    app.slug = slug;
    app.book = book;
    rememberBook(slug);
    fillCover(book, { draft: !book.published });
    fillToc(book);
    showStage('read');
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await rebuildPages({ commitUi: false });
    if (!app.pages.length) {
      await new Promise((r) => requestAnimationFrame(r));
      await rebuildPages({ commitUi: false });
    }
    const ch = chapter && book.contents.some((c) => c.id === chapter)
      ? chapter
      : book.contents[0]?.id;
    app.pageIndex = pageIndexForOffset(app.pages, ch, offset || 0);
    paintPages();
    persist();
    startSession();
    markChapter(ch);
  } finally {
    setLoader(false);
  }
}

function openEnd() {
  showStage('end');
}

function startSession() {
  if (app.sessionBook === app.slug) {
    renderStats();
    return;
  }
  app.sessionBook = app.slug;
  if (app.statsTimer) clearInterval(app.statsTimer);
  app.statsTimer = setInterval(() => tickStats(), 60000);
  renderStats();
}

function tickStats() {
  if (!app.slug) return;
  const stats = loadStats(app.slug);
  stats.minutes = (stats.minutes || 0) + 1;
  saveStats(app.slug, stats);
  renderStats();
}

function markChapter(id) {
  if (!app.slug || !id) return;
  const stats = loadStats(app.slug);
  if (!stats.chapters.includes(id)) stats.chapters.push(id);
  saveStats(app.slug, stats);
}

function renderStats() {
  if (!app.slug) return;
  const stats = loadStats(app.slug);
  const pct = percentRead();
  $('statsPercent').textContent = `${pct}%`;
  $('pagesRead').textContent = String(app.pageIndex + 1);
  $('chaptersRead').textContent = String((stats.chapters || []).length);
  const m = stats.minutes || 0;
  $('timeSpent').textContent = m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
  $('readingTime').textContent = $('timeSpent').textContent;
  $('statsCircle').style.setProperty('--pct', String(pct));
}

function showReadHint(on) {
  const el = $('readHint');
  if (!el) return;
  if (!on || app.prefs?.seenHint) {
    el.hidden = true;
    return;
  }
  el.hidden = false;
  window.setTimeout(() => dismissReadHint(), 7000);
}

function dismissReadHint() {
  const el = $('readHint');
  if (el) el.hidden = true;
  if (app.prefs && !app.prefs.seenHint) {
    app.prefs.seenHint = true;
    savePrefs(app.prefs);
  }
}

function prefersMotion() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playLeaf(delta) {
  if (!prefersMotion()) return;
  const wrap = $('pagesWrapper');
  if (!wrap) return;
  app.turning = true;
  wrap.classList.add(delta > 0 ? 'turn-next' : 'turn-prev');
  wrap.querySelectorAll('.page-curl.visible').forEach((el) => el.classList.remove('visible'));
  await wait(560);
  wrap.classList.remove('turn-next', 'turn-prev');
  app.turning = false;
}

async function turn(delta) {
  if (document.body.dataset.stage !== 'read') return;
  if (app.turning) return;
  dismissReadHint();
  const step = spreadOn() ? 2 : 1;
  const next = app.pageIndex + delta * step;
  if (next >= app.pages.length) {
    persist();
    await playLeaf(1);
    openEnd();
    go(readHash(app.slug, 'back-cover', 0));
    return;
  }
  if (next < 0) {
    persist();
    await playLeaf(-1);
    go(coverHash(app.slug));
    return;
  }
  await playLeaf(delta);
  app.pageIndex = Math.min(next, app.pages.length - 1);
  paintPages();
  persist();
  markChapter(chapterOfPage(app.pageIndex));
  go(readHash(app.slug, chapterOfPage(app.pageIndex), currentOffset()), { replace: true });
}

async function onRoute(route = parseRoute()) {
  $('tocOverlay').classList.remove('active');
  $('progressPanel').classList.remove('active');
  $('settingsPanel').classList.remove('active');
  $('searchOverlay').classList.remove('active');
  $('noteDialog').classList.remove('active');
  $('helpOverlay').classList.remove('active');
  hideSelPop();
  if (route.view === 'library') {
    showStage('library');
    app.slug = null;
    app.book = null;
    document.documentElement.lang = 'en';
    setTitle();
    renderShelf(app.catalog);
    return;
  }
  try {
    if (route.view === 'cover') {
      await openCover(route.slug);
      return;
    }
    if (route.chapter === 'back-cover') {
      const book = await loadBook(route.slug);
      app.slug = route.slug;
      app.book = book;
      fillCover(book, { draft: !book.published });
      openEnd();
      return;
    }
    if (
      app.book &&
      app.slug === route.slug &&
      app.pages.length &&
      document.body.dataset.stage === 'read'
    ) {
      const ch = route.chapter && app.book.contents.some((c) => c.id === route.chapter)
        ? route.chapter
        : app.book.contents[0]?.id;
      app.pageIndex = pageIndexForOffset(app.pages, ch, route.offset || 0);
      paintPages();
      persist();
      return;
    }
    await openRead(route.slug, route.chapter, route.offset);
  } catch (err) {
    console.error(err);
    $('shelfError').hidden = false;
    $('shelfError').textContent = err.message || 'Could not open that book.';
    setTitle();
    renderShelf(app.catalog);
    showStage('library');
  }
}

function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(app.toastTimer);
  app.toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 1800);
}

function toggleBookmark() {
  if (!app.slug || !app.pages[app.pageIndex]) return;
  const ch = app.pages[app.pageIndex];
  const marks = loadBookmarks(app.slug);
  const idx = marks.findIndex((m) => m.chapter === ch.chapter && m.offset === ch.start);
  if (idx >= 0) {
    marks.splice(idx, 1);
    toast('Bookmark removed');
  } else {
    marks.push({ chapter: ch.chapter, offset: ch.start });
    toast('Bookmark added');
  }
  saveBookmarks(app.slug, marks);
  updateProgressUi();
  fillToc(app.book);
}

function bindUi() {
  $('logoBtn').addEventListener('click', () => go(libraryHash()));
  $('startBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const first = app.book.contents[0]?.id;
    const prog = loadProgress(app.slug);
    if (prog?.chapter && !$('startOverBtn').hidden) {
      go(readHash(app.slug, prog.chapter, prog.offset || 0));
    } else {
      go(readHash(app.slug, first, 0));
    }
  });
  $('startOverBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    go(readHash(app.slug, app.book.contents[0]?.id, 0));
  });
  $('rereadBtn').addEventListener('click', () => go(coverHash(app.slug)));
  $('homeFromEnd').addEventListener('click', () => go(libraryHash()));
  $('prevBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    turn(-1);
  });
  $('nextBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    turn(1);
  });
  $('viewModeBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    app.prefs.viewMode = app.prefs.viewMode === 'spread' ? 'single' : 'spread';
    savePrefs(app.prefs);
    applyPrefs();
    if (document.body.dataset.stage === 'read') {
      const ch = chapterOfPage(app.pageIndex);
      const off = currentOffset();
      rebuildPages();
      app.pageIndex = pageIndexForOffset(app.pages, ch, off);
      paintPages();
      persist();
    }
  });
  document.querySelectorAll('[data-paper]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.prefs.theme = btn.dataset.paper;
      savePrefs(app.prefs);
      applyPrefs();
    });
  });
  $('fontDecrease').addEventListener('click', () => bumpFont(-1));
  $('fontIncrease').addEventListener('click', () => bumpFont(1));
  $('nightLightBtn').addEventListener('click', () => {
    app.prefs.nightLight = !app.prefs.nightLight;
    savePrefs(app.prefs);
    applyPrefs();
  });
  $('bookmarkBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBookmark();
  });
  $('progressBtn').addEventListener('click', () => {
    renderStats();
    $('progressPanel').classList.toggle('active');
  });
  $('statsClose').addEventListener('click', () => $('progressPanel').classList.remove('active'));
  $('tocBtn').addEventListener('click', () => $('tocOverlay').classList.toggle('active'));
  $('tocClose').addEventListener('click', () => $('tocOverlay').classList.remove('active'));
  $('tocSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.toc-item').forEach((item) => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
  $('searchBtn').addEventListener('click', () => {
    if (document.body.dataset.stage === 'library') {
      $('librarySearch')?.focus();
      return;
    }
    $('searchOverlay').classList.add('active');
    $('bookSearch').focus();
  });
  $('librarySearch')?.addEventListener('input', (e) => runLibrarySearch(e.target.value));
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.sortMode = btn.dataset.sort;
      document.querySelectorAll('[data-sort]').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      renderShelf(app.catalog);
    });
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-internal]');
    if (!a) return;
    e.preventDefault();
    go(a.getAttribute('href'));
  });
  $('downloadMd')?.addEventListener('click', () => {
    if (!app.book) {
      toast('Open a book first');
      return;
    }
    downloadText(`${app.book.slug}.md`, bookAsMarkdown(app.book), 'text/markdown');
  });
  $('downloadHtml')?.addEventListener('click', () => {
    if (!app.book) {
      toast('Open a book first');
      return;
    }
    downloadText(`${app.book.slug}.html`, bookAsHtml(app.book), 'text/html');
  });
  $('searchClose').addEventListener('click', () => $('searchOverlay').classList.remove('active'));
  $('bookSearch').addEventListener('input', (e) => runSearch(e.target.value));
  $('shareBtn').addEventListener('click', () => copyText(locationUrl()));
  $('copyPreviewBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    copyText(locationUrl());
  });
  $('citeBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (app.book) copyText(citeBook(app.book));
  });
  $('feedbackBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    window.open(feedbackUrl(), '_blank', 'noopener');
  });
  $('helpClose').addEventListener('click', () => $('helpOverlay').classList.remove('active'));
  $('helpBtn').addEventListener('click', () => $('helpOverlay').classList.toggle('active'));
  $('selReport').addEventListener('click', () => {
    const cur = currentSelection();
    hideSelPop();
    if (cur) window.open(feedbackUrl(cur.text), '_blank', 'noopener');
  });
  $('settingsBtn').addEventListener('click', () => {
    applyPrefs();
    $('settingsPanel').classList.toggle('active');
  });
  $('settingsClose').addEventListener('click', () => $('settingsPanel').classList.remove('active'));
  document.querySelectorAll('[data-font]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.prefs.fontFamily = btn.dataset.font;
      savePrefs(app.prefs);
      applyPrefs();
      if (document.body.dataset.stage === 'read') {
        const ch = chapterOfPage(app.pageIndex);
        const off = currentOffset();
        rebuildPages();
        app.pageIndex = pageIndexForOffset(app.pages, ch, off);
        paintPages();
      }
    });
  });
  document.querySelectorAll('[data-leading]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.prefs.lineHeight = btn.dataset.leading;
      savePrefs(app.prefs);
      applyPrefs();
      if (document.body.dataset.stage === 'read') {
        const ch = chapterOfPage(app.pageIndex);
        const off = currentOffset();
        rebuildPages();
        app.pageIndex = pageIndexForOffset(app.pages, ch, off);
        paintPages();
      }
    });
  });
  $('focusBtn').addEventListener('click', () => {
    app.prefs.focus = !app.prefs.focus;
    savePrefs(app.prefs);
    applyPrefs();
  });
  $('printBtn').addEventListener('click', () => printBook());
  $('exportNotesBtn').addEventListener('click', () => exportNotes());
  $('continueCardLink').addEventListener('click', (e) => {
    e.preventDefault();
    go($('continueCardLink').getAttribute('href'));
  });
  $('selCopy').addEventListener('click', async () => {
    const cur = currentSelection();
    if (cur) await copyText(cur.text);
    hideSelPop();
  });
  $('selShare').addEventListener('click', async () => {
    const cur = currentSelection();
    if (cur) await copyText(`“${cur.text}”\n${locationUrl()}`);
    hideSelPop();
  });
  $('selCard')?.addEventListener('click', async () => {
    const cur = currentSelection();
    hideSelPop();
    if (cur && app.book) await downloadQuoteCard(cur.text, app.book);
  });
  $('selNote').addEventListener('click', () => {
    const cur = currentSelection();
    hideSelPop();
    if (!cur || !app.slug) return;
    app.pendingNote = cur;
    $('noteQuote').textContent = cur.text;
    $('noteBody').value = '';
    $('noteDialog').classList.add('active');
    $('noteBody').focus();
  });
  $('noteCancel').addEventListener('click', () => $('noteDialog').classList.remove('active'));
  $('noteSave').addEventListener('click', () => {
    if (!app.pendingNote || !app.slug) return;
    addNote(app.slug, {
      chapter: app.pendingNote.chapter,
      offset: app.pendingNote.offset,
      quote: app.pendingNote.text,
      body: $('noteBody').value.trim(),
    });
    $('noteDialog').classList.remove('active');
    app.pendingNote = null;
    toast('Note saved');
    paintPages();
  });
  const showSelPop = () => {
    if (document.body.dataset.stage !== 'read') return;
    const cur = currentSelection();
    if (!cur) {
      hideSelPop();
      return;
    }
    const range = cur.sel.rangeCount ? cur.sel.getRangeAt(0) : null;
    if (!range) return;
    positionSelPop(range.getBoundingClientRect());
  };
  document.addEventListener('mouseup', () => {
    setTimeout(showSelPop, 10);
  });
  document.addEventListener('selectionchange', () => {
    if (!('ontouchstart' in window)) return;
    clearTimeout(app.selTimer);
    app.selTimer = setTimeout(showSelPop, 80);
  });
  $('pagesWrapper').addEventListener('click', (e) => {
    if (app.didSwipe) {
      app.didSwipe = false;
      return;
    }
    if (overlaysOpen()) return;
    if (e.target.closest('a, button, mark')) return;
    if (window.getSelection && window.getSelection().toString().trim()) return;
    const rect = $('pagesWrapper').getBoundingClientRect();
    const x = e.clientX - rect.left;
    turn(x < rect.width / 2 ? -1 : 1);
  });
  bindPageCurl();
  $('coverPage').addEventListener('click', (e) => {
    if (e.target.closest('button, a')) return;
    $('startBtn').click();
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) {
      if (e.key === 'Escape') {
        $('searchOverlay').classList.remove('active');
        $('noteDialog').classList.remove('active');
      }
      return;
    }
    const stage = document.body.dataset.stage;
    if (e.key === 'Escape') {
      if (
        $('tocOverlay').classList.contains('active') ||
        $('progressPanel').classList.contains('active') ||
        $('settingsPanel').classList.contains('active') ||
        $('searchOverlay').classList.contains('active') ||
        $('noteDialog').classList.contains('active') ||
        $('helpOverlay').classList.contains('active')
      ) {
        $('tocOverlay').classList.remove('active');
        $('progressPanel').classList.remove('active');
        $('settingsPanel').classList.remove('active');
        $('searchOverlay').classList.remove('active');
        $('noteDialog').classList.remove('active');
        $('helpOverlay').classList.remove('active');
        hideSelPop();
        return;
      }
      if (stage === 'read') go(coverHash(app.slug));
      else if (stage === 'cover' || stage === 'end') go(libraryHash());
      return;
    }
    if (stage === 'cover' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      $('startBtn').click();
      return;
    }
    if (document.body.dataset.stage !== 'read') return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') turn(-1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      turn(1);
    }
    if (e.key === 'b' || e.key === 'B') toggleBookmark();
    if (e.key === '/' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      $('searchOverlay').classList.add('active');
      $('bookSearch').focus();
    }
    if (e.key === 'f' || e.key === 'F') {
      app.prefs.focus = !app.prefs.focus;
      savePrefs(app.prefs);
      applyPrefs();
    }
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      $('helpOverlay').classList.toggle('active');
    }
  });

  document.addEventListener('touchstart', (e) => {
    if (overlaysOpen() || e.target.closest('input, textarea, a, button, .toc-overlay, .search-overlay, .stats-overlay, .sel-pop')) {
      app.touchStartX = null;
      return;
    }
    app.touchStartX = e.changedTouches[0].clientX;
    app.touchStartY = e.changedTouches[0].clientY;
    app.didSwipe = false;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (document.body.dataset.stage !== 'read') return;
    if (overlaysOpen()) return;
    if (app.touchStartX == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - app.touchStartX;
    const dy = t.clientY - (app.touchStartY || t.clientY);
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      app.didSwipe = true;
      turn(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  let resizeTimer;
  const onViewport = () => {
    app.isMobile = !canSpreadViewport();
    applyPrefs();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (document.body.dataset.stage !== 'read' || !app.book) return;
      const ch = chapterOfPage(app.pageIndex);
      const off = currentOffset();
      rebuildPages();
      app.pageIndex = pageIndexForOffset(app.pages, ch, off);
      paintPages();
    }, 150);
  };
  window.addEventListener('resize', onViewport);
  window.addEventListener('orientationchange', onViewport);
  window.visualViewport?.addEventListener('resize', onViewport);
}

function bumpFont(delta) {
  app.prefs.fontSize = Math.max(14, Math.min(28, app.prefs.fontSize + delta));
  savePrefs(app.prefs);
  applyPrefs();
  if (document.body.dataset.stage === 'read' && app.book) {
    const ch = chapterOfPage(app.pageIndex);
    const off = currentOffset();
    rebuildPages();
    app.pageIndex = pageIndexForOffset(app.pages, ch, off);
    paintPages();
    persist();
  }
}

function finePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function bindPageCurl() {
  const wrap = $('pagesWrapper');
  const prev = $('pageCurlPrev');
  const next = $('pageCurlNext');
  if (!wrap || !prev || !next) return;

  const motion = {
    grab: 0.5,
    grabT: 0.5,
    prev: 0,
    prevT: 0,
    next: 0,
    nextT: 0,
    raf: 0,
  };

  const setCurl = (el, amount, grab) => {
    const t = Math.max(0, Math.min(1, amount));
    el.style.setProperty('--grab', grab.toFixed(3));
    if (t <= 0.03) {
      el.classList.remove('visible');
      el.style.setProperty('--curl', '0');
      return;
    }
    el.classList.add('visible');
    el.style.setProperty('--curl', t.toFixed(3));
  };

  const paint = () => {
    setCurl(prev, motion.prev, motion.grab);
    setCurl(next, motion.next, motion.grab);
    wrap.classList.toggle('peel-prev', motion.prev > 0.03);
    wrap.classList.toggle('peel-next', motion.next > 0.03);
  };

  const tick = () => {
    const k = 0.18;
    motion.grab += (motion.grabT - motion.grab) * k;
    motion.prev += (motion.prevT - motion.prev) * k;
    motion.next += (motion.nextT - motion.next) * k;
    paint();
    const settled =
      Math.abs(motion.grab - motion.grabT) < 0.002
      && Math.abs(motion.prev - motion.prevT) < 0.002
      && Math.abs(motion.next - motion.nextT) < 0.002;
    if (settled) {
      motion.grab = motion.grabT;
      motion.prev = motion.prevT;
      motion.next = motion.nextT;
      paint();
      motion.raf = 0;
      return;
    }
    motion.raf = requestAnimationFrame(tick);
  };

  const kick = () => {
    if (!motion.raf) motion.raf = requestAnimationFrame(tick);
  };

  const hide = () => {
    motion.prevT = 0;
    motion.nextT = 0;
    kick();
  };

  const update = (e) => {
    if (!finePointer()) {
      hide();
      return;
    }
    if (document.body.dataset.stage !== 'read' || overlaysOpen() || app.turning) {
      hide();
      return;
    }
    if (window.getSelection && window.getSelection().toString().trim()) {
      hide();
      return;
    }
    const rect = wrap.getBoundingClientRect();
    const zone = Math.min(78, Math.max(40, rect.width * 0.09));
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (y < 0 || y > rect.height || x < 0 || x > rect.width) {
      hide();
      return;
    }
    motion.grabT = Math.max(0.04, Math.min(0.96, y / rect.height));
    motion.prevT = x < zone ? 1 - x / zone : 0;
    motion.nextT = x > rect.width - zone ? 1 - (rect.width - x) / zone : 0;
    kick();
  };

  wrap.addEventListener('pointermove', update);
  wrap.addEventListener('pointerleave', hide);
}

async function init() {
  applyImprint(await loadImprint());
  app.prefs = loadPrefs();
  applyPrefs();
  bindUi();

  const catalogReady = loadCatalog().catch((err) => {
    console.error(err);
    $('shelfError').hidden = false;
    $('shelfError').textContent =
      'Could not load the library catalog. Serve the repository root (not file://) so Markdown can be fetched.';
  });

  const routeQueue = createLatestRouteQueue(async (route) => {
    if (routeNeedsCatalog(route)) await catalogReady;
    await onRoute(route);
  }, {
    onError(error) {
      console.error('Reader route failed', error);
    },
  });

  const requestRoute = () => routeQueue.request(parseRoute());
  window.addEventListener('hashchange', requestRoute);
  window.addEventListener('popstate', requestRoute);
  requestRoute();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(new URL('../sw.js', import.meta.url)).catch(() => {});
  }
}

init();