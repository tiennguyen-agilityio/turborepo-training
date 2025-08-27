"use client";

import { TamaguiProvider, Theme, type TamaguiProviderProps } from "tamagui";

import { config } from "@packages/tamagui/config";

import { useThemeStore } from "@repo/hooks/useThemeStore";

export const TamaguiProviderWeb = ({
  children,
  ...rest
}: TamaguiProviderProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <TamaguiProvider config={config} {...rest}>
      <Theme name={theme || "light"}>{children}</Theme>
    </TamaguiProvider>
  );
};
