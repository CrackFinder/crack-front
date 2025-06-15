import { useQuery, type QueryOptions } from "@tanstack/react-query";
import axiosInstance from "./axios";
import type { UserInfo } from "@/type/User";

const getMyUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data as UserInfo;
  } catch (error) {
    throw error.response?.data || { error: "사용자 정보를 가져오는 중 오류가 발생했습니다." };
  }
};

export const useMeQuery = (queryOptions?: QueryOptions) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyUserInfo,
    ...queryOptions,
  });
};