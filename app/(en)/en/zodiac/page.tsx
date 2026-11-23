import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ROUTES } from '@/lib/i18n';
import { getHoroscoopData, type ZodiacSign } from '@/lib/locale-data';
import { constructZodiacMetadata } from '@/lib/seo-helpers';
import { hubStructuredData, JsonLd } from '@/lib/structured-data';
import { ArrowLeft, ReceiptText, Flame, Droplets, Wind, Mountain, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  ...constructZodiacMetadata(undefined, ROUTES.en.zodiac, 'en'),
  title: 'All 12 Zodiac Signs – Satirical Cosmic Receipts | FunHoroscoop.nl',
  description:
    'Every zodiac sign at a glance: from Aries to Pisces. Discover each sign’s archetype, sharp anti-Barnum roast, emotional charges and cosmic life lesson — then print your own receipt.',
};

const ELEMENT_META: Record<string, { label: string; icon: React.ElementType; intro: string }> = {
  Fire: {
    label: 'Fire signs',
    icon: Flame,
    intro:
      'Fire signs think in action and burn out fast. They start enthusiastic, forget the fire extinguisher and later call the smoke “character”.',
  },
  Earth: {
    label: 'Earth signs',
    icon: Mountain,
    intro:
      'Earth signs build, stabilise and refuse to move. Their receipt is an annual report: everything noted, little lived, no regrets — except about that one chair.',
  },
  Air: {
    label: 'Air signs',
    icon: Wind,
    intro:
      'Air signs think, philosophise and rarely decide. They weigh every option until the toast turns out to be the only safe choice.',
  },
  Water: {
    label: 'Water signs',
    icon: Droplets,
    intro:
      'Water signs feel everything and store too much of it. Their receipt isn’t a receipt but an archive system with a subscription fee.',
  },
};

export default function EnglishZodiacOverviewPage() {
  const signs = getHoroscoopData('en').zodiacSigns;
  const elementOrder = ['Fire', 'Earth', 'Air', 'Water'] as const;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      <JsonLd
        data={hubStructuredData(
          'All 12 zodiac signs',
          'Every zodiac sign at a glance: archetype, anti-Barnum roast, emotional charges and cosmic life lesson.',
          ROUTES.en.zodiac,
          signs.map((sign) => ({
            name: `${sign.name} — ${sign.archetype}`,
            url: `/en/zodiac/${sign.slug}/`,
          })),
          'en'
        )}
      />

      {/* Top Header Bar */}
      <header className="border-b-4 border-black bg-zinc-900 px-4 py-3 shadow-[0_4px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono">
          <Link
            href={ROUTES.en.home}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to the checkout</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              FUNHOROSCOOP.NL / HOROSCOPE DIRECTORY
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          {/* Title */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ReceiptText className="w-3.5 h-3.5" />
              The Cosmic Checkout / Directory
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-3">
              All 12 Zodiac Signs
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              FunHoroscoop.nl prints a sharp, anti-Barnum receipt for every sign: no vague flattery,
              but emotional charges, an unfiltered archetype and one cosmic life lesson. Choose your
              sign, print your receipt and share it with the friend who is exactly this.
            </p>
          </div>

          {/* Introductory pillar copy with contextual links */}
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300 mb-8">
            <p>
              Every horoscope on this site is the opposite of a Barnum horoscope: instead of lines
              that seem to apply to everyone, such as{' '}
              <Link href="/en/zodiac/aries/" className="text-yellow-400 font-bold hover:underline">
                Aries
              </Link>{' '}
              doing everything at 200%, or{' '}
              <Link href="/en/zodiac/virgo/" className="text-yellow-400 font-bold hover:underline">
                Virgo
              </Link>{' '}
              treating the dishwasher as a personal attack, you get specific, affectionately
              accusatory observations. The point isn&rsquo;t to hurt but to be recognised: your receipt
              is painfully accurate precisely because it cannot be about everyone.
            </p>
            <p>
              Each sign has its own page with the archetype, the thermal receipt full of emotional
              charges, what your receipt reveals about you and a cosmic life lesson. Just click your
              own sign below — or let the cosmos surprise you by{' '}
              <Link href={ROUTES.en.home} className="text-yellow-400 font-bold hover:underline">
                going straight to the checkout
              </Link>{' '}
              and pulling a receipt. Curious which signs match — or collide? The cosmic checkout
              worked through all{' '}
              <Link href={ROUTES.en.compatibility} className="text-yellow-400 font-bold hover:underline">
                78 zodiac combinations
              </Link>
              .
            </p>
            <div className="flex items-start gap-2 text-xs font-mono text-zinc-500 border border-zinc-800 bg-zinc-950 p-3">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Guardrails: no cookies, no accounts and no personal tracking (only anonymous visitor
                statistics), a night lock on the printer (20:00–07:00) and a daily quota of 3 prints
                per day.
              </span>
            </div>
          </div>

          {/* Per element: section + contextual link + cards */}
          {elementOrder.map((element) => {
            const meta = ELEMENT_META[element];
            const Icon = meta.icon;
            const elementSigns = signs.filter((s) => s.element === element);
            const first = elementSigns[0];
            return (
              <section key={element} className="mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white">
                    {meta.label}{' '}
                    <span className="text-zinc-500">
                      ({elementSigns.map((s) => s.name).join(' · ')})
                    </span>
                  </h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{meta.intro}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {elementSigns.map((sign: ZodiacSign) => (
                    <Link
                      key={sign.id}
                      href={`/en/zodiac/${sign.slug}/`}
                      className="group border-2 border-zinc-700 bg-zinc-950 hover:bg-zinc-900 hover:border-yellow-400 p-4 transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#facc15] hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 font-mono font-black uppercase text-white">
                            <span className="text-xl">{sign.symbol}</span>
                            <h3 className="text-base">{sign.name}</h3>
                          </div>
                          <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                            {sign.period} · {sign.archetype}
                          </p>
                        </div>
                        {sign.id === first.id && (
                          <span className="shrink-0 text-[10px] font-mono font-black bg-yellow-400 text-black px-1.5 py-0.5 border border-black">
                            START HERE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 leading-snug mt-3 italic">
                        &ldquo;{sign.roast}&rdquo;
                      </p>
                      <p className="font-mono text-xs text-yellow-400 mt-3 group-hover:underline">
                        See the {sign.name} receipt →
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Closing CTA */}
          <div className="border-t-2 border-zinc-800 pt-6 text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Unsure about your element? Uncertainty is also a zodiac sign —{' '}
              <Link href="/en/zodiac/libra/" className="text-yellow-400 font-bold hover:underline">
                Libra
              </Link>{' '}
              recognises it. Or just press the button:
            </p>
            <Link
              href={ROUTES.en.home}
              className="inline-block font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              🖨️ Print my receipt now
            </Link>
          </div>
        </article>
      </main>

      <Footer locale="en" />
    </div>
  );
}
