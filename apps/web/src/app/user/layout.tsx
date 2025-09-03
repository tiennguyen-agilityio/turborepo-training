import { Header } from "@packages/tamagui-ui/layouts";
import { Stack, YStack } from "tamagui";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Stack>
      <Header hasBorderBottom />
      <YStack justifyContent="center">{children}</YStack>
    </Stack>
  );
};

export default UserLayout;
