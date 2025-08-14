"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

// Types
import { VerifyFormData } from "@/types/auth";

// Constants
import { SCHEMA } from "@/constants/validation";
import { ERROR_MESSAGES } from "@/constants/messages";
import { ROUTES } from "@/constants/routes";

// Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const VerifyForm = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<VerifyFormData>({
    defaultValues: { code: "" },
    mode: "onBlur",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const redirectUrl = searchParams.get("redirect_url") || "/";

  const handleSubmit = async ({ code }: VerifyFormData) => {
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
      const message = err instanceof Error ? err.message : ERROR_MESSAGES.VERIFICATION_INCOMPLETE;
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <div className="container mx-auto overflow-hidden px-5">
      <Form {...form}>
        <fieldset disabled={isLoading} className="w-full mx-auto md:max-w-[545px]">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Heading as="h4" className="font-abel text-center">
              Verify email code
            </Heading>

            <div className="w-full flex flex-col mt-12.5 gap-7.5">
              <FormField
                control={form.control}
                name="code"
                rules={SCHEMA.code}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Choose a username"
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

              <div className="w-full">
                {errorMessage && <p className="text-error text-center my-2">{errorMessage}</p>}
                <Button className="text-sm w-full" disabled={isLoading}>
                  Verify
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
                  className="text-link hover:text-link/80 p-0 hover:bg-transparent hover:underline gap-1"
                >
                  Log In
                </Button>
              </div>
            </div>
          </form>
        </fieldset>
      </Form>
    </div>
  );
};

export default VerifyForm;
