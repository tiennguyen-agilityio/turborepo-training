import { describe, it, expect, vi, beforeEach } from "vitest";
import { Effect } from "effect";

// Constants
import { ERROR_MESSAGES } from "@packages/constants/messages";
import { LOCATIONS } from "@packages/constants/location";

import { fetchLocations } from "../src/location";
import * as apiModule from "../src/api";

describe("fetchLocations", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns data on success", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.succeed(LOCATIONS)
    );

    const result = await Effect.runPromise(fetchLocations({ page: 1 }));

    expect(result.data).toEqual(LOCATIONS);
  });

  it("throws error on failure", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.fail(new Error(ERROR_MESSAGES.FETCH_LOCATION_FAILED))
    );

    await expect(
      Effect.runPromise(fetchLocations({ page: 1 }))
    ).rejects.toThrow(ERROR_MESSAGES.FETCH_LOCATION_FAILED);
  });
});
