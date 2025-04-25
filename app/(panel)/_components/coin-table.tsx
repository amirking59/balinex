"use client";

import { DataTable } from "@/components/data-table";
import { IRTPrice } from "@/components/irt-price";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Coin, useGetCoins } from "@/services/Coin";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";

const columns: ColumnDef<Coin>[] = [
  {
    size: 200,
    accessorKey: "name",
    header: "Coin",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Image src={row.original.image} alt="logo" width={24} height={24} />

          <div className="text-sm font-semibold">
            {row.original.name} <span className="font-normal text-muted-foreground">{row.original.symbol}</span>
          </div>
        </div>
      );
    },
  },
  {
    size: 50,
    accessorKey: "current_price",
    header: "Price",
    enableSorting: true,
    cell: ({ row }) => {
      return <IRTPrice priceInUSD={row.original.current_price} />;
    },
  },
  {
    size: 50,
    accessorKey: "market_cap",
    header: "Market Cap",
    enableSorting: true,
    cell: ({ row }) => {
      return <IRTPrice priceInUSD={row.original.market_cap} />;
    },
  },
  {
    size: 50,
    accessorKey: "total_volume",
    header: "Total Volume",
    enableSorting: true,
    cell: ({ row }) => {
      return <IRTPrice priceInUSD={row.original.total_volume} />;
    },
  },
];

const CoinTable = () => {
  const { data: coins } = useGetCoins();
  const router = useRouter();

  if (!coins)
    return (
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );

  return (
    <DataTable
      columns={columns}
      data={coins}
      showSearch
      showPagination
      defaultSort={[{ desc: false, id: "market_cap" }]}
      onRowClick={(row) => {
        router.push(`/coin/${row.id}`);
      }}
    />
  );
};

export { CoinTable };
