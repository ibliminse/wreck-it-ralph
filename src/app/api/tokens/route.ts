import { NextResponse } from "next/server";

const TOKENS = {
  WRECKIT: "7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
  RALPH: "CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
};

const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens";

// Disable caching for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Fetch both tokens in parallel with no caching
    const [wreckitRes, ralphRes] = await Promise.all([
      fetch(`${DEXSCREENER_API}/${TOKENS.WRECKIT}`, {
        cache: "no-store",
      }),
      fetch(`${DEXSCREENER_API}/${TOKENS.RALPH}`, {
        cache: "no-store",
      }),
    ]);

    if (!wreckitRes.ok || !ralphRes.ok) {
      throw new Error(`DexScreener fetch failed: WRECKIT=${wreckitRes.status}, RALPH=${ralphRes.status}`);
    }

    const [wreckitData, ralphData] = await Promise.all([
      wreckitRes.json(),
      ralphRes.json(),
    ]);

    // Get the first pair (highest liquidity) for each token
    const wreckitPair = wreckitData.pairs?.[0];
    const ralphPair = ralphData.pairs?.[0];

    const parseTokenData = (pair: any) => {
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
    };

    return NextResponse.json({
      wreckit: parseTokenData(wreckitPair),
      ralph: parseTokenData(ralphPair),
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
