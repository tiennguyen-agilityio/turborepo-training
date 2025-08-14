"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Types
import { LoginFormData } from "@/types/auth";

// Constants
import { SCHEMA } from "@/constants/validation";
import { ERROR_MESSAGES } from "@/constants/messages";
import { ROUTES } from "@/constants/routes";

// Hooks
import { useCleanClerkUrl } from "@/hooks/useCleanClerkUrl";

// Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Loading from "@/components/Loading";
import Heading from "@/components/Heading";
import Checkbox from "@/components/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SocialButtonsV2 from "../SocialButtonsV2";

const SignInFormV2 = () => {
  const { redirectUrl } = useCleanClerkUrl();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isSubmitting } = form.formState;

  const isLoading = isSubmitting || !isLoaded;

  const handleToggleVisible = () => setIsPasswordVisible((prev) => !prev);

  const handleSubmit = async ({ email, password }: LoginFormData) => {
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
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_IN_FAILED;
      setErrorMessage(message);
    }
  };

  const handleGoToSignUp = () => {
    router.push(ROUTES.SIGN_UP);
  };

  return (
    <div className="container mx-auto overflow-hidden px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset disabled={isSubmitting} className="@container w-full mx-auto md:max-w-[545px]">
            <div className="flex-col justify-center align-middle items-center content-center">
              <Heading as="h1" className="font-abel text-center">
                Sign In
              </Heading>
              <SocialButtonsV2 isSignIn />
              <Divider text="OR" className="my-7.5" />
              <div className="flex flex-col gap-7.5">
                <FormField
                  control={form.control}
                  name="email"
                  rules={SCHEMA.email}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Email"
                          onChange={(e) => {
                            field.onChange(e);
                            if (errorMessage) setErrorMessage("");
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={SCHEMA.password}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-current">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            className="z-40"
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Enter password"
                            onChange={(e) => {
                              field.onChange(e);
                              if (errorMessage) setErrorMessage("");
                            }}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="link"
                          onClick={handleToggleVisible}
                          className="absolute top-0 right-3 h-full px-1 text-link hover:text-link/80 hover:no-underline hover:bg-transparent"
                        >
                          {isPasswordVisible ? "Hide Password" : "Show Password"}
                        </Button>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Checkbox defaultChecked label="Remember me" disabled={isLoading} />
                  <Button
                    type="button"
                    variant="link"
                    className="text-link hover:text-link/90 p-0 h-fit hover:bg-transparent hover:underline"
                  >
                    Forgot password?
                  </Button>
                </div>

                <div className="w-full">
                  {errorMessage && <p className="text-error text-center my-2">{errorMessage}</p>}
                  <Button
                    className="text-sm w-full justify-center text-center"
                    disabled={isLoading}
                  >
                    Sign In
                    {isLoading && (
                      <Loading iconOnly iconClassName="size-6!" wrapperClassName="w-fit!" />
                    )}
                  </Button>
                </div>
                <div className="flex justify-center items-center text-center gap">
                  Don&#8217;t have an account?&nbsp;
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleGoToSignUp}
                    className="text-link hover:text-link/90 p-0 h-fit hover:bg-transparent"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default SignInFormV2;
