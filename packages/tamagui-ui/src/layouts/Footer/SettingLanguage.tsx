"use client";

import { XStack, YStack } from "tamagui";

// Components
import { Logo, Select, Container } from "../../components";
import {
  DiscoverIcon,
  MasterCardIcon,
  MPesaIcon,
  PaypalIcon,
  VisaIcon,
} from "../../icons";

const SettingLanguage = () => {
  return (
    <Container
      paddingVertical="$10"
      gap="$5"
      flexDirection="column"
      alignContent="center"
      $md={{ flexDirection: "row", height: "$24" }}
    >
      <YStack
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap="$5"
        $md={{
          maxWidth: "min-content",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Logo color="$chart2" />
        <XStack
          justifyContent="center"
          alignItems="center"
          gap="$5"
          flexWrap="wrap"
          $md={{
            gap: "$7",
            marginLeft: "auto",
            marginRight: 0,
          }}
        >
          <MPesaIcon />
          <DiscoverIcon />
          <VisaIcon />
          <PaypalIcon />
          <MasterCardIcon />
        </XStack>
      </YStack>

      <XStack maxWidth="fit-content" gap="$2.5">
        <Select
          placeholder="English (United States)"
          items={["English (United States)"]}
        />
        <Select placeholder="KES" items={["KES"]} />
      </XStack>
    </Container>
  );
};

export default SettingLanguage;
