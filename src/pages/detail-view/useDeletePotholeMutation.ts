import { queryClient } from "@/main";
import axiosInstance from "@/query/axios";
import type { Pothole } from "@/type/Raspberry";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface PotholeStatusParams {
  potholeId: string;
}
function deletePothole({ potholeId, }: PotholeStatusParams) {
  return axiosInstance.delete(`/pothole/potholes/${potholeId}`) as Promise<AxiosResponse<Pothole>>;
}

export function useDeletePotholeMutation() {
  return useMutation({
    mutationKey: ["pothole"],
    mutationFn: deletePothole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raspberry"] });
    }
  });
}
