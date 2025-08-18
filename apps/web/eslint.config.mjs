import config from "@repo/eslint-config/next-js";

export default [
	...config,
	{
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        // Disable type-aware linting in pre-commit
        project: false
      }
    }
  }
];
