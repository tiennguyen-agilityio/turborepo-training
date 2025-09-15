import React from "react";

// Constants
import { HOME_VIDEO } from "@packages/constants/video";

// Components
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import HeroSection from "@packages/ui/sections/HeroSection";
import AboutSection from "@packages/ui/sections/AboutSection";
import ServicesSection from "@packages/ui/sections/ServicesSection";
import StatisticsSection from "@packages/ui/sections/StatisticsSection";
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
