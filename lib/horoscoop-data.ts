import horoscoopJson from '@/data/horoscoop-data.json';

export interface ZodiacSign {
  id: string;
  slug: string;
  name: string;
  symbol: string;
  period: string;
  archetype: string;
  element: 'Vuur' | 'Aarde' | 'Lucht' | 'Water' | string;
  roast: string;
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

// Ingeladen vanuit lib/horoscoop-data.json
export const ZODIAC_SIGNS: ZodiacSign[] = horoscoopJson.zodiacSigns;
export const EMOTIONAL_COSTS: CostItem[] = horoscoopJson.emotionalCosts;
export const GEVAREN_VANDAAG: string[] = horoscoopJson.gevarenVandaag;
export const COPING_MECHANISMEN: string[] = horoscoopJson.copingMechanismen;
export const KOSMISCHE_QUOTES: string[] = horoscoopJson.kosmischeQuotes;
export const STEMPELS: string[] = horoscoopJson.stempels;
export const SHARE_CAPTIONS: string[] = horoscoopJson.shareCaptions;
