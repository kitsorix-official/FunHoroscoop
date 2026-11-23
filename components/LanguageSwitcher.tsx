'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pathForLocale, type Locale } from '@/lib/i18n';
import { getUi } from '@/lib/ui-strings';

interface LanguageSwitcherProps {
  locale: Locale;
}

/**
 * Kleine, cookievrije schakelaar tussen de NL-root en de EN-tak. Gebruikt
 * dezelfde hreflang-mapping als de metadata, dus vanaf /en/zodiac/leo/ ga je
 * naar /sterrenbeeld/leeuw/ en niet naar de Engelse homepage.
 */
export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/';
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const ui = getUi(locale);

  const options: Array<{ locale: Locale; label: string; title: string }> = [
    { locale: 'nl', label: 'NL', title: 'Nederlandse versie' },
    { locale: 'en', label: 'EN', title: 'English version' },
  ];

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px]" aria-label={ui.languageLabel}>
      {options.map((option, index) => (
        <React.Fragment key={option.locale}>
          {index > 0 && (
            <span aria-hidden="true" className="text-zinc-700">
              /
            </span>
          )}
          <Link
            href={pathForLocale(withSlash, option.locale)}
            hrefLang={option.locale}
            lang={option.locale}
            title={option.title}
            aria-current={option.locale === locale ? 'true' : undefined}
            className={
              option.locale === locale
                ? 'font-black text-yellow-400'
                : 'text-zinc-500 hover:text-yellow-400 hover:underline'
            }
          >
            {option.label}
          </Link>
        </React.Fragment>
      ))}
    </span>
  );
}
