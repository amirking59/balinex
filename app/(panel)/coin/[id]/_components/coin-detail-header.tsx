import { Badge } from "@/components/ui/badge";
import { CoinDetail } from "@/services/Coin";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming a Skeleton component exists

const CoinDetailHeader = ({ coinDetail }: { coinDetail?: CoinDetail }) => {
  if (!coinDetail) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 rounded-full overflow-hidden">
        <Image src={coinDetail.image.large} alt={coinDetail.name} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-3xl mb-2 font-bold">{coinDetail.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="uppercase font-bold">
            {coinDetail.symbol}
          </Badge>
          <Badge variant="secondary">Rank #{coinDetail.market_cap_rank}</Badge>
        </div>
      </div>
    </div>
  );
};

export { CoinDetailHeader };
