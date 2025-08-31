"use client";

import { useRef, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { YStack, XStack, Paragraph, H1, Form, TamaguiElement } from "tamagui";

// Types
import { LoginFormData } from "@repo/types/auth";

// Constants
import { SCHEMA } from "@repo/constants/validation";
import { ERROR_MESSAGES } from "@repo/constants/messages";
import { ROUTES } from "@repo/constants/routes";

// Hooks
import { useCleanClerkUrl } from "@repo/hooks/useCleanClerkUrl";

// Components
import SocialButtons from "../SocialButtons";
import { Divider, Input, Button, Checkbox } from "../../components";

const SignInForm = () => {
  const { redirectUrl } = useCleanClerkUrl();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { isSubmitting } = formState;
  const isLoading = isSubmitting || !isLoaded;

  const passwordRef = useRef<TamaguiElement | null>(null);

  const handleSignIn = async ({ email, password }: LoginFormData) => {
    if (!isLoaded) return;

    try {
      const attempt = await signIn.create({
        identifier: email,
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.push(redirectUrl || "/");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_IN_FAILED;
      setErrorMessage(message);
    }
  };

  const handleGoToSignUp = () => {
    router.push(ROUTES.SIGN_UP);
  };

  return (
    <YStack
      paddingHorizontal="$4"
      marginVertical="$6"
      marginHorizontal="auto"
      justifyContent="center"
      width="100%"
      maxWidth={545}
    >
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <YStack gap="$5">
          <H1 textAlign="center" fontFamily="$heading">
            Sign In
          </H1>

          <SocialButtons isSignIn />
          <Divider text="OR" />

          <YStack gap="$2">
            <Controller
              name="email"
              control={control}
              rules={SCHEMA.email}
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
              rules={SCHEMA.password}
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
          </YStack>

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
