import React from "react";

import { SVGProps } from "@/types/svg";

const CircleIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  className,
  onClick,
}: SVGProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export default CircleIcon;
