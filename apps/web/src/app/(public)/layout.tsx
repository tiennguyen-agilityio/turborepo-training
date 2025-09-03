import { Header } from "@packages/tamagui-ui/layouts";
import { Stack, YStack } from "tamagui";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Stack>
      <Header />
      <YStack justifyContent="center">{children}</YStack>
    </Stack>
  );
};

export default PublicLayout;
