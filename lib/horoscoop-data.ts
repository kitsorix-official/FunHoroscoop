import { getHoroscoopData } from '@/lib/locale-data';

export type {
  ZodiacDossier,
  ZodiacSign,
  CostItem,
  HoroscoopDataset,
} from '@/lib/locale-data';

// Nederlandse standaardwaarden: bestaande imports blijven exact hetzelfde.
const NL = getHoroscoopData('nl');

export const ZODIAC_SIGNS = NL.zodiacSigns;
export const EMOTIONAL_COSTS = NL.emotionalCosts;
export const GEVAREN_VANDAAG = NL.gevarenVandaag;
export const COPING_MECHANISMEN = NL.copingMechanismen;
export const KOSMISCHE_QUOTES = NL.kosmischeQuotes;
export const STEMPELS = NL.stempels;
export const SHARE_CAPTIONS = NL.shareCaptions;
