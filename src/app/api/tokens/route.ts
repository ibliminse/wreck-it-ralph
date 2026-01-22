import { NextResponse } from "next/server";

const TOKENS = {
  WRECKIT: "7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
  RALPH: "CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
};

const BIRDEYE_API = "https://public-api.birdeye.so";
const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface TokenData {
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  txns24h: {
    buys: number;
    sells: number;
  };
}

async function fetchFromBirdeye(address: string): Promise<TokenData | null> {
  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) return null;

  try {
    // Fetch token overview from Birdeye
    const response = await fetch(
      `${BIRDEYE_API}/defi/token_overview?address=${address}`,
      {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`Birdeye fetch failed for ${address}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const token = data.data;

    if (!token) return null;

    return {
      price: token.price || 0,
      priceChange24h: token.priceChange24hPercent || 0,
      volume24h: token.v24hUSD || 0,
      liquidity: token.liquidity || 0,
      marketCap: token.mc || token.realMc || 0,
      fdv: token.fdv || 0,
      txns24h: {
        buys: token.buy24h || 0,
        sells: token.sell24h || 0,
      },
    };
  } catch (error) {
    console.error(`Birdeye error for ${address}:`, error);
    return null;
  }
}

async function fetchFromDexScreener(address: string): Promise<TokenData | null> {
  try {
    const response = await fetch(`${DEXSCREENER_API}/${address}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    const pair = data.pairs?.[0];

    if (!pair) return null;

    return {
      price: parseFloat(pair.priceUsd) || 0,
      priceChange24h: pair.priceChange?.h24 || 0,
      volume24h: pair.volume?.h24 || 0,
      liquidity: pair.liquidity?.usd || 0,
      marketCap: pair.marketCap || pair.fdv || 0,
      fdv: pair.fdv || 0,
      txns24h: {
        buys: pair.txns?.h24?.buys || 0,
        sells: pair.txns?.h24?.sells || 0,
      },
    };
  } catch (error) {
    console.error(`DexScreener error for ${address}:`, error);
    return null;
  }
}

async function fetchTokenData(address: string): Promise<TokenData | null> {
  // Try Birdeye first
  const birdeyeData = await fetchFromBirdeye(address);
  if (birdeyeData && birdeyeData.price > 0) {
    return birdeyeData;
  }

  // Fallback to DexScreener
  console.log(`Falling back to DexScreener for ${address}`);
  return fetchFromDexScreener(address);
}

export async function GET() {
  try {
    const [wreckitData, ralphData] = await Promise.all([
      fetchTokenData(TOKENS.WRECKIT),
      fetchTokenData(TOKENS.RALPH),
    ]);

    return NextResponse.json({
      wreckit: wreckitData,
      ralph: ralphData,
      source: wreckitData ? "birdeye" : "dexscreener",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Token fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch token data", details: String(error) },
      { status: 500 }
    );
  }
}
