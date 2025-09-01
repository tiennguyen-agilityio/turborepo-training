import { XStack, XStackProps } from "tamagui";

interface ContainerProps extends XStackProps {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <XStack
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      maxWidth={1440}
      paddingHorizontal="$5"
      marginHorizontal="auto"
      {...props}
    >
      {children}
    </XStack>
  );
};

export default Container;
