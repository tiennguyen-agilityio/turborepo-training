import React, { useCallback, useState } from "react";
import { ScrollView, Text, YStack } from "tamagui";
import Toast from "react-native-toast-message";

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@repo/constants/messages";

// Stores
import { useAuthStore } from "@packages/stores/auth";

// Components
import Container from "@packages/ui/components/Container";
import Avatar from "@packages/ui/components/Avatar";
import Button from "@packages/ui/components/Button";
import AlertDialog from "@packages/ui/components/AlertDialog";

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { firstName = "", lastName = "", name = "", email = "" } = user || {};
  const displayName = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  const handleLogOut = useCallback(() => {
    setIsOpenAlert(true);
  }, []);

  const handleToggleAlert = useCallback(() => {
    setIsOpenAlert((prev) => !prev);
  }, []);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    await logout()
      .then(() =>
        Toast.show({
          type: "success",
          text1: "Logout",
          text2: SUCCESS_MESSAGES.SIGNED_OUT,
        })
      )
      .catch(() =>
        Toast.show({
          type: "error",
          text1: "Logout",
          text2: ERROR_MESSAGES.SIGN_OUT_FAILED,
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [logout]);

  return (
    <ScrollView backgroundColor="$background">
      <Container flexDirection="column" paddingVertical="$5">
        <YStack alignItems="center">
          {user && <Avatar name={displayName} size="$15" />}
          <Text>{name}</Text>
          <Text>{email}</Text>
        </YStack>

        <Button size="$10" marginTop="$6" onPress={handleLogOut}>
          Log out
        </Button>

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
    </ScrollView>
  );
};

export default ProfileScreen;
