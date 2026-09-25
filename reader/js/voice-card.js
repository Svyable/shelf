const VOICE_LABEL = /^([A-Z][A-Z0-9 .&'’"-]{0,31})\s*\/\s*([A-Z][A-Z0-9 .&'’":-]{0,55})$/u;
const VOICE_CARD_OPEN = /^\s*<blockquote\b[^>]*\bclass=(?:"[^"]*\bvoice-card\b[^"]*"|'[^']*\bvoice-card\b[^']*')[^>]*>/i;

function decodeLabelText(value) {
  return String(value || '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;|&#x27;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .trim();
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function decorateBlockquote(body) {
  const match = String(body || '').match(
    /^\s*<p>\s*<strong>([^<]+)<\/strong>\s*<\/p>\s*<h3>([\s\S]*?)<\/h3>\s*<p>\s*<em>([\s\S]*?)<\/em>\s*<\/p>\s*$/i
  );
  if (!match) return null;

  const label = decodeLabelText(match[1]);
  const labelMatch = label.match(VOICE_LABEL);
  if (!labelMatch) return null;

  const [, voiceRaw, themeRaw] = labelMatch;
  const voice = voiceRaw.trim();
  const theme = themeRaw.trim();
  return [
    `<blockquote class="voice-card" data-voice-label="${escapeAttribute(voice)}" data-voice-theme="${escapeAttribute(theme)}">`,
    `<p class="voice-card__label"><strong>${match[1]}</strong></p>`,
    `<h3 class="voice-card__quote">${match[2]}</h3>`,
    `<p class="voice-card__source"><em>${match[3]}</em></p>`,
    '</blockquote>',
  ].join('\n');
}

export function decorateVoiceCards(html) {
  return String(html || '').replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    (whole, body) => decorateBlockquote(body) || whole
  );
}

export function isVoiceCardHtml(html) {
  return VOICE_CARD_OPEN.test(String(html || ''));
}
