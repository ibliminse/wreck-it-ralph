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

// In-memory cache for last known good values
const cache: { [key: string]: { data: TokenData; timestamp: number } } = {};
const CACHE_TTL = 60000; // 1 minute

async function fetchFromBirdeye(address: string): Promise<TokenData | null> {
  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) return null;

  try {
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
      return null;
    }

    const data = await response.json();
    const token = data.data;

    if (!token || !token.price) return null;

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
  } catch {
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

    if (!pair || !pair.priceUsd) return null;

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
  } catch {
    return null;
  }
}

function isValidData(data: TokenData | null): data is TokenData {
  return data !== null && data.price > 0 && data.marketCap > 0;
}

async function fetchTokenData(address: string, tokenName: string): Promise<TokenData | null> {
  // Try both APIs in parallel
  const [birdeyeData, dexData] = await Promise.all([
    fetchFromBirdeye(address),
    fetchFromDexScreener(address),
  ]);

  // Prefer Birdeye if valid, otherwise use DexScreener
  let result: TokenData | null = null;

  if (isValidData(birdeyeData)) {
    result = birdeyeData;
  } else if (isValidData(dexData)) {
    result = dexData;
  }

  // If we got valid data, update cache
  if (result) {
    cache[tokenName] = { data: result, timestamp: Date.now() };
    return result;
  }

  // If no fresh data, use cache if not too old
  const cached = cache[tokenName];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Last resort: return whatever we got, even if incomplete
  return birdeyeData || dexData || cached?.data || null;
}

export async function GET() {
  try {
    // Fetch both tokens independently so one failing doesn't affect the other
    const [wreckitData, ralphData] = await Promise.all([
      fetchTokenData(TOKENS.WRECKIT, "wreckit"),
      fetchTokenData(TOKENS.RALPH, "ralph"),
    ]);

    return NextResponse.json({
      wreckit: wreckitData,
      ralph: ralphData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Token fetch error:", error);

    // Return cached data if available
    return NextResponse.json({
      wreckit: cache["wreckit"]?.data || null,
      ralph: cache["ralph"]?.data || null,
      timestamp: new Date().toISOString(),
      cached: true,
    });
  }
}
