import { fileUrl } from './base.js';
import { installMarkedMath, setMathReferenceContext } from './math.js';
import { installMarkedAcademic, setAcademicContext } from './academic.js';

const CHAPTER = '(?:manuscript\\/)?((?:ch[\\w-]+|front-matter|back-matter)(?:\\.md)?)';

export function expandWikiLinks(markdown) {
  return markdown.replace(/\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const id = target.trim().replace(/^manuscript\//, '').replace(/\.md$/i, '');
    return `[${label || id}](manuscript/${id}.md)`;
  });
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

function prepareMarkdown(markdown) {
  installMarkedMath();
  installMarkedAcademic();
  setMathReferenceContext(markdown);
  setAcademicContext(markdown);
}

export function renderMarkdown(markdown, slug) {
  prepareMarkdown(markdown);
  const raw = window.marked.parse(expandWikiLinks(markdown), { gfm: true, breaks: false });
  return rewriteUrls(raw, slug);
}

export function headingOffsets(markdown) {
  const heads = [];
  const re = /^(#{1,3})\s+(.+)$/gm;
  let m;
  while ((m = re.exec(markdown))) {
    heads.push({
      level: m[1].length,
      title: m[2].trim(),
      offset: m.index,
    });
  }
  return heads;
}

export function blocksFromMarkdown(markdown, slug) {
  prepareMarkdown(markdown);
  const tokens = window.marked.lexer(expandWikiLinks(markdown));
  const blocks = [];
  let offset = 0;
  for (const token of tokens) {
    const raw = token.raw ?? '';
    const start = offset;
    const end = offset + raw.length;
    offset = end;
    if (token.type === 'space' || raw.trim() === '') continue;
    const html = rewriteUrls(window.marked.parser([token]), slug);
    blocks.push({ html, start, end, raw });
  }
  if (blocks.length === 0) {
    blocks.push({
      html: '<p></p>',
      start: 0,
      end: markdown.length,
      raw: markdown,
    });
  }
  return blocks;
}
