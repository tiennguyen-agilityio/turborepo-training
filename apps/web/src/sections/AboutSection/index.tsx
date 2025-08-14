"use client";

import React from "react";

import Post from "@/components/Post";
import Heading from "@/components/Heading";

const AboutSection = () => {
  const handleReadMore = () => {};

  return (
    <section className="container mx-auto mt-24 px-5">
      <Heading as="h6" className="font-bold text-ring mb-5">
        ABOUT US
      </Heading>
      <Heading as="h2">
        A Guide To Rocky Mountain <br />
        Vacations
      </Heading>
      <div className="flex justify-between flex-wrap gap-5 mt-15">
        <Post
          className="w-full md:flex-1"
          image="https://i.ibb.co/KcPCsYQL/Rectangle-3.png"
          text="Because the rock was laid down in layers, there is a variation in the hardness of the rock formed. When water runoff trickles across the rock, some areas erode rapidly whereas others hold firm. This variation in erosion speed causes the formation of pinnacles, or “hoodoos” of stable rock."
          onReadMore={handleReadMore}
        />

        <Post
          className="w-full md:flex-1"
          image="https://i.ibb.co/MFjB1W7/Rectangle-Copy-2.png"
          text="In some places the water seeps down through cracks & eats out holes beneath the surface. When the side rock erodes away, an archway is left behind. Eventually the arch collapses, leaving one more pillars to join the rest. The ever changing vista of colors, spires, walls & archways is spectacular at any season, & the park is open all year round."
        />
      </div>
    </section>
  );
};

export default AboutSection;
