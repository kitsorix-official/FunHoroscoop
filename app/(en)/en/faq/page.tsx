import React from 'react';
import { Metadata } from 'next';
import { localeAlternates, ROUTES } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EditorialShell } from '@/components/EditorialShell';
import { FaqSection } from '@/components/FaqSection';
import { getGlobalFaq } from '@/lib/editorial-content';
import { editorialStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions – Everything About the Cosmic Checkout | FunHoroscoop.nl',
  description:
    'How does the anti-Barnum receipt work? What happens to your data? Why 78 compatibility pages? All the frequently asked questions about FunHoroscoop.nl, answered.',
  alternates: localeAlternates('en', ROUTES.en.faq),
};

const PATH = ROUTES.en.faq;
const FAQ = getGlobalFaq('en');

export default function FaqPage() {
  return (
    <EditorialShell
      eyebrow="Knowledge base / FAQ"
      title="Frequently asked questions about the cosmic checkout"
      subtitle="Privacy, satire, prices and printable brutal honesty. Short answers, no star-gazing."
      crumbs={[
        { name: 'Home', href: ROUTES.en.home },
        { name: 'Frequently asked questions' },
      ]}
      jsonLd={editorialStructuredData({
        title: 'Frequently asked questions about FunHoroscoop.nl',
        description: metadata.description as string,
        path: PATH,
        section: 'FAQ',
        faq: FAQ,
      }, 'en')}
      locale="en"
    >
      <section className="bg-black/40 border-2 border-zinc-800 p-4 md:p-5">
        <p>
          The questions we get most often, in one place. Not seeing yours? Check the{' '}
          <Link href={ROUTES.en.glossary} className="text-yellow-400 font-bold hover:underline">
            glossary
          </Link>{' '}
          for the checkout&rsquo;s terms or get in touch via the{' '}
          <Link href={ROUTES.en.contact} className="text-yellow-400 font-bold hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>

      <FaqSection
        items={FAQ}
        title="All the answers in one place"
        intro="These answers are also available as a FAQPage structure for search engines and AI assistants."
        locale="en"
      />

      <section className="border-t-2 border-zinc-800 pt-6">
        <h2 className="text-lg font-mono font-black uppercase text-white mb-3">Continue with the checkout</h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link href={ROUTES.en.guide} className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-black uppercase px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            How to print and share a receipt <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.method} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            The method <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href={ROUTES.en.zodiac} className="inline-flex items-center gap-1.5 border-2 border-zinc-700 px-4 py-2.5 hover:border-yellow-400 hover:text-yellow-400">
            The 12 dossiers <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </EditorialShell>
  );
}
