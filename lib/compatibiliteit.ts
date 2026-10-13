import { ZODIAC_SIGNS, EMOTIONAL_COSTS, ZodiacSign } from '@/lib/horoscoop-data';
import compatibiliteitData from '@/data/compatibiliteit-data.json';

// ---------------------------------------------------------------------------
// Sterrenbeeld-compatibiliteit: 78 unieke paren (66 kruiscombinaties + 12
// tweezingers). Elke pagina is conflict tussen twee tekens — de gezamenlijke
// bon, rollen en dynamiek worden deterministisch opgebouwd uit de bestaande
// teken-dossiers plus handgeschreven per-paar-taglines. Alles is stabiel:
// zelfde paren geven altijd dezelfde score, ook na herbouw.
// ---------------------------------------------------------------------------

export interface CompatBonItem {
  description: string;
  price: string;
}

export interface CompatPair {
  /** Canonieke paar-key: de gesorteerde slug-combinatie (bijv. "aarde-vuur").
   *  Idempotent: "ram-stier" en "stier-ram" resolven naar dezelfde key. */
  key: string;
  a: ZodiacSign;
  b: ZodiacSign;
  self: boolean;
  /** Unieke, handgeschreven tagline per paar. */
  tagline: string;
  /** Genormaliseerde element-combinatie (bijv. "Aarde-Vuur"). */
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

// Display-volgorde van de element-combinaties op de hub-pagina.
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

const GEZAMENLIJKE_PRIJZEN = ['12,99', '21,50', '37,95', '9,99', '45,00'];

interface CompatibiliteitData {
  elementDynamiek: Record<string, string>;
  rolInRelatie: Record<string, string>;
  gezamenlijkePost: Record<string, string>;
  scoreLabels: Record<string, string>;
  tags: Record<string, string>;
}

const DATA: CompatibiliteitData = compatibiliteitData as unknown as CompatibiliteitData;

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

function scoreLabel(score: number): string {
  const bands = Object.keys(DATA.scoreLabels)
    .map(Number)
    .sort((x, y) => y - x);
  for (const band of bands) {
    if (score >= band) return DATA.scoreLabels[String(band)];
  }
  return DATA.scoreLabels['0'];
}

function prijsVan(description: string): string {
  const item = EMOTIONAL_COSTS.find((k) => k.description === description);
  if (!item) return '—';
  return `€${item.price.toFixed(2).replace('.', ',')}`;
}

export function buildCompatPair(aSlug: string, bSlug: string): CompatPair | undefined {
  const a = ZODIAC_SIGNS.find((s) => s.slug === aSlug);
  const b = ZODIAC_SIGNS.find((s) => s.slug === bSlug);
  if (!a || !b) return undefined;

  const isSelf = a.slug === b.slug;
  const key = canonicalPairKey(a.slug, b.slug);
  const elementKey = normalizedElementKey(a.element, b.element);
  const hash = stableHash(key);

  const tagline = DATA.tags[key];
  if (!tagline) return undefined;

  const dynamiekRaw = DATA.elementDynamiek[elementKey] ?? '';
  const dynamiek = dynamiekRaw
    .replaceAll('{naamA}', a.name)
    .replaceAll('{naamB}', b.name);

  const gezamenlijkeRaw = DATA.gezamenlijkePost[elementKey] ?? '';
  const gezamenlijke = gezamenlijkeRaw
    .replaceAll('{naamA}', a.name)
    .replaceAll('{naamB}', b.name);

  // Twee unieke kostenposten van het duo: één van A, één van B (bij een
  // tweezinger twee verschillende posten uit hetzelfde dossier).
  const aItems = a.dossier.kostenposten;
  const bItems = b.dossier.kostenposten;
  const aIndex = hash % Math.max(aItems.length, 1);
  const bIndex = isSelf ? (hash + 1) % Math.max(bItems.length, 1) : (hash + 3) % Math.max(bItems.length, 1);

  const bonItems: CompatBonItem[] = [
    { description: aItems[aIndex], price: prijsVan(aItems[aIndex]) },
    { description: bItems[bIndex], price: prijsVan(bItems[bIndex]) },
    {
      description: gezamenlijke,
      price: `€${GEZAMENLIJKE_PRIJZEN[hash % GEZAMENLIJKE_PRIJZEN.length]}`,
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
    scoreLabel: scoreLabel(score),
    dynamiek,
    rolA: DATA.rolInRelatie[a.slug] ?? '',
    rolB: DATA.rolInRelatie[b.slug] ?? '',
    bonItems,
  };
}

/** Alle 78 canonieke paren (gesorteerd), voor hub + sitemap. */
export function allCompatPairs(): CompatPair[] {
  return ZODIAC_SIGNS.flatMap((a) =>
    ZODIAC_SIGNS.flatMap((bb) => {
      // Alleen de gesorteerde vorm één keer opnemen (a <= bb). De spiegelvorm
      // (bb-a) is wél een gegenereerde pagina, maar canoniceert naar deze key.
      if (a.slug > bb.slug) return [];
      const pair = buildCompatPair(a.slug, bb.slug);
      return pair ? [pair] : [];
    })
  );
}