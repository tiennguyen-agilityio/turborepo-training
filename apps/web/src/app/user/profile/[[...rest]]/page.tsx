import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <UserProfile
      appearance={{
        elements: {
          rootBox: "w-full mx-auto px-5 py-10",
        },
      }}
    />
  );
};

export default ProfilePage;
