import Layout from "@/layout";

const SignUpLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout hasBorderBottomHeader>
      <div className="flex flex-col items-center justify-center h-fit pb-15 pt-45">{children}</div>
    </Layout>
  );
};

export default SignUpLayout;
