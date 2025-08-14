export const ROUTES = {
  HOME: "/",
  SIGN_IN: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "",
  SIGN_UP: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "",
  SIGN_UP_VERIFY: `${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}/verify`,
  USER_PROFILE: "/user/profile",
};

export const MOCKAPI_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
  USERS: `${MOCKAPI_URL}/users/`,
  LOCATIONS: `${MOCKAPI_URL}/locations/`,
};
