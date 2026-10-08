'use client';

import React, { useSyncExternalStore, useState, useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ZODIAC_SIGNS,
  ZodiacSign,
  EMOTIONAL_COSTS,
  GEVAREN_VANDAAG,
  COPING_MECHANISMEN,
  KOSMISCHE_QUOTES,
  STEMPELS,
} from '@/lib/horoscoop-data';
import { APP_CONFIG } from '@/lib/config';
import { ReceiptData } from '@/lib/receipt-generator';
import { playPrinterSound } from '@/lib/sound';
import { ZodiacSelector } from '@/components/ZodiacSelector';
import { ThermalPrinter } from '@/components/ThermalPrinter';
import { Footer } from '@/components/Footer';
import { Printer, Moon, Sun, Flame, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'funhoroscoop_quota';
const MAX_PRINTS_PER_DAY = APP_CONFIG.MAX_PRINTS_PER_DAY;

function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
}

function subscribeQuota(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('funhoroscoop_quota_changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('funhoroscoop_quota_changed', callback);
  };
}

function getQuotaSnapshot(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const parsed = JSON.parse(stored);
    if (parsed.date === getTodayString() && typeof parsed.count === 'number') {
      return parsed.count;
    }
    return 0;
  } catch {
    return 0;
  }
}

function getQuotaServerSnapshot(): number {
  return 0;
}

function saveQuota(count: number) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayString(), count })
    );
    window.dispatchEvent(new Event('funhoroscoop_quota_changed'));
  } catch {
    // ignore
  }
}

function subscribeHour(callback: () => void) {
  const timer = setInterval(callback, 30000);
  return () => clearInterval(timer);
}

function getHourSnapshot(): number {
  return new Date().getHours();
}

function getHourServerSnapshot(): number {
  return 12; // default daytime on server
}

interface HoroscoopAppProps {
  defaultSignSlug?: string;
}

