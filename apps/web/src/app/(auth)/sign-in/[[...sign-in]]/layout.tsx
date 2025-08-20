import Layout from "@repo/ui/layout";

const SignInLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout hasBorderBottomHeader>
      <div className="flex flex-col items-center justify-center">{children}</div>
    </Layout>
  );
};

export default SignInLayout;
