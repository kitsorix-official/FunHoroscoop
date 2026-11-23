import React from 'react';
import { Metadata } from 'next';
import { formatEuro, localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowUpRight, ReceiptText } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { getGlobalFaq } from '@/lib/editorial-content';
import { getHoroscoopData } from '@/lib/locale-data';
import { editorialStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Emotional Charges – The Full Price List | FunHoroscoop.nl',
  description:
    'Every fictional charge at the cosmic checkout with its price and matching zodiac sign. From pointless rumination at 03:14 to an imaginary argument in the shower.',
  alternates: localeAlternates('en', ROUTES.en.costs),
};

const PATH = ROUTES.en.costs;
const DATA = getHoroscoopData('en');
const COSTS = [...DATA.emotionalCosts].sort((a, b) => b.price - a.price);
const FAQ = getGlobalFaq('en').filter((item) =>
  ['Why do the charges have prices?', 'Are the horoscopes predictions?'].includes(item.question)
);

function signsFor(description: string): string[] {
  return DATA.zodiacSigns.filter((sign) => sign.dossier.kostenposten.includes(description)).map(
    (sign) => sign.name
  );
}

function euro(price: number): string {
  return formatEuro(price, 'en');
}

export default function EmotionalCostsPage() {
  const total = COSTS.reduce((sum, item) => sum + item.price, 0);

  return (
    <EditorialShell
      eyebrow="Knowledge base / Price list"
      title="The full price list of emotional damage"
      subtitle="Every line is fictional, every amount is nonsense, and yet you'll recognise at least one. Sorted from most expensive to cheapest."
      crumbs={[
        { name: 'Home', href: ROUTES.en.home },
        { name: 'Emotional charges' },
      ]}
      jsonLd={editorialStructuredData({
        title: 'Emotional charges of FunHoroscoop.nl',
        description: metadata.description as string,
        path: PATH,
        section: 'Price list',
        faq: FAQ,
      }, 'en')}
      locale="en"
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <p className="mb-3">
          The cosmic checkout doesn&rsquo;t charge by the hour but by recognition. Every charge below comes from the shared price list and turns up in random places on the receipts of the twelve zodiac signs. Some items are favourites of one sign, others circulate like a group chat nobody dares to leave.
        </p>
        <p className="font-mono text-xs text-yellow-400">
          {COSTS.length} charges · total {euro(total)} if you put everything on one receipt · 0 euros of actual damage
        </p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-4">
          <ReceiptText className="w-5 h-5 text-yellow-400" />
          Charges, most expensive first
        </h2>
        <ul className="divide-y-2 divide-zinc-800 border-2 border-zinc-800">
          {COSTS.map((item) => {
            const signs = signsFor(item.description);
            return (
              <li
                key={item.description}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-zinc-950 px-4 py-3"
              >
                <div>
                  <p className="font-mono text-sm text-zinc-200">{item.description}</p>
                  <p className="font-mono text-[11px] text-zinc-500">
                    {signs.length ? `Often on the receipt of: ${signs.join(', ')}` : 'Turns up at random'}
                  </p>
                </div>
                <span className="font-mono font-black text-yellow-400 whitespace-nowrap">
                  {euro(item.price)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Make a bill of your own</h2>
        <p className="mb-4">
          Every sign has its own selection from this list. Open your zodiac sign&rsquo;s dossier to see which charges are standard on its receipt — or print a random receipt straight away and find out what the checkout has decided for you today.
        </p>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href={ROUTES.en.home} className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-black uppercase px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            Print your receipt <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.zodiac} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            All 12 dossiers <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <FaqSection items={FAQ} title="About the price list" locale="en" />
    </EditorialShell>
  );
}
