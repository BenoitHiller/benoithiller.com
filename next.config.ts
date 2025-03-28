import path from 'path';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  env: {
    blogPath: path.resolve(__dirname, 'src/blog'),
    rootPath: path.resolve(__dirname)
  },
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

const rehypePlugins = [
  ['rehype-slug'],
  ['@stefanprobst/rehype-extract-toc'],
  ['@stefanprobst/rehype-extract-toc/mdx']
];

const withMDX = createMDX({
  options: {
    // createMDX doesn't seem to support the string plugin definitions in its
    // types even though the underlying code does. For now I'm forcing a type
    // match here to resolve the issue.
    //
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehypePlugins: rehypePlugins as any
  }
});

export default withMDX(nextConfig);
