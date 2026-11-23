import React from 'react';
import { BASE_URL } from '@/lib/base-url';
import { CONTENT_UPDATED_AT } from '@/lib/content-meta';
import {
  localizedPairPath,
  localizedSignPath,
  ROUTES,
  type Locale,
} from '@/lib/i18n';
import { getGlobalFaq, signFaq, pairFaq, type FaqItem } from '@/lib/editorial-content';
import type { CompatPair } from '@/lib/compatibiliteit';
import { getHoroscoopData, type ZodiacSign } from '@/lib/locale-data';

type LdObject = Record<string, unknown>;

const LD: Record<
  Locale,
  {
    lang: string;
    orgDescription: string;
    appDescription: string;
    features: string[];
    zodiacList: string;
    home: string;
    signs: string;
    compatibility: string;
    aboutSign: (name: string) => string;
    howToTitle: string;
    howToDescription: string;
    glossaryTitle: string;
    glossaryDescription: string;
    knowledgeBase: string;
    glossarySection: string;
    guideSection: string;
    tipLabel: string;
  }
> = {
  nl: {
    lang: 'nl-NL',
    orgDescription: 'Satirische anti-Barnum horoscoop-app met interactieve kassabonnen.',
    appDescription:
      'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
    features: [
      'Thermische kassabon print simulatie',
      'Anti-Barnum dossiers voor 12 sterrenbeelden',
      'Berekening van emotionele kostenposten',
      '78 deterministische compatibiliteitspagina’s',
      'PNG-export voor Instagram Stories en TikTok',
      'Cookievrije, anonieme bezoekersstatistiek',
    ],
    zodiacList: 'De twaalf sterrenbeelden van FunHoroscoop.nl',
    home: 'Home',
    signs: 'Sterrenbeelden',
    compatibility: 'Compatibiliteit',
    aboutSign: (name) => `Sterrenbeeld ${name}`,
    howToTitle: 'Zo print en deel je een kosmische kassabon',
    howToDescription: 'Van teken kiezen tot PNG delen: zo werkt de thermische printer van FunHoroscoop.nl.',
    glossaryTitle: 'Woordenboek van de Kosmische Kassa',
    glossaryDescription: 'Alle termen van FunHoroscoop.nl uitgelegd: van Barnum-effect tot thermisch quotum.',
    knowledgeBase: 'Kennisbank',
    glossarySection: 'Woordenboek',
    guideSection: 'Handleiding',
    tipLabel: 'Tip',
  },
  en: {
    lang: 'en',
    orgDescription: 'Satirical anti-Barnum horoscope app with interactive receipts.',
    appDescription:
      'The anti-Barnum horoscope app with thermal receipts full of emotional charges, toxic archetypes and zero excuses.',
    features: [
      'Thermal receipt printing simulation',
      'Anti-Barnum dossiers for 12 zodiac signs',
      'Emotional charge calculation',
      '78 deterministic compatibility pages',
      'PNG export for Instagram Stories and TikTok',
      'Cookie-free, anonymous visitor statistics',
    ],
    zodiacList: 'The twelve zodiac signs of FunHoroscoop.nl',
    home: 'Home',
    signs: 'Zodiac signs',
    compatibility: 'Compatibility',
    aboutSign: (name) => `Zodiac sign ${name}`,
    howToTitle: 'How to print and share a cosmic receipt',
    howToDescription: 'From choosing a sign to sharing a PNG: how the FunHoroscoop.nl thermal printer works.',
    glossaryTitle: 'Cosmic Checkout Glossary',
    glossaryDescription: 'All FunHoroscoop.nl terms explained, from the Barnum effect to the thermal quota.',
    knowledgeBase: 'Knowledge base',
    glossarySection: 'Glossary',
    guideSection: 'How to',
    tipLabel: 'Tip',
  },
};

function absolute(path: string): string {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Render JSON-LD veilig: '<' wordt geescaped zodat geen script-tag kan ontsnappen. */
export function JsonLd({ data }: { data: LdObject | LdObject[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

function organization(locale: Locale): LdObject {
  return {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'FunHoroscoop.nl',
    url: BASE_URL,
    description: LD[locale].orgDescription,
  };
}

function faqPage(items: FaqItem[], id: string): LdObject {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function breadcrumb(items: Array<{ name: string; path: string }>): LdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** Organisation + website: op elke pagina aanwezig, zonder FAQ-duplicatie. */
export function globalStructuredData(locale: Locale = 'nl'): LdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(locale),
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'FunHoroscoop.nl',
        inLanguage: LD[locale].lang,
        publisher: { '@id': `${BASE_URL}/#organization` },
        dateModified: CONTENT_UPDATED_AT,
      },
    ],
  };
}

export function homeStructuredData(locale: Locale = 'nl'): LdObject {
  const l = LD[locale];
  const home = ROUTES[locale].home;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#webapp`,
        name: 'FunHoroscoop.nl',
        alternateName: 'FunHoroscoop',
        url: `${BASE_URL}${home}`,
        applicationCategory: 'EntertainmentApplication',
        operatingSystem: 'All',
        inLanguage: l.lang,
        description: l.appDescription,
        dateModified: CONTENT_UPDATED_AT,
        publisher: { '@id': `${BASE_URL}/#organization` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        featureList: l.features,
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}/#zodiac-list`,
        name: l.zodiacList,
        itemListElement: getHoroscoopData(locale).zodiacSigns.map((sign, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${sign.name} — ${sign.archetype}`,
          url: absolute(localizedSignPath(locale, sign.slug)),
        })),
      },
      // Zes vragen op de homepage; de volledige set staat op de FAQ-pagina.
      faqPage(getGlobalFaq(locale).slice(0, 6), `${BASE_URL}${home}#faq`),
    ],
  };
}

export function signStructuredData(sign: ZodiacSign, locale: Locale = 'nl'): LdObject {
  const l = LD[locale];
  const path = localizedSignPath(locale, sign.slug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: l.home, path: ROUTES[locale].home },
        { name: l.signs, path: ROUTES[locale].zodiac },
        { name: sign.name, path },
      ]),
      {
        '@type': 'Article',
        '@id': `${absolute(path)}#article`,
        headline: `${sign.name}: ${sign.archetype}`,
        description: sign.dossier.lead,
        mainEntityOfPage: absolute(path),
        url: absolute(path),
        inLanguage: l.lang,
        dateModified: CONTENT_UPDATED_AT,
        author: { '@id': `${BASE_URL}/#organization` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        about: { '@type': 'Thing', name: l.aboutSign(sign.name) },
      },
      faqPage(signFaq(sign, locale), `${absolute(path)}#faq`),
    ],
  };
}

