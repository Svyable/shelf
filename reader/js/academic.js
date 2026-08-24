import { go, parseRoute, readHash } from './router.js';

const ACADEMIC_CSS = 'css/academic.css?v=r1';
let markedInstalled = false;
let context = {
  footnotes: new Map(),
  citations: new Map(),
  duplicateFootnotes: new Set(),
  duplicateCitations: new Set(),
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeId(value) {
  return String(value || '').replace(/[^A-Za-z0-9_.:-]+/g, '-');
}

export function setAcademicContext(markdown) {
  const source = String(markdown || '');
  const footnotes = new Map();
  const citations = new Map();
  const duplicateFootnotes = new Set();
  const duplicateCitations = new Set();
  const footnoteDefs = new Set();

  const footDefRe = /^\[\^([A-Za-z0-9_.:-]+)\]:[ \t]*(.*)$/gm;
  let match;
  while ((match = footDefRe.exec(source))) {
    footnoteDefs.add(match.index);
    if (footnotes.has(match[1])) {
      duplicateFootnotes.add(match[1]);
      continue;
    }
    footnotes.set(match[1], { key: match[1], offset: match.index, body: match[2], number: 0 });
  }

  let nextFootnote = 1;
  const footRefRe = /\[\^([A-Za-z0-9_.:-]+)\]/g;
  while ((match = footRefRe.exec(source))) {
    if (footnoteDefs.has(match.index) || source[match.index + match[0].length] === ':') continue;
    const item = footnotes.get(match[1]);
    if (item && !item.number) item.number = nextFootnote++;
  }
  for (const item of footnotes.values()) {
    if (!item.number) item.number = nextFootnote++;
  }

  const citationDefRe = /^\[@([A-Za-z0-9_.:-]+)\]:[ \t]*(.*)$/gm;
  while ((match = citationDefRe.exec(source))) {
    if (citations.has(match[1])) {
      duplicateCitations.add(match[1]);
      continue;
    }
    citations.set(match[1], { key: match[1], offset: match.index, body: match[2] });
  }

  context = { footnotes, citations, duplicateFootnotes, duplicateCitations };
  return context;
}

export function tokenizeFootnoteDefinition(src) {
  const match = String(src || '').match(/^\[\^([A-Za-z0-9_.:-]+)\]:[ \t]*(.*)(?:\n|$)/);
  if (!match) return null;
  const item = context.footnotes.get(match[1]);
  return {
    raw: match[0],
    key: match[1],
    body: match[2],
    number: item?.number || 1,
    duplicate: context.duplicateFootnotes.has(match[1]),
  };
}

export function tokenizeFootnoteRef(src) {
  const match = String(src || '').match(/^\[\^([A-Za-z0-9_.:-]+)\]/);
  if (!match) return null;
  const item = context.footnotes.get(match[1]);
  const duplicate = context.duplicateFootnotes.has(match[1]);
  return {
    raw: match[0],
    key: match[1],
    number: item?.number || 1,
    offset: duplicate ? undefined : item?.offset,
    duplicate,
    missing: !item,
  };
}

export function tokenizeCitationDefinition(src) {
  const match = String(src || '').match(/^\[@([A-Za-z0-9_.:-]+)\]:[ \t]*(.*)(?:\n|$)/);
  if (!match) return null;
  return {
    raw: match[0],
    key: match[1],
    body: match[2],
    duplicate: context.duplicateCitations.has(match[1]),
  };
}

export function tokenizeCitationRef(src) {
  const match = String(src || '').match(/^\[@([A-Za-z0-9_.:-]+)(?:\|([^\]]+))?\]/);
  if (!match) return null;
  const item = context.citations.get(match[1]);
  const duplicate = context.duplicateCitations.has(match[1]);
  return {
    raw: match[0],
    key: match[1],
    label: (match[2] || match[1]).trim(),
    offset: duplicate ? undefined : item?.offset,
    duplicate,
  };
}

export function tokenizeFigure(src) {
  const match = String(src || '').match(/^(?: {0,3})!\[([^\]]*)\]\((\S+?)[ \t]+"([^"]+)"\)[ \t]*(?:\n|$)/);
  if (!match) return null;
  return { raw: match[0], alt: match[1], href: match[2], caption: match[3] };
}

function academicLink({ href, className, key, label, offset, dataName, duplicate = false, kind = 'reference' }) {
  if (offset == null) {
    const issue = duplicate ? 'Ambiguous' : 'Unresolved';
    const detail = duplicate
      ? `${issue} ${kind} key ${key}: duplicate definitions`
      : `${issue} ${kind} key ${key}`;
    const extraClass = duplicate ? ' reader-academic-ambiguous' : '';
    return `<span class="${className} reader-academic-missing${extraClass}" title="${escapeHtml(detail)}" aria-label="${escapeHtml(detail)}">${label}</span>`;
  }
  const attrs = ` data-academic-offset="${offset}" ${dataName}="${escapeHtml(key)}"`;
  return `<a class="${className}" href="${href}"${attrs}>${label}</a>`;
}

