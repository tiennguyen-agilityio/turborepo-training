"use client";

import { useMemo, memo } from "react";
import { YStack, Paragraph, H2, H6, Stack } from "tamagui";

// Constants
import { LOCATION_TILES } from "@repo/constants/location";

// Hooks
import { useScreenSize } from "@repo/hooks/useScreenSize";

// Components
import LocationTile from "../../components/LocationTile";

const ServicesSection = () => {
  const { width } = useScreenSize();

  const tileWidth = useMemo(() => (width - 40) / 3, [width]);

  return (
    <YStack paddingHorizontal="$5" marginTop="$35">
      <H6
        fontWeight={700}
        fontSize="$sm"
        lineHeight="$md"
        marginBottom="$5"
        color="$ring"
      >
        SERVICES
      </H6>
      <H2 fontSize="$3xl" lineHeight="$3xl" whiteSpace="pre-line">
        Camping Locations
        {"\n"}
        /Activities
      </H2>

      <Stack
        width="100%"
        marginTop="$10"
        marginBottom="$7"
        gap="$5"
        $sm={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {LOCATION_TILES.map((item, index) => {
          const handleItemClick = () => {};
          return (
            <YStack
              key={index}
              aspectRatio={2}
              flexBasis="100%"
              $sm={{
                flexBasis: index ? tileWidth : tileWidth * 2 + 20,
                aspectRatio: index ? 1 : 2,
              }}
            >
              <LocationTile flex={1} {...item} onItemClick={handleItemClick} />
            </YStack>
          );
        })}
      </Stack>
      <Paragraph marginTop="$25" fontSize="$xxs">
        We create awesome experiences by showcasing some of the best places and
        activities in the country
      </Paragraph>
    </YStack>
  );
};

export default memo(ServicesSection);
