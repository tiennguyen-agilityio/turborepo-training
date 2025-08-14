"use client";

import React from "react";

import { EXPERIENCES } from "@/constants/common";
import { HOME_VIDEO } from "@/constants/video";

import Experiences from "@/components/Experiences";
import VideoPlayer from "@/components/VideoPlayer";
import Button from "@/components/Button";
import ArrowIcon from "@/components/Icons/ArrowIcon";

const HeroSection = () => {
  const handleExperienceClick = () => {};

  const handleFindExperience = () => {};

  return (
    <div className="relative w-full min-h-100">
      <VideoPlayer
        hasPlayed
        {...HOME_VIDEO}
        subTitle="Welcome to Travel"
        title={
          <>
            Mother Earth
            <br />
            Hosts Our Travels
          </>
        }
        description="Camping Locations"
      />
      <div className="relative sm:absolute bottom-0 left-0 w-full h-auto sm:h-20 lg:h-30">
        <div className="container flex flex-col sm:flex-row items-center mx-auto px-2 sm:px-5 py-2 sm:py-0 gap-2 sm:gap-0">
          <div className="sm:h-20 lg:h-30 min-w-1/3 max-w-150 absolute left-0 bottom-0 right-100 bg-background z-1 " />
          <div className="w-full flex sm:flex-1 justify-center align-center md:br-5 h-16 sm:h-20 lg:h-30 z-30 bg-background">
            <Experiences data={EXPERIENCES} onItemClick={handleExperienceClick} />
          </div>
          <Button
            onClick={handleFindExperience}
            className="h-14 sm:gap-5 text-sx text-white lg:text-sm bg-accent-foreground sm:h-20 lg:h-30 w-full sm:w-50 lg:w-65.5 sm:rounded-none sm:rounded-tr-[20px] z-30"
          >
            FIND AN EXPERIENCE
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
