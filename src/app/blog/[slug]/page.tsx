import type { Metadata } from 'next';

import fs from 'fs/promises';
import path from 'path';
import TableOfContents from './TableOfContents';

type Params = { slug: string };
type Props = {
  params: Promise<Params>;
};

const dynamicParams = false;

async function generateStaticParams() {
  const blogPath = process.env.blogPath;
  if (!blogPath) {
    throw 'Please specify env.blogPath to build blog posts';
  }
  const paths = await fs.readdir(blogPath);

  return paths.map((entry) => ({ slug: path.parse(entry).name }));
}

async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title } = await import(`@/blog/${slug}.mdx`);

  return {
    title
  };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const { default: Post, title, tableOfContents } = await import(`@/blog/${slug}.mdx`);

  return (
    <div className="flex gap-8 mx-6">
      <section className="w-64 pt-6 justify-self-stretch max-lg:hidden border-r border-gray-950/5">
        <TableOfContents className="fixed" entries={tableOfContents} />
      </section>
      <article className="prose max-md:max-w-full pt-6">
        <h1>{title}</h1>
        <Post />
      </article>
    </div>
  );
}

export { dynamicParams, generateStaticParams, generateMetadata };
export default Page;
