import { defineConfig } from "eslint/config";
import pluginNext from "@next/eslint-plugin-next";

import baseConfig from "./base.js";

export default defineConfig([
  ...baseConfig,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/storybook-static/**",
    ],
  },
]);
