import { Separator, Text, YStack } from "tamagui";

interface DividerProps {
  text?: string;
}

const Divider = ({ text = "" }: DividerProps) => {
  return (
    <YStack position="relative">
      <Separator backgroundColor="$muted" />
      {text && (
        <Text
          position="absolute"
          left="50%"
          top="50%"
          paddingHorizontal="$3"
          background="$background"
          zIndex={2}
          x="-50%"
          y="-50%"
        >
          {text}
        </Text>
      )}
    </YStack>
  );
};

export default Divider;
