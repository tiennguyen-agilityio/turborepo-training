"use client";

import { useRouter } from "next/navigation";
import { H2, Paragraph, Stack } from "tamagui";

// Constants
import { ROUTES } from "@packages/constants/routes";

// Components
import { FaceFrownIcon } from "@packages/ui/icons/FaceFrownIcon";
import { Container, Button } from "@packages/ui/components";

const NotFound = () => {
  const router = useRouter();
  return (
    <Container>
      <Stack
        flex={1}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        marginHorizontal="auto"
        paddingVertical="$10"
        gap="$10"
        backgroundColor="$background"
      >
        <Paragraph color="$error">
          <FaceFrownIcon height="200" width="200" />
        </Paragraph>
        <H2
          color="$error"
          fontWeight="$bold"
          fontSize="$3xl"
          lineHeight="$3xl"
          whiteSpace="pre-line"
        >
          404 - Page Not Found
        </H2>
        <Button
          backgroundColor="$error"
          paddingHorizontal="$10"
          onPress={() => router.replace(ROUTES.HOME)}
        >
          Go to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
