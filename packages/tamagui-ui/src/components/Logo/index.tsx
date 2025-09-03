"use client";

import { ButtonProps } from "tamagui";

import Button from "../Button";

interface LogoProps extends ButtonProps {
  text?: string;
  color?: string;
}

const Logo = ({
  text = "Travelsy",
  color = "$color",
  textProps,
  ...props
}: LogoProps) => {
  return (
    <Button
      variant="ghost"
      padding={0}
      height="min-content"
      textProps={{
        lineHeight: "$base",
        fontSize: "$lg",
        fontWeight: 700,
        color,
        ...textProps,
      }}
      hoverStyle={{
        backgroundColor: "transparent",
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default Logo;
