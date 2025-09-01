"use client";

import { XStackProps } from "tamagui";

// Constants
import { NAV_BAR } from "@repo/constants/nav";

// Components
import {
  Container,
  Logo,
  NavigationMenu,
  UserDropdown,
} from "../../components";

interface HeaderProps extends XStackProps {
  hasBorderBottom?: boolean;
}

const Header = ({ hasBorderBottom = false, ...props }: HeaderProps) => {
  return (
    <Container
      height="$25"
      borderBottomColor="$border"
      borderBottomWidth={hasBorderBottom ? 1 : 0}
      {...props}
    >
      <Logo />
      <NavigationMenu list={NAV_BAR} />
      <UserDropdown />
    </Container>
  );
};

export default Header;
