"use client";

import { UserProfile } from "@clerk/nextjs";
import Container from "@packages/ui/components/Container";

const ProfilePage = () => {
  return (
    <Container paddingVertical="$10" justifyContent="center">
      <UserProfile />
    </Container>
  );
};

export default ProfilePage;
