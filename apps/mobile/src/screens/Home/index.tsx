import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { H2, ScrollView, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Types
import { LocationItem, LocationTileItem } from "@repo/types/location";

// Constants
import { LOCATION_TILES, LOCATIONS } from "@repo/constants/location";

// Hooks
import { useScreenSize } from "@repo/hooks/useScreenSize";

//  Components
import LocationCard from "@packages/ui/components/LocationCard";
import LocationTile from "@packages/ui/components/LocationTile";
import LocationsSection from "@packages/ui/sections/LocationsSection";
import StatisticsSection from "@packages/ui/sections/StatisticsSection";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { width } = useScreenSize();

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
        <LocationCard key={item.id} item={item} onItemClick={handleItemClick} />
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

  return (
    <ScrollView marginTop={insets.top} backgroundColor="$background">
      <YStack flex={1} gap="$5" marginTop="$5">
        <H2 fontSize="$md" paddingHorizontal="$5">
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
      </YStack>
      <YStack flex={1} justifyContent="center" paddingHorizontal="$5" gap="$5">
        <H2 fontSize="$md" fontWeight={700}>
          List Camping Location
        </H2>

        <FlatList
          scrollEnabled={false}
          data={LOCATIONS}
          keyExtractor={getKeyExtractorLocation}
          renderItem={renderItemLocation}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderItemSpacingYComponent}
        />
      </YStack>
      <LocationsSection />
      <StatisticsSection />
    </ScrollView>
  );
};

export default HomeScreen;
