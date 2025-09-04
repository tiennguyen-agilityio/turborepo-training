import { NextConfig } from "next";
import { withTamagui } from "@tamagui/next-plugin";

export default function createConfig(
  name: string,
  { defaultConfig }: { defaultConfig: NextConfig }
): NextConfig {
  const config: NextConfig = {
    ...defaultConfig,
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ibb.co",
          pathname: "/**",
        },
      ],
    },
    experimental: {
      optimizePackageImports: [
        "react",
        "react-dom",
        "next",
        "next-themes",
        "next/navigation",
        "next/link",
        "next/image",
        "@storybook/nextjs",
        "@testing-library/react",
        "@testing-library/jest-dom",
      ],
      externalDir: true,
    },
    transpilePackages: [
      "@tamagui/next-plugin",
      "@tamagui/next-theme",
      "@tamagui/config",
      "@tamagui/toast",
      "tamagui",
    ],
  };

  const tamaguiPlugin = withTamagui({
    config: "./tamagui.config.ts",
    components: ["tamagui"],
    appDir: true,
  });

  return {
    ...config,
    ...tamaguiPlugin(config),
  };
}
