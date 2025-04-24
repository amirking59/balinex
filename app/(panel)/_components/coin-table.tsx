"use client";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Coin, useGetCoins } from "@/services/Coin";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<Coin>[] = [
  {
    size: 100,
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
    size: 100,
    accessorKey: "current_price",
    header: "Price",
    cell: ({ row }) => {
      return <div className="text-sm">$ {row.original.current_price.toLocaleString()}</div>;
    },
  },
];

const CoinTable = () => {
  const { data: coins } = useGetCoins();

  if (!coins) return <Skeleton className="h-[500px] w-full" />;

  return <DataTable columns={columns} data={coins} showPagination />;
};

export { CoinTable };
