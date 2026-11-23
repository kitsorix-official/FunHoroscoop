import React from 'react';
import Link from 'next/link';
import { ROUTES, type Locale } from '@/lib/i18n';
import { getUi } from '@/lib/ui-strings';
import { CryptoTipJar } from './CryptoTipJar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  className?: string;
  showTipJar?: boolean;
  locale?: Locale;
}

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

export function Footer({ className, showTipJar = true, locale = 'nl' }: FooterProps) {
  const ui = getUi(locale);
  const routes = ROUTES[locale];

  const knowledgeLinks = [
    { href: routes.method, label: ui.linkMethod },
    { href: routes.glossary, label: ui.linkGlossary },
    { href: routes.costs, label: ui.linkCosts },
    { href: routes.faq, label: ui.linkFaq },
    { href: routes.guide, label: ui.linkGuide },
  ];

  const aboutLinks = [
    { href: routes.about, label: ui.linkAbout },
    { href: routes.zodiac, label: ui.linkSigns },
    { href: routes.compatibility, label: ui.linkCompatibility },
    { href: routes.privacy, label: ui.linkPrivacy },
    { href: routes.disclaimer, label: ui.linkDisclaimer },
    { href: routes.contact, label: ui.linkContact },
  ];

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
              {ui.footerIntro}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600">
              {ui.footerSecond}
            </p>
          </div>

          {/* Linkgroepen: mobiel twee kolommen, desktop naast elkaar */}
          <div className="grid grid-cols-2 gap-x-7 gap-y-7 sm:grid-cols-3 md:flex md:gap-12">
            <div>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                {ui.footerKnowledge}
              </h2>
              <LinkList links={knowledgeLinks} />
            </div>

            <div>
              <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                {ui.footerAboutLegal}
              </h2>
              <LinkList links={aboutLinks} />
            </div>

            {showTipJar && (
              <div className="col-span-2 sm:col-span-1">
                <h2 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                  {ui.footerCoffee}
                </h2>
                <CryptoTipJar
                  locale={locale}
                  buttonClassName="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-zinc-900 text-yellow-400 border border-zinc-700 text-[11px] font-bold uppercase transition-colors hover:border-yellow-400 hover:bg-zinc-800 hover:text-yellow-300"
                />
                <p className="mt-2 max-w-[15rem] text-[11px] leading-relaxed text-zinc-600">
                  {ui.footerVoluntary}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-900 pt-5 text-[11px] leading-relaxed text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>{ui.footerMade}</span>
          <span className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <span>{ui.footerPromise}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
