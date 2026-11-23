import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
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
  title: 'About FunHoroscoop.nl – The Cosmic Checkout | 100% Satire & Entertainment',
  description:
    'What is FunHoroscoop.nl? Discover the anti-Barnum approach, how the thermal receipt works, our guardrails (0 cookies, night lock, quota) and who is behind it. 100% satire, no cookies, no personal tracking.',
  alternates: localeAlternates('en', ROUTES.en.about),
};

export default function AboutPage() {
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
              FUNHOROSCOOP.NL / ABOUT US
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
              The Cosmic Checkout / About Us
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              About FunHoroscoop.nl
            </h1>
            <p className="font-mono text-xs md:text-sm text-zinc-400">
              Satirical cosmic receipts · 100% entertainment · 0% woo-woo
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-zinc-300 leading-relaxed text-sm md:text-base">
            {/* 01. What is FunHoroscoop.nl */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">01.</span> What is FunHoroscoop.nl?
              </h2>
              <p className="mb-3">
                FunHoroscoop.nl is a satirical Dutch web app that takes the Barnum effect of the
                classic horoscope apart. Instead of vague flattery that fits everyone, you print a
                thermal receipt full of emotional charges and spot-on observations about your zodiac
                sign. No prediction — an affectionate settlement.
              </p>
              <p>
                The tone is harsh, the intention is warm: you may recognise yourself, not feel down.
                Everything here is 100% satire and entertainment — nothing aspires to be true.
              </p>
            </section>

            {/* 02. The anti-Barnum approach */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">02.</span> The anti-Barnum approach
              </h2>
              <p className="mb-3">
                Classic horoscopes run on the Barnum effect (or Forer effect): general statements
                that seem to apply to almost everyone — &ldquo;you&rsquo;re sometimes extroverted,
                but you also value your quiet time&rdquo; — feel personal, but aren&rsquo;t.
              </p>
              <p>
                FunHoroscoop flips that. Every receipt is specific enough that it <em>cannot</em> be
                about everyone. Take{' '}
                <Link href="/en/zodiac/aries/" className="text-yellow-400 font-bold hover:underline">
                  Aries
                </Link>{' '}
                with their burning enthusiasm, or{' '}
                <Link href="/en/zodiac/virgo/" className="text-yellow-400 font-bold hover:underline">
                  Virgo
                </Link>{' '}
                treating the dishwasher as a personal attack: it sounds painfully accurate precisely
                because it isn&rsquo;t universal. That&rsquo;s the joke — and the point.
              </p>
            </section>

            {/* 03. How does the Checkout work */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Printer className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">03.</span> How does the Checkout work?
              </h2>
              <p className="mb-3">
                You pick your sign (or let the cosmos decide), and the thermal printer rattles off
                your receipt: emotional charges with prices, a matching archetype, a coping
                mechanism, a crooked quality stamp, a barcode and the familiar print sound.
              </p>
              <p>
                Then export the receipt as an image in one tap — ready for Instagram Stories, TikTok
                and WhatsApp. Everything happens locally in your browser: nothing is sent, nothing
                is stored and nothing is tracked.
              </p>
            </section>

            {/* 04. Guardrails & Responsibility */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">04.</span> Guardrails &amp; Responsibility
              </h2>
              <div className="border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs md:text-sm text-zinc-400 mb-4 space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-yellow-400 font-black">✦</span>
                  <span>
                    <strong className="text-zinc-200">0 cookies, 0 accounts, no personal tracking</strong> —
                    but an anonymous, cookie-free visitor statistic.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-400 font-black">✦</span>
                  <span>
                    <strong className="text-zinc-200">Night lock:</strong> between 20:00 and 07:00
                    the planets sleep and the checkout is closed.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-yellow-400 font-black">✦</span>
                  <span>
                    <strong className="text-zinc-200">Daily quota:</strong> max 3 receipts per day —
                    even thermal cash registers need a break.
                  </span>
                </p>
              </div>
              <p>
                These guardrails aren&rsquo;t marketing. Satire about self-awareness should stay easy
                to reach without becoming pushy — and we&rsquo;re already ready for a possible EU
                anti-addiction directive. What is and isn&rsquo;t stored is explained in the{' '}
                <Link href={ROUTES.en.privacy} className="text-yellow-400 font-bold hover:underline">
                  privacy policy
                </Link>
                .
              </p>
            </section>

            {/* 05. Who is behind it */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">05.</span> Who is behind it?
              </h2>
              <p className="mb-3">
                FunHoroscoop.nl is an independent, non-commercial hobby project by a private maker —
                with no Dutch Chamber of Commerce registration and no profit motive. Powered by an
                excessive love of receipts and a healthy dislike of astrology hype.
              </p>
              <p>
                Suggestions, bugs or Notice &amp; Takedown requests? Head to the{' '}
                <Link href={ROUTES.en.contact} className="text-yellow-400 font-bold hover:underline">
                  contact page
                </Link>
                .
              </p>
            </section>

            {/* 06. The 12 zodiac signs */}
            <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-mono font-black uppercase text-yellow-400 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 shrink-0" />
                <span className="text-zinc-500">06.</span> The 12 zodiac signs
              </h2>
              <p className="mb-3">
                From the{' '}
                <Link href="/en/zodiac/aries/" className="text-yellow-400 font-bold hover:underline">
                  Reckless Arsonist
                </Link>{' '}
                to the{' '}
                <Link href="/en/zodiac/pisces/" className="text-yellow-400 font-bold hover:underline">
                  Delusional Daydreamer
                </Link>
                : every sign has its own dossier with an archetype, emotional charges and one cosmic
                life lesson. Browse all 12 signs in the{' '}
                <Link href={ROUTES.en.zodiac} className="text-yellow-400 font-bold hover:underline">
                  horoscope directory
                </Link>
                , or jump straight to a few classics:{' '}
                <Link href="/en/zodiac/leo/" className="text-yellow-400 font-bold hover:underline">
                  Leo
                </Link>
                ,{' '}
                <Link href="/en/zodiac/libra/" className="text-yellow-400 font-bold hover:underline">
                  Libra
                </Link>{' '}
                and{' '}
                <Link href="/en/zodiac/sagittarius/" className="text-yellow-400 font-bold hover:underline">
                  Sagittarius
                </Link>
                .
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="border-t-2 border-zinc-800 pt-6 text-center">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Enough background — time to let the cosmos work out what you really cost.
            </p>
            <Link
              href={ROUTES.en.home}
              className="inline-block font-mono font-black uppercase text-sm bg-yellow-400 text-black px-5 py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              🖨️ Print my receipt now
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer locale="en" />
    </div>
  );
}
