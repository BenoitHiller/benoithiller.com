import { cache } from 'react';
import { CodeComponent } from '@/components/Code';
import util from 'util';
import { execFile } from 'child_process';
import path from 'path';

const exec = util.promisify(execFile);

const examplesPath = path.resolve(process.env.articlePath!, '../_lr_examples');
const scriptPath = path.resolve(examplesPath, './bin/source_of');
const exampleUrlBase = `${process.env.lrExamplesRepo!}/blob/main`;

const getSource = cache(async (identifier: string) => {
  const { stdout } = await exec(scriptPath, [identifier]);
  const match = stdout.match(/^([^\n]*)\n([^\n]*)\n(.*)/s)!;

  return {
    sourceFile: match[1],
    line: match[2],
    source: match[3]
  };
});

const ExampleCode: React.FC<{ identifier: string }> = async ({ identifier }) => {
  const { sourceFile, line, source } = await getSource(identifier);
  const filename = `${path.relative(examplesPath, sourceFile)}#L${line}`;
  const sourceUrl = `${exampleUrlBase}/${filename}`;
  const title = (
    <a className="invisible-link" target="_blank" href={sourceUrl}>
      {filename}
    </a>
  );

  return <CodeComponent meta={{ title }} code={source} lang="ruby" />;
};

export default ExampleCode;
