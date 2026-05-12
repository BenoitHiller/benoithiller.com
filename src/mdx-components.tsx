import type { MDXComponents } from 'mdx/types';
import Code from '@/components/Code';
import { H2, H3, H4, H5 } from '@/components/BlogHeading';

const Table: React.FC = (props) => (
  <table className="border-collapse border border-gray-400" {...props} />
);
const THead: React.FC = (props) => <thead className="bg-gray-50" {...props} />;
const TH: React.FC = (props) => <th className="text-left p-3 border border-gray-300" {...props} />;
const TD: React.FC = (props) => <td className="text-left p-3 border border-gray-300" {...props} />;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    pre: Code,
    table: Table,
    thead: THead,
    th: TH,
    td: TD
  };
}
