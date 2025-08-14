import { PAGE_SIZE } from "@/constants/common";
import { API_ROUTES } from "@/constants/routes";
import { QueryParams, Response } from "@/types/api";

import { LocationItem } from "@/types/location";

export const fetchLocations = async ({
  page = 1,
  limit = PAGE_SIZE,
}: QueryParams): Promise<Response<LocationItem>> => {
  try {
    const response = await fetch(`${API_ROUTES.LOCATIONS}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        data: [],
        error: "Failed to fetch the Locations.",
      };
    }

    const data: LocationItem[] = await response.json();

    return {
      data,
      error: "",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch the Locations.";

    return {
      data: [],
      error: errorMessage,
    };
  }
};
