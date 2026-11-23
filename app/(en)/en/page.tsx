import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ReceiptText, BookOpen, ListFilter, CircleHelp, Printer } from 'lucide-react';
import { HoroscoopApp } from '@/components/HoroscoopApp';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { ROUTES } from '@/lib/i18n';
import { getHoroscoopData } from '@/lib/locale-data';
import { getGlobalFaq } from '@/lib/editorial-content';
import { constructZodiacMetadata } from '@/lib/seo-helpers';
import { homeStructuredData, JsonLd } from '@/lib/structured-data';

// Static export: the homepage is fully prerendered into the HTML. The ?sign=
// deep links are handled client-side in HoroscoopApp and are deliberately
// noindex, so there are no searchParams here.
export const metadata: Metadata = constructZodiacMetadata(undefined, ROUTES.en.home, 'en');

export default function EnglishHomePage() {
  const signs = getHoroscoopData('en').zodiacSigns;

  return (
    <>
      <JsonLd data={homeStructuredData('en')} />

      {/* Interactive checkout; its initial markup is rendered into static HTML. */}
      <HoroscoopApp locale="en" />

      {/* Crawlable static layers below the printer. No JavaScript required. */}
      <div className="bg-zinc-950 text-zinc-100 selection:bg-yellow-400 selection:text-black">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10">
          <section className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-lg md:text-2xl font-mono font-black uppercase text-white mb-4">
              <ReceiptText className="w-5 h-5 text-yellow-400 shrink-0" />
              Why this is not a regular horoscope
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
              <p>
                A classic horoscope runs on the <strong className="text-yellow-400">Barnum effect</strong>:
                vague lines like &ldquo;you&rsquo;re sometimes extroverted, sometimes introverted&rdquo;
                seem personal but fit almost anyone. FunHoroscoop does the opposite. We describe
                behaviour, not personality — and we charge you for it.
              </p>
              <p>
                The result is a <strong className="text-yellow-400">thermal receipt</strong> with
                emotional charges, a fictional total, a barcode and a quality stamp like
                &ldquo;100% TOXIC&rdquo;. No prediction, no advice, no mysticism. Just an affectionate
                settlement of your own behaviour.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
              <Link
                href={ROUTES.en.method}
                className="inline-flex items-center gap-2 bg-yellow-400 text-black font-black uppercase px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300"
              >
                <BookOpen className="w-4 h-4" />
                The anti-Barnum method
              </Link>
              <Link
                href={ROUTES.en.costs}
                className="inline-flex items-center gap-2 bg-zinc-950 text-zinc-100 font-bold uppercase px-4 py-2.5 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-400"
              >
                <ListFilter className="w-4 h-4" />
                The full price list
              </Link>
              <Link
                href={ROUTES.en.guide}
                className="inline-flex items-center gap-2 bg-zinc-950 text-zinc-100 font-bold uppercase px-4 py-2.5 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-400"
              >
                <Printer className="w-4 h-4" />
                How the printer works
              </Link>
            </div>
          </section>

          <section className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            <h2 className="text-lg md:text-2xl font-mono font-black uppercase text-white mb-2">
              Pick your dossier
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              Twelve signs, twelve archetypes, twelve different bills. Every dossier is completely
              static and contains the psychology, the charges and the cosmic life lesson of that
              sign.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {signs.map((sign) => (
                <li key={sign.id}>
                  <Link
                    href={`/en/zodiac/${sign.slug}/`}
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
              Or browse all{' '}
              <Link href={ROUTES.en.compatibility} className="text-yellow-400 font-bold hover:underline">
                78 zodiac combinations
              </Link>{' '}
              — including the shared receipt.
            </p>
          </section>

          <section className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-lg md:text-2xl font-mono font-black uppercase text-white mb-4">
              <CircleHelp className="w-5 h-5 text-yellow-400 shrink-0" />
              Good to know
            </h2>
            <FaqSection
              items={getGlobalFaq('en').slice(0, 6)}
              title="FAQ about the cosmic checkout"
              intro="Privacy, prices, the night lock and the question everyone secretly wants to ask: is this serious?"
              locale="en"
            />
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              More answers? Read{' '}
              <Link href={ROUTES.en.faq} className="text-yellow-400 font-bold hover:underline">
                all frequently asked questions
              </Link>
              .
            </p>
          </section>
        </div>
      </div>

      {/* One footer, after all content — never between checkout and explanation. */}
      <Footer locale="en" />
    </>
  );
}
