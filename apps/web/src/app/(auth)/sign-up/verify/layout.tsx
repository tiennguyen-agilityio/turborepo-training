import { Header, Footer } from "@packages/tamagui-ui/layouts";
import { Stack, YStack } from "tamagui";

const VerifyLayout = ({
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

export default VerifyLayout;
