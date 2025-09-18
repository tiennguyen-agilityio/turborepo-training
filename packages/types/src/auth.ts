export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  day?: number;
  month?: number;
  year?: number;
}

export enum SIGN_UP_STATUS {
  MISSING_REQUIREMENTS = "missing_requirements",
  COMPLETE = "complete",
}

export enum SIGN_IN_STATUS {
  NEEDS_IDENTIFIER = "needs_identifier",
  COMPLETE = "complete",
}

export interface VerifyFormData {
  code: string;
}

export enum OAuthStrategy {
  Facebook = "oauth_facebook",
  Google = "oauth_google",
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  avatar?: string;
  favorites?: string[];
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}
