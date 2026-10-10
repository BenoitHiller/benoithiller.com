import { defineConfig, globalIgnores } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    rules: {
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      // The Link component has extremely undesirable scroll behaviour, and given this is a static
      // site it doesn't add much to justify that.
      '@next/next/no-html-link-for-pages': 'off'
    }
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ])
]);

export default eslintConfig;
