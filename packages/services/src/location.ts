import { Effect } from "effect";

// Types
import { QueryParams, Response } from "@packages/types/api";
import { LocationItem } from "@packages/types/location";

// Constants
import { PAGE_SIZE } from "@packages/constants/common";
import { API_ROUTES } from "@packages/constants/routes";
import { ERROR_MESSAGES } from "@packages/constants/messages";

export const fetchLocations = ({
  page = 1,
  limit = PAGE_SIZE,
}: QueryParams): Effect.Effect<Response<LocationItem[]>, never, never> => {
  return Effect.tryPromise({
    try: () =>
      fetch(`${API_ROUTES.LOCATIONS}?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    catch: (err) =>
      err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_LOCATION_FAILED,
  }).pipe(
    Effect.flatMap((res) =>
      !res.ok
        ? Effect.fail(ERROR_MESSAGES.FETCH_LOCATION_FAILED)
        : Effect.tryPromise({
            try: () => res.json() as Promise<LocationItem[]>,
            catch: () => ERROR_MESSAGES.JSON_INVALID_RESPONSE,
          })
    ),
    Effect.matchEffect({
      onFailure: (err) =>
        Effect.succeed({
          data: [] as LocationItem[],
          error: err,
        }),
      onSuccess: (data) =>
        Effect.succeed({
          data,
        }),
    })
  );
};
