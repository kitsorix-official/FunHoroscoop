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

  // Dedicated sterrenbeeld routes (canonical)
  const canonicalSignEntries: MetadataRoute.Sitemap = ZODIAC_SIGNS.map((sign) => ({
    url: `${baseUrl}/sterrenbeeld/${encodeURIComponent(sign.slug)}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Juridische en contact pagina's
  const legalEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Query parameter varianten
  const querySignEntries: MetadataRoute.Sitemap = ZODIAC_SIGNS.map((sign) => ({
    url: `${baseUrl}/?sign=${encodeURIComponent(sign.slug)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [rootEntry, ...canonicalSignEntries, ...legalEntries, ...querySignEntries];
}
