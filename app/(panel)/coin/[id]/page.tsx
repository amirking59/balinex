"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { useGetCoinDetail } from "@/services/Coin";
import { FileText, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

export default function Page() {
  const { id } = useParams();
  const { data } = useGetCoinDetail(id as string);

  if (!data) return;

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image src={data.image.large} alt={data.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl mb-2 font-bold">{data.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="uppercase font-bold">
                  {data.symbol}
                </Badge>
                <Badge variant="secondary">Rank #{data.market_cap_rank}</Badge>
              </div>
            </div>
          </div>

          {data.description.en && (
            <Card>
              <CardHeader>
                <CardTitle>About {data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">{data.description.en}</div>
              </CardContent>
            </Card>
          )}

          {data.categories && data.categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.categories.map((category) => (
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
              {data.genesis_date != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Genesis Date</h3>
                  <p>{dayjs(data.genesis_date).format("DD/MM/YYYY")}</p>
                </div>
              )}

              {data.hashing_algorithm != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hashing Algorithm</h3>
                  <p>{data.hashing_algorithm}</p>
                </div>
              )}

              {data.block_time_in_minutes != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Block Time</h3>
                  <p>{data.block_time_in_minutes} minutes</p>
                </div>
              )}

              {data.watchlist_portfolio_users != null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Watchlist Users</h3>
                  <p>{formatNumber(data.watchlist_portfolio_users)}</p>
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
                {data.links.homepage[0] && (
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href={data.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                      <Home className="mr-2 h-4 w-4" />
                      Website
                    </Link>
                  </Button>
                )}

                {data.links.whitepaper && (
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href={data.links.whitepaper} target="_blank" rel="noopener noreferrer">
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
