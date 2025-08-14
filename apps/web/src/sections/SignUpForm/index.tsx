"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

// Constants
import { DAYS, MONTHS, YEARS } from "@/constants";

// Hooks
import { useCleanClerkUrl } from "@/hooks/useCleanClerkUrl";

// Components
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";
import Divider from "@/components/Divider";
import SocialButtons from "../SocialButtons";
import ClerkField from "../ClerkField";

const SignUpForm = () => {
  useCleanClerkUrl();

  return (
    <div className="container text-sm justify-center mx-auto px-5">
      <SignUp.Root fallback={<Loading />}>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <div className="@container mx-auto flex-col justify-center items-center content-center max-w-[545px]">
              <SignUp.Step name="start" className="w-full">
                <h1 className="font-abel text-center text-[70px]">Sign Up</h1>
                <SocialButtons />
                <Divider text="OR" className="my-7.5" />

                <SignUp.Captcha className="mt-5 text-center" />
                <div className="flex flex-col gap-7.5">
                  <div className="flex flex-col md:flex-row gap-5">
                    <ClerkField
                      required
                      name="firstName"
                      label="First Name"
                      placeholder="Enter first name"
                      wrapperClassName="w-full md:w-1/2"
                    />

                    <ClerkField
                      required
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter last name"
                      wrapperClassName="w-full md:w-1/2"
                    />
                  </div>

                  <ClerkField
                    required
                    name="emailAddress"
                    label="Email"
                    placeholder="Enter Email"
                    type="text"
                  />

                  <ClerkField
                    required
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="mb-1.25">Date of Birth</label>
                    <div className="flex gap-5">
                      <Select placeholder="Day" options={DAYS} />
                      <Select placeholder="Month" options={MONTHS} />
                      <Select placeholder="Year" options={YEARS} />
                    </div>
                  </div>
                  <Checkbox
                    defaultChecked
                    disabled={isGlobalLoading}
                    label="I have read and agree to the Terms and Conditions"
                  />
                  <Clerk.GlobalError className="block text-sm text-error" />

                  <SignUp.Action submit asChild disabled={isGlobalLoading}>
                    <Clerk.Loading>
                      {(isLoading) => (
                        <Button className="text-sm" disabled={isGlobalLoading}>
                          Sign Up
                          {isLoading && (
                            <Loading iconOnly iconClassName="size-6" wrapperClassName="w-fit" />
                          )}
                        </Button>
                      )}
                    </Clerk.Loading>
                  </SignUp.Action>
                  <div className="flex justify-center text-center gap">
                    Already have an Account?&nbsp;
                    <Clerk.Link
                      navigate="sign-in"
                      className="text-link hover:text-link/80! font-semibold hover:underline"
                    >
                      Sign In
                    </Clerk.Link>
                  </div>
                </div>
              </SignUp.Step>
              <SignUp.Step name="verifications" className="w-full">
                <h1 className="font-abel text-center text-[70px]">Verify email code</h1>
                <div className="w-full flex flex-col gap-7.5">
                  <SignUp.Strategy name="email_code">
                    <ClerkField
                      required
                      name="code"
                      label="Email code"
                      placeholder="Enter Email"
                      type="otp"
                      wrapperClassName="space-y-2"
                    />

                    <Clerk.GlobalError className="block text-sm text-error" />
                    <SignUp.Action submit asChild disabled={isGlobalLoading}>
                      <Clerk.Loading>
                        {(isLoading) => (
                          <Button className="text-sm" disabled={isGlobalLoading}>
                            Verify
                            {isLoading && (
                              <Loading iconOnly iconClassName="size-6" wrapperClassName="w-fit" />
                            )}
                          </Button>
                        )}
                      </Clerk.Loading>
                    </SignUp.Action>
                  </SignUp.Strategy>

                  <div className="flex justify-center text-center gap">
                    Already have an Account?&nbsp;
                    <Clerk.Link
                      navigate="sign-in"
                      className="text-link hover:text-link/80! font-semibold hover:underline"
                    >
                      Sign In
                    </Clerk.Link>
                  </div>
                </div>
              </SignUp.Step>
            </div>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
};

export default SignUpForm;
