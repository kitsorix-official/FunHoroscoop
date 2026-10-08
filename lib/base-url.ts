const FALLBACK_URL = 'https://funhoroscoop.nl';

/**
 * Resolves the base URL used for self-referential links (metadata, sitemap, robots, JSON-LD).
 * Falls back to the production domain when APP_URL is missing or not a valid URL,
 * so placeholder values (e.g. a non-URL like "MY_APP_URL") never crash `new URL()`.
 */
function resolveBaseUrl(): string {
  const raw = process.env.APP_URL?.trim();
  if (!raw || raw.startsWith('MY_')) return FALLBACK_URL;

  const cleaned = raw.endsWith('/') ? raw.slice(0, -1) : raw;

  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return FALLBACK_URL;
    return cleaned;
  } catch {
    return FALLBACK_URL;
  }
}

export const BASE_URL = resolveBaseUrl();
