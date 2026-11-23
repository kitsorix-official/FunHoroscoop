import { MetadataRoute } from 'next';
import { BASE_URL as baseUrl } from '@/lib/base-url';

// Static export vereist expliciete static-markering voor metadata-routes.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/*?', '/hp-trap'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/*?', '/hp-trap'],
      },
      {
        // Concurrenten hoeven onze statische HTML niet te scrapen.
        userAgent: ['AhrefsBot', 'SemrushBot'],
        disallow: '/',
      },
      // GEO/AEO: deze crawlers mogen de statische HTML wél lezen. Zonder
      // toegang kunnen AI-assistenten de dossiers niet citeren of doorverwijzen.
      // De noindex query-varianten en de honeypot blijven ook voor hen dicht.
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'meta-externalagent',
          'MistralAI-User',
          'DuckAssistBot',
        ],
        allow: '/',
        disallow: ['/*?', '/hp-trap'],
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      // Standaard: alles open, behalve de duplicate query-varianten en de
      // honeypot. Een 'Disallow: /' voor * zou ook onbekende AI-crawlers en
      // link-preview-bots buiten sluiten — precies wat we níet willen.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*?', '/hp-trap'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
