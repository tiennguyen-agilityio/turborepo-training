"use client";

import { UserProfile } from "@clerk/nextjs";
import { Container } from "@packages/tamagui-ui/components";

const ProfilePage = () => {
  return (
    <Container paddingVertical="$10" justifyContent="center">
      <UserProfile />
    </Container>
  );
};

export default ProfilePage;
