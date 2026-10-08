import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HoroscoopApp } from '@/components/HoroscoopApp';
import { ZODIAC_SIGNS } from '@/lib/horoscoop-data';
import { constructZodiacMetadata, getZodiacSignBySlug } from '@/lib/seo-helpers';
import { RefreshCw } from 'lucide-react';

interface SterrenbeeldPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({
    slug: sign.slug,
  }));
}

export async function generateMetadata({ params }: SterrenbeeldPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug);

  if (!sign) {
    return constructZodiacMetadata(undefined, `/sterrenbeeld/${slug}`);
  }

  return constructZodiacMetadata(sign, `/sterrenbeeld/${sign.slug}`);
}

export default async function SterrenbeeldPage({ params }: SterrenbeeldPageProps) {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug);

  if (!sign) {
    notFound();
  }

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
      <HoroscoopApp defaultSignSlug={sign.slug} />
    </Suspense>
  );
}
