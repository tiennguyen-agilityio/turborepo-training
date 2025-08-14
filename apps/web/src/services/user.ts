import { API_ROUTES } from "@/constants";
import { User as ClerkUser, UserJSON as ClerkUserJSON } from "@clerk/nextjs/server";

export interface User extends ClerkUser {
  userId?: string;
}

export interface UserJSON extends ClerkUserJSON {
  userId?: string;
}

export const fetchUsers = async (
  query: string
): Promise<{
  users: User[];
  error: string | null;
}> => {
  try {
    const response = await fetch(`${API_ROUTES.USERS}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users: User[] = await response.json();

    return {
      users,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch the users.";

    return {
      users: [],
      error: errorMessage,
    };
  }
};

export const fetchUserById = async (
  userId: string
): Promise<{
  user?: User;
  error: string | null;
}> => {
  try {
    const response = await fetch(`${API_ROUTES.USERS}?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users: User[] = await response.json();

    return {
      user: users[0],
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch the user by id.";

    return {
      error: errorMessage,
    };
  }
};

export const createUser = async (
  data: UserJSON
): Promise<{
  user: User | null;
  error: string | null;
}> => {
  try {
    const response = await fetch(API_ROUTES.USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const user: User = await response.json();

    return {
      user: user,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create user.";

    return {
      user: null,
      error: errorMessage,
    };
  }
};

export const updateUser = async (
  userId: string,
  data: UserJSON
): Promise<{
  user: User | null;
  error: string | null;
}> => {
  try {
    const response = await fetch(`${API_ROUTES.USERS}${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const user: User = await response.json();

    return {
      user: user,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update user.";

    return {
      user: null,
      error: errorMessage,
    };
  }
};

export const deleteUser = async (
  userId: string
): Promise<{
  message: string | null;
}> => {
  try {
    await fetch(`${API_ROUTES.USERS}${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { message: "Deleted User Success." };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete user.";

    return { message: errorMessage };
  }
};
