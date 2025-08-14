import React from "react";

import { SVGProps } from "@/types/svg";

const USAFlagIcon = ({ color = "#d8d8d8", width = 20, height = 20, onClick }: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      onClick={onClick}
    >
      <circle cx="10" cy="10" r="10" fill={color} />
      <mask
        id="mask0_0_3495"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask="url(#mask0_0_3495)">
        <rect width="38" height="20" fill="url(#pattern0_0_3495)" />
      </g>
      <defs>
        <pattern id="pattern0_0_3495" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_0_3495" transform="scale(0.0131579 0.0243902)" />
        </pattern>
        <image
          id="image0_0_3495"
          width="76"
          height="41"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default USAFlagIcon;
