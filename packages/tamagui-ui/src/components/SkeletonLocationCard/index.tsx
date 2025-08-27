import { YStack, Stack, Card, CardProps } from "tamagui";
import Skeleton from "../Skeleton";

const SkeletonLocationCard = (props: CardProps) => {
  return (
    <Card
      bordered
      backgroundColor="$background"
      overflow="hidden"
      shadowColor="$shadowColor"
      shadowOpacity={0.1}
      {...props}
    >
      <Stack width="auto" minHeight={300} maxHeight={350}>
        <Skeleton height="100%" borderRadius={0} />
      </Stack>
      <YStack padding="$4" paddingBottom="$6" gap="$3">
        <Skeleton height={28} />
        <Skeleton height={24} />
        <Skeleton height={24} />
      </YStack>
    </Card>
  );
};

export default SkeletonLocationCard;
