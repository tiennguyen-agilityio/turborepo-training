"use client";

import { useMemo, memo } from "react";
import { YStack, Paragraph, H2, H6, Stack } from "tamagui";

// Constants
import { LOCATION_TILES } from "@packages/constants/location";
import { MAX_WITH_SCREEN } from "@packages/constants/styles";

// Hooks
import { useScreenSize } from "@packages/hooks/useScreenSize";

// Components
import LocationTile from "../../components/LocationTile";
import { Container } from "../../components";

const ServicesSection = () => {
  const { width } = useScreenSize();

  const tileWidth = useMemo(() => {
    const currentWidth = width >= MAX_WITH_SCREEN ? MAX_WITH_SCREEN : width;

    return (currentWidth - 40) / 3;
  }, [width]);

  return (
    <Container
      marginTop="$25"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
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
      <Paragraph width="50%" marginTop="$20" fontSize="$xl" lineHeight="$lg">
        We create awesome experiences by showcasing some of the best places and
        activities in the country
      </Paragraph>
    </Container>
  );
};

export default memo(ServicesSection);
