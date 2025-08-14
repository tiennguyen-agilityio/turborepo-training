"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Types
import { SignUpFormData } from "@/types/auth";

// Constants
import { SCHEMA } from "@/constants/validation";
import { ERROR_MESSAGES } from "@/constants/messages";
import { DAYS, MONTHS, YEARS } from "@/constants/common";
import { ROUTES } from "@/constants";

// Hooks
import { useCleanClerkUrl } from "@/hooks/useCleanClerkUrl";

// Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import Checkbox from "@/components/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/Select";
import SocialButtonsV2 from "../SocialButtonsV2";

const SignUpFormV2 = () => {
  const { redirectUrl } = useCleanClerkUrl();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const form = useForm({
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isSubmitting } = form.formState;

  const isLoading = isSubmitting || !isLoaded;

  const handleToggleVisible = () => setIsPasswordVisible((prev) => !prev);

  const handleSubmit = async (data: SignUpFormData) => {
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
          ? `${ROUTES.SIGN_UP_VERIFY}?redirect_url=${encodeURIComponent(redirectUrl)}`
          : ROUTES.SIGN_UP_VERIFY;

        router.push(url);
      } else if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.push(redirectUrl || "/");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.SIGN_UP_FAILED;
      setErrorMessage(message);
    }
  };

  const handleGoToSignIn = () => {
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <div className="container mx-auto overflow-hidden px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            disabled={isSubmitting}
            className="@container w-full mx-auto md:max-w-[545px] @md:px-5"
          >
            <div className="w-full flex-col justify-center items-center content-center">
              <Heading as="h1" className="font-abel text-center">
                Create Account
              </Heading>

              <SocialButtonsV2 />
              <Divider text="OR" className="my-7.5" />
              <div className="flex flex-col gap-7.5">
                <div className="flex flex-col items-start md:flex-row gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={SCHEMA.firstName}
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter first name"
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
                    name="lastName"
                    rules={SCHEMA.lastName}
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter last name"
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
                </div>

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
                          className="absolute top-0 right-3 h-full px-1 text-link hover:text-link/80 hover:bg-transparent hover:no-underline"
                        >
                          {isPasswordVisible ? "Hide Password" : "Show Password"}
                        </Button>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-2">
                  <label className="mb-1.25">Date of Birth</label>
                  <div className="flex gap-5">
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <FormItem className="w-1/3">
                          <FormControl>
                            <Select
                              placeholder="Day"
                              value={field.value}
                              options={DAYS}
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem className="w-1/3">
                          <FormControl>
                            <Select
                              placeholder="Month"
                              value={field.value}
                              options={MONTHS}
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="w-1/3">
                          <FormControl>
                            <Select
                              placeholder="Year"
                              value={field.value}
                              options={YEARS}
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Checkbox
                  defaultChecked
                  label="I have read and agree to the Terms and Conditions"
                />

                <div className="w-full">
                  {errorMessage && <p className="text-error text-center my-2">{errorMessage}</p>}
                  <Button className="text-sm w-full">
                    Sign Up
                    {isLoading && (
                      <Loading iconOnly iconClassName="size-6" wrapperClassName="w-fit" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-center items-center text-center">
                  Already have an Account?&nbsp;
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleGoToSignIn}
                    className="text-link hover:text-link/80 p-0 hover:bg-transparent"
                  >
                    Log In
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

export default SignUpFormV2;
