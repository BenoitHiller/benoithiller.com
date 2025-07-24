import path from 'path';
import url from 'url';
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import EvalSourceMapDevToolPlugin from 'next/dist/build/webpack/plugins/eval-source-map-dev-tool-plugin';

const rootPath = path.resolve(__dirname);
const development = process.env.NODE_ENV === 'development';

// just going to define this myself because the types are a bit of a nightmare
// and give up without providing this level of specificity anyway.
interface SourceMapData {
  absoluteResourcePath: string;
}

/**
 * Replace aboslute paths that would get transformed into file:// paths later
 * and thus not work in Windows.
 */
function fixSourceMapFilenames(data: SourceMapData): string {
  // Note that at this point the paths haven't gotten transformed into file://
  // urls. That seems to happen at some later point. Trying to find where has
  // been a nightmare unfortunately so this is the solution we end up with.
  const absoluteResourcePath: string = data.absoluteResourcePath;

  const srcPath = path.join(rootPath, 'src');
  if (absoluteResourcePath.startsWith(srcPath)) {
    const relativePath = path.relative(srcPath, absoluteResourcePath);
    const sourceUrl = url.resolve(process.env.NEXT_PUBLIC_BASE_URL!, '/_dev_source/');
    return url.resolve(sourceUrl, relativePath);
  }
  return data.absoluteResourcePath;
}

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
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader'
    });
    if (development) {
      // attach our code to replace file:// source paths in development.
      for (const plugin of config.plugins) {
        // Unfortunately configuring loader details is still only
        // semi-supported and requires reaching deep into the existing loader
        // source like this.
        if (plugin instanceof EvalSourceMapDevToolPlugin) {
          plugin.moduleFilenameTemplate = fixSourceMapFilenames;
        }
      }
    }

    return config;
  }
};

const rehypePlugins = [
  ['rehype-slug'],
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
    rehypePlugins: rehypePlugins as any
  }
});

export default withMDX(nextConfig);
