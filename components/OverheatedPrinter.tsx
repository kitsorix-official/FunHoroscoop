'use client';

import React from 'react';
import { AlertTriangle, Flame, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getUi } from '@/lib/ui-strings';

interface OverheatedPrinterProps {
  onResetQuota: () => void;
  locale?: Locale;
}

export function OverheatedPrinter({ onResetQuota, locale = 'nl' }: OverheatedPrinterProps) {
  const ui = getUi(locale);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 text-center bg-zinc-900 border-4 border-red-600 shadow-[6px_6px_0px_0px_#dc2626] rounded-lg max-w-md mx-auto text-zinc-100 animate-pulse">
      {/* Smoke particle illusions */}
      <div className="absolute -top-8 flex gap-4 pointer-events-none">
        <div className="w-5 h-5 rounded-full bg-zinc-400/40 blur-xs animate-bounce" style={{ animationDuration: '1.2s' }} />
        <div className="w-7 h-7 rounded-full bg-zinc-500/30 blur-sm animate-bounce" style={{ animationDuration: '1.8s' }} />
        <div className="w-6 h-6 rounded-full bg-zinc-300/40 blur-xs animate-bounce" style={{ animationDuration: '1.5s' }} />
      </div>

      {/* Blinking Red Warning Beacon */}
      <div className="relative mb-3 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-red-600/30 flex items-center justify-center border-2 border-red-500 animate-ping absolute" />
        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center border-4 border-black shadow-[3px_3px_0px_0px_#000] relative z-10 text-yellow-300">
          <Flame className="w-8 h-8 fill-yellow-300" />
        </div>
      </div>

      {/* Warning Header */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white font-mono font-black text-xs uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
        <AlertTriangle className="w-3.5 h-3.5" />
        {ui.thermalOverload}
      </div>

      <h3 className="text-lg md:text-xl font-black font-mono uppercase text-red-500 tracking-tight mb-2">
        {ui.overheatError}
      </h3>

      <p className="text-xs md:text-sm font-mono text-zinc-300 leading-relaxed mb-4 bg-black/60 p-3 border border-red-900/60">
        {ui.overheatQuota}
      </p>

      <div className="text-[11px] font-mono text-zinc-400 mb-4">
        {ui.coolDown}
      </div>

      <button
        onClick={onResetQuota}
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all"
        title={ui.resetQuotaTitle}
      >
        <RotateCcw className="w-4 h-4" />
        <span>{ui.resetQuota}</span>
      </button>
    </div>
  );
}
