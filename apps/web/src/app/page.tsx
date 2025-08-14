import React from "react";

import { HOME_VIDEO } from "@/constants/video";
import VideoPlayer from "@/components/VideoPlayer";
import HeroSection from "@/sections/HeroSection";
import CarouselSection from "@/sections/CarouselSection";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import StatisticsSection from "@/sections/StatisticsSection";
import Layout from "@/layout";

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
