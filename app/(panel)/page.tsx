import { CoinTable } from "@/app/(panel)/_components/coin-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Coins</h1>

        <Button>Add</Button>
      </div>

      <CoinTable />
    </div>
  );
}
