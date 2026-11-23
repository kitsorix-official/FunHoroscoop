import React from 'react';
import { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, ListFilter, Sparkles } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { GLOBAL_FAQ, METHOD_SECTIONS } from '@/lib/editorial-content';
import { editorialStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Anti-Barnum-methode – Waarom onze horoscopen wél specifiek zijn | FunHoroscoop.nl',
  description:
    'Het Barnum-effect maakt vage horoscopen geloofwaardig. FunHoroscoop doet het tegenovergestelde: specifiek gedrag, een fictieve prijs en geen advies. Lees de volledige anti-Barnum-methode.',
  alternates: localeAlternates('nl', '/anti-barnum/'),
};

const PATH = '/anti-barnum/';
const FAQ = GLOBAL_FAQ.filter((item) =>
  [
    'Wat is het Barnum-effect en waarom vermijden jullie dat?',
    'Hoe werkt de anti-Barnum-methode?',
    'Zijn de horoscopen voorspellingen?',
    'Waarom hebben de kostenposten prijzen?',
  ].includes(item.question)
);

export default function AntiBarnumPage() {
  return (
    <EditorialShell
      eyebrow="De methode / Anti-Barnum"
      title="Anti-Barnum: de kassa liegt niet, hij is alleen grappig"
      subtitle="Vier zinnen die op iedereen passen, zijn geen horoscoop. Dit is hoe wij van vage vleierij een herkenbare rekening maken."
      crumbs={[
        { name: 'Home', href: '/' },
        { name: 'Anti-Barnum-methode' },
      ]}
      jsonLd={editorialStructuredData({
        title: 'Anti-Barnum-methode van FunHoroscoop.nl',
        description: metadata.description as string,
        path: PATH,
        section: 'Methode',
        faq: FAQ,
      })}
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <h2 className="text-lg font-mono font-black uppercase text-yellow-400 mb-3">
          Het probleem met de klassieke horoscoop
        </h2>
        <p className="mb-3">
          Het <strong className="text-yellow-400">Barnum-effect</strong> is de reden dat vrijwel elke
          horoscoop &ldquo;klopt&rdquo;. Hoe algemener de zin, hoe groter de kans dat iemand hem als
          persoonlijk herkent. &ldquo;Je hebt verborgen talenten&rdquo;, &ldquo;je verlangt naar
          rust&rdquo;, &ldquo;je bent soms ambitieus&rdquo; — wie zegt daar nee tegen?
        </p>
        <p>
          Wij noemen dat geen voorspelling maar een verkooptruc. FunHoroscoop print daarom pas iets
          als het zo specifiek is dat je er om moet lachen of even stil van wordt. Geen streepjes
          die iedereen aan zichzelf plakt, maar regels die alleen op jouw type gedrag van toepassing
          zijn.
        </p>
      </section>

      {METHOD_SECTIONS.map((section) => (
        <section key={section.heading} className="border-l-4 border-yellow-400 pl-4 md:pl-5">
          <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white mb-3">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-3 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="bg-zinc-950 border-2 border-zinc-700 px-4 py-3 font-mono text-xs md:text-sm text-yellow-300">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            {section.example}
          </p>
        </section>
      ))}

      <section className="bg-zinc-950 border-2 border-zinc-700 p-4 md:p-5">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Barnum versus FunHoroscoop</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-mono border-collapse">
            <thead>
              <tr className="text-yellow-400 border-b-2 border-zinc-700">
                <th className="py-2 pr-4">Klassieke horoscoop</th>
                <th className="py-2">Kosmische kassa</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800">
                <td className="py-2 pr-4">&ldquo;Je bent soms verlegen&rdquo;</td>
                <td className="py-2">&ldquo;Bericht getypt, gewist en diep gezucht — € 8,50&rdquo;</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-2 pr-4">Gebaseerd op een stand van de maan</td>
                <td className="py-2">Gebaseerd op een vaste, satirische prijslijst</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-2 pr-4">Geeft levensadvies</td>
                <td className="py-2">Geeft een totaalbedrag en een stempel</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Past op iedereen</td>
                <td className="py-2">Past op precies één type gedrag</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Verder lezen</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href="/woordenboek/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            <BookOpen className="w-4 h-4" /> Woordenboek van de kassa <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/kostenposten/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            <ListFilter className="w-4 h-4" /> Alle emotionele kostenposten <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/sterrenbeeld/" className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            De 12 dossiers <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <FaqSection items={FAQ} title="Vragen over de methode" />
    </EditorialShell>
  );
}
