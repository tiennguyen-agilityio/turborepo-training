import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

// Constants
import { ROUTES } from "@/constants/routes";

// Components
import Loading from "@/components/Loading";

const RedirectCallback = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback signInUrl={ROUTES.SIGN_IN} signUpUrl={ROUTES.SIGN_IN} />
      <Loading />
    </>
  );
};

export default RedirectCallback;
