import axiosInstance from "@/query/axios";
import type { Raspberry } from "@/type/Raspberry";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

function getRaspberry(deviceId: string) {
  return axiosInstance.get(`/raspberry/raspberry/${deviceId}`) as Promise<AxiosResponse<Raspberry>>;
}

export function useRaspberryQuery(deviceId: string) {
  return useQuery({
    queryKey: ["raspberry", deviceId],
    queryFn: () => getRaspberry(deviceId),
  });
}
