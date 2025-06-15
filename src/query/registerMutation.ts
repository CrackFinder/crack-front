import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import type { UserRegisterParams } from "@/type/User";

const register = async (userData: UserRegisterParams) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "회원가입 중 오류가 발생했습니다." };
  }
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};