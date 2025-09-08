import { useMutation } from "@tanstack/react-query";

// Types
import { LoginFormData, User } from "@repo/types/auth";

// Constants
import { API_ROUTES } from "@repo/constants/routes";
import { ERROR_MESSAGES } from "@repo/constants/messages";

export const useAuth = () => {
  const logIn = useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      try {
        const response = await fetch(
          `${API_ROUTES.USERS}?email=${email}&password=${password}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          return {
            user: null,
            error: ERROR_MESSAGES.LOGIN_FAILED,
          };
        }
        const data: User[] = await response.json();

        return {
          user: data[0],
          error: null,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : ERROR_MESSAGES.LOGIN_FAILED;

        return {
          user: null,
          error: errorMessage,
        };
      }
    },
  });

  return { logIn };
};
