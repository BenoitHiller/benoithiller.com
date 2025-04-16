import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import FontFallbackDefinition from '@/components/FontFallbackDefinition';
import './globals.css';
import { metadataBase } from '@/sharedMetadata';
import ClientContext from '@/components/ClientContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

// Using a local copy of this font rather than the one from next/font/google
// because the latter completely trashes the font when it converts it into a
// bunch of woff2 files. See https://github.com/vercel/next.js/issues/78118
const nanumCoding = localFont({
  src: './NanumGothicCoding-Bold.ttf',
  display: 'swap',
  weight: '700',
  variable: '--font-nanum-coding',
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: 'Benoit Hiller',
  description: 'The website of Benoit Hiller.',
  metadataBase
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientContext>
      <html lang="en" className={`scroll-pt-18 ${inter.variable} ${nanumCoding.variable}`}>
        <head>
          <FontFallbackDefinition />
        </head>
        <body>{children}</body>
      </html>
    </ClientContext>
  );
}
