import React from "react";

// Constants
import { HOME_VIDEO } from "@packages/constants/video";

// Components
import { Header, Footer } from "@packages/ui/layouts";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  StatisticsSection,
} from "@packages/ui/sections";
import VideoPlayer from "@packages/ui/components/VideoPlayer";

const Home = () => {
  return (
    <>
      <Header position="absolute" top="0" left={0} zIndex={4} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatisticsSection />
      <VideoPlayer hasPlayed {...HOME_VIDEO} />
      <Footer />
    </>
  );
};

export default Home;
