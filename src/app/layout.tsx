import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Benoit Hiller',
  description: 'The website of Benoit Hiller.'
};

function HeaderNavLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link className="text-md/6 text-gray-950" href={href}>
      {children}
    </Link>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-pt-18 ${inter.variable}`}>
      <body>
        <header className="fixed inset-x-0 z-10 bg-white border-b border-gray-950/5">
          <div className="container mx-auto">
            <nav className="mx-6 flex h-14 gap-4 items-center">
              <HeaderNavLink href="/">Home</HeaderNavLink>
              <HeaderNavLink href="/blog">Blog</HeaderNavLink>
            </nav>
          </div>
        </header>
        <section className="pt-14 min-h-dvh container mx-auto">
          <div className="max-md:max-w-dvw">{children}</div>
        </section>
      </body>
    </html>
  );
}
