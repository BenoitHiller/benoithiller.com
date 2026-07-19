import path from 'path';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import type { KatexOptions } from 'katex';

const rootPath = path.resolve(__dirname);
const development = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  output: development ? undefined : 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  env: {
    blogPath: path.resolve(__dirname, 'src/blog'),
    rootPath,
    fallbackLocale: 'en-US',
    fallbackTimeZone: 'America/Toronto'
  },
  images: {
    unoptimized: true
  },
  turbopack: {
    rules: {
      '*.{yaml,yml}': {
        loaders: ['yaml-loader'],
        as: '*.js'
      }
    }
  }
};

const katexOptions: KatexOptions = {
  strict: false,
  macros: {
    '\\|': '\\,|\\,'
  }
};

const rehypePlugins = [
  ['rehype-slug'],
  ['rehype-katex', katexOptions],
  ['@stefanprobst/rehype-extract-toc'],
  ['@stefanprobst/rehype-extract-toc/mdx'],
  ['rehype-mdx-code-props']
];

const withMDX = createMDX({
  options: {
    // createMDX doesn't seem to support the string plugin definitions in its
    // types even though the underlying code does. For now I'm forcing a type
    // match here to resolve the issue.
    //
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehypePlugins: rehypePlugins as any,
    remarkPlugins: ['remark-gfm', 'remark-math']
  }
});

export default withMDX(nextConfig);
