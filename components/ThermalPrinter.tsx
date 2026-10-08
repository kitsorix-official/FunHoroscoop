'use client';

import React, { useState } from 'react';
import { ReceiptData, downloadReceiptImage } from '@/lib/receipt-generator';
import { Download, Copy, Share2, Check, Sparkles } from 'lucide-react';
import { SleepingUniverse } from './SleepingUniverse';
import { OverheatedPrinter } from './OverheatedPrinter';
import { SharePrompt } from './SharePrompt';

interface ThermalPrinterProps {
  receipt: ReceiptData | null;
  isPrinting: boolean;
  appState: 'active' | 'night' | 'overheated';
  onForceDayMode: () => void;
  onResetQuota: () => void;
}

export function ThermalPrinter({
  receipt,
  isPrinting,
  appState,
  onForceDayMode,
  onResetQuota,
}: ThermalPrinterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    if (!receipt) return;
    const text = `🧾 FUNHOROSCOOP - ${receipt.sign.name.toUpperCase()} (${receipt.sign.symbol})
Archetype: "${receipt.sign.archetype}"
Karma score: ${receipt.karmaScore}%

EMOTIONELE REKENING:
${receipt.costs.map((c) => `· ${c.description}: € ${c.price.toFixed(2).replace('.', ',')}`).join('\n')}
TOTAAL SCHADE: € ${receipt.totalCost.toFixed(2).replace('.', ',')}

⚠ GEVAAR VANDAAG:
${receipt.gevaar}

💡 COPING-MECHANISME:
${receipt.coping}

Stempel: [ ${receipt.stamp} ]
Print jouw bon op FunHoroscoop.nl!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!receipt) return;
    const text = encodeURIComponent(
      `Mijn FunHoroscoop bon voor ${receipt.sign.name} (${receipt.sign.symbol}) is binnengekomen:\nTotal emotionele schade: € ${receipt.totalCost.toFixed(2).replace('.', ',')}.\nStatus: ${receipt.stamp}!\nBekijk je eigen bon op https://funhoroscoop.nl`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col items-center justify-start h-full">
      {/* Printer Machine Head & Slot */}
      <div
        className={`w-full max-w-md bg-zinc-900 border-4 border-black shadow-[6px_6px_0px_0px_#000] p-3 rounded-t-xl relative z-20 transition-transform ${
          isPrinting ? 'translate-y-0.5 animate-bounce' : ''
        }`}
      >
        {/* Top Metallic Details / LED Row */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {/* Power LED */}
              <div
                className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
                title="Systeem: Online"
              />
              {/* Ready LED */}
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  appState === 'active'
                    ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]'
                    : 'bg-zinc-700'
                }`}
                title="Printer: Gereed"
              />
              {/* Overheat/Error LED */}
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  appState === 'overheated'
                    ? 'bg-red-600 shadow-[0_0_8px_#dc2626] animate-ping'
                    : appState === 'night'
                    ? 'bg-purple-600 shadow-[0_0_8px_#9333ea]'
                    : 'bg-zinc-700'
                }`}
                title="Status LED"
              />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
              THERMAL-666 KOSMOS
            </span>
          </div>

          <div className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-950 text-yellow-400 border border-zinc-800">
            {appState === 'active'
              ? isPrinting
                ? 'PRINTING...'
                : 'ONLINE'
              : appState === 'night'
              ? 'STANDBY / SLAAP'
              : 'OVERVERHIT'}
          </div>
        </div>

        {/* Paper feeder mouth / slot */}
        <div className="mt-2 relative">
          <div className="w-full h-3 bg-black rounded-sm border-2 border-zinc-950 shadow-inner relative flex items-center justify-center overflow-hidden">
            {isPrinting && (
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent animate-pulse" />
            )}
          </div>
          {/* Subtle paper feed rollers */}
          <div className="flex justify-between px-6 text-[8px] text-zinc-600 font-mono -mt-0.5">
            <span>◄ FEED</span>
            <span className="text-zinc-500">THERMISCHE GLEUF</span>
            <span>FEED ►</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Either State Guardrails or The Printed Receipt */}
      <div className="w-full max-w-md relative flex-1 flex flex-col items-center justify-start pt-1 pb-2">
        {appState === 'night' ? (
          <div className="w-full py-4 animate-in fade-in zoom-in duration-300">
            <SleepingUniverse onForceDayMode={onForceDayMode} />
          </div>
        ) : appState === 'overheated' ? (
          <div className="w-full py-4 animate-in fade-in zoom-in duration-300">
            <OverheatedPrinter onResetQuota={onResetQuota} />
          </div>
        ) : !receipt ? (
          /* Empty placeholder waiting for print */
          <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center p-6 text-center bg-zinc-900/60 border-2 border-dashed border-zinc-800 rounded-b-lg">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-400 mb-3 border border-zinc-700">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="font-mono font-bold text-sm text-zinc-300 uppercase mb-1">
              Printer Wacht Op Karma
            </h4>
            <p className="font-mono text-xs text-zinc-500 max-w-xs leading-relaxed">
              Selecteer je sterrenbeeld hiernaast en druk op <strong className="text-yellow-400">&ldquo;PRINT JE LOT&rdquo;</strong> om je ongezouten kassa-horoscoop uit te draaien.
            </p>
          </div>
        ) : (
          /* Active Printed Receipt */
          <div
            className={`w-full flex flex-col items-center transition-all duration-700 ${
              isPrinting
                ? 'opacity-60 scale-95 translate-y-[-20px]'
                : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            {/* The Physical Receipt Container */}
            <div
              id="funhoroscoop-receipt-card"
              className="w-full bg-[#FAF9F5] text-zinc-900 border-x-4 border-b-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 md:p-5 font-mono text-xs relative select-text"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            >
              {/* Paper tear jagged top effect */}
              <div
                className="absolute -top-2 left-0 right-0 h-2 bg-[#FAF9F5]"
                style={{
                  clipPath:
                    'polygon(0% 100%, 3.3% 0%, 6.6% 100%, 10% 0%, 13.3% 100%, 16.6% 0%, 20% 100%, 23.3% 0%, 26.6% 100%, 30% 0%, 33.3% 100%, 36.6% 0%, 40% 100%, 43.3% 0%, 46.6% 100%, 50% 0%, 53.3% 100%, 56.6% 0%, 60% 100%, 63.3% 0%, 66.6% 100%, 70% 0%, 73.3% 100%, 76.6% 0%, 80% 100%, 83.3% 0%, 86.6% 100%, 90% 0%, 93.3% 100%, 96.6% 0%, 100% 100%)',
                }}
              />

              {/* Receipt Header */}
              <div className="text-center pb-2 border-b border-dashed border-zinc-400">
                <div className="font-black text-sm tracking-wider uppercase text-black">
                  *** FUNHOROSCOOP.NL ***
                </div>
                <div className="text-[10px] text-zinc-600 mt-0.5">
                  KASSA 01 · TERMINAL #{receipt.terminalId}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {receipt.dateStr} · {receipt.timeStr} CET
                </div>
              </div>

              {/* Sign Banner */}
              <div className="py-2.5 text-center border-b border-dashed border-zinc-400 relative">
                <div className="text-2xl font-black text-black flex items-center justify-center gap-2">
                  <span>{receipt.sign.symbol}</span>
                  <span className="uppercase">{receipt.sign.name}</span>
                </div>
                <div className="text-[11px] font-bold text-red-700 italic">
                  &ldquo;{receipt.sign.archetype}&rdquo;
                </div>
                <div className="text-[10px] text-zinc-600 mt-0.5">
                  Karma-score:{' '}
                  <span className="font-bold text-red-600">
                    {receipt.karmaScore}% [CRITISCH]
                  </span>
                </div>

                {/* Sarcastic Red Stamp */}
                <div className="absolute right-1 top-2 rotate-[-16deg] pointer-events-none border-2 border-red-600 px-2 py-0.5 text-red-600 font-black text-xs uppercase bg-white/70 shadow-xs">
                  {receipt.stamp}
                </div>
              </div>

              {/* Sign Roast */}
              <div className="py-2 text-[11px] text-zinc-700 border-b border-dashed border-zinc-400 bg-amber-50/50 -mx-4 md:-mx-5 px-4 md:px-5">
                <span className="font-bold text-black uppercase text-[10px] block mb-0.5">
                  ✦ DE ONGEZOUTEN WAARHEID:
                </span>
                &ldquo;{receipt.sign.roast}&rdquo;
              </div>

              {/* Emotional Cost Items */}
              <div className="py-2 border-b border-dashed border-zinc-400">
                <div className="text-[10px] font-bold uppercase text-zinc-700 mb-1 flex justify-between">
                  <span>EMOTIONELE KOSTENPOSTEN:</span>
                  <span>EUR</span>
                </div>
                <div className="space-y-1">
                  {receipt.costs.map((cost, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] leading-tight">
                      <span className="text-zinc-800 pr-2 truncate">
                        1x {cost.description}
                      </span>
                      <span className="font-bold text-black shrink-0 tabular-nums">
                        € {cost.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Row */}
              <div className="py-2 border-b border-dashed border-zinc-400">
                <div className="flex justify-between items-center text-sm font-black text-black">
                  <span>TOTAAL SCHADE:</span>
                  <span className="tabular-nums">
                    € {receipt.totalCost.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="text-[9px] text-zinc-500 text-right mt-0.5">
                  Inclusief 21% Karma-belasting & Teleurstelling
                </div>
              </div>

              {/* Gevaar Vandaag */}
              <div className="py-2 border-b border-dashed border-zinc-400">
                <span className="font-bold text-red-700 text-[10px] uppercase block mb-0.5">
                  ⚠ GEVAAR VANDAAG:
                </span>
                <p className="text-[11px] text-zinc-800 leading-tight">
                  {receipt.gevaar}
                </p>
              </div>

              {/* Aanbevolen Coping */}
              <div className="py-2 border-b border-dashed border-zinc-400">
                <span className="font-bold text-emerald-800 text-[10px] uppercase block mb-0.5">
                  💡 AANBEVOLEN COPING:
                </span>
                <p className="text-[11px] text-zinc-800 leading-tight">
                  {receipt.coping}
                </p>
              </div>

              {/* Barcode & Footer */}
              <div className="pt-2 text-center">
                {/* Visual Barcode */}
                <div className="h-8 flex justify-center items-stretch gap-[2px] px-8 my-1">
                  {[
                    4, 2, 6, 2, 4, 1, 8, 3, 2, 5, 2, 7, 3, 2, 6, 4, 2, 8, 2, 4, 5, 2, 3, 6, 2, 7, 3,
                    4, 2, 5, 2, 8, 3, 2, 4, 6, 2, 5, 3, 7, 2, 4, 2,
                  ].map((w, idx) => (
                    <div
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-black' : 'bg-transparent'}
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] text-zinc-600 tracking-widest font-mono">
                  * {receipt.barcodeNum} *
                </div>
                <div className="text-[8px] text-zinc-400 mt-1 uppercase">
                  ✦ GEEN RETOUR OF RESTITUTIE MOGELIJK ✦
                </div>
              </div>

              {/* Serrated Bottom Tear */}
              <div
                className="absolute -bottom-2.5 left-0 right-0 h-3 bg-[#FAF9F5]"
                style={{
                  clipPath:
                    'polygon(0% 0%, 3.3% 100%, 6.6% 0%, 10% 100%, 13.3% 0%, 16.6% 100%, 20% 0%, 23.3% 100%, 26.6% 0%, 30% 100%, 33.3% 0%, 36.6% 100%, 40% 0%, 43.3% 100%, 46.6% 0%, 50% 100%, 53.3% 0%, 56.6% 100%, 60% 0%, 63.3% 100%, 66.6% 0%, 70% 100%, 73.3% 0%, 76.6% 100%, 80% 0%, 83.3% 100%, 86.6% 0%, 90% 100%, 93.3% 0%, 96.6% 100%, 100% 0%)',
                }}
              />
            </div>

            {/* Quick Action Toolbar directly underneath */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 w-full">
              <button
                type="button"
                onClick={() => downloadReceiptImage(receipt)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 text-black font-mono font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all"
                title="Download bon als afbeelding voor Instagram Story of TikTok"
              >
                <Download className="w-3.5 h-3.5" />
                <span>📸 Download Bon</span>
              </button>

              <button
                type="button"
                onClick={handleCopyText}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:translate-x-0.5 active:translate-y-0.5 text-zinc-100 font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all"
                title="Kopieer samenvatting naar klembord"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Gekopieerd!' : 'Kopieer'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 active:translate-x-0.5 active:translate-y-0.5 text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all"
                title="Deel direct via WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Share-moment: tag die ene vriend die dit is */}
            <div className="w-full mt-2">
              <SharePrompt key={receipt.barcodeNum} receipt={receipt} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
