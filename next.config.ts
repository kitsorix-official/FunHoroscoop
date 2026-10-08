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
  transpilePackages: ['motion'],
};

export default nextConfig;