"use client";

import { memo, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useClerk,
} from "@clerk/nextjs";
import { YStack, Sheet, XStackProps } from "tamagui";
import { useToastController } from "@tamagui/toast";

// Constants
import { NAV_BAR, USER_DROPDOWNS } from "@packages/constants/nav";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@packages/constants/messages";
import { LOCAL_STORAGE_KEYS } from "@packages/constants/common";
import { ROUTES } from "@packages/constants/routes";

// Components
import AlertDialog from "../../components/AlertDialog";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import CloseIcon from "../../icons/CloseIcon";
import HamburgerIcon from "../../icons/HamburgerIcon";

interface MiniHeaderProps extends XStackProps {
  hasBorderBottom?: boolean;
}

const MiniHeader = ({ hasBorderBottom = false, ...props }: MiniHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname() || "";
  const { signOut } = useClerk();
  const toast = useToastController();

  const isActiveSignIn = pathname.startsWith("/sign-in");
  const isActiveSignUp = pathname.startsWith("/sign-up");

  const [open, setOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isUserProfile = pathname.startsWith(ROUTES.USER_PROFILE);

  const textColor = hasBorderBottom ? "$color" : "$background";

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const handleToggleSheet = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    localStorage.setItem(LOCAL_STORAGE_KEYS.MANUAL_SIGN_OUT, "true");

    await signOut({ redirectUrl: pathname })
      .then(() => {
        setIsOpenAlert(false);
        setIsLoading(false);
        toast.show(SUCCESS_MESSAGES.SIGNED_OUT, {
          type: "success",
        });
      })
      .catch(() => {
        setIsOpenAlert(false);
        setIsLoading(false);
        toast.show(ERROR_MESSAGES.SIGN_OUT_FAILED, {
          type: "error",
        });
      });
  }, [pathname, toast, signOut]);

  const handleClick = useCallback(
    (href: string, isSignOut: boolean) => {
      setOpen(false);
      if (isSignOut) {
        return setIsOpenAlert(true);
      }

      return router.push(href);
    },
    [router]
  );

  const handleToggleAlert = useCallback(() => {
    setIsOpenAlert((prev) => !prev);
  }, []);

  return (
    <Container
      justifyContent="space-between"
      backgroundColor="transparent"
      $md={{ display: "none" }}
      {...props}
    >
      <Logo color={textColor} />
      <Button
        variant="ghost"
        color={textColor}
        hoverStyle={{
          backgroundColor: "transparent",
          opacity: 0.85,
        }}
        onPress={handleToggleSheet}
      >
        <HamburgerIcon />
      </Button>
      <Sheet
        modal
        open={open}
        onOpenChange={handleOpenChange}
        snapPoints={[100]}
        dismissOnSnapToBottom
        position={0}
        animation="medium"
      >
        <Sheet.Overlay />
        <Sheet.Frame position="relative" padding="$5" gap="$4">
          <Button
            variant="ghost"
            width="$6"
            height="$6"
            color="$color"
            position="absolute"
            right="$4"
            top="$4"
            zIndex={2}
            hoverStyle={{
              backgroundColor: "transparent",
              opacity: 0.85,
            }}
            textProps={{
              color: "$color",
              hoverStyle: {
                color: "$color",
                opacity: 0.85,
              },
            }}
            onPress={handleCloseSheet}
          >
            <CloseIcon />
          </Button>
          <YStack position="relative" gap="$2">
            {NAV_BAR?.map(({ name, href }, index) => {
              const isActive = pathname === href;
              const handleItemClick = () => {
                handleCloseSheet();
                router.push(href);
              };
              return (
                <Button
                  key={index}
                  variant="ghost"
                  height="$9"
                  justifyContent="flex-start"
                  paddingLeft="$3"
                  color={isActive ? "$primary" : "$color"}
                  {...(isActive && {
                    backgroundColor: "$accent",
                  })}
                  hoverStyle={{
                    backgroundColor: "$accent",
                  }}
                  onPress={handleItemClick}
                >
                  {name}
                </Button>
              );
            })}
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    height="$9"
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="$3"
                    color={isActiveSignIn ? "$primary" : "$color"}
                    {...(isActiveSignIn && {
                      backgroundColor: "$accent",
                    })}
                    hoverStyle={{
                      backgroundColor: "$accent",
                    }}
                    onPress={handleCloseSheet}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant="ghost"
                    height="$9"
                    width="100%"
                    justifyContent="flex-start"
                    paddingLeft="$3"
                    color={isActiveSignUp ? "$primary" : "$color"}
                    {...(isActiveSignUp && {
                      backgroundColor: "$accent",
                    })}
                    hoverStyle={{
                      backgroundColor: "$accent",
                    }}
                    onPress={handleCloseSheet}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <YStack width="100%" gap="$2" $md={{ display: "none" }}>
                  {USER_DROPDOWNS.map(
                    ({ text, href, isSignOut = false }, index) => (
                      <Button
                        key={index}
                        width="100%"
                        variant="ghost"
                        height="$9"
                        justifyContent="flex-start"
                        paddingLeft="$3"
                        color={
                          isUserProfile && href === ROUTES.USER_PROFILE
                            ? "$primary"
                            : "$color"
                        }
                        {...(isUserProfile &&
                          href === ROUTES.USER_PROFILE && {
                            backgroundColor: "$accent",
                          })}
                        hoverStyle={{
                          backgroundColor: "$accent",
                        }}
                        onPress={() => handleClick(href, isSignOut)}
                      >
                        {text}
                      </Button>
                    )
                  )}
                </YStack>
              </SignedIn>
            </ClerkLoaded>
            <ThemeToggle onChange={handleCloseSheet} />
          </YStack>
        </Sheet.Frame>
      </Sheet>
      <AlertDialog
        open={isOpenAlert}
        isLoading={isLoading}
        onOpenChange={handleToggleAlert}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        textAction="Logout"
        onClickAction={handleSignOut}
      />
    </Container>
  );
};

export default memo(MiniHeader);
