import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { ZODIAC_SIGNS } from '@/lib/horoscoop-data';
import { BASE_URL } from '@/lib/base-url';
import {
  buildCompatPair,
  allCompatPairs,
  CompatPair,
} from '@/lib/compatibiliteit';
import {
  ArrowLeft,
  ReceiptText,
  Heart,
  Flame,
  Mountain,
  Wind,
  Droplets,
  Sparkles,
  Printer,
  Users,
} from 'lucide-react';

interface CompatPageProps {
  params: Promise<{ paar: string }>;
}

const ELEMENT_ICONS: Record<string, React.ElementType> = {
  Vuur: Flame,
  Aarde: Mountain,
  Lucht: Wind,
  Water: Droplets,
};

// Beide richtingen genereren ("ram-stier" én "stier-ram"); de canonieke URL
// is altijd de gesorteerde vorm (pair.key). Alleen die vorm komt in de sitemap.
export function generateStaticParams() {
  return ZODIAC_SIGNS.flatMap((a) =>
    ZODIAC_SIGNS.map((b) => ({ paar: `${a.slug}-${b.slug}` }))
  );
}

export async function generateMetadata({ params }: CompatPageProps): Promise<Metadata> {
  const { paar } = await params;
  const named = paar.split('-');
  const pair = buildCompatPair(named[0], named[1]);

  if (!pair) {
    return {
      title: 'Sterrenbeeld Compatibiliteit | FunHoroscoop.nl',
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/compatibiliteit/${pair.key}/`;
  const title = `${pair.a.name} & ${pair.b.name} Compatibiliteit (${pair.score}/100) | FunHoroscoop.nl`;
  const description = `De kosmische kassa over ${pair.a.name} (${pair.a.element}) + ${pair.b.name} (${pair.b.element}): ${pair.scoreLabel.toLowerCase()}. "${pair.tagline}" Bekijk de gezamenlijke bon en print de jouwe.`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      locale: 'nl_NL',
      url: `${BASE_URL}${canonicalPath}`,
      siteName: 'FunHoroscoop.nl',
      title,
      description,
      tags: [
        `${pair.a.name} ${pair.b.name} compatibiliteit`,
        `${pair.a.name} en ${pair.b.name}`,
        pair.a.element,
        pair.b.element,
        'sterrenbeeld relatie',
        'Anti-Barnum',
        'Satire',
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@funhoroscoop',
      creator: '@funhoroscoop',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'entertainment',
  };
}

function pairToJsonLd(pair: CompatPair, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sterrenbeeld compatibiliteit', item: `${BASE_URL}/compatibiliteit/` },
      { '@type': 'ListItem', position: 3, name: `${pair.a.name} & ${pair.b.name}`, item: `${BASE_URL}${path}` },
    ],
  };
}

export default async function CompatPage({ params }: CompatPageProps) {
  const { paar } = await params;
  const named = paar.split('-');
  const pair = buildCompatPair(named[0], named[1]);

  if (!pair) {
    notFound();
  }

  const IconA = ELEMENT_ICONS[pair.a.element] ?? Sparkles;
  const IconB = ELEMENT_ICONS[pair.b.element] ?? Sparkles;
  const parenVanA = allCompatPairs().filter((p) => p.a.slug === pair.a.slug && !p.self);
  const parenVanB = allCompatPairs().filter((p) => p.a.slug === pair.b.slug && !p.self);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      {/* Top Header Bar */}
      <header className="border-b-4 border-black bg-zinc-900 px-4 py-3 shadow-[0_4px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono">
          <Link
            href="/compatibiliteit/"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Alle combinaties</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              {pair.a.symbol} {pair.a.name} & {pair.b.symbol} {pair.b.name} / KASSA-MATCH
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pairToJsonLd(pair, `/compatibiliteit/${pair.key}/`)),
          }}
        />
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          {/* Titel */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Heart className="w-3.5 h-3.5" />
              {pair.a.element} × {pair.b.element} · Kosmische Kassa-match
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              {pair.a.symbol} {pair.a.name} & {pair.b.symbol} {pair.b.name}
              <span className="text-yellow-400"> — Compatibiliteit</span>
            </h1>
            <p className="font-mono text-sm text-zinc-400 italic">&ldquo;{pair.tagline}&rdquo;</p>
          </div>

          {/* Score */}
          <div className="grid sm:grid-cols-[auto_1fr] gap-4 items-stretch mb-8">
            <div className="bg-zinc-950 border-2 border-yellow-400/60 p-4 text-center flex flex-col items-center justify-center">
              <span className="font-mono text-[10px] uppercase text-zinc-500">Kassabon-score</span>
              <span className="font-black font-mono text-4xl text-yellow-400 leading-none my-1">{pair.score}</span>
              <span className="font-mono text-[11px] text-zinc-400">/ 100</span>
            </div>
            <div className="border-2 border-zinc-700 bg-zinc-950 p-4">
              <p className="text-sm md:text-base font-bold text-yellow-400 leading-snug">{pair.scoreLabel}</p>
              <p className="font-mono text-xs text-zinc-400 mt-2">
                Element-match:{' '}
                <span className="inline-flex items-center gap-1">
                  <IconA className="w-3.5 h-3.5 inline" /> {pair.a.element}
                </span>{' '}
                ×{' '}
                <span className="inline-flex items-center gap-1">
                  <IconB className="w-3.5 h-3.5 inline" /> {pair.b.element}
                </span>
              </p>
            </div>
          </div>

          {/* Dynamiek */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <ReceiptText className="w-5 h-5 text-yellow-400" />
              Wat de kassa zegt
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">{pair.dynamiek}</p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-400 mt-3">
              {pair.a.name} ({pair.a.archetype}) en {pair.b.name} ({pair.b.archetype}) — de kosmische printer weigert
              ze te scheiden, maar drukt ze ook niet als korting af. De bon vertelt het eerlijk, zoals altijd.
            </p>
          </div>

          {/* Rollen */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <Users className="w-5 h-5 text-yellow-400" />
              Rollen in de relatie
            </h2>
            <ul className="space-y-2">
              <li className="border-2 border-zinc-700 bg-zinc-950 px-4 py-2.5 font-mono text-xs md:text-sm text-zinc-200">
                <span className="text-yellow-400 font-black">{pair.a.symbol} {pair.a.name}:</span>{' '}
                {pair.rolA}
              </li>
              {!pair.self && pair.rolB && (
                <li className="border-2 border-zinc-700 bg-zinc-950 px-4 py-2.5 font-mono text-xs md:text-sm text-zinc-200">
                  <span className="text-yellow-400 font-black">{pair.b.symbol} {pair.b.name}:</span>{' '}
                  {pair.rolB}
                </li>
              )}
            </ul>
          </div>

          {/* Gezamenlijke bon */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <ReceiptText className="w-5 h-5 text-yellow-400" />
              De gezamenlijke bon
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 mb-4">
              Dit vertelt deze combinatie samen áán de kassa — voorbeeldposten uit de thermische bon van dit duo:
            </p>
            <ul className="space-y-2">
              {pair.bonItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 border-2 border-zinc-700 bg-zinc-950 px-4 py-2.5 font-mono text-xs md:text-sm"
                >
                  <span className="text-zinc-200">{item.description}</span>
                  <span className="text-yellow-400 font-black whitespace-nowrap">{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] text-zinc-500 mt-3">
              * De volledige gerandomiseerde bon met barcode en stempel print je op de homepage.
            </p>
          </div>

          {/* Roasts */}
          <div className="mb-8 border-2 border-zinc-700 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              De recensies van de kosmos
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 mb-3">
              <span className="font-black text-yellow-400 uppercase font-mono text-xs block mb-1">
                {pair.a.symbol} {pair.a.name}
              </span>
              &ldquo;{pair.a.roast}&rdquo;
            </p>
            {!pair.self && (
              <p className="text-sm md:text-base leading-relaxed text-zinc-300 border-t border-zinc-800 pt-3">
                <span className="font-black text-yellow-400 uppercase font-mono text-xs block mb-1">
                  {pair.b.symbol} {pair.b.name}
                </span>
                &ldquo;{pair.b.roast}&rdquo;
              </p>
            )}
          </div>

          {/* Overige combinaties met A */}
          <div className="border-t-2 border-zinc-800 pt-6 mb-8">
            <h2 className="text-sm font-mono font-black uppercase text-zinc-400 mb-3">
              Andere matches met {pair.a.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {parenVanA.map((p) => (
                <Link
                  key={p.key}
                  href={`/compatibiliteit/${p.key}/`}
                  className="inline-flex items-center gap-2 border-2 border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs font-bold text-zinc-200 hover:border-yellow-400 hover:text-yellow-400 transition-all shadow-[2px_2px_0px_0px_#000]"
                >
                  <span className="text-base leading-none">{p.b.symbol}</span>
                  {pair.a.name} & {p.b.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Overige combinaties met B */}
          {!pair.self && (
            <div className="border-t-2 border-zinc-800 pt-6 mb-8">
              <h2 className="text-sm font-mono font-black uppercase text-zinc-400 mb-3">
                Andere matches met {pair.b.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {parenVanB.map((p) => (
                  <Link
                    key={p.key}
                    href={`/compatibiliteit/${p.key}/`}
                    className="inline-flex items-center gap-2 border-2 border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs font-bold text-zinc-200 hover:border-yellow-400 hover:text-yellow-400 transition-all shadow-[2px_2px_0px_0px_#000]"
                  >
                    <span className="text-base leading-none">{p.a.symbol}</span>
                    {p.a.name} & {pair.b.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Klaar met gokken over deze match? Haal je éigen {pair.a.name}- of {pair.b.name}-kassabon op de homepage —
              print de bon en deel hem met degene die dit duo precies is.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Printer className="w-5 h-5" />
                Print mijn bon
              </Link>
              <Link
                href={`/sterrenbeeld/${pair.a.slug}/`}
                className="inline-flex items-center gap-2 font-mono font-bold uppercase text-xs bg-zinc-950 text-zinc-200 px-5 py-3 border-2 border-zinc-700 shadow-[2px_2px_0px_0px_#000] hover:border-yellow-400 hover:text-yellow-400 transition-all"
              >
                {pair.a.symbol} {pair.a.name}-dossier
              </Link>
              {!pair.self && (
                <Link
                  href={`/sterrenbeeld/${pair.b.slug}/`}
                  className="inline-flex items-center gap-2 font-mono font-bold uppercase text-xs bg-zinc-950 text-zinc-200 px-5 py-3 border-2 border-zinc-700 shadow-[2px_2px_0px_0px_#000] hover:border-yellow-400 hover:text-yellow-400 transition-all"
                >
                  {pair.b.symbol} {pair.b.name}-dossier
                </Link>
              )}
            </div>
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Of bekijk{' '}
              <Link href="/compatibiliteit/" className="text-yellow-400 font-bold hover:underline">
                alle sterrenbeeld-combinaties
              </Link>{' '}
              of{' '}
              <Link href="/sterrenbeeld/" className="text-yellow-400 font-bold hover:underline">
                alle 12 sterrenbeelden
              </Link>
              .
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}