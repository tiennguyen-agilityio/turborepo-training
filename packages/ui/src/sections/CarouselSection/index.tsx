import React from "react";

import { CAROUSELS } from "@repo/constants/carousel";

import Carousel from "@repo/ui/components/Carousel";

const CarouselSection = () => {
  return (
    <div className="container mx-auto mt-14 overflow-visible px-5">
      <Carousel list={CAROUSELS} />
    </div>
  );
};

export default CarouselSection;
