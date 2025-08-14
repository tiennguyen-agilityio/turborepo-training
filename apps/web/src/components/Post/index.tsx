"use client";

import React from "react";
import Image from "next/image";

// Constants
import { EMPTY_IMAGE } from "@/constants/images";

// Utils
import { generateImageToBase64 } from "@/utils/images";
import { cn } from "@/utils/styles";

// Components
import ArrowIcon from "../Icons/ArrowIcon";
import Button from "../Button";

interface PostProps {
  text: string;
  image: string;
  alt?: string;
  className?: string;
  onReadMore?: () => void;
}

const Post = ({ text, image, alt = "", className = "", onReadMore }: PostProps) => {
  return (
    <div className={cn("flex flex-start gap-5 md:gap-0 md:flex-col", className)}>
      <div className="w-1/2 md:w-full h-38">
        <p className="text-sm line-clamp-4">{text}</p>
      </div>
      <div className="relative w-1/2 md:w-full h-auto aspect-square">
        <Image
          src={image || EMPTY_IMAGE}
          alt={alt}
          placeholder="blur"
          fill
          sizes="50vw"
          blurDataURL={generateImageToBase64(320, 320)}
          className="object-cover h-full w-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {onReadMore && (
          <Button
            data-testid="readMore"
            variant="ghost"
            onClick={onReadMore}
            className="text-accent-foreground md:gap-6 absolute bottom-0 right-0 text-sx md:text-sm h-12 md:h-15 md:w-57 bg-background rounded-none"
          >
            Read More
            <ArrowIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Post;
