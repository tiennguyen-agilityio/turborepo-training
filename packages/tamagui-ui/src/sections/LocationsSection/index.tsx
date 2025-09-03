"use client";

import { Text, XStack, YStack } from "tamagui";
import { memo, useMemo } from "react";

// Types
import { LocationItem } from "@repo/types/location";

// Constants
import { PAGE_SIZE } from "@repo/constants/common";

// Hooks
import { useLoadMore } from "@repo/hooks/useLoadMore";
import { useScreenSize } from "@repo/hooks/useScreenSize";

// Services
import { fetchLocations } from "@repo/services/location";

// Components
import {
  Button,
  Container,
  LocationCard,
  SkeletonLocationCard,
} from "../../components";

const LocationsSection = () => {
  const {
    data: locations,
    onLoadMore,
    isLoading,
    hasMore,
    error,
  } = useLoadMore<LocationItem>({ fetcher: fetchLocations, limit: PAGE_SIZE });

  const { width } = useScreenSize();
  const tileWidth = useMemo(() => (width - 40) / 3, [width]);

  return (
    <Container marginVertical="$20" flexDirection="column">
      <XStack
        width="100%"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        rowGap="$5"
        flexWrap="wrap"
        $md={{ flexDirection: "row" }}
      >
        {locations.map((item: LocationItem, index: number) => (
          <YStack
            key={item.id || index}
            width="100%"
            $md={{
              width: tileWidth,
            }}
          >
            <LocationCard item={item} onItemClick={() => {}} />
          </YStack>
        ))}
        {isLoading &&
          [...Array(PAGE_SIZE)].map((_, index) => (
            <YStack
              key={index}
              width="100%"
              $md={{
                width: tileWidth,
              }}
            >
              <SkeletonLocationCard />
            </YStack>
          ))}
      </XStack>

      {hasMore && (
        <Button
          height="$10"
          disabled={isLoading}
          isLoading={isLoading}
          onPress={onLoadMore}
        >
          Load More
        </Button>
      )}

      {error && (
        <Text color="$error" fontSize="$sm" textAlign="left">
          {error}
        </Text>
      )}
    </Container>
  );
};

export default memo(LocationsSection);
