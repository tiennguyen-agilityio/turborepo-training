"use client";

import { ButtonProps } from "tamagui";
import { useRouter } from "next/navigation";

// Constants
import { ROUTES } from "@repo/constants/routes";

// Components
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
  const router = useRouter();

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
      onPress={() => router.replace(ROUTES.HOME)}
      {...props}
    >
      {text}
    </Button>
  );
};

export default Logo;
