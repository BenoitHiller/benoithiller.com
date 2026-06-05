import classNames from 'classnames';

const Left: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hideable?: unknown;
}> = ({ children, className, padding = true, hideable = false }) => (
  <section
    className={classNames(
      'justify-self-stretch',
      'lg:border-r',
      'border-gray-950/5',
      { 'pt-6': padding, 'max-lg:hidden': hideable },
      className
    )}
  >
    {children}
  </section>
);
const Right: React.FC<{
  children: React.ReactNode;
  className?: string;
  Element?: React.ElementType;
}> = ({ children, className, Element = 'section' }) => (
  <Element className={classNames('max-md:max-w-full pt-6', className)}>{children}</Element>
);

const Layout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => <div className={classNames('flex max-lg:flex-col lg:gap-8 mx-6', className)}>{children}</div>;

export { Layout, Left, Right };
