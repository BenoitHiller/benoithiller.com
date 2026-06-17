import codeTheme from './theme';
import { createHighlighter, bundledLanguages } from 'shiki';
import type { Highlighter } from 'shiki';

const highlighter = createHighlighter({
  themes: [codeTheme],
  langs: Object.keys(bundledLanguages)
});

type ConfigArgument = Parameters<Highlighter['codeToHast']>[1];

async function codeToHast(code: string, config: ConfigArgument) {
  const instance = await highlighter;
  return await instance.codeToHast(code, config);
}

export { codeToHast };
