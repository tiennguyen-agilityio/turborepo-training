import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

// Constants
import { ROUTES } from "@repo/constants/routes";

// Components
import Loading from "@repo/ui/components/Loading";

const RedirectCallback = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback
        signInUrl={ROUTES.SIGN_IN}
        signUpUrl={ROUTES.SIGN_IN}
      />
      <Loading />
    </>
  );
};

export default RedirectCallback;
