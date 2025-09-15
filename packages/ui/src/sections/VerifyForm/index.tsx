"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { YStack, XStack, Paragraph, H1, Form } from "tamagui";

// Types
import { VerifyFormData } from "@packages/types/auth";

// Constants
import { SCHEMA } from "@packages/constants/validation";
import { ERROR_MESSAGES } from "@packages/constants/messages";
import { ROUTES } from "@packages/constants/routes";

// Components
import Button from "../../components/Button";
import Input from "../../components/Input";

const VerifyForm = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const redirectUrl = searchParams.get("redirect_url") || "/";

  const { control, handleSubmit } = useForm<VerifyFormData>({
    defaultValues: {
      code: "",
    },
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleVerifyForm = async ({ code }: VerifyFormData) => {
    if (!isLoaded || !signUp) return;
    setErrorMessage("");
    setIsLoading(true);

    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace(redirectUrl);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setErrorMessage(ERROR_MESSAGES.VERIFICATION_INCOMPLETE);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : ERROR_MESSAGES.VERIFICATION_INCOMPLETE;
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <YStack
      paddingHorizontal="$4"
      marginVertical="$12"
      marginHorizontal="auto"
      justifyContent="center"
      width="100%"
      maxWidth={545}
    >
      <Form onSubmit={handleSubmit(handleVerifyForm)}>
        <YStack gap="$5">
          <H1 textAlign="center" fontSize={70} lineHeight={74}>
            Verify email code
          </H1>

          <Controller
            name="code"
            control={control}
            rules={SCHEMA.code}
            render={({
              field: { value, onChange, ...props },
              fieldState: { error },
            }) => (
              <Input
                label="Email code"
                placeholder="Enter email code"
                errorMessage={error?.message}
                value={value}
                disabled={isLoading}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleVerifyForm)}
                {...props}
              />
            )}
          />

          {errorMessage && (
            <Paragraph color="$error" size="$sm" textAlign="center">
              {errorMessage}
            </Paragraph>
          )}

          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleSubmit(handleVerifyForm)}
          >
            Verify
          </Button>

          <XStack justifyContent="center" alignItems="center">
            <Paragraph size="$sm">Already have an Account?&nbsp;</Paragraph>
            <Button
              size="$sm"
              variant="link"
              textProps={{
                textDecorationLine: "underline",
              }}
              disabled={isLoading}
              onPress={handleGoToSignIn}
            >
              Sign in
            </Button>
          </XStack>
        </YStack>
      </Form>
    </YStack>
  );
};

export default VerifyForm;
