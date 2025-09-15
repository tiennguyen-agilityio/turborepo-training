"use client";

import { H2, Paragraph, Stack, Text } from "tamagui";
import FaceFrownIcon from "@packages/ui/icons/FaceFrownIcon";
import Button from "@packages/ui/components/Button";

const Error = ({ reset }: { error: Error; reset: () => void }) => {
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
        Oops! Something went wrong.
      </H2>
      <Text color="$error" fontSize="$xl">
        We couldn&rsquo;t load the user page. Please try again.
      </Text>
      <Button
        backgroundColor="$error"
        paddingHorizontal="$10"
        onPress={() => reset()}
      >
        Try again
      </Button>
    </Stack>
  );
};

export default Error;
