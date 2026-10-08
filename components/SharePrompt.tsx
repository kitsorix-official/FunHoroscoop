'use client';

import React, { useState } from 'react';
import { ReceiptData } from '@/lib/receipt-generator';
import { SHARE_CAPTIONS } from '@/lib/horoscoop-data';
import { BASE_URL } from '@/lib/base-url';
import { Check, ChevronDown, ChevronUp, Copy, MessageCircle, Share2 } from 'lucide-react';

const SHARED_KEY = 'funhoroscoop_shared_session';

// navigator is niet beschikbaar tijdens SSR; veilig checken vóór render.
const supportsWebShare =
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';

function formatEuro(n: number) {
  return n.toFixed(2).replace('.', ',');
}

interface SharePromptProps {
  receipt: ReceiptData;
}

function pickRandomCaption(): string {
  return SHARE_CAPTIONS[Math.floor(Math.random() * SHARE_CAPTIONS.length)];
}

/**
 * Post-print share-moment: kopieer een kant-en-klare captie met tag-call-to-action
 * voor TikTok, Instagram Reels of Stories. Nadat de bezoeker gedeeld heeft wordt
 * de prompt ingeklapt (per sessie, subtiel, geen nagel).
 */
export function SharePrompt({ receipt }: SharePromptProps) {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  // Nieuwe template per afgedrukte bon (stabiel tijdens het typen van een naam).
  // Een nieuwe bon remount het component via `key={receipt.barcodeNum}`.
  const [template] = useState(pickRandomCaption);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(SHARED_KEY) === '1';
    } catch {
      return false;
    }
  });

  const displayName = name.trim() || 'die ene vriend';

  const caption = template
    .replaceAll('{NAAM}', displayName)
    .replaceAll('{TEKEN}', receipt.sign.name)
    .replaceAll('{SYMBOOL}', receipt.sign.symbol)
    .replaceAll('{ARCHETYPE}', receipt.sign.archetype)
    .replaceAll('{TOTAAL}', formatEuro(receipt.totalCost))
    .replaceAll('{STAMP}', receipt.stamp);

  const markShared = () => {
    try {
      sessionStorage.setItem(SHARED_KEY, '1');
    } catch {
      // ignore (bv. private browsing)
    }
    setCollapsed(true);
  };

  const copyFallback = async (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    const text = `${caption} — ${BASE_URL}/?sign=${receipt.sign.slug}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      copyFallback(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    markShared();
  };

  const handleShare = async () => {
    const url = `${BASE_URL}/?sign=${receipt.sign.slug}`;
    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share({ text: caption, url });
        markShared();
        return;
      } catch {
        // Gebruiker heeft geannuleerd of share niet beschikbaar → klembord-fallback
      }
    }
    await handleCopy();
  };

  // Ingeklapt na gedeeld: subtiele herhaaloptie
  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="w-full cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 font-mono font-bold text-[11px] uppercase hover:border-yellow-400 hover:text-yellow-300 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>Deel je bon &amp; tag een vriend</span>
        <ChevronUp className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div className="w-full bg-zinc-900 border-2 border-black shadow-[3px_3px_0px_0px_#000] p-3 text-left">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-300 font-black flex items-center gap-1.5">
          <Share2 className="w-3 h-3" />
          Tag die ene vriend die dit is 🎯
        </span>
        <button
          type="button"
          onClick={markShared}
          className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer flex items-center gap-0.5"
          aria-label="Share-prompt sluiten"
        >
          Verberg <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <p className="text-[11px] font-mono text-zinc-400 leading-snug mb-2">
        Kopieer de captie en plak &rsquo;m bij je bon in je Story of Reel. Tag er een vriend(in)
        bij die dit écht is — gegarandeerd een reactie. 😉
      </p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Naam van je vriend(in) (optioneel)"
        maxLength={30}
        className="w-full mb-2 px-2.5 py-1.5 bg-black border-2 border-zinc-800 text-zinc-100 font-mono text-xs placeholder:text-zinc-600 focus:border-yellow-400 focus:outline-none"
      />

      <div className="mb-2 px-2.5 py-2 bg-amber-50 text-zinc-900 font-mono text-[11px] leading-snug select-text border-l-4 border-yellow-400">
        {caption}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 text-black font-mono font-black text-[11px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Gekopieerd!' : 'Kopieer captie'}</span>
        </button>

        {supportsWebShare && (
          <button
            type="button"
            onClick={handleShare}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 active:translate-x-0.5 active:translate-y-0.5 text-black font-mono font-bold text-[11px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Delen</span>
          </button>
        )}
      </div>

      <div className="mt-2 text-[9px] font-mono text-zinc-500">
        ✦ Plak in TikTok / Instagram Reels / Story en tag je vriend(in) bij de bon
      </div>
    </div>
  );
}