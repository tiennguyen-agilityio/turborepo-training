"use client";

import { YStack, XStack, Text, H6, H2, Separator } from "tamagui";
import { DIRECTION } from "@repo/types/svg";

// Components
import TestimonialItem from "./TestimonialItem";
import { ChevronIcon } from "../../icons";
import { Container } from "../../components";

const TESTIMONIALS = [
  {
    id: "01",
    title: "Best User Experience",
    descriptions:
      "Because the rock was laid down in layers, there is a variation in the hardness of the rock formed. When water runoff trickles across the rock, some areas erode rapidly whereas others hold firm. This variation in erosion speed causes the formation of pinnacles, or “hoodoos” of stable rock.",
    authorAvatar: "https://i.ibb.co/PG1p6pdg/avatar-02.png",
    authorName: "Derek Dunn",
  },
  {
    id: "02",
    title: "Friendly staff",
    descriptions:
      "Whether its a driving tour, a cruise or a bus, leaf viewing is a great way to spend a fall vacation. It’s also big tour business and the are many options.",
    authorAvatar: "https://i.ibb.co/cXVN8z3D/avatar-01.png",
    authorName: "Derek Dunn",
  },
];

const Testimonials = () => {
  return (
    <YStack width="100%" backgroundColor="$accent">
      <Container
        alignItems="stretch"
        flexWrap="wrap"
        gap="$2"
        overflow="hidden"
        paddingVertical="$25"
        $md={{ flexDirection: "row" }}
      >
        <YStack width="100%">
          <H6
            fontWeight={700}
            fontSize="$sm"
            lineHeight="$md"
            marginBottom="$5"
            color="$ring"
          >
            Testimonials
          </H6>

          <YStack
            gap="$1.5"
            alignContent="flex-start"
            $md={{ flexDirection: "row" }}
          >
            <H2 fontSize={50} lineHeight={54}>
              What customers
            </H2>
            <H2 fontSize={50} lineHeight={54} color="$primary">
              say about us
            </H2>
          </YStack>

          <XStack
            alignItems="center"
            justifyContent="space-around"
            height="$15"
            width={84}
            marginTop="$20"
            backgroundColor="$background"
          >
            <Text color="$border" width="fit">
              <ChevronIcon direction={DIRECTION.LEFT} />
            </Text>
            <Separator
              vertical
              height="$10"
              borderColor="$border"
              transform={[{ rotate: "20deg" }]}
            />
            <Text color="$border" width="fit">
              <ChevronIcon direction={DIRECTION.RIGHT} />
            </Text>
          </XStack>
        </YStack>

        <XStack
          width="100%"
          flexDirection="column"
          gap="$5"
          marginTop="$10"
          $md={{ flexDirection: "row" }}
        >
          {TESTIMONIALS.map((item, index) => (
            <YStack key={item.id || index} width="100%" $md={{ flex: 1 }}>
              <TestimonialItem {...item} />
            </YStack>
          ))}
        </XStack>
      </Container>
    </YStack>
  );
};

export default Testimonials;
