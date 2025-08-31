"use client";

import { ComponentProps } from "react";
import { Button as TButton, styled, Spinner } from "tamagui";

type CustomButtonProps = ComponentProps<typeof ButtonFrame> & {
  isLoading?: boolean;
};

export const ButtonFrame = styled(TButton, {
  name: "Button",
  borderRadius: "$sm",
  fontSize: "$sm",
  fontWeight: 600,
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
  gap: 4,

  variants: {
    variant: {
      default: {
        unstyled: true,
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
          backgroundColor: "$accent",
        },
        padding: 0,
      },
      link: {
        backgroundColor: "transparent",
        color: "$primary",
        textDecorationColor: "$primary",
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

const Button = ({ isLoading, children, ...props }: CustomButtonProps) => {
  return (
    <ButtonFrame disabled={isLoading} {...props}>
      {children}
      {isLoading && <Spinner size="small" color="$background" />}
    </ButtonFrame>
  );
};

export default Button;
