import React from "react";

import { SVGProps } from "@/types/svg";

const FacebookIcon = ({ width = 8, height = 16, color = "white", onClick }: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      onClick={onClick}
    >
      <path
        d="M4.998 16H2V8H0V5.24297L2 5.24206L1.99675 3.61781C1.99675 1.36856 2.60666 0 5.25612 0H7.462V2.75756H6.08341C5.05166 2.75756 5.00203 3.14281 5.00203 3.862L4.99794 5.24206H7.4775L7.18519 7.99909L5 8L4.998 16Z"
        fill={color}
      />
    </svg>
  );
};

export default FacebookIcon;
