"use client";

import { useCallback, useRef, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { YStack, XStack, Paragraph, H1, Form, TamaguiElement } from "tamagui";
import { Effect } from "effect";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";

// Types
import { SIGN_IN_STATUS } from "@packages/types/auth";

// Constants
import { SCHEMA_SIGN_IN } from "@packages/constants/validation";
import { ERROR_MESSAGES } from "@packages/constants/messages";
import { ROUTES } from "@packages/constants/routes";

// Hooks
import { useCleanClerkUrl } from "@packages/hooks/useCleanClerkUrl";

// Components
import SocialButtons from "../SocialButtons";
import Button from "@packages/ui/components/Button";
import Checkbox from "@packages/ui/components/Checkbox";
import Divider from "@packages/ui/components/Divider";
import Input from "@packages/ui/components/Input";

type LoginFormData = typeof SCHEMA_SIGN_IN.Type;

const SignInForm = () => {
  const { redirectUrl } = useCleanClerkUrl();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: effectTsResolver(SCHEMA_SIGN_IN),
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef<TamaguiElement | null>(null);

  const signInEffect = useCallback(
    (
      data: LoginFormData,
      signIn: NonNullable<ReturnType<typeof useSignIn>["signIn"]>,
      setActive: NonNullable<ReturnType<typeof useSignIn>["setActive"]>,
      router: ReturnType<typeof useRouter>,
      redirectUrl?: string
    ): Effect.Effect<void, string, never> =>
      Effect.gen(function* () {
        const { email, password } = data;

        const attempt = yield* Effect.tryPromise({
          try: () =>
            signIn.create({
              identifier: email,
              password,
            }),
          catch: (error) =>
            error instanceof Error
              ? error.message
              : ERROR_MESSAGES.SIGN_IN_FAILED,
        });

        if (attempt.status === SIGN_IN_STATUS.COMPLETE) {
          yield* Effect.tryPromise({
            try: () => setActive({ session: attempt.createdSessionId }),
            catch: () => ERROR_MESSAGES.SET_ACTIVE_FAILED,
          });
          yield* Effect.sync(() => router.push(redirectUrl || "/"));
        }
      }),
    []
  );

  const handleSignIn = useCallback(
    async (data: LoginFormData) => {
      if (!isLoaded || !signIn || !setActive) return;
      setIsLoading(true);
      setErrorMessage("");

      Effect.runPromise(
        signInEffect(data, signIn, setActive, router, redirectUrl).pipe(
          Effect.matchEffect({
            onFailure: (error) =>
              Effect.sync(() => {
                setErrorMessage(
                  typeof error === "string"
                    ? error
                    : ERROR_MESSAGES.SIGN_IN_FAILED
                );
                setIsLoading(false);
              }),
            onSuccess: () => Effect.sync(() => setIsLoading(false)),
          })
        )
      );
    },
    [isLoaded, redirectUrl, router, setActive, signIn, signInEffect]
  );

  const handleGoToSignUp = () => {
    router.push(ROUTES.SIGN_UP);
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
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <YStack gap="$5">
          <H1 textAlign="center" fontSize={70} lineHeight={74}>
            Sign In
          </H1>

          <SocialButtons isSignIn disabled={isLoading} />
          <Divider text="OR" />

          <Controller
            name="email"
            control={control}
            render={({
              field: { value, onChange, ...props },
              fieldState: { error },
            }) => (
              <Input
                label="Email"
                placeholder="Enter email"
                errorMessage={error?.message}
                value={value}
                disabled={isLoading}
                onChangeText={onChange}
                onSubmitEditing={() => passwordRef.current?.focus()}
                {...props}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({
              field: { value, onChange, ...props },
              fieldState: { error },
            }) => (
              <Input
                label="Password"
                placeholder="Enter password"
                errorMessage={error?.message}
                value={value}
                isPassword
                disabled={isLoading}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignIn)}
                {...props}
              />
            )}
          />

          <XStack justifyContent="space-between">
            <Checkbox defaultChecked label="Remember me" disabled={isLoading} />
            <Button variant="link">Forgot password?</Button>
          </XStack>

          {errorMessage && (
            <Paragraph color="$error" size="$sm" textAlign="center">
              {errorMessage}
            </Paragraph>
          )}

          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)}
          >
            Sign In
          </Button>

          <XStack justifyContent="center" alignItems="center">
            <Paragraph size="$sm">Don’t have an account?</Paragraph>
            <Button
              size="$sm"
              variant="link"
              textProps={{
                textDecorationLine: "underline",
              }}
              disabled={isLoading}
              onPress={handleGoToSignUp}
            >
              Sign up
            </Button>
          </XStack>
        </YStack>
      </Form>
    </YStack>
  );
};

export default SignInForm;
