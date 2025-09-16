import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { H2, Stack, XStack, YStack, Text } from "tamagui";

// Types
import { LocationItem, LocationTileItem } from "@packages/types/location";

// Constants
import { LOCATION_TILES } from "@packages/constants/location";
import { PAGE_SIZE } from "@packages/constants/common";

// Hooks
import { useScreenSize } from "@packages/hooks/useScreenSize";
import { useLoadMore } from "@packages/hooks/useLoadMore";

// Services
import { fetchLocations } from "@packages/services/location";

//  Components
import LocationCard from "@packages/ui/components/LocationCard";
import SkeletonLocationCard from "@packages/ui/components/SkeletonLocationCard";
import LocationTile from "@packages/ui/components/LocationTile";
import StatisticsSection from "@packages/ui/sections/StatisticsSection";

const HomeScreen = () => {
  const { width } = useScreenSize();

  const {
    data: locations,
    onLoadMore,
    isLoading,
    error = "",
  } = useLoadMore<LocationItem>({ fetcher: fetchLocations, limit: PAGE_SIZE });

  const getKeyExtractorLocationTile = useCallback(
    ({ slug }: LocationTileItem, index: number) => slug || index.toString(),
    []
  );

  const getKeyExtractorLocation = useCallback(
    ({ id }: LocationItem, index: number) => id || index.toString(),
    []
  );

  const handleItemClick = useCallback(() => {}, []);

  const renderItemLocation = useCallback(
    ({ item }: { item: LocationItem }) => {
      return (
        <LocationCard
          marginHorizontal="$5"
          key={item.id}
          item={item}
          onItemClick={handleItemClick}
        />
      );
    },
    [handleItemClick]
  );

  const renderItemLocationTile = useCallback(
    ({ item }: { item: LocationTileItem }) => {
      return (
        <LocationTile
          key={item.id}
          height={200}
          width={width}
          overflow="hidden"
          {...item}
          onItemClick={handleItemClick}
        />
      );
    },
    [handleItemClick, width]
  );

  const renderItemSpacingYComponent = useCallback(
    () => <YStack width="100%" height="$5" />,
    []
  );
  const renderItemSpacingXComponent = useCallback(
    () => <XStack width="$5" height="100%" />,
    []
  );

  const renderHeaderComponent = useCallback(
    () => (
      <Stack flex={1} gap="$5">
        <H2
          fontSize="$md"
          paddingHorizontal="$5"
          paddingTop="$5"
          fontWeight="bold"
        >
          Services Camping Location
        </H2>
        <FlatList
          horizontal
          data={LOCATION_TILES}
          keyExtractor={getKeyExtractorLocationTile}
          renderItem={renderItemLocationTile}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <YStack width="$5" />}
          ListHeaderComponent={renderItemSpacingXComponent}
          ListFooterComponent={renderItemSpacingXComponent}
        />
        <H2 fontSize="$md" fontWeight="bold" padding="$5">
          List Camping Location
        </H2>
      </Stack>
    ),
    [
      getKeyExtractorLocationTile,
      renderItemLocationTile,
      renderItemSpacingXComponent,
    ]
  );

  const renderListFooterComponent = useCallback(() => {
    return (
      <>
        <Stack gap="$5" paddingHorizontal="$5">
          {isLoading &&
            [...Array(PAGE_SIZE)].map((_, index) => (
              <YStack key={index} width="100%">
                <SkeletonLocationCard />
              </YStack>
            ))}
          {error && (
            <Text
              color="$error"
              fontSize="$sm"
              textAlign="center"
              marginTop="$5"
            >
              {error}
            </Text>
          )}
        </Stack>
        <StatisticsSection />
      </>
    );
  }, [isLoading, error]);

  const renderListEmptyComponent = useCallback(
    () => (isLoading ? null : <Text>Locations Empty</Text>),
    [isLoading]
  );

  return (
    <Stack flex={1} backgroundColor="$background" justifyContent="flex-start">
      <FlatList
        data={locations}
        keyExtractor={getKeyExtractorLocation}
        renderItem={renderItemLocation}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderItemSpacingYComponent}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={renderHeaderComponent}
        ListFooterComponent={renderListFooterComponent}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
      />
    </Stack>
  );
};

export default HomeScreen;
