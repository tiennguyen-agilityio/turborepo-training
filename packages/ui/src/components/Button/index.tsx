"use client";

import { ComponentProps, memo, useMemo } from "react";
import { Button as TButton, styled, Spinner } from "tamagui";

export const ButtonFrame = styled(TButton, {
  name: "Button",
  borderRadius: "$sm",
  fontSize: "$sm",
  fontWeight: 400,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  outlineWidth: 0,
  cursor: "pointer",
  pressStyle: {
    opacity: 0.85,
  },
  hoverStyle: {
    opacity: 0.85,
  },
  textProps: {
    fontSize: "$sm",
  },
  gap: 4,
  variants: {
    variant: {
      default: {
        unstyled: true,
        borderWidth: 0,
        paddingHorizontal: "$5",
        backgroundColor: "$primary",
        color: "$primaryForeground",
        shadowColor: "$shadowColor",
        shadowOpacity: 0.2,
      },
      outlined: {
        backgroundColor: "$background",
        borderWidth: 1,
        borderColor: "$primary",
        color: "$accentForeground",
      },
      secondary: {
        backgroundColor: "$secondary",
        color: "$secondaryForeground",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "$accentForeground",
        hoverStyle: {
          color: "$primary",
          backgroundColor: "$accent",
        },
        padding: 0,
      },
      link: {
        padding: 0,
        backgroundColor: "transparent",
        color: "$link",
        textDecorationColor: "$link",
        hoverStyle: {
          backgroundColor: "transparent",
          textDecorationLine: "underline",
        },
      },
    },

    size: {
      default: {
        height: 50,
      },
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = ComponentProps<typeof ButtonFrame> & {
  isLoading?: boolean;
};

const Button = ({ isLoading, children, iconAfter, ...props }: ButtonProps) => {
  const renderIconAfter = useMemo(() => {
    if (iconAfter) return iconAfter;
    if (isLoading) return <Spinner size="small" color="$background" />;
    return undefined;
  }, [iconAfter, isLoading]);

  return (
    <ButtonFrame disabled={isLoading} iconAfter={renderIconAfter} {...props}>
      {children}
    </ButtonFrame>
  );
};

export default memo(Button);
