import { Stack, YStack } from "tamagui";
import { Header } from "@packages/tamagui-ui/layouts";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Stack>
      <Header position="absolute" top="0" left={0} zIndex={4} />
      <YStack justifyContent="center">{children}</YStack>
    </Stack>
  );
};

export default PublicLayout;
