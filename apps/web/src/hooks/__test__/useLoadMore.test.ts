import { act, renderHook, waitFor } from "@testing-library/react";
import { LocationItem } from "@/types/location";

import { LOCATIONS } from "@/mocks/location";
import { PAGE_SIZE } from "@/constants/common";

import { useLoadMore } from "../useLoadMore";

const createFetcher = (data: LocationItem[], failOnPage?: number) => {
  return jest.fn(async ({ page, limit }) => {
    if (failOnPage && page === failOnPage) {
      return { data: [], error: "Failed to load data" };
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: data.slice(start, end),
      error: "",
    };
  });
};

describe("useLoadMore", () => {
  it("should loads data on mount", async () => {
    const fetcher = createFetcher(LOCATIONS);
    const { result } = renderHook(() => useLoadMore<LocationItem>({ fetcher, limit: PAGE_SIZE }));

    await waitFor(() => {
      expect(result.current.data.length).toBe(PAGE_SIZE);
    });

    expect(result.current.error).toBe("");
    expect(result.current.hasMore).toBe(true);
  });

  it("should loads more data when onLoadMore is called", async () => {
    const fetcher = createFetcher(LOCATIONS);
    const { result } = renderHook(() => useLoadMore<LocationItem>({ fetcher, limit: PAGE_SIZE }));

    await waitFor(() => result.current.data.length > 0);

    act(() => {
      result.current.onLoadMore();
    });

    await waitFor(() => {
      expect(result.current.data.length).toBe(PAGE_SIZE);
    });
  });

  it("should set error if fetcher failed", async () => {
    const fetcher = createFetcher(LOCATIONS, 1);
    const { result } = renderHook(() => useLoadMore<LocationItem>({ fetcher }));

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to load data");
    });

    expect(result.current.data).toHaveLength(0);
  });
});
