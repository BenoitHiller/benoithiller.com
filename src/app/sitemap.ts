import type { MetadataRoute } from 'next';
import * as blogDb from '@/data/blog';
import urlHelper from '@/urlHelper';

// This isn't yet inferred correctly in cases where output: 'export' is set
export const dynamic = 'force-static';

async function blogSitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await blogDb.list();

  return posts.map(({ slug, publishedAt, updatedAt }) => ({
    url: urlHelper(`/blog/${slug}`),
    lastModified: updatedAt ?? publishedAt ?? new Date()
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogMap = await blogSitemap();
  return [
    {
      url: urlHelper(),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: urlHelper('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    ...blogMap
  ];
}
