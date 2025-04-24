import BaseApi from "@/lib/api";
import { Coin } from "@/services/Coin";
import { NextResponse } from "next/server";

const api = BaseApi.getInstance();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await api.request<Coin>(`https://api.coingecko.com/api/v3/coins/${id}`, {
      headers: {
        "accept": "application/json",
        "x-cg-demo-api-key": process.env.coin_gecko_api_key!,
      },
      next: {
        revalidate: 60,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
