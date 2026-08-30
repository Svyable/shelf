import { READER_PRESENTATION_PRESETS } from '../reader/js/presentation.js';

export const PUBLICATION_FORMATS = Object.freeze({
  book: Object.freeze({ label: 'Book', format: 'Book', pieceLabel: 'Chapter 1', filename: 'chapter-01.md' }),
  paper: Object.freeze({ label: 'Paper / whitepaper', format: 'Paper', pieceLabel: 'Main text', filename: 'paper.md' }),
  magazine: Object.freeze({ label: 'Magazine / zine', format: 'Magazine', pieceLabel: 'Feature', filename: 'feature.md' }),
  newspaper: Object.freeze({ label: 'Newspaper', format: 'Newspaper', pieceLabel: 'Lead story', filename: 'lead-story.md' }),
  journal: Object.freeze({ label: 'Journal / proceedings', format: 'Journal', pieceLabel: 'Article', filename: 'article.md' }),
  newsletter: Object.freeze({ label: 'Newsletter', format: 'Newsletter', pieceLabel: 'Issue 1', filename: 'issue-01.md' }),
  anthology: Object.freeze({ label: 'Anthology / collection', format: 'Anthology', pieceLabel: 'First piece', filename: 'piece-01.md' }),
  report: Object.freeze({ label: 'Report', format: 'Report', pieceLabel: 'Findings', filename: 'findings.md' }),
  manual: Object.freeze({ label: 'Manual / handbook', format: 'Manual', pieceLabel: 'Getting started', filename: 'getting-started.md' }),
  comic: Object.freeze({ label: 'Comic / graphic narrative', format: 'Comic', pieceLabel: 'Page 1', filename: 'page-01.md' }),
});

export const STARTER_PRESETS = Object.freeze([
  ['book', 'Book · balanced serif'],
  ['literary', 'Literary · warm and classic'],
  ['modern-essay', 'Modern essay · clean sans'],
  ['editorial', 'Editorial · compact and open'],
  ['poetry', 'Poetry · airy and unhyphenated'],
  ['night-story', 'Night story · low-light fiction'],
  ['accessible', 'Accessible · larger high-contrast type'],
  ['quiet-study', 'Quiet study · calm learning text'],
].filter(([id]) => READER_PRESENTATION_PRESETS[id]));

const $ = (id) => document.getElementById(id);
const encoder = new TextEncoder();
let crcTable = null;

export function slugifyTitle(value) {
  const slug = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 72)
    .replace(/-+$/g, '');
  return slug || 'my-publication';
}

function markdownCell(value) {
  return String(value || '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
}

function rightsName(value) {
  return String(value || '')
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)\s]+\)/gi, '$1')
    .replace(/\\\|/g, '|')
    .replace(/^@/, '')
    .replace(/\s+/g, ' ')
    .trim() || 'Your Name';
}

function safePieceTitle(value, fallback) {
  const clean = String(value || '').replace(/[\r\n]+/g, ' ').trim();
  return clean || fallback;
}

function publicationRights(title, author, year) {
  return `# Rights & permissions — ${title}\n\n© ${year} ${author}. All Rights Reserved.\n\n**Work:** *${title}*  \n**Author and copyright owner:** ${author}  \n**Rights profile:** \`bookself-arr-v1\`\n\nThis work may be made publicly readable by the copyright owner. Public availability, source-visible Markdown, Git history, or a public Reader does not place the work in the public domain and does not grant an open-source or Creative Commons license.\n\nUnless the copyright owner separately grants permission, no license is granted to reproduce, republish, distribute, sell, sublicense, adapt, translate, create derivative editions, create synthetic narration, or commercially exploit this work.\n\nThe copyright owner expressly reserves rights concerning AI and machine-learning uses, including model training or fine-tuning, creation of model weights or embeddings for generative use, retrieval-augmented generation (RAG), grounding, AI-specific indexing, AI-generated summaries or substitutes, synthetic translation or narration, and other generative reuse.\n\nNothing in this statement is intended to prohibit a use independently permitted by applicable law, including an applicable fair-use, quotation, research, library, accessibility, or other statutory exception.\n\nThe title, author, copyright-owner identity, copyright notice, terms and conditions, this \`RIGHTS.md\`, \`rights.json\`, and links or identifiers referring to them are intended to remain associated with official copies as copyright-management information. Do not remove or alter this information without the copyright owner's authority. Any claim under 17 U.S.C. §1202 remains subject to that statute's knowledge, intent, and other requirements.\n\n\`rights.json\` is the machine-readable companion to this notice. Registration data is asserted only if a real registration number and effective date are deliberately recorded there; \`not-recorded-in-bookself\` is not a statement that the work is unregistered.\n\nHosting-provider terms are separate and may grant the host rights under its own agreement with the copyright owner.\n\nFor Bookself's explanation of these defaults and machine-readable rights signals, see https://github.com/Svyable/bookself/blob/main/docs/rights-and-ai.md\n`;
}

