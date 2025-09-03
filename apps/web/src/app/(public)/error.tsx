"use client";

import { H2, Stack } from "tamagui";
import { Button } from "@packages/ui/components";
import { FaceFrownIcon } from "@packages/ui/icons/FaceFrownIcon";

const Error = ({ reset }: { error: Error; reset: () => void }) => {
  return (
    <Stack>
      <FaceFrownIcon />
      <H2 color="$error" fontWeight="$bold">
        We couldn&rsquo;t load the page. Please try again.
      </H2>
      <Button backgroundColor="$error" onPress={() => reset()}>
        Try again
      </Button>
    </Stack>
  );
};

export default Error;
