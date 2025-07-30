import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import type { UserInfo } from "@/type/User";

const getMyUserInfo = async () => {
  console.log("getMyUserInfo");
  const response = await axiosInstance.get("/user/user");
  return response.data as UserInfo;
};

export const useMeQuery = (retry: boolean = true) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyUserInfo,
    retry,
  });
};