import { cache } from 'react';
import fs from 'fs/promises';
import TableOfContents from '@/components/TableOfContents';
import Navigation from '@/app/parsing/_components/Navigation';

export const dynamicParams = false;

const listPages = cache(async () => {
  return await Array.fromAsync(fs.glob('./*/page.mdx', { cwd: process.env.articlePath! }));
});

const getToc = cache(async (slug: string) => {
  const page = await import(`../../../(articles)/${slug}/page.mdx`);
  return page.tableOfContents;
});

async function generateStaticParams() {
  const paths = await listPages();

  return paths.map((entry) => ({
    slug: entry.replace(/^\.\/(.*)\/page.mdx/, '$1').split('/')
  }));
}

async function Page(props: PageProps<'/parsing/[...slug]'>) {
  const { slug } = await props.params;
  const tableOfContents = await getToc(slug.join('/'));

  return (
    <>
      <Navigation />
      <TableOfContents addReferences entries={tableOfContents} />
    </>
  );
}

export { generateStaticParams };
export default Page;
