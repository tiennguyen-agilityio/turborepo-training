import React, { useCallback, useRef, useState } from "react";
import { Form, H1, Paragraph, TamaguiElement, XStack, YStack } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// Types
import { LoginFormData } from "@repo/types/auth";

// Constants
import { SCHEMA } from "@repo/constants/validation";
import { useAuth } from "@repo/hooks/useAuth";

// Hooks | Stores
import { useAuthStore } from "@packages/stores/auth";

// Component
import Input from "@packages/ui/components/Input";
import Checkbox from "@packages/ui/components/Checkbox";
import Button from "@packages/ui/components/Button";

const SignInScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef<TamaguiElement | null>(null);

  const {
    logIn: { mutate, isPending },
  } = useAuth();

  const { setAuth } = useAuthStore();

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleSignIn = useCallback(
    async (data: LoginFormData) => {
      mutate(data, {
        onSuccess: async (data) => {
          const { user, error } = data;
          if (!error && user) {
            setAuth(user, uuidv4());
            return;
          }
          setErrorMessage(error);
        },
        onError: (error: Error) => {
          setErrorMessage(error.message);
        },
      });
    },
    [mutate, setAuth]
  );

  const handleGoToSignUp = () => {};

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bottomOffset={30}
      extraKeyboardSpace={30}
    >
      <YStack
        minHeight="100%"
        justifyContent="center"
        paddingHorizontal="$5"
        alignContent="center"
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
                  disabled={isPending}
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
                  disabled={isPending}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  {...props}
                />
              )}
            />

            <XStack justifyContent="space-between">
              <Checkbox
                defaultChecked
                label="Remember me"
                disabled={isPending}
              />
              <Button variant="link">Forgot password?</Button>
            </XStack>

            {errorMessage && (
              <Paragraph color="$error" size="$sm" textAlign="center">
                {errorMessage}
              </Paragraph>
            )}

            <Button
              disabled={isPending}
              isLoading={isPending}
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
                disabled={isPending}
                onPress={handleGoToSignUp}
              >
                Sign up
              </Button>
            </XStack>
          </YStack>
        </Form>
      </YStack>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
