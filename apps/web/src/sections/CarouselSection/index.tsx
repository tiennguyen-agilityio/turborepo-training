import React from "react";

import { CAROUSELS } from "@/constants/carousel";

import Carousel from "@/components/Carousel";

const CarouselSection = () => {
  return (
    <div className="container mx-auto mt-14 overflow-visible px-5">
      <Carousel list={CAROUSELS} />
    </div>
  );
};

export default CarouselSection;
