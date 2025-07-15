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

// 로그인 유지 기능 + 보안 : 쿠키 사용.
// 로컬스토리지 : 로그인 유지는 해주지만, 보안문제가 있음.