import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer, Satire & Terms of Use – FunHoroscoop.nl',
  description:
    'Legal disclaimer and AI transparency statement in line with the EU AI Act. FunHoroscoop.nl is 100% satirical entertainment with no commercial profit motive.',
  alternates: localeAlternates('en', ROUTES.en.disclaimer),
};

export default function DisclaimerPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
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
            href={ROUTES.en.home}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to the Checkout</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              FUNHOROSCOOP.NL / LEGAL
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
              Satire, Entertainment &amp; AI Transparency
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              Disclaimer, Satire &amp; Terms of Use
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              Last updated: {currentDate} · Status: Active
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-zinc-300 leading-relaxed text-sm md:text-base">
            {/* 1. Satire & Entertainment Only */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">01.</span> Satire &amp; Entertainment Only
              </h2>
              <p>
                All texts, predictions, calculations, cosmic receipts and articles on
                FunHoroscoop.nl are intended solely for{' '}
                <strong>humorous, satirical and recreational purposes</strong>. No statement on this
                website may be taken as medical, psychological, financial, astrological or legal
                advice. Any decisions made on the basis of this website are entirely at the
                visitor&rsquo;s own risk.
              </p>
            </section>

            {/* 2. AI Transparency (EU AI Act) */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">02.</span> AI Transparency (EU AI Act)
              </h2>
              <p>
                Parts of the texts, daily horoscopes and dynamic receipts on this website are
                generated or supported by automated algorithms and artificial intelligence (AI).
                These systems generate fictional and satirical content with no scientific basis.
              </p>
            </section>

            {/* 3. No Gambling or Commercial Services */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">03.</span> No Gambling or Commercial Services
              </h2>
              <p>
                FunHoroscoop.nl offers no gambling, loot boxes or paid digital services. All features
                on the website are free and accessible to everyone within the functional limits (max
                3 prints per day and a night lock between 20:00 and 07:00 to encourage healthy screen
                time).
              </p>
            </section>

            {/* 4. Crypto Donations / Tips */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">04.</span> Crypto Donations / Tips
              </h2>
              <p>
                Any cryptocurrency transfers to the wallet addresses shown on the website are
                considered <strong>voluntary, one-sided gifts</strong> (tips) from private individuals
                to help cover server and maintenance costs. A donation gives no right whatsoever to
                products, services, account features or influence over the website. Donations are
                only permitted for people aged 18 and over and are final and irrevocable.
              </p>
            </section>

            {/* 5. Intellectual Property & Sharing on Social Media */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">05.</span> Intellectual Property &amp; Sharing on Social Media
              </h2>
              <p>
                Visitors are expressly permitted to share generated receipts and screenshots on
                platforms such as TikTok, Instagram, YouTube and Reddit for non-commercial use.
                Copying or scraping the source code or website architecture for commercial purposes
                without permission is prohibited.
              </p>
            </section>

            {/* 6. Privacy & Anonymous Visitor Statistic */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">06.</span> Privacy &amp; Anonymous Visitor Statistic
              </h2>
              <p>
                FunHoroscoop.nl uses no tracking cookies, accounts or personal profiles. The site does
                keep an anonymous, cookie-free visitor statistic without IP addresses or visitor IDs.
                Exactly what is recorded and how you can opt out is explained in the{' '}
                <Link href={ROUTES.en.privacy} className="text-yellow-400 font-bold hover:underline">
                  privacy policy
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer locale="en" />
    </div>
  );
}
