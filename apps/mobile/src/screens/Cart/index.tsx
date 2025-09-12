import React from "react";
import { ScrollView, Text } from "tamagui";

import Container from "@packages/ui/components/Container";

const CartScreen = () => {
  return (
    <ScrollView backgroundColor="$background">
      <Container paddingVertical="$5">
        <Text fontWeight="bold">Cart screen</Text>
      </Container>
    </ScrollView>
  );
};

export default CartScreen;
