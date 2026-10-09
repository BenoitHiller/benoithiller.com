import { cache } from 'react';
import fs from 'fs/promises';
import TableOfContents from '@/components/TableOfContents';
import Navigation from '@/app/parsing/_components/Navigation';

export const dynamicParams = false;

const listPages = cache(async () => {
  return await Array.fromAsync(fs.glob('./*/page.mdx', { cwd: process.env.articlePath! }));
});

async function generateStaticParams() {
  const paths = await listPages();

  return paths.map((entry) => ({
    slug: entry.replace(/^\.\/(.*)\/page.mdx/, '$1').split('/')
  }));
}

async function Page(props: PageProps<'/parsing/[...slug]'>) {
  const { slug } = await props.params;
  const page = await import(`../../../(articles)/${slug.join('/')}/page.mdx`);

  return (
    <>
      <TableOfContents addReferences entries={page.tableOfContents} />
      <Navigation />
    </>
  );
}

export { generateStaticParams };
export default Page;
