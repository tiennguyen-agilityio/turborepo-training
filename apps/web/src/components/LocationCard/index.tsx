"use client";

import Link from "next/link";
import Image from "next/image";

// Types
import { LocationItem } from "@/types/location";

// Constants
import { EMPTY_IMAGE } from "@/constants/images";

// Utils
import { formatMinutes } from "@/utils/time";
import { generateImageToBase64 } from "@/utils/images";

// Components
import AddressIcon from "../Icons/AddressIcon";
import StarIcon from "../Icons/StarIcon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface LocationCardProps {
  item: LocationItem;
  href?: string;
}

const LocationCard = ({ item, href = "" }: LocationCardProps) => {
  const {
    title = "",
    image,
    name = "",
    time = 0,
    fee = 0,
    address = "",
    rating = 0,
    reviews = 0,
  } = item;

  return (
    <Link href={href} className="block h-full group">
      <Card className="w-full h-full p-0">
        <CardHeader className="w-full relative p-0 grow-1 bg-muted overflow-hidden min-h-[30px] aspect-square">
          <CardTitle className="absolute bottom-0 p-7.5 z-2 text-2xl text-white text-shadow-sm line-clamp-2">
            {title}
          </CardTitle>
          <Image
            src={image || EMPTY_IMAGE}
            alt={name}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            blurDataURL={generateImageToBase64(320, 320)}
            className="object-cover h-full w-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </CardHeader>
        <CardContent className="px-7.5 pt-4 mb-0 pb-6">
          <p className="font-bold text-lg">
            From ${fee}/person · {formatMinutes(time)}
          </p>

          <div className="flex items-center gap-1.25 mt-3 text-ring">
            <AddressIcon />
            <p className="text-sm truncate">{address}</p>
          </div>
          <div className="flex items-center gap-1.25 mt-4 text-chart-2">
            <StarIcon />
            <span>{rating}</span>
            <span className="text-ring">({reviews})</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard;
