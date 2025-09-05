import React from "react";
import { Text } from "tamagui";

import Container from "@packages/ui/components/Container";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ backgroundColor: "green", height: 300, width: 400 }}>
      <Container>
        <Text>Home screen</Text>
      </Container>
    </View>
  );
};

export default HomeScreen;
