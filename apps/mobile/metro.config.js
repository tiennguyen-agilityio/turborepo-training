const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

// Absolute path to the monorepo root
const monorepoRoot = path.resolve(__dirname, "../../..");

// Force Metro to always use the same React + React Native
const extraNodeModules = {
  react: path.resolve(monorepoRoot, "node_modules/react"),
  "react-native": path.resolve(monorepoRoot, "node_modules/react-native"),
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [monorepoRoot],

  resolver: {
    // Ensures metro can find modules hoisted to the root node_modules
    nodeModulesPaths: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
    ],

    unstable_enableSymlinks: true,
    extraNodeModules,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
