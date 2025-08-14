import { API_ROUTES } from "@/constants/routes";
import { PAGE_SIZE } from "@/constants/common";
import { LOCATIONS } from "@/mocks/location";

import { fetchLocations } from "../location";

global.fetch = jest.fn();

describe("fetchLocations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return locations data on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => LOCATIONS,
    });

    const result = await fetchLocations({});

    expect(fetch).toHaveBeenCalledWith(
      `${API_ROUTES.LOCATIONS}?page=1&limit=${PAGE_SIZE}`,
      expect.any(Object)
    );
    expect(result.data).toEqual(LOCATIONS);
    expect(result.error).toBe("");
  });

  it("should return error when response.ok is false", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await fetchLocations({ page: 1, limit: PAGE_SIZE });

    expect(result.data).toEqual([]);
    expect(result.error).toBe("Failed to fetch the Locations.");
  });

  it("should return fallback error message when exception is not instance of Error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce("Unknown failure");

    const result = await fetchLocations({ page: 1, limit: PAGE_SIZE });

    expect(result.data).toEqual([]);
    expect(result.error).toBe("Failed to fetch the Locations.");
  });

  it("should return actual error message when error is instance of Error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network down"));

    const result = await fetchLocations({ page: 1, limit: PAGE_SIZE });

    expect(result.data).toEqual([]);
    expect(result.error).toBe("Network down");
  });
});
