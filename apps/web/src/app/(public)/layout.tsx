import { Stack, YStack } from "tamagui";
import { Header, Footer } from "@packages/ui/layouts";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Stack>
      <Header position="absolute" top="0" left={0} zIndex={4} />
      <YStack justifyContent="center">{children}</YStack>
      <Footer />
    </Stack>
  );
};

export default PublicLayout;
