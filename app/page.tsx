import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { HoroscoopApp } from '@/components/HoroscoopApp';
import { constructZodiacMetadata } from '@/lib/seo-helpers';
import { RefreshCw } from 'lucide-react';

// Statische export: geen dynamische generateMetadata (searchParams) op de homepage.
// De ?sign= deep-links worden client-side afgehandeld via useSearchParams in HoroscoopApp.
export const metadata: Metadata = constructZodiacMetadata(undefined, '/');

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-yellow-400 font-mono">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>KOSMISCHE THERMISCHE KASSA START OP...</span>
          </div>
        </div>
      }
    >
      <HoroscoopApp />
    </Suspense>
  );
}