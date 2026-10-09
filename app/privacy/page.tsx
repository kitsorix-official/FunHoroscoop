import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Lock, Database, EyeOff, Server, ExternalLink, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacyverklaring – FunHoroscoop.nl',
  description:
    'Lees onze privacyverklaring: 0 cookies, 0 tracking, geen gebruikersdatabase. Uitsluitend lokale functionele opslag conform de AVG en Telecommunicatiewet.',
  alternates: {
    canonical: '/privacy/',
  },
};

export default function PrivacyPage() {
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
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10 font-sans">
          {/* Page Badge & Title */}
          <div className="border-b-2 border-zinc-800 pb-5 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Privacy-First &amp; AVG / Telecommunicatiewet
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              Privacyverklaring FunHoroscoop.nl
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              Laatst bijgewerkt: {currentDate} · Status: Actief
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-zinc-300 leading-relaxed text-sm md:text-base">
            {/* 1. Wie zijn wij? */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">01.</span> Wie zijn wij?
              </h2>
              <p>
                FunHoroscoop.nl is een onafhankelijk, niet-commercieel hobbyproject gemaakt voor vermaak en satire door een particuliere maker (zonder KvK-inschrijving of winstoogmerk).
              </p>
            </section>

            {/* 2. Welke gegevens verzamelen wij NIET? */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">02.</span> Welke gegevens verzamelen wij NIET?
              </h2>
              <p>
                Wij verzamelen geen namen, e-mailadressen, telefoonnummers, exacte geboortedata of betalingsgegevens. Wij hebben geen gebruikersaccounts en houden geen centrale gebruikersdatabase bij.
              </p>
            </section>

            {/* 3. Lokale Opslag & Geen Tracking Cookies */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">03.</span> Lokale Opslag (LocalStorage) &amp; Geen Tracking Cookies
              </h2>
              <p className="mb-3">
                Deze website maakt <strong>geen</strong> gebruik van trackingcookies, marketingcookies of analytische cookies van derden. Wij gebruiken uitsluitend de lokale opslag (<code className="bg-zinc-800 text-yellow-300 px-1.5 py-0.5 rounded-xs font-mono text-xs">localStorage</code>) van uw eigen internetbrowser voor twee puur functionele doeleinden:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-300 font-mono text-xs md:text-sm mb-3">
                <li>Het bijhouden van het dagelijkse limiet (maximaal 3 gegenereerde bonnen per kalenderdag);</li>
                <li>Het controleren van de lokale tijd voor het nachtslot (tussen 20:00 en 07:00 uur).</li>
              </ul>
              <p className="text-xs text-zinc-400 bg-zinc-950 p-3 border border-zinc-800">
                ✦ Deze gegevens verlaten uw apparaat niet en zijn strikt functioneel conform art. 11.7a van de Nederlandse Telecommunicatiewet.
              </p>
            </section>

            {/* 4. Serverlogs & Hosting */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">04.</span> Serverlogs &amp; Hosting
              </h2>
              <p>
                Bij het bezoeken van de website kan onze hostingprovider (Cloudflare Pages) automatisch technische gegevens verwerken in serverlogs (zoals een geanonimiseerd IP-adres, browsertype en tijdstip). Dit gebeurt uitsluitend op basis van een gerechtvaardigd belang voor netwerkbeveiliging en het voorkomen van DDoS-aanvallen.
              </p>
            </section>

            {/* 5. Externe Links & Diensten */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">05.</span> Externe Links &amp; Diensten
              </h2>
              <p>
                Als u contact opneemt via ons Google Formulier, is het privacybeleid van Google van toepassing op die specifieke gegevensverwerking.
              </p>
            </section>

            {/* 6. Vragen over uw privacy? */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">06.</span> Vragen over uw privacy?
              </h2>
              <p className="mb-4">
                Neem gerust contact met ons op via onze contactpagina:
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Naar de Contactpagina ➔</span>
              </Link>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
