import { go, parseRoute, readHash } from './router.js';

const ACADEMIC_CSS = 'css/academic.css?v=r1';
let markedInstalled = false;
let context = { footnotes: new Map(), citations: new Map() };

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
  const footnoteDefs = new Set();

  const footDefRe = /^\[\^([A-Za-z0-9_.:-]+)\]:[ \t]*(.*)$/gm;
  let match;
  while ((match = footDefRe.exec(source))) {
    footnoteDefs.add(match.index);
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
    citations.set(match[1], { key: match[1], offset: match.index, body: match[2] });
  }

  context = { footnotes, citations };
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
  };
}

export function tokenizeFootnoteRef(src) {
  const match = String(src || '').match(/^\[\^([A-Za-z0-9_.:-]+)\]/);
  if (!match) return null;
  const item = context.footnotes.get(match[1]);
  return {
    raw: match[0],
    key: match[1],
    number: item?.number || 1,
    offset: item?.offset,
  };
}

export function tokenizeCitationDefinition(src) {
  const match = String(src || '').match(/^\[@([A-Za-z0-9_.:-]+)\]:[ \t]*(.*)(?:\n|$)/);
  if (!match) return null;
  return { raw: match[0], key: match[1], body: match[2] };
}

export function tokenizeCitationRef(src) {
  const match = String(src || '').match(/^\[@([A-Za-z0-9_.:-]+)(?:\|([^\]]+))?\]/);
  if (!match) return null;
  const item = context.citations.get(match[1]);
  return {
    raw: match[0],
    key: match[1],
    label: (match[2] || match[1]).trim(),
    offset: item?.offset,
  };
}

export function tokenizeFigure(src) {
  const match = String(src || '').match(/^(?: {0,3})!\[([^\]]*)\]\((\S+?)[ \t]+"([^"]+)"\)[ \t]*(?:\n|$)/);
  if (!match) return null;
  return { raw: match[0], alt: match[1], href: match[2], caption: match[3] };
}

function academicLink({ href, className, key, label, offset, dataName }) {
  if (offset == null) {
    return `<span class="${className} reader-academic-missing">${label}</span>`;
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
          return `<aside class="reader-footnote" id="fn-${safeId(token.key)}"><sup>${token.number}</sup><div>${this.parser.parseInline(token.tokens)}</div></aside>\n`;
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
          return `<p class="reader-reference" id="ref-${safeId(token.key)}">${this.parser.parseInline(token.tokens)}</p>\n`;
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
            label: String(token.number),
            offset: token.offset,
            dataName: 'data-footnote-ref',
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
