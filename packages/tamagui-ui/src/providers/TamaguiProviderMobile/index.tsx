import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme, type TamaguiProviderProps } from "tamagui";

import { config } from "@packages/tamagui/config";

import { useThemeStore } from "@repo/hooks/useThemeStore";

export const TamaguiProviderMobile = ({
  children,
  ...rest
}: TamaguiProviderProps) => {
  const colorScheme = useColorScheme();
  const theme = useThemeStore((state) => state.theme);

  return (
    <TamaguiProvider config={config} {...rest}>
      <Theme name={theme || colorScheme}>{children}</Theme>
    </TamaguiProvider>
  );
};
