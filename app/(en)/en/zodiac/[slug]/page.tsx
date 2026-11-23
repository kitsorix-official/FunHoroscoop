import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqSection } from '@/components/FaqSection';
import { formatEuro, ROUTES } from '@/lib/i18n';
import { getHoroscoopData } from '@/lib/locale-data';
import { buildCompatPair } from '@/lib/compatibiliteit';
import { signFaq } from '@/lib/editorial-content';
import { constructZodiacMetadata, getZodiacSignBySlug } from '@/lib/seo-helpers';
import { JsonLd, signStructuredData } from '@/lib/structured-data';
import {
  ArrowLeft,
  ReceiptText,
  Compass,
  Sparkles,
  Printer,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Heart,
} from 'lucide-react';

interface EnglishZodiacPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getHoroscoopData('en').zodiacSigns.map((sign) => ({ slug: sign.slug }));
}

export async function generateMetadata({ params }: EnglishZodiacPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug, 'en');

  if (!sign) {
    return constructZodiacMetadata(undefined, `/en/zodiac/${slug}/`, 'en');
  }

  return constructZodiacMetadata(sign, `/en/zodiac/${sign.slug}/`, 'en');
}

const ELEMENT_ICONS: Record<string, React.ElementType> = {
  Fire: Flame,
  Earth: Mountain,
  Air: Wind,
  Water: Droplets,
};

