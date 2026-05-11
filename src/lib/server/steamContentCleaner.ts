function decodeHtmlEntities(input: string): string {
  const namedEntities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };

  let output = input.replace(
    /&(amp|lt|gt|quot|#39|nbsp);/g,
    (entity) => namedEntities[entity] ?? entity,
  );

  output = output.replace(/&#(\d+);/g, (_, code) => {
    const value = Number.parseInt(code, 10);
    return Number.isFinite(value) ? String.fromCharCode(value) : "";
  });

  output = output.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => {
    const value = Number.parseInt(code, 16);
    return Number.isFinite(value) ? String.fromCharCode(value) : "";
  });

  return output;
}

export function cleanSteamContentForText(content: string): string {
  if (!content || !content.trim()) return "";

  let text = content;

  text = text.replace(/\r\n?/g, "\n");

  text = text.replace(/\[img\][\s\S]*?\[\/img\]/gi, " ");
  text = text.replace(/\[previewyoutube=[^\]]*][\s\S]*?\[\/previewyoutube\]/gi, " ");

  text = text.replace(/\[url=(.+?)\]([\s\S]*?)\[\/url\]/gi, (_m, url, label) => {
    const safeLabel = String(label ?? "").trim();
    const safeUrl = String(url ?? "").trim();
    if (!safeLabel && !safeUrl) return " ";
    if (!safeLabel) return safeUrl;
    if (!safeUrl) return safeLabel;
    return `${safeLabel} (${safeUrl})`;
  });
  text = text.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, (_m, url) => String(url ?? "").trim());

  text = text.replace(/\[br\s*\/?\]/gi, "\n");
  text = text.replace(/\[p\]/gi, "\n");
  text = text.replace(/\[\/p\]/gi, "\n");
  text = text.replace(/\[\*\]/g, "\n- ");

  text = text.replace(/\[(\/)?(b|i|u|h1|h2|list|quote|table|tr|td|th)\]/gi, "");

  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n");
  text = text.replace(/<p[^>]*>/gi, "\n");
  text = text.replace(/<\/?(strong|em|b|i|u|h1|h2|ul|ol|li|table|tr|td|th|blockquote)[^>]*>/gi, "");
  text = text.replace(/<[^>]+>/g, " ");

  text = text.replace(/\[[^\]\r\n]+]/g, " ");

  text = decodeHtmlEntities(text);

  text = text.replace(/[ \t]+\n/g, "\n");
  text = text.replace(/\n[ \t]+/g, "\n");
  text = text.replace(/[ \t]{2,}/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

export function createSteamExcerpt(content: string, maxLength = 350): string {
  const cleanText = cleanSteamContentForText(content);
  if (!cleanText) return "";

  if (cleanText.length <= maxLength) return cleanText;

  const hardLimit = Math.max(1, maxLength - 3);
  let cutIndex = cleanText.lastIndexOf(" ", hardLimit);
  if (cutIndex < Math.floor(hardLimit * 0.6)) {
    cutIndex = hardLimit;
  }

  return `${cleanText.slice(0, cutIndex).trim()}...`;
}
