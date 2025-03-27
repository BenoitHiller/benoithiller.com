import Link from 'next/link';

function HeaderNavLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link className="text-md/6 text-gray-950" href={href}>
      {children}
    </Link>
  );
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
    </>
  );
}
