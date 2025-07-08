import axiosInstance from "@/query/axios";
import { useMutation } from "@tanstack/react-query";

function deleteRaspberry(deviceId: string) {
  return axiosInstance.delete(`/raspberry/raspberry/${deviceId}`);
}

export function useRaspberryDeleteMutation() {
  return useMutation({
    mutationFn: (deviceId: string) => deleteRaspberry(deviceId),
  });
}



