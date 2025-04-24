import BaseApi from "@/lib/api";
import { NextResponse } from "next/server";

const api = BaseApi.getInstance();

export async function GET() {
  try {
    const response = await api.request(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, {
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
