import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import {
  allCompatPairs,
  COMPAT_ELEMENT_ORDER,
  CompatPair,
} from '@/lib/compatibiliteit';
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
  title: 'Sterrenbeeld Compatibiliteit – Welke tekens matchen? | FunHoroscoop.nl',
  description:
    'Alle 78 sterrenbeeld-combinaties op een rij: welke tekens matchen, welke botsen en wat de kosmische kassa erover zegt. Ram & Stier, Leeuw & Schorpioen, en elke andere match — met scores, rollen en een gezamenlijke bon.',
};

const ELEMENT_ICONS: Record<string, React.ElementType> = {
  Vuur: Flame,
  Aarde: Mountain,
  Lucht: Wind,
  Water: Droplets,
};

const ELEMENT_COMBO_INTRO: Record<string, string> = {
  'Vuur-Vuur': 'Twee vlammen, één show: veel vonken, geen brandblusser. De meest spectaculaire bon van de kassa.',
  'Lucht-Vuur': 'De kla-sleutel-match: Lucht geeft Vuur zuurstof en een plan. De beste element-combinatie van de kassa.',
  'Aarde-Vuur': 'Handrem versus gaspedaal: verandering tegenover zekerheid. Geeft een bon vol compromissen.',
  'Vuur-Water': 'Vlam aansteken en doven — stoom is het resultaat. Soms stralend, soms een rui in de bon.',
  'Aarde-Aarde': 'De veiligste investering van de kassa: alles genoteerd, gepland en verzekerd. Saai? Voor geen meter.',
  'Aarde-Lucht': 'Veertien levensplannen tegenover één genoteerd bezwaar. Samen houden ze elkaar op de grond én wakker.',
  'Aarde-Water': 'Bouwer en bezorger: de ene zet het huis neer, de andere maakt er een thuis van. Zeldzaam stabiel.',
  'Lucht-Lucht': 'Een gesprek dat nooit eindigt en een plan dat nooit start. De kassa houdt de draad erbij.',
  'Lucht-Water': 'Filosoferen en meteen huilen om de conclusie. Mist samen oplossend: besproken, nog niet besloten.',
  'Water-Water': 'Twee emotionele tsunamis met een periodieke kalender. De bon leest als een roman van jullie twee.',
};

export default function CompatibiliteitOverzichtPage() {
  const pairs = allCompatPairs();
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
      elA,
      elB,
      IconA,
      IconB,
      members,
      intro: ELEMENT_COMBO_INTRO[elementKey] ?? '',
    };
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      {/* Top Header Bar */}
      <header className="border-b-4 border-black bg-zinc-900 px-4 py-3 shadow-[0_4px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Terug naar de Kassa</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              FUNHOROSCOOP.NL / COMPATIBILITEIT
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          {/* Titel */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Heart className="w-3.5 h-3.5" />
              De Kosmische Kassa / Match-directory
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-3">
              Sterrenbeeld Compatibiliteit
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Welke sterrenbeelden matchen — en welke botsen? De kosmische kassa heeft alle 78 combinaties
              doorgerekend: een kassabon-score, de dynamiek tussen de elementen, ieders rol in de relatie en één
              gezamenlijke bon. Klik op een match en ontdek wat de printer over dat duo zegt.
            </p>
          </div>

          {/* Pillar-copy */}
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300 mb-8">
            <p>
              Compatibiliteit wordt bepaald door de elementen: Vuur, Aarde, Lucht en Water. In{" "}
              <Link href="/sterrenbeeld/" className="text-yellow-400 font-bold hover:underline">
                elk sterrenbeeld-dossier
              </Link>{" "}
              zit dat element verwerkt —{' '}
              <Link href="/sterrenbeeld/ram/" className="text-yellow-400 font-bold hover:underline">
                de Ram
              </Link>{" "}
              en{' '}
              <Link href="/sterrenbeeld/leeuw/" className="text-yellow-400 font-bold hover:underline">
                de Leeuw
              </Link>{' '}
              zijn beiden Vuur, maar zoals de kassa laat zien: twee vlammen samen is spectaculair, niet per se
              rustgevend. Lucht voedt Vuur (de beste score), Aarde houdt Vuur op de grond en Water blust alles — de
              cijfers hieronder liegen niet.
            </p>
            <p>
              Applicatie-zoekers uit {currentYear} vragen niet alleen &ldquo;wat is mijn sterrenbeeld&rdquo;, maar ook &ldquo;passen Ram en Stier
              bij elkaar?&rdquo; of &ldquo;welke teken-match is toxic?&rdquo;. Hieronder alle paren gesorteerd per element-combinatie,
              met hun kassabon-score. Onthoud zoals altijd: het is liefkozend-verwijtende satire — de bon is accuraat
              precies omdat &lsquo;ie níet over iedereen gaat.
            </p>
          </div>

          {/* Per element-combinatie: sectie + kaartjes */}
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
                    href={`/compatibiliteit/${p.key}/`}
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
                    <p className="text-sm text-zinc-400 leading-snug mt-3 italic">&ldquo;{p.tagline}&rdquo;</p>
                    <p className="font-mono text-xs text-yellow-400 mt-3 group-hover:underline">
                      Bekijk de match van {p.a.name} & {p.b.name} →
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* Afsluitende CTA */}
          <div className="border-t-2 border-zinc-800 pt-6 text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Deze pagina gaat over paren, maar jij zoekt je eigen bon. Druk op de knop en laat de kosmos je verrassen:
            </p>
            <Link
              href="/"
              className="inline-block font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Printer className="w-4 h-4 inline -mt-0.5" /> Print mijn bon nu
            </Link>
            <p className="font-mono text-[11px] text-zinc-500 mt-4">
              Of verdiep je eerst in{' '}
              <Link href="/sterrenbeeld/" className="text-yellow-400 font-bold hover:underline">
                alle 12 sterrenbeelden
              </Link>
              .
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}