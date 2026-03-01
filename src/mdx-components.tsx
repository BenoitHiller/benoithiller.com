import type { MDXComponents } from 'mdx/types';
import Code from '@/components/Code';
import { H2, H3 } from '@/components/BlogHeading';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: H2,
    h3: H3,
    pre: Code
  };
}
