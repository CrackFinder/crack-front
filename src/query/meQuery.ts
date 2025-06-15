import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import type { UserInfo } from "@/type/User";
import { accessTokenStore } from "@/store/accessTokenStore";

const getMyUserInfo = async () => {
  const response = await axiosInstance.get("/user");
  return response.data as UserInfo;
};

export const useMeQuery = (retry: boolean = true) => {
  const accessToken = accessTokenStore.getState().accessToken;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyUserInfo,
    retry,
  });
};