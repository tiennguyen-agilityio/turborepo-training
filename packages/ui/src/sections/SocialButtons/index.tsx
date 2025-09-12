"use client";

import { useEffect, useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { YStack, Paragraph, Separator } from "tamagui";

// Types
import { OAuthStrategy } from "@packages/types/auth";

// Constants
import { ERROR_MESSAGES } from "@packages/constants/messages";

// Components
import { Button } from "../../components";
import { GoogleIcon, FacebookIcon } from "../../icons";

interface Props {
  isSignIn?: boolean;
}

const SocialButtons = ({ isSignIn = false }: Props) => {
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();

  const [socialLoading, setSocialLoading] = useState<null | OAuthStrategy>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string>("");

  const handleSocialSignIn = async (provider: OAuthStrategy) => {
    if (!isSignInLoaded || !signIn) return;
    setSocialLoading(provider);

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        continueSignUp: true,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: redirectUrl || "/",
      });
      setSocialLoading(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_IN_FAILED;
      setErrorMessage(message);
      setSocialLoading(null);
    }
  };

  const handleSocialSignUp = async (provider: OAuthStrategy) => {
    setErrorMessage("");
    if (!isSignUpLoaded || !signUp) return;
    setSocialLoading(provider);

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        continueSignIn: true,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: redirectUrl || "/",
      });
      setSocialLoading(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_UP_FAILED;
      setErrorMessage(message);
      setSocialLoading(null);
    }
  };

  const handleClickFacebook = () => {
    if (isSignIn) return handleSocialSignIn(OAuthStrategy.Facebook);
    return handleSocialSignUp(OAuthStrategy.Facebook);
  };

  const handleClickGoogle = () => {
    if (isSignIn) return handleSocialSignIn(OAuthStrategy.Google);
    return handleSocialSignUp(OAuthStrategy.Google);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.slice(2));
      const redirect = params.get("redirect_url") || "";
      if (redirect) {
        const decoded = decodeURIComponent(redirect);
        const url = new URL(decoded);
        setRedirectUrl(url.pathname);
      }
    }
  }, []);

  return (
    <YStack width="100%" marginTop="$6">
      <YStack
        flex={1}
        gap="$5"
        $xs={{ flexDirection: "row" }}
        justifyContent="space-between"
        boxSizing="content-box"
      >
        <Button
          flex={1}
          backgroundColor="$facebook"
          justifyContent="center"
          icon={FacebookIcon}
          disabled={!!socialLoading}
          isLoading={socialLoading === OAuthStrategy.Facebook}
          onPress={handleClickFacebook}
        >
          <Separator vertical width={1} height="$6" backgroundColor="$border" />
          {`Sign ${isSignIn ? "in" : "up"} with Facebook`}
        </Button>
        <Button
          flex={1}
          backgroundColor="$google"
          disabled={!!socialLoading}
          icon={GoogleIcon}
          isLoading={socialLoading === OAuthStrategy.Google}
          onPress={handleClickGoogle}
        >
          <Separator vertical width={1} height="$6" backgroundColor="$border" />
          {`Sign ${isSignIn ? "in" : "up"} with Google`}
        </Button>
      </YStack>
      <YStack
        id="clerk-captcha"
        marginTop="$4"
        marginHorizontal="auto"
        justifyContent="center"
      />
      {errorMessage && (
        <Paragraph color="$error" textAlign="center" marginTop="$2">
          {errorMessage}
        </Paragraph>
      )}
    </YStack>
  );
};

export default SocialButtons;
