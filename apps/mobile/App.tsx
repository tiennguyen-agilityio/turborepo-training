import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Providers
import { TamaguiProviderMobile } from "@packages/ui/providers/TamaguiProviderMobile";

import { Navigation } from "./src/navigation";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <TamaguiProviderMobile>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Navigation />
      </TamaguiProviderMobile>
    </SafeAreaProvider>
  );
}

export default App;
