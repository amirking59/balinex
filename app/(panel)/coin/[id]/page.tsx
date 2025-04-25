"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { useGetCoinDetail } from "@/services/Coin";
import { FileText, Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { CoinDetailHeader } from "@/app/(panel)/coin/[id]/_components/coin-detail-header";
import { IRTPrice } from "@/components/irt-price";

export default function Page() {
  const { id } = useParams();
  const { data: coinDetail } = useGetCoinDetail(id as string);

  if (!coinDetail) {
    return (
      <main className="container mx-auto py-8 px-4">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <CoinDetailHeader coinDetail={coinDetail} />

          {coinDetail.description.en && (
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>About {coinDetail.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">{coinDetail.description.en}</div>
              </CardContent>
            </Card>
          )}

          {coinDetail.categories && coinDetail.categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {coinDetail.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coinDetail.genesis_date != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Genesis Date</h3>
                  <p>{dayjs(coinDetail.genesis_date).format("DD/MM/YYYY")}</p>
                </div>
              )}

              {coinDetail.hashing_algorithm != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hashing Algorithm</h3>
                  <p>{coinDetail.hashing_algorithm}</p>
                </div>
              )}

              {coinDetail.block_time_in_minutes != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Block Time</h3>
                  <p>{coinDetail.block_time_in_minutes} minutes</p>
                </div>
              )}

              {coinDetail.watchlist_portfolio_users != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Watchlist Users</h3>
                  <p>{formatNumber(coinDetail.watchlist_portfolio_users)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coinDetail.market_data.current_price != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Current Price</h3>
                  <IRTPrice priceInUSD={coinDetail.market_data.current_price.usd} />
                </div>
              )}

              {coinDetail.market_data.market_cap != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Market Cap</h3>
                  <IRTPrice priceInUSD={coinDetail.market_data.market_cap.usd} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {coinDetail.links.homepage[0] && (
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href={coinDetail.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                      <Home className="mr-2 h-4 w-4" />
                      Website
                    </Link>
                  </Button>
                )}

                {coinDetail.links.whitepaper && (
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href={coinDetail.links.whitepaper} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      Whitepaper
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
