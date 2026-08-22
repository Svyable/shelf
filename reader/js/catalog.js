/** Parse portal README and book hubs. No extra config files. */

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

function cell(markdown, label) {
  const re = new RegExp(
    `\\|\\s*\\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*\\s*\\|\\s*([^|\\n]+)\\|`,
    'i'
  );
  const m = markdown.match(re);
  return m ? m[1].trim() : '';
}

export function parseBookReadme(markdown, slug) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  const status = cell(markdown, 'Status');
  const authors = cell(markdown, 'Authors');
  const chaptersCell = cell(markdown, 'Chapters');
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
    chaptersCell,
    publisher: cell(markdown, 'Publisher'),
    edition: cell(markdown, 'Edition'),
    language: cell(markdown, 'Language'),
    isbn: cell(markdown, 'ISBN'),
    series: cell(markdown, 'Series'),
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
