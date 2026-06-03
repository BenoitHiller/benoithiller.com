import type { Metadata } from 'next';
import urlHelper from '@/urlHelper';
import '@/app/globals.css';
import { metadataBase } from '@/sharedMetadata';
import ClientContext from '@/components/ClientContext';
import Link from 'next/link';
import Script from 'next/script';
import { M_PLUS_2, Cascadia_Code } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Benoit Hiller',
  description: 'The website of Benoit Hiller.',
  alternates: {
    types: {
      'application/rss+xml': urlHelper('/blog/rss.xml')
    }
  },
  metadataBase
};

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

function HeaderNavLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link className="text-md/6 text-gray-950" href={href}>
      {children}
    </Link>
  );
}

export default function Layout({
  children,
  print
}: Readonly<{ children: React.ReactNode; print: React.ReactNode }>) {
  return (
    <ClientContext>
      <html lang="en" className={`scroll-pt-18 ${mPlus.variable} ${cascadia.variable}`}>
        <body className="bg-body-background">
          {print}
          <header className="non-printable fixed inset-x-0 z-10 bg-white border-b border-gray-950/5">
            <div className="container mx-auto">
              <nav className="mx-6 flex h-14 gap-4 items-center">
                <HeaderNavLink href="/">Home</HeaderNavLink>
                <HeaderNavLink href="/blog">Blog</HeaderNavLink>
              </nav>
            </div>
          </header>
          <section className="non-printable pt-14 min-h-dvh container mx-auto max-lg:w-min">
            <div className="max-xl:max-w-dvw">{children}</div>
          </section>
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        </body>
      </html>
    </ClientContext>
  );
}
