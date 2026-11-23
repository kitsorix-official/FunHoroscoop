import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { localeAlternates, localizedElementKey, ROUTES } from '@/lib/i18n';
import { allCompatPairs, COMPAT_ELEMENT_ORDER, type CompatPair } from '@/lib/compatibiliteit';
import { hubStructuredData, JsonLd } from '@/lib/structured-data';
import {
  ArrowLeft,
  Heart,
  Flame,
  Mountain,
  Wind,
  Droplets,
  Printer,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zodiac Compatibility – Which signs match? | FunHoroscoop.nl',
  description:
    'All 78 zodiac combinations at a glance: which signs match, which collide and what the cosmic checkout says. Aries & Taurus, Leo & Scorpio and every other match — with scores, roles and a shared receipt.',
  alternates: localeAlternates('en', ROUTES.en.compatibility),
};

const ELEMENT_ICONS: Record<string, React.ElementType> = {
  Vuur: Flame,
  Aarde: Mountain,
  Lucht: Wind,
  Water: Droplets,
};

const ELEMENT_COMBO_INTRO: Record<string, string> = {
  'Vuur-Vuur': 'Two flames, one show: plenty of sparks, no fire extinguisher. The most spectacular receipt at the checkout.',
  'Lucht-Vuur': 'The slam-dunk match: Air gives Fire oxygen and a plan. The best element combination at the checkout.',
  'Aarde-Vuur': 'Handbrake versus accelerator: change against certainty. Produces a receipt full of compromises.',
  'Vuur-Water': 'Light a flame, put it out — steam is the result. Sometimes radiant, sometimes a tantrum in the receipt.',
  'Aarde-Aarde': 'The safest investment at the checkout: everything noted, planned and insured. Boring? Not a bit.',
  'Aarde-Lucht': 'Fifteen life plans against one noted objection. Together they keep each other grounded and awake.',
  'Aarde-Water': 'Builder and deliverer: one puts up the house, the other makes it a home. Rarely this stable.',
  'Lucht-Lucht': 'A conversation that never ends and a plan that never starts. The checkout keeps track of the thread.',
  'Lucht-Water': 'Philosophising and immediately crying over the conclusion. Great at talking things through, short on decisions.',
  'Water-Water': 'Two emotional tsunamis with a periodic calendar. The receipt reads like a novel about the two of you.',
};

export default function EnglishCompatibilityOverviewPage() {
  const pairs = allCompatPairs('en');
  const currentYear = new Date().getFullYear();

  const groups = COMPAT_ELEMENT_ORDER.map((elementKey) => {
    const [elA, elB] = elementKey.split('-');
    const IconA = ELEMENT_ICONS[elA] ?? Wind;
    const IconB = ELEMENT_ICONS[elB] ?? Wind;
    const members = pairs
      .filter((p) => p.elementKey === elementKey)
      .sort((x, y) => y.score - x.score);
    return {
      elementKey,
      elA: localizedElementKey(elA, 'en'),
      elB: localizedElementKey(elB, 'en'),
      IconA,
      IconB,
      members,
      intro: ELEMENT_COMBO_INTRO[elementKey] ?? '',
    };
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      <JsonLd
        data={hubStructuredData(
          'Zodiac compatibility',
          'All 78 zodiac combinations with scores, roles and a shared receipt.',
          ROUTES.en.compatibility,
          pairs.map((p) => ({
            name: `${p.a.name} & ${p.b.name} (${p.score}/100)`,
            url: `/en/compatibility/${p.key}/`,
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
              FUNHOROSCOOP.NL / COMPATIBILITY
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          {/* Title */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Heart className="w-3.5 h-3.5" />
              The Cosmic Checkout / Match directory
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-3">
              Zodiac Compatibility
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Which zodiac signs match — and which collide? The cosmic checkout calculated all 78
              combinations: a receipt score, the dynamic between the elements, each person&rsquo;s role
              in the relationship and one shared receipt. Click a match and see what the printer says
              about that duo.
            </p>
          </div>

          {/* Pillar copy */}
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300 mb-8">
            <p>
              Compatibility is determined by the elements: Fire, Earth, Air and Water. That element
              is built into{' '}
              <Link href={ROUTES.en.zodiac} className="text-yellow-400 font-bold hover:underline">
                every zodiac dossier
              </Link>{' '}
              —{' '}
              <Link href="/en/zodiac/aries/" className="text-yellow-400 font-bold hover:underline">
                Aries
              </Link>{' '}
              and{' '}
              <Link href="/en/zodiac/leo/" className="text-yellow-400 font-bold hover:underline">
                Leo
              </Link>{' '}
              are both Fire, but as the checkout shows: two flames together are spectacular, not
              exactly calming. Air feeds Fire (the best score), Earth keeps Fire grounded and Water
              puts it all out — the numbers below don&rsquo;t lie.
            </p>
            <p>
              App seekers in {currentYear} don&rsquo;t just ask &ldquo;what is my zodiac sign&rdquo;, but also
              &ldquo;do Aries and Taurus match?&rdquo; or &ldquo;which sign match is toxic?&rdquo;. Below are all
              pairs grouped by element combination, with their receipt scores. Remember, as always:
              it&rsquo;s affectionately accusatory satire — the receipt is accurate precisely because it
              isn&rsquo;t about everyone.
            </p>
          </div>

          {/* Per element combination: section + cards */}
          {groups.map((g) => (
            <section key={g.elementKey} className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <g.IconA className="w-5 h-5 text-yellow-400" />
                <span className="text-zinc-600">×</span>
                <g.IconB className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white ml-1">
                  {g.elA} × {g.elB}
                  <span className="text-zinc-500"> ({g.members.length})</span>
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">{g.intro}</p>
              <div className="grid md:grid-cols-2 gap-3">
                {g.members.map((p: CompatPair) => (
                  <Link
                    key={p.key}
                    href={`/en/compatibility/${p.key}/`}
                    className="group border-2 border-zinc-700 bg-zinc-950 hover:bg-zinc-900 hover:border-yellow-400 p-4 transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#facc15] hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 font-mono font-black uppercase text-white">
                          <span className="text-xl">{p.a.symbol}</span>
                          <h3 className="text-base">
                            {p.a.name} & {p.b.name}
                          </h3>
                        </div>
                        <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                          {p.a.element} × {p.b.element} · {p.scoreLabel}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono font-black text-lg text-yellow-400 border-2 border-yellow-400/50 bg-zinc-950 px-2 py-1">
                        {p.score}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-snug mt-3 italic">
                      &ldquo;{p.tagline}&rdquo;
                    </p>
                    <p className="font-mono text-xs text-yellow-400 mt-3 group-hover:underline">
                      See the match of {p.a.name} & {p.b.name} →
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* Closing CTA */}
          <div className="border-t-2 border-zinc-800 pt-6 text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              This page is about pairs, but you&rsquo;re looking for your own receipt. Press the button and
              let the cosmos surprise you:
            </p>
            <Link
              href={ROUTES.en.home}
              className="inline-block font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Printer className="w-4 h-4 inline -mt-0.5" /> Print my receipt now
            </Link>
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Or first dive into{' '}
              <Link href={ROUTES.en.zodiac} className="text-yellow-400 font-bold hover:underline">
                all 12 zodiac signs
              </Link>
              .
            </p>
          </div>
        </article>
      </main>

      <Footer locale="en" />
    </div>
  );
}
