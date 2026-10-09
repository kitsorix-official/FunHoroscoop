import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Mail, ArrowLeft, ExternalLink, ShieldCheck, Bug, Scale, HelpCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Colofon – FunHoroscoop.nl',
  description:
    'Neem contact op met FunHoroscoop.nl voor technische bugs, privacyvragen of Notice & Takedown meldingen conform de EU Digital Services Act (DSA).',
  alternates: {
    canonical: '/contact/',
  },
};

export default function ContactPage() {
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
              FUNHOROSCOOP.NL / CONTACT
            </span>
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10 font-sans">
          {/* Page Badge & Title */}
          <div className="border-b-2 border-zinc-800 pb-5 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Mail className="w-3.5 h-3.5" />
              Correspondentie &amp; Colofon
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              Contact &amp; Colofon
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              Onafhankelijk, niet-commercieel hobbyproject
            </p>
          </div>

          {/* Description */}
          <div className="space-y-6 text-zinc-300 leading-relaxed text-sm md:text-base">
            <div className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <p className="leading-relaxed">
                FunHoroscoop.nl is een onafhankelijk hobbyproject. Om spam en openbare blootstelling van privégegevens te voorkomen, behandelen wij alle correspondentie via ons beveiligde Google Formulier.
              </p>
            </div>

            {/* Waarvoor kun je contact opnemen? */}
            <div className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-base md:text-lg font-mono font-black uppercase text-yellow-400 mb-3 flex items-center gap-2">
                Waarvoor kun je contact opnemen?
              </h2>

              <ul className="space-y-2.5 font-mono text-xs md:text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <Bug className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>Technische fouten of bugs melden;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>
                    Meldingen over auteursrecht of content (Notice &amp; Takedown conform de EU Digital Services Act);
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Vragen over privacy of samenwerkingen.</span>
                </li>
              </ul>
            </div>

            {/* Actieknop (Grote Neo-Brutalist Call to Action) */}
            <div className="py-4 text-center">
              <a
                href="https://forms.google.com/your-form-id-here"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-black text-sm md:text-base uppercase border-4 border-black shadow-[5px_5px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                <span>📝 Open het Contactformulier (Google Form) ➔</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <div className="text-[11px] font-mono text-zinc-500 mt-2">
                (Opent veilig in een nieuw tabblad via Google Forms)
              </div>
            </div>

            {/* Reactietijd */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-xs font-mono text-zinc-400">
                <strong className="text-zinc-200 uppercase block mb-0.5">Reactietijd:</strong>
                Wij streven ernaar om gegronde meldingen en vragen binnen 5 tot 7 werkdagen te beoordelen.
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
