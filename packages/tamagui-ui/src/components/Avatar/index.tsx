"use client";

import { DEFAULT_AVATAR } from "@repo/constants/images";
import {
  Avatar as TAvatar,
  AvatarProps as TAvatarProps,
  Stack,
  Text,
} from "tamagui";

interface AvatarProps extends Omit<TAvatarProps, "children"> {
  name?: string;
  src?: string;
  isActive?: boolean;
  alt?: string;
}

const Avatar = ({
  src,
  name = "",
  size = "$10",
  alt = "",
  isActive = false,
}: AvatarProps) => {
  return (
    <Stack
      position="relative"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
    >
      <TAvatar circular size={size} backgroundColor="$muted">
        <TAvatar.Image src={src || (name ? "" : DEFAULT_AVATAR)} alt={alt} />
        <TAvatar.Fallback alignItems="center" justifyContent="center">
          <Text fontSize="$sm">{name}</Text>
        </TAvatar.Fallback>
      </TAvatar>
      {isActive && (
        <Stack
          position="absolute"
          top={4}
          right={0}
          zIndex={2}
          width={11}
          height={11}
          alignItems="center"
          justifyContent="center"
          borderRadius="$full"
          backgroundColor="$background"
        >
          <Stack
            width={9}
            height={9}
            borderRadius="$full"
            backgroundColor="$error"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Avatar;
