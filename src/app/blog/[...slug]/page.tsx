import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';

import TableOfContents from './TableOfContents';
import Footer from './Footer';
import * as TwoColumns from '@/components/TwoColumns';
import { Bibliography, CitationProvider } from '@/components/Citation';

import * as blogDb from '@/data/blog';

export const dynamicParams = false;

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
        <TwoColumns.Left className="w-64 max-h2-dvh/14" padding={false} hideable>
          <TableOfContents
            className="py-6 max-h2-100%/14 fixed scrollbar-thin overflow-y-auto"
            entries={tableOfContents}
            addReferences={!!references}
          />
        </TwoColumns.Left>
        <TwoColumns.Right Element="article">
          <div className="prose max-md:w-full">
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
