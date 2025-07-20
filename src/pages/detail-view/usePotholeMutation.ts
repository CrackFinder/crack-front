import { queryClient } from "@/main";
import axiosInstance from "@/query/axios";
import type { Pothole } from "@/type/Raspberry";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface PotholeStatusParams {
  potholeId: string;
  status: string;
}
function putPotholeStatus({ potholeId, status }: PotholeStatusParams) {
  return axiosInstance.put(`/pothole/potholes/${potholeId}/status`, { status }) as Promise<AxiosResponse<Pothole>>;
}

export function usePotholeStatusMutation() {
  return useMutation({
    mutationKey: ["pothole"],
    mutationFn: putPotholeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raspberry"] });
    }
  });
}
