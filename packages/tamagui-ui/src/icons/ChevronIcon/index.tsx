import Svg, { Path } from "react-native-svg";
import { DIRECTION, SVGProps } from "@repo/types/svg";

interface ChevronIconProps extends SVGProps {
  direction?: DIRECTION;
}

export const ChevronIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  direction = DIRECTION.DOWN,
  ...props
}: ChevronIconProps) => {
  const rotateValue = (): number => {
    switch (direction) {
      case DIRECTION.LEFT:
        return 90;
      case DIRECTION.UP:
        return 180;
      case DIRECTION.RIGHT:
        return -90;
      case DIRECTION.DOWN:
      default:
        return 0;
    }
  };

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
      style={{
        transform: [{ rotate: `${rotateValue()}deg` }],
      }}
      {...props}
    >
      <Path d="M6 9l6 6 6-6" />
    </Svg>
  );
};
