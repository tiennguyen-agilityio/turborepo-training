import React from "react";

import { HOME_VIDEO } from "@repo/constants/video";
import VideoPlayer from "@repo/ui/components/VideoPlayer";
import HeroSection from "@repo/ui/sections/HeroSection";
import CarouselSection from "@repo/ui/sections/CarouselSection";
import AboutSection from "@repo/ui/sections/AboutSection";
import ServicesSection from "@repo/ui/sections/ServicesSection";
import StatisticsSection from "@repo/ui/sections/StatisticsSection";
import Layout from "@repo/ui/layout";

const Home = () => {
  return (
    <Layout>
      <div className="w-full overflow-hidden">
        <HeroSection />
        <CarouselSection />
        <AboutSection />
        <ServicesSection />
        <StatisticsSection />
        <VideoPlayer hasPlayed {...HOME_VIDEO} />
      </div>
    </Layout>
  );
};

export default Home;
