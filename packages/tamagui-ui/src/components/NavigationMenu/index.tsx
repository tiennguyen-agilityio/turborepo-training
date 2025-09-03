"use client";

import { useRouter } from "next/navigation";
import { XStack, YStack } from "tamagui";
import Button from "../Button";

interface MenuItem {
  name: string;
  href: string;
}

interface NavigationMenuProps {
  list: MenuItem[];
  path?: string;
  color?: string;
}

const NavigationMenu = ({
  list,
  path = "",
  color = "$color",
}: NavigationMenuProps) => {
  const router = useRouter();

  return (
    <XStack
      alignItems="center"
      gap="$3"
      $sm={{
        gap: "$5",
      }}
      $md={{
        gap: "$7",
      }}
    >
      {list?.map(({ name, href }, index) => {
        const isActive = path === href;
        const handlePress = () => router.push(href || "/");

        return (
          <Button
            key={index}
            variant="ghost"
            flexDirection="column"
            gap={0}
            paddingTop="$2"
            color={isActive ? "$primary" : color}
            fontWeight={700}
            hoverStyle={{
              opacity: 1,
              backgroundColor: "transparent",
            }}
            onPress={handlePress}
          >
            {name}
            <YStack
              width="$2"
              height="$2"
              borderRadius="$full"
              backgroundColor={isActive ? "$primary" : "transparent"}
              animation="quick"
            />
          </Button>
        );
      })}
    </XStack>
  );
};

export default NavigationMenu;
