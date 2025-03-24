import * as blogDb from '@/data/blog';
import Card from '@/components/Card';
import Timestamp from '@/components/Timestamp';

const PostList = async () => {
  const posts = await blogDb.list();

  return (
    <div>
      {posts.map(({ title, publishedAt, slug, description }) => (
        <Card
          key={slug}
          title={title ?? slug}
          subTitle={publishedAt && <Timestamp date value={publishedAt} />}
          href={`/blog/${slug}`}
        >
          {description}
        </Card>
      ))}
    </div>
  );
};

export default PostList;
