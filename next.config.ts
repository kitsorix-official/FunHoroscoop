import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Statische export: geschikt voor Cloudflare Pages (geen Node-server nodig).
  // De app is 100% client-side; alle 12 /sterrenbeeld/[slug]-pagina's worden
  // via generateStaticParams vooraf gegenereerd.
  output: 'export',
  // Exporteer elke route als <pad>/index.html (o.a. /sterrenbeeld/index.html)
  // zodat zowel /pad als /pad/ op Cloudflare Pages resolven.
  trailingSlash: true,
  transpilePackages: ['motion'],
};

export default nextConfig;