import { parseBookReadme, parsePortalCatalog } from '../reader/js/catalog.js';

const state = {
  owner: '',
  repo: '',
  branch: 'main',
  role: 'instance',
  local: true,
  imprint: {},
  books: [],
  filter: 'all',
  query: '',
};

const $ = (id) => document.getElementById(id);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function parseRepo(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const github = raw.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  const pair = github ? `${github[1]}/${github[2]}` : raw.replace(/^https?:\/\//i, '');
  const match = pair.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/i, '') };
}

function inferGithubFromLocation() {
  const host = String(location.hostname || '').toLowerCase();
  if (!host.endsWith('.github.io')) return null;
  const owner = host.slice(0, -'.github.io'.length);
  const firstPath = location.pathname.split('/').filter(Boolean)[0] || '';
  return { owner, repo: firstPath || `${owner}.github.io` };
}

function repoKey() {
  return state.owner && state.repo ? `${state.owner}/${state.repo}` : '';
}

function hasGithub() {
  return Boolean(state.owner && state.repo);
}

function githubUrl(path = '') {
  return hasGithub() ? `https://github.com/${state.owner}/${state.repo}${path}` : '';
}

function apiUrl(path = '') {
  return `https://api.github.com/repos/${state.owner}/${state.repo}${path}`;
}

function rawUrl(path) {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/${state.owner}/${state.repo}/${state.branch}/${encodedPath}`;
}

function localUrl(path = '') {
  return new URL(`../${path}`, location.href).href;
}

function pagesBase() {
  if (state.local) return localUrl('');
  const userRepo = `${state.owner}.github.io`.toLowerCase();
  return state.repo.toLowerCase() === userRepo
    ? `https://${state.owner}.github.io/`
    : `https://${state.owner}.github.io/${state.repo}/`;
}

