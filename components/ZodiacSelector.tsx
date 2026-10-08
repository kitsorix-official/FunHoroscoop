'use client';

import React, { useEffect, useRef } from 'react';
import { ZODIAC_SIGNS, ZodiacSign } from '@/lib/horoscoop-data';

interface ZodiacSelectorProps {
  selectedSign: ZodiacSign;
  onSelectSign: (sign: ZodiacSign) => void;
}

export function ZodiacSelector({ selectedSign, onSelectSign }: ZodiacSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Desktop: het muiswiel over de strip wordt vertaald naar horizontaal
  // scrollen, zodat de sterrenbeelden net zo "swipen" als op mobiel.
  // Alleen wanneer de strip overloopt wordt het wiel overgenomen; anders
  // blijft de pagina gewoon verticaal scrollen.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const canScroll = el.scrollWidth > el.clientWidth + 1;
      if (!canScroll || e.deltaY === 0) return;
      e.preventDefault();
      const maxLeft = el.scrollWidth - el.clientWidth;
      el.scrollLeft = Math.min(maxLeft, Math.max(0, el.scrollLeft + e.deltaY));
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="w-full relative">
      <div className="mb-1.5 px-0.5">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping inline-block" />
          Selecteer Jouw Sterrenbeeld:
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x"
      >
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = selectedSign.id === sign.id;
          return (
            <button
              key={sign.id}
              onClick={() => onSelectSign(sign)}
              className={`cursor-pointer shrink-0 snap-start px-2.5 py-1.5 border-2 border-black transition-all flex items-center gap-2 font-mono text-xs ${
                isSelected
                  ? 'bg-yellow-400 text-black font-black shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-800 shadow-[2px_2px_0px_0px_#000]'
              }`}
            >
              <span className="text-base leading-none">{sign.symbol}</span>
              <div className="text-left">
                <div className="font-bold uppercase tracking-tight">{sign.name}</div>
                <div className={`text-[9px] leading-tight ${isSelected ? 'text-zinc-800' : 'text-zinc-500'}`}>
                  {sign.period.split(' - ')[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
