"use client";

import { memo, useCallback, useState } from "react";
import { H2, XStack, YStack } from "tamagui";

// Types
import { Filter } from "@repo/types/common";

// Constants
import { LOCATIONS } from "@repo/constants/location";

// Components
import { LocationFilter, LocationCard, Container } from "../../components";

const FilterSection = () => {
  const [filter, setFilter] = useState<Filter>({
    budget: [1200, 10000],
    locations: [],
    categories: [],
  });

  const handleChangeFilter = useCallback((value: Filter) => {
    setFilter((prev: Filter) => ({
      ...prev,
      ...value,
    }));
  }, []);

  return (
    <Container
      gap="$5"
      flexDirection="column"
      alignItems="flex-start"
      marginVertical="$20"
      $md={{
        gap: 0,
        flexDirection: "row",
        marginVertical: "$25",
      }}
    >
      <YStack $md={{ width: "33.33%", paddingRight: "$2.5" }}>
        <LocationFilter defaultValue={filter} onChange={handleChangeFilter} />
      </YStack>
      <YStack width="100%" $md={{ width: "66.67%", paddingLeft: "$2.5" }}>
        <H2 fontSize="$3xl" lineHeight="$3xl">
          Popular Locations
        </H2>
        <XStack
          width="100%"
          flexDirection="column"
          alignItems="stretch"
          marginTop="$10"
          rowGap="$5"
          flexWrap="wrap"
          $md={{ flexDirection: "row" }}
        >
          {LOCATIONS.slice(0, 4).map((item, index) => (
            <YStack
              key={item.id || index}
              width="100%"
              $md={{
                width: "50%",
                ...(index % 2 === 0
                  ? {
                      paddingRight: "$2.5",
                    }
                  : {
                      paddingLeft: "$2.5",
                    }),
              }}
            >
              <LocationCard item={item} onItemClick={() => {}} />
            </YStack>
          ))}
        </XStack>
      </YStack>
    </Container>
  );
};

export default memo(FilterSection);
