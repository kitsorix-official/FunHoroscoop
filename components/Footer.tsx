import React from 'react';
import Link from 'next/link';
import { CryptoTipJar } from './CryptoTipJar';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  className?: string;
  showTipJar?: boolean;
}

export function Footer({ className, showTipJar = true }: FooterProps) {
  return (
    <footer
      className={
        className ||
        'relative z-10 shrink-0 mt-3 pt-2.5 pb-2 border-t-2 border-zinc-800 bg-zinc-950 text-zinc-400 font-mono text-xs select-none'
      }
    >
      <div className="max-w-7xl mx-auto px-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Brand & Satire statement */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left text-[11px]">
          <span className="flex items-center gap-1 text-zinc-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            ✦ FunHoroscoop.nl
          </span>
          <span className="text-zinc-500 hidden sm:inline">—</span>
          <span className="text-zinc-400">
            100% Satire &amp; Entertainment. Geen cookies, geen tracking.
          </span>
        </div>

        {/* Center / Right: Navigation links & Tip Jar */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          <nav className="flex items-center gap-3 font-bold text-zinc-400">
            <Link
              href="/over"
              className="hover:text-yellow-400 hover:underline transition-colors"
            >
              Over FunHoroscoop
            </Link>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <Link
              href="/privacy"
              className="hover:text-yellow-400 hover:underline transition-colors"
            >
              Privacybeleid
            </Link>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <Link
              href="/disclaimer"
              className="hover:text-yellow-400 hover:underline transition-colors"
            >
              Disclaimer &amp; Satire
            </Link>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <Link
              href="/contact"
              className="hover:text-yellow-400 hover:underline transition-colors"
            >
              Contact &amp; Meldingen
            </Link>
          </nav>

          {showTipJar && (
            <div className="shrink-0 pl-1">
              <CryptoTipJar />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
