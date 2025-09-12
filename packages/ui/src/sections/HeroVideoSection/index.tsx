"use client";

import { YStack, H2 } from "tamagui";

// Constants
import { HOME_VIDEO } from "@packages/constants/video";

// Components
import { VideoPlayer, Container } from "../../components";

const HeroVideoSection = ({ title }: { title: string }) => {
  return (
    <YStack>
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <Container paddingVertical="$10">
        <H2>{title}</H2>
      </Container>
    </YStack>
  );
};

export default HeroVideoSection;
