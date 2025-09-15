"use client";

import { Stack, XStack, XStackProps, Text } from "tamagui";
import { usePathname, useRouter } from "next/navigation";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

// Constants
import { NAV_BAR } from "@packages/constants/nav";
import { ROUTES } from "@packages/constants/routes";

// Components
import Button from "../../components/Button";
import Container from "../../components/Container";
import Divider from "../../components/Divider";
import Logo from "../../components/Logo";
import NavigationMenu from "../../components/NavigationMenu";
import ThemeToggle from "../../components/ThemeToggle";
import UserDropdown from "../../components/UserDropdown";

import BookmarkIcon from "../../icons/BookmarkIcon";
import SearchIcon from "../../icons/SearchIcon";
import MiniHeader from "./MiniHeader";

interface HeaderProps extends XStackProps {
  hasBorderBottom?: boolean;
}

const Header = ({ hasBorderBottom = false, ...props }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname() || "";

  const isActiveSignIn = pathname.startsWith("/sign-in");
  const isActiveSignUp = pathname.startsWith("/sign-up");
  const textColor = hasBorderBottom ? "$color" : "$background";

  return (
    <Stack width="100%" {...props}>
      <Container height="$25" display="none" $md={{ display: "flex" }}>
        <Logo color={textColor} />
        <NavigationMenu list={NAV_BAR} path={pathname} color={textColor} />

        <XStack
          marginLeft="$5"
          alignItems="center"
          gap="$3"
          $sm={{
            gap: "$5",
          }}
          $md={{
            gap: "$7",
          }}
        >
          <ThemeToggle />
          <Button
            borderRadius="$5"
            justifyContent="center"
            alignContent="center"
            height="$10"
            paddingHorizontal="$6.5"
          >
            <BookmarkIcon />
            Reservations
          </Button>

          <Text color={textColor}>
            <SearchIcon />
          </Text>
          <XStack
            minWidth="$21"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    color={isActiveSignIn ? "$primary" : textColor}
                    fontWeight={700}
                    hoverStyle={{
                      opacity: 1,
                      backgroundColor: "transparent",
                    }}
                    onPress={() => router.push(ROUTES.SIGN_IN)}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <Text color={textColor}>/</Text>
                <SignUpButton>
                  <Button
                    variant="ghost"
                    color={isActiveSignUp ? "$primary" : textColor}
                    fontWeight={700}
                    hoverStyle={{
                      opacity: 1,
                      backgroundColor: "transparent",
                    }}
                    onPress={() => router.push(ROUTES.SIGN_UP)}
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserDropdown iconColor={textColor} />
              </SignedIn>
            </ClerkLoaded>
          </XStack>
        </XStack>
      </Container>

      <MiniHeader hasBorderBottom={hasBorderBottom} />
      {hasBorderBottom && <Divider />}
    </Stack>
  );
};

export default Header;
