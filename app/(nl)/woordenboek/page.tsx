import React from 'react';
import { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n';
import Link from 'next/link';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { GLOSSARY } from '@/lib/editorial-content';
import { glossaryStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Woordenboek van de Kosmische Kassa – 24 termen uitgelegd | FunHoroscoop.nl',
  description:
    'Van Barnum-effect tot thermisch quotum: alle termen van FunHoroscoop.nl in graveerbare kassataal uitgelegd, met voorbeelden uit de bon.',
  alternates: localeAlternates('nl', '/woordenboek/'),
};

const TERMS = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, 'nl'));

function anchor(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function WoordenboekPage() {
  return (
    <EditorialShell
      eyebrow="Kennisbank / Woordenboek"
      title="Woordenboek van de Kosmische Kassa"
      subtitle="Vierentwintig termen die je nodig hebt om een bon te lezen zonder dat de kassier erbij komt staan."
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Woordenboek' },
      ]}
      jsonLd={glossaryStructuredData(TERMS)}
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <p>
          Een kassabon heeft zijn eigen taal. Wij hebben die taal geleend van de thermische printer,
          doordrenkt met sarcasme en vervolgens van een woordenlijst voorzien. Hieronder vind je elke
          term die op de bon, in een dossier of op een compatibiliteitspagina opduikt — inclusief een
          voorbeeld zodat je hem meteen herkent.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-3">
        {TERMS.map((item) => (
          <section
            key={item.term}
            id={anchor(item.term)}
            className="bg-zinc-950 border-2 border-zinc-700 p-4 scroll-mt-6"
          >
            <h2 className="flex items-center gap-2 font-mono font-black uppercase text-sm text-yellow-400 mb-2">
              <BookOpen className="w-4 h-4 shrink-0" />
              {item.term}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 mb-3">{item.definition}</p>
            <p className="font-mono text-[11px] text-zinc-500 border-t border-zinc-800 pt-2">
              {item.example}
            </p>
          </section>
        ))}
      </div>

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Waar begint de kassa?</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href="/anti-barnum/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            De anti-Barnum-methode <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/kostenposten/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            De prijslijst <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/veelgestelde-vragen/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            Veelgestelde vragen <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
