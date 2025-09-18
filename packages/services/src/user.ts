import { API_ROUTES } from "@packages/constants/routes";
import {
  User as ClerkUser,
  UserJSON as ClerkUserJSON,
} from "@clerk/nextjs/server";
import { Effect } from "effect";

export interface User extends ClerkUser {
  userId?: string;
}

export interface UserJSON extends ClerkUserJSON {
  userId?: string;
}

export const fetchUserById = (userId: string) =>
  Effect.tryPromise({
    try: () =>
      fetch(`${API_ROUTES.USERS}?userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    catch: (error) =>
      error instanceof Error
        ? error
        : new Error("Failed to fetch the user by id."),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error("Failed to fetch the user by id."))
        : Effect.tryPromise({
            try: () => res.json() as Promise<User[]>,
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error("Failed to parse user JSON."),
          })
    ),
    Effect.matchEffect({
      onFailure: (error) => Effect.succeed({ data: null, error }),
      onSuccess: (data) => Effect.succeed({ data: data[0] }),
    })
  );

export const createUser = (data: UserJSON) =>
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
      error instanceof Error ? error : new Error("Failed to create user."),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error("Failed to create user."))
        : Effect.tryPromise({
            try: () => res.json() as Promise<User>,
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error("Failed to parse user JSON."),
          })
    ),
    Effect.match({
      onFailure: (error) => ({ data: null, error: error.message }),
      onSuccess: (data) => ({ data }),
    })
  );

export const updateUser = (userId: string, data: UserJSON) =>
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
      error instanceof Error ? error : new Error("Failed to update user."),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error("Failed to update user."))
        : Effect.tryPromise({
            try: () => res.json() as Promise<User>,
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error("Failed to parse user JSON."),
          })
    ),
    Effect.match({
      onFailure: (error) => ({ data: null, error: error.message }),
      onSuccess: (data) => ({ data }),
    })
  );

export const deleteUser = (userId: string) =>
  Effect.tryPromise({
    try: () =>
      fetch(`${API_ROUTES.USERS}/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    catch: (error) =>
      error instanceof Error ? error : new Error("Failed to delete the user."),
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(new Error("Failed to delete user."))
        : Effect.tryPromise({
            try: () => res.json(),
            catch: (error) =>
              error instanceof Error
                ? error
                : new Error("Failed to parse user JSON."),
          })
    ),
    Effect.matchEffect({
      onFailure: (error) => Effect.succeed({ message: error.message }),
      onSuccess: () => Effect.succeed({ message: "Deleted User Success." }),
    })
  );
