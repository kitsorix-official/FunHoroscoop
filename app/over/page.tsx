import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import {
  ArrowLeft,
  ReceiptText,
  Sparkles,
  Brain,
  Printer,
  ShieldAlert,
  User,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over FunHoroscoop.nl – De Kosmische Kassa | 100% Satire & Entertainment',
  description:
    'Wat is FunHoroscoop.nl? Ontdek de anti-Barnum aanpak, hoe de thermische kassabon werkt, de guardrails (0 cookies, nachtslot, quotum) en wie erachter zit. 100% satire, geen cookies, geen tracking.',
  alternates: {
    canonical: '/over/',
  },
};

export default function OverPage() {
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
              FUNHOROSCOOP.NL / OVER ONS
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          {/* Page Badge & Title */}
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ReceiptText className="w-3.5 h-3.5" />
              De Kosmische Kassa / Over Ons
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              Over FunHoroscoop.nl
            </h1>
            <p className="font-mono text-xs md:text-sm text-zinc-400">
              Satirische kosmische kassabonnen · 100% entertainment · 0% zweverigheid
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-zinc-300 leading-relaxed text-sm md:text-base">
            {/* 01. Wat is FunHoroscoop.nl */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">01.</span> Wat is FunHoroscoop.nl?
              </h2>
              <p className="mb-3">
                FunHoroscoop.nl is een satirische Nederlandse webapp die het Barnum-effect van de
                klassieke horoscoop uit elkaar trekt. In plaats van vage vleierij die op iedereen past,
                print je een thermische kassabon vol emotionele kostenposten en rake observaties over
                jouw sterrenbeeld. Geen voorspelling — een liefkozende afrekening.
              </p>
              <p>
                De toon is hard, de bedoeling is warm: je mag jezelf herkennen, niet somberen. Alles
                hier is 100% satire en entertainment — niets heeft de ambitie om waar te zijn.
              </p>
            </section>

            {/* 02. De anti-Barnum-aanpak */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">02.</span> De anti-Barnum-aanpak
              </h2>
              <p className="mb-3">
                Klassieke horoscopen draaien op het Barnum-effect (of Forer-effect): algemene
                uitspraken die op vrijwel iedereen van toepassing lijken — &ldquo;je bent soms
                extravert, maar hecht ook aan rust&rdquo; — voelen persoonlijk aan, maar zijn dat
                niet.
              </p>
              <p>
                FunHoroscoop draait dat om. Elke bon is specifiek genoeg om <em>niet</em> over
                iedereen te kunnen gaan. Neem{' '}
                <Link href="/sterrenbeeld/ram/" className="text-yellow-400 font-bold hover:underline">
                  de Ram
                </Link>{' '}
                met zijn brandende enthousiasme, of{' '}
                <Link href="/sterrenbeeld/maagd/" className="text-yellow-400 font-bold hover:underline">
                  de Maagd
                </Link>{' '}
                die de vaatwasser als persoonlijke aanval ziet: dat klinkt pijnlijk accuraat precies
                omdat het niet universeel is. Dat is de grap — en de punt.
              </p>
            </section>

            {/* 03. Hoe werkt de Kassa */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Printer className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">03.</span> Hoe werkt de Kassa?
              </h2>
              <p className="mb-3">
                Je kiest je teken (of laat de kosmos de keuze maken), en de thermische printer ratelt
                je bon af: emotionele kostenposten met prijzen, een bijpassend archetype, een
                coping-mechanisme, een scheve kwaliteitsstempel, een barcode en het vertrouwde
                printgeluid.
              </p>
              <p>
                Daarna exporteer je de bon in één tik als afbeelding — formaat-klaar voor Insta
                Stories, TikTok en WhatsApp. Alles gebeurt lokaal in je browser: er wordt niets
                verzonden, niets opgeslagen en niets bijgehouden.
              </p>
            </section>

            {/* 04. Guardrails & Verantwoordelijkheid */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">04.</span> Guardrails &amp; Verantwoordelijkheid
              </h2>
              <div className="border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs md:text-sm text-zinc-400 mb-4 space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-yellow-400 font-black">✦</span>
                  <span>
                    <strong className="text-zinc-200">0 cookies, 0 tracking, 0 accounts</strong> —
                    volledig anoniem en privacy-first.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-400 font-black">✦</span>
                  <span>
                    <strong className="text-zinc-200">Nachtslot:</strong> tussen 20:00 en 07:00
                    slapen de planeten en is de kassa gesloten.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-400 font-black">✦</span>
                  <span>
                    <strong className="text-zinc-200">Dagelijks quotum:</strong> maximaal 3 bonnen
                    per dag — ook thermische kassa&rsquo;s hebben pauze nodig.
                  </span>
                </p>
              </div>
              <p>
                Deze guardrails zijn geen marketing. Satire rond zelfinzicht moet laagdrempelig
                blijven zonder opdringerig te worden — en we staan alvast klaar voor een eventuele EU
                anti-verslavingsrichtlijn. Wat er wél en niet wordt opgeslagen lees je in de{' '}
                <Link href="/privacy" className="text-yellow-400 font-bold hover:underline">
                  privacyverklaring
                </Link>
                .
              </p>
            </section>

            {/* 05. Wie zit erachter */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">05.</span> Wie zit erachter?
              </h2>
              <p className="mb-3">
                FunHoroscoop.nl is een onafhankelijk, niet-commercieel hobbyproject van een
                particuliere maker — zonder KvK-inschrijving of winstoogmerk. Aangedreven door een
                overdreven liefde voor kassabonnen en een gezonde afkeer van astrologie-hype.
              </p>
              <p>
                Suggesties, bugs of Notice &amp; Takedown-meldingen? Ga naar de{' '}
                <Link href="/contact" className="text-yellow-400 font-bold hover:underline">
                  contactpagina
                </Link>
                .
              </p>
            </section>

            {/* 06. De 12 sterrenbeelden */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">06.</span> De 12 sterrenbeelden
              </h2>
              <p className="mb-3">
                Van de{' '}
                <Link href="/sterrenbeeld/ram/" className="text-yellow-400 font-bold hover:underline">
                  Roekeloze Brandstichter
                </Link>{' '}
                tot de{' '}
                <Link href="/sterrenbeeld/vissen/" className="text-yellow-400 font-bold hover:underline">
                  Delusionale Dagdromer
                </Link>
                : elk teken heeft een eigen dossier met archetype, emotionele kostenposten en één
                kosmische levensles. Blader door alle 12 tekens in de{' '}
                <Link href="/sterrenbeeld/" className="text-yellow-400 font-bold hover:underline">
                  horoscoop-directory
                </Link>
                , of klik direct door naar een paar klassiekers:{' '}
                <Link href="/sterrenbeeld/leeuw/" className="text-yellow-400 font-bold hover:underline">
                  Leeuw
                </Link>
                ,{' '}
                <Link href="/sterrenbeeld/weegschaal/" className="text-yellow-400 font-bold hover:underline">
                  Weegschaal
                </Link>{' '}
                en{' '}
                <Link href="/sterrenbeeld/boogschutter/" className="text-yellow-400 font-bold hover:underline">
                  Boogschutter
                </Link>
                .
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="border-t-2 border-zinc-800 pt-6 text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Genoeg achtergrond — tijd om de kosmos voor je uit te laten rekenen wat je écht kost.
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

      {/* Footer */}
      <Footer />
    </div>
  );
}