"use client";

import { Card, SizableText, Paragraph, Image, Stack, CardProps } from "tamagui";
import { EMPTY_IMAGE } from "@packages/constants/images";

interface LocationTileProps extends CardProps {
  title: string;
  count?: number;
  imageUrl: string;
  onItemClick?: () => void;
}

const LocationTile = ({
  title,
  count = 0,
  imageUrl,
  onItemClick,
  ...props
}: LocationTileProps) => {
  return (
    <Card
      borderRadius="$1"
      overflow="hidden"
      cursor="pointer"
      position="relative"
      hoverStyle={{ borderColor: "$border" }}
      onPress={onItemClick}
      {...props}
    >
      <Image
        source={{ uri: imageUrl || EMPTY_IMAGE }}
        alt={title}
        accessibilityLabel={title}
        width="100%"
        height="100%"
        objectFit="cover"
        backgroundColor="$muted"
      />
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        paddingHorizontal="$7.5"
        paddingBottom="$3"
      >
        <SizableText
          color="white"
          size="$xl"
          lineHeight="$lg"
          numberOfLines={1}
          textShadowColor="$color"
          textShadowOffset={{ width: 1, height: 1 }}
          textShadowRadius={2}
        >
          {title}
        </SizableText>
        <Paragraph size="$3" marginTop="$1">
          <SizableText
            size="$xl"
            fontWeight="700"
            color="white"
            textShadowColor="$color"
            textShadowOffset={{ width: 1, height: 1 }}
            textShadowRadius={2}
          >
            {count}
          </SizableText>
          <SizableText
            size="$sm"
            color="white"
            textShadowColor="$color"
            textShadowOffset={{ width: 1, height: 1 }}
            textShadowRadius={2}
          >
            &nbsp;Locations
          </SizableText>
        </Paragraph>
      </Stack>
    </Card>
  );
};

export default LocationTile;
