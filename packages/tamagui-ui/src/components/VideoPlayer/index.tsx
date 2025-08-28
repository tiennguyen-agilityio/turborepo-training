"use client";

import { ReactNode, useRef, useState } from "react";
import { Stack, Text, YStack, XStack, Button, H1 } from "tamagui";
import { Pause, Play } from "@tamagui/lucide-icons";

interface VideoPlayerProps {
  src: string;
  poster: string;
  autoPlay?: boolean;
  hasPlayed?: boolean;
  subTitle?: string;
  title?: ReactNode;
  description?: string;
}

const VideoPlayer = ({
  src,
  poster,
  hasPlayed = false,
  autoPlay = false,
  subTitle = "",
  title = "",
  description = "",
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Stack
      position="relative"
      width="100%"
      height="$120"
      $md={{
        minHeight: "$140",
      }}
      $lg={{
        minHeight: "$180",
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        autoPlay={autoPlay}
        muted
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      <Stack
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
      >
        <Stack
          width="100%"
          height="100%"
          paddingHorizontal="$5"
          justifyContent="center"
        >
          <YStack justifyContent="center" flex={1}>
            {(subTitle || title) && (
              <YStack>
                {subTitle && (
                  <Text
                    fontSize="$2"
                    color="white"
                    marginBottom="$3"
                    textShadowColor="$color"
                    textShadowOffset={{ width: 1, height: 1 }}
                    textShadowRadius={2}
                  >
                    {subTitle}
                  </Text>
                )}
                {title && (
                  <H1
                    color="white"
                    marginBottom="$3"
                    textShadowColor="$color"
                    textShadowOffset={{ width: 1, height: 1 }}
                    textShadowRadius={2}
                  >
                    {title}
                  </H1>
                )}
              </YStack>
            )}

            <XStack alignItems="center" gap="$3" flexWrap="wrap">
              {description && (
                <Text
                  color="white"
                  textShadowColor="$color"
                  textShadowOffset={{ width: 1, height: 1 }}
                  textShadowRadius={2}
                >
                  {description}
                </Text>
              )}

              {hasPlayed && (
                <Stack
                  width="$21.25"
                  height="$21.25"
                  borderRadius="$full"
                  borderWidth={1}
                  borderColor="$accent"
                  padding="$3"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={40}
                  marginHorizontal={!description ? "auto" : undefined}
                >
                  <Button
                    onPress={togglePlay}
                    circular
                    backgroundColor="$background"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isPlaying ? <Pause size="$5" /> : <Play size="$5" />}
                  </Button>
                </Stack>
              )}
            </XStack>
          </YStack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoPlayer;
