import { Stack, YStack } from "tamagui";
import { Header, Footer } from "@packages/tamagui-ui/layouts";

const SignInLayout = ({
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

export default SignInLayout;
