import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowUpRight, Printer } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { getGlobalFaq, getGuideSteps } from '@/lib/editorial-content';
import { guideStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'How To – Print and Share Your Receipt | FunHoroscoop.nl',
  description:
    'Six steps from zodiac sign to shareable PNG: choose your sign, print your thermal receipt, download the image and tag that one friend.',
  alternates: localeAlternates('en', ROUTES.en.guide),
};

const PATH = ROUTES.en.guide;
const STEPS = getGuideSteps('en');
const FAQ = getGlobalFaq('en').filter((item) =>
  [
    'Can I save or share my receipt?',
    'How often can I print a receipt?',
    'What is the night lock?',
    'Can I link straight to one zodiac sign?',
  ].includes(item.question)
);

export default function HowToPage() {
  return (
    <EditorialShell
      eyebrow="Knowledge base / How to"
      title="How to print and share your receipt"
      subtitle="Six steps, no account, no printer that jams. Just a checkout that knows what you've been up to."
      crumbs={[
        { name: 'Home', href: ROUTES.en.home },
        { name: 'How to' },
      ]}
      jsonLd={guideStructuredData(STEPS, PATH, 'en')}
      locale="en"
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <p>
          The printer lives on the homepage. There&rsquo;s nothing to set up, nothing to install and nothing to log in to. Pick a sign and press the button — the rest is noise, paper and awkward recognition.
        </p>
        <Link
          href={ROUTES.en.home}
          className="inline-flex shrink-0 items-center gap-2 bg-yellow-400 text-black font-mono font-black uppercase text-xs px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000]"
        >
          <Printer className="w-4 h-4" /> Go to the checkout
        </Link>
      </section>

      <ol className="space-y-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-l-4 border-yellow-400 pl-4 md:pl-5">
            <h2 className="text-lg font-mono font-black uppercase text-white mb-2">
              <span className="text-zinc-600 mr-2">{String(index + 1).padStart(2, '0')}</span>
              {step.title.replace(/^Step \d+ — /, '')}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 mb-3">{step.text}</p>
            <p className="font-mono text-[11px] text-yellow-400 bg-zinc-950 border-2 border-zinc-700 px-3 py-2">
              {step.tip}
            </p>
          </li>
        ))}
      </ol>

      <FaqSection items={FAQ} title="Questions about printing and sharing" locale="en" />

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">More from the checkout</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href={ROUTES.en.faq} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            All frequently asked questions <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.glossary} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            Glossary <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.compatibility} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            78 combinations <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