export function publicationRightsManifest(title, author, year) {
  const manifest = {
    schemaVersion: 1,
    policy: 'bookself-arr-v1',
    work: { title, author },
    copyright: {
      owner: author,
      year,
      notice: `© ${year} ${author}. All Rights Reserved.`,
    },
    license: {
      id: 'ARR',
      label: 'All Rights Reserved',
      file: 'RIGHTS.md',
    },
    permissions: {
      publicReading: true,
      conventionalSearch: true,
      reproduction: false,
      distribution: false,
      derivatives: false,
      commercialUse: false,
      aiTraining: false,
      aiGenerativeUse: false,
      aiRetrievalGrounding: false,
      aiIndexing: false,
      syntheticNarration: false,
      syntheticTranslation: false,
    },
    registration: {
      jurisdiction: 'US',
      status: 'not-recorded-in-bookself',
      number: null,
      effectiveDate: null,
    },
  };
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function starterBody(formatId, title) {
  const safe = title.replace(/[\r\n]+/g, ' ').trim();
  const shared = `# ${safe}\n\n`;
  switch (formatId) {
    case 'paper':
      return `${shared}## Abstract\n\n<!-- What did you ask, what did you find, and why does it matter? -->\n\n## Question\n\n<!-- State the problem or research question in plain language. -->\n\n## Evidence\n\n<!-- Add claims, citations, figures, tables, methods, or analysis here. -->\n\n## Conclusion\n\n<!-- What should a careful reader take away? -->\n`;
    case 'magazine':
      return `${shared}*Write a one-sentence dek that makes the reader want the next paragraph.*\n\n<!-- Open with a scene, person, tension, or surprising detail. -->\n\n## What changed\n\n<!-- Move from the opening into the larger story. -->\n\n> Pull out one sentence worth remembering.\n\n## Where it goes next\n\n<!-- End with motion, consequence, or a question that stays with the reader. -->\n`;
    case 'newspaper':
      return `${shared}**Dateline —** <!-- Put the most important new fact first. -->\n\n## What happened\n\n<!-- Who, what, when, where, why, and how. -->\n\n## Why it matters\n\n<!-- Add context and attributed evidence. -->\n\n## What comes next\n\n<!-- Name the next decision, deadline, or development. -->\n`;
    case 'journal':
      return `${shared}## Abstract\n\n<!-- Concise purpose, approach, result, and implication. -->\n\n## Introduction\n\n<!-- Situate the contribution and cite prior work. -->\n\n## Method or approach\n\n<!-- Make the work inspectable and reproducible where possible. -->\n\n## Findings\n\n<!-- Use semantic figures, tables, equations, and citations as needed. -->\n\n## Discussion\n\n<!-- Interpret the result, limits, and next questions. -->\n`;
    case 'newsletter':
      return `${shared}A short note from the editor goes here.\n\n## The one thing to know\n\n<!-- Lead with the most useful idea in this issue. -->\n\n## Worth your attention\n\n- First item\n- Second item\n- Third item\n\n## Until next time\n\n<!-- Close with a human sign-off. -->\n`;
    case 'anthology':
      return `${shared}<!-- Begin the first poem, essay, story, or collected piece here. -->\n\nA collection earns its shape one strong piece at a time.\n`;
    case 'report':
      return `${shared}## Executive summary\n\n<!-- Give a busy reader the result before the detail. -->\n\n## Findings\n\n1. First finding\n2. Second finding\n3. Third finding\n\n## Evidence\n\n<!-- Add tables, figures, observations, and sources. -->\n\n## Recommendations\n\n<!-- Turn the findings into decisions or next actions. -->\n`;
    case 'manual':
      return `${shared}## What you will accomplish\n\n<!-- Tell the reader what success looks like. -->\n\n## Before you begin\n\n- What you need\n- What you should know\n\n## Step 1\n\nDo the smallest useful thing first.\n\n## Check your result\n\n<!-- Describe how the reader knows the step worked. -->\n`;
    case 'comic':
      return `${shared}## Page 1\n\n**Panel 1.** <!-- Establish place, character, or motion. -->\n\n*Caption:* Add narration only if the image cannot carry it.\n\n**Character:** Dialogue goes here.\n\n**Panel 2.** <!-- Change the information, angle, or emotional beat. -->\n\n**SFX:** *sound*\n`;
    case 'book':
    default:
      return `${shared}<!-- Start with a scene, claim, question, or image that gives the reader somewhere to stand. -->\n\nWrite the first paragraph here.\n\n## Next movement\n\n<!-- Use headings only when the reader benefits from a visible turn. -->\n`;
  }
}

export function catalogSnippet({ title, slug, format }) {
  return `- [${String(title || 'Untitled').trim()}](books/${slugifyTitle(slug || title)}/) — ${format || 'Book'}`;
}

export function buildPublicationFiles(input = {}) {
  const formatId = Object.prototype.hasOwnProperty.call(PUBLICATION_FORMATS, input.format) ? input.format : 'book';
  const recipe = PUBLICATION_FORMATS[formatId];
  const title = String(input.title || '').trim() || 'Untitled Publication';
  const slug = slugifyTitle(input.slug || title);
  const authorCell = markdownCell(input.author) || 'Your Name';
  const author = rightsName(authorCell);
  const rightsOwnerCell = markdownCell(author);
  const pieceTitle = safePieceTitle(input.pieceTitle, recipe.pieceLabel);
  const preset = READER_PRESENTATION_PRESETS[input.preset] ? input.preset : 'book';
  const year = new Date().getFullYear();
  const readme = `# ${title}\n\n| | |\n|---|---|\n| **Authors** | ${authorCell} |\n| **Status** | Drafting |\n| **Format** | ${recipe.format} |\n| **Publisher** |  |\n| **Rights** | © ${year} ${rightsOwnerCell} · All Rights Reserved |\n| **AI use** | Training, RAG, AI indexing, and generative reuse reserved |\n| **Rights file** | [RIGHTS.md](RIGHTS.md) |\n| **Rights manifest** | [rights.json](rights.json) |\n| **Tags** |  |\n| **Edition** | 1 |\n| **Language** | English |\n| **Chapters** | 0 of 1 drafted |\n\n## Contents\n\n- [ ] [${pieceTitle}](manuscript/${recipe.filename})\n`;
  const presentation = `${JSON.stringify({ version: 1, preset }, null, 2)}\n`;
  const manuscript = starterBody(formatId, pieceTitle);
  return {
    slug,
    title,
    format: recipe.format,
    preset,
    catalog: catalogSnippet({ title, slug, format: recipe.format }),
    files: {
      [`${slug}/README.md`]: readme,
      [`${slug}/RIGHTS.md`]: publicationRights(title, author, year),
      [`${slug}/rights.json`]: publicationRightsManifest(title, author, year),
      [`${slug}/reader.json`]: presentation,
      [`${slug}/manuscript/${recipe.filename}`]: manuscript,
    },
  };
}

function getCrcTable() {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crcTable[n] = c >>> 0;
  }
  return crcTable;
}

