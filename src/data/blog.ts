import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';
import type { Toc } from '@stefanprobst/rehype-extract-toc';
import git from 'isomorphic-git';
import * as R from 'ramda';

/**
 * Metadata object exported inside the post pages.
 *
 * This is just applied to whatever the file exports so everything is optional
 * to account for that.
 */
interface Metadata {
  title?: string;
  description?: string;
  publishedAt?: Date;
}

interface BlogPost {
  slug: string;
  title?: string;
  description?: string;
  Component: React.FC;
  tableOfContents: Toc;
  publishedAt?: Date;
  updatedAt?: Date;
}

/**
 * Type to represent the fields available on an import of a blog page.
 *
 * It is important to note that the only non optional fields must be those
 * guaranteed to be provided by the current MDX setup. In this case that is the
 * default export and the tableOfContents added by the plugin.
 */
interface BlogImport {
  default: React.FC;
  metadata?: Metadata;
  tableOfContents: Toc;
}

/**
 * List the filenames for each blog entry in the order returned by fs.readdir.
 */
const listFiles = cache(async () => {
  return await fs.readdir(process.env.blogPath!);
});

/**
 * Helper to import a blog page by slug and to cast it into the BlogImport type.
 */
const importPost: (slug: string) => Promise<BlogImport> = async (slug) =>
  await import(`@/blog/${slug}.mdx`);

/**
 * Get the full BlogPost object for a given blog page
 * @param {string} slug - the slug of the blog page to fetch.
 */
const get: (slug: string) => Promise<BlogPost> = cache(async (slug) => {
  const { default: Component, metadata, tableOfContents } = await importPost(slug);

  const { title, description, publishedAt } = metadata ?? {};

  const filepath = path.join(process.env.blogPath!, `${slug}.mdx`);
  const gitRoot = process.env.rootPath!;
  const relativePath = path.relative(gitRoot, filepath);

  // This is technically very slow and while it will be possible to get away
  // with this for a while given that site is statically rendered. At some
  // point the long compile times will become annoying warranting a change, but
  // that will be when I've written a lot more posts.
  const commits = await git.log({
    fs,
    dir: gitRoot,
    filepath: relativePath,
    depth: 1,
    force: true
  });

  let updatedAt;

  if (commits.length) {
    const lastCommit = commits[0];
    updatedAt = new Date(lastCommit.commit.committer.timestamp * 1000);
  }

  return {
    slug,
    title,
    description,
    Component,
    tableOfContents,
    publishedAt: publishedAt ?? updatedAt,
    updatedAt
  };
});

/**
 * Fetch the BlogPost for every file returned by listFiles().
 */
const list: () => Promise<BlogPost[]> = cache(async () => {
  const paths = await listFiles();
  const postPromises = paths.map(async (entry) => {
    const slug = path.parse(entry).name;

    return get(slug);
  });

  const posts = await Promise.all(postPromises);
  // Note: at some point it will make sense to add filtering of unpublished
  // posts. For now they are just not pushed up to the main branch.
  return R.sort(
    R.descend<BlogPost>(({ publishedAt }) => publishedAt?.valueOf() ?? Infinity),
    posts
  );
});

export type { BlogPost };
export { get, list, listFiles };
