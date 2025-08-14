"use client";

import Image from "next/image";

// Constants
import { DEFAULT_AVATAR } from "@/constants/images";

// Utils
import { generateImageToBase64 } from "@/utils/images";

interface TestimonialItemProps {
  title: string;
  descriptions: string;
  authorAvatar: string;
  authorName: string;
}

const TestimonialItem = ({
  title,
  descriptions,
  authorAvatar = "",
  authorName,
}: TestimonialItemProps) => {
  return (
    <div className="flex flex-col shadow h-full p-7.5 pb-10 bg-background">
      <p className="font-abel text-base line-clamp-2">{title}</p>
      <p className="text-sm mt-3.5 line-clamp-7">{descriptions}</p>
      <div className="flex items-center gap-2.5 mt-auto mb-0">
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <Image
            src={authorAvatar || DEFAULT_AVATAR}
            alt={authorName}
            placeholder="blur"
            width={40}
            height={40}
            blurDataURL={generateImageToBase64(40, 40)}
            className="object-cover"
          />
        </div>
        <span className="text-sm line-clamp-1">{authorName}</span>
      </div>
    </div>
  );
};

export default TestimonialItem;
