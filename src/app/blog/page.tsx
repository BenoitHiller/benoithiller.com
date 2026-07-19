import PostList from '@/components/BlogPostList';

async function Page() {
  return (
    <div className="prose collapse-inside m-6">
      <h1>Blog Posts</h1>
      <PostList />
    </div>
  );
}

export default Page;
