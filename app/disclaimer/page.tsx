import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { AlertTriangle, ArrowLeft, Bot, Shield, Coins, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer, Satire & Gebruiksvoorwaarden – FunHoroscoop.nl',
  description:
    'Juridische disclaimer en AI-transparantieverklaring conform de EU AI Act. FunHoroscoop.nl is 100% satirisch entertainment zonder commercieel winstoogmerk.',
  alternates: {
    canonical: '/disclaimer/',
  },
};

export default function DisclaimerPage() {
  const currentDate = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
            <span>Terug naar Kassa</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              FUNHOROSCOOP.NL / JURIDISCH
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10 font-sans">
          {/* Page Badge & Title */}
          <div className="border-b-2 border-zinc-800 pb-5 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <AlertTriangle className="w-3.5 h-3.5" />
              Satire, Entertainment &amp; AI-Transparantie
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              Disclaimer, Satire &amp; Gebruiksvoorwaarden
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              Laatst bijgewerkt: {currentDate} · Status: Actief
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-zinc-300 leading-relaxed text-sm md:text-base">
            {/* 1. Satire & Uitsluitend Entertainment */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">01.</span> Satire &amp; Uitsluitend Entertainment
              </h2>
              <p>
                Alle teksten, voorspellingen, berekeningen, kosmische kassabonnen en artikelen op FunHoroscoop.nl zijn uitsluitend bedoeld voor <strong>humoristische, satirische en recreatieve doeleinden</strong>. Geen enkele uiting op deze website mag worden opgevat als medisch, psychologisch, financieel, astrologisch of juridisch advies. Beslissingen die worden genomen op basis van deze website zijn volledig voor eigen risico van de bezoeker.
              </p>
            </section>

            {/* 2. AI-Transparantie (EU AI Act) */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">02.</span> AI-Transparantie (EU AI Act)
              </h2>
              <p>
                Onderdelen van de teksten, daghoroscopen en dynamische kassabonnen op deze website worden gegenereerd of ondersteund door geautomatiseerde algoritmes en kunstmatige intelligentie (AI). Deze systemen genereren fictieve en satirische content zonder wetenschappelijke grondslag.
              </p>
            </section>

            {/* 3. Geen Kansspelen of Commerciële Diensten */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">03.</span> Geen Kansspelen of Commerciële Diensten
              </h2>
              <p>
                FunHoroscoop.nl biedt geen kansspelen, loot-boxes of betaalde digitale diensten aan. Alle functionaliteiten op de website zijn gratis en voor iedereen toegankelijk binnen de functionele limieten (maximaal 3 prints per dag en een nachtslot tussen 20:00 en 07:00 uur ter bevordering van gezonde schermtijd).
              </p>
            </section>

            {/* 4. Crypto Schenkingen / Fooien */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">04.</span> Crypto Schenkingen / Fooien
              </h2>
              <p>
                Eventuele cryptocurrency-overboekingen naar de op de website getoonde wallet-adressen worden beschouwd als <strong>vrijwillige, eenzijdige schenkingen</strong> (fooien) van particulieren ter ondersteuning van server- en onderhoudskosten. Een schenking geeft geen enkel recht op producten, diensten, accountfuncties of invloed op de website. Schenkingen zijn uitsluitend toegestaan voor personen van 18 jaar en ouder en zijn definitief en onherroepelijk.
              </p>
            </section>

            {/* 5. Intellectueel Eigendom & Delen op Social Media */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">05.</span> Intellectueel Eigendom &amp; Delen op Social Media
              </h2>
              <p>
                Bezoekers hebben uitdrukkelijk toestemming om gegenereerde kassabonnen en screenshots te delen op platforms zoals TikTok, Instagram, YouTube en Reddit voor niet-commercieel gebruik. Het kopiëren of scrapen van de broncode of website-architectuur voor commerciële doeleinden zonder toestemming is verboden.
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
