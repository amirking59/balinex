"use client";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Coin, useGetCoins } from "@/services/Coin";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
      return <div className="text-sm">$ {row.original.current_price.toLocaleString()}</div>;
    },
  },
  {
    size: 50,
    accessorKey: "market_cap",
    header: "Market Cap",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-sm">$ {row.original.market_cap.toLocaleString()}</div>;
    },
  },
  {
    size: 50,
    accessorKey: "total_volume",
    header: "Total Volume",
    enableSorting: true,
    cell: ({ row }) => {
      return <div className="text-sm">$ {row.original.total_volume.toLocaleString()}</div>;
    },
  },
];

const CoinTable = () => {
  const { data: coins } = useGetCoins();

  if (!coins) return <Skeleton className="h-[500px] w-full" />;

  return (
    <DataTable
      columns={columns}
      data={coins}
      showSearch
      showPagination
      defaultSort={[{ desc: false, id: "market_cap" }]}
    />
  );
};

export { CoinTable };
