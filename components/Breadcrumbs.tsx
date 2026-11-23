import React from 'react';
import Link from 'next/link';

export interface Crumb {
  name: string;
  href?: string;
}

/** Zichtbare, crawlbare broodkruimels. De JSON-LD BreadcrumbList gebruikt dezelfde volgorde. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Kruimelpad"
      className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] md:text-xs text-zinc-500 mb-6"
    >
      {items.map((item, index) => (
        <React.Fragment key={`${item.name}-${index}`}>
          {index > 0 && <span aria-hidden="true" className="text-zinc-700">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-yellow-400 hover:underline transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-zinc-300 font-bold">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
