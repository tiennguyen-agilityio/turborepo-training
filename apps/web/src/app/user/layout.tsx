import { Stack, YStack } from "tamagui";
import { Header, Footer } from "@packages/ui/layouts";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Stack>
      <Header hasBorderBottom />
      <YStack justifyContent="center">{children}</YStack>
      <Footer />
    </Stack>
  );
};

export default UserLayout;