// The interactive receipt printer lives on the homepage. This detail page is
// deliberately a fully static, content-first article with a CTA to print.
export default async function EnglishZodiacPage({ params }: EnglishZodiacPageProps) {
  const { slug } = await params;
  const data = getHoroscoopData('en');
  const sign = getZodiacSignBySlug(slug, 'en');

  if (!sign) {
    notFound();
  }

  const ElementIcon = ELEMENT_ICONS[sign.element] ?? Sparkles;
  const relatedSigns = data.zodiacSigns.filter(
    (s) => s.id !== sign.id && s.element === sign.element
  );
  const d = sign.dossier;
  const elementLower = sign.element.toLowerCase();
  const nameLower = sign.name.toLowerCase();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      <JsonLd data={signStructuredData(sign, 'en')} />

      {/* Top Header Bar */}
      <header className="border-b-4 border-black bg-zinc-900 px-4 py-3 shadow-[0_4px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono">
          <Link
            href={ROUTES.en.zodiac}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All zodiac signs</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              {sign.symbol} {sign.name} / CHECKOUT DOSSIER
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content Area: the dossier article, visible immediately */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          <Breadcrumbs
            items={[
              { name: 'Home', href: ROUTES.en.home },
              { name: 'Zodiac signs', href: ROUTES.en.zodiac },
              { name: sign.name },
            ]}
            locale="en"
          />

          {/* Title */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ElementIcon className="w-3.5 h-3.5" />
              {sign.element} sign · {sign.period}
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              {sign.symbol} {sign.name}: {sign.archetype}
            </h1>
            <p className="font-mono text-sm text-zinc-400 italic">&ldquo;{sign.roast}&rdquo;</p>
          </div>

          {/* Lead */}
          <p className="text-base md:text-lg text-yellow-400 font-bold leading-relaxed mb-6">{d.lead}</p>

          {/* Psychology */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <Compass className="w-5 h-5 text-yellow-400" />
              The psychology of {nameLower}
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
              {d.paragrafen.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Receipt analysis */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <ReceiptText className="w-5 h-5 text-yellow-400" />
              What your receipt reveals
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 mb-4">{d.kassabon}</p>
            <ul className="space-y-2">
              {d.kostenposten.map((charge) => (
                <li
                  key={charge}
                  className="flex items-center justify-between gap-3 border-2 border-zinc-700 bg-zinc-950 px-4 py-2.5 font-mono text-xs md:text-sm"
                >
                  <span className="text-zinc-200">{charge}</span>
                  <span className="text-yellow-400 font-black whitespace-nowrap">
                    {priceFor(charge, data.emotionalCosts)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] text-zinc-500 mt-3">
              * Example charges from {nameLower}&rsquo;s thermal receipt — print the full,
              randomised receipt with barcode and stamp on the homepage.
            </p>
          </div>

          {/* Cosmic verdict */}
          <div className="mb-8 border-2 border-yellow-400/40 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              The cosmic verdict
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 mb-3">
              <span className="font-black text-yellow-400 uppercase font-mono text-xs block mb-1">
                The genuine strength
              </span>
              {d.kracht}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="font-black text-yellow-400 uppercase font-mono text-xs block mb-1">
                The cosmic life lesson
              </span>
              {d.levensles}
            </p>
          </div>

          {/* Related signs */}
          <div className="border-t-2 border-zinc-800 pt-6 mb-8">
            <h2 className="text-sm font-mono font-black uppercase text-zinc-400 mb-3">
              Related {elementLower} signs
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSigns.map((s) => (
                <Link
                  key={s.id}
                  href={`/en/zodiac/${s.slug}/`}
                  className="inline-flex items-center gap-2 border-2 border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs font-bold text-zinc-200 hover:border-yellow-400 hover:text-yellow-400 transition-all shadow-[2px_2px_0px_0px_#000]"
                >
                  <span className="text-base leading-none">{s.symbol}</span>
                  {s.name} ({s.archetype})
                </Link>
              ))}
            </div>
          </div>

          {/* Compatibility: which signs match this one? */}
          <div className="border-t-2 border-zinc-800 pt-6 mb-8">
            <h2 className="flex items-center gap-2 text-sm font-mono font-black uppercase text-zinc-400 mb-3">
              <Heart className="w-4 h-4 text-yellow-400" />
              Which signs match {nameLower}?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              The cosmic checkout calculated every combination — here are {nameLower}&rsquo;s matches:
            </p>
            <div className="flex flex-wrap gap-3">
              {data.zodiacSigns.map((other) => {
                if (other.id === sign.id) return null;
                const pair = buildCompatPair(sign.slug, other.slug, 'en');
                if (!pair) return null;
                return (
                  <Link
                    key={other.id}
                    href={`/en/compatibility/${pair.key}/`}
                    className="inline-flex items-center gap-2 border-2 border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs font-bold text-zinc-200 hover:border-yellow-400 hover:text-yellow-400 transition-all shadow-[2px_2px_0px_0px_#000]"
                  >
                    <span className="text-base leading-none">{other.symbol}</span>
                    {sign.name} & {other.name}
                    <span className="text-yellow-400 font-black">{pair.score}/100</span>
                  </Link>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-zinc-500 mt-3">
              Or see{' '}
              <Link href={ROUTES.en.compatibility} className="text-yellow-400 font-bold hover:underline">
                all 78 zodiac combinations
              </Link>{' '}
              at a glance.
            </p>
          </div>

          {/* Visible FAQ — same questions/answers as the JSON-LD above */}
          <FaqSection
            items={signFaq(sign, 'en')}
            title={`Frequently asked questions about ${sign.name}`}
            intro={`Specific answers instead of Barnum flattery. Everything you want to know about ${nameLower}’s receipt, in one place.`}
            locale="en"
          />

          {/* CTA: the printer is on the homepage */}
          <div className="text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Done reading? Get the real {nameLower} receipt on the homepage — with unpredictable
              charges, barcode, quality stamp and printer sound.
            </p>
            <Link
              href={ROUTES.en.home}
              className="inline-flex items-center gap-2 font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Printer className="w-5 h-5" />
              Print the {sign.name} receipt
            </Link>
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Or browse{' '}
              <Link href={ROUTES.en.zodiac} className="text-yellow-400 font-bold hover:underline">
                all 12 zodiac signs
              </Link>{' '}
              at a glance.
            </p>
          </div>
        </article>
      </main>

      <Footer locale="en" />
    </div>
  );
}

// Look up the price of a charge description in the English dataset so the
// displayed prices always match the receipt printed by the app.
function priceFor(description: string, costs: Array<{ description: string; price: number }>): string {
  const item = costs.find((k) => k.description === description);
  return item ? formatEuro(item.price, 'en') : '—';
}
