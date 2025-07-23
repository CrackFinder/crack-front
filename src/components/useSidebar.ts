import { useRaspberriesQuery } from "@/pages/main-dashboard/useRaspberriesQuery";

export default function useSidebar() {
  const { data: raspberrys, isSuccess } = useRaspberriesQuery();
  if (!isSuccess) return { potholesCount: null, deviceCount: null, activeDeviceCount: null };

  const raspberries = raspberrys.data.raspberries;

  const potholeLengths = raspberries.map(rasp => rasp.potholes.length)
  const potholesCount = sum(potholeLengths);

  const deviceCount = raspberries.length
  const activeDeviceCount = raspberries.filter(rasp => rasp.status === 'online').length

  return { potholesCount, deviceCount, activeDeviceCount }
}

const sum = (arr: number[]) => arr.reduce((el, acc) => el + acc, 0);