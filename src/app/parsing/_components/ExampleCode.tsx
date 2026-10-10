import { cache } from 'react';
import { CodeComponent } from '@/components/Code';
import util from 'util';
import { execFile } from 'child_process';
import path from 'path';

const exec = util.promisify(execFile);

const scriptPath = path.resolve(process.env.articlePath!, '../_lr_examples/bin/source_of');

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
  const { source } = await getSource(identifier);

  return <CodeComponent code={source} lang="ruby" />;
};

export default ExampleCode;
