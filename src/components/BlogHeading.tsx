import Link from 'next/link';
type HeadingComponent = React.FC<{ id?: string; href?: string; children: React.ReactNode }>;

const BlogHeading: React.FC<{
  Component: React.ElementType;
  className?: string;
  id?: string;
  children: React.ReactNode;
  href?: string;
  border?: boolean;
}> = ({ children, id, Component, className = '', href, border = true }) => {
  let content = children;

  if (href) {
    content = <Link href={href}>{content}</Link>;
  }

  content = (
    <Component id={id} className="mb-0 mt-0">
      {content}
    </Component>
  );

  return (
    <div
      className={`heading heading-${Component} prose-spacing collapse-after expand-to-edge max-lg:wplus-12 lg:wplus-18 ${className} ${border ? 'border-b-1 border-b-gray-950/5' : ''}`}
    >
      {content}
    </div>
  );
};

const H2: HeadingComponent = (props) => (
  <BlogHeading Component="h2" className="pb-5 mt-5 mb-7" {...props} />
);
const H3: HeadingComponent = (props) => (
  <BlogHeading Component="h3" className="pb-4 mt-5" {...props} />
);
const H4: HeadingComponent = (props) => (
  <BlogHeading Component="h4" className="pb-4 mt-5" {...props} />
);
const H5: HeadingComponent = (props) => (
  <BlogHeading Component="h5" className="mt-5" border={false} {...props} />
);

export { H2, H3, H4, H5 };
export default BlogHeading;
