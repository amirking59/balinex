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

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  last_updated: number;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
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

export const useGetCoinDetail = (id?: string) => {
  return useQuery({
    queryKey: ["coin", id],
    queryFn: async () => {
      const response = await api.request<CoinDetail>(`/api/coins/${id}`);

      return response;
    },
    gcTime: 1000 * 60,
    staleTime: 1000 * 60,
    enabled: !!id,
  });
};

interface GetIRTToUSDExchangeRateResponse {
  status: string;
  lastUpdate: number;
  lastTradePrice: string;
  asks: number[][];
  bids: number[][];
}

export const useGetIRTToUSDExchangeRate = () => {
  return useQuery({
    queryKey: ["irt_to_usd_exchange_rate"],
    queryFn: async () => {
      const response = await api.request<GetIRTToUSDExchangeRateResponse>(
        `${process.env.NEXT_PUBLIC_NOBITEX_BASE_API_URL}/orderbook/USDTIRT`,
      );

      return +response?.lastTradePrice;
    },
    gcTime: 1000 * 60,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
};
