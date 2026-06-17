import React from 'react';
import * as R from 'ramda';
import DotGraph from '@/components/DotGraph';
import classNames from 'classnames';
import type { ShikiTransformer } from 'shiki';
import type { JSX } from 'react';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import codeTheme from './theme';
import { codeToHast } from './highlighter';

const DEFAULT_STYLE = `color:${codeTheme.colors!['editor.foreground']}`;
const codeOverrides: { [key: string]: React.FC<{ children: string; meta: CodeMeta }> } = {
  dot: DotGraph
};

interface CodeMeta {
  title?: string;
}

interface ParsedCode {
  code: string;
  lang: string;
}

function isCodeElement(
  node: React.ReactNode
): node is React.ReactElement<React.JSX.IntrinsicElements['code'], 'code'> {
  return node instanceof Object && 'type' in node && node.type === 'code';
}

function parseChildren(children: React.ReactNode): ParsedCode {
  const childArray = React.Children.toArray(children);
  const firstChild = childArray?.[0];
  if (isCodeElement(firstChild)) {
    const { className, children } = firstChild.props;

    // To simplify creating the Components we restrict ourselves to just the
    // ideal case where we have simple chunk of text, such as what happens in
    // the case of a code block in mdx.
    if (typeof children === 'string') {
      const languageClass = R.match(/language-(\S+)/, className ?? '');

      const lang = languageClass?.[1] || 'text';

      return {
        lang,
        code: children.replace(/\n$/, '')
      };
    }
  }

  throw 'not implemented exception';
}

const removeRedundantSpans: ShikiTransformer = {
  enforce: 'post',
  line(line) {
    line.children = line.children.map((element) => {
      if (element.type === 'element') {
        if (element.properties['style'] === DEFAULT_STYLE && element.children.length === 1) {
          return element.children[0];
        }
      }
      return element;
    });
  }
};

const removeEmptyLines: ShikiTransformer = {
  enforce: 'post',
  code(node) {
    node.children = node.children.filter((line) => {
      if (line.type !== 'element') {
        return true;
      } else if (line.children.length) {
        return true;
      }

      return false;
    });
  }
};

const Code: React.FC<{ code: string; lang: string }> = async ({ code, lang }) => {
  const hast = await codeToHast(code, {
    lang,
    theme: 'hiller',
    mergeSameStyleTokens: true,
    transformers: [removeRedundantSpans, removeEmptyLines]
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      span: (props) => {
        // Wrapping the lines in span.line is pointless and adds a lot of nodes.
        // So we can just undo that.
        if (props.className === 'line') {
          return <>{props.children}</>;
        } else {
          return <span {...props} />;
        }
      },
      pre: (props) => <pre {...props} tabIndex={undefined} />,
      code: (props) => <code {...props} className="block w-min" />
    }
  }) as JSX.Element;
};

const CodeBox: React.FC<{ children: React.ReactNode; meta: CodeMeta }> = ({
  children,
  meta: { title }
}) => {
  return (
    <figure
      className={classNames(
        'expand-to-edge',
        {
          'max-md:pt-6': !title,
          'md:pt-8': !title
        },
        'max-md:pb-6',
        'md:pb-8',
        'overflow-x-auto',
        'pr-8',
        'prose-spacing',
        'collapse-before',
        'bg-ansi-black',
        'font-mono'
      )}
    >
      {title && <figcaption className="text-center text-ansi-gray pt-3">{title}</figcaption>}
      {children}
    </figure>
  );
};

const CodeWrapper: React.FC<{ children: React.ReactNode } & CodeMeta> = (props) => {
  const { children, ...rest } = props;
  const parsed = parseChildren(children);

  const { lang, code } = parsed;

  if (lang in codeOverrides) {
    const Component = codeOverrides[lang];
    return <Component meta={rest}>{code}</Component>;
  } else {
    return (
      <CodeBox meta={rest}>
        <Code lang={lang} code={code} />
      </CodeBox>
    );
  }
};

export default CodeWrapper;
