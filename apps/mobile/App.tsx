import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MAX_WITH_SCREEN } from "@repo/constants/styles";
import Button from "@packages/ui/components/Button";

import { TamaguiProviderMobile } from "@packages/ui/providers/TamaguiProviderMobile";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  console.log("max", MAX_WITH_SCREEN);

  return (
    <SafeAreaProvider>
      <TamaguiProviderMobile>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <View style={styles.container}>
          <Button>Hello</Button>
        </View>
      </TamaguiProviderMobile>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
});

export default App;
