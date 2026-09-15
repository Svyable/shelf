import { renderMarkdown } from './markdown.js';

function cleanAuthor(book) {
  return String(book?.authors || '').replace(/@/g, '').trim();
}

function copyrightNotice(book) {
  const declared = String(book?.rights || '').trim();
  if (/©|copyright|copr\./i.test(declared)) {
    return declared.replace(/\s+·\s+/g, '. ').replace(/\s*\.\s*$/, '.');
  }
  const author = cleanAuthor(book);
  const year = String(book?.year || '').trim();
  if (year && author) return `© ${year} ${author}. All Rights Reserved.`;
  if (author) return `Copyright ${author}. All Rights Reserved.`;
  return declared || 'All Rights Reserved.';
}

function aiNotice(book) {
  return String(book?.aiUse || 'AI training, retrieval/grounding, indexing, and generative use reserved')
    .trim()
    .replace(/\s*\.\s*$/, '.');
}

function rightsMarkdown(book) {
  return [
    '## Rights & permissions',
    '',
    copyrightNotice(book),
    '',
    aiNotice(book),
    '',
    'The publication source may contain a `RIGHTS.md` file with the complete terms and permissions statement. Applicable law and separate hosting-provider terms remain controlling where they grant or preserve rights independently.',
  ].join('\n');
}

export function bookAsMarkdown(book) {
  const bits = [
    `# ${book.title}`,
    book.authors ? `*${cleanAuthor(book)}*` : '',
    book.publisher ? `Publisher: ${book.publisher}` : '',
    '',
  ].filter((l) => l !== undefined);
  for (const ch of book.chapters || []) {
    bits.push('', '---', '', ch.markdown || '');
  }
  bits.push('', '---', '', rightsMarkdown(book));
  return bits.join('\n').trim() + '\n';
}

export function bookAsHtml(book) {
  const body = (book.chapters || [])
    .map((ch) => `<section>${renderMarkdown(ch.markdown || '', book.slug)}</section>`)
    .join('\n');
  const copyright = copyrightNotice(book);
  const ai = aiNotice(book);
  const author = cleanAuthor(book);
  return `<!DOCTYPE html>
<html lang="${book.language || 'en'}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(book.title)}</title>
<meta name="author" content="${escapeHtml(author)}">
<meta name="copyright" content="${escapeHtml(copyright)}">
<meta name="rights" content="${escapeHtml(`${copyright} ${ai}`)}">
<style>
  body { max-width: 40rem; margin: 2rem auto; font: 18px/1.55 Georgia, serif; color: #2b2621; }
  h1, h2 { font-family: Georgia, serif; }
  img { max-width: 100%; height: auto; }
  figure { margin: 1.4em auto; break-inside: avoid; }
  figure img { display: block; margin: 0 auto; }
  figcaption { margin-top: .65em; color: #665f57; font-size: .82em; line-height: 1.45; }
  .reader-footnote { display: grid; grid-template-columns: auto 1fr; gap: .45em; margin: .85em 0; padding-top: .65em; border-top: 1px solid #cfc7bc; color: #665f57; font-size: .82em; }
  .reader-footnote > div > :first-child { margin-top: 0; }
  .reader-reference { margin: .72em 0; padding-left: 1.2em; text-indent: -1.2em; font-size: .9em; }
  .reader-math-display { position: relative; margin: 1.05em 0; padding: .2em 3.25em .32em .15em; overflow-x: auto; text-align: center; }
  .reader-equation::after { content: "(" attr(data-equation-number) ")"; position: absolute; top: 50%; right: .35em; transform: translateY(-50%); color: #665f57; font-size: .82em; font-variant-numeric: tabular-nums; }
  .reader-math-pending code { white-space: pre-wrap; overflow-wrap: anywhere; }
  .reader-citation, .reader-equation-ref, .reader-footnote-ref { color: inherit; text-underline-offset: .15em; }
  .bookself-rights { margin-top: 4rem; padding-top: 1.5rem; border-top: 1px solid #cfc7bc; font-size: .9em; }
</style>
</head>
<body>
${body}
<section class="bookself-rights" id="rights-and-permissions">
  <h2>Rights &amp; permissions</h2>
  <p>${escapeHtml(copyright)}</p>
  <p>${escapeHtml(ai)}</p>
  <p>The publication source may contain a <code>RIGHTS.md</code> file with the complete terms and permissions statement. Applicable law and separate hosting-provider terms remain controlling where they grant or preserve rights independently.</p>
</section>
</body>
</html>
`;
}

export function downloadText(filename, text, type = 'text/plain') {
  const blob = new Blob([text], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
