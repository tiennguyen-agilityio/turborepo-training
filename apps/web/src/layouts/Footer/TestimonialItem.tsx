"use client";

import { YStack, XStack, Text, Paragraph, Image } from "tamagui";

// Constants
import { DEFAULT_AVATAR } from "@packages/constants/images";

interface TestimonialItemProps {
  title: string;
  descriptions: string;
  authorAvatar?: string;
  authorName: string;
}

const TestimonialItem = ({
  title,
  descriptions,
  authorAvatar = "",
  authorName,
}: TestimonialItemProps) => {
  return (
    <YStack
      backgroundColor="$background"
      flex={1}
      height="100%"
      padding="$7"
      paddingBottom="$10"
      borderRadius="$1"
      justifyContent="flex-start"
    >
      <Paragraph fontSize="$4" numberOfLines={2}>
        {title}
      </Paragraph>

      <Paragraph
        fontSize="$sm"
        lineHeight="$sm"
        marginTop="$3.5"
        numberOfLines={7}
      >
        {descriptions}
      </Paragraph>

      <XStack alignItems="center" gap="$2.5" marginTop="$25">
        <YStack
          width="$10"
          height="$10"
          overflow="hidden"
          borderRadius="$full"
          position="relative"
        >
          <Image
            source={{
              uri: authorAvatar || DEFAULT_AVATAR,
            }}
            alt="Avatar Image"
            objectFit="cover"
            width="100%"
            height="100%"
            backgroundColor="$muted"
          />
        </YStack>

        <Text fontSize="$3" numberOfLines={1}>
          {authorName}
        </Text>
      </XStack>
    </YStack>
  );
};

export default TestimonialItem;
