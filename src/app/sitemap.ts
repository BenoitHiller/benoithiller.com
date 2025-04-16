import type { MetadataRoute } from 'next';
import { resolve } from 'url';
import * as blogDb from '@/data/blog';

// This isn't yet inferred correctly in cases where output: 'export' is set
export const dynamic = 'force-static';

async function blogSitemap(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const posts = await blogDb.list();

  return posts.map(({ slug, publishedAt, updatedAt }) => ({
    url: resolve(baseUrl, `/blog/${slug}`),
    lastModified: updatedAt ?? publishedAt ?? new Date()
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const blogMap = await blogSitemap(baseUrl);
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: resolve(baseUrl, '/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    ...blogMap
  ];
}
