import * as blogDb from '@/data/blog';
import Card from '@/components/Card';
import Datestamp from '@/components/Datestamp';

const PostList = async () => {
  const posts = await blogDb.list();

  return (
    <div>
      {posts.map(({ title, draft, publishedAt, slug, description }) => (
        <Card
          key={slug}
          title={title ?? slug}
          subTitle={publishedAt && <Datestamp value={publishedAt} />}
          href={`/blog/${slug}`}
          tags={draft ? 'Draft' : undefined}
        >
          {description}
        </Card>
      ))}
    </div>
  );
};

export default PostList;
