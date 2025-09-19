import {
  User as ClerkUser,
  UserJSON as ClerkUserJSON,
} from "@clerk/nextjs/server";
import { Effect } from "effect";

// Types
import { HTTP_METHOD, Response } from "@packages/types/api";

// Constants
import { API_ROUTES } from "@packages/constants/routes";
import { ERROR_MESSAGES } from "@packages/constants/messages";
import { effectFetch } from "./api";

export interface User extends ClerkUser {
  userId?: string;
}

export interface UserJSON extends ClerkUserJSON {
  userId?: string;
}

export const fetchUserById = (
  userId: string
): Effect.Effect<Response<User>, Error, never> =>
  effectFetch<User[]>({
    url: `${API_ROUTES.USERS}?userId=${userId}`,
    errorMessage: ERROR_MESSAGES.FETCH_USER_BY_ID_FAILED,
  }).pipe(
    Effect.matchEffect({
      onFailure: (error) => Effect.fail(error),
      onSuccess: (data) => Effect.succeed({ data: data[0] }),
    })
  );

export const createUser = (
  data: UserJSON
): Effect.Effect<Response<User>, Error, never> =>
  effectFetch<User>({
    url: API_ROUTES.USERS,
    method: HTTP_METHOD.POST,
    errorMessage: ERROR_MESSAGES.CREATE_USER_FAILED,
    body: data,
  }).pipe(
    Effect.matchEffect({
      onFailure: (error) => Effect.fail(error),
      onSuccess: (data) => Effect.succeed({ data }),
    })
  );

export const updateUser = (
  userId: string,
  data: UserJSON
): Effect.Effect<Response<User>, Error, never> =>
  effectFetch<User>({
    url: `${API_ROUTES.USERS}/${userId}`,
    method: HTTP_METHOD.PUT,
    errorMessage: ERROR_MESSAGES.UPDATE_USER_FAILED,
    body: data,
  }).pipe(
    Effect.matchEffect({
      onFailure: (error) => Effect.fail(error),
      onSuccess: (data) => Effect.succeed({ data }),
    })
  );

export const deleteUser = (
  userId: string
): Effect.Effect<Response<User>, Error, never> =>
  effectFetch<User>({
    url: `${API_ROUTES.USERS}/${userId}`,
    method: HTTP_METHOD.DELETE,
    errorMessage: ERROR_MESSAGES.DELETE_USER_FAILED,
  }).pipe(
    Effect.matchEffect({
      onFailure: (error) => Effect.fail(error),
      onSuccess: (data) => Effect.succeed({ data }),
    })
  );
