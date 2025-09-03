"use client";

import { TamaguiProvider, Theme, type TamaguiProviderProps } from "tamagui";
import { ToastProvider, ToastViewport } from "@tamagui/toast";

import { config } from "@packages/tamagui/config";

import { useThemeStore } from "@repo/hooks/useThemeStore";
import Toast from "../../components/Toast";

export const TamaguiProviderWeb = ({
  children,
  ...rest
}: TamaguiProviderProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <TamaguiProvider config={config} defaultTheme={theme || "light"} {...rest}>
      <ToastProvider swipeDirection="horizontal">
        <Theme name={theme || "light"}>
          {children}
          <Toast />
          <ToastViewport bottom="$5" right="$5" portalToRoot />
        </Theme>
      </ToastProvider>
    </TamaguiProvider>
  );
};
