"use client";

import { Stack, H2, Paragraph } from "tamagui";

import { Button } from "@packages/tamagui-ui/components";
import { FaceFrownIcon } from "@packages/tamagui-ui/icons/FaceFrownIcon";

const GlobalError = ({ reset }: { error: Error; reset: () => void }) => {
  return (
    <Stack
      flex={1}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      marginHorizontal="auto"
      paddingVertical="$10"
      gap="$10"
    >
      <Paragraph color="$error">
        <FaceFrownIcon height="200" width="200" />
      </Paragraph>
      <H2
        color="$error"
        fontWeight="$bold"
        fontSize="$3xl"
        textAlign="center"
        lineHeight="$3xl"
        whiteSpace="pre-line"
      >
        Oops! Something went wrong. Please try again!
      </H2>
      <Button backgroundColor="$error" paddingHorizontal="$10" onPress={() => reset()}>
        Try again
      </Button>
    </Stack>
  );
};

export default GlobalError;
