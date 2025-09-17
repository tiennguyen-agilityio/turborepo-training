import { useMutation } from "@tanstack/react-query";
import { Effect } from "effect";

// Types
import { LoginFormData, User } from "@packages/types/auth";

// Constants
import { API_ROUTES } from "@packages/constants/routes";
import { ERROR_MESSAGES } from "@packages/constants/messages";

const logInEffect = (email: string, password: string) =>
  Effect.gen(function* () {
    const res: Response = yield* Effect.tryPromise({
      try: () =>
        fetch(`${API_ROUTES.USERS}?email=${email}&password=${password}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      catch: (error) =>
        error instanceof Error ? error : new Error(ERROR_MESSAGES.LOGIN_FAILED),
    });

    if (!res.ok) {
      throw new Error(ERROR_MESSAGES.LOGIN_FAILED);
    }

    const data: User[] = yield* Effect.promise(() => res.json());

    return {
      user: data[0],
      error: null as string | null,
    };
  }).pipe(
    Effect.catchAll((error) =>
      Effect.succeed({
        user: null,
        error: String(error?.message ?? error),
      })
    )
  );

export const useAuth = () => {
  const logIn = useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      Effect.runPromise(logInEffect(email, password)),
  });

  return { logIn };
};
