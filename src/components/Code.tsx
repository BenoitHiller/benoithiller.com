import React from 'react';
import * as R from 'ramda';
import DotGraph from '@/components/DotGraph';
import codeTheme from '@/components/codeTheme';
import { createHighlighter, bundledLanguages } from 'shiki';
import type { ShikiTransformer } from 'shiki';
import type { JSX } from 'react';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

const DEFAULT_STYLE = `color:${codeTheme.colors!['editor.foreground']}`;
const codeOverrides: { [key: string]: React.FC<{ children: string }> } = {
  dot: DotGraph
};

const highlighter = createHighlighter({
  themes: [codeTheme],
  langs: Object.keys(bundledLanguages)
});

interface ParsedCode {
  code: string;
  lang: string;
  title?: string;
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
  const hast = await (
    await highlighter
  ).codeToHast(code, {
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
      pre: (props) => (
        <pre {...props} className="expand-to-edge mt-0 mb-0 max-md:py-6 md:py-8 rounded-none" />
      ),
      code: (props) => <code {...props} className="block pr-6" />
    }
  }) as JSX.Element;
};

const CodeWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;
  const parsed = parseChildren(children);

  const { lang, code } = parsed;

  if (lang in codeOverrides) {
    const Component = codeOverrides[lang];
    return <Component>{code}</Component>;
  } else {
    return <Code lang={lang} code={code} />;
  }
};

export default CodeWrapper;
