import { fetchDocument, firstExisting } from './base.js';
import { parseBookReadme } from './catalog.js';
import { parseRoute } from './router.js';

const $ = (id) => document.getElementById(id);
let currentRights = null;

function defaultRights(meta = {}) {
  const owner = String(meta.copyrightOwner || meta.authors || '').replace(/@/g, '').trim();
  const year = Number(meta.copyrightYear || meta.year) || null;
  return {
    title: String(meta.title || '').trim(),
    author: String(meta.authors || '').replace(/@/g, '').trim(),
    owner,
    year,
    notice: year && owner ? `© ${year} ${owner}. All Rights Reserved.` : 'All Rights Reserved.',
    rights: 'All Rights Reserved',
    aiUse: 'AI training, retrieval/grounding, indexing, and generative use reserved',
    registration: null,
  };
}

export function rightsSummary(meta = {}) {
  const fallback = defaultRights(meta);
  return {
    rights: String(meta.rights || fallback.rights).trim(),
    aiUse: String(meta.aiUse || fallback.aiUse).trim(),
  };
}

function cleanManifest(data, fallback) {
  if (!data || typeof data !== 'object' || Number(data.schemaVersion) !== 1) return fallback;
  const work = data.work && typeof data.work === 'object' ? data.work : {};
  const copyright = data.copyright && typeof data.copyright === 'object' ? data.copyright : {};
  const license = data.license && typeof data.license === 'object' ? data.license : {};
  const permissions = data.permissions && typeof data.permissions === 'object' ? data.permissions : {};
  const registration = data.registration && typeof data.registration === 'object' ? data.registration : {};
  const owner = String(copyright.owner || fallback.owner).trim();
  const year = Number(copyright.year || fallback.year) || null;
  const notice = String(copyright.notice || (year && owner ? `© ${year} ${owner}. All Rights Reserved.` : fallback.notice)).trim();
  const aiReserved = ['aiTraining', 'aiGenerativeUse', 'aiRetrievalGrounding', 'aiIndexing']
    .some((key) => permissions[key] === false);
  const registrationRecorded = registration.status && registration.status !== 'not-recorded-in-bookself';
  return {
    title: String(work.title || fallback.title).trim(),
    author: String(work.author || fallback.author).trim(),
    owner,
    year,
    notice,
    rights: String(license.label || fallback.rights).trim(),
    aiUse: aiReserved
      ? 'AI training, retrieval/grounding, indexing, and generative use reserved'
      : fallback.aiUse,
    registration: registrationRecorded
      ? {
          jurisdiction: String(registration.jurisdiction || '').trim(),
          status: String(registration.status || '').trim(),
          number: registration.number ? String(registration.number).trim() : '',
          effectiveDate: registration.effectiveDate ? String(registration.effectiveDate).trim() : '',
        }
      : null,
  };
}

async function loadManifest(slug, fallback) {
  try {
    const doc = await fetchDocument(`books/${slug}/rights.json`);
    return cleanManifest(JSON.parse(doc.text), fallback);
  } catch {
    return fallback;
  }
}

async function loadRights(slug) {
  if (!slug) return { ...defaultRights(), url: null };
  let meta = { slug };
  try {
    const hub = await fetchDocument(`books/${slug}/README.md`);
    meta = parseBookReadme(hub.text, slug);
  } catch {
    // Use conservative defaults below.
  }
  const fallback = { ...defaultRights(meta), ...rightsSummary(meta) };
  const resolved = await loadManifest(slug, fallback);
  const url = await firstExisting([
    `books/${slug}/RIGHTS.md`,
    'RIGHTS.md',
  ]);
  return { ...resolved, url };
}

function registrationText(registration) {
  if (!registration) return '';
  const bits = [];
  if (registration.jurisdiction) bits.push(`${registration.jurisdiction} copyright registration`);
  if (registration.number) bits.push(registration.number);
  if (registration.effectiveDate) bits.push(`effective ${registration.effectiveDate}`);
  return bits.join(' · ');
}

function fullNotice(meta) {
  return [meta.notice, meta.aiUse ? `${meta.aiUse}.` : '', registrationText(meta.registration)]
    .filter(Boolean)
    .join(' ')
    .replace(/\.\./g, '.');
}

function upsertMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function applyMachineMetadata(meta) {
  upsertMeta('copyright', meta.notice);
  upsertMeta('author', meta.author || meta.owner);
  upsertMeta('rights', `${meta.rights}; ${meta.aiUse}`);
  let script = $('bookselfRightsJsonLd');
  if (!script) {
    script = document.createElement('script');
    script.id = 'bookselfRightsJsonLd';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: meta.title || undefined,
    author: meta.author ? { '@type': 'Person', name: meta.author } : undefined,
    copyrightHolder: meta.owner ? { '@type': 'Person', name: meta.owner } : undefined,
    copyrightYear: meta.year || undefined,
    license: meta.url || undefined,
  });
}

function clearMachineMetadata() {
  upsertMeta('copyright', '');
  upsertMeta('author', '');
  upsertMeta('rights', '');
  $('bookselfRightsJsonLd')?.remove();
}

async function paintRights() {
  const route = parseRoute();
  const slug = route?.slug || '';
  const notice = $('rightsNotice');
  const rightsLink = $('rightsLink');
  if (!notice || !rightsLink) return;

  if (!slug) {
    currentRights = null;
    notice.hidden = true;
    rightsLink.hidden = true;
    rightsLink.removeAttribute('href');
    rightsLink.removeAttribute('title');
    clearMachineMetadata();
    return;
  }

  const meta = await loadRights(slug);
  currentRights = meta;
  notice.textContent = fullNotice(meta);
  notice.hidden = false;
  rightsLink.hidden = !meta.url;
  rightsLink.textContent = 'Rights & permissions';
  if (meta.url) rightsLink.href = meta.url;
  else rightsLink.removeAttribute('href');
  rightsLink.title = fullNotice(meta);
  applyMachineMetadata(meta);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function appendPrintRights() {
  if (!currentRights) return;
  const root = $('printRoot');
  if (!root || root.querySelector('[data-bookself-rights-print]')) return;
  const section = document.createElement('section');
  section.className = 'print-page print-title';
  section.dataset.bookselfRightsPrint = 'true';
  const registration = registrationText(currentRights.registration);
  section.innerHTML = `
    <h2>Rights & permissions</h2>
    <p>${escapeHtml(currentRights.notice)}</p>
    <p>${escapeHtml(currentRights.aiUse)}.</p>
    ${registration ? `<p>${escapeHtml(registration)}</p>` : ''}
    ${currentRights.url ? `<p>${escapeHtml(currentRights.url)}</p>` : ''}
  `;
  root.appendChild(section);
}

function requestPaint() {
  queueMicrotask(() => paintRights().catch(() => {}));
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', requestPaint, { once: true });
  } else {
    requestPaint();
  }
  window.addEventListener('hashchange', requestPaint);
  window.addEventListener('popstate', requestPaint);
  window.addEventListener('beforeprint', appendPrintRights);
  window.addEventListener('afterprint', () => {
    document.querySelectorAll('[data-bookself-rights-print]').forEach((el) => el.remove());
  });
}
