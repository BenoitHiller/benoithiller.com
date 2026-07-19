import PostList from '@/components/BlogPostList';
import Card from '@/components/Card';
import * as TwoColumns from '@/components/TwoColumns';
import { H2 } from '@/components/BlogHeading';

async function Page() {
  return (
    <TwoColumns.Layout>
      <TwoColumns.Left className="prose pr-6 lg:w-lg">
        <H2>About</H2>
        <p>This is Benoit Hiller's personal portfolio website and blog.</p>
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
        <H2>Portfolio</H2>
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
        <H2 href="/blog">Blog Posts</H2>
        <PostList />
      </TwoColumns.Right>
    </TwoColumns.Layout>
  );
}

export default Page;
