import { defineConfig } from "eslint/config";

import baseConfig from './base.js';

export default defineConfig([
	...baseConfig,
	{
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/storybook-static/**",
    ],
	}
]);
