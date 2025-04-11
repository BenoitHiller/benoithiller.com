import type { Metadata } from 'next';

import path from 'path';
import TableOfContents from './TableOfContents';
import Footer from './Footer';
import * as TwoColumns from '@/components/TwoColumns';

import * as blogDb from '@/data/blog';

type Params = { slug: string };
type Props = {
  params: Promise<Params>;
};

export const dynamicParams = false;

async function generateStaticParams() {
  const paths = await blogDb.listFiles();

  return paths.map((entry) => ({ slug: path.parse(entry).name }));
}

async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title, description } = await blogDb.get(slug);

  return {
    title,
    description
  };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await blogDb.get(slug);
  const { Component, title, tableOfContents } = post;

  return (
    <TwoColumns.Layout>
      <TwoColumns.Left className="w-64" hideable>
        <TableOfContents className="fixed" entries={tableOfContents} />
      </TwoColumns.Left>
      <TwoColumns.Right Element="article">
        <div className="prose">
          <h1>{title ?? slug}</h1>
          <Component />
          <hr className="mt-10 mb-8" />
        </div>
        <Footer post={post} />
      </TwoColumns.Right>
    </TwoColumns.Layout>
  );
}

export { generateStaticParams, generateMetadata };
export default Page;
