import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Printer } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { GUIDE_STEPS, GLOBAL_FAQ } from '@/lib/editorial-content';
import { guideStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Handleiding – Zo print en deel je je kassabon | FunHoroscoop.nl',
  description:
    'In zes stappen van sterrenbeeld naar deelbare PNG: kies je teken, print je thermische kassabon, download het plaatje en tag die ene vriend.',
  alternates: { canonical: '/handleiding/' },
};

const FAQ = GLOBAL_FAQ.filter((item) =>
  [
    'Kan ik mijn kassabon bewaren of delen?',
    'Hoe vaak mag ik een bon printen?',
    'Wat is het nachtslot?',
    'Kan ik direct naar één sterrenbeeld linken?',
  ].includes(item.question)
);

export default function HandleidingPage() {
  return (
    <EditorialShell
      eyebrow="Kennisbank / Handleiding"
      title="Zo print en deel je je kassabon"
      subtitle="Zes stappen, geen account, geen printer die vastloopt. Alleen een kassa die weet wat je hebt gedaan."
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Handleiding' },
      ]}
      jsonLd={guideStructuredData(GUIDE_STEPS)}
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <p>
          De printer staat op de homepage. Je hoeft niets in te stellen, niets te installeren en
          niets in te loggen. Kies een teken en druk op de knop — de rest is geluid, papier en
          ongemakkelijke herkenning.
        </p>
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2 bg-yellow-400 text-black font-mono font-black uppercase text-xs px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000]"
        >
          <Printer className="w-4 h-4" /> Naar de kassa
        </Link>
      </section>

      <ol className="space-y-4">
        {GUIDE_STEPS.map((step, index) => (
          <li key={step.title} className="border-l-4 border-yellow-400 pl-4 md:pl-5">
            <h2 className="text-lg font-mono font-black uppercase text-white mb-2">
              <span className="text-zinc-600 mr-2">{String(index + 1).padStart(2, '0')}</span>
              {step.title.replace(/^Stap \d+ — /, '')}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 mb-3">{step.text}</p>
            <p className="font-mono text-[11px] text-yellow-400 bg-zinc-950 border-2 border-zinc-700 px-3 py-2">
              {step.tip}
            </p>
          </li>
        ))}
      </ol>

      <FaqSection items={FAQ} title="Vragen over printen en delen" />

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Meer uit de kassa</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href="/veelgestelde-vragen/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            Alle veelgestelde vragen <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/woordenboek/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            Woordenboek <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/compatibiliteit/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            78 combinaties <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
