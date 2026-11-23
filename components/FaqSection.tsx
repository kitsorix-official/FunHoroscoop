import React from 'react';
import { FaqItem } from '@/lib/editorial-content';

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  intro?: string;
}

/**
 * FAQ als gewone, zichtbare HTML — niet achter een accordion of JavaScript.
 * Dezelfde vragen en antwoorden voeden de FAQPage-JSON-LD op de pagina.
 */
export function FaqSection({
  items,
  title = 'Veelgestelde vragen',
  intro = 'Korte antwoorden, lange herkenning. Staat je vraag er niet tussen? Kijk dan op de uitgelichte pagina of neem contact op.',
}: FaqSectionProps) {
  return (
    <section id="faq" className="border-t-2 border-zinc-800 pt-6 mt-8">
      <h2 className="text-lg md:text-xl font-mono font-black uppercase text-white mb-2">
        {title}
      </h2>
      {intro && <p className="text-sm text-zinc-400 leading-relaxed mb-5">{intro}</p>}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${item.question}-${index}`} className="bg-black/40 border-2 border-zinc-800 p-4">
            <h3 className="font-mono font-black text-sm text-yellow-400 mb-2">{item.question}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
