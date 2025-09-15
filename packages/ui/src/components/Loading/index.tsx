"use client";

import { Spinner, YStack } from "tamagui";

const Loading = () => (
  <YStack fullscreen justifyContent="center" alignItems="center">
    <Spinner
      marginTop="$5"
      color="$primary"
      size="large"
      width="$9"
      height="$9"
    />
  </YStack>
);

export default Loading;
