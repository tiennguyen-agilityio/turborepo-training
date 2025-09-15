"use client";

import { YStack, Stack } from "tamagui";
import { MoveRight } from "@tamagui/lucide-icons";

// Constants
import { EXPERIENCES } from "@packages/constants/common";
import { HOME_VIDEO } from "@packages/constants/video";

// Components
import Button from "../../components/Button";
import Container from "../../components/Container";
import Experiences from "../../components/Experiences";
import VideoPlayer from "../../components/VideoPlayer";

const HeroSection = () => {
  const handleExperienceClick = () => {};

  const handleFindExperience = () => {};

  return (
    <Stack width="100%" minHeight={300} position="relative">
      <VideoPlayer
        hasPlayed
        {...HOME_VIDEO}
        subTitle="Welcome to Travel"
        title={`Mother Earth\nHosts Our Travels`}
        description="Camping Locations"
      />

      <YStack
        width="100%"
        position="relative"
        $md={{
          height: "$25",
          position: "absolute",
          bottom: 0,
          left: "50%",
          x: "-50%",
        }}
      >
        <Container position="relative">
          <Stack
            position="absolute"
            right="100%"
            x={21}
            bottom={0}
            width="100%"
            height="100%"
            backgroundColor="$background"
            zIndex={5}
          />
          <YStack
            width="100%"
            alignItems="center"
            justifyContent="center"
            gap="$2"
            $md={{
              flexDirection: "row",
              gap: 0,
            }}
          >
            <Stack
              width="100%"
              height={64}
              $md={{ height: "$25", flex: 1 }}
              backgroundColor="$background"
              justifyContent="center"
              alignItems="center"
              zIndex={30}
            >
              <Experiences
                data={EXPERIENCES}
                onItemClick={handleExperienceClick}
              />
            </Stack>

            <Button
              height={56}
              width="100%"
              $md={{
                height: "$25",
                maxWidth: 240,
                borderRadius: 0,
                borderTopRightRadius: "$6",
              }}
              backgroundColor="$accentForeground"
              color="white"
              gap="$4"
              onPress={handleFindExperience}
              zIndex={30}
            >
              FIND AN EXPERIENCE
              <MoveRight color="white" />
            </Button>
          </YStack>
        </Container>
      </YStack>
    </Stack>
  );
};

export default HeroSection;
