"use client";

import React, { ReactNode, useRef, useState } from "react";
import clsx from "clsx";

import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";
import Heading from "../Heading";

interface VideoPlayerProps {
  src: string;
  poster: string;
  autoPlay?: boolean;
  hasPlayed?: boolean;
  subTitle?: string;
  title?: ReactNode;
  description?: string;
}

const VideoPlayer = ({
  src,
  poster,
  hasPlayed = false,
  autoPlay = false,
  subTitle = "",
  title = "",
  description = "",
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-120 md:min-h-160 lg:min-h-180">
      <video
        ref={videoRef}
        className="w-full object-cover h-full md:min-h-160 lg:min-h-180"
        autoPlay={autoPlay}
        poster={poster}
        muted
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute w-full h-full top-0 left-0 z-1">
        <div className="container mx-auto h-full px-5">
          <div className="flex h-full flex-col justify-center">
            {(subTitle || title) && (
              <div className="flex-0 flex-start text-sm">
                {subTitle && <p className="mb-5 text-shadow-md/20 text-white">{subTitle}</p>}
                {title && (
                  <Heading as="h1" className="mb-6 text-shadow-md/20 text-white">
                    {title}
                  </Heading>
                )}
              </div>
            )}
            <div className="flex gap-5 md:gap-11 items-center">
              {description && <p className="text-shadow-md/20 text-white">{description}</p>}
              {hasPlayed && (
                <div
                  className={clsx(
                    "w-21.25 h-21.25 p-3 rounded-full border border-accent z-40",
                    !description && "mx-auto"
                  )}
                >
                  <button
                    data-testid="btn-icon"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    onClick={togglePlay}
                    className="flex items-center justify-center w-15 h-15 rounded-full bg-accent transition-colors cursor-pointer"
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon className="w-10 h-10" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
