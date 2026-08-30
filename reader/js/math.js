import { horizontalKeyDestination, overflowInstruction, overflowState } from './content-navigation.js';

const KATEX_VERSION = '0.18.4';
const KATEX_URL = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`;
const KATEX_INTEGRITY = 'sha384-ykMNcWQhhTUb0YV9SPpPUFURHZ+tWmubkakGBP+OgNK/UXdO2gtzglWx0Rj9hnO3';
const MATH_CSS = 'css/math.css?v=r2';
const MATH_CACHE = 'obb-shell-v29';
const MATH_KEYS = 'ArrowLeft ArrowRight Home End Shift+PageUp Shift+PageDown';

let markedInstalled = false;
let engineRequested = false;
let referenceContext = new Map();
let mathNavigationInstalled = false;

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

function sourceAttribute(tex) {
  return escapeHtml(encodeURIComponent(String(tex || '')));
}

function trimMath(value) {
  return String(value || '').replace(/^\s+|\s+$/g, '');
}

function equationLabel(tex) {
  const match = String(tex || '').match(/\\label\{([^}]+)\}/);
  return match ? match[1].trim() : '';
}

function stripEquationLabel(tex) {
  return trimMath(String(tex || '').replace(/\\label\{[^}]+\}/g, ''));
}

export function tokenizeBlockMath(src) {
  const source = String(src || '');
  let match = source.match(/^(?: {0,3})\$\$[ \t]*\n?([\s\S]*?)\n?[ \t]*\$\$(?:[ \t]*\n|$)/);
  if (match) {
    const rawTex = trimMath(match[1]);
    if (rawTex) return {
      raw: match[0],
      tex: stripEquationLabel(rawTex),
      label: equationLabel(rawTex),
      display: true,
      delimiter: '$$',
    };
  }

  match = source.match(/^(?: {0,3})\\\[[ \t]*\n?([\s\S]*?)\n?[ \t]*\\\](?:[ \t]*\n|$)/);
  if (match) {
    const rawTex = trimMath(match[1]);
    if (rawTex) return {
      raw: match[0],
      tex: stripEquationLabel(rawTex),
      label: equationLabel(rawTex),
      display: true,
      delimiter: '\\[',
    };
  }

  match = source.match(/^(?: {0,3})(\\begin\{(equation\*?|align\*?|alignat\*?|gather\*?)\}[\s\S]*?\\end\{\2\})(?:[ \t]*\n|$)/);
  if (match) {
    const rawTex = trimMath(match[1]);
    if (rawTex) return {
      raw: match[0],
      tex: stripEquationLabel(rawTex),
      label: equationLabel(rawTex),
      display: true,
      delimiter: 'environment',
    };
  }

  return null;
}

export function tokenizeInlineMath(src) {
  const source = String(src || '');
  let match = source.match(/^\\eqref\{([^}]+)\}/);
  if (match) {
    return {
      raw: match[0],
      ref: match[1].trim(),
      display: false,
      delimiter: 'eqref',
    };
  }

  match = source.match(/^\\\(([^\n]+?)\\\)/);
  if (match) {
    const tex = trimMath(match[1]);
    if (tex) return { raw: match[0], tex, display: false, delimiter: '\\(' };
  }

  match = source.match(/^\$(?!\$|\s)((?:\\.|[^$\n\\])+?)\$(?!\$)/);
  if (match) {
    const tex = match[1];
    if (tex && !/\s$/.test(tex)) {
      return { raw: match[0], tex, display: false, delimiter: '$' };
    }
  }
  return null;
}

function blockStart(src) {
  const match = String(src || '').match(/(?:^|\n)( {0,3})(\$\$|\\\[|\\begin\{(?:equation|align|alignat|gather)\*?\})/);
  if (!match) return undefined;
  const prefix = match[0].startsWith('\n') ? 1 : 0;
  return match.index + prefix;
}

function inlineStart(src) {
  const indexes = [src.indexOf('$'), src.indexOf('\\('), src.indexOf('\\eqref{')]
    .filter((value) => value >= 0);
  return indexes.length ? Math.min(...indexes) : undefined;
}

export function setMathReferenceContext(markdown) {
  const source = String(markdown || '');
  const refs = new Map();
  let cursor = 0;
  let number = 1;
  while (cursor < source.length) {
    const next = blockStart(source.slice(cursor));
    if (next == null) break;
    const start = cursor + next;
    const token = tokenizeBlockMath(source.slice(start));
    if (!token) {
      cursor = start + 1;
      continue;
    }
    if (token.label && !refs.has(token.label)) {
      refs.set(token.label, { label: token.label, number, offset: start });
      number += 1;
    }
    cursor = start + Math.max(token.raw.length, 1);
  }
  referenceContext = refs;
  return refs;
}

function katexOptions(displayMode) {
  return {
    displayMode,
    output: 'mathml',
    throwOnError: false,
    strict: 'warn',
    trust: false,
    maxSize: 20,
    maxExpand: 1000,
  };
}

function mathAttributes(meta = {}) {
  const bits = [];
  if (meta.label) bits.push(` id="eq-${safeId(meta.label)}"`);
  if (meta.number) bits.push(` data-equation-number="${escapeHtml(meta.number)}"`);
  return bits.join('');
}

function equationNumberMarkup(meta = {}) {
  if (!meta.number) return '';
  return `<span class="reader-equation-number" aria-label="Equation ${escapeHtml(meta.number)}">(${escapeHtml(meta.number)})</span>`;
}

function renderedMarkup(tex, displayMode, inner, meta = {}) {
  const tag = displayMode ? 'div' : 'span';
  const modeClass = displayMode ? 'reader-math-display' : 'reader-math-inline';
  const equationClass = displayMode && meta.label ? ' reader-equation' : '';
  return `<${tag} class="reader-math ${modeClass}${equationClass}" data-math-rendered="true" data-math-source="${sourceAttribute(tex)}"${mathAttributes(meta)}>${inner}${equationNumberMarkup(meta)}</${tag}>`;
}

function pendingMarkup(tex, displayMode, meta = {}) {
  const tag = displayMode ? 'div' : 'span';
  const modeClass = displayMode ? 'reader-math-display' : 'reader-math-inline';
  const equationClass = displayMode && meta.label ? ' reader-equation' : '';
  const raw = displayMode ? `$$${tex}$$` : `$${tex}$`;
  return `<${tag} class="reader-math ${modeClass}${equationClass} reader-math-pending" data-math-rendered="false" data-math-source="${sourceAttribute(tex)}"${mathAttributes(meta)}><code>${escapeHtml(raw)}</code>${equationNumberMarkup(meta)}</${tag}>`;
}

export function renderMath(tex, displayMode = false, meta = {}) {
  const source = trimMath(tex);
  const katex = globalThis.katex;

  if (katex?.renderToString) {
    try {
      return renderedMarkup(source, displayMode, katex.renderToString(source, katexOptions(displayMode)), meta);
    } catch (error) {
      console.warn('Could not render LaTeX math', error);
    }
  }
  return pendingMarkup(source, displayMode, meta);
}

export function renderEquationRef(label) {
  const ref = referenceContext.get(String(label || '').trim());
  if (!ref) {
    return '<span class="reader-equation-ref reader-academic-missing">(?)</span>';
  }
  return `<a class="reader-equation-ref" href="#eq-${safeId(ref.label)}" data-academic-offset="${ref.offset}" data-equation-ref="${escapeHtml(ref.label)}" aria-label="Equation ${ref.number}">(${ref.number})</a>`;
}

export function installMarkedMath(marked = globalThis.window?.marked) {
  if (markedInstalled || !marked?.use) return false;
  marked.use({
    extensions: [
      {
        name: 'bookselfMathBlock',
        level: 'block',
        start: blockStart,
        tokenizer(src) {
          const token = tokenizeBlockMath(src);
          return token ? { type: 'bookselfMathBlock', ...token } : undefined;
        },
        renderer(token) {
          const ref = token.label ? referenceContext.get(token.label) : null;
          return `${renderMath(token.tex, true, {
            label: token.label,
            number: ref?.number,
          })}\n`;
        },
      },
      {
        name: 'bookselfMathInline',
        level: 'inline',
        start: inlineStart,
        tokenizer(src) {
          const token = tokenizeInlineMath(src);
          return token ? { type: 'bookselfMathInline', ...token } : undefined;
        },
        renderer(token) {
          if (token.delimiter === 'eqref') return renderEquationRef(token.ref);
          return renderMath(token.tex, false);
        },
      },
    ],
  });
  markedInstalled = true;
  return true;
}

function installStyles() {
  if (typeof document === 'undefined' || document.querySelector(`link[href="${MATH_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MATH_CSS;
  document.head.appendChild(link);
}

