import PostList from '@/components/BlogPostList';
import Card from '@/components/Card';
import * as TwoColumns from '@/components/TwoColumns';
import Link from 'next/link';

async function Page() {
  return (
    <TwoColumns.Layout>
      <TwoColumns.Left className="prose pr-6 lg:w-lg">
        <h2>About</h2>
        <p>This is Benoit Hiller's personal portfolio website and and blog.</p>
        <p>
          I've selected a few samples of my recent work available on GitHub in the Portfolio
          section. You can find a link to my full profile below.
        </p>
        <dl>
          <dt className="inline">GitHub:</dt>
          <dd className="inline">
            <a href="https://github.com/BenoitHiller">BenoitHiller</a>
          </dd>
        </dl>
      </TwoColumns.Left>
      <TwoColumns.Right className="prose">
        <h2>Portfolio</h2>
        <Card
          title="benoithiller.com"
          href="https://github.com/BenoitHiller/benoithiller.com"
          tags="React TypeScript Next.js"
        >
          The source code for this website.
        </Card>
        <Card
          title="BenoitHiller/git-bin"
          href="https://github.com/BenoitHiller/git-bin"
          tags="bash git"
        >
          My collection of custom git scripts for performing actions like search and replace across
          a whole repository.
        </Card>
        <hr />
        <Link href="/blog" className="no-underline">
          <h2>Blog Posts</h2>
        </Link>
        <PostList />
      </TwoColumns.Right>
    </TwoColumns.Layout>
  );
}

export default Page;
