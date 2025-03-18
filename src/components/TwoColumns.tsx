const Left: React.FC<{ children: React.ReactNode; className?: string; hideable?: unknown }> = ({
  children,
  className,
  hideable = false
}) => (
  <section
    className={`pt-6 justify-self-stretch ${hideable && 'max-lg:hidden'} lg:border-r border-gray-950/5 ${className}`}
  >
    {children}
  </section>
);
const Right: React.FC<{
  children: React.ReactNode;
  className?: string;
  Element?: React.ElementType;
}> = ({ children, className, Element = 'section' }) => (
  <Element className={`max-md:max-w-full pt-6 ${className}`}>{children}</Element>
);

const Layout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => <div className={`flex max-lg:flex-col lg:gap-8 mx-6 ${className}`}>{children}</div>;

export { Layout, Left, Right };
