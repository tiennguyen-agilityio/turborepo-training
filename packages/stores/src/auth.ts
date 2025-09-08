import { create } from "zustand";
import * as Keychain from "react-native-keychain";

import { STORAGE_KEYS } from "@repo/constants/storageKeys";
import { User } from "@repo/types/auth";

type AuthState = {
  user: User | null;
  sessionToken: string | null;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  sessionToken: null,

  setAuth: async (user, token) => {
    await Keychain.setGenericPassword("session", token, {
      service: STORAGE_KEYS.TOKEN,
    });
    set({ user, sessionToken: token });
  },

  logout: async () => {
    await Keychain.resetGenericPassword({ service: STORAGE_KEYS.TOKEN });
    set({ user: null, sessionToken: null });
  },
}));