async function api(path = '') {
  const response = await fetch(apiUrl(path), { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) {
    const error = new Error(`GitHub returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function remoteText(path) {
  const response = await fetch(rawUrl(path), { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not read ${path}`);
  return response.text();
}

async function instanceText(path) {
  const response = await fetch(localUrl(path), { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not read local ${path}`);
  return response.text();
}

async function loadImprint() {
  try {
    const response = await fetch(localUrl('imprint.json'), { cache: 'no-store' });
    return response.ok ? response.json() : {};
  } catch {
    return {};
  }
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

function parseChecklist(markdown) {
  const entries = [];
  const re = /^- \[([ xX])\] \[([^\]]+)\]\((manuscript\/[^)\s]+)\)/gm;
  let match;
  while ((match = re.exec(markdown))) {
    entries.push({
      checked: match[1].toLowerCase() === 'x',
      title: match[2].trim(),
      file: match[3].replace(/^\.\//, ''),
    });
  }
  return entries;
}

function parseChapterCell(value) {
  const match = String(value || '').match(/(\d+)\s+of\s+(\d+)/i);
  return match ? { drafted: Number(match[1]), total: Number(match[2]) } : null;
}

function manuscriptChapters(checklist) {
  return checklist.filter((entry) => /(?:^|\/)ch\d+/i.test(entry.file) || /^ch(?:apter)?\s*\d+/i.test(entry.title));
}

function isPlaceholderBook(meta, markdown) {
  return meta.title === 'Your Book Title'
    || /@your-github-username/i.test(meta.authors)
    || /Start a book:\s*copy this folder/i.test(markdown);
}

function isPublicRole() {
  return state.role === 'shelf' || state.role === 'platform';
}

function analyzeBook(meta, markdown, cataloged, checklist) {
  const issues = [];
  const chapters = manuscriptChapters(checklist);
  const draftedChapters = chapters.filter((entry) => entry.checked).length;
  const allChecklistDone = checklist.length > 0 && checklist.every((entry) => entry.checked);
  const chapterCell = parseChapterCell(meta.chaptersCell);
  const placeholder = isPlaceholderBook(meta, markdown);

  if (!meta.title || meta.title === meta.slug || meta.title === 'Your Book Title') {
    issues.push({ severity: 'severe', message: 'Replace the placeholder book title.' });
  }
  if (!meta.authors || /@your-github-username/i.test(meta.authors)) {
    issues.push({ severity: 'severe', message: 'Add the real author or authors.' });
  }
  if (!meta.status) issues.push({ severity: 'severe', message: 'Add a Status row to the book README.' });
  if (!checklist.length) issues.push({ severity: 'severe', message: 'Add manuscript files to the Contents checklist.' });
  if (placeholder) issues.push({ severity: 'warn', message: 'Template setup text is still present.' });

  if (chapterCell && (chapterCell.total !== chapters.length || chapterCell.drafted !== draftedChapters)) {
    issues.push({
      severity: 'warn',
      message: `Chapters says “${meta.chaptersCell}”, but the checklist currently shows ${draftedChapters} of ${chapters.length} drafted.`,
    });
  }

  if (isPublicRole()) {
    if (meta.published && !cataloged) {
      issues.push({ severity: 'severe', message: 'Status is Published, but the root README does not catalog this book.' });
    }
    if (!meta.published && cataloged) {
      issues.push({ severity: 'severe', message: `The root README catalogs this book, but Status is “${meta.status || 'blank'}”.` });
    }
    if (meta.published && !allChecklistDone) {
      issues.push({ severity: 'warn', message: 'This published book still has unchecked Contents items.' });
    }
  } else if (state.role === 'desk' && meta.published) {
    issues.push({ severity: 'warn', message: 'Published status on a private Desk does not publish the book; release to the Shelf is a separate step.' });
  }

  const blockingIssues = issues.filter((issue) => issue.severity === 'severe');
  const ready = allChecklistDone && !placeholder && blockingIssues.length === 0
    && (state.role === 'desk' || (!meta.published && !cataloged));

  let nextStep = '';
  if (state.role === 'desk') {
    if (ready) nextStep = 'Ready to release. Run the local release command to prepare a verified Shelf snapshot.';
    else if (placeholder) nextStep = 'Finish the book setup: replace template metadata and confirm the manuscript structure.';
    else if (checklist.length && !allChecklistDone) {
      const remaining = checklist.filter((entry) => !entry.checked).length;
      nextStep = `Keep drafting. ${remaining} Contents item${remaining === 1 ? '' : 's'} remain unchecked.`;
    } else nextStep = 'Resolve the readiness items below before release.';
  } else if (meta.published && cataloged) {
    nextStep = 'Released edition. Keep it stable here; revise the next edition on the private Desk.';
  } else if (meta.published && !cataloged) {
    nextStep = 'Complete publishing by adding this book to the root README catalog.';
  } else if (!meta.published && cataloged) {
    nextStep = 'Fix the publication mismatch: publish the book or remove its root catalog row.';
  } else if (ready) {
    nextStep = 'Ready for editorial review. Publish through the normal release workflow rather than editing a released Shelf edition in place.';
  } else if (placeholder) {
    nextStep = 'Finish the book setup: replace template metadata and confirm the manuscript structure.';
  } else if (checklist.length && !allChecklistDone) {
    const remaining = checklist.filter((entry) => !entry.checked).length;
    nextStep = `Keep drafting. ${remaining} Contents item${remaining === 1 ? '' : 's'} remain unchecked.`;
  } else {
    nextStep = 'Review the manuscript hub and resolve the readiness items below.';
  }

  return { issues, ready, checklist, chapterCount: chapters.length, draftedChapters, allChecklistDone, nextStep };
}

async function loadBookFromMarkdown(slug, markdown, catalogSlugs) {
  const meta = parseBookReadme(markdown, slug);
  const checklist = parseChecklist(markdown);
  const cataloged = catalogSlugs.includes(slug);
  const analysis = analyzeBook(meta, markdown, cataloged, checklist);
  return { ...meta, ...analysis, cataloged, unreadable: false };
}

async function loadLocalBook(slug, catalogSlugs) {
  try {
    return await loadBookFromMarkdown(slug, await instanceText(`books/${slug}/README.md`), catalogSlugs);
  } catch {
    return unreadableBook(slug, catalogSlugs);
  }
}

async function loadRemoteBook(directory, catalogSlugs) {
  try {
    return await loadBookFromMarkdown(directory.name, await remoteText(`books/${directory.name}/README.md`), catalogSlugs);
  } catch {
    return unreadableBook(directory.name, catalogSlugs);
  }
}

function unreadableBook(slug, catalogSlugs) {
  return {
    slug, title: slug, status: 'Unreadable', authors: '', tags: [], checklist: [], chapterCount: 0,
    draftedChapters: 0, allChecklistDone: false, cataloged: catalogSlugs.includes(slug), ready: false,
    unreadable: true, nextStep: 'Open the book folder and repair or add its README hub.',
    issues: [{ severity: 'severe', message: 'The Desk could not read books/<slug>/README.md.' }],
  };
}

function statusState(book) {
  if (isPublicRole() && book.published && book.cataloged) return 'published';
  if (book.ready) return 'ready';
  if (/proof/i.test(book.status)) return 'proof';
  return 'drafting';
}

function statusLabel(book) {
  if (isPublicRole() && book.published && book.cataloged) return 'Published';
  if (book.ready) return state.role === 'desk' ? 'Ready to release' : 'Ready';
  return book.status || 'Drafting';
}

function chapterProgress(book) {
  return book.chapterCount ? Math.round((book.draftedChapters / book.chapterCount) * 100) : 0;
}

function bookMeta(book) {
  const items = [];
  if (book.series) items.push(`Series: ${book.series}`);
  if (book.publisher) items.push(`Publisher: ${book.publisher}`);
  if (book.edition) items.push(`Edition: ${book.edition}`);
  if (book.tags?.length) items.push(`Tags: ${book.tags.join(', ')}`);
  return items;
}

function chapterEditUrl(book, chapter) {
  if (!hasGithub()) return localUrl(`books/${book.slug}/${chapter.file}`);
  const file = chapter.file.split('/').map(encodeURIComponent).join('/');
  return githubUrl(`/edit/${encodeURIComponent(state.branch)}/books/${encodeURIComponent(book.slug)}/${file}`);
}

function renderChapters(card, book) {
  const list = card.querySelector('.chapter-list');
  card.querySelector('.chapter-summary').textContent = `${book.checklist.filter((entry) => entry.checked).length}/${book.checklist.length} complete`;
  if (!book.checklist.length) {
    list.innerHTML = '<li class="chapter-item"><span class="chapter-title">No Contents checklist found.</span></li>';
    return;
  }
  list.innerHTML = book.checklist.map((chapter) => `
    <li class="chapter-item ${chapter.checked ? 'done' : ''}">
      <span class="chapter-state" aria-hidden="true">${chapter.checked ? '✓' : ''}</span>
      <span class="chapter-title">${escapeHtml(chapter.title)}<small class="chapter-file">${escapeHtml(chapter.file)}</small></span>
      <a class="chapter-edit" href="${chapterEditUrl(book, chapter)}" target="_blank" rel="noopener">Edit</a>
    </li>`).join('');
}

function renderBook(book) {
  const card = $('bookCardTemplate').content.firstElementChild.cloneNode(true);
  card.dataset.slug = book.slug;
  card.dataset.state = statusState(book);

  const chip = card.querySelector('.status-chip');
  chip.textContent = statusLabel(book);
  chip.dataset.state = statusState(book);
  const health = card.querySelector('.health-chip');
  if (book.issues.length) {
    health.hidden = false;
    health.textContent = `${book.issues.length} issue${book.issues.length === 1 ? '' : 's'}`;
  }

  card.querySelector('.book-title').textContent = book.title;
  card.querySelector('.book-authors').textContent = book.authors || 'Author not set';
  card.querySelector('.completion-value').textContent = `${book.draftedChapters}/${book.chapterCount}`;
  card.querySelector('.progress-track span').style.width = `${chapterProgress(book)}%`;
  card.querySelector('.book-next-step').innerHTML = `<strong>Next:</strong> ${escapeHtml(book.nextStep)}`;
  card.querySelector('.issue-list').innerHTML = book.issues.map((issue) => `<li class="${issue.severity === 'severe' ? 'severe' : ''}">${escapeHtml(issue.message)}</li>`).join('');
  card.querySelector('.book-meta').innerHTML = bookMeta(book).map((item) => `<span>${escapeHtml(item)}</span>`).join('');

  card.querySelector('.preview-action').href = `${pagesBase()}reader/#/b/${encodeURIComponent(book.slug)}/`;
  card.querySelector('.edit-action').href = hasGithub()
    ? githubUrl(`/edit/${encodeURIComponent(state.branch)}/books/${encodeURIComponent(book.slug)}/README.md`)
    : localUrl(`books/${book.slug}/README.md`);
  card.querySelector('.folder-action').href = hasGithub()
    ? githubUrl(`/tree/${encodeURIComponent(state.branch)}/books/${encodeURIComponent(book.slug)}`)
    : localUrl(`books/${book.slug}/`);
  card.querySelector('.history-action').href = hasGithub()
    ? githubUrl(`/commits/${encodeURIComponent(state.branch)}/books/${encodeURIComponent(book.slug)}/README.md`)
    : localUrl(`books/${book.slug}/README.md`);

  renderChapters(card, book);
  return card;
}

function matchesFilter(book) {
  if (state.filter === 'all') return true;
  if (state.filter === 'published') return isPublicRole() ? book.published && book.cataloged : book.published;
  if (state.filter === 'ready') return book.ready;
  if (state.filter === 'issues') return book.issues.length > 0;
  if (state.filter === 'drafting') return !book.ready && !(isPublicRole() && book.published && book.cataloged);
  return true;
}

function renderBooks() {
  const query = state.query.trim().toLowerCase();
  const visible = state.books.filter((book) => {
    const search = `${book.title} ${book.authors} ${book.status} ${(book.tags || []).join(' ')}`.toLowerCase();
    return matchesFilter(book) && (!query || search.includes(query));
  });
  $('manuscriptList').replaceChildren(...visible.map(renderBook));
  $('deskEmpty').hidden = visible.length > 0;
}

function setSummaryLabels() {
  const labels = [...document.querySelectorAll('#summaryGrid .summary-label')];
  if (state.role === 'desk') {
    if (labels[1]) labels[1].textContent = 'Drafting';
    if (labels[2]) labels[2].textContent = 'Ready to release';
  } else {
    if (labels[1]) labels[1].textContent = 'Published';
    if (labels[2]) labels[2].textContent = 'Ready to publish';
  }
}

function renderSummary() {
  $('summaryBooks').textContent = String(state.books.length);
  $('summaryPublished').textContent = String(state.role === 'desk'
    ? state.books.filter((book) => !book.ready).length
    : state.books.filter((book) => book.published && book.cataloged).length);
  $('summaryReady').textContent = String(state.books.filter((book) => book.ready).length);
  $('summaryIssues').textContent = String(state.books.filter((book) => book.issues.length > 0).length);
  setSummaryLabels();
}

function configureRepoLinks(meta = {}) {
  const branch = encodeURIComponent(state.branch);
  const displayName = state.local ? (state.imprint.name || repoKey() || 'Local Bookself instance') : repoKey();
  $('repoName').textContent = displayName;
  $('repoDescription').textContent = state.local
    ? (state.imprint.description || `${state.role} instance`)
    : (meta.description || 'Git-native books and publishing workflow.');
  $('repoBranch').textContent = state.local ? state.role : state.branch;

  $('repoLink').hidden = !hasGithub();
  if (hasGithub()) $('repoLink').href = meta.html_url || githubUrl();
  $('readerLink').href = state.local ? localUrl('reader/') : `${pagesBase()}reader/`;
  $('startBookLink').href = hasGithub() ? githubUrl(`/tree/${branch}/books/_TEMPLATE`) : localUrl('books/_TEMPLATE/');
  $('authorGuideLink').href = state.local ? localUrl('docs/author-guide.md') : githubUrl(`/blob/${branch}/docs/author-guide.md`);
  $('rootEditLink').href = hasGithub() ? githubUrl(`/edit/${branch}/README.md`) : localUrl('README.md');
  $('rootEditLink').textContent = state.role === 'desk' ? 'Edit inventory' : 'Edit catalog';

  const label = document.querySelector('label[for="repoInput"]');
  if (label) label.textContent = 'Inspect another public repository';
  const help = $('repoHelp');
  if (help) {
    help.textContent = state.role === 'desk'
      ? 'This private Desk is loaded from the current instance. Remote switching is limited to public Bookself repositories.'
      : 'The current instance is loaded directly. You can also inspect another public Bookself repository by owner/repository.';
  }
}

function showLoading(message = 'Reading instance metadata and manuscript hubs.') {
  const status = $('deskStatus');
  status.hidden = false;
  status.classList.remove('error');
  status.innerHTML = `<div class="status-spinner" aria-hidden="true"></div><div><strong>Opening the publishing Desk…</strong><span>${escapeHtml(message)}</span></div>`;
}

function showError(error, label = 'this Bookself instance') {
  const status = $('deskStatus');
  status.hidden = false;
  status.classList.add('error');
  const hint = state.local
    ? 'Serve the repository over HTTP (for example, python3 -m http.server). file:// cannot load the Markdown workspace.'
    : error?.status === 404
      ? 'This remote repository may be private or unavailable. Private Desks should open their own local Desk; no GitHub token is requested here.'
      : 'GitHub could not be reached. Check the repository name or try again after the API rate limit resets.';
  status.innerHTML = `<div><strong>Could not open ${escapeHtml(label)}.</strong><span>${escapeHtml(hint)}</span></div>`;
  ['repoOverview', 'summaryGrid', 'deskControls'].forEach((id) => { $(id).hidden = true; });
  $('manuscriptList').replaceChildren();
}

function resetView() {
  state.books = [];
  state.query = '';
  state.filter = 'all';
  $('bookSearch').value = '';
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const active = button.dataset.filter === 'all';
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function finishLoad(meta = {}) {
  state.books.sort((a, b) => a.title.localeCompare(b.title));
  configureRepoLinks(meta);
  renderSummary();
  renderBooks();
  $('repoOverview').hidden = false;
  $('summaryGrid').hidden = false;
  $('deskControls').hidden = false;
  $('deskStatus').hidden = true;
  document.title = `Publishing Desk · ${state.imprint.name || repoKey() || 'Bookself'}`;
}

async function loadLocalWorkspace() {
  state.local = true;
  resetView();
  showLoading('Reading this instance directly.');
  try {
    state.imprint = await loadImprint();
    state.role = state.imprint.role || 'instance';
    const configured = parseRepo(`${state.imprint.github?.owner || ''}/${state.imprint.github?.repo || ''}`);
    const inferred = inferGithubFromLocation();
    const github = configured?.owner !== 'auto' && configured?.repo !== 'auto' ? configured : inferred;
    state.owner = github?.owner || '';
    state.repo = github?.repo || '';
    state.branch = state.imprint.github?.branch || 'main';
    $('repoInput').value = repoKey();

    const portalMarkdown = await instanceText('README.md');
    const slugs = parsePortalCatalog(portalMarkdown || '');
    showLoading(`Reading ${slugs.length} manuscript hub${slugs.length === 1 ? '' : 's'} from this ${state.role}…`);
    state.books = await mapLimit(slugs, 6, (slug) => loadLocalBook(slug, slugs));
    finishLoad();
  } catch (error) {
    console.error('Publishing Desk could not load local instance', error);
    showError(error);
  }
}

async function loadRemoteWorkspace(repo) {
  state.local = false;
  state.role = 'shelf';
  state.imprint = {};
  state.owner = repo.owner;
  state.repo = repo.repo;
  resetView();
  $('repoInput').value = repoKey();
  showLoading('Reading public repository metadata and manuscript hubs.');

  try {
    const meta = await api();
    state.branch = meta.default_branch || 'main';
    const [directories, portalMarkdown, remoteImprint] = await Promise.all([
      api(`/contents/books?ref=${encodeURIComponent(state.branch)}`),
      remoteText('README.md').catch(() => ''),
      remoteText('imprint.json').then((text) => JSON.parse(text)).catch(() => ({})),
    ]);
    state.imprint = remoteImprint;
    state.role = remoteImprint.role || 'shelf';
    const catalogSlugs = parsePortalCatalog(portalMarkdown || '');
    const bookDirectories = directories.filter((item) => item.type === 'dir' && !item.name.startsWith('_'));
    showLoading(`Reading ${bookDirectories.length} manuscript hub${bookDirectories.length === 1 ? '' : 's'} from this ${state.role}…`);
    state.books = await mapLimit(bookDirectories, 6, (directory) => loadRemoteBook(directory, catalogSlugs));
    finishLoad(meta);

    const params = new URLSearchParams(location.search);
    params.set('repo', repoKey());
    history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
  } catch (error) {
    console.error('Publishing Desk could not load remote repository', error);
    showError(error, repoKey());
  }
}

function bindUi() {
  $('repoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const repo = parseRepo($('repoInput').value);
    if (!repo) {
      $('repoInput').focus();
      $('repoInput').setCustomValidity('Use owner/repository or a GitHub repository URL.');
      $('repoInput').reportValidity();
      return;
    }
    $('repoInput').setCustomValidity('');
    loadRemoteWorkspace(repo);
  });

  $('repoInput').addEventListener('input', () => $('repoInput').setCustomValidity(''));
  $('bookSearch').addEventListener('input', (event) => { state.query = event.target.value; renderBooks(); });
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderBooks();
    });
  });
}

bindUi();
const initialRepo = parseRepo(new URLSearchParams(location.search).get('repo'));
if (initialRepo) loadRemoteWorkspace(initialRepo);
else loadLocalWorkspace();
