import { createStore } from "zustand";
import { persist } from "zustand/middleware";

interface AccessTokenStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
}

export const accessTokenStore = createStore<AccessTokenStore>()(persist((set) => (
  {
    accessToken: null,
    setAccessToken: (accessToken: string) => set({ accessToken }),
  })
  , { name: "access-token" }));