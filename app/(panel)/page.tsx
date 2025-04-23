import { AddCoinForm } from "@/app/(panel)/_components/add-coin-form";
import { CoinTable } from "@/app/(panel)/_components/coin-table";

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Coins</h1>

        <AddCoinForm />
      </div>

      <CoinTable />
    </div>
  );
}
