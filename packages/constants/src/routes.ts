import { getEnv } from "./env";

const ENV = getEnv();

export const ROUTES = {
  HOME: "/",
  SIGN_IN: ENV.CLERK_SIGN_IN_URL || "",
  SIGN_UP: ENV.CLERK_SIGN_UP_URL || "",
  SIGN_UP_VERIFY: `${ENV.CLERK_SIGN_UP_URL}/verify`,
  USER_PROFILE: "/user/profile",
};

export const MOCKAPI_URL = ENV.API_URL;

export const API_ROUTES = {
  USERS: `${ENV.API_URL}/users`,
  LOCATIONS: `${ENV.API_URL}/locations`,
};
