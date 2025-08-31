"use client";

import { Anchor, XStack, YStack, Text } from "tamagui";

interface MenuItem {
  name: string;
  href: string;
}

interface NavigationMenuProps {
  list: MenuItem[];
  path?: string;
}

const NavigationMenu = ({ list, path = "" }: NavigationMenuProps) => {
  return (
    <XStack tag="nav" gap="$3" justifyContent="center" alignItems="center">
      {list?.map(({ name, href }, index) => {
        const isActive = path === href;

        return (
          <YStack
            key={index}
            alignItems="center"
            justifyContent="center"
            paddingHorizontal="$2"
            paddingVertical="$3"
          >
            <Anchor
              asChild
              href={href}
              fontWeight={700}
              color={isActive ? "$primary" : "$color"}
            >
              <Text>{name}</Text>
            </Anchor>

            <YStack
              width={8}
              height={8}
              marginTop="$1.5"
              borderRadius="$full"
              backgroundColor={isActive ? "$primary" : "transparent"}
              animation="quick"
            />
          </YStack>
        );
      })}
    </XStack>
  );
};

export default NavigationMenu;
