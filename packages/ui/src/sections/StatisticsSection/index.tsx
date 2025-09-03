"use client";

import { YStack, XStack } from "tamagui";

// Constants
import { STATISTICS_BY_SERVICES } from "@repo/constants/common";

// Components
import { Container, StatisticsCard } from "../../components";

const StatisticsSection = () => {
  return (
    <Container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      marginVertical="$20"
    >
      <XStack width="100%" flexWrap="wrap">
        {STATISTICS_BY_SERVICES.map(({ title, value }) => (
          <YStack
            key={title}
            marginBottom="$4"
            width="50%"
            $sm={{ width: "25%" }}
          >
            <StatisticsCard title={title} value={value} />
          </YStack>
        ))}
      </XStack>
    </Container>
  );
};

export default StatisticsSection;
