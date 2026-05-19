import type { Metadata } from 'next';
import { M_PLUS_2, Cascadia_Code } from 'next/font/google';
import FontFallbackDefinition from '@/components/FontFallbackDefinition';
import './globals.css';
import { metadataBase } from '@/sharedMetadata';
import ClientContext from '@/components/ClientContext';

// TODO: validate hinting is present
const mPlus = M_PLUS_2({
  subsets: ['latin'],
  variable: '--font-mplus'
});

// TODO: build fallback
const cascadia = Cascadia_Code({
  subsets: ['latin'],
  variable: '--font-cascadia',
  fallback: ['monospace']
});

export const metadata: Metadata = {
  title: 'Benoit Hiller',
  description: 'The website of Benoit Hiller.',
  metadataBase
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientContext>
      <html lang="en" className={`scroll-pt-18 ${mPlus.variable} ${cascadia.variable}`}>
        <head>
          <FontFallbackDefinition />
        </head>
        <body className="bg-body-background">{children}</body>
      </html>
    </ClientContext>
  );
}
