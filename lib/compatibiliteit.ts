import {
  canonicalNlPairKey,
  formatEuro,
  signIndexForSlug,
  signSlugs,
  translatePairKey,
  translateSignSlug,
  type Locale,
} from '@/lib/i18n';
import {
  getCompatData,
  getHoroscoopData,
  type CompatData,
  type ZodiacSign,
} from '@/lib/locale-data';

// ---------------------------------------------------------------------------
// Sterrenbeeld-compatibiliteit: 78 unieke paren (66 kruiscombinaties + 12
// tweezingers). Elke pagina is conflict tussen twee tekens — de gezamenlijke
// bon, rollen en dynamiek worden deterministisch opgebouwd uit de bestaande
// teken-dossiers plus handgeschreven per-paar-taglines. Alles is stabiel:
// zelfde paren geven altijd dezelfde score, ook na herbouw.
//
// De NL-sleutels blijven intern de canonieke sleutels, ook op /en/. Daardoor
// zijn hashes, scores en prijzen identiek in beide talen.
// ---------------------------------------------------------------------------

export interface CompatBonItem {
  description: string;
  price: string;
}

export interface CompatPair {
  /** Gesorteerde paar-sleutel in de taal van de URL. */
  key: string;
  a: ZodiacSign;
  b: ZodiacSign;
  self: boolean;
  /** Unieke, handgeschreven tagline per paar. */
  tagline: string;
  /** Genormaliseerde element-combinatie in NL-vorm (bijv. "Aarde-Vuur"). */
  elementKey: string;
  /** Deterministische kassabon-score 0-100. */
  score: number;
  scoreLabel: string;
  /** Element-dynamiek paragraaf met ingevulde namen. */
  dynamiek: string;
  rolA: string;
  rolB: string;
  /** De gezamenlijke bon: één kostenpost uit A, één uit B, één gezamenlijke. */
  bonItems: CompatBonItem[];
}

type Element = 'Vuur' | 'Aarde' | 'Lucht' | 'Water';

// Display-volgorde van de element-combinaties op de hub-pagina (NL-sleutels).
export const COMPAT_ELEMENT_ORDER: string[] = [
  'Vuur-Vuur',
  'Lucht-Vuur',
  'Aarde-Vuur',
  'Vuur-Water',
  'Aarde-Aarde',
  'Aarde-Lucht',
  'Aarde-Water',
  'Lucht-Lucht',
  'Lucht-Water',
  'Water-Water',
];

// Element-matchgewicht voor de score (klassieke astrologische logica in
// kassatermen: Lucht voedt Vuur, Water dooft het, Aarde houdt Vuur op de grond…).
const ELEMENT_WEIGHT: Record<string, number> = {
  'Vuur-Vuur': 0.88,
  'Aarde-Vuur': 0.56,
  'Lucht-Vuur': 0.98,
  'Vuur-Water': 0.5,
  'Aarde-Aarde': 0.85,
  'Aarde-Lucht': 0.62,
  'Aarde-Water': 0.84,
  'Lucht-Lucht': 0.7,
  'Lucht-Water': 0.58,
  'Water-Water': 0.72,
};

const GEZAMENLIJKE_PRIJZEN = [12.99, 21.5, 37.95, 9.99, 45.0];

// Stabiele string-hash (djb2) — geen Math.random, zodat scores nooit
// verschuiven tussen builds.
function stableHash(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
  }
  return hash >>> 0;
}

function normalizedElementKey(a: Element | string, b: Element | string): string {
  return [a, b].sort().join('-');
}

export function canonicalPairKey(aSlug: string, bSlug: string): string {
  return [aSlug, bSlug].sort().join('-');
}

function scoreLabel(score: number, data: CompatData): string {
  const bands = Object.keys(data.scoreLabels)
    .map(Number)
    .sort((x, y) => y - x);
  for (const band of bands) {
    if (score >= band) return data.scoreLabels[String(band)];
  }
  return data.scoreLabels['0'];
}

