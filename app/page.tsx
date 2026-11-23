import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ReceiptText, BookOpen, ListFilter, CircleHelp, Printer } from 'lucide-react';
import { HoroscoopApp } from '@/components/HoroscoopApp';
import { FaqSection } from '@/components/FaqSection';
import { ZODIAC_SIGNS } from '@/lib/horoscoop-data';
import { GLOBAL_FAQ } from '@/lib/editorial-content';
import { constructZodiacMetadata } from '@/lib/seo-helpers';
import { homeStructuredData, JsonLd } from '@/lib/structured-data';

// Statische export: de homepage wordt volledig meegebakken in de HTML.
// De ?sign= deep-links worden client-side afgehandeld (zie HoroscoopApp) en
// zijn bewust noindex — vandaar geen generateMetadata/searchParams hier.
export const metadata: Metadata = constructZodiacMetadata(undefined, '/');

export default function Page() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />

      {/* Interactieve kassa: prerendert nu óók zijn initiele markup in de HTML. */}
      <HoroscoopApp />

      {/* Crawlbare, statische lagen onder de printer. Geen JavaScript nodig. */}
      <div className="bg-zinc-950 text-zinc-100 selection:bg-yellow-400 selection:text-black">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10">
          <section className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-lg md:text-2xl font-mono font-black uppercase text-white mb-4">
              <ReceiptText className="w-5 h-5 text-yellow-400 shrink-0" />
              Waarom dit geen gewone horoscoop is
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
              <p>
                Een klassieke horoscoop werkt met het <strong className="text-yellow-400">Barnum-effect</strong>:
                vage zinnen als &ldquo;je bent soms extravert, soms introvert&rdquo; lijken persoonlijk,
                maar passen op bijna iedereen. FunHoroscoop doet het tegenovergestelde. We beschrijven
                gedrag, geen persoonlijkheid — en we rekenen er een prijs voor af.
              </p>
              <p>
                Het resultaat is een <strong className="text-yellow-400">thermische kassabon</strong> met
                emotionele kostenposten, een fictief totaal, een barcode en een kwaliteitsstempel als
                &ldquo;100% TOXIC&rdquo;. Geen voorspelling, geen advies, geen zweverigheid. Alleen een
                liefkozende afrekening van je eigen gedrag.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
              <Link
                href="/anti-barnum/"
                className="inline-flex items-center gap-2 bg-yellow-400 text-black font-black uppercase px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300"
              >
                <BookOpen className="w-4 h-4" />
                De anti-Barnum-methode
              </Link>
              <Link
                href="/kostenposten/"
                className="inline-flex items-center gap-2 bg-zinc-950 text-zinc-100 font-bold uppercase px-4 py-2.5 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-400"
              >
                <ListFilter className="w-4 h-4" />
                De volledige prijslijst
              </Link>
              <Link
                href="/handleiding/"
                className="inline-flex items-center gap-2 bg-zinc-950 text-zinc-100 font-bold uppercase px-4 py-2.5 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-400"
              >
                <Printer className="w-4 h-4" />
                Zo werkt de printer
              </Link>
            </div>
          </section>

          <section className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            <h2 className="text-lg md:text-2xl font-mono font-black uppercase text-white mb-2">
              Kies jouw dossier
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              Twaalf tekens, twaalf archetypen, twaalf keer een andere rekening. Elk dossier is
              volledig statisch en bevat de psychologie, de kostenposten en de kosmische levensles
              van dat teken.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {ZODIAC_SIGNS.map((sign) => (
                <li key={sign.id}>
                  <Link
                    href={`/sterrenbeeld/${sign.slug}/`}
                    className="flex items-start gap-2 h-full border-2 border-zinc-700 bg-zinc-950 px-3 py-2.5 font-mono text-xs hover:border-yellow-400 transition-all shadow-[2px_2px_0px_0px_#000]"
                  >
                    <span className="text-base leading-none">{sign.symbol}</span>
                    <span>
                      <strong className="block text-zinc-100">{sign.name}</strong>
                      <span className="text-zinc-500 leading-tight">{sign.archetype}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Of bekijk alle{' '}
              <Link href="/compatibiliteit/" className="text-yellow-400 font-bold hover:underline">
                78 sterrenbeeld-combinaties
              </Link>{' '}
              — inclusief de gezamenlijke kassabon.
            </p>
          </section>

          <section className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-lg md:text-2xl font-mono font-black uppercase text-white mb-4">
              <CircleHelp className="w-5 h-5 text-yellow-400 shrink-0" />
              Goed om te weten
            </h2>
            <FaqSection
              items={GLOBAL_FAQ.slice(0, 6)}
              title="Veelgestelde vragen over de kosmische kassa"
              intro="Privacy, prijzen, nachtslot en de vraag die iedereen stiekem wil stellen: is dit serieus bedoeld?"
            />
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Meer antwoorden? Bekijk{' '}
              <Link href="/veelgestelde-vragen/" className="text-yellow-400 font-bold hover:underline">
                alle veelgestelde vragen
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
