import React from "react";
import { ScrollView, Text } from "tamagui";

import Container from "@packages/ui/components/Container";

const SearchScreen = () => (
  <ScrollView backgroundColor="$background">
    <Container paddingVertical="$5">
      <Text>Search screen</Text>
    </Container>
  </ScrollView>
);

export default SearchScreen;
