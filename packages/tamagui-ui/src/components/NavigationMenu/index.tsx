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
    <XStack gap="$3" justifyContent="center" alignItems="center">
      {list?.map(({ name, href }, index) => {
        const isActive = path === href;

        return (
          <YStack
            key={index}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            paddingHorizontal="$2"
            paddingTop="$5"
            paddingBottom="$1"
          >
            <Anchor
              asChild
              href={href}
              fontWeight={700}
              fontSize="$sm"
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
