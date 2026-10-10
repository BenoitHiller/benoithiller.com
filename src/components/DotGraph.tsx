import { instance } from '@viz-js/viz';
import type { RenderOptions } from '@viz-js/viz';
import { use } from 'react';
import type React from 'react';
import styles from './DotGraph.module.css';

const promise = instance();

// Due to https://gitlab.com/graphviz/graphviz/-/issues/867 graphviz svgs
// render scaled up 33%.
//
// Now that I've started running into issues with layout as a result of the incorrect scaling,
// rather than just font rendering problems, I've given in and done the following to remove the
// incorrect use of `pt` in the output sizes.
//
// This is in general a very brittle way to do this, but given that the output of viz-js is
// consistent about how it renders these attributes. This code will be stable at least given that
// the viz-js version and most of the configuration options are unchanged.
function fixSizes(input: string): string {
  return input.replace(/<svg width="([^"]*)pt" height="([^"]*)pt"/, '<svg width="$1" height="$2"');
}

const vizConfig: RenderOptions = {
  format: 'svg_inline',
  graphAttributes: { fontsize: '18.0', bgcolor: 'transparent' },
  nodeAttributes: { fontsize: '18.0' },
  edgeAttributes: { fontsize: '18.0' }
};

const DotGraph: React.FC<{ children: string; meta: { title?: React.ReactNode } }> = ({
  children,
  meta: { title }
}) => {
  const viz = use(promise);
  const svg = viz.render(children, vizConfig);
  if (svg.status === 'failure') {
    return <div>{svg.errors.map(({ level, message }) => `${level}: ${message}\n`)}</div>;
  } else {
    return (
      <figure className={`prose-spacing ${styles.graph}`}>
        <div
          className="w-full *:w-full font-mono text-[18px]"
          dangerouslySetInnerHTML={{ __html: fixSizes(svg.output) }}
        />
        {title && <figcaption className="mt-3 text-center">{title}</figcaption>}
      </figure>
    );
  }
};

export default DotGraph;
