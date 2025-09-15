"use client";

import { Text } from "tamagui";
import Container from "@packages/ui/components/Container";

const CopyRight = () => {
  return (
    <Container height={112} width="100%">
      <Text fontSize="$xs" textAlign="center" color="$color">
        © {new Date().getFullYear()} Travelsy Ltd. All rights reserved.
      </Text>
      <Text fontSize="$xs" textAlign="center" color="$color">
        Made in Kenya by Ralak
      </Text>
    </Container>
  );
};

export default CopyRight;
