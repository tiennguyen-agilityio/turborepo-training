import { YStack, YStackProps } from "tamagui";

const Skeleton = ({ height, ...props }: YStackProps) => (
  <YStack
    width="100%"
    height={height}
    backgroundColor="$muted"
    borderRadius="$1"
    {...props}
  />
);

export default Skeleton;
