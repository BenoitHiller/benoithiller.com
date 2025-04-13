import { Code } from 'bright';
import type { BrightProps } from 'bright';
import React from 'react';
import * as R from 'ramda';
import DotGraph from '@/components/DotGraph';

function isCodeElement(
  node: React.ReactNode
): node is React.ReactElement<React.JSX.IntrinsicElements['code'], 'code'> {
  return node instanceof Object && 'type' in node && node.type === 'code';
}

const codeOverrides: { [key: string]: React.FC<{ children: string }> } = {
  dot: DotGraph
};

const codeProps: Partial<BrightProps> = {
  titleClassName: 'bright-title'
};

/**
 * In place of the bright Code component check the language of the nested
 * code tag and if it is something that should be handled by a special
 * renderer defined in `codeOverrides` use that instead.
 *
 * The component should get the content of the code tag, not the outer pre tag
 * under the assumption that it is reasonable plaintext such as when coming
 * from MDX.
 */
const CodeWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  const childArray = React.Children.toArray(children);
  const firstChild = childArray?.[0];
  if (isCodeElement(firstChild)) {
    const { className, children } = firstChild.props;
    // To simplify creating the Components we restrict ourselves to just the
    // ideal case where we have simple chunk of text, such as what happens in
    // the case of a code block in mdx.
    if (typeof children === 'string') {
      const languageClass = R.match(/language-(\S+)/, className ?? '');

      const language = languageClass?.[1];
      if (language in codeOverrides) {
        const Component = codeOverrides[language];
        return <Component>{children}</Component>;
      }
    }
  }
  return <Code {...codeProps} {...props} />;
};

export default CodeWrapper;
