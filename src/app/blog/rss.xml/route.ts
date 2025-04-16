import RSS from 'rss';
import * as blogDb from '@/data/blog';
import { NextResponse } from 'next/server';
import urlHelper from '@/urlHelper';

export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse> {
  const posts = await blogDb.list();
  const feed = new RSS({
    title: "Benoit Hiller's Blog",
    site_url: urlHelper(),
    feed_url: urlHelper('/blog/rss.xml')
  });

  for (const { slug, title, description, publishedAt } of posts) {
    if (publishedAt != null && title != null && description != null) {
      feed.item({
        title,
        description,
        url: urlHelper(`/blog/${slug}`),
        date: publishedAt
      });
    }
  }

  return new NextResponse(feed.xml(), {
    // Set this to make things display nicely in development.
    //
    // Note that yes text/xml is correct from the perspective of a webserver.
    // Tragically application/rss+xml is not a registered mime type.
    headers: { 'content-type': 'text/xml' }
  });
}
