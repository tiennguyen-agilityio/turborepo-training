import { it, expect, vi, beforeEach } from "vitest";
import { runPromise } from "effect/Effect";

// Constants
import { API_ROUTES } from "@packages/constants/routes";
import { ERROR_MESSAGES } from "@packages/constants/messages";

import { effectFetch } from "../src/api";

global.fetch = vi.fn();

const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockFetch.mockReset();
});

it("returns data on successful fetch", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ message: "success" }),
  });

  const result = await runPromise(
    effectFetch<{ message: string }>({
      url: API_ROUTES.LOCATIONS,
      errorMessage: ERROR_MESSAGES.FETCH_LOCATION_FAILED,
    })
  );

  expect(result.message).toBe("success");
});

it("throws error when fetch fails", async () => {
  mockFetch.mockRejectedValueOnce(new Error("Network error"));

  await expect(
    runPromise(
      effectFetch({
        url: API_ROUTES.LOCATIONS,
        errorMessage: ERROR_MESSAGES.FETCH_LOCATION_FAILED,
      })
    )
  ).rejects.toThrow(ERROR_MESSAGES.FETCH_LOCATION_FAILED);
});

it("throws error when response not ok", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: () => Promise.resolve({}),
  });

  await expect(
    runPromise(
      effectFetch({
        url: API_ROUTES.LOCATIONS,
        errorMessage: "Server error",
      })
    )
  ).rejects.toThrow("Server error");
});

it("throws error when response json fails", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.reject(new Error(ERROR_MESSAGES.JSON_INVALID_RESPONSE)),
  });

  await expect(
    runPromise(
      effectFetch({
        url: API_ROUTES.LOCATIONS,
        errorMessage: ERROR_MESSAGES.FETCH_LOCATION_FAILED,
      })
    )
  ).rejects.toThrow(ERROR_MESSAGES.JSON_INVALID_RESPONSE);
});