export function HoroscoopApp({ defaultSignSlug }: HoroscoopAppProps) {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Selected sign with initial value from prop, URL or default (Leeuw)
  const signParam = defaultSignSlug || searchParams.get('sign');
  const initialSign =
    (signParam &&
      ZODIAC_SIGNS.find(
        (s) =>
          s.slug.toLowerCase() === signParam.toLowerCase().trim() ||
          s.name.toLowerCase() === signParam.toLowerCase().trim()
      )) ||
    ZODIAC_SIGNS[4]; // Default: Leeuw

  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(initialSign);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [currentReceipt, setCurrentReceipt] = useState<ReceiptData | null>(null);

  // Sync with localStorage reactively
  const printCount = useSyncExternalStore(subscribeQuota, getQuotaSnapshot, getQuotaServerSnapshot);
  const currentHour = useSyncExternalStore(subscribeHour, getHourSnapshot, getHourServerSnapshot);

  // Manual demo override for state testing (auto, day, night, overheat)
  const [demoOverride, setDemoOverride] = useState<'auto' | 'day' | 'night' | 'overheat'>('auto');

  // Handle selection with transition
  const handleSelectSign = (sign: ZodiacSign) => {
    startTransition(() => {
      setSelectedSign(sign);
    });
  };

  // Determine current effective app state
  const isWithinNightHours =
    currentHour >= APP_CONFIG.NIGHT_LOCK_START_HOUR || currentHour < APP_CONFIG.NIGHT_LOCK_END_HOUR;
  const isNightTime = APP_CONFIG.ENABLE_NIGHT_LOCK && isWithinNightHours;

  let appState: 'active' | 'night' | 'overheated' = 'active';

  if (demoOverride === 'night') {
    appState = 'night';
  } else if (demoOverride === 'overheat') {
    appState = 'overheated';
  } else if (demoOverride === 'day') {
    appState = printCount >= MAX_PRINTS_PER_DAY ? 'overheated' : 'active';
  } else {
    if (isNightTime) {
      appState = 'night';
    } else if (printCount >= MAX_PRINTS_PER_DAY) {
      appState = 'overheated';
    } else {
      appState = 'active';
    }
  }

  // Generate a randomized satirical receipt
  const generateNewReceipt = (sign: ZodiacSign): ReceiptData => {
    const shuffledCosts = [...EMOTIONAL_COSTS].sort(() => 0.5 - Math.random());
    const selectedCosts = shuffledCosts.slice(0, 3);
    const totalCost = selectedCosts.reduce((sum, item) => sum + item.price, 0);

    const randomGevaar = GEVAREN_VANDAAG[Math.floor(Math.random() * GEVAREN_VANDAAG.length)];
    const randomCoping = COPING_MECHANISMEN[Math.floor(Math.random() * COPING_MECHANISMEN.length)];
    const randomQuote = KOSMISCHE_QUOTES[Math.floor(Math.random() * KOSMISCHE_QUOTES.length)];
    const randomStamp = STEMPELS[Math.floor(Math.random() * STEMPELS.length)];

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-${now.getFullYear()}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}:${String(now.getSeconds()).padStart(2, '0')}`;

    const terminalId = Math.floor(100 + Math.random() * 900).toString();
    const karmaScore = -(Math.floor(65 + Math.random() * 34));
    const barcodeNum = `NL-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return {
      sign,
      dateStr,
      timeStr,
      terminalId,
      karmaScore,
      costs: selectedCosts,
      totalCost,
      gevaar: randomGevaar,
      coping: randomCoping,
      quote: randomQuote,
      stamp: randomStamp,
      barcodeNum,
    };
  };

  const handlePrint = () => {
    if (appState !== 'active' || isPrinting) return;

    setIsPrinting(true);
    playPrinterSound();

    const newReceipt = generateNewReceipt(selectedSign);
    saveQuota(printCount + 1);

    setTimeout(() => {
      setCurrentReceipt(newReceipt);
      setIsPrinting(false);
    }, 1100);
  };

  const handleResetQuota = () => {
    saveQuota(0);
    setDemoOverride('auto');
  };

  const remainingKarma = Math.max(0, MAX_PRINTS_PER_DAY - printCount);

  return (
    <main className="min-h-[100dvh] overflow-x-hidden flex flex-col justify-between bg-zinc-950 text-zinc-100 p-2 md:p-3 relative select-none">
      {/* Background Cosmic Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* TOP BAR */}
      <header className="relative z-10 shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-900 border-2 md:border-4 border-black shadow-[3px_3px_0px_0px_#000] mb-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 border-2 border-black flex items-center justify-center font-mono font-black text-black text-xs shadow-[1px_1px_0px_0px_#000]">
            ⚡
          </div>
          <Link href="/" className="text-sm md:text-base font-black font-mono tracking-tight uppercase text-zinc-100 flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
            <span>FUNHOROSCOOP.NL</span>
            <span className="hidden sm:inline text-[10px] px-1.5 py-0.2 bg-pink-600 text-white font-mono font-bold uppercase">
              ANTI-BARNUM
            </span>
          </Link>
        </div>

        {/* Status & Demo Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* EU Directive Indicator */}
          <div
            className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 border text-[10px] ${
              APP_CONFIG.ENABLE_NIGHT_LOCK
                ? 'bg-zinc-800 text-yellow-300 border-zinc-700'
                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}
            title={
              APP_CONFIG.ENABLE_NIGHT_LOCK
                ? `EU Nachtslot actief tussen ${APP_CONFIG.NIGHT_LOCK_START_HOUR}:00 en 0${APP_CONFIG.NIGHT_LOCK_END_HOUR}:00 (in te stellen in lib/config.ts)`
                : 'EU Nachtslot is uitgeschakeld via lib/config.ts (24/7 geopend)'
            }
          >
            {APP_CONFIG.ENABLE_NIGHT_LOCK ? (
              <ShieldAlert className="w-3 h-3 text-yellow-400" />
            ) : (
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
            )}
            <span>EU Slot: {APP_CONFIG.ENABLE_NIGHT_LOCK ? `AAN (>${APP_CONFIG.NIGHT_LOCK_START_HOUR}:00)` : 'UIT'}</span>
          </div>

          {/* Quota Badge */}
          <div
            className={`hidden xs:flex items-center gap-1.5 px-2 py-0.5 border-2 border-black text-[11px] font-bold ${
              remainingKarma === 0
                ? 'bg-red-500 text-white shadow-[2px_2px_0px_0px_#000]'
                : 'bg-zinc-800 text-yellow-300 border-zinc-700'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>
              Inkt & Karma: <strong className="text-white">{remainingKarma}/{MAX_PRINTS_PER_DAY}</strong>
            </span>
          </div>

          {/* State Demo Selector */}
          <div className="flex items-center gap-1 bg-black/60 p-0.5 border border-zinc-800 text-[10px]">
            <span className="text-zinc-500 hidden md:inline px-1">Mode:</span>
            <button
              onClick={() => setDemoOverride('auto')}
              className={`px-1.5 py-0.5 font-bold transition-all ${
                demoOverride === 'auto'
                  ? 'bg-yellow-400 text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Automatische tijddetectie"
            >
              Auto
            </button>
            <button
              onClick={() => setDemoOverride('day')}
              className={`px-1.5 py-0.5 font-bold transition-all ${
                demoOverride === 'day'
                  ? 'bg-emerald-400 text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Forceer Dagmodus"
            >
              <Sun className="w-3 h-3 inline md:mr-0.5" />
              <span className="hidden md:inline">Dag</span>
            </button>
            <button
              onClick={() => setDemoOverride('night')}
              className={`px-1.5 py-0.5 font-bold transition-all ${
                demoOverride === 'night'
                  ? 'bg-purple-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Forceer Nachtslot"
            >
              <Moon className="w-3 h-3 inline md:mr-0.5" />
              <span className="hidden md:inline">Nacht</span>
            </button>
            <button
              onClick={() => setDemoOverride('overheat')}
              className={`px-1.5 py-0.5 font-bold transition-all ${
                demoOverride === 'overheat'
                  ? 'bg-red-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Forceer Oververhit (3/3)"
            >
              <Flame className="w-3 h-3 inline md:mr-0.5" />
              <span className="hidden md:inline">3/3</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 items-stretch">
        {/* LEFT COLUMN: Controls & Zodiac Picker */}
        <section className="lg:col-span-5 flex flex-col justify-between bg-zinc-900/90 border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_#000] p-3 md:p-4 overflow-y-auto max-h-full">
          <div>
            <div className="mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 font-black">
                ✦ DE HARDSTE REALITEIT VAN HET HEELAL
              </span>
              <h2 className="text-xl md:text-2xl font-black font-mono uppercase tracking-tight text-white leading-tight">
                Jouw Kosmische Kassabon
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1 leading-snug">
                Geen vage barnum-onzin over &ldquo;je bent soms introvert en soms extravert&rdquo;. Alleen ongevraagde emotionele kostenposten en toxische waarheden.
              </p>
            </div>

            {/* Zodiac Sign Selector */}
            <div className="mt-3">
              <ZodiacSelector
                selectedSign={selectedSign}
                onSelectSign={handleSelectSign}
              />
            </div>

            {/* Selected Sign Highlight Card */}
            <div className="mt-3 p-2.5 bg-black border-2 border-zinc-800 text-xs font-mono">
              <div className="flex items-center justify-between text-yellow-400 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{selectedSign.symbol}</span>
                  <span className="uppercase text-sm">{selectedSign.name}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {selectedSign.element}
                </span>
              </div>
              <div className="text-pink-400 font-bold text-[11px] mb-1">
                Archetype: &ldquo;{selectedSign.archetype}&rdquo;
              </div>
              <p className="text-zinc-400 text-[11px] leading-tight">
                {selectedSign.roast}
              </p>
            </div>
          </div>

          {/* Action & Meter */}
          <div className="mt-3 pt-3 border-t-2 border-zinc-800">
            <div className="mb-2.5">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1">
                <span>DAGELIJKS THERMISCH INKTLIMIET</span>
                <span className="font-bold text-yellow-400">
                  {printCount}/3 prints gebruikt
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-950 border border-zinc-700 overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-300 ${
                    printCount >= 3
                      ? 'bg-red-600'
                      : printCount === 2
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, (printCount / 3) * 100)}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              disabled={appState !== 'active' || isPrinting}
              className={`w-full py-3 px-4 font-mono font-black text-sm md:text-base uppercase border-4 border-black transition-all flex items-center justify-center gap-2 ${
                appState === 'active' && !isPrinting
                  ? 'cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
                  : 'cursor-not-allowed bg-zinc-800 text-zinc-500 border-zinc-900 shadow-none opacity-80'
              }`}
            >
              {isPrinting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-black" />
                  <span>BEZIG MET AFDRUKKEN...</span>
                </>
              ) : appState === 'night' ? (
                <>
                  <Moon className="w-5 h-5 text-purple-400" />
                  <span>NACHTSLOT (GESLOTEN TOT {String(APP_CONFIG.NIGHT_LOCK_END_HOUR).padStart(2, '0')}:00)</span>
                </>
              ) : appState === 'overheated' ? (
                <>
                  <Flame className="w-5 h-5 text-red-500" />
                  <span>PRINTER OVERVERHIT (3/3 BEREIKT)</span>
                </>
              ) : (
                <>
                  <Printer className="w-5 h-5" />
                  <span>PRINT JE LOT (€ 0,00)</span>
                </>
              )}
            </button>

            {printCount >= MAX_PRINTS_PER_DAY && (
              <button
                type="button"
                onClick={handleResetQuota}
                className="w-full mt-2 py-1 text-[11px] font-mono text-zinc-400 hover:text-yellow-400 flex items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset teller naar 0/3 (Test Functie)</span>
              </button>
            )}

            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mt-2 px-1">
              <span>✦ Geen account nodig</span>
              <span>✦ 100% Satire & TikTok Ready</span>
              <span>✦ Gratis & Anoniem</span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Thermal Printer */}
        <section className="lg:col-span-7 flex flex-col items-center justify-center relative py-2">
          <ThermalPrinter
            receipt={currentReceipt}
            isPrinting={isPrinting}
            appState={appState}
            onForceDayMode={() => setDemoOverride('day')}
            onResetQuota={handleResetQuota}
          />
        </section>
      </div>

      {/* FOOTER */}
      <Footer className="relative z-10 shrink-0 mt-3 pt-2.5 pb-2 border-t-2 border-zinc-800 bg-zinc-950 text-zinc-400 font-mono text-[10px] select-none" />
    </main>
  );
}
