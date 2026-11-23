import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { getGlossary } from '@/lib/editorial-content';
import { glossaryStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Cosmic Checkout Glossary – 24 Terms Explained | FunHoroscoop.nl',
  description:
    'From the Barnum effect to the thermal quota: every FunHoroscoop.nl term explained in printable till-speak, with examples straight off the receipt.',
  alternates: localeAlternates('en', ROUTES.en.glossary),
};

const PATH = ROUTES.en.glossary;
const TERMS = [...getGlossary('en')].sort((a, b) => a.term.localeCompare(b.term, 'en'));

function anchor(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function GlossaryPage() {
  return (
    <EditorialShell
      eyebrow="Knowledge base / Glossary"
      title="Cosmic Checkout Glossary"
      subtitle="Twenty-four terms you need to read a receipt without the cashier standing over you."
      crumbs={[
        { name: 'Home', href: ROUTES.en.home },
        { name: 'Glossary' },
      ]}
      jsonLd={glossaryStructuredData(TERMS, PATH, 'en')}
      locale="en"
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <p>
          A receipt has its own language. We borrowed that language from the thermal printer, soaked it in sarcasm and then gave it a word list. Below you&rsquo;ll find every term that shows up on a receipt, in a dossier or on a compatibility page — including an example so you&rsquo;ll recognise it straight away.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-3">
        {TERMS.map((item) => (
          <section
            key={item.term}
            id={anchor(item.term)}
            className="bg-zinc-950 border-2 border-zinc-700 p-4 scroll-mt-6"
          >
            <h2 className="flex items-center gap-2 font-mono font-black uppercase text-sm text-yellow-400 mb-2">
              <BookOpen className="w-4 h-4 shrink-0" />
              {item.term}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 mb-3">{item.definition}</p>
            <p className="font-mono text-[11px] text-zinc-500 border-t border-zinc-800 pt-2">
              {item.example}
            </p>
          </section>
        ))}
      </div>

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Where does the checkout start?</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href={ROUTES.en.method} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            The anti-Barnum method <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.costs} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            The price list <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.faq} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-3 py-2 hover:border-yellow-400 hover:text-yellow-400">
            Frequently asked questions <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
