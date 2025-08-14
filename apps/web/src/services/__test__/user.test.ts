import { API_ROUTES } from "@/constants/routes";
import { USERS } from "@/mocks/user";

import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser, UserJSON } from "../user";

global.fetch = jest.fn();

const mockUser = USERS[0];

describe("User services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchUsers", () => {
    it("should return users on success", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [mockUser],
      });

      const result = await fetchUsers("?page=1");
      expect(fetch).toHaveBeenCalledWith(`${API_ROUTES.USERS}?page=1`, expect.any(Object));
      expect(result.users).toEqual([mockUser]);
      expect(result.error).toBeNull();
    });

    it("should return error on failure", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await fetchUsers("");
      expect(result.users).toEqual([]);
      expect(result.error).toBe("Network error");
    });

    it("should return fallback error message when error is not an instance of Error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce("Random string error");

      const result = await fetchUsers("?page=1");

      expect(result.users).toEqual([]);
      expect(result.error).toBe("Failed to fetch the users.");
    });
  });

  describe("fetchUserById", () => {
    it("should return user on success", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [mockUser],
      });

      const result = await fetchUserById("1");
      expect(fetch).toHaveBeenCalledWith(`${API_ROUTES.USERS}?userId=1`, expect.any(Object));
      expect(result.user).toEqual(mockUser);
      expect(result.error).toBeNull();
    });

    it("should return error on failure", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

      const result = await fetchUserById("1");
      expect(result.user).toBeUndefined();
      expect(result.error).toBe("Failed to fetch");
    });

    it("should return fallback error message when error is not an instance of Error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce("Some string error");

      const result = await fetchUserById("1");

      expect(result.user).toBeUndefined();
      expect(result.error).toBe("Failed to fetch the user by id.");
    });
  });

  describe("createUser", () => {
    const data = { id: "1", userId: "1" } as UserJSON;

    it("should create user successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockUser,
      });

      const result = await createUser(data);
      expect(fetch).toHaveBeenCalledWith(
        API_ROUTES.USERS,
        expect.objectContaining({
          method: "POST",
        })
      );
      expect(result.user).toEqual(mockUser);
      expect(result.error).toBeNull();
    });

    it("should handle create user error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Create error"));

      const result = await createUser(data);
      expect(result.user).toBeNull();
      expect(result.error).toBe("Create error");
    });

    it("should return fallback error message when error is not an instance of Error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce("Unknown failure");

      const result = await createUser(data);

      expect(result.user).toBeNull();
      expect(result.error).toBe("Failed to create user.");
    });
  });

  describe("updateUser", () => {
    const data = { id: "1", userId: "1" } as UserJSON;

    it("should update user successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockUser,
      });

      const result = await updateUser("1", data);
      expect(fetch).toHaveBeenCalledWith(
        `${API_ROUTES.USERS}1`,
        expect.objectContaining({
          method: "PUT",
        })
      );
      expect(result.user).toEqual(mockUser);
      expect(result.error).toBeNull();
    });

    it("should handle update user error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Update error"));

      const result = await updateUser("1", data);
      expect(result.user).toBeNull();
      expect(result.error).toBe("Update error");
    });

    it("should return fallback error message when error is not an instance of Error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce("Unknown failure");

      const result = await updateUser("12", data);

      expect(result.user).toBeNull();
      expect(result.error).toBe("Failed to update user.");
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteUser("1");
      expect(fetch).toHaveBeenCalledWith(
        `${API_ROUTES.USERS}1`,
        expect.objectContaining({
          method: "DELETE",
        })
      );
      expect(result.message).toBe("Deleted User Success.");
    });

    it("should handle delete user error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Delete error"));

      const result = await deleteUser("1");
      expect(result.message).toBe("Delete error");
    });

    it("should return fallback error message when error is not an instance of Error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce("Unknown failure");

      const result = await deleteUser("12");

      expect(result.message).toBe("Failed to delete user.");
    });
  });
});
