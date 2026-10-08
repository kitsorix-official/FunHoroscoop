import { Metadata } from 'next';
import { ZODIAC_SIGNS, ZodiacSign } from '@/lib/horoscoop-data';
import { BASE_URL } from '@/lib/base-url';

export { BASE_URL };

export function getZodiacSignBySlug(slugOrName?: string): ZodiacSign | undefined {
  if (!slugOrName) return undefined;
  const normalized = slugOrName.toLowerCase().trim();
  return ZODIAC_SIGNS.find(
    (s) => s.slug.toLowerCase() === normalized || s.name.toLowerCase() === normalized
  );
}

export function constructZodiacMetadata(sign?: ZodiacSign, pathUrl = '/'): Metadata {
  if (!sign) {
    const title = 'FunHoroscoop.nl – Satirische Kosmische Kassabon | Anti-Barnum';
    const description =
      'De anti-Barnum horoscoop-app met interactieve thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses. 100% gratis & TikTok-ready.';

    return {
      title,
      description,
      applicationName: 'FunHoroscoop.nl',
      authors: [{ name: 'FunHoroscoop Team' }],
      generator: 'Next.js',
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
      creator: 'FunHoroscoop.nl',
      publisher: 'FunHoroscoop.nl',
      metadataBase: new URL(BASE_URL),
      alternates: {
        canonical: pathUrl,
      },
      openGraph: {
        type: 'website',
        locale: 'nl_NL',
        url: `${BASE_URL}${pathUrl}`,
        siteName: 'FunHoroscoop.nl',
        title,
        description,
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

  const title = `${sign.name} Horoscoop (${sign.symbol}) – "${sign.archetype}" | FunHoroscoop.nl`;
  const description = `Jouw ongezouten kassa-horoscoop voor ${sign.name}: "${sign.roast}" Print je emotionele rekening, ontdek jouw coping-mechanisme en deel jouw bon.`;

  return {
    title,
    description,
    applicationName: 'FunHoroscoop.nl',
    authors: [{ name: 'FunHoroscoop Team' }],
    keywords: [
      `${sign.name} horoscoop`,
      `sterrenbeeld ${sign.name}`,
      sign.archetype,
      'anti-barnum horoscoop',
      'satirische horoscoop',
      'kassabon',
      'emotionele schade',
      sign.element,
      'funhoroscoop',
    ],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: pathUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'nl_NL',
      url: `${BASE_URL}${pathUrl}`,
      siteName: 'FunHoroscoop.nl',
      title,
      description,
      tags: [sign.name, sign.archetype, sign.element, 'Anti-Barnum', 'Satire'],
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
