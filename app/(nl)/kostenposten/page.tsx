import React from 'react';
import { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowUpRight, ReceiptText } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { EMOTIONAL_COSTS, ZODIAC_SIGNS } from '@/lib/horoscoop-data';
import { GLOBAL_FAQ } from '@/lib/editorial-content';
import { editorialStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Emotionele kostenposten – De volledige prijslijst | FunHoroscoop.nl',
  description:
    'Alle fictieve kostenposten van de kosmische kassa met prijs en bijbehorend sterrenbeeld. Van piekeren om 03:14 tot een fictieve ruzie onder de douche.',
  alternates: localeAlternates('nl', '/kostenposten/'),
};

const PATH = '/kostenposten/';
const COSTS = [...EMOTIONAL_COSTS].sort((a, b) => b.price - a.price);
const FAQ = GLOBAL_FAQ.filter((item) =>
  ['Waarom hebben de kostenposten prijzen?', 'Zijn de horoscopen voorspellingen?'].includes(item.question)
);

function signsFor(description: string): string[] {
  return ZODIAC_SIGNS.filter((sign) => sign.dossier.kostenposten.includes(description)).map(
    (sign) => sign.name
  );
}

function euro(price: number): string {
  return `€ ${price.toFixed(2).replace('.', ',')}`;
}

export default function KostenpostenPage() {
  const totaal = COSTS.reduce((sum, item) => sum + item.price, 0);

  return (
    <EditorialShell
      eyebrow="Kennisbank / Prijslijst"
      title="De volledige prijslijst van emotionele schade"
      subtitle="Elke regel is fictief, elk bedrag is onzin en toch herken je er minstens één. Gesorteerd van duur naar goedkoop."
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Emotionele kostenposten' },
      ]}
      jsonLd={editorialStructuredData({
        title: 'Emotionele kostenposten van FunHoroscoop.nl',
        description: metadata.description as string,
        path: PATH,
        section: 'Prijslijst',
        faq: FAQ,
      })}
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <p className="mb-3">
          De kosmische kassa rekent niet in uren maar in herkenning. Elke kostenpost hieronder komt
          uit de gedeelde prijslijst en duikt op willekeurige plekken op in de bonnen van de twaalf
          sterrenbeelden. Sommige posten zijn favoriet bij één teken, andere gaan rond als een
          groepsapp die niemand durft te verlaten.
        </p>
        <p className="font-mono text-xs text-yellow-400">
          {COSTS.length} kostenposten · totaal {euro(totaal)} als je alles op één bon zou zetten · 0 euro echte schade
        </p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-lg font-mono font-black uppercase text-white mb-4">
          <ReceiptText className="w-5 h-5 text-yellow-400" />
          Kostenposten, duur eerst
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
                    {signs.length ? `Vaak op de bon van: ${signs.join(', ')}` : 'Komt willekeurig langs'}
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
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Zelf een rekening maken</h2>
        <p className="mb-4">
          Elk teken heeft een eigen selectie uit deze lijst. Bekijk het dossier van jouw sterrenbeeld
          om te zien welke posten daar standaard op de bon staan — of print direct een willekeurige
          bon en ontdek wat de kassa vandaag voor je heeft besloten.
        </p>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href="/" className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-black uppercase px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            Print je bon <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/sterrenbeeld/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            Alle 12 dossiers <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <FaqSection items={FAQ} title="Over de prijslijst" />
    </EditorialShell>
  );
}
