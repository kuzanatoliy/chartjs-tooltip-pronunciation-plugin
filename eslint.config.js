import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierRules from './.prettierrc.cjs';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist/*', 'coverage/*'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': [2, prettierRules],
    },
  }
);
