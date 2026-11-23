import {
  formatEuro,
  type Locale,
} from '@/lib/i18n';
import type { CompatPair } from '@/lib/compatibiliteit';
import {
  getEditorialData,
  getHoroscoopData,
  type FaqItem,
  type GuideStep,
  type MethodSection,
  type GlossaryTerm,
  type ZodiacSign,
} from '@/lib/locale-data';

// ---------------------------------------------------------------------------
// Redactionele laag voor SEO / AEO / GEO.
// Alle teksten staan in data/editorial-content.json, zodat de inhoud
// aanpasbaar blijft zonder in de componenten te hoeven graven.
// Dezelfde vragen/antwoorden worden gebruikt voor de zichtbare FAQ óf de
// JSON-LD — daardoor kunnen die twee niet uit sync raken.
// ---------------------------------------------------------------------------

export type { FaqItem, MethodSection, GlossaryTerm, GuideStep } from '@/lib/locale-data';

const NL = getEditorialData('nl');
export const GLOBAL_FAQ: FaqItem[] = NL.globalFaq;
export const METHOD_SECTIONS: MethodSection[] = NL.method;
export const GLOSSARY: GlossaryTerm[] = NL.glossary;
export const GUIDE_STEPS: GuideStep[] = NL.guide;

export function getGlobalFaq(locale: Locale = 'nl'): FaqItem[] {
  return getEditorialData(locale).globalFaq;
}

export function getMethodSections(locale: Locale = 'nl'): MethodSection[] {
  return getEditorialData(locale).method;
}

export function getGlossary(locale: Locale = 'nl'): GlossaryTerm[] {
  return getEditorialData(locale).glossary;
}

export function getGuideSteps(locale: Locale = 'nl'): GuideStep[] {
  return getEditorialData(locale).guide;
}

function euro(description: string, locale: Locale): string {
  const item = getHoroscoopData(locale).emotionalCosts.find((k) => k.description === description);
  return item ? formatEuro(item.price, locale) : locale === 'nl' ? 'prijs onbekend' : 'price unknown';
}

type FaqTemplates = {
  signArchetype: (name: string) => string;
  signArchetypeAnswer: (sign: ZodiacSign) => string;
  signReceipt: (name: string) => string;
  signCharges: (name: string) => string;
  signChargesAnswer: (name: string, list: string) => string;
  signStrength: (name: string) => string;
  signLesson: (name: string) => string;
  pairScore: (a: string, b: string) => string;
  pairScoreAnswer: (a: string, b: string, score: number, label: string, tagline: string) => string;
  pairReceipt: (a: string, b: string) => string;
  pairReceiptAnswer: (items: string) => string;
  pairDynamic: (a: string, b: string) => string;
};

const FAQ_TEMPLATES: Record<Locale, FaqTemplates> = {
  nl: {
    signArchetype: (name) => `Wat is het archetype van ${name}?`,
    signArchetypeAnswer: (sign) =>
      `${sign.name} (${sign.symbol}, ${sign.period}) staat in de kosmische kassa bekend als “${sign.archetype}”. ${sign.roast}`,
    signReceipt: (name) => `Wat staat er op de kassabon van ${name}?`,
    signCharges: (name) => `Welke kostenposten horen bij ${name}?`,
    signChargesAnswer: (name, list) =>
      `Op de bon van ${name} staan onder meer: ${list}. De volgorde verschilt per afdruk.`,
    signStrength: (name) => `Wat is de sterkte van ${name} volgens de kosmische kassa?`,
    signLesson: (name) => `Wat is de kosmische levensles van ${name}?`,
    pairScore: (a, b) => `Wat is de compatibiliteitsscore van ${a} en ${b}?`,
    pairScoreAnswer: (a, b, score, label, tagline) =>
      `De kosmische kassa geeft ${a} en ${b} een score van ${score}/100: ${label}. ${tagline}`,
    pairReceipt: (a, b) => `Wat staat er op de gezamenlijke kassabon van ${a} en ${b}?`,
    pairReceiptAnswer: (items) => `De gezamenlijke bon bevat: ${items}.`,
    pairDynamic: (a, b) => `Wat is de dynamiek tussen ${a} en ${b}?`,
  },
  en: {
    signArchetype: (name) => `What is ${name}’s archetype?`,
    signArchetypeAnswer: (sign) =>
      `${sign.name} (${sign.symbol}, ${sign.period}) is known at the cosmic checkout as “${sign.archetype}”. ${sign.roast}`,
    signReceipt: (name) => `What’s on ${name}’s receipt?`,
    signCharges: (name) => `Which charges belong to ${name}?`,
    signChargesAnswer: (name, list) =>
      `On ${name}’s receipt you’ll find, among others: ${list}. The order changes with every print.`,
    signStrength: (name) => `What is ${name}’s strength according to the cosmic checkout?`,
    signLesson: (name) => `What is ${name}’s cosmic life lesson?`,
    pairScore: (a, b) => `What is the compatibility score of ${a} and ${b}?`,
    pairScoreAnswer: (a, b, score, label, tagline) =>
      `The cosmic checkout gives ${a} and ${b} a score of ${score}/100: ${label}. ${tagline}`,
    pairReceipt: (a, b) => `What’s on the shared receipt of ${a} and ${b}?`,
    pairReceiptAnswer: (items) => `The shared receipt contains: ${items}.`,
    pairDynamic: (a, b) => `What is the dynamic between ${a} and ${b}?`,
  },
};

export function signFaq(sign: ZodiacSign, locale: Locale = 'nl'): FaqItem[] {
  const t = FAQ_TEMPLATES[locale];
  const d = sign.dossier;
  const list = d.kostenposten
    .map((post) => `“${post}” (${euro(post, locale)})`)
    .join(', ');

  return [
    {
      question: t.signArchetype(sign.name),
      answer: t.signArchetypeAnswer(sign),
    },
    {
      question: t.signReceipt(sign.name),
      answer: d.kassabon,
    },
    {
      question: t.signCharges(sign.name),
      answer: t.signChargesAnswer(sign.name, list),
    },
    {
      question: t.signStrength(sign.name),
      answer: d.kracht,
    },
    {
      question: t.signLesson(sign.name),
      answer: d.levensles,
    },
  ];
}

export function pairFaq(pair: CompatPair, locale: Locale = 'nl'): FaqItem[] {
  const t = FAQ_TEMPLATES[locale];
  const { a, b } = pair;
  return [
    {
      question: t.pairScore(a.name, b.name),
      answer: t.pairScoreAnswer(
        a.name,
        b.name,
        pair.score,
        pair.scoreLabel.toLowerCase(),
        pair.tagline
      ),
    },
    {
      question: t.pairReceipt(a.name, b.name),
      answer: t.pairReceiptAnswer(
        pair.bonItems.map((item) => `${item.description} — ${item.price}`).join('; ')
      ),
    },
    {
      question: t.pairDynamic(a.name, b.name),
      answer: pair.dynamiek,
    },
  ];
}
