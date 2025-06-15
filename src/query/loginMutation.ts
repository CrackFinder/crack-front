import type { User, UserInfo } from "@/type/User";
import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";

const login = async (credentials: Pick<User, "email" | "password">) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data as { access_token: string, user: UserInfo };
  } catch (error) {
    throw error.response?.data || { error: "로그인 중 오류가 발생했습니다." };
  }
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
      console.log('로그인', `Bearer ${data.access_token}`, data);
    },
  });
};