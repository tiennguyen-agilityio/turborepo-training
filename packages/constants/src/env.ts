export interface EnvConfig {
  API_URL: string;
  CLERK_SIGN_IN_URL?: string;
  CLERK_SIGN_UP_URL?: string;
  CLERK_SECRET_KEY?: string;
  CLERK_WEBHOOK_SECRET?: string;
  CLERK_PUBLISHABLE_KEY?: string;
}

let env: EnvConfig;

export const setEnv = (config: EnvConfig) => {
  env = config;
};

export const getEnv = (): EnvConfig => {
  if (env) return env;

  return {
    CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!,
    CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!,
    API_URL: process.env.NEXT_PUBLIC_API_URL!,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET!,
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
  };
};
