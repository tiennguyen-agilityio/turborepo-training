"use client";

import { ReactNode, memo, useCallback, useRef, useState } from "react";
import { Pause, Play } from "@tamagui/lucide-icons";
import { Stack, Text, YStack, XStack, Button, H1 } from "tamagui";

import Container from "../Container";

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

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <Stack
      position="relative"
      width="100%"
      height="$120"
      $md={{
        minHeight: "$140",
      }}
      $lg={{
        minHeight: "$160",
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
        <Container width="100%" height="100%">
          <YStack justifyContent="center" flex={1}>
            {(subTitle || title) && (
              <YStack>
                {subTitle && (
                  <Text
                    fontSize="$sm"
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
                    unstyled
                    color="white"
                    marginBottom="$3"
                    // size={36}
                    fontSize={80}
                    lineHeight={84}
                    textShadowColor="$color"
                    textShadowOffset={{ width: 1, height: 1 }}
                    textShadowRadius={2}
                    whiteSpace="pre-line"
                    $xs={{
                      fontSize: 32,
                      lineHeight: 36,
                    }}
                    $sm={{
                      fontSize: 32,
                      lineHeight: 36,
                    }}
                    $md={{
                      fontSize: 36,
                      lineHeight: 40,
                    }}
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
                  width="$19"
                  height="$19"
                  borderRadius="$full"
                  borderWidth={1}
                  borderColor="$accent"
                  padding="$2"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={40}
                  marginHorizontal={!description ? "auto" : undefined}
                  $xs={{
                    width: "$21.25",
                    height: "$21.25",
                    padding: "$3",
                  }}
                >
                  <Button
                    onPress={togglePlay}
                    width="$12"
                    height="$12"
                    borderRadius="$full"
                    backgroundColor="$background"
                    justifyContent="center"
                    alignItems="center"
                    $xs={{
                      width: "$15",
                      height: "$15",
                    }}
                  >
                    {isPlaying ? <Pause size="$6" /> : <Play size="$6" />}
                  </Button>
                </Stack>
              )}
            </XStack>
          </YStack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default memo(VideoPlayer);
