import {
  PortalProvider,
  TamaguiProvider,
  Theme,
  type TamaguiProviderProps,
} from "tamagui";

import { config } from "@packages/tamagui/config";

export const TamaguiProviderMobile = ({
  children,
  ...rest
}: TamaguiProviderProps) => {
  return (
    <TamaguiProvider config={config} defaultTheme="light" {...rest}>
      <PortalProvider shouldAddRootHost>
        <Theme name="light">{children}</Theme>
      </PortalProvider>
    </TamaguiProvider>
  );
};
