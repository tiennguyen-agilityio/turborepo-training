"use client";

import { memo, useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useToastController } from "@tamagui/toast";
import { Popover, Stack, XStack, YStack, Text } from "tamagui";

// Types
import { DIRECTION } from "@packages/types/svg";

// Constants
import { LOCAL_STORAGE_KEYS } from "@packages/constants/common";
import { USER_DROPDOWNS } from "@packages/constants/nav";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@packages/constants/messages";
import { ROUTES } from "@packages/constants/routes";

// Components
import Avatar from "../Avatar";
import AlertDialog from "../AlertDialog";
import Button from "../Button";
import ChevronIcon from "../../icons/ChevronIcon";

interface UserDropdownProps {
  iconColor?: string;
  onChange?: () => void;
}

const UserDropdown = ({
  iconColor = "$color",
  onChange,
}: UserDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToastController();
  const { user } = useUser();
  const { signOut } = useClerk();

  const isUserProfile = pathname.startsWith(ROUTES.USER_PROFILE);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { imageUrl = "", firstName = "", lastName = "" } = user || {};
  const displayName = `${firstName?.trim().charAt(0)}${lastName
    ?.trim()
    .charAt(0)}`;

  const handleToggleAlert = useCallback(() => {
    setIsOpenAlert((prev) => !prev);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const handleClick = useCallback(
    (href: string, isSignOut: boolean) => {
      setIsOpenMenu(false);
      if (isSignOut) {
        return setIsOpenAlert(true);
      }

      onChange?.();
      return router.push(href);
    },
    [onChange, router]
  );

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    localStorage.setItem(LOCAL_STORAGE_KEYS.MANUAL_SIGN_OUT, "true");

    await signOut({ redirectUrl: pathname })
      .then(() => {
        setIsOpenAlert(false);
        setIsLoading(false);
        onChange?.();
        toast.show(SUCCESS_MESSAGES.SIGNED_OUT, {
          type: "success",
        });
      })
      .catch(() => {
        setIsOpenAlert(false);
        setIsLoading(false);
        onChange?.();
        toast.show(ERROR_MESSAGES.SIGN_OUT_FAILED, {
          type: "error",
        });
      });
  }, [toast, pathname, onChange, signOut]);

  return (
    <XStack>
      <Stack>
        <Popover
          resize
          allowFlip
          stayInFrame
          offset={6}
          placement="bottom"
          open={isOpenMenu}
          onOpenChange={handleToggleMenu}
        >
          <Popover.Trigger asChild cursor="pointer">
            <XStack gap="$4" alignItems="center">
              <Avatar src={imageUrl || ""} name={displayName} isActive />
              <Text color={iconColor}>
                <ChevronIcon
                  direction={isOpenMenu ? DIRECTION.UP : DIRECTION.DOWN}
                />
              </Text>
            </XStack>
          </Popover.Trigger>

          <Popover.Content
            bordered
            borderColor="$border"
            marginRight="$5"
            elevate
            animation="quick"
          >
            <YStack>
              {USER_DROPDOWNS.map(
                ({ text, href, isSignOut = false }, index) => {
                  const isActive =
                    isUserProfile && href === ROUTES.USER_PROFILE;
                  const handleItemClick = () => handleClick(href, isSignOut);
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      textAlign="left"
                      justifyContent="flex-start"
                      alignContent="center"
                      alignItems="center"
                      height="$10.5"
                      paddingHorizontal="$5"
                      borderBottomWidth={
                        index === USER_DROPDOWNS?.length - 1 ? 0 : 1
                      }
                      borderRadius="none"
                      borderBottomColor="$border"
                      color={isActive ? "$primary" : "$color"}
                      backgroundColor={isActive ? "$accent" : "transparent"}
                      textProps={{
                        textAlign: "left",
                      }}
                      onPress={handleItemClick}
                    >
                      {text}
                    </Button>
                  );
                }
              )}
            </YStack>
          </Popover.Content>
        </Popover>
      </Stack>

      <AlertDialog
        open={isOpenAlert}
        isLoading={isLoading}
        onOpenChange={handleToggleAlert}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        textAction="Logout"
        onClickAction={handleSignOut}
      />
    </XStack>
  );
};

export default memo(UserDropdown);