function prijsVan(description: string, locale: Locale): string {
  const item = getHoroscoopData(locale).emotionalCosts.find((k) => k.description === description);
  return item ? formatEuro(item.price, locale) : '—';
}

export function buildCompatPair(
  aSlug: string,
  bSlug: string,
  locale: Locale = 'nl'
): CompatPair | undefined {
  const signs = getHoroscoopData(locale).zodiacSigns;
  const nlSigns = getHoroscoopData('nl').zodiacSigns;
  const ia = signIndexForSlug(aSlug, locale);
  const ib = signIndexForSlug(bSlug, locale);
  const a = signs[ia];
  const b = signs[ib];
  if (!a || !b) return undefined;

  const nlKey = canonicalNlPairKey(aSlug, bSlug, locale);
  // De volgorde van de canonieke NL-key bewaren, ook in het Engels. Zo wijzen
  // hreflang en sitemap naar exact dezelfde combinatie (bijv. vissen-waterman
  // wordt pisces-aquarius, niet aquarius-pisces).
  const key = translatePairKey(nlKey, 'nl', locale);
  const data = getCompatData(locale);
  const nlA = translateSignSlug(a.slug, locale, 'nl');
  const nlB = translateSignSlug(b.slug, locale, 'nl');
  const elementKey = normalizedElementKey(nlSigns[ia].element, nlSigns[ib].element);
  const hash = stableHash(nlKey);

  const tagline = data.tags[nlKey];
  if (!tagline) return undefined;

  const dynamiek = (data.elementDynamiek[elementKey] ?? '')
    .replaceAll('{naamA}', a.name)
    .replaceAll('{naamB}', b.name);

  const gezamenlijke = (data.gezamenlijkePost[elementKey] ?? '')
    .replaceAll('{naamA}', a.name)
    .replaceAll('{naamB}', b.name);

  // Twee unieke kostenposten van het duo: één van A, één van B (bij een
  // tweezinger twee verschillende posten uit hetzelfde dossier).
  const aItems = a.dossier.kostenposten;
  const bItems = b.dossier.kostenposten;
  const isSelf = ia === ib;
  const aIndex = hash % Math.max(aItems.length, 1);
  const bIndex = isSelf
    ? (hash + 1) % Math.max(bItems.length, 1)
    : (hash + 3) % Math.max(bItems.length, 1);

  const bonItems: CompatBonItem[] = [
    { description: aItems[aIndex], price: prijsVan(aItems[aIndex], locale) },
    { description: bItems[bIndex], price: prijsVan(bItems[bIndex], locale) },
    {
      description: gezamenlijke,
      price: formatEuro(GEZAMENLIJKE_PRIJZEN[hash % GEZAMENLIJKE_PRIJZEN.length], locale),
    },
  ];

  const weight = ELEMENT_WEIGHT[elementKey] ?? 0.6;
  const score = Math.round(weight * (100 - (hash % 9)));

  return {
    key,
    a,
    b,
    self: isSelf,
    tagline,
    elementKey,
    score,
    scoreLabel: scoreLabel(score, data),
    dynamiek,
    rolA: data.rolInRelatie[nlA] ?? '',
    rolB: data.rolInRelatie[nlB] ?? '',
    bonItems,
  };
}

/** Alle 78 canonieke paren (vaste volgorde), voor hub + sitemap. */
export function allCompatPairs(locale: Locale = 'nl'): CompatPair[] {
  const slugs = signSlugs(locale);
  return slugs.flatMap((a, i) =>
    slugs.flatMap((bb, j) => {
      // Alleen de gesorteerde vorm één keer opnemen (i <= j). De spiegelvorm
      // is wél een gegenereerde pagina, maar canoniceert naar deze key.
      if (i > j) return [];
      const pair = buildCompatPair(a, bb, locale);
      return pair ? [pair] : [];
    })
  );
}
