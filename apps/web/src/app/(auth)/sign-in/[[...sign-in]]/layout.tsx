import Container from "@packages/ui/components/Container";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

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
