import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import type { UserRegisterParams } from "@/type/User";
import { AxiosError } from "axios";

const register = async (userData: UserRegisterParams) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { error: "회원가입 중 오류가 발생했습니다." };
    }
    throw error;
  }
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};