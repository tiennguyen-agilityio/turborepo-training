export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  day?: string;
  month?: string;
  year: string;
}

export interface ContinueFormData {
  username: string;
}

export interface VerifyFormData {
  code: string;
}

export enum OAuthStrategy {
  Facebook = "oauth_facebook",
  Google = "oauth_google",
}
