import BaseApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
}

const api = BaseApi.getInstance();

export const useGetCoins = () => {
  return useQuery({
    queryKey: ["coins"],
    queryFn: async () => {
      const response = await api.request<Coin[]>(`/api/coins`);

      return response;
    },
    gcTime: 1000 * 60,
    staleTime: 1000 * 60,
  });
};
