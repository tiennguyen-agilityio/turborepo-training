import { StatusBar, useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Types
import { SCREENS } from "../types";

// Providers
import { TamaguiProviderMobile } from "@packages/ui/providers/TamaguiProviderMobile";

// Stores
import { useAuthStore } from "@packages/stores/auth";

// Stacks | Screens
import { SignInScreen } from "../screens";
import TabStack from "./TabStack";

const AppStack = createNativeStackNavigator();

export const Navigation = () => {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === "dark";
  const { sessionToken } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TamaguiProviderMobile>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <NavigationContainer>
            <AppStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {sessionToken ? (
                <AppStack.Screen
                  name={SCREENS.SIGN_IN}
                  component={SignInScreen}
                />
              ) : (
                <AppStack.Screen name={SCREENS.TABS} component={TabStack} />
              )}
            </AppStack.Navigator>
          </NavigationContainer>
        </TamaguiProviderMobile>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
