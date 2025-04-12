import { instance } from '@viz-js/viz';
import type { RenderOptions } from '@viz-js/viz';
import { use } from 'react';
import type React from 'react';
import styles from './DotGraph.module.css';

const promise = instance();

// Due to https://gitlab.com/graphviz/graphviz/-/issues/867 graphviz svgs
// render scaled up 33%. I'm hoping that just gets fixed soon so that I don't
// have to open up the output and adjust the height and width values.
//
// That means for now if I want the text to match the body text I need to set
// it as 12 (to get scaled up to 16).
const vizConfig: RenderOptions = {
  format: 'svg',
  graphAttributes: { fontsize: 12 },
  nodeAttributes: { fontsize: 12, penwidth: 0.5 },
  edgeAttributes: { fontsize: 12, penwidth: 0.5 }
};

const DotGraph: React.FC<{ children: string }> = ({ children }) => {
  const viz = use(promise);
  const svg = viz.render(children, vizConfig);
  if (svg.status === 'failure') {
    return <div>{svg.errors.map(({ level, message }) => `${level}: ${message}\n`)}</div>;
  } else {
    return <figure className={styles.graph} dangerouslySetInnerHTML={{ __html: svg.output }} />;
  }
};

export default DotGraph;
