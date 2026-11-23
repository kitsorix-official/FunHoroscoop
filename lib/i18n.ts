// ---------------------------------------------------------------------------
// Locale-helpers voor de Nederlandse root-site en de volledige /en/-vertaling.
// Nederlandse slugs blijven exact hetzelfde; Engelse slugs zijn leesbaar voor
// Engelstalige lezers en worden hier deterministisch aan elkaar gekoppeld.
// ---------------------------------------------------------------------------

export type Locale = 'nl' | 'en';

export const LOCALES: Locale[] = ['nl', 'en'];
export const DEFAULT_LOCALE: Locale = 'nl';
export const EN_PREFIX = '/en';

export const SITE_NAME = 'FunHoroscoop.nl';

/** Volgorde is identiek in beide talen: index = dierenriem-positie. */
const SIGN_SLUGS: Record<Locale, string[]> = {
  nl: [
    'ram',
    'stier',
    'tweelingen',
    'kreeft',
    'leeuw',
    'maagd',
    'weegschaal',
    'schorpioen',
    'boogschutter',
    'steenbok',
    'waterman',
    'vissen',
  ],
  en: [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ],
};

const ELEMENTS: Record<Locale, string[]> = {
  nl: ['Vuur', 'Aarde', 'Lucht', 'Water'],
  en: ['Fire', 'Earth', 'Air', 'Water'],
};

export const ROUTES = {
  nl: {
    home: '/',
    zodiac: '/sterrenbeeld/',
    compatibility: '/compatibiliteit/',
    method: '/anti-barnum/',
    glossary: '/woordenboek/',
    costs: '/kostenposten/',
    faq: '/veelgestelde-vragen/',
    guide: '/handleiding/',
    about: '/over/',
    privacy: '/privacy/',
    disclaimer: '/disclaimer/',
    contact: '/contact/',
  },
  en: {
    home: '/en/',
    zodiac: '/en/zodiac/',
    compatibility: '/en/compatibility/',
    method: '/en/anti-barnum/',
    glossary: '/en/glossary/',
    costs: '/en/emotional-costs/',
    faq: '/en/faq/',
    guide: '/en/how-to/',
    about: '/en/about/',
    privacy: '/en/privacy/',
    disclaimer: '/en/disclaimer/',
    contact: '/en/contact/',
  },
} as const;

export type StaticRouteKey = keyof typeof ROUTES.nl;
export type RouteMap = (typeof ROUTES)[Locale];

export function isLocale(value: string | undefined): value is Locale {
  return value === 'nl' || value === 'en';
}

export function routePath(locale: Locale, key: StaticRouteKey): string {
  return ROUTES[locale][key];
}

export function signSlugs(locale: Locale): string[] {
  return SIGN_SLUGS[locale];
}

export function getSignSlugForId(id: string, locale: Locale): string | undefined {
  const index = SIGN_SLUGS.nl.indexOf(id) >= 0
    ? SIGN_SLUGS.nl.indexOf(id)
    : SIGN_SLUGS.en.indexOf(id);
  return index >= 0 ? SIGN_SLUGS[locale][index] : undefined;
}

export function translateSignSlug(slug: string, from: Locale, to: Locale): string {
  const index = signIndexForSlug(slug, from);
  return index >= 0 ? SIGN_SLUGS[to][index] : slug;
}

/** Index in de vaste dierenriemvolgorde, ongeacht de taal van de slug. */
export function signIndexForSlug(slug: string, locale: Locale): number {
  const value = slug.toLowerCase().trim();
  const direct = SIGN_SLUGS[locale].indexOf(value);
  if (direct >= 0) return direct;
  return SIGN_SLUGS[locale === 'nl' ? 'en' : 'nl'].indexOf(value);
}

/**
 * Sleutel in de taal van de URL. De volgorde is de alfabetische, canonieke
 * volgorde van de oorspronkelijke NL-data — niet de dierenriemvolgorde.
 */
export function pairKeyForLocale(aSlug: string, bSlug: string, locale: Locale): string {
  const ia = signIndexForSlug(aSlug, locale);
  const ib = signIndexForSlug(bSlug, locale);
  if (ia < 0 || ib < 0) return [aSlug, bSlug].sort().join('-');
  return [SIGN_SLUGS[locale][ia], SIGN_SLUGS[locale][ib]].sort().join('-');
}

/**
 * Canonieke NL-sleutel achter elke taal — gebruikt voor hash en data-lookups.
 * De data bestaat uit alfabetisch gesorteerde NL-slugs (bijv. vissen-waterman).
 */
