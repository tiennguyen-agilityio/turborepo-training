module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ["@babel/plugin-transform-runtime", { helpers: true, regenerator: true }],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@packages/tamagui": require("path").resolve(
            __dirname,
            "../../packages/tamagui/src"
          ),
          "@packages/ui": require("path").resolve(
            __dirname,
            "../../packages/ui/src"
          ),
          "@packages/stores": require("path").resolve(
            __dirname,
            "../../packages/stores/src"
          ),
          "@packages/constants": require("path").resolve(
            __dirname,
            "../../packages/constants/src"
          ),
          "@packages/hooks": require("path").resolve(
            __dirname,
            "../../packages/hooks/src"
          ),
          "@packages/utils": require("path").resolve(
            __dirname,
            "../../packages/utils/src"
          ),
          "@package/services": require("path").resolve(
            __dirname,
            "../../packages/services/src"
          ),
        },
      },
    ],
    "@babel/plugin-transform-export-namespace-from",
    "react-native-worklets/plugin",
  ],
};
