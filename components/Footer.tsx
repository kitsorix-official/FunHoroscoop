import React from 'react';
import Link from 'next/link';
import { CryptoTipJar } from './CryptoTipJar';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  className?: string;
  showTipJar?: boolean;
}

const KENNISBANK_LINKS = [
  { href: '/anti-barnum/', label: 'Anti-Barnum-methode' },
  { href: '/woordenboek/', label: 'Woordenboek' },
  { href: '/kostenposten/', label: 'Prijslijst' },
  { href: '/veelgestelde-vragen/', label: 'Veelgestelde vragen' },
  { href: '/handleiding/', label: 'Handleiding' },
];

const OVER_LINKS = [
  { href: '/over/', label: 'Over FunHoroscoop' },
  { href: '/sterrenbeeld/', label: 'Alle sterrenbeelden' },
  { href: '/compatibiliteit/', label: 'Compatibiliteit' },
  { href: '/privacy/', label: 'Privacybeleid' },
  { href: '/disclaimer/', label: 'Disclaimer & satire' },
  { href: '/contact/', label: 'Contact & meldingen' },
];

const LINK_CLASS =
  'inline-block text-xs leading-relaxed text-zinc-400 transition-colors hover:text-yellow-400 hover:underline';

function LinkList({ links }: { links: Array<{ href: string; label: string }> }) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={LINK_CLASS}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer({ className, showTipJar = true }: FooterProps) {
  return (
    <footer
      className={
        className ||
        'relative z-10 mt-12 border-t border-zinc-800/80 bg-zinc-950 font-mono text-zinc-400 selection:bg-yellow-400 selection:text-black'
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-9 md:px-6 md:py-12">
        <div className="flex flex-col gap-9 md:flex-row md:items-start md:justify-between md:gap-14">
          {/* Brand en uitgangspunt */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-200">
              <ShieldCheck className="h-4 w-4 shrink-0 text-yellow-400" />
              ✦ FunHoroscoop.nl &copy; {new Date().getFullYear()}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              100% satire &amp; entertainment. Geen cookies, geen accounts, geen persoonlijke tracking.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600">
              Thermische kassabonnen voor mensen die hun gedrag liever zien afgerekend dan voorspeld.
            </p>
          </div>

          {/* Linkgroepen: mobiel twee kolommen, desktop naast elkaar */}
          <div className="grid grid-cols-2 gap-x-7 gap-y-7 sm:grid-cols-3 md:flex md:gap-12">
            <div>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                Kennisbank
              </h2>
              <LinkList links={KENNISBANK_LINKS} />
            </div>

            <div>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                Over &amp; juridisch
              </h2>
              <LinkList links={OVER_LINKS} />
            </div>

            {showTipJar && (
              <div className="col-span-2 sm:col-span-1">
                <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                  Koffie voor de kassier
                </h2>
                <CryptoTipJar
                  buttonClassName="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-zinc-900 text-yellow-400 border border-zinc-700 text-[11px] font-bold uppercase transition-colors hover:border-yellow-400 hover:bg-zinc-800 hover:text-yellow-300"
                />
                <p className="mt-2 max-w-[15rem] text-[11px] leading-relaxed text-zinc-600">
                  Helemaal vrijwillig — de bon is en blijft gratis.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-900 pt-5 text-[11px] leading-relaxed text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Gemaakt met sarcasme en een thermische printer.</span>
          <span>Geen Barnum. Geen tracking. Geen excuses.</span>
        </div>
      </div>
    </footer>
  );
}