export function crc32(bytes) {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (const byte of bytes) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function push16(out, value) {
  out.push(value & 0xff, (value >>> 8) & 0xff);
}

function push32(out, value) {
  out.push(value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff);
}

function dosStamp(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: ((date.getHours() & 31) << 11) | ((date.getMinutes() & 63) << 5) | ((Math.floor(date.getSeconds() / 2)) & 31),
    date: (((year - 1980) & 127) << 9) | (((date.getMonth() + 1) & 15) << 5) | (date.getDate() & 31),
  };
}

export function zipStore(files, stamp = new Date()) {
  const local = [];
  const central = [];
  let offset = 0;
  const { time, date } = dosStamp(stamp);
  const entries = Object.entries(files).map(([name, value]) => [name.replace(/^\/+/, ''), encoder.encode(String(value))]);

  for (const [name, data] of entries) {
    if (!name || name.split('/').includes('..')) throw new Error(`Unsafe archive path: ${name}`);
    const filename = encoder.encode(name);
    const crc = crc32(data);
    const header = [];
    push32(header, 0x04034b50);
    push16(header, 20);
    push16(header, 0x0800);
    push16(header, 0);
    push16(header, time);
    push16(header, date);
    push32(header, crc);
    push32(header, data.length);
    push32(header, data.length);
    push16(header, filename.length);
    push16(header, 0);
    local.push(...header, ...filename, ...data);

    const c = [];
    push32(c, 0x02014b50);
    push16(c, 20);
    push16(c, 20);
    push16(c, 0x0800);
    push16(c, 0);
    push16(c, time);
    push16(c, date);
    push32(c, crc);
    push32(c, data.length);
    push32(c, data.length);
    push16(c, filename.length);
    push16(c, 0);
    push16(c, 0);
    push16(c, 0);
    push16(c, 0);
    push32(c, 0);
    push32(c, offset);
    central.push(...c, ...filename);
    offset += header.length + filename.length + data.length;
  }

  const end = [];
  push32(end, 0x06054b50);
  push16(end, 0);
  push16(end, 0);
  push16(end, entries.length);
  push16(end, entries.length);
  push32(end, central.length);
  push32(end, local.length);
  push16(end, 0);
  return new Uint8Array([...local, ...central, ...end]);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatOptions() {
  return Object.entries(PUBLICATION_FORMATS)
    .map(([id, meta]) => `<option value="${id}">${escapeHtml(meta.label)}</option>`)
    .join('');
}

function presetOptions() {
  return STARTER_PRESETS
    .map(([id, label]) => `<option value="${id}">${escapeHtml(label)}</option>`)
    .join('');
}

function studioMarkup() {
  return `
    <section class="new-publication-studio" id="newPublicationStudio" aria-labelledby="newPublicationTitle">
      <div class="new-publication-head">
        <div>
          <p class="eyebrow">Start without a terminal</p>
          <h2 id="newPublicationTitle">New Publication Studio</h2>
          <p>Describe the work. Bookself creates a normal portable publication folder—Markdown, metadata, Reader design, and an author-owned rights evidence package included.</p>
        </div>
        <span class="new-publication-badge">No account · no build</span>
      </div>

      <div class="new-publication-grid">
        <form class="new-publication-form" id="newPublicationForm">
          <label>What are you making?
            <select id="newPublicationFormat">${formatOptions()}</select>
          </label>
          <label>Title
            <input id="newPublicationName" type="text" autocomplete="off" placeholder="The Working Title" required>
          </label>
          <label>Author
            <input id="newPublicationAuthor" type="text" autocomplete="name" placeholder="Your Name or @handle">
          </label>
          <label>First piece
            <input id="newPublicationPiece" type="text" autocomplete="off" placeholder="Chapter 1">
          </label>
          <label class="wide">Reader starting style
            <select id="newPublicationPreset">${presetOptions()}</select>
          </label>
        </form>

        <div class="new-publication-preview" aria-live="polite">
          <p class="eyebrow">Generated folder</p>
          <strong id="newPublicationSlug">my-publication</strong>
          <ul id="newPublicationFiles"></ul>
          <div class="new-publication-catalog">
            <span>Catalog line</span>
            <code id="newPublicationCatalog"></code>
          </div>
          <p class="new-publication-note">Nothing is uploaded automatically. You decide when these ordinary files enter Git history. The generated publication is All Rights Reserved by default; public does not mean open source. Registration fields remain neutral until you deliberately record real evidence.</p>
        </div>
      </div>

      <div class="new-publication-actions">
        <button class="primary-button" id="newPublicationSaveFolder" type="button">Save starter folder</button>
        <button class="secondary-button" id="newPublicationZip" type="button">Download ZIP</button>
        <button class="secondary-button" id="newPublicationCopyCatalog" type="button">Copy catalog line</button>
        <a class="secondary-button" id="newPublicationEditCatalog" href="#" target="_blank" rel="noopener">Open catalog</a>
      </div>
      <p class="new-publication-help" id="newPublicationHelp">Choose your repository’s <code>books/</code> folder when saving. If your browser cannot write folders directly, use the ZIP and add the generated folder under <code>books/</code>.</p>
    </section>`;
}

function currentInput() {
  const format = $('newPublicationFormat')?.value || 'book';
  const fallback = PUBLICATION_FORMATS[format]?.pieceLabel || 'Chapter 1';
  return {
    format,
    title: $('newPublicationName')?.value || '',
    author: $('newPublicationAuthor')?.value || '',
    pieceTitle: $('newPublicationPiece')?.value || fallback,
    preset: $('newPublicationPreset')?.value || 'book',
  };
}

function currentBundle() {
  return buildPublicationFiles(currentInput());
}

function renderBundle() {
  const bundle = currentBundle();
  $('newPublicationSlug').textContent = bundle.slug;
  $('newPublicationCatalog').textContent = bundle.catalog;
  $('newPublicationFiles').innerHTML = Object.keys(bundle.files)
    .map((path) => `<li><code>${escapeHtml(path)}</code></li>`)
    .join('');
  const format = $('newPublicationFormat')?.value || 'book';
  const piece = $('newPublicationPiece');
  if (piece && !piece.dataset.touched) piece.placeholder = PUBLICATION_FORMATS[format]?.pieceLabel || 'Chapter 1';
}

function downloadBlob(filename, bytes, type) {
  const blob = new Blob([bytes], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  }
}

async function saveStarterFolder() {
  const bundle = currentBundle();
  if (typeof window.showDirectoryPicker !== 'function') {
    downloadBlob(`${bundle.slug}.zip`, zipStore(bundle.files), 'application/zip');
    $('newPublicationHelp').textContent = 'Your browser does not expose folder writing here, so Bookself downloaded the same starter as a ZIP.';
    return;
  }
  try {
    const books = await window.showDirectoryPicker({ mode: 'readwrite' });
    const root = await books.getDirectoryHandle(bundle.slug, { create: true });
    for (const [path, content] of Object.entries(bundle.files)) {
      const relative = path.slice(bundle.slug.length + 1).split('/');
      const filename = relative.pop();
      let dir = root;
      for (const part of relative) dir = await dir.getDirectoryHandle(part, { create: true });
      const handle = await dir.getFileHandle(filename, { create: true });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
    }
    $('newPublicationHelp').textContent = `Saved ${bundle.slug}/. Add the catalog line to the root README when you want the Desk and Reader to discover it.`;
  } catch (error) {
    if (error?.name !== 'AbortError') $('newPublicationHelp').textContent = `Could not write the folder: ${error?.message || error}`;
  }
}

function bindUi() {
  $('newPublicationForm')?.addEventListener('input', renderBundle);
  $('newPublicationFormat')?.addEventListener('change', () => {
    const piece = $('newPublicationPiece');
    if (piece && !piece.value.trim()) delete piece.dataset.touched;
    renderBundle();
  });
  $('newPublicationPiece')?.addEventListener('input', (event) => {
    if (event.target.value.trim()) event.target.dataset.touched = 'true';
    else delete event.target.dataset.touched;
  });
  $('newPublicationZip')?.addEventListener('click', () => {
    const bundle = currentBundle();
    downloadBlob(`${bundle.slug}.zip`, zipStore(bundle.files), 'application/zip');
  });
  $('newPublicationSaveFolder')?.addEventListener('click', saveStarterFolder);
  $('newPublicationCopyCatalog')?.addEventListener('click', async () => {
    const copied = await copyText(currentBundle().catalog);
    $('newPublicationCopyCatalog').textContent = copied ? 'Copied' : 'Copy failed';
    window.setTimeout(() => { $('newPublicationCopyCatalog').textContent = 'Copy catalog line'; }, 1400);
  });
}

function syncDeskLinks() {
  const target = $('rootEditLink')?.href;
  const catalog = $('newPublicationEditCatalog');
  if (target && catalog && catalog.href !== target) catalog.href = target;
  const start = $('startBookLink');
  if (start && !start.dataset.newPublicationBound) {
    start.dataset.newPublicationBound = 'true';
    start.textContent = 'Start a publication';
    start.removeAttribute('target');
    start.removeAttribute('rel');
    start.href = '#newPublicationStudio';
    start.addEventListener('click', (event) => {
      event.preventDefault();
      $('newPublicationStudio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('newPublicationName')?.focus({ preventScroll: true });
    });
  }
}

function installStyles() {
  if (document.querySelector('link[data-new-publication-studio]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./new-publication.css?v=1', import.meta.url).href;
  link.dataset.newPublicationStudio = 'true';
  document.head.appendChild(link);
}

function installStudio() {
  if ($('newPublicationStudio')) return;
  const list = $('manuscriptList');
  if (!list) return;
  list.insertAdjacentHTML('beforebegin', studioMarkup());
  bindUi();
  renderBundle();
  syncDeskLinks();
  const rootEditLink = $('rootEditLink');
  if (rootEditLink) {
    const observer = new MutationObserver(syncDeskLinks);
    observer.observe(rootEditLink, { attributes: true, attributeFilter: ['href'] });
  }
}

function initialize() {
  installStyles();
  installStudio();
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
}
