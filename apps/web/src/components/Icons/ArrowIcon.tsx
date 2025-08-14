import React from "react";

import { SVGProps } from "@/types/svg";

const ArrowIcon = ({ color = "currentColor", width = 20, height = 6, onClick }: SVGProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 6" fill="none" onClick={onClick}>
      <path
        d="M19.6508 2.31454L16.6308 0.154296C16.0836 -0.237068 15.3273 0.161455 15.3273 0.840035V2.16128H0.826947C0.370282 2.16128 0 2.53693 0 3.00034C0 3.46374 0.370282 3.83933 0.826947 3.83933H15.3272V5.16052C15.3272 5.84358 16.0875 6.23466 16.6306 5.84626L19.6506 3.68602C20.1118 3.35635 20.1211 2.65171 19.6508 2.31454Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowIcon;
