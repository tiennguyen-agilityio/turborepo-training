"use client";

import { Card, CardHeader, CardBackground, CardProps } from "tamagui";
import { YStack, XStack, Paragraph, SizableText, Image } from "tamagui";
import { MapPin, Star } from "@tamagui/lucide-icons";

// Types
import { LocationItem } from "@repo/types/location";

// Constants
import { EMPTY_IMAGE } from "@repo/constants/images";

// Utils
import { formatMinutes } from "@repo/utils/time";

interface LocationCardProps extends CardProps {
  item: LocationItem;
  onItemClick?: () => void;
}

const LocationCard = ({ item, onItemClick, ...props }: LocationCardProps) => {
  const {
    title = "",
    image,
    name = "",
    time = 0,
    fee = 0,
    address = "",
    rating = 0,
    reviews = 0,
  } = item;

  return (
    <Card
      bordered
      borderColor="transparent"
      overflow="hidden"
      cursor="pointer"
      hoverStyle={{
        borderColor: "$border",
      }}
      onPress={onItemClick}
      {...props}
    >
      <CardHeader padding={0} minHeight={300} maxHeight={350}>
        <CardBackground>
          <Image
            source={{
              uri: image || EMPTY_IMAGE,
            }}
            alt={name}
            accessibilityLabel={name}
            objectFit="cover"
            width="100%"
            height="100%"
            backgroundColor="$muted"
          />
        </CardBackground>
        <YStack position="absolute" bottom={0} left={0} right={0} padding="$4">
          <SizableText
            size="$xl"
            color="white"
            numberOfLines={2}
            fontWeight="700"
            lineHeight="$lg"
            textShadowColor="$color"
            textShadowOffset={{ width: 2, height: 2 }}
            textShadowRadius={4}
          >
            {title}
          </SizableText>
        </YStack>
      </CardHeader>

      <YStack padding="$4" gap="$3" flexGrow={1}>
        <Paragraph size="$md" fontWeight="700" lineHeight="$sm">
          From ${fee}/person · {formatMinutes(time)}
        </Paragraph>

        <XStack alignItems="center" gap="$2">
          <MapPin color="$ring" />
          <Paragraph
            size="$sm"
            numberOfLines={1}
            ellipsizeMode="tail"
            color="$ring"
          >
            {address}
          </Paragraph>
        </XStack>

        <XStack alignItems="center" gap="$1.5">
          <Star color="$chart2" />
          <Paragraph color="$chart2">{rating}</Paragraph>
          <Paragraph color="$ring">({reviews})</Paragraph>
        </XStack>
      </YStack>
    </Card>
  );
};

export default LocationCard;
