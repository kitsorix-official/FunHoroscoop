import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, ListFilter, Sparkles } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { getGlobalFaq, getMethodSections } from '@/lib/editorial-content';
import { editorialStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Anti-Barnum Method – Why Our Horoscopes Are Actually Specific | FunHoroscoop.nl',
  description:
    'The Barnum effect makes vague horoscopes believable. FunHoroscoop does the opposite: specific behaviour, a fictional price and no advice. Read the full anti-Barnum method.',
  alternates: localeAlternates('en', ROUTES.en.method),
};

const PATH = ROUTES.en.method;
const FAQ = getGlobalFaq('en').filter((item) =>
  [
    'What is the Barnum effect and why do you avoid it?',
    'How does the anti-Barnum method work?',
    'Are the horoscopes predictions?',
    'Why do the charges have prices?',
  ].includes(item.question)
);
const METHOD = getMethodSections('en');

export default function AntiBarnumPage() {
  return (
    <EditorialShell
      eyebrow="Method / Anti-Barnum"
      title="Anti-Barnum: the till doesn't lie, it's just funny"
      subtitle="Four sentences that fit everyone aren't a horoscope. This is how we turn vague flattery into a recognisable bill."
      crumbs={[
        { name: 'Home', href: ROUTES.en.home },
        { name: 'Anti-Barnum method' },
      ]}
      jsonLd={editorialStructuredData({
        title: 'FunHoroscoop.nl’s anti-Barnum method',
        description: metadata.description as string,
        path: PATH,
        section: 'Method',
        faq: FAQ,
      }, 'en')}
      locale="en"
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <h2 className="text-lg font-mono font-black uppercase text-yellow-400 mb-3">
          The problem with the classic horoscope
        </h2>
        <p className="mb-3">
          The <strong className="text-yellow-400">Barnum effect</strong> is why almost every horoscope &ldquo;feels right&rdquo;. The more general the line, the more likely someone is to read it as personal. &ldquo;You have hidden talents&rdquo;, &ldquo;you long for peace&rdquo;, &ldquo;you&rsquo;re sometimes ambitious&rdquo; — who says no to that?
        </p>
        <p>
          We don&rsquo;t call that a prediction, we call it a sales trick. That&rsquo;s why FunHoroscoop only prints something once it&rsquo;s specific enough to make you laugh or go quiet for a moment. No ticks everyone sticks on themselves, but lines that apply to exactly your type of behaviour.
        </p>
      </section>

      {METHOD.map((section) => (
        <section key={section.heading} className="border-l-4 border-yellow-400 pl-4 md:pl-5">
          <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white mb-3">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-3 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="bg-zinc-950 border-2 border-zinc-700 px-4 py-3 font-mono text-xs md:text-sm text-yellow-300">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            {section.example}
          </p>
        </section>
      ))}

      <section className="bg-zinc-950 border-2 border-zinc-700 p-4 md:p-5">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Barnum versus FunHoroscoop</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-mono border-collapse">
            <thead>
              <tr className="text-yellow-400 border-b-2 border-zinc-700">
                <th className="py-2 pr-4">Classic horoscope</th>
                <th className="py-2">Cosmic checkout</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800">
                <td className="py-2 pr-4">&ldquo;You&rsquo;re sometimes shy&rdquo;</td>
                <td className="py-2">&ldquo;Message typed, deleted, and a deep sigh — €8.50&rdquo;</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-2 pr-4">Based on a position of the moon</td>
                <td className="py-2">Based on a fixed, satirical price list</td>
              </tr>
              <tr className="border-b border-zinc-800">
                <td className="py-2 pr-4">Gives life advice</td>
                <td className="py-2">Gives a total and a stamp</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Fits everyone</td>
                <td className="py-2">Fits exactly one type of behaviour</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Keep reading</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href={ROUTES.en.glossary} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            <BookOpen className="w-4 h-4" /> Checkout glossary <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.costs} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            <ListFilter className="w-4 h-4" /> All emotional charges <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.zodiac} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            The 12 dossiers <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <FaqSection items={FAQ} title="Questions about the method" locale="en" />
    </EditorialShell>
  );
}
