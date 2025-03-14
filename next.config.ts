import path from 'path';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  env: {
    blogPath: path.resolve(__dirname, 'src/blog')
  }
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      ['rehype-slug'],
      ['@stefanprobst/rehype-extract-toc'],
      ['@stefanprobst/rehype-extract-toc/mdx']
    ]
  }
});

export default withMDX(nextConfig);
