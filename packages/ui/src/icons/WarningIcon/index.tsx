import Svg, { Circle, Path } from "react-native-svg";
import { SVGProps } from "@packages/types/svg";

export const WarningIcon = ({
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
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 8L12 12" />
      <Path d="M12 16L12.01 16" />
    </Svg>
  );
};
