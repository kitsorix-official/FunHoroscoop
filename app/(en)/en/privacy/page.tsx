import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy – FunHoroscoop.nl',
  description:
    'Read our privacy policy: no tracking cookies, no accounts and no personal tracking. Just an anonymous, cookie-free visitor statistic in line with the GDPR and the Dutch Telecommunications Act.',
  alternates: localeAlternates('en', ROUTES.en.privacy),
};

export default function PrivacyPage() {
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
              100% Privacy-First &amp; GDPR / Dutch Telecommunications Act
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              FunHoroscoop.nl Privacy Policy
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              Last updated: {currentDate} · Status: Active
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-zinc-300 leading-relaxed text-sm md:text-base">
            {/* 1. Who are we? */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">01.</span> Who are we?
              </h2>
              <p>
                FunHoroscoop.nl is an independent, non-commercial hobby project made for entertainment
                and satire by a private maker (with no Dutch Chamber of Commerce registration and no
                profit motive).
              </p>
            </section>

            {/* 2. What data do we NOT collect? */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">02.</span> What data do we NOT collect?
              </h2>
              <p>
                We do not collect names, email addresses, phone numbers, exact dates of birth or
                payment details. We have no user accounts and keep no central user database of
                personal data. We do keep an anonymised visitor statistic without cookies, IP
                addresses or visitor IDs; see section 04.
              </p>
            </section>

            {/* 3. Local Storage & No Tracking Cookies */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">03.</span> Local Storage (LocalStorage) &amp; No Tracking Cookies
              </h2>
              <p className="mb-3">
                This website does <strong>not</strong> use tracking cookies, marketing cookies or
                third-party analytics cookies. We only use the local storage (
                <code className="bg-zinc-800 text-yellow-300 px-1.5 py-0.5 rounded-xs font-mono text-xs">localStorage</code>)
                of your own internet browser for three purely functional purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-300 font-mono text-xs md:text-sm mb-3">
                <li>Keeping track of the daily limit (max 3 receipts generated per calendar day);</li>
                <li>Checking the local time for the night lock (between 20:00 and 07:00);</li>
                <li>
                  Remembering your opt-out choice for the anonymous visitor statistic (
                  <code className="bg-zinc-800 text-yellow-300 px-1.5 py-0.5 rounded-xs font-mono text-xs">?admin=1</code>
                  ).
                </li>
              </ul>
              <p className="text-xs text-zinc-400 bg-zinc-950 p-3 border border-zinc-800">
                ✦ This local data never leaves your device and is strictly functional under Article
                11.7a of the Dutch Telecommunications Act.
              </p>
            </section>

            {/* 4. Anonymous visitor statistic (observer) */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">04.</span> Anonymous Visitor Statistic (Observer)
              </h2>
              <p className="mb-3">
                To understand which pages are visited and where visitors come from, FunHoroscoop.nl
                uses its own cookie-free visitor observer. This observer sets no cookies, uses no
                device fingerprinting and assigns no visitor ID. For each page view, only the
                following non-personal data is sent to a Google Apps Script:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-300 font-mono text-xs md:text-sm mb-3">
                <li>the time and date of the visit (according to the server clock);</li>
                <li>the path of the page viewed;</li>
                <li>the visitor type (human, crawler or automation);</li>
                <li>the source (direct, search engine, AI assistant, social media or referral);</li>
                <li>the name of the source (for example Google, Bing or ChatGPT);</li>
                <li>the referrer domain and path, without query parameters or other personal data.</li>
              </ul>
              <p className="mb-3">
                Your IP address is not stored by us. Google may briefly process standard network data
                such as your IP address as part of the technical delivery of the request; this
                happens within Google&rsquo;s infrastructure and is not included in our statistics.
                The statistics are stored in a protected Google Sheet that only the maker can open.
                We use the data solely to see which pages catch on and to improve the website. No
                profiling, advertising targeting or sale of data takes place.
              </p>
              <p>
                The legal basis for this processing is our legitimate interest (Article 6(1)(f)
                GDPR) in measuring and improving the website. Because no cookies or identifiers are
                used, no consent is required. Don&rsquo;t want to be counted? Add{' '}
                <code className="bg-zinc-800 text-yellow-300 px-1.5 py-0.5 rounded-xs font-mono text-xs">?admin=1</code>{' '}
                to the URL. The observer remembers that choice in your{' '}
                <code className="bg-zinc-800 text-yellow-300 px-1.5 py-0.5 rounded-xs font-mono text-xs">localStorage</code>{' '}
                and will no longer count you. This applies per browser and per device.
              </p>
            </section>

            {/* 5. Server logs & Hosting */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">05.</span> Server Logs &amp; Hosting
              </h2>
              <p>
                When visiting the website, our hosting provider (Cloudflare Pages) may automatically
                process technical data in server logs (such as an anonymised IP address, browser type
                and time). This happens solely on the basis of a legitimate interest in network
                security and preventing DDoS attacks.
              </p>
            </section>

            {/* 6. External Links & Services */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">06.</span> External Links &amp; Services
              </h2>
              <p className="mb-3">
                For the anonymous visitor statistic and the contact form we use services from Google
                (Google Apps Script, Google Sheets and Google Forms). Google&rsquo;s privacy policy
                applies to that processing, in addition to this privacy policy.
              </p>
              <p>
                Our website may contain links to external websites. We are not responsible for the
                content or privacy policies of those websites.
              </p>
            </section>

            {/* 7. Your rights */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">07.</span> Your Rights
              </h2>
              <p>
                Under the GDPR you have the right of access, rectification, erasure, restriction of
                processing and objection to processing based on a legitimate interest. Because the
                visitor statistic contains no personal data, individual statistic rows cannot be
                linked to you. You can submit a request via the contact page. You also have the right
                to lodge a complaint with the Dutch Data Protection Authority.
              </p>
            </section>

            {/* 8. Questions about your privacy? */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-zinc-500">08.</span> Questions about your privacy?
              </h2>
              <p className="mb-4">
                Feel free to contact us via our contact page:
              </p>
              <Link
                href={ROUTES.en.contact}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Go to the Contact page ➔</span>
              </Link>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer locale="en" />
    </div>
  );
}
