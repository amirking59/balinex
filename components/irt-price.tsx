import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useGetIRTToUSDExchangeRate } from "@/services/Coin";

interface IRTPriceProps {
  priceInUSD: number;
}

const IRTPrice = ({ priceInUSD }: IRTPriceProps) => {
  const { data: exchangeRate } = useGetIRTToUSDExchangeRate();

  if (exchangeRate == null) {
    return <Skeleton className="h-5 w-16" />;
  }

  return <div className="text-sm">{formatNumber(priceInUSD * exchangeRate)} IRT</div>;
};

export { IRTPrice };
