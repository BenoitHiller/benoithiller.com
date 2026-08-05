import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/vendor/Temml-Latin-Modern.css';

import TableOfContents from './TableOfContents';
import Footer from './Footer';
import * as TwoColumns from '@/components/TwoColumns';
import { Bibliography, CitationProvider } from '@/components/Citation';

import * as blogDb from '@/data/blog';

export const dynamicParams = false;

const latinModernMath = localFont({
  variable: '--font-math',
  src: '../../../vendor/latinmodern-math-1959/otf/latinmodern-math.otf'
})

async function generateStaticParams() {
  const paths = await blogDb.listFiles();

  return paths.map((entry) => ({ slug: entry.split('/') }));
}

async function generateMetadata({ params }: PageProps<'/blog/[...slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const { title, description } = await blogDb.get(slug);

  return {
    title,
    description
  };
}

async function Page({ params }: PageProps<'/blog/[...slug]'>) {
  const { slug } = await params;
  const post = await blogDb.get(slug);
  const { Component, title, tableOfContents, references } = post;

  return (
    <CitationProvider value={references ?? []}>
      <TwoColumns.Layout>
        <TwoColumns.Left className="w-68 max-h2-dvh/14 shrink-0" padding={false} hideable>
          <TableOfContents
            className="py-6 pr-2 h2-100%/14 fixed scrollbar-thin overflow-y-auto"
            entries={tableOfContents}
            addReferences={!!references}
          />
        </TwoColumns.Left>
        <TwoColumns.Right Element="article" className="md:max-w2-100%/80">
          <div className={`prose max-sm:w-full ${latinModernMath.variable}`}>
            <h1>{title ?? slug.join('/')}</h1>
            <Component />
            {references && <Bibliography />}
          </div>
          <Footer post={post} />
        </TwoColumns.Right>
      </TwoColumns.Layout>
    </CitationProvider>
  );
}

export { generateStaticParams, generateMetadata };
export default Page;
