"use client";

import { Stack, Paragraph, StackProps, Image } from "tamagui";
import { MoveRight } from "@tamagui/lucide-icons";

// Constants
import { EMPTY_IMAGE } from "@repo/constants/images";

// Components
import Button from "../Button";

interface PostProps extends StackProps {
  text: string;
  image: string;
  alt?: string;
  onReadMore?: () => void;
}

const Post = ({ text, image, alt = "", onReadMore, ...props }: PostProps) => {
  return (
    <Stack
      flex={1}
      width="100%"
      gap="$1"
      $sm={{ flexDirection: "column", gap: "$4" }}
      {...props}
    >
      <Stack height="$25" $sm={{ height: "$37.5" }}>
        <Paragraph size="$sm" numberOfLines={4}>
          {text}
        </Paragraph>
      </Stack>

      <Stack position="relative" aspectRatio={1}>
        <Image
          source={{
            uri: image || EMPTY_IMAGE,
          }}
          alt={alt}
          accessibilityLabel={alt}
          objectFit="cover"
          width="100%"
          height="100%"
          backgroundColor="$muted"
        />

        {onReadMore && (
          <Button
            unstyled
            position="absolute"
            bottom={0}
            right={0}
            height="$12"
            width="$45"
            borderRadius={0}
            backgroundColor="$background"
            color="$color"
            onPress={onReadMore}
            $md={{ height: "$15", width: "$55" }}
          >
            Read More
            <MoveRight />
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Post;
