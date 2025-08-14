import React from "react";

import { SVGProps } from "@/types/svg";

const MoonIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  className,
  onClick,
}: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
};

export default MoonIcon;
