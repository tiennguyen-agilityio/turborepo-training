"use client";

import { Button, ButtonProps } from "tamagui";

interface LogoProps extends ButtonProps {
  text?: string;
  color?: string;
  className?: string;
}

const Logo = ({
  text = "Travelsy",
  className = "",
  color = "$color",
  textProps = {},
  ...props
}: LogoProps) => {
  return (
    <Button
      unstyled
      fontWeight="$bold"
      fontSize="$lg"
      width="min-content"
      pressStyle={{ opacity: 0.8 }}
      textProps={{
        lineHeight: "$base",
        fontWeight: 700,
        color,
        ...textProps,
      }}
      className={className}
      {...props}
    >
      {text}
    </Button>
  );
};

export default Logo;
