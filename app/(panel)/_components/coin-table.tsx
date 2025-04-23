import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<{
  id: number;
  name: string;
}>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

const CoinTable = () => {
  const data = [
    {
      id: 1,
      name: "test",
    },
    {
      id: 2,
      name: "test2",
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export { CoinTable };
