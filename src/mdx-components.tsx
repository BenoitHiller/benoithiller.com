import type { MDXComponents } from 'mdx/types';
import Code from '@/components/Code';
import { H2, H3, H4 } from '@/components/BlogHeading';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: H2,
    h3: H3,
    h4: H4,
    pre: Code
  };
}
