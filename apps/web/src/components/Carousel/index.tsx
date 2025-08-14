"use client";

import { ComponentProps, useState, useEffect } from "react";

// Types
import { CarouselItem } from "@/types/carousel";

// Utils
import { cn } from "@/utils/styles";

// Components
import {
  Carousel as ShadCNCarousel,
  CarouselContent,
  CarouselItem as ShadCNCarouselItem,
  CarouselApi,
  CarouselPagination,
} from "../ui/carousel";
import CarouselCard from "./CarouselCard";

interface CarouselProps extends ComponentProps<"div"> {
  list: CarouselItem[];
  className?: string;
}

const Carousel = ({ list, className = "" }: CarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api?.selectedScrollSnap() + 1);

    api?.on("select", () => {
      setCurrent(api?.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <ShadCNCarousel
      opts={{
        align: "start",
      }}
      setApi={setApi}
      orientation="horizontal"
      className={cn("h-full max-h-xs", className)}
    >
      <CarouselContent className="flex gap-0 mb-4">
        {list.map((item, index) => {
          const isActive = index + 1 === current;
          return (
            <ShadCNCarouselItem key={index} className="flex flex-col w-full md:basis-3/4">
              <CarouselCard item={item} isActive={isActive} />
            </ShadCNCarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPagination />
    </ShadCNCarousel>
  );
};

export default Carousel;
