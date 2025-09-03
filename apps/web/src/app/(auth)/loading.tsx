"use client";

import { ClerkLoading } from "@clerk/nextjs";
import { Spinner, YStack } from "tamagui";

const LoadingPage = () => (
  <YStack fullscreen justifyContent="center" alignItems="center">
    <ClerkLoading />
    <Spinner color="$primary" size="large" />
  </YStack>
);

export default LoadingPage;