function hydratePendingMath() {
  if (typeof document === 'undefined' || !globalThis.katex?.renderToString) return;
  document.querySelectorAll('.reader-math-pending[data-math-source]').forEach((element) => {
    try {
      const tex = decodeURIComponent(element.dataset.mathSource || '');
      const displayMode = element.classList.contains('reader-math-display');
      const number = element.querySelector('.reader-equation-number');
      element.innerHTML = globalThis.katex.renderToString(tex, katexOptions(displayMode));
      if (number) element.appendChild(number);
      element.classList.remove('reader-math-pending');
      element.dataset.mathRendered = 'true';
    } catch (error) {
      element.classList.add('reader-math-error');
      console.warn('Could not hydrate LaTeX math', error);
    }
  });
  syncMathNavigation();
}

function cacheMathEngine() {
  if (typeof caches === 'undefined') return;
  caches.open(MATH_CACHE)
    .then((cache) => cache.add(KATEX_URL))
    .catch(() => {
      // Math still renders from the successful script response.
    });
}

function announceEngineReady() {
  hydratePendingMath();
  document.documentElement.dataset.math = 'ready';
  window.dispatchEvent(new Event('bookself:math-ready'));
  window.dispatchEvent(new Event('resize'));
}

export function requestMathEngine() {
  if (engineRequested || typeof document === 'undefined') return;
  engineRequested = true;
  if (globalThis.katex?.renderToString) {
    cacheMathEngine();
    queueMicrotask(announceEngineReady);
    return;
  }

  const script = document.createElement('script');
  script.src = KATEX_URL;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.integrity = KATEX_INTEGRITY;
  script.referrerPolicy = 'no-referrer';
  script.dataset.bookselfMathEngine = KATEX_VERSION;
  script.addEventListener('load', () => {
    if (globalThis.katex?.renderToString) {
      cacheMathEngine();
      announceEngineReady();
    } else {
      document.documentElement.dataset.math = 'fallback';
    }
  }, { once: true });
  script.addEventListener('error', () => {
    document.documentElement.dataset.math = 'fallback';
    window.dispatchEvent(new Event('bookself:math-unavailable'));
  }, { once: true });
  document.head.appendChild(script);
}

function protectMathInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest?.('.reader-math')) event.stopPropagation();
  }, true);
  document.addEventListener('touchstart', (event) => {
    if (event.target.closest?.('.reader-math')) event.stopPropagation();
  }, { capture: true, passive: true });
}

function mathOverflowHint() {
  let hint = document.getElementById('readerMathOverflowHint');
  if (hint) return hint;
  hint = document.createElement('p');
  hint.id = 'readerMathOverflowHint';
  hint.className = 'sr-only';
  hint.textContent = overflowInstruction('math');
  document.body.appendChild(hint);
  return hint;
}

function clearMathNavigation(element) {
  if (element.dataset.mathManagedTabindex === 'true') element.removeAttribute('tabindex');
  if (element.dataset.mathManagedDescribedby === 'true') element.removeAttribute('aria-describedby');
  element.removeAttribute('aria-keyshortcuts');
  delete element.dataset.mathOverflow;
  delete element.dataset.mathManagedTabindex;
  delete element.dataset.mathManagedDescribedby;
  delete element.dataset.overflowStart;
  delete element.dataset.overflowEnd;
}

function decorateMathNavigation(element) {
  const edge = overflowState(element);
  if (!edge.overflow) {
    clearMathNavigation(element);
    return;
  }
  element.dataset.mathOverflow = 'true';
  if (!element.hasAttribute('tabindex')) {
    element.tabIndex = 0;
    element.dataset.mathManagedTabindex = 'true';
  }
  if (!element.hasAttribute('aria-describedby')) {
    element.setAttribute('aria-describedby', mathOverflowHint().id);
    element.dataset.mathManagedDescribedby = 'true';
  }
  element.setAttribute('aria-keyshortcuts', MATH_KEYS);
  element.dataset.overflowStart = edge.atStart ? 'true' : 'false';
  element.dataset.overflowEnd = edge.atEnd ? 'true' : 'false';
}

function syncMathNavigation() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.reader-math-display').forEach(decorateMathNavigation);
}

function onMathKeyDown(event) {
  const element = event.target?.closest?.('.reader-math-display[data-math-overflow="true"]');
  if (!element || event.metaKey || event.ctrlKey || event.altKey) return;
  const nextLeft = horizontalKeyDestination({
    key: event.key,
    shiftKey: event.shiftKey,
    scrollLeft: element.scrollLeft,
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
  });
  if (nextLeft == null) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  element.scrollTo({
    left: nextLeft,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}

function onMathScroll(event) {
  const element = event.target;
  if (!(element instanceof Element) || element.dataset.mathOverflow !== 'true') return;
  const edge = overflowState(element);
  element.dataset.overflowStart = edge.atStart ? 'true' : 'false';
  element.dataset.overflowEnd = edge.atEnd ? 'true' : 'false';
}

function installMathNavigation() {
  if (mathNavigationInstalled || typeof document === 'undefined') return;
  mathNavigationInstalled = true;
  syncMathNavigation();
  const root = document.getElementById('bookStage') || document.body;
  const observer = new MutationObserver(() => window.requestAnimationFrame(syncMathNavigation));
  observer.observe(root, { childList: true, subtree: true });
  window.addEventListener('resize', syncMathNavigation, { passive: true });
  // Window capture runs before the Reader's document-level page key handler,
  // so an overflowing equation owns horizontal exploration in both modes.
  window.addEventListener('keydown', onMathKeyDown, true);
  document.addEventListener('scroll', onMathScroll, true);
}

if (typeof window !== 'undefined') {
  installStyles();
  installMarkedMath();
  protectMathInteractions();
  installMathNavigation();
  requestMathEngine();
}