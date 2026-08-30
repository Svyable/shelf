import { fileUrl } from './base.js';
import { installMarkedMath, setMathReferenceContext } from './math.js';
import { installMarkedAcademic, setAcademicContext } from './academic.js';
import { withSourceRange } from './reading-position.js';
import { createBoundedPairCache } from './derivation-cache.js';

const CHAPTER = '(?:manuscript\\/)?((?:ch[\\w-]+|front-matter|back-matter)(?:\\.md)?)';
const blockCache = createBoundedPairCache(96);
const headingCache = createBoundedPairCache(192);
let wikiInstalled = false;
let wikiSlug = '';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wikiId(target) {
  const id = String(target || '')
    .trim()
    .replace(/^manuscript\//i, '')
    .replace(/\.md$/i, '');
  return /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(id) ? id : '';
}

export function tokenizeWikiLink(src) {
  const match = String(src || '').match(/^\[\[([^\]|#]+?)(?:\|([^\]]+))?\]\]/);
  if (!match) return null;
  const id = wikiId(match[1]);
  if (!id) return null;
  return {
    raw: match[0],
    id,
    label: (match[2] || id).trim(),
  };
}

export function renderWikiLink(token, slug = wikiSlug) {
  const label = escapeHtml(token.label || token.id);
  if (!slug) return `<a href="manuscript/${encodeURIComponent(token.id)}.md">${label}</a>`;
  return `<a href="#/b/${encodeURIComponent(slug)}/${encodeURIComponent(token.id)}/0" data-internal="1">${label}</a>`;
}

export function installMarkedWiki(marked = globalThis.window?.marked) {
  if (wikiInstalled || !marked?.use) return false;
  marked.use({
    extensions: [
      {
        name: 'bookselfWikiLink',
        level: 'inline',
        start(src) {
          const index = String(src || '').indexOf('[[');
          return index >= 0 ? index : undefined;
        },
        tokenizer(src) {
          const token = tokenizeWikiLink(src);
          return token ? { type: 'bookselfWikiLink', ...token } : undefined;
        },
        renderer(token) {
          return renderWikiLink(token);
        },
      },
    ],
  });
  wikiInstalled = true;
  return true;
}

function rewriteUrls(html, slug) {
  const prefix = fileUrl(`books/${slug}/`);
  return html
    .replace(
      /(src|href)=["'](\.\.\/media\/[^"']+)["']/gi,
      (_, attr, rel) => `${attr}="${prefix}${rel.replace(/^\.\.\//, '')}"`
    )
    .replace(
      new RegExp(`href=["'](?:\\.\\/)?${CHAPTER}["']`, 'gi'),
      (_, file) => {
        const id = file.replace(/\.md$/i, '');
        return `href="#/b/${slug}/${id}/0" data-internal="1"`;
      }
    );
}

function prepareMarkdown(markdown, slug) {
  installMarkedMath();
  installMarkedAcademic();
  installMarkedWiki();
  wikiSlug = String(slug || '');
  setMathReferenceContext(markdown);
  setAcademicContext(markdown);
}

export function renderMarkdown(markdown, slug) {
  prepareMarkdown(markdown, slug);
  const raw = window.marked.parse(markdown, { gfm: true, breaks: false });
  return rewriteUrls(raw, slug);
}

export function headingOffsets(markdown) {
  const source = String(markdown ?? '');
  const cached = headingCache.get('headings', source);
  if (cached) return cached;

  const heads = [];
  const re = /^(#{1,3})\s+(.+)$/gm;
  let m;
  while ((m = re.exec(source))) {
    heads.push({
      level: m[1].length,
      title: m[2].trim(),
      offset: m.index,
    });
  }
  return headingCache.set('headings', source, heads);
}

export function blocksFromMarkdown(markdown, slug) {
  const source = String(markdown ?? '');
  const scope = String(slug || '');
  const cached = blockCache.get(scope, source);
  if (cached) return cached;

  prepareMarkdown(source, scope);
  const tokens = window.marked.lexer(source);
  const blocks = [];
  let offset = 0;
  for (const token of tokens) {
    const raw = token.raw ?? '';
    const start = offset;
    const end = offset + raw.length;
    offset = end;
    if (token.type === 'space' || raw.trim() === '') continue;
    const html = withSourceRange(
      rewriteUrls(window.marked.parser([token]), scope),
      start,
      end
    );
    blocks.push({ html, start, end, raw });
  }
  if (blocks.length === 0) {
    blocks.push({
      html: withSourceRange('<p></p>', 0, source.length),
      start: 0,
      end: source.length,
      raw: source,
    });
  }
  return blockCache.set(scope, source, blocks);
}

export function clearMarkdownDerivationCaches() {
  blockCache.clear();
  headingCache.clear();
}
