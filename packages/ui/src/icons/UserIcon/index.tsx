import Svg, { Circle, Path } from "react-native-svg";
import { SVGProps } from "@packages/types/svg";

const UserIcon = ({
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
      <Path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
      <Circle cx={12} cy={7} r={4} />
    </Svg>
  );
};

export default UserIcon;
