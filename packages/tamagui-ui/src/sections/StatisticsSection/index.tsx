"use client";

import { YStack, XStack } from "tamagui";

// Constants
import { STATISTICS_BY_SERVICES } from "@repo/constants/common";

// Components
import StatisticsCard from "../../components/StatisticsCard";

const StatisticsSection = () => {
  return (
    <YStack paddingHorizontal="$5" marginVertical="$20" marginHorizontal="auto">
      <XStack flexWrap="wrap">
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
    </YStack>
  );
};

export default StatisticsSection;
