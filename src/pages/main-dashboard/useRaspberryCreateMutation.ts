import { queryClient } from "@/main";
import axiosInstance from "@/query/axios";
import type { Raspberry } from "@/type/Raspberry";
import { useMutation } from "@tanstack/react-query";

function createRaspberry(raspberry: Omit<Raspberry, 'id'>) {
  return axiosInstance.post(`/raspberry/raspberry`, raspberry);
}

export function useRaspberryCreateMutation() {
  return useMutation({
    mutationFn: createRaspberry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raspberries"] });
    },
  });
}



