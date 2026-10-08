'use client';

import React from 'react';
import { Moon, Clock, RefreshCw } from 'lucide-react';
import { APP_CONFIG } from '@/lib/config';

interface SleepingUniverseProps {
  onForceDayMode?: () => void;
}

export function SleepingUniverse({ onForceDayMode }: SleepingUniverseProps) {
  const startHourStr = `${String(APP_CONFIG.NIGHT_LOCK_START_HOUR).padStart(2, '0')}:00`;
  const endHourStr = `${String(APP_CONFIG.NIGHT_LOCK_END_HOUR).padStart(2, '0')}:00`;

  return (
    <div className="relative flex flex-col items-center justify-center p-6 text-center bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-lg max-w-md mx-auto text-zinc-100">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-indigo-500/10 rounded-lg pointer-events-none" />

      {/* Sleeping Planet Graphic */}
      <div className="relative mb-4">
        {/* Planet sphere */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-950 via-purple-900 to-indigo-600 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center relative overflow-visible">
          {/* Planet rings */}
          <div className="absolute -inset-x-4 top-1/2 -translate-y-1/2 h-4 border-2 border-indigo-400/40 rounded-full rotate-[-25deg] pointer-events-none" />

          {/* Sleeping Face */}
          <div className="flex flex-col items-center z-10">
            <div className="flex gap-3 text-lg font-bold text-yellow-300">
              <span className="scale-x-125">‿</span>
              <span className="scale-x-125">‿</span>
            </div>
            <div className="text-xs text-pink-400 font-mono mt-1">zzz...</div>
          </div>

          {/* Sleeping night cap */}
          <div className="absolute -top-5 -right-3 rotate-12">
            <div className="w-10 h-8 bg-pink-500 border-2 border-black rounded-t-full relative">
              <div className="absolute -top-2 right-1/2 translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full border-2 border-black" />
              <div className="absolute -bottom-1 inset-x-0 h-2 bg-white border-y border-black" />
            </div>
          </div>
        </div>

        {/* Floating ZZZ */}
        <div className="absolute -top-3 -right-6 flex flex-col text-yellow-300 font-mono font-black text-xs animate-bounce">
          <span className="text-sm">Z</span>
          <span className="text-xs translate-x-2">z</span>
          <span className="text-[10px] translate-x-4">z</span>
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black border-2 border-black font-mono text-xs font-black uppercase mb-3 shadow-[2px_2px_0px_0px_#000]">
        <Moon className="w-3.5 h-3.5 fill-current" />
        Nachtslot Actief ({startHourStr} - {endHourStr})
      </div>

      <h3 className="text-xl font-black font-mono uppercase text-yellow-400 tracking-tight mb-2">
        De Kosmos Slaapt
      </h3>

      <p className="text-xs md:text-sm font-mono text-zinc-300 leading-relaxed mb-4">
        &ldquo;De planeten slapen nu. Ga naar bed, morgen weer een dag om teleurgesteld te worden. Printer heropent om {endHourStr}.&rdquo;
      </p>

      <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 border border-zinc-700 w-full mb-3">
        <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span>Kosmische openingstijd: {endHourStr}:00 CET</span>
      </div>

      {onForceDayMode && (
        <button
          onClick={onForceDayMode}
          className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-mono text-zinc-200 border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000]"
          title="Schakel nachtslot uit voor demo doeleinden"
        >
          <RefreshCw className="w-3 h-3 text-yellow-400" />
          <span>Demo: Wek de planeten (Dagmodus)</span>
        </button>
      )}
    </div>
  );
}
