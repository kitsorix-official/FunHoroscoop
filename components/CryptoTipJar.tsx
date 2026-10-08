'use client';

import React, { useState, useEffect } from 'react';
import { Coffee, Copy, Check, X, Coins, ShieldAlert, Heart } from 'lucide-react';

interface CryptoWallet {
  name: string;
  symbol: string;
  network: string;
  address: string;
  badgeColor: string;
}

const WALLETS: CryptoWallet[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Netwerk (Native SegWit)',
    address: 'bc1qexampleaddressplaceholderbtc',
    badgeColor: 'bg-amber-400 text-black',
  },
  {
    name: 'Ethereum / Polygon',
    symbol: 'ETH',
    network: 'ERC-20 / Polygon PoS',
    address: '0xExampleAddressPlaceholderEth',
    badgeColor: 'bg-indigo-400 text-black',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    network: 'Solana Netwerk',
    address: 'ExampleAddressPlaceholderSolana',
    badgeColor: 'bg-emerald-400 text-black',
  },
];

interface CryptoTipJarProps {
  buttonClassName?: string;
  customButtonLabel?: string;
}

export function CryptoTipJar({ buttonClassName, customButtonLabel }: CryptoTipJarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopy = (address: string, symbol: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(address);
      setCopiedSymbol(symbol);
      setTimeout(() => setCopiedSymbol(null), 2500);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          buttonClassName ||
          'cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all'
        }
        title="Ondersteun dit hobbyproject met een vrijwillige crypto fooi"
      >
        <Coffee className="w-3.5 h-3.5" />
        <span>{customButtonLabel || '☕ Tip de Maker (Crypto 18+)'}</span>
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 md:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-zinc-900 text-zinc-100 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-4 md:p-6 my-auto select-text font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[2px_2px_0px_0px_#000]">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black uppercase text-yellow-400 leading-none">
                    Kosmische Fooienpot ☕
                  </h3>
                  <span className="text-[10px] text-zinc-400 tracking-wider">
                    VRIJWILLIGE SCHENKINGEN (18+)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer p-1.5 bg-zinc-800 hover:bg-red-600 hover:text-white border-2 border-black active:translate-x-0.5 active:translate-y-0.5 transition-colors shadow-[2px_2px_0px_0px_#000]"
                aria-label="Sluit fooienpot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subtext */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Vind je FunHoroscoop leuk? Een vrijwillige bijdrage helpt de server- en domeinkosten te dekken van dit niet-commerciële hobbyproject.
            </p>

            {/* Wallet Addresses List */}
            <div className="space-y-3 mb-5">
              {WALLETS.map((wallet) => {
                const isCopied = copiedSymbol === wallet.symbol;
                return (
                  <div
                    key={wallet.symbol}
                    className="p-3 bg-black border-2 border-zinc-800 hover:border-yellow-400/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 border border-black uppercase ${wallet.badgeColor}`}
                        >
                          {wallet.symbol}
                        </span>
                        <span className="text-xs font-bold text-zinc-200">
                          {wallet.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 hidden sm:inline">
                        {wallet.network}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        readOnly
                        value={wallet.address}
                        className="flex-1 bg-zinc-950 text-yellow-300 px-2.5 py-1.5 text-xs border border-zinc-800 font-mono tracking-tight select-all focus:outline-hidden"
                      />

                      <button
                        type="button"
                        onClick={() => handleCopy(wallet.address, wallet.symbol)}
                        className={`cursor-pointer shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                          isCopied
                            ? 'bg-emerald-400 text-black'
                            : 'bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-100'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Gekopieerd!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kopieer</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mandatory Legal Disclaimer Note */}
            <div className="p-3 bg-zinc-950 border-2 border-zinc-800 text-[10px] leading-relaxed text-zinc-400">
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold uppercase mb-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Juridische Kennisgeving (Donaties / Schenkingen)</span>
              </div>
              <p>
                Let op: Fooien zijn 100% vrijwillige schenkingen zonder enige economische tegenprestatie of levering van producten/diensten. Uitsluitend bedoeld voor personen van 18 jaar en ouder. Crypto-transacties zijn onomkeerbaar en niet restitueerbaar.
              </p>
            </div>

            {/* Close action */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
