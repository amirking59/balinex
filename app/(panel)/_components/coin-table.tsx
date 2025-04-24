"use client";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Coin, useGetCoins } from "@/services/Coin";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "Id",
  },
];

const CoinTable = () => {
  const { data: coins } = useGetCoins();

  if (!coins) return <Skeleton className="h-[500px] w-full" />;

  return <DataTable columns={columns} data={coins} showPagination />;
};

export { CoinTable };
