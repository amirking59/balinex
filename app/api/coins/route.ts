import BaseApi from "@/lib/api";
import { Coin } from "@/services/Coin";
import { NextResponse } from "next/server";

const api = BaseApi.getInstance();

export async function GET() {
  try {
    const response = await api.request<Coin[]>(
      `${process.env.NEXT_PUBLIC_COIN_GECKO_BASE_API_URL}/coins/markets?vs_currency=usd`,
      {
        headers: {
          "accept": "application/json",
          "x-cg-demo-api-key": process.env.COIN_GECKO_API_TOKEN!,
        },
        next: {
          revalidate: 60,
        },
      },
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
