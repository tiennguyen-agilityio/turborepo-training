import React, { useRef } from "react";
import { Form, H1, Paragraph, TamaguiElement, XStack, YStack } from "tamagui";
import { Controller, useForm } from "react-hook-form";

// Types
import { LoginFormData } from "@repo/types/auth";

// Constants
import { SCHEMA } from "@repo/constants/validation";

// Component
import Input from "@packages/ui/components/Input";
import Checkbox from "@packages/ui/components/Checkbox";
import Button from "@packages/ui/components/Button";

const SignInScreen = () => {
  const passwordRef = useRef<TamaguiElement | null>(null);

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleSignIn = (data: LoginFormData) => {
    console.log("---data", data);
  };

  const handleGoToSignUp = () => {};

  return (
    <YStack
      flex={1}
      marginVertical="$12"
      justifyContent="center"
      paddingHorizontal="$5"
    >
      <Form onSubmit={undefined}>
        <YStack gap="$5">
          <H1 textAlign="center" fontSize={70} lineHeight={76}>
            Sign In
          </H1>

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
                // disabled={isLoading}
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
                // disabled={isLoading}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignIn)}
                {...props}
              />
            )}
          />

          <XStack justifyContent="space-between">
            <Checkbox defaultChecked label="Remember me" disabled />
            <Button variant="link">Forgot password?</Button>
          </XStack>

          {/* {errorMessage && (
						<Paragraph color="$error" size="$sm" textAlign="center">
							{errorMessage}
						</Paragraph>
					)} */}

          <Button
            // disabled={isLoading}
            // isLoading={isLoading}
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
              // disabled={isLoading}
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

export default SignInScreen;
