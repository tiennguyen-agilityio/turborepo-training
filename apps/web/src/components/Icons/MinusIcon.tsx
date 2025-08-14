import React from "react";

import { SVGProps } from "@/types/svg";

const MinusIcon = ({
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
      <path d="M5 12h14" />
    </svg>
  );
};

export default MinusIcon;
