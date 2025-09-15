"use client";

import { Stack, H2, H6 } from "tamagui";

import Container from "../../components/Container";
import Post from "../../components/Post";

const AboutSection = () => {
  const handleReadMore = () => {};

  return (
    <Container
      marginTop="$6"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <H6
        fontWeight={700}
        fontSize="$sm"
        lineHeight="$md"
        marginBottom="$5"
        color="$ring"
      >
        ABOUT US
      </H6>

      <H2 fontSize="$3xl" lineHeight="$3xl" whiteSpace="pre-line">
        A Guide To Rocky Mountain
        {"\n"}
        Vacations
      </H2>

      <Stack
        gap="$5"
        marginTop="$15"
        $sm={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Post
          $md={{ flex: 1 }}
          image="https://i.ibb.co/KcPCsYQL/Rectangle-3.png"
          text="Because the rock was laid down in layers, there is a variation in the hardness of the rock formed. When water runoff trickles across the rock, some areas erode rapidly whereas others hold firm. This variation in erosion speed causes the formation of pinnacles, or “hoodoos” of stable rock."
          onReadMore={handleReadMore}
        />

        <Post
          flex={1}
          $md={{ flex: 1 }}
          image="https://i.ibb.co/MFjB1W7/Rectangle-Copy-2.png"
          text="In some places the water seeps down through cracks & eats out holes beneath the surface. When the side rock erodes away, an archway is left behind. Eventually the arch collapses, leaving one more pillars to join the rest. The ever changing vista of colors, spires, walls & archways is spectacular at any season, & the park is open all year round."
        />
      </Stack>
    </Container>
  );
};

export default AboutSection;