export function installMarkedAcademic(marked = globalThis.window?.marked) {
  if (markedInstalled || !marked?.use) return false;
  marked.use({
    extensions: [
      {
        name: 'bookselfFigure',
        level: 'block',
        tokenizer(src) {
          const token = tokenizeFigure(src);
          return token ? { type: 'bookselfFigure', ...token } : undefined;
        },
        renderer(token) {
          return `<figure class="reader-figure"><img src="${escapeHtml(token.href)}" alt="${escapeHtml(token.alt)}"><figcaption>${escapeHtml(token.caption)}</figcaption></figure>\n`;
        },
      },
      {
        name: 'bookselfFootnoteDefinition',
        level: 'block',
        tokenizer(src) {
          const token = tokenizeFootnoteDefinition(src);
          if (!token) return undefined;
          return { type: 'bookselfFootnoteDefinition', ...token, tokens: this.lexer.inlineTokens(token.body) };
        },
        renderer(token) {
          const id = token.duplicate ? '' : ` id="fn-${safeId(token.key)}"`;
          const className = token.duplicate ? 'reader-footnote reader-academic-ambiguous' : 'reader-footnote';
          const marker = token.duplicate ? '?' : token.number;
          const title = token.duplicate
            ? ` title="${escapeHtml(`Duplicate footnote key ${token.key}`)}"`
            : '';
          return `<aside class="${className}"${id}${title}><sup>${marker}</sup><div>${this.parser.parseInline(token.tokens)}</div></aside>\n`;
        },
      },
      {
        name: 'bookselfCitationDefinition',
        level: 'block',
        tokenizer(src) {
          const token = tokenizeCitationDefinition(src);
          if (!token) return undefined;
          return { type: 'bookselfCitationDefinition', ...token, tokens: this.lexer.inlineTokens(token.body) };
        },
        renderer(token) {
          const id = token.duplicate ? '' : ` id="ref-${safeId(token.key)}"`;
          const className = token.duplicate ? 'reader-reference reader-academic-ambiguous' : 'reader-reference';
          const title = token.duplicate
            ? ` title="${escapeHtml(`Duplicate citation key ${token.key}`)}"`
            : '';
          return `<p class="${className}"${id}${title}>${this.parser.parseInline(token.tokens)}</p>\n`;
        },
      },
      {
        name: 'bookselfFootnoteRef',
        level: 'inline',
        tokenizer(src) {
          const token = tokenizeFootnoteRef(src);
          return token ? { type: 'bookselfFootnoteRef', ...token } : undefined;
        },
        renderer(token) {
          const link = academicLink({
            href: `#fn-${safeId(token.key)}`,
            className: 'reader-footnote-ref',
            key: token.key,
            label: token.duplicate || token.missing ? '?' : String(token.number),
            offset: token.offset,
            dataName: 'data-footnote-ref',
            duplicate: token.duplicate,
            kind: 'footnote',
          });
          return `<sup class="reader-footnote-marker">${link}</sup>`;
        },
      },
      {
        name: 'bookselfCitationRef',
        level: 'inline',
        tokenizer(src) {
          const token = tokenizeCitationRef(src);
          return token ? { type: 'bookselfCitationRef', ...token } : undefined;
        },
        renderer(token) {
          const link = academicLink({
            href: `#ref-${safeId(token.key)}`,
            className: 'reader-citation',
            key: token.key,
            label: escapeHtml(token.label),
            offset: token.offset,
            dataName: 'data-citation-ref',
            duplicate: token.duplicate,
            kind: 'citation',
          });
          return `(${link})`;
        },
      },
    ],
  });
  markedInstalled = true;
  return true;
}

function installStyles() {
  if (typeof document === 'undefined' || document.querySelector(`link[href="${ACADEMIC_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = ACADEMIC_CSS;
  document.head.appendChild(link);
}

function protectAcademicLinks() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[data-academic-offset]');
    if (!link) return;
    const route = parseRoute();
    if (route.view !== 'read' || !route.slug || !route.chapter) return;
    event.preventDefault();
    event.stopPropagation();
    go(readHash(route.slug, route.chapter, Number(link.dataset.academicOffset || 0)));
  }, true);
}

if (typeof window !== 'undefined') {
  installStyles();
  installMarkedAcademic();
  protectAcademicLinks();
}
