import { create } from "zustand";
import * as Keychain from "react-native-keychain";

import { STORAGE_KEYS } from "@repo/constants/storageKeys";
import { User } from "@repo/types/auth";

type AuthState = {
  user: User | null;
  sessionToken: string | null;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  sessionToken: null,

  setAuth: async (user, token) => {
    await Keychain.setGenericPassword(JSON.stringify(user), token, {
      service: STORAGE_KEYS.TOKEN,
    });
    set({ user, sessionToken: token });
  },

  logout: async () => {
    await Keychain.resetGenericPassword({ service: STORAGE_KEYS.TOKEN });
    set({ user: null, sessionToken: null });
  },

  hydrate: async () => {
    const credentials = await Keychain.getGenericPassword({
      service: STORAGE_KEYS.TOKEN,
    });

    if (credentials) {
      const user = JSON.parse(credentials.username);
      set({ sessionToken: credentials.password, user });
    } else {
      set({ sessionToken: null, user: null });
    }
  },
}));
