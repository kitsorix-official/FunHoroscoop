import type {Metadata} from 'next';
import './globals.css';
import {BASE_URL as baseUrl} from '@/lib/base-url';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'FunHoroscoop.nl - Satirische Kosmische Kassabon',
  description: 'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
  alternates: {
    canonical: '/',
  },
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${baseUrl}/#webapp`,
      name: 'FunHoroscoop.nl',
      alternateName: 'FunHoroscoop',
      url: baseUrl,
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      inLanguage: 'nl-NL',
      description:
        'De anti-Barnum horoscoop-app met thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      featureList: [
        'Thermische kassabon print simulatie',
        'Anti-Barnum cynische horoscopen voor 12 sterrenbeelden',
        'Berekening van emotionele kostenposten',
        'Social story download (PNG) voor Instagram en TikTok',
        'Nachtslot guardrail (EU Anti-verslaving)',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'FunHoroscoop.nl',
      description: 'Satirische anti-Barnum horoscoop-app met interactieve kassabon printer.',
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'FAQPage',
      '@id': `${baseUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wat is FunHoroscoop.nl?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FunHoroscoop.nl is een satirische Nederlandse webapplicatie die het zogeheten Barnum-effect ontmantelt. In plaats van algemene complimenten print de app een thermische kassabon met emotionele kostenposten en rake observaties over jouw sterrenbeeld.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wat kost het afdrukken van een kassabon?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Het afdrukken van een bon is 100% gratis en anoniem. Er worden geen cookies, accounts of gebruikersdata opgeslagen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wat is het nachtslot op de printer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Om nachtelijk doelloos scrollen tegen te gaan is er een configureerbaar nachtslot. Tussen avond en 07:00 CET slapen de planeten en is de printer gesloten.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-100 antialiased selection:bg-yellow-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
