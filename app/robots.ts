import { MetadataRoute } from 'next';
import { BASE_URL as baseUrl } from '@/lib/base-url';

// Static export vereist expliciete static-markering voor metadata-routes.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
