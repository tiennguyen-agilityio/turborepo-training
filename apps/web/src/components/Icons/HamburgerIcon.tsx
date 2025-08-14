import React from "react";

import { SVGProps } from "@/types/svg";

const HamburgerIcon = ({
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
    </svg>
  );
};

export default HamburgerIcon;
