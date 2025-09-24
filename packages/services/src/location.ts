import { Effect } from "effect";

// Types
import { QueryParams } from "@packages/types/api";
import { LocationItem } from "@packages/types/location";

// Constants
import { PAGE_SIZE } from "@packages/constants/common";
import { API_ROUTES } from "@packages/constants/routes";
import { ERROR_MESSAGES } from "@packages/constants/messages";

import { effectFetch } from "./api";

export const fetchLocations = ({ page = 1, limit = PAGE_SIZE }: QueryParams) =>
  effectFetch<LocationItem[]>({
    url: `${API_ROUTES.LOCATIONS}?page=${page}&limit=${limit}`,
    errorMessage: ERROR_MESSAGES.FETCH_LOCATION_FAILED,
  }).pipe(
    Effect.matchEffect({
      onFailure: (error) => Effect.fail(error),
      onSuccess: (data) => Effect.succeed({ data }),
    })
  );
