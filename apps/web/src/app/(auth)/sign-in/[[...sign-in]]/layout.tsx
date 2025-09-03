import Container from "@packages/ui/components/Container";
import { Header, Footer } from "@packages/ui/layouts";

const SignInLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header hasBorderBottom />
      <Container justifyContent="center">{children}</Container>
      <Footer />
    </>
  );
};

export default SignInLayout;
