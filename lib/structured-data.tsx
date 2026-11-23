import React from 'react';
import { BASE_URL } from '@/lib/base-url';
import { CONTENT_UPDATED_AT } from '@/lib/content-meta';
import { ZODIAC_SIGNS, ZodiacSign } from '@/lib/horoscoop-data';
import { CompatPair } from '@/lib/compatibiliteit';
import { FaqItem, GLOBAL_FAQ, pairFaq, signFaq } from '@/lib/editorial-content';

type LdObject = Record<string, unknown>;

function absolute(path: string): string {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Render JSON-LD veilig: '<' wordt geescaped zodat geen script-tag kan ontsnappen. */
export function JsonLd({ data }: { data: LdObject | LdObject[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

function organization(): LdObject {
  return {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'FunHoroscoop.nl',
    url: BASE_URL,
    description: 'Satirische anti-Barnum horoscoop-app met interactieve kassabonnen.',
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
export function globalStructuredData(): LdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'FunHoroscoop.nl',
        inLanguage: 'nl-NL',
        publisher: { '@id': `${BASE_URL}/#organization` },
        dateModified: CONTENT_UPDATED_AT,
      },
    ],
  };
}

export function homeStructuredData(): LdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#webapp`,
        name: 'FunHoroscoop.nl',
        alternateName: 'FunHoroscoop',
        url: BASE_URL,
        applicationCategory: 'EntertainmentApplication',
        operatingSystem: 'All',
        inLanguage: 'nl-NL',
        description:
          'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
        dateModified: CONTENT_UPDATED_AT,
        publisher: { '@id': `${BASE_URL}/#organization` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        featureList: [
          'Thermische kassabon print simulatie',
          'Anti-Barnum dossiers voor 12 sterrenbeelden',
          'Berekening van emotionele kostenposten',
          '78 deterministische compatibiliteitspagina’s',
          'PNG-export voor Instagram Stories en TikTok',
          'Cookievrije, anonieme bezoekersstatistiek',
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}/#zodiac-list`,
        name: 'De twaalf sterrenbeelden van FunHoroscoop.nl',
        itemListElement: ZODIAC_SIGNS.map((sign, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${sign.name} — ${sign.archetype}`,
          url: absolute(`/sterrenbeeld/${sign.slug}/`),
        })),
      },
      // Zes vragen op de homepage; de volledige set staat op /veelgestelde-vragen/.
      faqPage(GLOBAL_FAQ.slice(0, 6), `${BASE_URL}/#faq`),
    ],
  };
}

export function signStructuredData(sign: ZodiacSign): LdObject {
  const path = `/sterrenbeeld/${sign.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Sterrenbeelden', path: '/sterrenbeeld/' },
        { name: sign.name, path },
      ]),
      {
        '@type': 'Article',
        '@id': `${absolute(path)}#article`,
        headline: `${sign.name}: ${sign.archetype}`,
        description: sign.dossier.lead,
        mainEntityOfPage: absolute(path),
        url: absolute(path),
        inLanguage: 'nl-NL',
        dateModified: CONTENT_UPDATED_AT,
        author: { '@id': `${BASE_URL}/#organization` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        about: { '@type': 'Thing', name: `Sterrenbeeld ${sign.name}` },
      },
      faqPage(signFaq(sign), `${absolute(path)}#faq`),
    ],
  };
}

export function hubStructuredData(
  title: string,
  description: string,
  path: string,
  items: Array<{ name: string; url: string }>
): LdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: title, path },
      ]),
      {
        '@type': 'CollectionPage',
        '@id': `${absolute(path)}#page`,
        name: title,
        description,
        url: absolute(path),
        inLanguage: 'nl-NL',
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

export function pairStructuredData(pair: CompatPair): LdObject {
  const path = `/compatibiliteit/${pair.key}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Compatibiliteit', path: '/compatibiliteit/' },
        { name: `${pair.a.name} & ${pair.b.name}`, path },
      ]),
      {
        '@type': 'Article',
        '@id': `${absolute(path)}#article`,
        headline: `${pair.a.name} & ${pair.b.name}: ${pair.score}/100`,
        description: pair.tagline,
        mainEntityOfPage: absolute(path),
        url: absolute(path),
        inLanguage: 'nl-NL',
        dateModified: CONTENT_UPDATED_AT,
        author: { '@id': `${BASE_URL}/#organization` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        about: [
          { '@type': 'Thing', name: `Sterrenbeeld ${pair.a.name}` },
          { '@type': 'Thing', name: `Sterrenbeeld ${pair.b.name}` },
        ],
      },
      faqPage(pairFaq(pair), `${absolute(path)}#faq`),
    ],
  };
}

export function guideStructuredData(
  steps: Array<{ title: string; text: string; tip: string }>,
  path = '/handleiding/'
): LdObject {
  const base = editorialStructuredData({
    title: 'Zo print en deel je een kosmische kassabon',
    description: 'Van teken kiezen tot PNG delen: zo werkt de thermische printer van FunHoroscoop.nl.',
    path,
    section: 'Handleiding',
  }) as { '@context': string; '@graph': LdObject[] };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...base['@graph'],
      {
        '@type': 'HowTo',
        '@id': `${absolute(path)}#howto`,
        name: 'Zo print en deel je een kosmische kassabon',
        description: 'Kies een sterrenbeeld, print de bon, sla hem op als PNG en deel hem met een vriend.',
        inLanguage: 'nl-NL',
        step: steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.title,
          text: `${step.text} Tip: ${step.tip}`,
        })),
      },
    ],
  };
}

export function glossaryStructuredData(
  terms: Array<{ term: string; definition: string }>,
  path = '/woordenboek/'
): LdObject {
  const base = editorialStructuredData({
    title: 'Woordenboek van de Kosmische Kassa',
    description: 'Alle termen van FunHoroscoop.nl uitgelegd: van Barnum-effect tot thermisch quotum.',
    path,
    section: 'Woordenboek',
  }) as { '@context': string; '@graph': LdObject[] };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...base['@graph'],
      {
        '@type': 'DefinedTermSet',
        '@id': `${absolute(path)}#termen`,
        name: 'Woordenboek van de Kosmische Kassa',
        url: absolute(path),
        inLanguage: 'nl-NL',
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

export function editorialStructuredData(options: {
  title: string;
  description: string;
  path: string;
  faq?: FaqItem[];
  section?: string;
}): LdObject {
  const { title, description, path, faq, section = 'Kennisbank' } = options;
  const graph: LdObject[] = [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: section, path },
    ]),
    {
      '@type': 'Article',
      '@id': `${absolute(path)}#article`,
      headline: title,
      description,
      mainEntityOfPage: absolute(path),
      url: absolute(path),
      inLanguage: 'nl-NL',
      dateModified: CONTENT_UPDATED_AT,
      author: { '@id': `${BASE_URL}/#organization` },
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  ];
  if (faq?.length) graph.push(faqPage(faq, `${absolute(path)}#faq`));

  return { '@context': 'https://schema.org', '@graph': graph };
}
