import React from 'react';
import type { Locale } from '@/lib/i18n';
import { getUi } from '@/lib/ui-strings';
import type { FaqItem } from '@/lib/editorial-content';

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  intro?: string;
  locale?: Locale;
}

/**
 * FAQ als gewone, zichtbare HTML — niet achter een accordion of JavaScript.
 * Dezelfde vragen en antwoorden voeden de FAQPage-JSON-LD op de pagina.
 */
export function FaqSection({
  items,
  title,
  intro,
  locale = 'nl',
}: FaqSectionProps) {
  const ui = getUi(locale);
  const heading = title ?? ui.faqTitle;
  const description = intro === undefined ? ui.faqIntro : intro;

  return (
    <section id="faq" className="border-t-2 border-zinc-800 pt-6 mt-8">
      <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white mb-2">
        {heading}
      </h2>
      {description && <p className="text-sm text-zinc-400 leading-relaxed mb-5">{description}</p>}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${item.question}-${index}`} className="bg-black/40 border-2 border-zinc-800 p-4">
            <h3 className="font-mono font-black text-sm md:text-base text-yellow-300 mb-1.5">
              {item.question}
            </h3>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
