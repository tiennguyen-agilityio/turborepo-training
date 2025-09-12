import Svg, { Circle, Path } from "react-native-svg";
import { SVGProps } from "@packages/types/svg";

export const CartIcon = ({
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
      strokeWidth={2}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...props}
    >
      <Circle cx={8} cy={21} r={1} />
      <Circle cx={19} cy={21} r={1} />
      <Path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
    </Svg>
  );
};
