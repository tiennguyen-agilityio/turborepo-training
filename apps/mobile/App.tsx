import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Constants
import { MAX_WITH_SCREEN } from "@repo/constants/styles";

// Providers
import { TamaguiProviderMobile } from "@packages/ui/providers/TamaguiProviderMobile";

//
import { Navigation } from "./src/navigation";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  console.log("max", MAX_WITH_SCREEN);

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
