import * as Clerk from "@clerk/elements/common";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import GoogleIcon from "@/components/Icons/GoogleIcon";

const SocialButtons = () => {
  return (
    <div className="flex flex-col @md:flex-row justify-between mt-12.5 gap-1.5 @md:gap-2.5">
      <Clerk.Connection asChild name="facebook">
        <Button className="gap-2.5 @md:flex-1/2 bg-facebook hover:bg-facebook/75 transition-colors duration-300">
          <FacebookIcon />
          <div className="border-l-[1px] h-5 border-foreground" />
          <Clerk.Loading scope="provider:facebook">
            {(isLoading) => (
              <>
                Sign in with Facebook
                {isLoading && (
                  <Loading iconOnly iconClassName="size-6!" wrapperClassName="w-fit!" />
                )}
              </>
            )}
          </Clerk.Loading>
        </Button>
      </Clerk.Connection>
      <Clerk.Connection asChild name="google">
        <Button className="gap-2.5 @md:flex-1/2 bg-google hover:bg-google/75 transition-colors duration-300">
          <GoogleIcon />
          <div className="border-l-[1px] h-5 border-foreground" />
          <Clerk.Loading scope="provider:google">
            {(isLoading) => (
              <>
                Sign in with Google
                {isLoading && (
                  <Loading iconOnly iconClassName="size-6!" wrapperClassName="w-fit!" />
                )}
              </>
            )}
          </Clerk.Loading>
        </Button>
      </Clerk.Connection>
    </div>
  );
};

export default SocialButtons;
