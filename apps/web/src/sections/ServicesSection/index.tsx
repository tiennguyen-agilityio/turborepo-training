import React from "react";

// Constants
import { LOCATION_TILES } from "@/mocks";

// Utils
import { cn } from "@/utils/styles";

// Components
import LocationTile from "@/components/LocationTile";
import Heading from "@/components/Heading";

const ServicesSection = () => {
  return (
    <section className="container mx-auto mt-35 px-5">
      <Heading as="h6" className="font-bold text-ring mb-5">
        SERVICES
      </Heading>
      <Heading as="h2">
        Camping Locations
        <br />
        /Activities
      </Heading>
      <div className="w-full flex mb-7 mx-auto justify-center">
        <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {LOCATION_TILES.map((item, index) => (
            <div
              key={index}
              className={cn(
                "rounded-[3px] max-h-120 overflow-hidden aspect-square",
                index === 0 && "sm:col-span-2 md:col-span-2 aspect-[2/1]"
              )}
            >
              <LocationTile key={index} {...item} link={`/${item.slug}`} />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-25 md:w-1/2 text-2xl">
        We create awesome experiences by showcasing some of the best places and activities in the
        country
      </p>
    </section>
  );
};

export default ServicesSection;
