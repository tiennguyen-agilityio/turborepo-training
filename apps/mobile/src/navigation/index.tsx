import { StatusBar, useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Providers
import { TamaguiProviderMobile } from "@packages/ui/providers/TamaguiProviderMobile";

// Stacks | Screens
import { SignInScreen } from "../screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Navigation = () => {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <TamaguiProviderMobile>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
            />
            <SignInScreen />
          </TamaguiProviderMobile>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};
