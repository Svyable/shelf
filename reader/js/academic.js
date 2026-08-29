import { go, parseRoute, readHash } from './router.js';

const ACADEMIC_CSS = 'css/academic.css?v=r2';
const PREVIEW_GUTTER = 12;
const PREVIEW_GAP = 10;
let markedInstalled = false;
let context = { footnotes: new Map(), citations: new Map() };
let activePreview = null;

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

export function academicPreviewModel(kind, key) {
  const normalizedKind = kind === 'citation' ? 'citation' : 'footnote';
  const item = normalizedKind === 'citation'
    ? context.citations.get(key)
    : context.footnotes.get(key);
  if (!item) return null;
  return {
    kind: normalizedKind,
    key: item.key,
    offset: item.offset,
    body: item.body,
    label: normalizedKind === 'citation' ? 'Reference' : `Footnote ${item.number}`,
    targetId: `${normalizedKind === 'citation' ? 'ref' : 'fn'}-${safeId(item.key)}`,
  };
}

export function academicPreviewPlacement(anchorRect, previewSize, viewport, gutter = PREVIEW_GUTTER, gap = PREVIEW_GAP) {
  const width = Math.max(0, Number(previewSize?.width || 0));
  const height = Math.max(0, Number(previewSize?.height || 0));
  const viewportWidth = Math.max(0, Number(viewport?.width || 0));
  const viewportHeight = Math.max(0, Number(viewport?.height || 0));
  const anchorLeft = Number(anchorRect?.left || 0);
  const anchorRight = Number(anchorRect?.right || anchorLeft);
  const anchorTop = Number(anchorRect?.top || 0);
  const anchorBottom = Number(anchorRect?.bottom || anchorTop);

  const minLeft = gutter;
  const maxLeft = Math.max(minLeft, viewportWidth - width - gutter);
  const idealLeft = ((anchorLeft + anchorRight) / 2) - (width / 2);
  const left = Math.min(maxLeft, Math.max(minLeft, idealLeft));

  const below = anchorBottom + gap;
  const above = anchorTop - height - gap;
  const maxTop = Math.max(gutter, viewportHeight - height - gutter);
  let top;
  let placement;
  if (below + height <= viewportHeight - gutter || above < gutter) {
    top = Math.min(maxTop, Math.max(gutter, below));
    placement = 'below';
  } else {
    top = Math.min(maxTop, Math.max(gutter, above));
    placement = 'above';
  }

  return { left, top, placement };
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

function academicLink({ href, className, key, label, offset, dataName, kind }) {
  if (offset == null) {
    return `<span class="${className} reader-academic-missing">${label}</span>`;
  }
  const attrs = ` data-academic-offset="${offset}" data-academic-kind="${kind}" ${dataName}="${escapeHtml(key)}" aria-haspopup="dialog" aria-expanded="false"`;
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

function closeAcademicPreview({ restoreFocus = false } = {}) {
  if (!activePreview) return;
  const { dialog, trigger } = activePreview;
  trigger?.setAttribute('aria-expanded', 'false');
  dialog.remove();
  activePreview = null;
  if (restoreFocus && trigger?.isConnected) trigger.focus({ preventScroll: true });
}

function previewBodyHtml(model) {
  const target = document.getElementById(model.targetId);
  if (target) {
    if (model.kind === 'footnote') return target.querySelector('div')?.innerHTML || escapeHtml(model.body);
    return target.innerHTML || escapeHtml(model.body);
  }
  return escapeHtml(model.body);
}

function positionAcademicPreview(dialog, trigger) {
  dialog.style.left = '0px';
  dialog.style.top = '0px';
  const anchorRect = trigger.getBoundingClientRect();
  const previewRect = dialog.getBoundingClientRect();
  const placement = academicPreviewPlacement(
    anchorRect,
    previewRect,
    { width: window.innerWidth, height: window.innerHeight }
  );
  dialog.style.left = `${Math.round(placement.left)}px`;
  dialog.style.top = `${Math.round(placement.top)}px`;
  dialog.dataset.placement = placement.placement;
}

function openAcademicPreview(trigger) {
  const kind = trigger.dataset.academicKind;
  const key = trigger.dataset.footnoteRef || trigger.dataset.citationRef;
  const model = academicPreviewModel(kind, key);
  if (!model) return false;

  if (activePreview?.trigger === trigger) {
    closeAcademicPreview({ restoreFocus: true });
    return true;
  }
  closeAcademicPreview();

  const dialog = document.createElement('aside');
  dialog.className = 'reader-academic-preview';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'false');
  dialog.setAttribute('aria-label', model.label);
  dialog.tabIndex = -1;
  dialog.innerHTML = `
    <div class="reader-academic-preview__header">${escapeHtml(model.label)}</div>
    <div class="reader-academic-preview__body">${previewBodyHtml(model)}</div>
    <div class="reader-academic-preview__actions">
      <button type="button" class="reader-academic-preview__jump">Go to ${model.kind === 'citation' ? 'reference' : 'footnote'}</button>
      <button type="button" class="reader-academic-preview__close" aria-label="Close ${escapeHtml(model.label.toLowerCase())}">Close</button>
    </div>`;

  document.body.appendChild(dialog);
  positionAcademicPreview(dialog, trigger);
  trigger.setAttribute('aria-expanded', 'true');
  activePreview = { dialog, trigger, model };

  dialog.querySelector('.reader-academic-preview__jump')?.addEventListener('click', () => {
    const route = parseRoute();
    closeAcademicPreview();
    if (route.view === 'read' && route.slug && route.chapter) {
      go(readHash(route.slug, route.chapter, Number(model.offset || 0)));
    }
  });
  dialog.querySelector('.reader-academic-preview__close')?.addEventListener('click', () => {
    closeAcademicPreview({ restoreFocus: true });
  });
  dialog.focus({ preventScroll: true });
  return true;
}

function protectAcademicLinks() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[data-academic-offset]');
    if (!link) {
      if (activePreview && !event.target.closest?.('.reader-academic-preview')) closeAcademicPreview();
      return;
    }
    const route = parseRoute();
    if (route.view !== 'read' || !route.slug || !route.chapter) return;
    event.preventDefault();
    event.stopPropagation();
    if (!openAcademicPreview(link)) {
      go(readHash(route.slug, route.chapter, Number(link.dataset.academicOffset || 0)));
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !activePreview) return;
    event.preventDefault();
    closeAcademicPreview({ restoreFocus: true });
  });

  window.addEventListener('resize', () => closeAcademicPreview());
  window.addEventListener('orientationchange', () => closeAcademicPreview());
  document.addEventListener('scroll', (event) => {
    if (activePreview?.dialog.contains(event.target)) return;
    closeAcademicPreview();
  }, true);
}

if (typeof window !== 'undefined') {
  installStyles();
  installMarkedAcademic();
  protectAcademicLinks();
}