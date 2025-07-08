import axiosInstance from "@/query/axios";
import type { Raspberry } from "@/type/Raspberry";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

function getRaspberries() {
  return axiosInstance.get("/raspberry/raspberry") as Promise<AxiosResponse<{ raspberries: Raspberry[] }>>;
}

export function useRaspberriesQuery() {
  return useQuery({
    queryKey: ["raspberries"],
    queryFn: () => getRaspberries(),
  });
}
