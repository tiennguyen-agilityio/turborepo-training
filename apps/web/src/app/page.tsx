import React from "react";
import { YStack } from "tamagui";

// Constants
import { HOME_VIDEO } from "@repo/constants/video";

// Components
import { Header, Footer } from "@packages/tamagui-ui/layouts";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  StatisticsSection,
} from "@packages/tamagui-ui/sections";
import VideoPlayer from "@packages/tamagui-ui/components/VideoPlayer";

const Home = () => {
  return (
    <YStack gap="$20">
      <Header position="absolute" top="0" left={0} zIndex={4} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatisticsSection />
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <Footer />
    </YStack>
  );
};

export default Home;
