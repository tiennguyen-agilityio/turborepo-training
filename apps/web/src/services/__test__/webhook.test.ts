import * as nextHeaders from "next/headers";
import { Webhook } from "svix";

import { webhookHandler } from "@/services/webhook";
import * as userService from "@/services/user";
import { USERS } from "@/mocks/user";

global.fetch = jest.fn();

jest.mock("@/services/user", () => ({
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  fetchUserById: jest.fn(),
}));

jest.mock("next/headers", () => ({
  headers: jest.fn().mockReturnValue({
    get: (key: string) => {
      if (key === "svix-id") return "test-id";
      if (key === "svix-timestamp") return `${Date.now()}`;
      if (key === "svix-signature") return "test-signature";
      return "";
    },
  }),
}));

const mockUser = USERS[0];

const mockRequest = (type: string) =>
  new Request("http://localhost/api/webhook", {
    method: "POST",
    body: JSON.stringify({
      type: type,
      data: mockUser,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

describe("webhookHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.clearAllMocks();
    process.env.CLERK_WEBHOOK_SECRET = Buffer.from("test_secret").toString("base64");
  });

  it("should return 500 if missing WEBHOOK_SECRET in prod", async () => {
    const originalSecret = process.env.CLERK_WEBHOOK_SECRET;
    delete process.env.CLERK_WEBHOOK_SECRET;

    const req = mockRequest("user.deleted");
    const res = await webhookHandler(req);

    expect(res.status).toBe(500);

    process.env.CLERK_WEBHOOK_SECRET = originalSecret;
  });

  it("should do nothing on unknown event type", async () => {
    jest.spyOn(Webhook.prototype, "verify").mockImplementation(() => {
      return {
        type: "organization.created",
        data: mockUser,
      };
    });

    const req = mockRequest("organization.created");
    const res = await webhookHandler(req);

    expect(res.status).toBe(200);
    expect(userService.createUser).not.toHaveBeenCalled();
    expect(userService.updateUser).not.toHaveBeenCalled();
    expect(userService.deleteUser).not.toHaveBeenCalled();
  });

  it("should call createUser on user.created", async () => {
    jest.spyOn(Webhook.prototype, "verify").mockImplementation(() => {
      return {
        type: "user.created",
        data: mockUser,
      };
    });

    const req = mockRequest("user.created");
    const res = await webhookHandler(req);

    expect(res.status).toBe(200);
    expect(userService.createUser).toHaveBeenCalledWith(expect.objectContaining(mockUser));
  });

  it("should call updateUser when user exists on user.updated", async () => {
    jest.spyOn(Webhook.prototype, "verify").mockImplementation(() => {
      return {
        type: "user.updated",
        data: mockUser,
      };
    });

    (userService.fetchUserById as jest.Mock).mockResolvedValue({
      user: { id: "db_1", userId: "user_123" },
    });

    const req = mockRequest("user.updated");
    const res = await webhookHandler(req);

    expect(res.status).toBe(200);
    expect(userService.fetchUserById).toHaveBeenCalledTimes(1);
    expect(userService.fetchUserById).toHaveBeenCalledWith(mockUser.id);
    expect(userService.updateUser).toHaveBeenCalledWith("db_1", expect.objectContaining(mockUser));
  });

  it("should skip updateUser when user does not exist", async () => {
    (userService.fetchUserById as jest.Mock).mockResolvedValue({ user: undefined });

    const req = mockRequest("user.updated");
    const res = await webhookHandler(req);

    expect(res.status).toBe(200);
    expect(userService.fetchUserById).toHaveBeenCalledWith(mockUser.id);
    expect(userService.updateUser).not.toHaveBeenCalled();
  });

  it("should call deleteUser when user exists on user.deleted", async () => {
    jest.spyOn(Webhook.prototype, "verify").mockImplementation(() => {
      return {
        type: "user.deleted",
        data: mockUser,
      };
    });

    (userService.fetchUserById as jest.Mock).mockResolvedValue({
      user: { id: "db_2", userId: "user_del" },
    });

    const req = mockRequest("user.deleted");
    const res = await webhookHandler(req);

    expect(res.status).toBe(200);
    expect(userService.fetchUserById).toHaveBeenCalledWith(mockUser.id);
    expect(userService.deleteUser).toHaveBeenCalledWith("db_2");
  });

  it("should skip deleteUser when user does not exist", async () => {
    (userService.fetchUserById as jest.Mock).mockResolvedValue({ user: undefined });

    const req = mockRequest("user.deleted");
    const res = await webhookHandler(req);

    expect(res.status).toBe(200);
    expect(userService.fetchUserById).toHaveBeenCalledWith(mockUser.id);
    expect(userService.deleteUser).not.toHaveBeenCalled();
  });

  it("should return 400 if Svix headers are missing", async () => {
    // 🔹 Mock next/headers to return no Svix headers
    jest.spyOn(nextHeaders, "headers").mockImplementation(
      async () =>
        ({
          get: () => null, // all headers missing
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
    );

    const req = mockRequest("user.created");
    const res = await webhookHandler(req);

    expect(res.status).toBe(400);
    expect(userService.createUser).not.toHaveBeenCalled();
    expect(userService.updateUser).not.toHaveBeenCalled();
    expect(userService.deleteUser).not.toHaveBeenCalled();
    expect(userService.fetchUserById).not.toHaveBeenCalled();
  });
});
