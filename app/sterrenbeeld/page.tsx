import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ZODIAC_SIGNS, ZodiacSign } from '@/lib/horoscoop-data';
import { constructZodiacMetadata } from '@/lib/seo-helpers';
import { ArrowLeft, ReceiptText, Flame, Droplets, Wind, Mountain, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  ...constructZodiacMetadata(undefined, '/sterrenbeeld/'),
  title: 'Alle 12 Sterrenbeelden – Satirische Kosmische Kassabonnen | FunHoroscoop.nl',
  description:
    'Alle sterrenbeelden op een rij: van Ram tot Vissen. Ontdek per teken het archetype, de rake anti-Barnum-roast, emotionele kostenposten en de kosmische levensles — en print je eigen kassabon.',
};

const ELEMENT_META: Record<string, { label: string; icon: React.ElementType; intro: string }> = {
  Vuur: {
    label: 'Vuurtekens',
    icon: Flame,
    intro:
      'Vuurtekens denken in actie en branden snel op. Ze beginnen enthousiast, vergeten de brandblusser en noemen de rook later "karakter".',
  },
  Aarde: {
    label: 'Aardetekens',
    icon: Mountain,
    intro:
      'Aardetekens bouwen, stabiliseren en weigeren te bewegen. Hun bon is een jaarrapport: alles genoteerd, weinig geleefd, nergens spijt van — behalve van die ene stoel.',
  },
  Lucht: {
    label: 'Luchttekens',
    icon: Wind,
    intro:
      'Luchttekens denken, filosoferen en besluiten zelden. Ze wegen alle opties af tot de tosti de enige veilige keuze blijkt.',
  },
  Water: {
    label: 'Watertekens',
    icon: Droplets,
    intro:
      'Watertekens voelen alles en slaan te veel op. Hun kassabon is geen bon maar een archiveersysteem met abonnementskosten.',
  },
};

export default function SterrenbeeldOverzichtPage() {
  const elementOrder = ['Vuur', 'Aarde', 'Lucht', 'Water'] as const;

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
              FUNHOROSCOOP.NL / HOROSCOOP-DIRECTORY
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
              De Kosmische Kassa / Directory
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-3">
              Alle 12 Sterrenbeelden
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              FunHoroscoop.nl print voor elk teken een rake, anti-Barnum kassabon: geen vage vleierij, maar emotionele
              kostenposten, een ongezouten archetype en één kosmische levensles. Kies je teken, print je bon en deel hem
              met de vriend die dit exact is.
            </p>
          </div>

          {/* Inleidende pillar-copy met contextuele links */}
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300 mb-8">
            <p>
              Elke horoscoop op deze site is het tegenovergestelde van een Barnum-horoscoop: in plaats van uitspraken
              die op iedereen van toepassing lijken, zoals{' '}
              <Link href="/sterrenbeeld/ram/" className="text-yellow-400 font-bold hover:underline">
                de Ram
              </Link>{' '}
              die alles op 200% doet, of{' '}
              <Link href="/sterrenbeeld/maagd/" className="text-yellow-400 font-bold hover:underline">
                de Maagd
              </Link>{' '}
              die de vaatwasser als persoonlijke aanval ziet, krijg je specifieke, liefkozend-verwijtende rake
              observaties. De bedoeling is niet kwetsen maar herkennen: je bon is pijnlijk accuraat precies omdat hij
              níet over iedereen kan gaan.
            </p>
            <p>
              Per teken vind je een eigen pagina met het archetype, de thermische kassabon met emotionele kostenposten,
              wat jouw bon over je onthult en een kosmische levensles. Klik gewoon op je eigen teken hieronder — of laat
              de kosmos je verrassen door{' '}
              <Link href="/" className="text-yellow-400 font-bold hover:underline">
                direct naar de kassa
              </Link>{' '}
              te gaan en een bon te trekken.
            </p>
            <div className="flex items-start gap-2 text-xs font-mono text-zinc-500 border border-zinc-800 bg-zinc-950 p-3">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Guardrails: volledig anoniem (0 cookies, 0 tracking), een nachtslot op de printer (20:00–07:00) en een
                dagelijks quotum van 3 prints per dag.
              </span>
            </div>
          </div>

          {/* Per element: sectie + contextuele link + kaartjes */}
          {elementOrder.map((element) => {
            const meta = ELEMENT_META[element];
            const Icon = meta.icon;
            const signs = ZODIAC_SIGNS.filter((s) => s.element === element);
            const first = signs[0];
            return (
              <section key={element} className="mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white">
                    {meta.label} <span className="text-zinc-500">({signs.map((s) => s.name).join(' · ')})</span>
                  </h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{meta.intro}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {signs.map((sign: ZodiacSign) => (
                    <Link
                      key={sign.id}
                      href={`/sterrenbeeld/${sign.slug}/`}
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
                            START HIER
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 leading-snug mt-3 italic">&ldquo;{sign.roast}&rdquo;</p>
                      <p className="font-mono text-xs text-yellow-400 mt-3 group-hover:underline">
                        Bekijk de {sign.name}-kassabon →
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Afsluitende CTA */}
          <div className="border-t-2 border-zinc-800 pt-6 text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Twijfel je over je element? Twijfel is ook een sterrenbeeld —{' '}
              <Link href="/sterrenbeeld/weegschaal/" className="text-yellow-400 font-bold hover:underline">
                de Weegschaal
              </Link>{' '}
              herkent het. Of druk gewoon op de knop:
            </p>
            <Link
              href="/"
              className="inline-block font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              🖨️ Print mijn bon nu
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}