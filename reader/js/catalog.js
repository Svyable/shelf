/** Parse portal README and publication hubs. No extra config files. */

export function extractSection(markdown, heading) {
  const re = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'im');
  const match = re.exec(markdown);
  if (!match) return '';
  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const next = rest.search(/^##\s+/m);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

export function parsePortalCatalog(markdown) {
  const section = extractSection(markdown, 'The books') || markdown;
  const slugs = [];
  const re = /\]\((?:\.\/)?books\/([a-z0-9][a-z0-9-]*)\/?\)/gi;
  let m;
  while ((m = re.exec(section))) {
    const slug = m[1];
    if (slug === '_TEMPLATE') continue;
    if (!slugs.includes(slug)) slugs.push(slug);
  }
  return slugs;
}

function externalEntries(section) {
  if (!section) return [];
  const entries = [];
  const seen = new Set();
  const re = /^-\s+\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)(?:\s+[—–-]\s+(.+))?\s*$/gim;
  let m;
  while ((m = re.exec(section))) {
    const url = m[2].trim();
    if (seen.has(url)) continue;
    seen.add(url);
    let domain = url.replace(/^https?:\/\/(?:www\.)?/i, '').split('/')[0];
    try {
      domain = new URL(url).hostname.replace(/^www\./i, '') || domain;
    } catch {
      // Keep the simple parsed domain for a syntactically matched URL.
    }
    entries.push({
      title: m[1].trim(),
      url,
      note: (m[3] || '').trim(),
      domain,
    });
  }
  return entries;
}

export function parsePortalWebShelf(markdown) {
  const section = extractSection(markdown, 'The web shelf')
    || extractSection(markdown, 'Web shelf')
    || extractSection(markdown, 'Web volumes');
  return externalEntries(section);
}

export function parsePortalStand(markdown) {
  const section = extractSection(markdown, 'The stand') || extractSection(markdown, 'Magazine stand');
  return externalEntries(section);
}

function cell(markdown, label) {
  const re = new RegExp(
    `\\|\\s*\\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*\\s*\\|\\s*([^|\\n]+)\\|`,
    'i'
  );
  const m = markdown.match(re);
  return m ? m[1].trim() : '';
}

function normalizeFormat(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (['paper', 'whitepaper', 'white paper', 'research paper', 'preprint'].includes(raw)) return 'paper';
  if (['magazine', 'periodical', 'zine'].includes(raw)) return 'magazine';
  if (['newspaper', 'gazette', 'daily'].includes(raw)) return 'newspaper';
  if (['journal', 'academic journal', 'research journal'].includes(raw)) return 'journal';
  if (['newsletter', 'bulletin'].includes(raw)) return 'newsletter';
  if (['comic', 'graphic novel', 'graphic narrative'].includes(raw)) return 'comic';
  if (['anthology', 'collection'].includes(raw)) return 'anthology';
  if (['report', 'annual report', 'field report'].includes(raw)) return 'report';
  return 'book';
}

function parseLinks(value) {
  const links = [];
  const seen = new Set();
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gi;
  let m;
  while ((m = re.exec(String(value || '')))) {
    const url = m[2].trim();
    if (seen.has(url)) continue;
    seen.add(url);
    links.push({ label: m[1].trim(), url });
  }
  return links;
}

function mergeLinks(...lists) {
  const links = [];
  const seen = new Set();
  for (const list of lists) {
    for (const link of list) {
      if (!link?.url || seen.has(link.url)) continue;
      seen.add(link.url);
      links.push(link);
    }
  }
  return links;
}

function plainInlineText(value) {
  return String(value || '')
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)\s]+\)/gi, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseBookReadme(markdown, slug) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  const status = cell(markdown, 'Status');
  const authorsRaw = cell(markdown, 'Authors');
  const authors = plainInlineText(authorsRaw);
  const chaptersCell = cell(markdown, 'Chapters');
  const formatLabel = cell(markdown, 'Format');
  const contents = [];
  const re = /^- \[[ xX]\] \[([^\]]+)\]\((manuscript\/[^)\s]+)\)/gm;
  let m;
  while ((m = re.exec(markdown))) {
    const file = m[2].replace(/^\.\//, '');
    const id = file.replace(/^manuscript\//, '').replace(/\.md$/i, '');
    contents.push({ title: m[1].trim(), file, id });
  }
  return {
    slug,
    title,
    status,
    authors,
    authorsRaw,
    authorLinks: mergeLinks(parseLinks(authorsRaw), parseLinks(cell(markdown, 'Author Links'))),
    chaptersCell,
    format: normalizeFormat(formatLabel),
    formatLabel: formatLabel || 'Book',
    publisher: cell(markdown, 'Publisher'),
    venue: cell(markdown, 'Venue'),
    doi: cell(markdown, 'DOI'),
    edition: cell(markdown, 'Edition'),
    language: cell(markdown, 'Language'),
    isbn: cell(markdown, 'ISBN'),
    issn: cell(markdown, 'ISSN'),
    series: cell(markdown, 'Series'),
    volume: cell(markdown, 'Volume'),
    issue: cell(markdown, 'Issue'),
    publicationDate: cell(markdown, 'Publication date') || cell(markdown, 'Date'),
    frequency: cell(markdown, 'Frequency'),
    externalLinks: mergeLinks(
      parseLinks(cell(markdown, 'Links')),
      parseLinks(cell(markdown, 'Find elsewhere'))
    ),
    tags: cell(markdown, 'Tags')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    contents,
    published: status === 'Published',
  };
}

export function parseFrontMatterMeta(markdown) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const lines = markdown.split(/\n/).map((l) => l.trim()).filter(Boolean);
  let subtitle = '';
  let year = '';
  const copy = markdown.match(/©\s*(\d{4})/);
  if (copy) year = copy[1];
  for (const line of lines.slice(1)) {
    if (line.startsWith('#') || line.startsWith('©') || line.startsWith('|')) continue;
    subtitle = line.replace(/\.$/, '');
    break;
  }
  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    subtitle,
    year,
  };
}

export function clothColor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 33 + slug.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  const sat = 28 + (h % 18);
  const lit = 16 + (h % 10);
  return `hsl(${hue} ${sat}% ${lit}%)`;
}
