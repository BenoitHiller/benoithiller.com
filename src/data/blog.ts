import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';
import type { Toc } from '@stefanprobst/rehype-extract-toc';
import git from 'isomorphic-git';
import * as R from 'ramda';

interface Metadata {
  title: string;
  description: string;
  publishedAt?: Date;
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  Component: React.FC;
  tableOfContents: Toc;
  publishedAt?: Date;
  updatedAt?: Date;
}

interface BlogImport {
  default: React.FC;
  metadata: Metadata;
  tableOfContents: Toc;
}

const listFiles = cache(async () => {
  const blogPath = process.env.blogPath;
  if (!blogPath) {
    throw 'Please specify env.blogPath to build blog posts';
  }
  return await fs.readdir(blogPath);
});

const importPost: (slug: string) => Promise<BlogImport> = async (slug) =>
  await import(`@/blog/${slug}.mdx`);

const get: (slug: string) => Promise<BlogPost> = cache(async (slug) => {
  const { default: Component, metadata, tableOfContents } = await importPost(slug);

  const { title, description, publishedAt } = metadata;

  const filepath = path.join(process.env.blogPath!, `${slug}.mdx`);
  const gitRoot = process.env.rootPath!;
  const relativePath = path.relative(gitRoot, filepath);

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

const list: () => Promise<BlogPost[]> = cache(async () => {
  const paths = await listFiles();
  const postPromises = paths.map(async (entry) => {
    const slug = path.parse(entry).name;

    return get(slug);
  });

  const posts = await Promise.all(postPromises);
  return R.sort(
    R.descend<BlogPost>(({ publishedAt }) => publishedAt?.valueOf() ?? Infinity),
    posts
  );
});

export type { BlogPost };
export { get, list, listFiles };
