import Svg, { Rect, Path } from "react-native-svg";
import { SVGProps } from "@repo/types/svg";

export const HamburgerIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  ...props
}: SVGProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Rect width="18" height="18" x="3" y="3" rx="2" />
      <Path d="M7 8h10" />
      <Path d="M7 12h10" />
      <Path d="M7 16h10" />
    </Svg>
  );
};
