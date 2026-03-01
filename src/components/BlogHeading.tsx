type HeadingComponent = React.FC<{ id?: string; children: React.ReactNode }>;

const BlogHeading: React.FC<{
  Component: React.ElementType;
  className?: string;
  id?: string;
  children: React.ReactNode;
}> = ({ children, id, Component, className = '' }) => (
  <div
    className={`heading heading-${Component} expand-to-edge max-md:wplus-12 md:wplus-18 ${className} border-b-1 border-b-gray-950/5`}
  >
    <Component id={id} className="mb-0 mt-0">
      {children}
    </Component>
  </div>
);

const H2: HeadingComponent = (props) => (
  <BlogHeading Component="h2" className="pb-5 mt-5 mb-7" {...props} />
);
const H3: HeadingComponent = (props) => (
  <BlogHeading Component="h3" className="pb-4 mt-5" {...props} />
);

export { H2, H3 };
export default BlogHeading;
