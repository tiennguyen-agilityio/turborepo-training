"use client";

import { useEffect, useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";

// Types
import { OAuthStrategy } from "@/types/auth";

// Constants
import { ERROR_MESSAGES } from "@/constants/messages";

// Components
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";

interface Props {
  isSignIn?: boolean;
}

const SocialButtonsV2 = ({ isSignIn = false }: Props) => {
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();

  const [socialLoading, setSocialLoading] = useState<null | OAuthStrategy>(null);
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
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_IN_FAILED;
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
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_UP_FAILED;
      setErrorMessage(message);
      setSocialLoading(null);
    }
  };

  const handleClickFacebook = () => {
    if (isSignIn) {
      return handleSocialSignIn(OAuthStrategy.Facebook);
    }

    return handleSocialSignUp(OAuthStrategy.Facebook);
  };

  const handleClickGoogle = () => {
    if (isSignIn) {
      return handleSocialSignIn(OAuthStrategy.Google);
    }

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
    <div className="w-full">
      <div className="flex flex-col @md:flex-row justify-between mt-12.5 gap-1.5 @md:gap-2.5">
        <Button
          type="button"
          onClick={handleClickFacebook}
          className="gap-2.5 @md:flex-1/2 bg-facebook hover:bg-facebook/75 transition-colors duration-300"
        >
          <FacebookIcon className="hidden sm:block" />
          <div className="border-l-[1px] h-5 border-foreground" />
          Sign {isSignIn ? "in" : "up"} with Facebook
          {socialLoading === OAuthStrategy.Facebook && (
            <Loading iconOnly iconClassName="size-6" wrapperClassName="w-fit h-fit" />
          )}
        </Button>

        <Button
          type="button"
          onClick={handleClickGoogle}
          className="gap-2.5 @md:flex-1/2 bg-google hover:bg-google/75 transition-colors duration-300"
        >
          <GoogleIcon />
          <div className="border-l-[1px] h-5 border-foreground" />
          Sign {isSignIn ? "in" : "up"} with Google
          {socialLoading === OAuthStrategy.Google && (
            <Loading iconOnly iconClassName="size-6" wrapperClassName="w-fit h-fit" />
          )}
        </Button>
      </div>
      <div id="clerk-captcha" className="mt-5 text-center" />
      {errorMessage && <p className="text-error text-center my-2">{errorMessage}</p>}
    </div>
  );
};

export default SocialButtonsV2;
