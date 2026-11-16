import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function HoneypotTrap() {
  return (
    <main>
      <h1>Not found</h1>
    </main>
  );
}
