import { MetadataRoute } from 'next';
import { LOCALES, ROUTES, type Locale, type StaticRouteKey } from '@/lib/i18n';
import { getHoroscoopData } from '@/lib/locale-data';
import { allCompatPairs } from '@/lib/compatibiliteit';
import { BASE_URL as baseUrl } from '@/lib/base-url';
import { CONTENT_UPDATED_DATE } from '@/lib/content-meta';

// Static export vereist expliciete static-markering voor metadata-routes.
export const dynamic = 'force-static';

const STATIC_PAGES: Array<{
  key: StaticRouteKey;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { key: 'home', changeFrequency: 'daily', priority: 1.0 },
  { key: 'zodiac', changeFrequency: 'daily', priority: 0.9 },
  { key: 'compatibility', changeFrequency: 'weekly', priority: 0.9 },
  { key: 'method', changeFrequency: 'monthly', priority: 0.8 },
  { key: 'glossary', changeFrequency: 'monthly', priority: 0.7 },
  { key: 'costs', changeFrequency: 'monthly', priority: 0.7 },
  { key: 'faq', changeFrequency: 'monthly', priority: 0.8 },
  { key: 'guide', changeFrequency: 'monthly', priority: 0.7 },
  { key: 'about', changeFrequency: 'monthly', priority: 0.7 },
  { key: 'privacy', changeFrequency: 'monthly', priority: 0.5 },
  { key: 'disclaimer', changeFrequency: 'monthly', priority: 0.5 },
  { key: 'contact', changeFrequency: 'monthly', priority: 0.5 },
];

function entriesForLocale(locale: Locale): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED_DATE;
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(({ key, changeFrequency, priority }) => ({
    url: `${baseUrl}${ROUTES[locale][key]}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const signEntries: MetadataRoute.Sitemap = getHoroscoopData(locale).zodiacSigns.map((sign) => ({
    url: `${baseUrl}/${
      locale === 'nl' ? 'sterrenbeeld' : 'en/zodiac'
    }/${encodeURIComponent(sign.slug)}/`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Alleen de canonieke (gesorteerde) paar-vorm; de spiegel-URL's canonicaliseren
  // via <link rel="canonical"> naar deze pagina's.
  const pairEntries: MetadataRoute.Sitemap = allCompatPairs(locale).map((pair) => ({
    url: `${
      baseUrl
    }/${locale === 'nl' ? 'compatibiliteit' : 'en/compatibility'}/${encodeURIComponent(pair.key)}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...signEntries, ...pairEntries];
}

export default function sitemap(): MetadataRoute.Sitemap {
  // De ?sign=<slug> query-varianten worden bewust NIET opgenomen: die zijn
  // noindex-duplicaten van de homepage en staan in robots.txt op Disallow.
  return LOCALES.flatMap(entriesForLocale);
}
