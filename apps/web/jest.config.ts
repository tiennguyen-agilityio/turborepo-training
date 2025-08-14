import type { Config } from "jest";

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  verbose: true,
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    ".+\\.(png|jpg)$": "identity-obj-proxy",
    "^@root(.*)$": "<rootDir>/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};
export default createJestConfig(config);
