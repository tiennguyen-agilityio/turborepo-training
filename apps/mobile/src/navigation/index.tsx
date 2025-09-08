import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";

// Types
import { SCREENS } from "../types";

// Providers
import { TamaguiProviderMobile } from "@packages/ui/providers/TamaguiProviderMobile";

// Stores
import { useAuthStore } from "@packages/stores/auth";

// Stacks | Screens
import TabStack from "./TabStack";
import AuthStack from "./AuthStack";

const AppStack = createNativeStackNavigator();

export const Navigation = () => {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === "dark";
  const { sessionToken, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <TamaguiProviderMobile>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
            />
            <NavigationContainer>
              <AppStack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                {sessionToken ? (
                  <AppStack.Screen name={SCREENS.TABS} component={TabStack} />
                ) : (
                  <AppStack.Screen
                    name={SCREENS.AUTH_STACK}
                    component={AuthStack}
                  />
                )}
              </AppStack.Navigator>
              <Toast />
            </NavigationContainer>
          </TamaguiProviderMobile>
        </KeyboardProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
