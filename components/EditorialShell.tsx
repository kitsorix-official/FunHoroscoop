import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ReceiptText } from 'lucide-react';
import { Breadcrumbs, Crumb } from '@/components/Breadcrumbs';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/lib/structured-data';

type LdData = Record<string, unknown> | Record<string, unknown>[];

interface EditorialShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  crumbs: Crumb[];
  jsonLd: LdData;
  children: React.ReactNode;
}

/** Gedeelde, statische layout voor alle kennisbank-pagina's. */
export function EditorialShell({
  eyebrow,
  title,
  subtitle,
  crumbs,
  jsonLd,
  children,
}: EditorialShellProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      <JsonLd data={jsonLd} />

      <header className="border-b-4 border-black bg-zinc-900 px-4 py-3 shadow-[0_4px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Terug naar de Kassa</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase hidden sm:inline">
              FUNHOROSCOOP.NL / KENNISBANK
            </span>
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <article className="bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-6 md:p-10">
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <ReceiptText className="w-3.5 h-3.5" />
              {eyebrow}
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-mono uppercase tracking-tight text-white mb-2">
              {title}
            </h1>
            <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed">{subtitle}</p>
          </div>

          <Breadcrumbs items={crumbs} />

          <div className="space-y-8 text-sm md:text-base leading-relaxed text-zinc-300">
            {children}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
