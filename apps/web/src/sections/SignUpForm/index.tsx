"use client";

import { useRef, useState } from "react";
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

  const { control, handleSubmit, formState } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      day: "",
      month: "",
      year: "",
    },
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { isSubmitting } = formState;
  const isLoading = isSubmitting || !isLoaded;

  const lastNameRef = useRef<TamaguiElement | null>(null);
  const emailRef = useRef<TamaguiElement | null>(null);
  const passwordRef = useRef<TamaguiElement | null>(null);

  const handleSignUp = async (data: SignUpFormData) => {
    if (!isLoaded) return;
    setErrorMessage("");

    try {
      const { firstName, lastName, email, password, day, month, year } = data;

      const attempt = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
        unsafeMetadata: {
          dob: `${day} ${month} ${year}`,
        },
      });

      if (attempt.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        const url = redirectUrl
          ? `${ROUTES.SIGN_UP_VERIFY}?redirect_url=${encodeURIComponent(
              redirectUrl
            )}`
          : ROUTES.SIGN_UP_VERIFY;

        router.push(url);
      } else if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.push(redirectUrl || "/");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_UP_FAILED;
      setErrorMessage(message);
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
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <YStack gap="$5">
          <H1 textAlign="center" fontSize={70} lineHeight={74}>
            Create Account
          </H1>

          <SocialButtons />
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
