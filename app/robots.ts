import { MetadataRoute } from 'next';
import { BASE_URL as baseUrl } from '@/lib/base-url';

// Static export vereist expliciete static-markering voor metadata-routes.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Blokkeer alle query-URL's (o.a. /?sign=<teken>). Die zijn duplicate
      // content van hun basis-URL (canonical) en alleen bedoeld voor interne
      // links, niet voor de zoekindex.
      disallow: ['/api/', '/*?'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}