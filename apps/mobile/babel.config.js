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
          "@repo/constants": require("path").resolve(
            __dirname,
            "../../packages/constants/src"
          ),
          "@repo/hooks": require("path").resolve(
            __dirname,
            "../../packages/hooks/src"
          ),
        },
      },
    ],
  ],
};
