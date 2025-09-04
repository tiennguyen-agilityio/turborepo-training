import { defineConfig } from "eslint/config";
import pluginRN from "eslint-plugin-react-native";
import baseConfig from "./base.js";

export default defineConfig([
  ...baseConfig,
  {
    plugins: {
      "react-native": pluginRN,
    },
    rules: {
      ...pluginRN.configs.all.rules,
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",
    },
    languageOptions: {
      globals: {
        ...pluginRN.environments["react-native"].globals,
      },
    },
  },
  {
    files: ["*.config.js", ".*.js", "jest.config.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
