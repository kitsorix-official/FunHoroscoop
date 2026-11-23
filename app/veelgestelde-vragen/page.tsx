import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { GLOBAL_FAQ } from '@/lib/editorial-content';
import { editorialStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Veelgestelde vragen – Alles over de kosmische kassa | FunHoroscoop.nl',
  description:
    'Hoe werkt de anti-Barnum kassabon? Wat gebeurt er met je gegevens? Waarom 78 compatibiliteitspagina’s? Alle veelgestelde vragen over FunHoroscoop.nl beantwoord.',
  alternates: { canonical: '/veelgestelde-vragen/' },
};

const PATH = '/veelgestelde-vragen/';

export default function VeelgesteldeVragenPage() {
  return (
    <EditorialShell
      eyebrow="Kennisbank / FAQ"
      title="Veelgestelde vragen over de kosmische kassa"
      subtitle="Privacy, satire, prijzen en printable wrede eerlijkheid. Korte antwoorden, geen sterrenwichelarij."
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Veelgestelde vragen' },
      ]}
      jsonLd={editorialStructuredData({
        title: 'Veelgestelde vragen over FunHoroscoop.nl',
        description: metadata.description as string,
        path: PATH,
        section: 'FAQ',
        faq: GLOBAL_FAQ,
      })}
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <p>
          De vragen die het vaakst binnenkomen, op één plek. Staat je vraag er niet tussen? Kijk in het{' '}
          <Link href="/woordenboek/" className="text-yellow-400 font-bold hover:underline">
            woordenboek
          </Link>{' '}
          voor de termen van de kassa of neem contact op via de{' '}
          <Link href="/contact/" className="text-yellow-400 font-bold hover:underline">
            contactpagina
          </Link>
          .
        </p>
      </section>

      <FaqSection
        items={GLOBAL_FAQ}
        title="Alle antwoorden op een rij"
        intro="Deze antwoorden zijn ook als FAQPage-structuur beschikbaar voor zoekmachines en AI-assistenten."
      />

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Verder met de kassa</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href="/handleiding/" className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-black uppercase px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            Zo print en deel je een bon <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/anti-barnum/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            De methode <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/sterrenbeeld/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            De 12 dossiers <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
