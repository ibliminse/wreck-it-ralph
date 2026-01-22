import { NextRequest, NextResponse } from "next/server";

const TOKENS = {
  wreckit: "7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
  ralph: "CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
};

const BIRDEYE_API = "https://public-api.birdeye.so";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token") as "wreckit" | "ralph";
  const timeframe = searchParams.get("timeframe") || "1H"; // 1m, 5m, 15m, 1H, 4H, 1D

  if (!token || !TOKENS[token]) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    // Get OHLCV data for the last 24 hours
    const now = Math.floor(Date.now() / 1000);
    const dayAgo = now - 24 * 60 * 60;

    const response = await fetch(
      `${BIRDEYE_API}/defi/ohlcv?address=${TOKENS[token]}&type=${timeframe}&time_from=${dayAgo}&time_to=${now}`,
      {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Birdeye API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch from Birdeye", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform data for lightweight-charts
    const ohlcv = data.data?.items || [];
    const chartData = ohlcv.map((item: any) => ({
      time: item.unixTime,
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
      value: item.c, // For line chart
      volume: item.v,
    }));

    return NextResponse.json({
      token,
      timeframe,
      data: chartData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch history", details: String(error) },
      { status: 500 }
    );
  }
}
