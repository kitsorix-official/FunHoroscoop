import type {Metadata} from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import {BASE_URL as baseUrl} from '@/lib/base-url';
import {localeAlternates} from '@/lib/i18n';
import {globalStructuredData, JsonLd} from '@/lib/structured-data';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'FunHoroscoop.nl - Satirische Kosmische Kassabon',
  description: 'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
  alternates: localeAlternates('nl', '/'),
  openGraph: {
    title: 'FunHoroscoop.nl - Satirische Kosmische Kassabon',
    description: 'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
    url: baseUrl,
    siteName: 'FunHoroscoop.nl',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FunHoroscoop.nl - Satirische Kosmische Kassabon',
    description: 'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="nl">
      <head>
        <JsonLd data={globalStructuredData('nl')} />
        <Script src="/observ.js" strategy="afterInteractive" />
      </head>
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-100 antialiased selection:bg-yellow-400 selection:text-black">
        {children}
        <a
          href="/hp-trap"
          aria-hidden="true"
          tabIndex={-1}
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          Do not follow
        </a>
      </body>
    </html>
  );
}
