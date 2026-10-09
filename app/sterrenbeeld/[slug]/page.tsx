import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { ZODIAC_SIGNS, EMOTIONAL_COSTS } from '@/lib/horoscoop-data';
import { constructZodiacMetadata, getZodiacSignBySlug } from '@/lib/seo-helpers';
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
} from 'lucide-react';

interface SterrenbeeldPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({
    slug: sign.slug,
  }));
}

export async function generateMetadata({ params }: SterrenbeeldPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug);

  if (!sign) {
    return constructZodiacMetadata(undefined, `/sterrenbeeld/${slug}/`);
  }

  return constructZodiacMetadata(sign, `/sterrenbeeld/${sign.slug}/`);
}

const ELEMENT_ICONS: Record<string, React.ElementType> = {
  Vuur: Flame,
  Aarde: Mountain,
  Lucht: Wind,
  Water: Droplets,
};

// De interactieve kassabon-printer hoort op de homepage te staan. Deze
// detailpagina is bewust een volledig statisch artikel (content-first)
// met een CTA naar de homepage voor het printen.
export default async function SterrenbeeldPage({ params }: SterrenbeeldPageProps) {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug);

  if (!sign) {
    notFound();
  }

  const ElementIcon = ELEMENT_ICONS[sign.element] ?? Sparkles;
  const verwanteTekens = ZODIAC_SIGNS.filter((s) => s.id !== sign.id && s.element === sign.element);
  const d = sign.dossier;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      {/* Top Header Bar */}
      <header className="border-b-4 border-black bg-zinc-900 px-4 py-3 shadow-[0_4px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono">
          <Link
            href="/sterrenbeeld/"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Alle sterrenbeelden</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              {sign.symbol} {sign.name} / KASSA-DOSSIER
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content Area: het dossier-artikel, direct zichtbaar */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          {/* Titel */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ElementIcon className="w-3.5 h-3.5" />
              {sign.element}teken · {sign.period}
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              {sign.symbol} {sign.name}: {sign.archetype}
            </h1>
            <p className="font-mono text-sm text-zinc-400 italic">&ldquo;{sign.roast}&rdquo;</p>
          </div>

          {/* Lead */}
          <p className="text-base md:text-lg text-yellow-400 font-bold leading-relaxed mb-6">{d.lead}</p>

          {/* Psychologie */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <Compass className="w-5 h-5 text-yellow-400" />
              De psychologie van de {sign.name.toLowerCase()}
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
              {d.paragrafen.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Kassabon-analyse */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <ReceiptText className="w-5 h-5 text-yellow-400" />
              Wat jouw kassabon onthult
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 mb-4">{d.kassabon}</p>
            <ul className="space-y-2">
              {d.kostenposten.map((kost) => (
                <li
                  key={kost}
                  className="flex items-center justify-between gap-3 border-2 border-zinc-700 bg-zinc-950 px-4 py-2.5 font-mono text-xs md:text-sm"
                >
                  <span className="text-zinc-200">{kost}</span>
                  <span className="text-yellow-400 font-black whitespace-nowrap">€{prijsVan(kost)}</span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] text-zinc-500 mt-3">
              * Voorbeeldposten uit de thermische kassabon van de {sign.name.toLowerCase()} — de volledige,
              gerandomiseerde bon met barcode en stempel print je op de homepage.
            </p>
          </div>

          {/* Kosmos-eindoordeel */}
          <div className="mb-8 border-2 border-yellow-400/40 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Kosmos-eindoordeel
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 mb-3">
              <span className="font-black text-yellow-400 uppercase font-mono text-xs block mb-1">De oprechte sterkte</span>
              {d.kracht}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-zinc-300">
              <span className="font-black text-yellow-400 uppercase font-mono text-xs block mb-1">De kosmische levensles</span>
              {d.levensles}
            </p>
          </div>

          {/* Verwante tekens */}
          <div className="border-t-2 border-zinc-800 pt-6 mb-8">
            <h2 className="text-sm font-mono font-black uppercase text-zinc-400 mb-3">
              Verwante {sign.element.toLowerCase()}tekens
            </h2>
            <div className="flex flex-wrap gap-3">
              {verwanteTekens.map((s) => (
                <Link
                  key={s.id}
                  href={`/sterrenbeeld/${s.slug}/`}
                  className="inline-flex items-center gap-2 border-2 border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs font-bold text-zinc-200 hover:border-yellow-400 hover:text-yellow-400 transition-all shadow-[2px_2px_0px_0px_#000]"
                >
                  <span className="text-base leading-none">{s.symbol}</span>
                  {s.name} ({s.archetype})
                </Link>
              ))}
            </div>
          </div>

          {/* CTA: de printer staat op de homepage */}
          <div className="text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Genoeg gelezen? Haal de echte {sign.name.toLowerCase()}-kassabon op de homepage — met onvoorspelbare
              kostenposten, barcode, kwaliteitsstempel en printgeluid.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Printer className="w-5 h-5" />
              Print de {sign.name}-kassabon
            </Link>
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Of bekijk{' '}
              <Link href="/sterrenbeeld/" className="text-yellow-400 font-bold hover:underline">
                alle 12 sterrenbeelden
              </Link>{' '}
              op één overzicht.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

// Prijs bij een kostenpost-description opzoeken in het databestand
// (data/horoscoop-data.json → emotionalCosts), zodat de getoonde prijzen
// altijd in sync blijven met de bon die de app op de homepage print.
function prijsVan(description: string): string {
  const item = EMOTIONAL_COSTS.find((k) => k.description === description);
  if (!item) return '—';
  return item.price.toFixed(2).replace('.', ',');
}