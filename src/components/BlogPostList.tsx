import * as blogDb from '@/data/blog';
import Card from '@/components/Card';

const PostList = async () => {
  const posts = await blogDb.list();

  return (
    <div>
      {posts.map(({ title, slug, description }) => (
        <Card key={slug} title={title ?? slug} href={`/blog/${slug}`}>
          {description}
        </Card>
      ))}
    </div>
  );
};

export default PostList;
