import { describe, it, expect, vi, beforeEach } from "vitest";
import { Effect } from "effect";

// Types
import { HTTP_METHOD } from "@packages/types/api";

// Constants
import { ERROR_MESSAGES } from "@packages/constants/messages";

import * as apiModule from "../src/api";
import * as userModule from "../src/user";

const mockUser = {
  id: "01",
  firstName: "John",
  lastName: "Doe",
  userId: "user_01",
};

describe("user API effects", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetchUserById returns user on success", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.succeed([mockUser])
    );

    const result = await Effect.runPromise(userModule.fetchUserById("user_01"));

    expect(result.data).toEqual(mockUser);
    expect(apiModule.effectFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining("userId=user_01"),
        errorMessage: ERROR_MESSAGES.FETCH_USER_BY_ID_FAILED,
      })
    );
  });

  it("fetchUserById fails on error", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.fail(new Error("Boom"))
    );

    await expect(
      Effect.runPromise(userModule.fetchUserById("user_01"))
    ).rejects.toThrow("Boom");
  });

  it("createUser returns user on success", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.succeed(mockUser)
    );

    const result = await Effect.runPromise(userModule.createUser(mockUser));

    expect(result.data).toEqual(mockUser);
    expect(apiModule.effectFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        method: HTTP_METHOD.POST,
        body: mockUser,
        errorMessage: ERROR_MESSAGES.CREATE_USER_FAILED,
      })
    );
  });

  it("updateUser returns user on success", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.succeed(mockUser)
    );

    const result = await Effect.runPromise(
      userModule.updateUser("01", mockUser)
    );

    expect(result.data).toEqual(mockUser);
    expect(apiModule.effectFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        method: HTTP_METHOD.PUT,
        url: expect.stringContaining("/01"),
        body: mockUser,
        errorMessage: ERROR_MESSAGES.UPDATE_USER_FAILED,
      })
    );
  });

  it("deleteUser returns user on success", async () => {
    vi.spyOn(apiModule, "effectFetch").mockReturnValueOnce(
      Effect.succeed(mockUser)
    );

    const result = await Effect.runPromise(userModule.deleteUser("01"));

    expect(result.data).toEqual(mockUser);
    expect(apiModule.effectFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        method: HTTP_METHOD.DELETE,
        url: expect.stringContaining("/01"),
        errorMessage: ERROR_MESSAGES.DELETE_USER_FAILED,
      })
    );
  });
});
