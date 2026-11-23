import type { Locale } from '@/lib/i18n';
import nlHoroscoop from '@/data/horoscoop-data.json';
import enHoroscoop from '@/data/en/horoscoop-data.json';
import nlCompat from '@/data/compatibiliteit-data.json';
import enCompat from '@/data/en/compatibiliteit-data.json';
import nlEditorial from '@/data/editorial-content.json';
import enEditorial from '@/data/en/editorial-content.json';

// ---------------------------------------------------------------------------
// Eén laadpunt voor beide talen. De Nederlandse export blijft de standaard,
// zodat bestaande imports en URLs ongewijzigd blijven werken.
// ---------------------------------------------------------------------------

export interface ZodiacDossier {
  lead: string;
  paragrafen: string[];
  kassabon: string;
  kostenposten: string[];
  kracht: string;
  levensles: string;
}

export interface ZodiacSign {
  id: string;
  slug: string;
  name: string;
  symbol: string;
  period: string;
  archetype: string;
  element: 'Vuur' | 'Aarde' | 'Lucht' | 'Water' | string;
  roast: string;
  dossier: ZodiacDossier;
}

export interface CostItem {
  description: string;
  price: number;
}

export interface HoroscoopDataset {
  zodiacSigns: ZodiacSign[];
  emotionalCosts: CostItem[];
  gevarenVandaag: string[];
  copingMechanismen: string[];
  kosmischeQuotes: string[];
  stempels: string[];
  shareCaptions: string[];
}

export interface CompatData {
  elementDynamiek: Record<string, string>;
  rolInRelatie: Record<string, string>;
  gezamenlijkePost: Record<string, string>;
  scoreLabels: Record<string, string>;
  tags: Record<string, string>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MethodSection {
  heading: string;
  paragraphs: string[];
  example: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
}

export interface GuideStep {
  title: string;
  text: string;
  tip: string;
}

export interface EditorialData {
  globalFaq: FaqItem[];
  method: MethodSection[];
  glossary: GlossaryTerm[];
  guide: GuideStep[];
}

const HOROSCOOP: Record<Locale, HoroscoopDataset> = {
  nl: nlHoroscoop as HoroscoopDataset,
  en: enHoroscoop as HoroscoopDataset,
};

const COMPAT: Record<Locale, CompatData> = {
  nl: nlCompat as CompatData,
  en: enCompat as CompatData,
};

const EDITORIAL: Record<Locale, EditorialData> = {
  nl: nlEditorial as EditorialData,
  en: enEditorial as EditorialData,
};

export function getHoroscoopData(locale: Locale = 'nl'): HoroscoopDataset {
  return HOROSCOOP[locale];
}

export function getCompatData(locale: Locale = 'nl'): CompatData {
  return COMPAT[locale];
}

export function getEditorialData(locale: Locale = 'nl'): EditorialData {
  return EDITORIAL[locale];
}
