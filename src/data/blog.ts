import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';
import type { Toc } from '@stefanprobst/rehype-extract-toc';

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  Component: React.FC;
  tableOfContents: Toc;
};

const listFiles = cache(async () => {
  const blogPath = process.env.blogPath;
  if (!blogPath) {
    throw 'Please specify env.blogPath to build blog posts';
  }
  return await fs.readdir(blogPath);
});

const get: (slug: string) => Promise<BlogPost> = cache(async (slug) => {
  const {
    default: Component,
    description,
    title,
    tableOfContents
  } = await import(`@/blog/${slug}.mdx`);

  return {
    slug,
    title,
    description,
    Component,
    tableOfContents
  };
});

const list: () => Promise<BlogPost[]> = cache(async () => {
  const paths = await listFiles();
  const postPromises = paths.map(async (entry) => {
    const slug = path.parse(entry).name;

    return get(slug);
  });

  return Promise.all(postPromises);
});

export type { BlogPost };
export { get, list, listFiles };
