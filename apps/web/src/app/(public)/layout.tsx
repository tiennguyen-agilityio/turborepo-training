import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header position="absolute" top="0" left={0} zIndex={4} />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
