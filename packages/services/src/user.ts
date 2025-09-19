import {
  User as ClerkUser,
  UserJSON as ClerkUserJSON,
} from "@clerk/nextjs/server";
import { Effect } from "effect";

// Constants
import { API_ROUTES } from "@packages/constants/routes";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@packages/constants/messages";

export interface User extends ClerkUser {
  userId?: string;
}

export interface UserJSON extends ClerkUserJSON {
  userId?: string;
}

interface UserReponse {
  data?: User;
  error?: Error;
}

export const fetchUserById = (
  userId: string
): Effect.Effect<UserReponse, never, never> =>
  Effect.tryPromise({
    try: () =>
      fetch(`${API_ROUTES.USERS}?userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error(ERROR_MESSAGES.FETCH_USER_BY_ID_FAILED),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error(ERROR_MESSAGES.FETCH_USER_BY_ID_FAILED))
        : Effect.tryPromise({
            try: () => res.json() as Promise<User[]>,
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error(ERROR_MESSAGES.JSON_INVALID_RESPONSE),
          })
    ),
    Effect.matchEffect({
      onFailure: (error) => Effect.succeed({ error }),
      onSuccess: (data) => Effect.succeed({ data: data[0] }),
    })
  );

export const createUser = (
  data: UserJSON
): Effect.Effect<UserReponse, never, never> =>
  Effect.tryPromise({
    try: () =>
      fetch(API_ROUTES.USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error(ERROR_MESSAGES.CREATE_USER_FAILED),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error(ERROR_MESSAGES.CREATE_USER_FAILED))
        : Effect.tryPromise({
            try: () => res.json() as Promise<User>,
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error(ERROR_MESSAGES.JSON_INVALID_RESPONSE),
          })
    ),
    Effect.match({
      onFailure: (error) => ({ error }),
      onSuccess: (data) => ({ data }),
    })
  );

export const updateUser = (
  userId: string,
  data: UserJSON
): Effect.Effect<UserReponse, never, never> =>
  Effect.tryPromise({
    try: () =>
      fetch(`${API_ROUTES.USERS}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error(ERROR_MESSAGES.UPDATE_USER_FAILED),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error(ERROR_MESSAGES.UPDATE_USER_FAILED))
        : Effect.tryPromise({
            try: () => res.json() as Promise<User>,
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error(ERROR_MESSAGES.JSON_INVALID_RESPONSE),
          })
    ),
    Effect.match({
      onFailure: (error) => ({ error }),
      onSuccess: (data) => ({ data }),
    })
  );

export const deleteUser = (
  userId: string
): Effect.Effect<{ message: string }, never, never> =>
  Effect.tryPromise({
    try: () =>
      fetch(`${API_ROUTES.USERS}/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error(ERROR_MESSAGES.DELETE_USER_FAILED),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error(ERROR_MESSAGES.DELETE_USER_FAILED))
        : Effect.tryPromise({
            try: () => res.json(),
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error(ERROR_MESSAGES.JSON_INVALID_RESPONSE),
          })
    ),
    Effect.matchEffect({
      onFailure: (error) => Effect.succeed({ message: error.message }),
      onSuccess: () =>
        Effect.succeed({ message: SUCCESS_MESSAGES.DELETE_USER_SUCCESS }),
    })
  );
