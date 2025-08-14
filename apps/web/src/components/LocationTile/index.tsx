"use client";

import Image from "next/image";
import Link from "next/link";

// Constants
import { EMPTY_IMAGE } from "@/constants/images";

// Utils
import { generateImageToBase64 } from "@/utils/images";

// Components
import { Card, CardContent } from "@/components/ui/card";

interface LocationTileProps {
  title: string;
  count?: number;
  imageUrl: string;
  link?: string;
}

const LocationTile = ({ title, count = 0, imageUrl, link = "" }: LocationTileProps) => {
  return (
    <Link href={link}>
      <Card className="w-full h-full relative cursor-pointer bg-muted overflow-hidden rounded-[3px] group p-0">
        <Image
          src={imageUrl || EMPTY_IMAGE}
          alt={title}
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          blurDataURL={generateImageToBase64(100, 100)}
          className="h-auto w-full object-cover rounded-[3px] transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <CardContent className="absolute bottom-0 left-0 right-0 px-7.5 pb-3 text-white text-shadow-lg/30">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-1">
            <span className="text-2xl">{count}</span>
            <span className="text-sm">&nbsp;Locations</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationTile;
