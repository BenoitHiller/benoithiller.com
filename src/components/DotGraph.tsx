import { instance } from '@viz-js/viz';
import { use } from 'react';

const promise = instance();

const DotGraph: React.FC<{ children: string }> = ({ children }) => {
  const viz = use(promise);
  const svg = viz.render(children, { format: 'svg' });
  if (svg.status === 'failure') {
    return <div>{svg.errors.map(({ level, message }) => `${level}: ${message}\n`)}</div>;
  } else {
    return <figure dangerouslySetInnerHTML={{ __html: svg.output }} />;
  }
};

export default DotGraph;
