import { useRouter, usePathname } from "next/navigation";
import { renderHook } from "@testing-library/react";

import { useCleanClerkUrl } from "../useCleanClerkUrl";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const HASH_URL =
  "#/?sign_in_force_redirect_url=https%3A%2F%2Fexample.com%2Fdashboard&after_sign_in_url=https%3A%2F%2Fexample.com%2Faccount&redirect_url=https%3A%2F%2Fexample.com%2Fblogs";

describe("useCleanClerkUrl", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as jest.Mock).mockReturnValue("/sign-in");

    mockReplace.mockClear();
  });

  it("should parse Clerk hash params and trigger router.replace", () => {
    window.location.hash = HASH_URL;
    const { result } = renderHook(() => useCleanClerkUrl());

    expect(result.current).toEqual({
      signInRedirect: "https://example.com/dashboard",
      afterSignInUrl: "https://example.com/account",
      redirectUrl: "https://example.com/blogs",
    });

    expect(mockReplace).toHaveBeenCalledWith("/sign-in");
  });

  it("should return all undefined if no params present", () => {
    window.location.hash = "";
    const { result } = renderHook(() => useCleanClerkUrl());

    expect(result.current).toEqual({});

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
