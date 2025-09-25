"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { YStack, XStack, Paragraph, H1, Form } from "tamagui";
import { Effect } from "effect";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";

// Types
import { SIGN_UP_STATUS } from "@packages/types/auth";

// Constants
import { SCHEMA_VERIFY_CODE } from "@packages/constants/validation";
import { ERROR_MESSAGES } from "@packages/constants/messages";
import { ROUTES } from "@packages/constants/routes";

// Components
import Button from "@packages/ui/components/Button";
import Input from "@packages/ui/components/Input";

type VerifyFormData = typeof SCHEMA_VERIFY_CODE.Type;

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
    resolver: effectTsResolver(SCHEMA_VERIFY_CODE),
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const verifyEffect = (
    code: string,
    signUp: NonNullable<ReturnType<typeof useSignUp>["signUp"]>,
    setActive: NonNullable<ReturnType<typeof useSignUp>["setActive"]>,
    router: ReturnType<typeof useRouter>,
    redirectUrl: string
  ): Effect.Effect<void, string, never> =>
    Effect.gen(function* () {
      const attempt = yield* Effect.tryPromise({
        try: () => signUp.attemptEmailAddressVerification({ code }),
        catch: (error) =>
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.VERIFICATION_INCOMPLETE,
      });

      if (attempt.status === SIGN_UP_STATUS.COMPLETE) {
        yield* Effect.tryPromise({
          try: () => setActive({ session: attempt.createdSessionId }),
          catch: () => ERROR_MESSAGES.SET_ACTIVE_FAILED,
        });
        router.replace(redirectUrl);
      } else {
        yield* Effect.fail(ERROR_MESSAGES.VERIFICATION_INCOMPLETE);
      }
    });

  const handleVerifyForm = async ({ code }: VerifyFormData) => {
    if (!isLoaded || !signUp || !setActive) return;
    setErrorMessage("");
    setIsLoading(true);

    Effect.runPromise(
      verifyEffect(code, signUp, setActive, router, redirectUrl).pipe(
        Effect.matchEffect({
          onFailure: (error) =>
            Effect.sync(() => {
              setErrorMessage(
                typeof error === "string"
                  ? error
                  : ERROR_MESSAGES.VERIFICATION_INCOMPLETE
              );
              setIsLoading(false);
            }),
          onSuccess: () =>
            Effect.sync(() => {
              setIsLoading(false);
            }),
        })
      )
    );
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
