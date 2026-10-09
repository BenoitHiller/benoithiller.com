import type { BlogPost } from '@/data/blog';
import Footer from '@/components/Footer';

// Don't show updates for the first hour because I'm putting in the published
// at by hand.
const MINIMUM_UPDATE_BUFFER = 60 * 60 * 1000;

const BlogFooter: React.FC<{ post: BlogPost }> = ({ post: { publishedAt, updatedAt } }) => {
  let finalPublishedAt: Date | undefined;
  let finalUpdatedAt: Date | undefined;

  if (publishedAt != null && updatedAt != null) {
    finalPublishedAt = publishedAt;
    if (updatedAt.valueOf() - publishedAt.valueOf() > MINIMUM_UPDATE_BUFFER) {
      finalUpdatedAt = updatedAt;
    }
  } else {
    finalPublishedAt = publishedAt ?? updatedAt;
  }

  return <Footer publishedAt={finalPublishedAt} updatedAt={finalUpdatedAt} />;
};

export default BlogFooter;
