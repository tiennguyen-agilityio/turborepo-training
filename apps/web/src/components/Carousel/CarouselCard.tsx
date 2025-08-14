"use client";

import React from "react";
import Image from "next/image";

// Constants
import { EMPTY_IMAGE } from "@/constants/images";

// Utils
import { generateImageToBase64 } from "@/utils/images";

// Components
import { Card, CardContent, CardHeader } from "../ui/card";
import Heading from "../Heading";

interface CarouselItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface CarouselCardProps {
  item: CarouselItem;
  isActive?: boolean;
}

const CarouselCard = ({ item, isActive = false }: CarouselCardProps) => {
  const { title, description, image, alt } = item || {};

  return (
    <Card className="w-full p-0 border-none hover:shadow-none gap-12 bg-transparent">
      <CardHeader className="flex justify-between items-center h-25 p-0 gap-5">
        {isActive && (
          <>
            <Heading as="h4" className="w-1/2 animate-fade-in">
              {title}
            </Heading>
            <p className="w-1/2 text-sm line-clamp-5 animate-fade-in pr-2">{description}</p>
          </>
        )}
      </CardHeader>
      <CardContent className="relative flex items-center justify-center p-0 mb-0 bg-muted rounded-sm max-h-[475px] overflow-hidden aspect-[4/3]">
        <Image
          src={image || EMPTY_IMAGE}
          alt={alt}
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw"
          blurDataURL={generateImageToBase64(200, 200)}
          className="object-cover overflow-hidden rounded-sm"
        />
      </CardContent>
    </Card>
  );
};

export default CarouselCard;
