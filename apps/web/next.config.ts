import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      "tailwindcss",
      "@storybook/nextjs",
      "@testing-library/react",
      "@testing-library/jest-dom",
    ],
  },
};

export default nextConfig;
