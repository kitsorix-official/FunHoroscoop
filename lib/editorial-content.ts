import editorialJson from '@/data/editorial-content.json';
import { EMOTIONAL_COSTS, ZodiacSign } from '@/lib/horoscoop-data';
import { CompatPair } from '@/lib/compatibiliteit';

// ---------------------------------------------------------------------------
// Redactionele laag voor SEO / AEO / GEO.
// Alle teksten staan in data/editorial-content.json, zodat de inhoud
// aanpasbaar blijft zonder in de componenten te hoeven graven.
// Dezelfde vragen/antwoorden worden gebruikt voor de zichtbare FAQ óf de
// JSON-LD — daardoor kunnen die twee niet uit sync raken.
// ---------------------------------------------------------------------------

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

export const GLOBAL_FAQ: FaqItem[] = editorialJson.globalFaq;
export const METHOD_SECTIONS: MethodSection[] = editorialJson.method;
export const GLOSSARY: GlossaryTerm[] = editorialJson.glossary;
export const GUIDE_STEPS: GuideStep[] = editorialJson.guide;

function euro(description: string): string {
  const item = EMOTIONAL_COSTS.find((k) => k.description === description);
  return item ? `€ ${item.price.toFixed(2).replace('.', ',')}` : 'prijs onbekend';
}

export function signFaq(sign: ZodiacSign): FaqItem[] {
  const d = sign.dossier;
  return [
    {
      question: `Wat is het archetype van ${sign.name}?`,
      answer: `${sign.name} (${sign.symbol}, ${sign.period}) staat in de kosmische kassa bekend als “${sign.archetype}”. ${sign.roast}`,
    },
    {
      question: `Wat staat er op de kassabon van ${sign.name}?`,
      answer: d.kassabon,
    },
    {
      question: `Welke kostenposten horen bij ${sign.name}?`,
      answer: `Op de bon van ${sign.name} staan onder meer: ${d.kostenposten
        .map((post) => `“${post}” (${euro(post)})`)
        .join(', ')}. De volgorde verschilt per afdruk.`,
    },
    {
      question: `Wat is de sterkte van ${sign.name} volgens de kosmische kassa?`,
      answer: d.kracht,
    },
    {
      question: `Wat is de kosmische levensles van ${sign.name}?`,
      answer: d.levensles,
    },
  ];
}

export function pairFaq(pair: CompatPair): FaqItem[] {
  const { a, b } = pair;
  return [
    {
      question: `Wat is de compatibiliteitsscore van ${a.name} en ${b.name}?`,
      answer: `De kosmische kassa geeft ${a.name} en ${b.name} een score van ${pair.score}/100: ${pair.scoreLabel.toLowerCase()}. ${pair.tagline}`,
    },
    {
      question: `Wat staat er op de gezamenlijke kassabon van ${a.name} en ${b.name}?`,
      answer: `De gezamenlijke bon bevat: ${pair.bonItems
        .map((item) => `${item.description} — ${item.price}`)
        .join('; ')}.`,
    },
    {
      question: `Wat is de dynamiek tussen ${a.name} en ${b.name}?`,
      answer: pair.dynamiek,
    },
  ];
}
