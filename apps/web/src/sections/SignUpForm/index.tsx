"use client";

import { useCallback, useRef, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  YStack,
  XStack,
  Paragraph,
  H1,
  Form,
  TamaguiElement,
  Label,
} from "tamagui";
import { Effect } from "effect";

// Types
import { SignUpFormData } from "@packages/types/auth";

// Constants
import { SCHEMA } from "@packages/constants/validation";
import { ERROR_MESSAGES } from "@packages/constants/messages";
import { ROUTES } from "@packages/constants/routes";
import { DAYS, MONTHS, YEARS } from "@packages/constants/common";

// Hooks
import { useCleanClerkUrl } from "@packages/hooks/useCleanClerkUrl";

// Components
import SocialButtons from "../SocialButtons";
import Button from "@packages/ui/components/Button";
import Checkbox from "@packages/ui/components/Checkbox";
import Divider from "@packages/ui/components/Divider";
import Input from "@packages/ui/components/Input";
import Select from "@packages/ui/components/Select";

const SignUpForm = () => {
  const { redirectUrl } = useCleanClerkUrl();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const lastNameRef = useRef<TamaguiElement | null>(null);
  const emailRef = useRef<TamaguiElement | null>(null);
  const passwordRef = useRef<TamaguiElement | null>(null);

  const signUpEffect = useCallback(
    (
      data: SignUpFormData,
      signUp: NonNullable<ReturnType<typeof useSignUp>["signUp"]>,
      setActive: NonNullable<ReturnType<typeof useSignUp>["setActive"]>,
      router: ReturnType<typeof useRouter>,
      redirectUrl?: string
    ) =>
      Effect.gen(function* () {
        const { firstName, lastName, email, password } = data;

        const attempt = yield* Effect.tryPromise({
          try: () =>
            signUp.create({
              firstName,
              lastName,
              emailAddress: email,
              password,
            }),
          catch: (error) =>
            error instanceof Error
              ? error.message
              : ERROR_MESSAGES.SIGN_UP_FAILED,
        });

        if (attempt.status === "missing_requirements") {
          yield* Effect.tryPromise({
            try: () =>
              signUp.prepareEmailAddressVerification({
                strategy: "email_code",
              }),
            catch: () => "Verification prepare failed",
          });

          const url = redirectUrl
            ? `${ROUTES.SIGN_UP_VERIFY}?redirect_url=${encodeURIComponent(
                redirectUrl
              )}`
            : ROUTES.SIGN_UP_VERIFY;

          yield* Effect.sync(() => router.push(url || "/"));
        } else if (attempt.status === "complete") {
          yield* Effect.tryPromise({
            try: () => setActive({ session: attempt.createdSessionId }),
            catch: () => "Set active failed",
          });
          yield* Effect.sync(() => router.push(redirectUrl || "/"));
        }
      }),
    []
  );

  const handleSignUp = useCallback(
    (data: SignUpFormData) => {
      if (!isLoaded || !signUp || !setActive) return;
      setErrorMessage("");
      setIsLoading(true);

      Effect.runPromise(
        signUpEffect(data, signUp, setActive, router, redirectUrl).pipe(
          Effect.matchEffect({
            onFailure: (error) =>
              Effect.sync(() => {
                setErrorMessage(
                  typeof error === "string"
                    ? error
                    : ERROR_MESSAGES.SIGN_UP_FAILED
                );
                setIsLoading(false);
              }),
            onSuccess: () => Effect.sync(() => setIsLoading(false)),
          })
        )
      );
    },
    [isLoaded, redirectUrl, router, setActive, signUp, signUpEffect]
  );

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
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <YStack gap="$5">
          <H1 textAlign="center" fontSize={70} lineHeight={74}>
            Create Account
          </H1>

          <SocialButtons disabled={isLoading} />
          <Divider text="OR" />

          <XStack gap="$5">
            <YStack flex={1}>
              <Controller
                name="firstName"
                control={control}
                rules={SCHEMA.firstName}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    errorMessage={error?.message}
                    value={value}
                    disabled={isLoading}
                    onChangeText={onChange}
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                    {...props}
                  />
                )}
              />
            </YStack>
            <YStack flex={1}>
              <Controller
                name="lastName"
                control={control}
                rules={SCHEMA.lastName}
                render={({
                  field: { value, onChange, ...props },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    errorMessage={error?.message}
                    value={value}
                    disabled={isLoading}
                    onChangeText={onChange}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    {...props}
                  />
                )}
              />
            </YStack>
          </XStack>
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
                onSubmitEditing={handleSubmit(handleSignUp)}
                {...props}
              />
            )}
          />
          <YStack>
            <Label
              fontSize="$sm"
              lineHeight="$sm"
              marginBottom="$1.5"
              cursor="pointer"
            >
              Date of Birth
            </Label>

            <XStack gap="$5">
              <YStack flexGrow={1} maxWidth="$42">
                <Select items={DAYS} placeholder="Day" />
              </YStack>
              <YStack flexGrow={1} maxWidth="$42">
                <Select items={MONTHS} placeholder="Month" />
              </YStack>
              <YStack flexGrow={1} maxWidth="$42">
                <Select items={YEARS} placeholder="Years" />
              </YStack>
            </XStack>
          </YStack>

          <XStack>
            <Checkbox
              defaultChecked
              label="I have read and agree to the"
              disabled={isLoading}
            />
            <Button variant="link" fontWeight={700} paddingHorizontal={0}>
              Terms and Conditions
            </Button>
          </XStack>

          {errorMessage && (
            <Paragraph color="$error" size="$sm" textAlign="center">
              {errorMessage}
            </Paragraph>
          )}

          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleSubmit(handleSignUp)}
          >
            Sign Up
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

export default SignUpForm;