export function canonicalNlPairKey(aSlug: string, bSlug: string, locale: Locale): string {
  const ia = signIndexForSlug(aSlug, locale);
  const ib = signIndexForSlug(bSlug, locale);
  if (ia < 0 || ib < 0) return [aSlug, bSlug].sort().join('-');
  return [SIGN_SLUGS.nl[ia], SIGN_SLUGS.nl[ib]].sort().join('-');
}

export function localizedSignPath(locale: Locale, slugOrId: string): string {
  const slug = SIGN_SLUGS[locale].includes(slugOrId)
    ? slugOrId
    : getSignSlugForId(slugOrId, locale) ?? slugOrId;
  return `${ROUTES[locale].zodiac}${slug}/`;
}

/** Paar-sleutels blijven in NL Canonieke volgorde opgeslagen (stabiele hash). */
export function canonicalPairSlugs(idA: string, idB: string): [string, string] {
  const map = (id: string) => SIGN_SLUGS.nl[SIGN_SLUGS.nl.indexOf(id) >= 0
    ? SIGN_SLUGS.nl.indexOf(id)
    : SIGN_SLUGS.en.indexOf(id)];
  return [map(idA), map(idB)].sort() as [string, string];
}

export function translatePairKey(key: string, from: Locale, to: Locale): string {
  const parts = key.split('-');
  if (parts.length !== 2) return key;
  return parts.map((part) => translateSignSlug(part, from, to)).join('-');
}

export function localizedPairPath(locale: Locale, key: string): string {
  return `${ROUTES[locale].compatibility}${key}/`;
}

export function elementLabel(element: string, locale: Locale): string {
  const nlIndex = ELEMENTS.nl.indexOf(element);
  const enIndex = ELEMENTS.en.indexOf(element);
  if (nlIndex >= 0) return ELEMENTS[locale][nlIndex];
  if (enIndex >= 0) return ELEMENTS[locale][enIndex];
  return element;
}

/** 'Vuur-Water' -> 'Fire-Water'. De volgorde blijft gelijk aan de canonieke NL key. */
export function localizedElementKey(key: string, locale: Locale): string {
  return key
    .split('-')
    .map((part) => elementLabel(part, locale))
    .join('-');
}

export function localizedElementKeys(keys: string[], locale: Locale): string[] {
  return keys.map((key) => localizedElementKey(key, locale));
}

/** Vertaal een pad naar de andere taal; onbekende paden vallen terug op de homepage. */
export function pathForLocale(path: string, target: Locale): string {
  const source: Locale = path === EN_PREFIX || path.startsWith(`${EN_PREFIX}/`) ? 'en' : 'nl';
  const clean = source === 'en'
    ? (path === EN_PREFIX ? '/' : path.slice(EN_PREFIX.length))
    : path;

  if (source === target) return path;

  const sourceRoutes = ROUTES[source] as Record<string, string>;
  const targetRoutes = ROUTES[target] as Record<string, string>;
  // Voor EN-paden is `clean` al zonder /en-prefix; vergelijk dus met de
  // genormaliseerde EN-routes, anders valt elke statische EN-pagina terug
  // op de homepage.
  const normalizedSourceRoute = (value: string) =>
    source === 'en' ? (value === EN_PREFIX ? '/' : value.slice(EN_PREFIX.length)) : value;
  const staticKey = (Object.keys(sourceRoutes) as StaticRouteKey[]).find(
    (key) => normalizedSourceRoute(sourceRoutes[key]) === clean
  );
  if (staticKey) return targetRoutes[staticKey];

  const signMatch = clean.match(/^\/(?:sterrenbeeld|zodiac)\/([^/]+)\/$/);
  if (signMatch) {
    return localizedSignPath(target, translateSignSlug(signMatch[1], source, target));
  }

  const pairMatch = clean.match(/^\/(?:compatibiliteit|compatibility)\/([^/]+)\/$/);
  if (pairMatch) {
    return localizedPairPath(
      target,
      translatePairKey(pairMatch[1], source, target)
    );
  }

  return ROUTES[target].home;
}

/** Next.js Metadata.alternates met nl, en en x-default (NL is de standaard). */
export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: path,
    languages: {
      nl: pathForLocale(path, 'nl'),
      en: pathForLocale(path, 'en'),
      'x-default': pathForLocale(path, 'nl'),
    },
  };
}

export function formatEuro(price: number, locale: Locale = DEFAULT_LOCALE): string {
  return `€${price.toFixed(2).replace('.', locale === 'nl' ? ',' : '.')}`;
}

export function formatPercent(value: number, locale: Locale = DEFAULT_LOCALE): string {
  return `${value.toFixed(2).replace('.', locale === 'nl' ? ',' : '.')}%`;
}