export function hubStructuredData(
  title: string,
  description: string,
  path: string,
  items: Array<{ name: string; url: string }>,
  locale: Locale = 'nl'
): LdObject {
  const l = LD[locale];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: l.home, path: ROUTES[locale].home },
        { name: title, path },
      ]),
      {
        '@type': 'CollectionPage',
        '@id': `${absolute(path)}#page`,
        name: title,
        description,
        url: absolute(path),
        inLanguage: l.lang,
        dateModified: CONTENT_UPDATED_AT,
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'ItemList',
        '@id': `${absolute(path)}#list`,
        name: title,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: item.url.startsWith('http') ? item.url : absolute(item.url),
        })),
      },
    ],
  };
}

export function pairStructuredData(pair: CompatPair, locale: Locale = 'nl'): LdObject {
  const l = LD[locale];
  const path = localizedPairPath(locale, pair.key);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: l.home, path: ROUTES[locale].home },
        { name: l.compatibility, path: ROUTES[locale].compatibility },
        { name: `${pair.a.name} & ${pair.b.name}`, path },
      ]),
      {
        '@type': 'Article',
        '@id': `${absolute(path)}#article`,
        headline: `${pair.a.name} & ${pair.b.name}: ${pair.score}/100`,
        description: pair.tagline,
        mainEntityOfPage: absolute(path),
        url: absolute(path),
        inLanguage: l.lang,
        dateModified: CONTENT_UPDATED_AT,
        author: { '@id': `${BASE_URL}/#organization` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        about: [
          { '@type': 'Thing', name: l.aboutSign(pair.a.name) },
          { '@type': 'Thing', name: l.aboutSign(pair.b.name) },
        ],
      },
      faqPage(pairFaq(pair, locale), `${absolute(path)}#faq`),
    ],
  };
}

export function guideStructuredData(
  steps: Array<{ title: string; text: string; tip: string }>,
  path: string = ROUTES.nl.guide,
  locale: Locale = 'nl'
): LdObject {
  const l = LD[locale];
  const base = editorialStructuredData(
    {
      title: l.howToTitle,
      description: l.howToDescription,
      path,
      section: l.guideSection,
    },
    locale
  ) as { '@context': string; '@graph': LdObject[] };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...base['@graph'],
      {
        '@type': 'HowTo',
        '@id': `${absolute(path)}#howto`,
        name: l.howToTitle,
        description:
          locale === 'nl'
            ? 'Kies een sterrenbeeld, print de bon, sla hem op als PNG en deel hem met een vriend.'
            : 'Choose a zodiac sign, print the receipt, save it as a PNG and share it with a friend.',
        inLanguage: l.lang,
        step: steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.title,
          text: `${step.text} ${l.tipLabel}: ${step.tip}`,
        })),
      },
    ],
  };
}

export function glossaryStructuredData(
  terms: Array<{ term: string; definition: string }>,
  path: string = ROUTES.nl.glossary,
  locale: Locale = 'nl'
): LdObject {
  const l = LD[locale];
  const base = editorialStructuredData(
    {
      title: l.glossaryTitle,
      description: l.glossaryDescription,
      path,
      section: l.glossarySection,
    },
    locale
  ) as { '@context': string; '@graph': LdObject[] };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...base['@graph'],
      {
        '@type': 'DefinedTermSet',
        '@id': `${absolute(path)}#termen`,
        name: l.glossaryTitle,
        url: absolute(path),
        inLanguage: l.lang,
        hasDefinedTerm: terms.map((item) => ({
          '@type': 'DefinedTerm',
          name: item.term,
          description: item.definition,
          url: `${absolute(path)}#${item.term
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')}`,
        })),
      },
    ],
  };
}

export function editorialStructuredData(
  options: {
    title: string;
    description: string;
    path: string;
    faq?: FaqItem[];
    section?: string;
  },
  locale: Locale = 'nl'
): LdObject {
  const { title, description, path, faq, section = LD[locale].knowledgeBase } = options;
  const l = LD[locale];
  const graph: LdObject[] = [
    breadcrumb([
      { name: l.home, path: ROUTES[locale].home },
      { name: section, path },
    ]),
    {
      '@type': 'Article',
      '@id': `${absolute(path)}#article`,
      headline: title,
      description,
      mainEntityOfPage: absolute(path),
      url: absolute(path),
      inLanguage: l.lang,
      dateModified: CONTENT_UPDATED_AT,
      author: { '@id': `${BASE_URL}/#organization` },
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  ];
  if (faq?.length) graph.push(faqPage(faq, `${absolute(path)}#faq`));

  return { '@context': 'https://schema.org', '@graph': graph };
}
