export const ERROR_MESSAGES = {
  SIGN_IN_FAILED: "Sign in failed.",
  SIGN_UP_FAILED: "Sign up failed.",
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}`,
  PASSWORD_NOT_LONG: "Your password must be at least 8 characters long",
  PASSWORD_NOT_MATCH: "Password and Confirm password do not match",
  PASSWORD_NOT_HAVE_NUMBER: "Your password must contain at least one number",
  PASSWORD_NOT_HAVE_UPPERCASE:
    "Your password must contain at least one uppercase character",
  PASSWORD_NOT_HAVE_SYMBOL:
    "Your password must contain at least one special character",
  LOGIN_FAILED: "Email or password is incorrect!",
  USERNAME_INVALID: "Username can only contain letters, numbers and - or _.",
  CODE_INVALID: "Verification code must contain only numbers.",
  CODE_NOT_LONG: "Verification code must be 6 characters long.",
  VERIFICATION_INCOMPLETE: "Verification incomplete. Try again.",
  SIGN_OUT_FAILED: "Logout failed. Something went wrong.",
  FETCH_LOCATION_FAILED: "Failed to fetch the Locations.",
  FETCH_USER_BY_ID_FAILED: "Failed to fetch the user by id.",
  CREATE_USER_FAILED: "Failed to create user.",
  UPDATE_USER_FAILED: "Failed to update user.",
  DELETE_USER_FAILED: "Failed to delete user.",
  JSON_INVALID_RESPONSE: "Invalid JSON response.",
  CLERK_WEBHOOK_SECRET_FAILED: "Server Misconfiguration webhook secret",
  READ_REQUEST_FAILED: "Failed to read request",
  SVIX_HEADER_INVALID: "Invalid Svix headers",
  SVIX_VERIFY_FAILED: "Webhook verification failed",
  EMAIL_VERIFY_FAILED: "Verification prepare failed",
  SET_ACTIVE_FAILED: "Set active failed",
};

export const SUCCESS_MESSAGES = {
  SIGNED_OUT: "Signed out successfully",
  DELETE_USER_SUCCESS: "Deleted User Success.",
  SUBMIT_WEBHOOK_SUCCESS: "OK",
};
