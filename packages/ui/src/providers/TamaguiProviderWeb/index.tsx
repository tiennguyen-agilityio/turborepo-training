"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  TamaguiProvider,
  Theme,
  ThemeName,
  type TamaguiProviderProps,
} from "tamagui";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { PortalProvider } from "@tamagui/portal";
import { NextThemeProvider, useThemeSetting } from "@tamagui/next-theme";

import { config } from "@packages/tamagui/config";

import Toast from "../../components/Toast";
import Loading from "../../components/Loading";

export const InnerProvider = ({ children, ...rest }: TamaguiProviderProps) => {
  const { resolvedTheme } = useThemeSetting();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <TamaguiProvider config={config} defaultTheme={resolvedTheme} {...rest}>
      <PortalProvider shouldAddRootHost>
        <ToastProvider swipeDirection="horizontal">
          <Theme name={resolvedTheme as ThemeName}>
            {isLoaded ? children : <Loading />}
            <Toast />
            <ToastViewport bottom="$5" right="$5" portalToRoot />
          </Theme>
        </ToastProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
};

export const TamaguiProviderWeb = ({ children }: { children: ReactNode }) => (
  <NextThemeProvider
    attribute="class"
    storageKey="app-theme"
    defaultTheme="light"
    enableSystem
  >
    <InnerProvider>{children}</InnerProvider>
  </NextThemeProvider>
);
