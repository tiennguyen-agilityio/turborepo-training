"use client";

import { XStack, YStack } from "tamagui";

// Components
import Container from "@packages/ui/components/Container";
import Logo from "@packages/ui/components/Logo";
import Select from "@packages/ui/components/Select";
import DiscoverIcon from "@packages/ui/icons/DiscoverIcon";
import MasterCardIcon from "@packages/ui/icons/MasterCardIcon";
import MPesaIcon from "@packages/ui/icons/MPesaIcon";
import PaypalIcon from "@packages/ui/icons/PaypalIcon";
import VisaIcon from "@packages/ui/icons/VisaIcon";

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
