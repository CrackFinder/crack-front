import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { AxiosError } from "axios";
import type { RaspberryRegisterParams } from "@/type/Raspberry";

const register = async (raspData: RaspberryRegisterParams) => {
  try {
    const response = await axiosInstance.post("/raspberry/raspberry", raspData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { error: "회원가입 중 오류가 발생했습니다." };
    }
    throw error;
  }
};

export const useRaspberryRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};