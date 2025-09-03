"use client";

import { YStack, XStack, Text, Paragraph } from "tamagui";

// Constants
import { NAV_FOOTERS } from "@repo/constants/nav";

// Components
import { Button, Input, Container } from "../../components/";

const TopNav = () => {
  return (
    <Container paddingVertical="$8" $md={{ paddingVertical: "$12" }}>
      <XStack
        width="100%"
        flexDirection="column"
        justifyContent="center"
        $md={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <YStack
          width="100%"
          marginTop="$5"
          paddingRight="$5"
          gap="$2.5"
          $md={{ width: "fit-content" }}
        >
          <Text fontWeight={700} fontSize={13} marginBottom="$3">
            Need Travelsy Help?
          </Text>
          <Paragraph fontSize={13} marginBottom="$1">
            Got Questions? Call us 24/7!
          </Paragraph>
          <Paragraph fontSize={13} marginBottom="$1">
            Call Us:{" "}
            <Text asChild color="$link" textDecorationLine="underline">
              <a href="tel:+254716909815">+254 716909 815</a>
            </Text>
          </Paragraph>
          <Paragraph fontSize="$xs">
            Email Us:{" "}
            <Text
              asChild
              color="$link"
              textDecorationLine="underline"
              fontSize="$xs"
            >
              <a href="mailto:info@travelsy.com">info@travelsy.com</a>
            </Text>
          </Paragraph>

          <Text fontWeight={700} fontSize="$sm" marginTop="$4">
            Contact Info:
          </Text>
          <Paragraph fontSize="$xs" lineHeight="$xs">
            2nd Floor, Fedha Plaza,
            <br />
            Westlands, Nairobi, Kenya.
          </Paragraph>
          <Paragraph fontSize="$xs">
            P.O Box 7231-00300
            <br />
            Nairobi, Kenya
          </Paragraph>

          <XStack gap="$3" marginTop="$3">
            <Button
              variant="outlined"
              width="$8.5"
              height="$8.5"
              borderRadius="$full"
              borderColor="$border"
              backgroundColor="$accent"
              color="$ring"
            >
              Tw
            </Button>
            <Button
              variant="outlined"
              width="$8.5"
              height="$8.5"
              borderRadius="$full"
              borderColor="$border"
              backgroundColor="$accent"
              color="$ring"
            >
              Ins
            </Button>
            <Button
              variant="outlined"
              width="$8.5"
              height="$8.5"
              borderRadius="$full"
              borderColor="$border"
              backgroundColor="$accent"
              color="$ring"
            >
              You
            </Button>
          </XStack>
        </YStack>

        {NAV_FOOTERS?.map(({ label = "", links = [] }, index) => (
          <YStack
            key={index}
            width="100%"
            marginTop="$5"
            paddingRight="$3"
            $md={{ width: "fit-content" }}
          >
            <Text fontWeight={700} fontSize={13} marginBottom="$3">
              {label}
            </Text>
            <YStack gap="$2.5">
              {links?.map(({ text = "" }, currentIndex: number) => (
                <Text key={currentIndex} fontSize="$xs" cursor="pointer">
                  {text}
                </Text>
              ))}
            </YStack>
          </YStack>
        ))}

        <YStack
          width="100%"
          marginTop="$5"
          paddingRight="$3"
          $md={{ width: "fit-content" }}
        >
          <Text fontWeight={700} fontSize={13} marginBottom="$3">
            Mailing List
          </Text>
          <Paragraph
            maxWidth={320}
            fontSize="$xs"
            lineHeight="$xs"
            letterSpacing={1.2}
            marginBottom="$3"
            textWrap="wrap"
          >
            Sign up for our mailing list and get the latest offers and
            promotions straight in your inbox.
          </Paragraph>
          <XStack>
            <Input
              placeholder="Your Email"
              flex={1}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              height={50}
            />
            <Button
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              paddingVertical="$4"
            >
              Subscribe
            </Button>
          </XStack>
        </YStack>
      </XStack>
    </Container>
  );
};

export default TopNav;
