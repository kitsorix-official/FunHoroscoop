import type { Metadata } from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import { BASE_URL as baseUrl } from '@/lib/base-url';
import { ROUTES, localeAlternates } from '@/lib/i18n';
import { globalStructuredData, JsonLd } from '@/lib/structured-data';

const TITLE = 'FunHoroscoop.nl - Satirical Cosmic Receipt';
const DESCRIPTION =
  'The anti-Barnum horoscope app with thermal receipts full of emotional charges, toxic archetypes and zero excuses.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: localeAlternates('en', ROUTES.en.home),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${baseUrl}${ROUTES.en.home}`,
    siteName: 'FunHoroscoop.nl',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={globalStructuredData('en')} />
        <Script src="/observ.js" strategy="afterInteractive" />
      </head>
      <body
        suppressHydrationWarning
        className="bg-zinc-950 text-zinc-100 antialiased selection:bg-yellow-400 selection:text-black"
      >
        {children}
      </body>
    </html>
  );
}
