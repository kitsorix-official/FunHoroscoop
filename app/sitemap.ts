import { MetadataRoute } from 'next';
import { ZODIAC_SIGNS } from '@/lib/horoscoop-data';
import { BASE_URL as baseUrl } from '@/lib/base-url';

// Static export vereist expliciete static-markering voor metadata-routes.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Root homepage
  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  };

  // Sterrenbeeld-pillar (directory / hub-pagina)
  const pillarEntry: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/sterrenbeeld/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  };

  // Dedicated sterrenbeeld routes (canonical detail-pagina's)
  const canonicalSignEntries: MetadataRoute.Sitemap = ZODIAC_SIGNS.map((sign) => ({
    url: `${baseUrl}/sterrenbeeld/${encodeURIComponent(sign.slug)}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Juridische en contact pagina's
  const legalEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Opmerking: de ?sign=<slug> query-varianten worden bewust NIET opgenomen.
  // Die zijn alleen voor interne links (deep-linking vanuit de app) en worden
  // in robots.txt geblokkeerd met "Disallow: /*?" — ze zijn duplicate content
  // van de homepage (/), die de canonical is.

  return [rootEntry, pillarEntry, ...canonicalSignEntries, ...legalEntries];
}