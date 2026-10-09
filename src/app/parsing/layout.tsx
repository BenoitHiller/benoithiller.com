import localFont from 'next/font/local';
import '@/vendor/Temml-Latin-Modern.css';

import Footer from '@/components/Footer';
import * as TwoColumns from '@/components/TwoColumns';

const latinModernMath = localFont({
  variable: '--font-math',
  src: '../../vendor/latinmodern-math-1959/otf/latinmodern-math.otf'
});

export default function Layout({
  children,
  sidebar
}: Readonly<{ children: React.ReactNode; sidebar: React.ReactNode }>) {
  return (
    <TwoColumns.Layout>
      <TwoColumns.Left className="w-68 max-h2-dvh/14 shrink-0" padding={false} hideable>
        <div className="py-6 pr-2 h2-100%/14 fixed scrollbar-thin overflow-y-auto md:border-r border-gray-950/5 w-[inherit] flex flex-col gap-4">
          {sidebar}
        </div>
      </TwoColumns.Left>
      <TwoColumns.Right Element="article" className="md:max-w2-100%/80">
        <div className={`prose max-sm:w-full ${latinModernMath.variable}`}>{children}</div>
        <Footer />
      </TwoColumns.Right>
    </TwoColumns.Layout>
  );
}
