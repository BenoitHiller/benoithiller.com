import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = defineConfig([
  prettierRecommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:@next/next/recommended'),
  {
    rules: {
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }]
    }
  }
]);

export default eslintConfig;
