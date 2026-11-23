import { Metadata } from 'next';
import {
  localeAlternates,
  type Locale,
} from '@/lib/i18n';
import { getHoroscoopData, type ZodiacSign } from '@/lib/locale-data';
import { BASE_URL } from '@/lib/base-url';

export { BASE_URL };

const OG_LOCALE: Record<Locale, string> = { nl: 'nl_NL', en: 'en_GB' };

const HOME_META: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  nl: {
    title: 'FunHoroscoop.nl – Grappige & Satirische Horoscoop (Kosmische Kassabon)',
    description:
      'Bekijk je ongefilterde, satirische kosmische kassabon via FunHoroscoop.nl voor een humoristische, no-nonsense blik op je sterrenbeeld',
    keywords: [
      'horoscoop',
      'satire horoscoop',
      'anti-barnum',
      'kassabon horoscoop',
      'grappige horoscoop',
      'emotionele schade',
      'sterrenbeelden nederlands',
      'tiktok horoscoop',
    ],
  },
  en: {
    title: 'FunHoroscoop.nl – Funny & Satirical Horoscope (Cosmic Receipt)',
    description:
      'Get your unfiltered, satirical cosmic receipt at FunHoroscoop.nl: a humorous, no-nonsense look at your zodiac sign',
    keywords: [
      'horoscope',
      'satirical horoscope',
      'anti-barnum',
      'receipt horoscope',
      'funny horoscope',
      'emotional damage',
      'zodiac signs english',
      'tiktok horoscope',
    ],
  },
};

export function getZodiacSignBySlug(
  slugOrName: string | undefined,
  locale: Locale = 'nl'
): ZodiacSign | undefined {
  if (!slugOrName) return undefined;
  const normalized = slugOrName.toLowerCase().trim();
  return getHoroscoopData(locale).zodiacSigns.find(
    (s) => s.slug.toLowerCase() === normalized || s.name.toLowerCase() === normalized
  );
}

export function constructZodiacMetadata(
  sign?: ZodiacSign,
  pathUrl = '/',
  locale: Locale = 'nl'
): Metadata {
  const base = HOME_META[locale];
  const title = sign
    ? locale === 'nl'
      ? `${sign.name} Horoscoop (${sign.symbol}) – "${sign.archetype}" | FunHoroscoop.nl`
      : `${sign.name} Horoscope (${sign.symbol}) – "${sign.archetype}" | FunHoroscoop.nl`
    : base.title;
  const description = sign
    ? locale === 'nl'
      ? `Jouw ongezouten kassa-horoscoop voor ${sign.name}: "${sign.roast}" Print je emotionele rekening, ontdek jouw coping-mechanisme en deel jouw bon.`
      : `Your unfiltered checkout horoscope for ${sign.name}: "${sign.roast}" Print your emotional bill, discover your coping mechanism and share your receipt.`
    : base.description;

  const keywords = sign
    ? locale === 'nl'
      ? [
          `${sign.name} horoscoop`,
          `sterrenbeeld ${sign.name}`,
          sign.archetype,
          'anti-barnum horoscoop',
          'satirische horoscoop',
          'kassabon',
          'emotionele schade',
          sign.element,
          'funhoroscoop',
        ]
      : [
          `${sign.name} horoscope`,
          `zodiac sign ${sign.name}`,
          sign.archetype,
          'anti-barnum horoscope',
          'satirical horoscope',
          'receipt',
          'emotional damage',
          sign.element,
          'funhoroscoop',
        ]
    : base.keywords;

  return {
    title,
    description,
    applicationName: 'FunHoroscoop.nl',
    authors: [{ name: 'FunHoroscoop Team' }],
    generator: 'Next.js',
    keywords,
    creator: 'FunHoroscoop.nl',
    publisher: 'FunHoroscoop.nl',
    metadataBase: new URL(BASE_URL),
    alternates: localeAlternates(locale, pathUrl),
    openGraph: {
      type: sign ? 'article' : 'website',
      locale: OG_LOCALE[locale],
      url: `${BASE_URL}${pathUrl}`,
      siteName: 'FunHoroscoop.nl',
      title,
      description,
      ...(sign
        ? { tags: [sign.name, sign.archetype, sign.element, 'Anti-Barnum', 'Satire'] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@funhoroscoop',
      creator: '@funhoroscoop',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'entertainment',
  };
}

/** Hreflang voor redactionele pagina's die niet via constructZodiacMetadata gaan. */
export function withLocaleAlternates(
  metadata: Metadata,
  locale: Locale,
  path: string
): Metadata {
  return {
    ...metadata,
    alternates: localeAlternates(locale, path),
    openGraph: {
      ...(typeof metadata.openGraph === 'object' ? metadata.openGraph : {}),
      locale: OG_LOCALE[locale],
    },
  };
}
